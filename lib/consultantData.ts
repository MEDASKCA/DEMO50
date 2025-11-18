// Royal London Hospital Consultants Database
// Barts Health NHS Trust
// Email format: firstname.lastname@bartshealth.nhs.uk

export interface Consultant {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  specialty: string;
  subspecialty?: string;
  email: string;
  qualifications?: string;
  specialInterests?: string[];
  appointmentYear?: number;
}

// Hardcoded Royal London Hospital Consultants
export const ROYAL_LONDON_CONSULTANTS: Consultant[] = [
  // ============================================================================
  // GENERAL SURGERY / EMERGENCY
  // ============================================================================
  {
    id: 'RLH-GS-001',
    title: 'Mr',
    firstName: 'Pasquale',
    lastName: 'Giordano',
    fullName: 'Mr Pasquale Giordano',
    specialty: 'General Surgery',
    subspecialty: 'Colorectal',
    email: 'pasquale.giordano@bartshealth.nhs.uk',
    specialInterests: ['Colorectal Surgery', 'Pelvic Floor Disorders']
  },
  {
    id: 'RLH-GS-002',
    title: 'Mr',
    firstName: 'Alex',
    lastName: 'Leo',
    fullName: 'Mr Alex Leo',
    specialty: 'General Surgery',
    subspecialty: 'Colorectal',
    email: 'alex.leo@bartshealth.nhs.uk',
    specialInterests: ['General Surgery', 'Colorectal Surgery', 'Pelvic Floor']
  },
  {
    id: 'RLH-GS-003',
    title: 'Mr',
    firstName: 'Ajit',
    lastName: 'Abraham',
    fullName: 'Mr Ajit Abraham',
    specialty: 'General Surgery',
    email: 'ajit.abraham@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-GS-004',
    title: 'Mr',
    firstName: 'Colin',
    lastName: 'Ahmed',
    fullName: 'Mr Colin Ahmed',
    specialty: 'General Surgery',
    subspecialty: 'Colorectal',
    email: 'colin.ahmed@bartshealth.nhs.uk'
  },

  // ============================================================================
  // ORTHOPAEDICS
  // ============================================================================
  {
    id: 'RLH-ORT-001',
    title: 'Mr',
    firstName: 'Paul',
    lastName: 'Lee',
    fullName: 'Mr Paul Lee',
    specialty: 'Orthopaedics',
    subspecialty: 'Elective Orthopaedic Joints',
    email: 'paul.lee@bartshealth.nhs.uk',
    appointmentYear: 2011,
    specialInterests: ['Hip Reconstruction', 'Knee Reconstruction', 'Hip Preservation']
  },
  {
    id: 'RLH-ORT-002',
    title: 'Mr',
    firstName: 'Lucky',
    lastName: 'Jeyaseelan',
    fullName: 'Mr Lucky Jeyaseelan',
    specialty: 'Orthopaedics',
    subspecialty: 'Orthopaedic Trauma',
    email: 'lucky.jeyaseelan@bartshealth.nhs.uk',
    specialInterests: ['Foot and Ankle Surgery', 'Trauma', 'Elective Orthopaedics']
  },
  {
    id: 'RLH-ORT-003',
    title: 'Mr',
    firstName: 'Dimitrios',
    lastName: 'Manoukian',
    fullName: 'Mr Dimitrios Manoukian',
    specialty: 'Orthopaedics',
    subspecialty: 'Orthopaedic Trauma',
    email: 'dimitrios.manoukian@bartshealth.nhs.uk',
    appointmentYear: 2007,
    specialInterests: ['Paediatric Orthopaedics', 'Trauma']
  },
  {
    id: 'RLH-ORT-004',
    title: 'Professor',
    firstName: 'Manoj',
    lastName: 'Ramachandran',
    fullName: 'Professor Manoj Ramachandran',
    specialty: 'Orthopaedics',
    subspecialty: 'Orthopaedic Trauma',
    email: 'manoj.ramachandran@bartshealth.nhs.uk',
    appointmentYear: 2007,
    specialInterests: ['Paediatric Orthopaedics', 'Trauma', 'Innovation']
  },
  {
    id: 'RLH-ORT-005',
    title: 'Mr',
    firstName: 'Adrian',
    lastName: 'Taylor',
    fullName: 'Mr Adrian Taylor',
    specialty: 'Orthopaedics',
    subspecialty: 'Elective Orthopaedic Joints',
    email: 'adrian.taylor@bartshealth.nhs.uk',
    appointmentYear: 2014,
    specialInterests: ['Upper Limb Surgery']
  },
  {
    id: 'RLH-ORT-006',
    title: 'Mr',
    firstName: 'Nick',
    lastName: 'Green',
    fullName: 'Mr Nick Green',
    specialty: 'Orthopaedics',
    subspecialty: 'Orthopaedic Trauma',
    email: 'nick.green@bartshealth.nhs.uk',
    specialInterests: ['Upper Limb', 'Complex Trauma']
  },
  {
    id: 'RLH-ORT-007',
    title: 'Mr',
    firstName: 'Kalpesh',
    lastName: 'Shah',
    fullName: 'Mr Kalpesh Shah',
    specialty: 'Orthopaedics',
    subspecialty: 'Elective Orthopaedic Joints',
    email: 'kalpesh.shah@bartshealth.nhs.uk',
    specialInterests: ['Hand Surgery']
  },
  {
    id: 'RLH-ORT-008',
    title: 'Mr',
    firstName: 'Jerry',
    lastName: 'Nanchahal',
    fullName: 'Mr Jerry Nanchahal',
    specialty: 'Orthopaedics',
    subspecialty: 'Orthopaedic Trauma',
    email: 'jerry.nanchahal@bartshealth.nhs.uk',
    specialInterests: ['Trauma', 'Limb Reconstruction']
  },

  // ============================================================================
  // ENT
  // ============================================================================
  {
    id: 'RLH-ENT-001',
    title: 'Mr',
    firstName: 'Khalid',
    lastName: 'Ghufoor',
    fullName: 'Mr Khalid Ghufoor',
    specialty: 'ENT',
    email: 'khalid.ghufoor@bartshealth.nhs.uk',
    specialInterests: ['ENT Surgery', 'Service Lead']
  },
  {
    id: 'RLH-ENT-002',
    title: 'Mr',
    firstName: 'Nicholas',
    lastName: 'Eynon-Lewis',
    fullName: 'Mr Nicholas Eynon-Lewis',
    specialty: 'ENT',
    email: 'nicholas.eynon-lewis@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-ENT-003',
    title: 'Mr',
    firstName: 'Michael',
    lastName: 'Wareing',
    fullName: 'Mr Michael Wareing',
    specialty: 'ENT',
    email: 'michael.wareing@bartshealth.nhs.uk',
    appointmentYear: 2000
  },
  {
    id: 'RLH-ENT-004',
    title: 'Professor',
    firstName: 'Kiran',
    lastName: 'Jumani',
    fullName: 'Professor Kiran Jumani',
    specialty: 'ENT',
    email: 'kiran.jumani@bartshealth.nhs.uk',
    specialInterests: ['Ear, Middle Ear, Inner Ear Disease']
  },
  {
    id: 'RLH-ENT-005',
    title: 'Mr',
    firstName: 'Yogesh',
    lastName: 'Bajaj',
    fullName: 'Mr Yogesh Bajaj',
    specialty: 'ENT',
    email: 'yogesh.bajaj@bartshealth.nhs.uk'
  },

  // ============================================================================
  // GYNAECOLOGY & OBSTETRICS
  // ============================================================================
  {
    id: 'RLH-GYN-001',
    title: 'Mr',
    firstName: 'Saurabh',
    lastName: 'Phadnis',
    fullName: 'Mr Saurabh Phadnis',
    specialty: 'Gynaecology',
    email: 'saurabh.phadnis@bartshealth.nhs.uk',
    specialInterests: ['Colposcopy']
  },

  // ============================================================================
  // NEUROLOGY
  // ============================================================================
  {
    id: 'RLH-NEU-001',
    title: 'Dr',
    firstName: 'Aleksandar',
    lastName: 'Radunovic',
    fullName: 'Dr Aleksandar Radunovic',
    specialty: 'Neurology',
    subspecialty: 'Neuro-Oncology',
    email: 'aleksandar.radunovic@bartshealth.nhs.uk',
    specialInterests: ['Motor Neurone Disease']
  },
  {
    id: 'RLH-NEU-002',
    title: 'Dr',
    firstName: 'Andrea',
    lastName: 'Malaspina',
    fullName: 'Dr Andrea Malaspina',
    specialty: 'Neurology',
    subspecialty: 'Neuro-Oncology',
    email: 'andrea.malaspina@bartshealth.nhs.uk',
    specialInterests: ['Motor Neurone Disease']
  },
  {
    id: 'RLH-NEU-003',
    title: 'Dr',
    firstName: 'Stephen',
    lastName: 'Keddie',
    fullName: 'Dr Stephen Keddie',
    specialty: 'Neurology',
    subspecialty: 'Neuro-Oncology',
    email: 'stephen.keddie@bartshealth.nhs.uk',
    specialInterests: ['Neuromuscular Disorders']
  },
  {
    id: 'RLH-NEU-004',
    title: 'Professor',
    firstName: 'Klaus',
    lastName: 'Schmierer',
    fullName: 'Professor Klaus Schmierer',
    specialty: 'Neurology',
    subspecialty: 'Neuro-Oncology',
    email: 'klaus.schmierer@bartshealth.nhs.uk'
  },

  // ============================================================================
  // NEUROSURGERY
  // ============================================================================
  {
    id: 'RLH-NSG-001',
    title: 'Dr',
    firstName: 'Grainne',
    lastName: 'McKenna',
    fullName: 'Dr Grainne McKenna',
    specialty: 'Neurology',
    subspecialty: 'Neuro-Oncology',
    email: 'grainne.mckenna@bartshealth.nhs.uk',
    specialInterests: ['Neurotrauma', 'Neuro-oncology']
  },
  {
    id: 'RLH-NSG-002',
    title: 'Mr',
    firstName: 'Dimitrios',
    lastName: 'Paraskevopoulos',
    fullName: 'Mr Dimitrios Paraskevopoulos',
    specialty: 'Neurology',
    subspecialty: 'Neuro-Oncology',
    email: 'dimitrios.paraskevopoulos@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-NSG-003',
    title: 'Mr',
    firstName: 'Chris',
    lastName: 'Uff',
    fullName: 'Mr Chris Uff',
    specialty: 'Neurology',
    subspecialty: 'Neuro-Oncology',
    email: 'chris.uff@bartshealth.nhs.uk',
    specialInterests: ['Neurotrauma', 'Neurovascular']
  },
  {
    id: 'RLH-NSG-004',
    title: 'Mr',
    firstName: 'Jonathan',
    lastName: 'Bull',
    fullName: 'Mr Jonathan Bull',
    specialty: 'Neurology',
    subspecialty: 'Neuro-Oncology',
    email: 'jonathan.bull@bartshealth.nhs.uk',
    specialInterests: ['Spine Surgery']
  },
  {
    id: 'RLH-NSG-005',
    title: 'Mr',
    firstName: 'Edward',
    lastName: 'McKintosh',
    fullName: 'Mr Edward McKintosh',
    specialty: 'Neurology',
    subspecialty: 'Neuro-Oncology',
    email: 'edward.mckintosh@bartshealth.nhs.uk'
  },

  // ============================================================================
  // OPHTHALMOLOGY
  // ============================================================================
  {
    id: 'RLH-OPH-001',
    title: 'Mr',
    firstName: 'Mark',
    lastName: 'Westcott',
    fullName: 'Mr Mark Westcott',
    specialty: 'Ophthalmology',
    email: 'mark.westcott@bartshealth.nhs.uk',
    specialInterests: ['Glaucoma', 'Cataract Surgery', 'Uveitis']
  },

  // ============================================================================
  // UROLOGY
  // ============================================================================
  {
    id: 'RLH-URO-001',
    title: 'Mr',
    firstName: 'Prasad',
    lastName: 'Patki',
    fullName: 'Mr Prasad Patki',
    specialty: 'Urology',
    subspecialty: 'Urology Robotic',
    email: 'prasad.patki@bartshealth.nhs.uk',
    specialInterests: ['Robotic Surgery', 'Clinical Lead']
  },
  {
    id: 'RLH-URO-002',
    title: 'Mr',
    firstName: 'Benjamin',
    lastName: 'Lamb',
    fullName: 'Mr Benjamin Lamb',
    specialty: 'Urology',
    subspecialty: 'Urology Robotic',
    email: 'benjamin.lamb@bartshealth.nhs.uk',
    specialInterests: ['Robotic Surgery']
  },

  // ============================================================================
  // VASCULAR SURGERY
  // ============================================================================
  {
    id: 'RLH-VAS-001',
    title: 'Mr',
    firstName: 'Paul',
    lastName: 'Flora',
    fullName: 'Mr Paul Flora',
    specialty: 'Vascular',
    email: 'paul.flora@bartshealth.nhs.uk',
    specialInterests: ['Clinical Lead']
  },
  {
    id: 'RLH-VAS-002',
    title: 'Mr',
    firstName: 'Pranav',
    lastName: 'Somaiya',
    fullName: 'Mr Pranav Somaiya',
    specialty: 'Vascular',
    email: 'pranav.somaiya@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-VAS-003',
    title: 'Mr',
    firstName: 'Martin',
    lastName: 'Griffiths',
    fullName: 'Mr Martin Griffiths',
    specialty: 'Vascular',
    email: 'martin.griffiths@bartshealth.nhs.uk',
    specialInterests: ['Trauma Surgery', 'Lead for Trauma']
  },

  // ============================================================================
  // PLASTIC SURGERY
  // ============================================================================
  {
    id: 'RLH-PLS-001',
    title: 'Mr',
    firstName: 'Ioannis',
    lastName: 'Goutos',
    fullName: 'Mr Ioannis Goutos',
    specialty: 'Plastics',
    subspecialty: 'Burns & Breast',
    email: 'ioannis.goutos@bartshealth.nhs.uk',
    specialInterests: ['Burns', 'Clinic Lead']
  },
  {
    id: 'RLH-PLS-002',
    title: 'Mr',
    firstName: 'Georgios',
    lastName: 'Pafitanis',
    fullName: 'Mr Georgios Pafitanis',
    specialty: 'Plastics',
    email: 'georgios.pafitanis@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-PLS-003',
    title: 'Mr',
    firstName: 'Amar',
    lastName: 'Pahal',
    fullName: 'Mr Amar Pahal',
    specialty: 'Plastics',
    email: 'amar.pahal@bartshealth.nhs.uk',
    specialInterests: ['Reconstructive Surgery', 'Lead Clinician']
  },

  // ============================================================================
  // RENAL & TRANSPLANT
  // ============================================================================
  {
    id: 'RLH-REN-001',
    title: 'Professor',
    firstName: 'Muhammad',
    lastName: 'Yaqoob',
    fullName: 'Professor Muhammad Yaqoob',
    specialty: 'Renal',
    subspecialty: 'Renal Transplant',
    email: 'muhammad.yaqoob@bartshealth.nhs.uk',
    appointmentYear: 1996,
    specialInterests: ['Nephrology', 'Transplantation']
  },
  {
    id: 'RLH-REN-002',
    title: 'Dr',
    firstName: 'Kieran',
    lastName: 'McCafferty',
    fullName: 'Dr Kieran McCafferty',
    specialty: 'Renal',
    subspecialty: 'Renal Transplant',
    email: 'kieran.mccafferty@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-REN-003',
    title: 'Dr',
    firstName: 'Stephen',
    lastName: 'Fan',
    fullName: 'Dr Stephen Fan',
    specialty: 'Renal',
    subspecialty: 'Renal Transplant',
    email: 'stephen.fan@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-REN-004',
    title: 'Dr',
    firstName: 'Neil',
    lastName: 'Ashman',
    fullName: 'Dr Neil Ashman',
    specialty: 'Renal',
    subspecialty: 'Renal Transplant',
    email: 'neil.ashman@bartshealth.nhs.uk',
    specialInterests: ['Dialysis', 'Acute Kidney Injury']
  },
  {
    id: 'RLH-REN-005',
    title: 'Dr',
    firstName: 'Ravi',
    lastName: 'Rajakariar',
    fullName: 'Dr Ravi Rajakariar',
    specialty: 'Renal',
    subspecialty: 'Renal Transplant',
    email: 'ravi.rajakariar@bartshealth.nhs.uk',
    specialInterests: ['Dialysis Lead']
  },
  {
    id: 'RLH-REN-006',
    title: 'Dr',
    firstName: 'Ibrahim',
    lastName: 'Fahal',
    fullName: 'Dr Ibrahim Fahal',
    specialty: 'Renal',
    subspecialty: 'Renal Transplant',
    email: 'ibrahim.fahal@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-REN-007',
    title: 'Ms',
    firstName: 'Cinzia',
    lastName: 'Sammartino',
    fullName: 'Ms Cinzia Sammartino',
    specialty: 'Renal',
    subspecialty: 'Renal Transplant',
    email: 'cinzia.sammartino@bartshealth.nhs.uk',
    specialInterests: ['Transplant Surgery', 'Service Lead']
  },
  {
    id: 'RLH-REN-008',
    title: 'Ms',
    firstName: 'Olga',
    lastName: 'Manolitsi',
    fullName: 'Ms Olga Manolitsi',
    specialty: 'Renal',
    subspecialty: 'Renal Transplant',
    email: 'olga.manolitsi@bartshealth.nhs.uk',
    specialInterests: ['Kidney Transplant']
  },

  // ============================================================================
  // ORAL AND MAXILLOFACIAL SURGERY
  // ============================================================================
  {
    id: 'RLH-OMFS-001',
    title: 'Mr',
    firstName: 'Peter',
    lastName: 'Hardee',
    fullName: 'Mr Peter Hardee',
    specialty: 'Oral and Maxillofacial',
    email: 'peter.hardee@bartshealth.nhs.uk',
    appointmentYear: 2002,
    specialInterests: ['Head & Neck Oncology', 'Facial Reconstruction']
  },
  {
    id: 'RLH-OMFS-002',
    title: 'Professor',
    firstName: 'Simon',
    lastName: 'Holmes',
    fullName: 'Professor Simon Holmes',
    specialty: 'Oral and Maxillofacial',
    subspecialty: 'OMFS Trauma',
    email: 'simon.holmes@bartshealth.nhs.uk',
    specialInterests: ['Cranio-Facial Trauma', 'Lead Surgeon']
  },
  {
    id: 'RLH-OMFS-003',
    title: 'Mr',
    firstName: 'Nabeel',
    lastName: 'Bhatti',
    fullName: 'Mr Nabeel Bhatti',
    specialty: 'Oral and Maxillofacial',
    subspecialty: 'OMFS Trauma',
    email: 'nabeel.bhatti@bartshealth.nhs.uk',
    specialInterests: ['Trauma', 'General OMFS']
  },
  {
    id: 'RLH-OMFS-004',
    title: 'Mr',
    firstName: 'James',
    lastName: 'Cymerman',
    fullName: 'Mr James Cymerman',
    specialty: 'Oral and Maxillofacial',
    email: 'james.cymerman@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-OMFS-005',
    title: 'Mr',
    firstName: 'Rishi',
    lastName: 'Bhandari',
    fullName: 'Mr Rishi Bhandari',
    specialty: 'Oral and Maxillofacial',
    email: 'rishi.bhandari@bartshealth.nhs.uk'
  },

  // ============================================================================
  // ENDOSCOPY / GASTROENTEROLOGY
  // ============================================================================
  {
    id: 'RLH-END-001',
    title: 'Dr',
    firstName: 'Michael',
    lastName: 'Glynn',
    fullName: 'Dr Michael Glynn',
    specialty: 'Endoscopy',
    email: 'michael.glynn@bartshealth.nhs.uk',
    specialInterests: ['Gastroenterology', 'Hepatology', 'GI Endoscopy']
  },
  {
    id: 'RLH-END-002',
    title: 'Dr',
    firstName: 'Shameer',
    lastName: 'Mehta',
    fullName: 'Dr Shameer Mehta',
    specialty: 'Endoscopy',
    email: 'shameer.mehta@bartshealth.nhs.uk',
    appointmentYear: 2021,
    specialInterests: ['Nutrition', 'Colonoscopy', 'Polypectomy']
  },
  {
    id: 'RLH-END-003',
    title: 'Dr',
    firstName: 'Yiannis',
    lastName: 'Kallis',
    fullName: 'Dr Yiannis Kallis',
    specialty: 'Endoscopy',
    email: 'yiannis.kallis@bartshealth.nhs.uk',
    specialInterests: ['Hepatology', 'Gastroenterology']
  },
  {
    id: 'RLH-END-004',
    title: 'Dr',
    firstName: 'Patrick',
    lastName: 'Wilson',
    fullName: 'Dr Patrick Wilson',
    specialty: 'Endoscopy',
    email: 'patrick.wilson@bartshealth.nhs.uk'
  },
  {
    id: 'RLH-END-005',
    title: 'Dr',
    firstName: 'David',
    lastName: 'Rawat',
    fullName: 'Dr David Rawat',
    specialty: 'Endoscopy',
    email: 'david.rawat@bartshealth.nhs.uk',
    specialInterests: ['Paediatric Gastroenterology', 'Endoscopy Lead']
  },
  {
    id: 'RLH-END-006',
    title: 'Dr',
    firstName: 'Nigel',
    lastName: 'Meadows',
    fullName: 'Dr Nigel Meadows',
    specialty: 'Endoscopy',
    email: 'nigel.meadows@bartshealth.nhs.uk',
    specialInterests: ['Paediatric Gastroenterology']
  },
  {
    id: 'RLH-END-007',
    title: 'Dr',
    firstName: 'Nick',
    lastName: 'Croft',
    fullName: 'Dr Nick Croft',
    specialty: 'Endoscopy',
    email: 'nick.croft@bartshealth.nhs.uk',
    specialInterests: ['Paediatric Gastroenterology']
  }
];

// Helper functions to query consultants
export function getConsultantsBySpecialty(specialty: string): Consultant[] {
  return ROYAL_LONDON_CONSULTANTS.filter(c => c.specialty === specialty);
}

export function getConsultantsBySubspecialty(subspecialty: string): Consultant[] {
  return ROYAL_LONDON_CONSULTANTS.filter(c => c.subspecialty === subspecialty);
}

export function getConsultantByName(fullName: string): Consultant | undefined {
  return ROYAL_LONDON_CONSULTANTS.find(c => c.fullName === fullName);
}

export function getConsultantById(id: string): Consultant | undefined {
  return ROYAL_LONDON_CONSULTANTS.find(c => c.id === id);
}

export function getAllConsultants(): Consultant[] {
  return ROYAL_LONDON_CONSULTANTS;
}

// Statistics
export function getConsultantStatsBySpecialty(): Record<string, number> {
  const stats: Record<string, number> = {};
  ROYAL_LONDON_CONSULTANTS.forEach(c => {
    stats[c.specialty] = (stats[c.specialty] || 0) + 1;
  });
  return stats;
}
