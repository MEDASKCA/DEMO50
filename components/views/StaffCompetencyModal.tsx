"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ChevronRight,
  Star,
  Award,
  Book,
  Briefcase,
  AlertCircle,
  CheckCircle,
  Users,
  Clock,
  TrendingUp,
  Calendar,
  ChevronLeft,
  User,
  MapPin,
  Coffee,
  Shield,
  Activity,
  XCircle,
  Target,
  BarChart3,
} from "lucide-react";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface StaffCompetencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: {
    name: string;
    role: string;
    theatre?: string;
    id?: string;
  };
}

type ViewMode = "specialties" | "procedures" | "systems";

interface Specialty {
  id: string;
  name: string;
  level: "Expert" | "Competent" | "Learning";
  certified: boolean;
  lastAssessed: string;
  procedureCount: number;
}

interface Procedure {
  id: string;
  name: string;
  specialtyId: string;
  frequency: "Daily" | "Weekly" | "Monthly" | "Rarely";
  lastPerformed: string;
  totalPerformed: number;
  complexity: "Basic" | "Intermediate" | "Advanced" | "Expert";
}

interface SystemRating {
  id: string;
  procedureId: string;
  name: string;
  manufacturer: string;
  rating: 1 | 2 | 3 | 4 | 5;
  lastUsed: string;
  casesCompleted: number;
  notes?: string;
}

export default function StaffCompetencyModal({
  isOpen,
  onClose,
  staff,
}: StaffCompetencyModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("specialties");
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [staffProfile, setStaffProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch real staff profile from Firebase if ID is available
  useEffect(() => {
    const fetchStaffProfile = async () => {
      if (!staff?.id || !db) {
        setStaffProfile(null);
        return;
      }

      try {
        setLoading(true);
        const staffDoc = await getDoc(doc(db, 'staff', staff.id));
        if (staffDoc.exists()) {
          setStaffProfile({ id: staffDoc.id, ...staffDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching staff profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchStaffProfile();
    }
  }, [staff?.id, isOpen]);

  if (!isOpen) return null;

  const showCompetencies =
    staff.role.includes("Scrub") ||
    staff.role.includes("Anaes N/P") ||
    staff.role.includes("Anaesthetic Nurse");
  const isAnaesNP =
    staff.role.includes("Anaes N/P") ||
    staff.role.includes("Anaesthetic Nurse");

  if (!showCompetencies) {
    return null;
  }

  // Mock comprehensive competency data
  const getStaffData = () => {
    const anaestheticSpecialties: Specialty[] = [
      { id: "general-anaes", name: "General Anaesthesia", level: "Expert", certified: true, lastAssessed: "2024-09-15", procedureCount: 125 },
      { id: "regional-anaes", name: "Regional Anaesthesia", level: "Expert", certified: true, lastAssessed: "2024-08-20", procedureCount: 87 },
      { id: "paed-anaes", name: "Paediatric Anaesthesia", level: "Competent", certified: true, lastAssessed: "2024-07-10", procedureCount: 42 },
      { id: "airway-mgmt", name: "Advanced Airway Management", level: "Expert", certified: true, lastAssessed: "2024-09-01", procedureCount: 156 },
      { id: "sedation", name: "Procedural Sedation", level: "Expert", certified: true, lastAssessed: "2024-08-15", procedureCount: 93 },
      { id: "cardiac-anaes", name: "Cardiac Anaesthesia", level: "Competent", certified: false, lastAssessed: "2024-06-01", procedureCount: 18 },
      { id: "neuro-anaes", name: "Neuroanaesthesia", level: "Learning", certified: false, lastAssessed: "2024-10-01", procedureCount: 8 },
    ];

    const scrubSpecialties: Specialty[] = [
      { id: "ortho-trauma", name: "Orthopaedic Trauma", level: "Expert", certified: true, lastAssessed: "2024-09-15", procedureCount: 47 },
      { id: "elective-ortho", name: "Elective Orthopaedics", level: "Expert", certified: true, lastAssessed: "2024-08-20", procedureCount: 35 },
      { id: "omfs", name: "Oral & Maxillofacial Surgery", level: "Competent", certified: true, lastAssessed: "2024-07-10", procedureCount: 18 },
      { id: "plastics", name: "Plastic Surgery", level: "Competent", certified: false, lastAssessed: "2024-06-01", procedureCount: 12 },
      { id: "general", name: "General Surgery", level: "Expert", certified: true, lastAssessed: "2024-09-01", procedureCount: 28 },
      { id: "neuro", name: "Neurosurgery", level: "Learning", certified: false, lastAssessed: "2024-10-01", procedureCount: 5 },
    ];

    const specialties = isAnaesNP ? anaestheticSpecialties : scrubSpecialties;

    const anaestheticProcedures: Record<string, Procedure[]> = {
      "general-anaes": [
        { id: "ga-intubation", name: "General Anaesthesia with Intubation", specialtyId: "general-anaes", frequency: "Daily", lastPerformed: "2024-10-19", totalPerformed: 456, complexity: "Intermediate" },
        { id: "ga-lma", name: "General Anaesthesia with LMA", specialtyId: "general-anaes", frequency: "Daily", lastPerformed: "2024-10-19", totalPerformed: 342, complexity: "Intermediate" },
        { id: "rapid-sequence", name: "Rapid Sequence Induction", specialtyId: "general-anaes", frequency: "Weekly", lastPerformed: "2024-10-17", totalPerformed: 89, complexity: "Advanced" },
      ],
      "regional-anaes": [
        { id: "spinal", name: "Spinal Anaesthesia", specialtyId: "regional-anaes", frequency: "Daily", lastPerformed: "2024-10-18", totalPerformed: 234, complexity: "Intermediate" },
        { id: "epidural", name: "Epidural Anaesthesia", specialtyId: "regional-anaes", frequency: "Weekly", lastPerformed: "2024-10-15", totalPerformed: 145, complexity: "Advanced" },
        { id: "nerve-block", name: "Peripheral Nerve Block", specialtyId: "regional-anaes", frequency: "Daily", lastPerformed: "2024-10-19", totalPerformed: 198, complexity: "Advanced" },
      ],
      "airway-mgmt": [
        { id: "difficult-airway", name: "Difficult Airway Management", specialtyId: "airway-mgmt", frequency: "Weekly", lastPerformed: "2024-10-16", totalPerformed: 67, complexity: "Expert" },
        { id: "fibreoptic", name: "Fibreoptic Intubation", specialtyId: "airway-mgmt", frequency: "Monthly", lastPerformed: "2024-10-08", totalPerformed: 34, complexity: "Expert" },
      ],
      sedation: [
        { id: "conscious-sedation", name: "Conscious Sedation", specialtyId: "sedation", frequency: "Daily", lastPerformed: "2024-10-19", totalPerformed: 276, complexity: "Intermediate" },
        { id: "deep-sedation", name: "Deep Sedation", specialtyId: "sedation", frequency: "Weekly", lastPerformed: "2024-10-17", totalPerformed: 123, complexity: "Advanced" },
      ],
    };

    const scrubProcedures: Record<string, Procedure[]> = {
      "ortho-trauma": [
        { id: "tibial-nail", name: "Tibial Intramedullary Nailing", specialtyId: "ortho-trauma", frequency: "Weekly", lastPerformed: "2024-10-18", totalPerformed: 145, complexity: "Advanced" },
        { id: "femoral-nail", name: "Femoral Intramedullary Nailing", specialtyId: "ortho-trauma", frequency: "Weekly", lastPerformed: "2024-10-17", totalPerformed: 132, complexity: "Advanced" },
        { id: "dhs", name: "Dynamic Hip Screw", specialtyId: "ortho-trauma", frequency: "Daily", lastPerformed: "2024-10-19", totalPerformed: 256, complexity: "Intermediate" },
        { id: "ankle-orif", name: "Ankle ORIF", specialtyId: "ortho-trauma", frequency: "Weekly", lastPerformed: "2024-10-15", totalPerformed: 98, complexity: "Intermediate" },
        { id: "wrist-orif", name: "Distal Radius ORIF", specialtyId: "ortho-trauma", frequency: "Weekly", lastPerformed: "2024-10-16", totalPerformed: 87, complexity: "Intermediate" },
      ],
      "elective-ortho": [
        { id: "thr", name: "Total Hip Replacement", specialtyId: "elective-ortho", frequency: "Daily", lastPerformed: "2024-10-19", totalPerformed: 342, complexity: "Advanced" },
        { id: "tkr", name: "Total Knee Replacement", specialtyId: "elective-ortho", frequency: "Daily", lastPerformed: "2024-10-18", totalPerformed: 298, complexity: "Advanced" },
        { id: "acl", name: "ACL Reconstruction", specialtyId: "elective-ortho", frequency: "Weekly", lastPerformed: "2024-10-14", totalPerformed: 76, complexity: "Advanced" },
        { id: "shoulder-arthro", name: "Shoulder Arthroscopy", specialtyId: "elective-ortho", frequency: "Weekly", lastPerformed: "2024-10-12", totalPerformed: 89, complexity: "Intermediate" },
      ],
      omfs: [
        { id: "mandible-orif", name: "Mandibular ORIF", specialtyId: "omfs", frequency: "Monthly", lastPerformed: "2024-09-28", totalPerformed: 23, complexity: "Expert" },
        { id: "wisdom", name: "Wisdom Tooth Extraction", specialtyId: "omfs", frequency: "Weekly", lastPerformed: "2024-10-17", totalPerformed: 156, complexity: "Basic" },
      ],
    };

    const systems: Record<string, SystemRating[]> = {
      "tibial-nail": [
        { id: "synthes-expert", procedureId: "tibial-nail", name: "Expert Tibial Nailing System", manufacturer: "DePuy Synthes", rating: 5, lastUsed: "2024-10-18", casesCompleted: 89, notes: "Can mentor others on this system" },
        { id: "stryker-t2", procedureId: "tibial-nail", name: "T2 Alpha Tibial Nailing System", manufacturer: "Stryker", rating: 4, lastUsed: "2024-10-15", casesCompleted: 45, notes: "Proficient without supervision" },
        { id: "smith-nephew-trigen", procedureId: "tibial-nail", name: "TRIGEN META-NAIL", manufacturer: "Smith & Nephew", rating: 3, lastUsed: "2024-09-20", casesCompleted: 12, notes: "Requires supervision for complex cases" },
        { id: "zimmer-natural", procedureId: "tibial-nail", name: "Natural Nail System", manufacturer: "Zimmer Biomet", rating: 2, lastUsed: "2024-06-10", casesCompleted: 3, notes: "Novice - basic familiarity only" },
      ],
      thr: [
        { id: "depuy-corail", procedureId: "thr", name: "Corail Hip System", manufacturer: "DePuy Synthes", rating: 5, lastUsed: "2024-10-19", casesCompleted: 145, notes: "Expert - teaches on courses" },
        { id: "zimmer-ml-taper", procedureId: "thr", name: "M/L Taper Hip Prosthesis", manufacturer: "Zimmer Biomet", rating: 4, lastUsed: "2024-10-17", casesCompleted: 87, notes: "Independent practice" },
        { id: "stryker-accolade", procedureId: "thr", name: "Accolade II Hip System", manufacturer: "Stryker", rating: 4, lastUsed: "2024-10-14", casesCompleted: 65, notes: "Proficient with all approaches" },
        { id: "smith-nephew-polar", procedureId: "thr", name: "POLAR Hip System", manufacturer: "Smith & Nephew", rating: 1, lastUsed: "Never", casesCompleted: 0, notes: "No experience - training scheduled" },
      ],
    };

    const procedures = isAnaesNP ? anaestheticProcedures : scrubProcedures;

    return { specialties, procedures, systems };
  };

  const { specialties, procedures, systems } = getStaffData();

  const staffContext = {
    employeeId: "NHS-2847",
    department: isAnaesNP ? "Anaesthetics" : "Surgery",
    grade: "Band 6",
    currentLocation: staff.theatre || "Theatre 1 - Orthopaedics",
    shiftStart: "08:00",
    shiftEnd: "19:00",
    breakStatus: { taken: false, totalBreaks: "0/3" },
    todaysActivity: { casesCompleted: 3, reliefProvided: 1, averageEfficiency: "94%", overtime: "0 hrs" },
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-emerald-50 text-emerald-700 border-emerald-300";
      case "Competent": return "bg-sky-50 text-sky-700 border-sky-300";
      case "Learning": return "bg-amber-50 text-amber-700 border-amber-300";
      default: return "bg-gray-50 text-gray-700 border-gray-300";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Expert": return "text-purple-700 bg-purple-50 border-purple-200";
      case "Advanced": return "text-red-700 bg-red-50 border-red-200";
      case "Intermediate": return "text-orange-700 bg-orange-50 border-orange-200";
      case "Basic": return "text-green-700 bg-green-50 border-green-200";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getRatingDescription = (rating: number) => {
    const descriptions = ["", "No experience", "Novice", "With supervision", "Without supervision", "Mentor"];
    return descriptions[rating];
  };

  const getRatingColor = (rating: number) => {
    const colors = ["", "text-gray-400", "text-orange-600", "text-amber-600", "text-sky-600", "text-emerald-600"];
    return colors[rating];
  };

  const handleSpecialtyClick = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setViewMode("procedures");
  };

  const handleProcedureClick = (procedure: Procedure) => {
    setSelectedProcedure(procedure);
    setViewMode("systems");
  };

  const handleBack = () => {
    if (viewMode === "systems") {
      setViewMode("procedures");
      setSelectedProcedure(null);
    } else if (viewMode === "procedures") {
      setViewMode("specialties");
      setSelectedSpecialty(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="bg-white w-full h-full overflow-hidden flex flex-col md:flex-row">
        {/* Left Sidebar - Staff Context (Desktop only) */}
        <div className="hidden lg:flex lg:flex-col lg:w-80 xl:w-96 bg-gradient-to-b from-gray-50 to-white border-r-2 border-gray-200">
          {/* Staff Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                {staff.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{staff.name}</h3>
                <p className="text-blue-100 text-sm">{staff.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-blue-800 bg-opacity-40 rounded-lg p-2">
                <p className="text-xs text-blue-200">ID</p>
                <p className="text-sm font-semibold">{staffContext.employeeId}</p>
              </div>
              <div className="bg-blue-800 bg-opacity-40 rounded-lg p-2">
                <p className="text-xs text-blue-200">Grade</p>
                <p className="text-sm font-semibold">{staffContext.grade}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-6 space-y-4">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2 text-blue-600" />
                Performance Today
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600">Cases</p>
                  <p className="text-2xl font-bold text-gray-900">{staffContext.todaysActivity.casesCompleted}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Efficiency</p>
                  <p className="text-2xl font-bold text-emerald-600">{staffContext.todaysActivity.averageEfficiency}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-3 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Competency Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800">Expert Level</span>
                  <span className="text-sm font-bold text-emerald-600">{specialties.filter(s => s.level === "Expert").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800">Certified</span>
                  <span className="text-sm font-bold text-blue-600">{specialties.filter(s => s.certified).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800">Total Procedures</span>
                  <span className="text-sm font-bold text-gray-900">{specialties.reduce((sum, s) => sum + s.procedureCount, 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {viewMode !== "specialties" && (
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">Staff Competency Profile</h2>
                  </div>
                  <p className="text-blue-100 text-sm mt-1">
                    {staff.name} • {staff.role}
                    {viewMode === "procedures" && selectedSpecialty && ` • ${selectedSpecialty.name}`}
                    {viewMode === "systems" && selectedProcedure && ` • ${selectedProcedure.name}`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* Specialties View */}
            {viewMode === "specialties" && (
              <div className="max-w-5xl mx-auto space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty.id}
                      onClick={() => handleSpecialtyClick(specialty)}
                      className="group bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition-all text-left"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors mb-2">
                            {specialty.name}
                          </h4>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getLevelColor(specialty.level)}`}>
                              {specialty.level}
                            </span>
                            {specialty.certified && (
                              <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border-2 border-emerald-200">
                                <Shield className="w-3 h-3" />
                                Certified
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Briefcase className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold">{specialty.procedureCount}</span> procedures
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{new Date(specialty.lastAssessed).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Procedures View */}
            {viewMode === "procedures" && selectedSpecialty && (
              <div className="max-w-5xl mx-auto space-y-4">
                <div className="grid gap-4">
                  {procedures[selectedSpecialty.id]?.map((procedure) => (
                    <button
                      key={procedure.id}
                      onClick={() => handleProcedureClick(procedure)}
                      className="group bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition-all text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                              {procedure.name}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getComplexityColor(procedure.complexity)}`}>
                              {procedure.complexity}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold">{procedure.frequency}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              {new Date(procedure.lastPerformed).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <TrendingUp className="w-4 h-4 text-emerald-600" />
                              <span className="font-bold">{procedure.totalPerformed}</span> completed
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Systems/Equipment View */}
            {viewMode === "systems" && selectedProcedure && (
              <div className="max-w-5xl mx-auto space-y-4">
                {systems[selectedProcedure.id]?.map((system) => (
                  <div
                    key={system.id}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{system.name}</h4>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Manufacturer:</span> {system.manufacturer}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < system.rating
                                  ? `fill-current ${getRatingColor(system.rating)}`
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className={`text-sm font-bold ${getRatingColor(system.rating)}`}>
                          {getRatingDescription(system.rating)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4 border-t-2 border-gray-100">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Cases Completed</p>
                        <p className="text-lg font-bold text-gray-900">{system.casesCompleted}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Last Used</p>
                        <p className="text-lg font-bold text-gray-900">
                          {system.lastUsed === "Never" ? "Never" : new Date(system.lastUsed).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Status</p>
                        <p className={`text-lg font-bold ${
                          system.rating >= 4 ? "text-emerald-600" : system.rating >= 3 ? "text-amber-600" : "text-orange-600"
                        }`}>
                          {system.rating >= 4 ? "Current" : system.rating >= 3 ? "Practice Needed" : "Training Required"}
                        </p>
                      </div>
                    </div>

                    {system.notes && (
                      <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900 italic flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          {system.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="italic">Competency data verified by Education & Training Department</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
