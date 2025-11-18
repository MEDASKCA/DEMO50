// Theatre Staff Roles - Predefined roles for staff requirement mapping

export interface TheatreRole {
  id: string;
  name: string;
  description: string;
  category: 'nursing' | 'anaesthetic' | 'support' | 'specialist';
  commonQuantity?: number; // Suggested default quantity
}

export const THEATRE_ROLES: TheatreRole[] = [
  {
    id: 'anaes-np',
    name: 'Anaes N/P',
    description: 'Anaesthetic Nurse Practitioners (RNs or ODPs assisting in anaesthetics)',
    category: 'anaesthetic',
    commonQuantity: 1
  },
  {
    id: 'scrub-np',
    name: 'Scrub N/P',
    description: 'Scrub Nurse Practitioners (RNs or ODPs who scrub for that specialty)',
    category: 'nursing',
    commonQuantity: 2
  },
  {
    id: 'hca',
    name: 'HCA',
    description: 'Health Care Assistants',
    category: 'support',
    commonQuantity: 1
  },
  {
    id: 'cell-salvage-np',
    name: 'Cell Salvage N/P',
    description: 'RN or ODP trained for cell salvage procedures',
    category: 'specialist',
    commonQuantity: 1
  },
  {
    id: 'circulating-nurse',
    name: 'Circulating Nurse',
    description: 'RN responsible for circulating duties in theatre',
    category: 'nursing',
    commonQuantity: 1
  },
  {
    id: 'runner',
    name: 'Runner',
    description: 'Theatre runner for fetching equipment and supplies',
    category: 'support',
    commonQuantity: 1
  },
  {
    id: 'anaesthetic-assistant',
    name: 'Anaesthetic Assistant',
    description: 'Qualified assistant for anaesthetist',
    category: 'anaesthetic',
    commonQuantity: 1
  },
  {
    id: 'recovery-nurse',
    name: 'Recovery Nurse',
    description: 'RN responsible for post-operative recovery',
    category: 'nursing',
    commonQuantity: 1
  },
  {
    id: 'perfusionist',
    name: 'Perfusionist',
    description: 'Specialist for cardiac bypass procedures',
    category: 'specialist',
    commonQuantity: 1
  },
  {
    id: 'radiographer',
    name: 'Radiographer',
    description: 'Imaging specialist for intraoperative imaging',
    category: 'specialist',
    commonQuantity: 1
  }
];

// Helper function to get role by ID
export function getTheatreRoleById(id: string): TheatreRole | undefined {
  return THEATRE_ROLES.find(role => role.id === id);
}

// Helper function to get role by name
export function getTheatreRoleByName(name: string): TheatreRole | undefined {
  return THEATRE_ROLES.find(role => role.name.toLowerCase() === name.toLowerCase());
}

// Helper function to get roles by category
export function getTheatreRolesByCategory(category: TheatreRole['category']): TheatreRole[] {
  return THEATRE_ROLES.filter(role => role.category === category);
}
