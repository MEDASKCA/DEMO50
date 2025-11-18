// Finance Configuration for Theatre Operations
// Salary scales based on NHS Agenda for Change 2024/25

export interface SalaryBand {
  min: number;
  max: number;
  avg: number;
  typical: number; // Most common point on scale
}

export interface FinanceConfig {
  salaryScales: {
    band2: SalaryBand;
    band3: SalaryBand;
    band5: SalaryBand;
    band6: SalaryBand;
    band7: SalaryBand;
    band8a: SalaryBand;
    band8b: SalaryBand;
    band8c: SalaryBand;
    band8d: SalaryBand;
    band9: SalaryBand;
  };

  oncostPercentage: number; // NI, pension, etc.

  annualLeave: {
    band2to5: number; // days
    band6to7: number;
    band8plus: number;
    bankHolidays: number;
  };

  sicknessAbsence: {
    averagePercentage: number;
    trustTarget: number;
  };

  bankRates: {
    band5: { standard: number; enhanced: number; night: number };
    band6: { standard: number; enhanced: number; night: number };
    band7: { standard: number; enhanced: number; night: number };
  };

  agencyRates: {
    band5: { standard: number; enhanced: number; night: number };
    band6: { standard: number; enhanced: number; night: number };
    band7: { standard: number; enhanced: number; night: number };
  };

  workingWeek: {
    fullTime: number; // hours
    workingDaysPerYear: number;
  };

  theatreOperations: {
    theatreCount: number;
    operatingHoursPerDay: number;
    operatingDaysPerWeek: number;
  };

  coverageMultiplier: number; // For leave, sickness, training
}

// Default configuration based on Royal London Hospital
export const defaultFinanceConfig: FinanceConfig = {
  salaryScales: {
    band2: { min: 22383, max: 22383, avg: 22383, typical: 22383 },
    band3: { min: 22816, max: 24336, avg: 23576, typical: 24000 },
    band5: { min: 28407, max: 34581, avg: 31494, typical: 30000 },
    band6: { min: 35392, max: 42618, avg: 39005, typical: 38000 },
    band7: { min: 43742, max: 50056, avg: 46899, typical: 46000 },
    band8a: { min: 51883, max: 57349, avg: 54616, typical: 54000 },
    band8b: { min: 60504, max: 70417, avg: 65461, typical: 65000 },
    band8c: { min: 73664, max: 85601, avg: 79633, typical: 80000 },
    band8d: { min: 88168, max: 101650, avg: 94909, typical: 95000 },
    band9: { min: 105481, max: 121271, avg: 113376, typical: 110000 }
  },

  oncostPercentage: 30, // 30% for NI, pension, etc.

  annualLeave: {
    band2to5: 27,
    band6to7: 27,
    band8plus: 30,
    bankHolidays: 8
  },

  sicknessAbsence: {
    averagePercentage: 5.0, // NHS average
    trustTarget: 3.5
  },

  bankRates: {
    band5: { standard: 18, enhanced: 27, night: 36 },
    band6: { standard: 22, enhanced: 33, night: 44 },
    band7: { standard: 28, enhanced: 42, night: 56 }
  },

  agencyRates: {
    band5: { standard: 25, enhanced: 37.50, night: 50 },
    band6: { standard: 32, enhanced: 48, night: 64 },
    band7: { standard: 40, enhanced: 60, night: 80 }
  },

  workingWeek: {
    fullTime: 37.5,
    workingDaysPerYear: 225 // 365 - leave - bank holidays - estimated sickness
  },

  theatreOperations: {
    theatreCount: 20,
    operatingHoursPerDay: 10,
    operatingDaysPerWeek: 5
  },

  coverageMultiplier: 1.35 // For leave, sickness, training coverage
};

// Staff role definitions
export interface StaffRole {
  id: string;
  name: string;
  shortName: string;
  category: 'clinical' | 'support' | 'management';
  bands: string[];
  description: string;
}

export const staffRoles: StaffRole[] = [
  {
    id: 'anaes',
    name: 'Anaesthetic Nurse/Practitioner',
    shortName: 'Anaes N/P',
    category: 'clinical',
    bands: ['band5', 'band6', 'band7'],
    description: 'RN or ODP qualified - anaesthetic support'
  },
  {
    id: 'scrub',
    name: 'Scrub Nurse/Practitioner',
    shortName: 'Scrub N/P',
    category: 'clinical',
    bands: ['band5', 'band6', 'band7'],
    description: 'RN or ODP qualified - scrub practice'
  },
  {
    id: 'recovery',
    name: 'Recovery Nurse',
    shortName: 'Recovery RN',
    category: 'clinical',
    bands: ['band5', 'band6', 'band7'],
    description: 'RN qualified - post-anaesthesia care'
  },
  {
    id: 'hca',
    name: 'Healthcare Assistant',
    shortName: 'HCA',
    category: 'support',
    bands: ['band2', 'band3'],
    description: 'Patient care and theatre support'
  },
  {
    id: 'coordinator',
    name: 'Theatre Coordinator',
    shortName: 'Coordinator',
    category: 'management',
    bands: ['band7'],
    description: 'Floor coordination and operational management'
  },
  {
    id: 'manager',
    name: 'Service Manager',
    shortName: 'Manager',
    category: 'management',
    bands: ['band8a', 'band8b', 'band8c'],
    description: 'Senior operational management'
  }
];

// Staffing scenario interface
export interface StaffingScenario {
  id: string;
  name: string;
  description: string;
  roles: {
    roleId: string;
    band: string;
    fte: number;
    qualification?: 'RN' | 'ODP' | 'HCA' | 'Mixed';
  }[];
  createdAt: string;
  updatedAt: string;
}

// Royal London Hospital default scenario
export const royalLondonDefault: StaffingScenario = {
  id: 'rlh-default-2025',
  name: 'Royal London Hospital - 20 Theatres',
  description: 'Standard staffing model for 20 operating theatres with recovery unit',
  roles: [
    // Anaesthetic Staff
    { roleId: 'anaes', band: 'band5', fte: 8, qualification: 'Mixed' },
    { roleId: 'anaes', band: 'band6', fte: 20, qualification: 'Mixed' },
    { roleId: 'anaes', band: 'band7', fte: 6, qualification: 'Mixed' },

    // Scrub Staff
    { roleId: 'scrub', band: 'band5', fte: 27, qualification: 'Mixed' },
    { roleId: 'scrub', band: 'band6', fte: 33, qualification: 'Mixed' },
    { roleId: 'scrub', band: 'band7', fte: 16, qualification: 'Mixed' },

    // Recovery Staff (NEW)
    { roleId: 'recovery', band: 'band5', fte: 6, qualification: 'RN' },
    { roleId: 'recovery', band: 'band6', fte: 8, qualification: 'RN' },
    { roleId: 'recovery', band: 'band7', fte: 2, qualification: 'RN' },

    // Healthcare Assistants
    { roleId: 'hca', band: 'band2', fte: 10, qualification: 'HCA' },
    { roleId: 'hca', band: 'band3', fte: 20, qualification: 'HCA' },

    // Management
    { roleId: 'manager', band: 'band8a', fte: 2 },
    { roleId: 'manager', band: 'band8b', fte: 1 },
    { roleId: 'manager', band: 'band8c', fte: 1 }
  ],
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01'
};

// Calculation helper functions
export const calculateAnnualCost = (fte: number, avgSalary: number, oncostPercentage: number): number => {
  const baseCost = fte * avgSalary;
  const oncosts = baseCost * (oncostPercentage / 100);
  return baseCost + oncosts;
};

export const calculateTotalScenarioCost = (
  scenario: StaffingScenario,
  config: FinanceConfig
): number => {
  let total = 0;

  scenario.roles.forEach(role => {
    const bandKey = role.band as keyof typeof config.salaryScales;
    const salary = config.salaryScales[bandKey]?.avg || 0;
    total += calculateAnnualCost(role.fte, salary, config.oncostPercentage);
  });

  return total;
};

export const calculateFTEtoHeadcount = (
  fte: number,
  partTimeMix: { hours: number; percentage: number }[]
): number => {
  let headcount = 0;
  let remainingFTE = fte;

  partTimeMix.forEach(mix => {
    const ftePerPerson = mix.hours / 37.5;
    const fteInCategory = fte * (mix.percentage / 100);
    const peopleNeeded = fteInCategory / ftePerPerson;
    headcount += peopleNeeded;
    remainingFTE -= fteInCategory;
  });

  return Math.ceil(headcount);
};

export const calculateLeaveImpact = (
  totalStaff: number,
  leaveDays: number,
  bankHolidays: number
): {
  totalLeaveDays: number;
  dailyAverage: number;
  coverageFTERequired: number;
} => {
  const totalLeaveDays = totalStaff * (leaveDays + bankHolidays);
  const dailyAverage = totalLeaveDays / 365;
  const coverageFTERequired = dailyAverage / 5; // Assuming 5-day week

  return {
    totalLeaveDays,
    dailyAverage,
    coverageFTERequired
  };
};
