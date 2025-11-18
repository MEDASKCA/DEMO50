'use client';

import React, { useState, useEffect } from 'react';
import { X, Edit2, Save, Users, Search, ChevronDown, ChevronUp, List, Grid, ArrowLeftRight, MessageSquare, MoreVertical } from 'lucide-react';
import StaffTile from './StaffTile';
import { ALL_SPECIALTIES, getSpecialtyColors, getProfessionalTitle } from '@/lib/constants/specialtyColors';
import DesktopProfile from '@/features/profile/components/DesktopProfile';

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  roles: string[];
  band: string;
  fte: number;
  specialty?: string;
  specialtyTree?: Array<{ name: string }>;
  competentSpecialties?: string[]; // Specialties they're trained/competent in
  supernumeraryIn?: string[]; // Specialties they're training in (SN)
  [key: string]: any;
}

export default function StaffListByTeams() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedSpecialties, setExpandedSpecialties] = useState<Set<string>>(new Set(ALL_SPECIALTIES));
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Swap station states
  const [showSwapStation, setShowSwapStation] = useState(false);
  const [swapFromSpecialty, setSwapFromSpecialty] = useState('');
  const [swapToSpecialty, setSwapToSpecialty] = useState('');
  const [swapSearchTerm, setSwapSearchTerm] = useState('');
  const [swapComment, setSwapComment] = useState('');

  // Context menu states
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    staffMember: StaffMember;
  } | null>(null);

  // Load staff profiles from JSON (in production, this would be from Firebase)
  useEffect(() => {
    const loadStaffProfiles = async () => {
      try {
        const response = await fetch('/data/staffProfiles172.json');
        const profiles: StaffMember[] = await response.json();

        // Map staff to their specialties
        const mappedProfiles = profiles.map(profile => {
          // Check role first for Anaesthetic and Recovery
          let specialty: string;

          if (profile.roles[0]?.includes('Anaesthetic')) {
            specialty = 'Anaesthetics';
          } else if (profile.roles[0]?.includes('Recovery')) {
            specialty = 'Recovery';
          } else {
            // Get first specialty from specialtyTree for surgical staff
            specialty = profile.specialtyTree?.[0]?.name || 'General Surgery';
          }

          return {
            ...profile,
            specialty,
            competentSpecialties: [specialty], // Initially competent in their assigned specialty
            supernumeraryIn: [], // Not in training initially
          };
        });

        setStaff(mappedProfiles);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load staff profiles:', error);
        setLoading(false);
      }
    };

    loadStaffProfiles();
  }, []);

  // Close context menu on click outside
  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu]);

  // Helper function to extract band number for sorting
  const getBandNumber = (band: string): number => {
    // Extract number from band string (e.g., "Band 7" -> 7, "Band 8a" -> 8)
    const match = band.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Filter staff by search term
  const filteredStaff = staff.filter(s => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const band = s.band.toLowerCase();
    return fullName.includes(search) || band.includes(search);
  });

  // Group staff by specialty and sort by band (highest first)
  const staffBySpecialty = ALL_SPECIALTIES.reduce((acc, specialty) => {
    const specialtyStaff = filteredStaff.filter(s => s.specialty === specialty);

    // Sort by band descending (Band 8a, 7, 6, 5, etc.)
    acc[specialty] = specialtyStaff.sort((a, b) => {
      const bandA = getBandNumber(a.band);
      const bandB = getBandNumber(b.band);

      if (bandB !== bandA) {
        return bandB - bandA; // Higher band first
      }

      // If same band, sort alphabetically by last name
      return a.lastName.localeCompare(b.lastName);
    });

    return acc;
  }, {} as Record<string, StaffMember[]>);

  // Handle staff swap between specialties
  const handleSwapStaff = () => {
    if (!swapFromSpecialty || !swapToSpecialty || !swapSearchTerm) {
      alert('Please select both specialties and enter a search term');
      return;
    }

    // Find matching staff in the "from" specialty
    const matchingStaff = staff.filter(s =>
      s.specialty === swapFromSpecialty &&
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(swapSearchTerm.toLowerCase())
    );

    if (matchingStaff.length === 0) {
      alert('No matching staff found in the selected specialty');
      return;
    }

    // Update staff specialty
    setStaff(prevStaff =>
      prevStaff.map(s => {
        if (!matchingStaff.find(ms => ms.id === s.id)) return s;

        const isCompetent = s.competentSpecialties?.includes(swapToSpecialty);

        // If not competent in this specialty, mark as supernumerary
        if (!isCompetent) {
          return {
            ...s,
            specialty: swapToSpecialty,
            supernumeraryIn: [...(s.supernumeraryIn || []), swapToSpecialty].filter(
              (val, idx, arr) => arr.indexOf(val) === idx
            ),
          };
        }

        return { ...s, specialty: swapToSpecialty };
      })
    );

    // Log the swap with comment
    console.log('Staff swapped:', {
      staff: matchingStaff.map(s => `${s.firstName} ${s.lastName}`),
      from: swapFromSpecialty,
      to: swapToSpecialty,
      comment: swapComment,
      timestamp: new Date().toISOString()
    });

    // Reset swap form
    setSwapSearchTerm('');
    setSwapComment('');
    alert(`Successfully moved ${matchingStaff.length} staff member(s) to ${swapToSpecialty}`);
  };

  // Toggle specialty expansion (for mobile accordion)
  const toggleSpecialty = (specialty: string) => {
    setExpandedSpecialties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(specialty)) {
        newSet.delete(specialty);
      } else {
        newSet.add(specialty);
      }
      return newSet;
    });
  };

  // Mark staff as competent in their current specialty (complete training)
  const markAsCompetent = (staffId: string, specialty: string) => {
    setStaff(prevStaff =>
      prevStaff.map(s => {
        if (s.id !== staffId) return s;

        return {
          ...s,
          competentSpecialties: [...(s.competentSpecialties || []), specialty].filter(
            (val, idx, arr) => arr.indexOf(val) === idx // Remove duplicates
          ),
          supernumeraryIn: (s.supernumeraryIn || []).filter(sp => sp !== specialty),
        };
      })
    );
  };

  // Handle right-click context menu
  const handleContextMenu = (e: React.MouseEvent, staffMember: StaffMember) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      staffMember,
    });
  };

  // Handle mobile menu button click
  const handleMobileMenu = (e: React.MouseEvent, staffMember: StaffMember) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setContextMenu({
      x: rect.left - 200, // Position menu to the left of the button
      y: rect.bottom + 5,
      staffMember,
    });
  };

  // Handle click to view profile
  const handleViewProfile = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember);
    setIsEditing(false);
  };

  // Context menu actions
  const handleChangeTeam = (staffMember: StaffMember, newSpecialty: string) => {
    setStaff(prevStaff =>
      prevStaff.map(s => {
        if (s.id !== staffMember.id) return s;
        const isCompetent = s.competentSpecialties?.includes(newSpecialty);
        return {
          ...s,
          specialty: newSpecialty,
          supernumeraryIn: isCompetent
            ? s.supernumeraryIn
            : [...(s.supernumeraryIn || []), newSpecialty].filter((v, i, a) => a.indexOf(v) === i),
        };
      })
    );
    setContextMenu(null);
    console.log(`Moved ${staffMember.firstName} ${staffMember.lastName} to ${newSpecialty}`);
  };

  const handleMarkTraining = (staffMember: StaffMember, specialty: string) => {
    setStaff(prevStaff =>
      prevStaff.map(s => {
        if (s.id !== staffMember.id) return s;
        return {
          ...s,
          supernumeraryIn: [...(s.supernumeraryIn || []), specialty].filter((v, i, a) => a.indexOf(v) === i),
        };
      })
    );
    setContextMenu(null);
    console.log(`Marked ${staffMember.firstName} ${staffMember.lastName} as training in ${specialty}`);
  };

  const handleMarkCompetentAction = (staffMember: StaffMember, specialty: string) => {
    setStaff(prevStaff =>
      prevStaff.map(s => {
        if (s.id !== staffMember.id) return s;
        return {
          ...s,
          competentSpecialties: [...(s.competentSpecialties || []), specialty].filter((v, i, a) => a.indexOf(v) === i),
          supernumeraryIn: (s.supernumeraryIn || []).filter(sp => sp !== specialty),
        };
      })
    );
    setContextMenu(null);
    console.log(`Marked ${staffMember.firstName} ${staffMember.lastName} as competent in ${specialty}`);
  };

  const handleChangeFTE = (staffMember: StaffMember) => {
    const newFTE = prompt(`Enter new FTE for ${staffMember.firstName} ${staffMember.lastName}:`, staffMember.fte.toString());
    if (newFTE && !isNaN(parseFloat(newFTE))) {
      setStaff(prevStaff =>
        prevStaff.map(s => (s.id === staffMember.id ? { ...s, fte: parseFloat(newFTE) } : s))
      );
      console.log(`Changed FTE for ${staffMember.firstName} ${staffMember.lastName} to ${newFTE}`);
    }
    setContextMenu(null);
  };

  const handleMarkInactive = (staffMember: StaffMember) => {
    if (confirm(`Mark ${staffMember.firstName} ${staffMember.lastName} as inactive (left organization)?`)) {
      setStaff(prevStaff => prevStaff.filter(s => s.id !== staffMember.id));
      console.log(`Removed ${staffMember.firstName} ${staffMember.lastName} from active roster`);
    }
    setContextMenu(null);
  };

  const handleAddNote = (staffMember: StaffMember) => {
    const note = prompt(`Add note for ${staffMember.firstName} ${staffMember.lastName}:`);
    if (note) {
      // TODO: Save note to Firebase
      console.log(`Note for ${staffMember.firstName} ${staffMember.lastName}:`, note);
      alert('Note saved (would save to database in production)');
    }
    setContextMenu(null);
  };

  // Handle save profile changes
  const handleSaveProfile = (updatedProfile: StaffMember) => {
    setStaff(prevStaff =>
      prevStaff.map(s => s.id === updatedProfile.id ? updatedProfile : s)
    );
    setSelectedStaff(updatedProfile);
    setIsEditing(false);

    // TODO: Save to Firebase
    console.log('Profile updated:', updatedProfile);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-200 px-3 md:px-4 py-2">
        <div className="flex flex-col gap-2">
          {/* Top Row: Search & View Toggle */}
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Stats Badge */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium whitespace-nowrap">
              <Users className="w-3 h-3" />
              <span>{staff.length}</span>
            </div>

            {/* Swap Button - Desktop */}
            <button
              onClick={() => setShowSwapStation(!showSwapStation)}
              className={`hidden md:flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
                showSwapStation ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowLeftRight className="w-3 h-3" />
              Swap
            </button>

            {/* Swap Button - Mobile */}
            <button
              onClick={() => setShowSwapStation(!showSwapStation)}
              className={`md:hidden p-1.5 rounded text-xs font-medium transition-colors ${
                showSwapStation ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              title="Staff Transfer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>

            {/* Desktop View Toggle */}
            <div className="hidden md:flex border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="Grid view"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Swap Station (Collapsible) */}
          {showSwapStation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 mb-2">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                Staff Transfer Station
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* From Specialty */}
                <div>
                  <label className="text-xs text-gray-700 font-medium mb-1 block">From</label>
                  <select
                    value={swapFromSpecialty}
                    onChange={(e) => setSwapFromSpecialty(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select specialty...</option>
                    {ALL_SPECIALTIES.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                {/* To Specialty */}
                <div>
                  <label className="text-xs text-gray-700 font-medium mb-1 block">To</label>
                  <select
                    value={swapToSpecialty}
                    onChange={(e) => setSwapToSpecialty(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select specialty...</option>
                    {ALL_SPECIALTIES.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name Search */}
              <div>
                <label className="text-xs text-gray-700 font-medium mb-1 block">Staff Name</label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={swapSearchTerm}
                  onChange={(e) => setSwapSearchTerm(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="text-xs text-gray-700 font-medium mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  Reason (optional)
                </label>
                <textarea
                  placeholder="Add a comment..."
                  value={swapComment}
                  onChange={(e) => setSwapComment(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500 resize-none"
                  rows={2}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleSwapStaff}
                  className="flex-1 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
                >
                  Transfer Staff
                </button>
                <button
                  onClick={() => {
                    setSwapFromSpecialty('');
                    setSwapToSpecialty('');
                    setSwapSearchTerm('');
                    setSwapComment('');
                  }}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto px-2 md:px-4 py-3">
        <div className={viewMode === 'list' ? 'max-w-7xl mx-auto space-y-1.5' : 'max-w-full'}>
          {/* List View */}
          {viewMode === 'list' && ALL_SPECIALTIES.map(specialty => {
            const colors = getSpecialtyColors(specialty);
            const specialtyStaff = staffBySpecialty[specialty] || [];
            const totalFTE = specialtyStaff.reduce((sum, s) => sum + (s.fte || 0), 0);
            const isExpanded = expandedSpecialties.has(specialty);

            return (
              <div key={specialty} className="bg-white rounded border border-gray-200">
                {/* Ultra-Compact Header */}
                <button
                  onClick={() => toggleSpecialty(specialty)}
                  className="w-full px-2 md:px-3 py-1.5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  {/* Mobile: One-liner with chevron left */}
                  <div className="flex items-center gap-2 flex-1 md:hidden">
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-xs font-semibold ${colors.text} truncate`}>
                      {specialty} • {specialtyStaff.length} staff • {totalFTE.toFixed(1)} FTE
                    </span>
                  </div>

                  {/* Desktop: Expanded with chevron right */}
                  <div className="hidden md:flex items-center gap-3 flex-1">
                    <div className={`w-1 h-4 rounded-full ${colors.bg} flex-shrink-0`}></div>
                    <span className={`text-sm font-semibold ${colors.text}`}>
                      {specialty}
                    </span>
                    <span className="text-xs text-gray-500">
                      {specialtyStaff.length} staff • {totalFTE.toFixed(1)} FTE
                    </span>
                  </div>

                  {/* Desktop Chevron */}
                  <div className="hidden md:block">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Staff List (Collapsible) */}
                {isExpanded && (
                  <div className="border-t border-gray-100">
                    {specialtyStaff.length > 0 ? (
                      <div className="divide-y divide-gray-50">
                        {specialtyStaff.map(staffMember => {
                          const professionalTitle = getProfessionalTitle(staffMember.roles[0] || '');
                          const isTraining = staffMember.supernumeraryIn?.includes(specialty);

                          return (
                            <div
                              key={staffMember.id}
                              onClick={() => handleViewProfile(staffMember)}
                              onContextMenu={(e) => handleContextMenu(e, staffMember)}
                              className="px-2 md:px-3 py-1 hover:bg-blue-50 hover:border-l-2 hover:border-blue-400 cursor-pointer transition-all text-xs flex items-center gap-2 group"
                            >
                              <span className="flex-1 truncate text-gray-900 group-hover:text-blue-700 group-hover:font-medium transition-all">
                                {professionalTitle} {staffMember.firstName} {staffMember.lastName} {staffMember.band}
                              </span>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {staffMember.fte !== 1 && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                                    {staffMember.fte}
                                  </span>
                                )}
                                {isTraining && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">
                                    SN
                                  </span>
                                )}
                                {/* Mobile Menu Button */}
                                <button
                                  onClick={(e) => handleMobileMenu(e, staffMember)}
                                  className="md:hidden p-1 hover:bg-gray-200 rounded transition-colors"
                                >
                                  <MoreVertical className="w-3.5 h-3.5 text-gray-500" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-3 py-4 text-center text-xs text-gray-400">
                        No staff assigned
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {ALL_SPECIALTIES.map(specialty => {
                const colors = getSpecialtyColors(specialty);
                const specialtyStaff = staffBySpecialty[specialty] || [];
                const totalFTE = specialtyStaff.reduce((sum, s) => sum + (s.fte || 0), 0);

                return (
                  <div key={specialty} className={`bg-white rounded-lg border-l-4 ${colors.border} shadow-sm p-3`}>
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${colors.bg} mt-1 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-semibold ${colors.text} truncate`}>
                          {specialty}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {specialtyStaff.length} staff • {totalFTE.toFixed(1)} FTE
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {specialtyStaff.map(staffMember => {
                        const professionalTitle = getProfessionalTitle(staffMember.roles[0] || '');
                        const isTraining = staffMember.supernumeraryIn?.includes(specialty);

                        return (
                          <div
                            key={staffMember.id}
                            onClick={() => handleViewProfile(staffMember)}
                            onContextMenu={(e) => handleContextMenu(e, staffMember)}
                            className="text-xs p-1.5 hover:bg-blue-50 hover:border-l-2 hover:border-blue-400 rounded cursor-pointer transition-all group"
                          >
                            <div className="flex items-center gap-1 justify-between">
                              <span className="truncate text-gray-900 group-hover:text-blue-700 group-hover:font-medium transition-all flex-1">
                                {professionalTitle} {staffMember.firstName} {staffMember.lastName} {staffMember.band}
                              </span>
                              <div className="flex gap-0.5 flex-shrink-0">
                                {staffMember.fte !== 1 && (
                                  <span className="text-[9px] px-1 py-0.5 rounded bg-blue-50 text-blue-700">
                                    {staffMember.fte}
                                  </span>
                                )}
                                {isTraining && (
                                  <span className="text-[9px] px-1 py-0.5 rounded bg-amber-50 text-amber-700">
                                    SN
                                  </span>
                                )}
                                {/* Mobile Menu Button */}
                                <button
                                  onClick={(e) => handleMobileMenu(e, staffMember)}
                                  className="md:hidden p-0.5 hover:bg-gray-200 rounded transition-colors"
                                >
                                  <MoreVertical className="w-3 h-3 text-gray-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {specialtyStaff.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-2">No staff</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 min-w-[200px]"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-900 truncate">
              {contextMenu.staffMember.firstName} {contextMenu.staffMember.lastName}
            </p>
            <p className="text-[10px] text-gray-500">
              {getProfessionalTitle(contextMenu.staffMember.roles[0])} • {contextMenu.staffMember.band}
            </p>
          </div>

          {/* Change Team Submenu */}
          <div className="py-1">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
              Change Team
            </div>
            <div className="max-h-40 overflow-y-auto">
              {ALL_SPECIALTIES.filter(s => s !== contextMenu.staffMember.specialty).map(specialty => (
                <button
                  key={specialty}
                  onClick={() => handleChangeTeam(contextMenu.staffMember, specialty)}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Actions */}
          <div className="py-1">
            <button
              onClick={() => handleViewProfile(contextMenu.staffMember)}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              📋 View Profile
            </button>
            <button
              onClick={() => handleChangeFTE(contextMenu.staffMember)}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              ⏰ Change FTE
            </button>
            <button
              onClick={() => handleAddNote(contextMenu.staffMember)}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              📝 Add Note
            </button>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Training Actions */}
          <div className="py-1">
            <button
              onClick={() => handleMarkTraining(contextMenu.staffMember, contextMenu.staffMember.specialty || '')}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              🎓 Mark as Training (SN)
            </button>
            <button
              onClick={() => handleMarkCompetentAction(contextMenu.staffMember, contextMenu.staffMember.specialty || '')}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              ✓ Mark as Competent
            </button>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Danger Zone */}
          <div className="py-1">
            <button
              onClick={() => handleMarkInactive(contextMenu.staffMember)}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              🗑️ Remove from Roster
            </button>
          </div>
        </div>
      )}

      {/* Profile Modal/Full Screen */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black/50 md:bg-black/50 z-50 flex items-center justify-center md:p-4">
          <div className="bg-white md:rounded-lg shadow-2xl w-full h-full md:h-auto md:max-w-6xl md:max-h-[90vh] overflow-hidden flex flex-col relative">
            {/* Close Button - Floating */}
            <button
              onClick={() => {
                setSelectedStaff(null);
                setIsEditing(false);
              }}
              className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/30 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto">
              <DesktopProfile
                staffProfile={selectedStaff}
                isEditable={isEditing}
                onSave={handleSaveProfile}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
