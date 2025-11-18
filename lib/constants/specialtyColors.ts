/**
 * Specialty color coding system for staff team management
 */

export const SPECIALTY_COLORS = {
  'Emergency': {
    bg: 'bg-red-100',
    border: 'border-red-400',
    text: 'text-red-900',
    hover: 'hover:bg-red-200',
    ring: 'ring-red-400',
  },
  'Endoscopy': {
    bg: 'bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-900',
    hover: 'hover:bg-blue-200',
    ring: 'ring-blue-400',
  },
  'ENT': {
    bg: 'bg-purple-100',
    border: 'border-purple-400',
    text: 'text-purple-900',
    hover: 'hover:bg-purple-200',
    ring: 'ring-purple-400',
  },
  'General Surgery': {
    bg: 'bg-green-100',
    border: 'border-green-400',
    text: 'text-green-900',
    hover: 'hover:bg-green-200',
    ring: 'ring-green-400',
  },
  'Gynaecology': {
    bg: 'bg-pink-100',
    border: 'border-pink-400',
    text: 'text-pink-900',
    hover: 'hover:bg-pink-200',
    ring: 'ring-pink-400',
  },
  'Neurology': {
    bg: 'bg-indigo-100',
    border: 'border-indigo-400',
    text: 'text-indigo-900',
    hover: 'hover:bg-indigo-200',
    ring: 'ring-indigo-400',
  },
  'Obstetrics': {
    bg: 'bg-rose-100',
    border: 'border-rose-400',
    text: 'text-rose-900',
    hover: 'hover:bg-rose-200',
    ring: 'ring-rose-400',
  },
  'Ophthalmology': {
    bg: 'bg-teal-100',
    border: 'border-teal-400',
    text: 'text-teal-900',
    hover: 'hover:bg-teal-200',
    ring: 'ring-teal-400',
  },
  'Oral & Maxillofacial': {
    bg: 'bg-orange-100',
    border: 'border-orange-400',
    text: 'text-orange-900',
    hover: 'hover:bg-orange-200',
    ring: 'ring-orange-400',
  },
  'Orthopaedics': {
    bg: 'bg-amber-100',
    border: 'border-amber-400',
    text: 'text-amber-900',
    hover: 'hover:bg-amber-200',
    ring: 'ring-amber-400',
  },
  'Plastics': {
    bg: 'bg-fuchsia-100',
    border: 'border-fuchsia-400',
    text: 'text-fuchsia-900',
    hover: 'hover:bg-fuchsia-200',
    ring: 'ring-fuchsia-400',
  },
  'Renal': {
    bg: 'bg-cyan-100',
    border: 'border-cyan-400',
    text: 'text-cyan-900',
    hover: 'hover:bg-cyan-200',
    ring: 'ring-cyan-400',
  },
  'Urology': {
    bg: 'bg-sky-100',
    border: 'border-sky-400',
    text: 'text-sky-900',
    hover: 'hover:bg-sky-200',
    ring: 'ring-sky-400',
  },
  'Vascular': {
    bg: 'bg-violet-100',
    border: 'border-violet-400',
    text: 'text-violet-900',
    hover: 'hover:bg-violet-200',
    ring: 'ring-violet-400',
  },
  'Anaesthetics': {
    bg: 'bg-slate-100',
    border: 'border-slate-400',
    text: 'text-slate-900',
    hover: 'hover:bg-slate-200',
    ring: 'ring-slate-400',
  },
  'Recovery': {
    bg: 'bg-emerald-100',
    border: 'border-emerald-400',
    text: 'text-emerald-900',
    hover: 'hover:bg-emerald-200',
    ring: 'ring-emerald-400',
  },
} as const;

export type SpecialtyName = keyof typeof SPECIALTY_COLORS;

/**
 * Get color classes for a specialty
 */
export function getSpecialtyColors(specialty: string) {
  // Try exact match first
  if (specialty in SPECIALTY_COLORS) {
    return SPECIALTY_COLORS[specialty as SpecialtyName];
  }

  // Default gray color for unknown specialties
  return {
    bg: 'bg-gray-100',
    border: 'border-gray-400',
    text: 'text-gray-900',
    hover: 'hover:bg-gray-200',
    ring: 'ring-gray-400',
  };
}

/**
 * All specialties including Anaesthetics and Recovery
 */
export const ALL_SPECIALTIES = [
  'Emergency',
  'Endoscopy',
  'ENT',
  'General Surgery',
  'Gynaecology',
  'Neurology',
  'Obstetrics',
  'Ophthalmology',
  'Oral & Maxillofacial',
  'Orthopaedics',
  'Plastics',
  'Renal',
  'Urology',
  'Vascular',
  'Anaesthetics',
  'Recovery',
] as const;

/**
 * Get professional title abbreviation
 */
export function getProfessionalTitle(role: string): string {
  if (role.includes('N/P') || role.includes('Nurse')) return 'RN';
  if (role.includes('ODP')) return 'ODP';
  if (role.includes('HCA') || role.includes('Healthcare Assistant')) return 'HCA';
  if (role.includes('Manager')) return 'Manager';
  if (role.includes('Admin')) return 'Admin';
  return 'RN'; // Default
}
