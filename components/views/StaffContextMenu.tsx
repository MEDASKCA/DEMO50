'use client';

import React, { useState, useEffect } from 'react';
import { Coffee, Users, X } from 'lucide-react';

interface StaffContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  staff: {
    name: string;
    role: string;
    theatre: string;
    theatreId: string;
    shift: string;
  } | null;
  allTheatres: any[];
  onClose: () => void;
  onSendBreak: (type: 'meal' | 'tea') => void;
  onSwapStaff: (targetTheatreId: string, targetStaffId: string) => void;
}

export default function StaffContextMenu({
  isOpen,
  position,
  staff,
  allTheatres,
  onClose,
  onSendBreak,
  onSwapStaff
}: StaffContextMenuProps) {
  const [showBreakMenu, setShowBreakMenu] = useState(false);
  const [showSwapMenu, setShowSwapMenu] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState<string | null>(null);
  const [showCompetencyConfirm, setShowCompetencyConfirm] = useState(false);
  const [swapTarget, setSwapTarget] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setShowBreakMenu(false);
      setShowSwapMenu(false);
      setSelectedTheatre(null);
      setShowCompetencyConfirm(false);
      setSwapTarget(null);
    }
  }, [isOpen]);

  if (!isOpen || !staff) return null;

  // Determine eligible staff for swapping based on role
  const getEligibleStaff = (targetTheatre: any) => {
    if (!targetTheatre.team) return [];

    const staffRole = staff.role;
    const eligible: any[] = [];

    Object.entries(targetTheatre.team).forEach(([key, member]: [string, any]) => {
      if (!member || member.name === 'VACANT' || member.name === staff.name) return;

      let canSwap = false;
      let requiresConfirmation = false;

      // Anaes N/P can be relieved by Anaes N/P
      if (staffRole.includes('Anaesthetic') && member.role.includes('Anaesthetic')) {
        canSwap = true;
      }
      // Scrub N/P can be relieved by Scrub N/P
      else if (staffRole.includes('Scrub') && member.role.includes('Scrub')) {
        canSwap = true;
      }
      // HCA can be relieved by Scrub N/P, Anaes N/P, or HCA
      else if (staffRole.includes('Healthcare Assistant') || staffRole.includes('HCA')) {
        if (member.role.includes('Scrub') || member.role.includes('Anaesthetic') || member.role.includes('HCA')) {
          canSwap = true;
        }
      }
      // Cross-role swaps require confirmation
      else if (
        (staffRole.includes('Anaesthetic') && member.role.includes('Scrub')) ||
        (staffRole.includes('Scrub') && member.role.includes('Anaesthetic'))
      ) {
        canSwap = true;
        requiresConfirmation = true;
      }

      if (canSwap) {
        eligible.push({
          ...member,
          key,
          theatreId: targetTheatre.theatreId,
          theatreName: targetTheatre.theatre,
          requiresConfirmation
        });
      }
    });

    return eligible;
  };

  const handleSwapClick = (targetStaff: any) => {
    if (targetStaff.requiresConfirmation) {
      setSwapTarget(targetStaff);
      setShowCompetencyConfirm(true);
    } else {
      onSwapStaff(targetStaff.theatreId, targetStaff.key);
      onClose();
    }
  };

  const confirmSwap = () => {
    if (swapTarget) {
      onSwapStaff(swapTarget.theatreId, swapTarget.key);
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[200px]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          maxHeight: '400px',
          overflowY: 'auto'
        }}
      >
        {!showBreakMenu && !showSwapMenu && (
          <div className="py-1">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-900">{staff.name}</p>
              <p className="text-[10px] text-gray-600">{staff.role} • {staff.theatre}</p>
            </div>

            <button
              onClick={() => setShowBreakMenu(true)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Coffee className="w-4 h-4 text-blue-600" />
              Send for Break
            </button>

            <button
              onClick={() => setShowSwapMenu(true)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-green-600" />
              Swap Staff
            </button>
          </div>
        )}

        {showBreakMenu && (
          <div className="py-1">
            <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-900">Break Type</p>
              <button onClick={() => setShowBreakMenu(false)}>
                <X className="w-3 h-3 text-gray-400" />
              </button>
            </div>

            <button
              onClick={() => {
                onSendBreak('meal');
                onClose();
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
            >
              <p className="font-medium">Meal Break</p>
              <p className="text-xs text-gray-500">30-60 minutes</p>
            </button>

            <button
              onClick={() => {
                onSendBreak('tea');
                onClose();
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
            >
              <p className="font-medium">Tea Break</p>
              <p className="text-xs text-gray-500">15 minutes</p>
            </button>
          </div>
        )}

        {showSwapMenu && !selectedTheatre && (
          <div className="py-1">
            <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-900">Select Theatre</p>
              <button onClick={() => setShowSwapMenu(false)}>
                <X className="w-3 h-3 text-gray-400" />
              </button>
            </div>

            {allTheatres
              .filter(t => t.theatreId !== staff.theatreId && t.unit !== 'recovery')
              .map(theatre => (
                <button
                  key={theatre.theatreId}
                  onClick={() => setSelectedTheatre(theatre.theatreId)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                >
                  <p className="font-medium">{theatre.theatre}</p>
                  <p className="text-xs text-gray-500">{theatre.specialty}</p>
                </button>
              ))}
          </div>
        )}

        {showSwapMenu && selectedTheatre && (
          <div className="py-1">
            <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-900">Select Staff to Swap</p>
              <button onClick={() => setSelectedTheatre(null)}>
                <X className="w-3 h-3 text-gray-400" />
              </button>
            </div>

            {(() => {
              const targetTheatre = allTheatres.find(t => t.theatreId === selectedTheatre);
              const eligibleStaff = targetTheatre ? getEligibleStaff(targetTheatre) : [];

              if (eligibleStaff.length === 0) {
                return (
                  <div className="px-3 py-4 text-center">
                    <p className="text-xs text-gray-500">No eligible staff for swap</p>
                  </div>
                );
              }

              return eligibleStaff.map((targetStaff, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSwapClick(targetStaff)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                >
                  <p className="font-medium">{targetStaff.name}</p>
                  <p className="text-xs text-gray-500">
                    {targetStaff.role}
                    {targetStaff.requiresConfirmation && (
                      <span className="ml-1 text-orange-600">⚠ Requires confirmation</span>
                    )}
                  </p>
                </button>
              ));
            })()}
          </div>
        )}
      </div>

      {/* Competency Confirmation Modal */}
      {showCompetencyConfirm && swapTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Staff Swap</h3>
            <p className="text-sm text-gray-600 mb-4">
              <strong>{swapTarget.name}</strong> ({swapTarget.role}) may not have the exact competency match for <strong>{staff.role}</strong>.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to proceed with this swap?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCompetencyConfirm(false);
                  setSwapTarget(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmSwap}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Confirm Swap
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
