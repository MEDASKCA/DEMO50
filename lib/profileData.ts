// NHS Trusts and their hospitals
export const NHS_TRUSTS = {
  'Barts Health NHS Trust': [
    'Royal London Hospital',
    "St Bartholomew's Hospital",
    'Whipps Cross University Hospital',
    'Newham University Hospital',
    'Mile End Hospital'
  ],
  "Guy's and St Thomas' NHS Foundation Trust": [
    "Guy's Hospital",
    "St Thomas' Hospital",
    'Royal Brompton Hospital',
    'Evelina London Children\'s Hospital'
  ],
  'Imperial College Healthcare NHS Trust': [
    'St Mary\'s Hospital',
    'Charing Cross Hospital',
    'Hammersmith Hospital',
    'Queen Charlotte\'s and Chelsea Hospital',
    'Western Eye Hospital'
  ],
  'King\'s College Hospital NHS Foundation Trust': [
    'King\'s College Hospital',
    'Princess Royal University Hospital',
    'Orpington Hospital',
    'Beckenham Beacon'
  ],
  'University College London Hospitals NHS Foundation Trust': [
    'University College Hospital',
    'Royal National Throat, Nose and Ear Hospital',
    'National Hospital for Neurology and Neurosurgery',
    'Royal London Hospital for Integrated Medicine',
    'Eastman Dental Hospital'
  ],
  'Chelsea and Westminster Hospital NHS Foundation Trust': [
    'Chelsea and Westminster Hospital',
    'West Middlesex University Hospital'
  ],
  'Royal Free London NHS Foundation Trust': [
    'Royal Free Hospital',
    'Barnet Hospital',
    'Chase Farm Hospital'
  ],
  'St George\'s University Hospitals NHS Foundation Trust': [
    'St George\'s Hospital',
    'Queen Mary\'s Hospital'
  ],
  'Lewisham and Greenwich NHS Trust': [
    'University Hospital Lewisham',
    'Queen Elizabeth Hospital'
  ],
  'Epsom and St Helier University Hospitals NHS Trust': [
    'Epsom Hospital',
    'St Helier Hospital'
  ]
};

// UK Postcode to Area mapping (simplified - would need full postcode API in production)
export const POSTCODE_AREAS = {
  'E1': 'Whitechapel, East London',
  'E2': 'Bethnal Green, East London',
  'E3': 'Bow, East London',
  'E14': 'Poplar, East London',
  'E15': 'Stratford, East London',
  'SE1': 'Southwark, South London',
  'SE10': 'Greenwich, South London',
  'SE13': 'Lewisham, South London',
  'SE18': 'Woolwich, South London',
  'SW1': 'Westminster, West London',
  'SW3': 'Chelsea, West London',
  'SW6': 'Fulham, West London',
  'SW17': 'Tooting, South London',
  'W1': 'West End, Central London',
  'W2': 'Paddington, West London',
  'W6': 'Hammersmith, West London',
  'W12': 'Shepherds Bush, West London',
  'NW1': 'Camden, North London',
  'NW3': 'Hampstead, North London',
  'NW8': 'St John\'s Wood, North London',
  'N1': 'Islington, North London',
  'N7': 'Holloway, North London',
  'IG1': 'Ilford, East London',
  'RM7': 'Romford, East London',
  'DA1': 'Dartford, Kent',
  'BR1': 'Bromley, Kent',
  'CR0': 'Croydon, South London',
  'KT1': 'Kingston, South West London',
  'SM1': 'Sutton, South London',
  'TW1': 'Twickenham, West London',
  'UB1': 'Southall, West London',
  'HA1': 'Harrow, North West London',
  'EN1': 'Enfield, North London',
  'N9': 'Edmonton, North London'
};

// Travel distance choices
export const TRAVEL_DISTANCES = [
  { value: '5', label: 'Less than 5 miles' },
  { value: '10', label: 'Up to 10 miles' },
  { value: '15', label: 'Up to 15 miles' },
  { value: '20', label: 'Up to 20 miles' },
  { value: '30', label: 'Up to 30 miles' },
  { value: '50', label: 'Up to 50 miles' },
  { value: '100', label: 'Up to 100 miles' },
  { value: 'unlimited', label: 'Willing to travel nationally' }
];

// Languages with proficiency levels
export const LANGUAGES = [
  'English', 'Welsh', 'Scottish Gaelic', 'Irish',
  'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Polish', 'Romanian', 'Lithuanian', 'Latvian',
  'Arabic', 'Bengali', 'Urdu', 'Punjabi', 'Hindi', 'Gujarati',
  'Tagalog', 'Mandarin', 'Cantonese', 'Japanese', 'Korean',
  'Turkish', 'Greek', 'Russian', 'Ukrainian',
  'Somali', 'Swahili', 'Yoruba', 'Igbo',
  'Other'
];

export const PROFICIENCY_LEVELS = [
  'Native',
  'Fluent',
  'Advanced',
  'Intermediate',
  'Conversational',
  'Basic'
];

// Professional Interest Categories
export const INTEREST_CATEGORIES = {
  'Clinical Practice': [
    'Surgical techniques',
    'Anaesthetics',
    'Recovery care',
    'Infection control',
    'Patient safety',
    'Emergency care',
    'Perioperative care'
  ],
  'Management & Leadership': [
    'Healthcare leadership',
    'Strategic planning',
    'Change management',
    'Team management',
    'Budget management',
    'Performance management',
    'Stakeholder engagement'
  ],
  'Quality & Improvement': [
    'Quality improvement',
    'Clinical governance',
    'Audit',
    'Data analytics',
    'Operational excellence',
    'Process optimization',
    'Lean methodologies',
    'Six Sigma'
  ],
  'Specialties': [
    'Theatre efficiency',
    'Staff wellbeing',
    'Equipment management',
    'Supply chain',
    'Sustainability',
    'Innovation',
    'Digital health',
    'Health informatics'
  ],
  'Education & Development': [
    'Teaching & mentoring',
    'Clinical supervision',
    'Competency assessment',
    'CPD',
    'Research',
    'Publishing'
  ],
  'Personal': [
    'Running & fitness',
    'Cycling',
    'Swimming',
    'Yoga',
    'Travel',
    'Photography',
    'Cooking',
    'Reading',
    'Music',
    'Volunteering',
    'Healthcare podcasts'
  ]
};

// Theatre Departments
export const THEATRE_DEPARTMENTS = [
  'Main Theatres',
  'Day Surgery Unit',
  'Emergency Theatre',
  'Cardiac Theatre',
  'Neurosurgery Theatre',
  'Trauma Theatre',
  'Obstetric Theatre',
  'Paediatric Theatre',
  'Ophthalmic Theatre',
  'Dental Theatre',
  'Endoscopy',
  'Interventional Radiology'
];

// Professional Qualifications
export const PROFESSIONAL_QUALIFICATIONS = [
  'Registered Nurse (RN)',
  'Registered Operating Department Practitioner (ODP)',
  'Healthcare Assistant (non-registered)',
  'Other/None'
];

// Theatre Roles with their competency structures
export const THEATRE_ROLES = {
  'Scrub N/P': {
    bands: ['Band 5', 'Band 6', 'Band 7'],
    competencyType: 'surgical',
    specialties: true
  },
  'Anaesthetic N/P': {
    bands: ['Band 5', 'Band 6', 'Band 7'],
    competencyType: 'anaesthetics',
    specialties: true
  },
  'Recovery N/P': {
    bands: ['Band 5', 'Band 6', 'Band 7'],
    competencyType: 'recovery',
    specialties: false
  },
  'Healthcare Assistant (HCA)': {
    bands: ['Band 2', 'Band 3'],
    competencyType: 'support',
    specialties: false
  },
  'Surgical Care Practitioner': {
    bands: ['Band 7', 'Band 8a'],
    competencyType: 'surgical',
    specialties: true
  },
  'Theatre Nurse Assistant': {
    bands: ['Band 3', 'Band 4'],
    competencyType: 'support',
    specialties: false
  },
  'Senior Sister/Charge Nurse': {
    bands: ['Band 7'],
    competencyType: 'leadership',
    specialties: true
  },
  'Matron': {
    bands: ['Band 8a', 'Band 8b'],
    competencyType: 'leadership',
    specialties: false
  },
  'Theatre Manager': {
    bands: ['Band 8a', 'Band 8b', 'Band 8c'],
    competencyType: 'management',
    specialties: false
  },
  'Clinical Services Manager': {
    bands: ['Band 8b', 'Band 8c', 'Band 8d'],
    competencyType: 'management',
    specialties: false
  }
};

// Surgical Specialties and Procedures
export const SURGICAL_SPECIALTIES = {
  'Orthopaedics': {
    subcategories: {
      'Trauma': [
        'Hip Fracture (DHS/Hemiarthroplasty)',
        'Femoral IM Nailing',
        'Tibial IM Nailing',
        'Wrist Fracture ORIF',
        'Ankle Fracture ORIF',
        'Shoulder Fracture ORIF',
        'Pelvic Fracture Fixation',
        'External Fixation'
      ],
      'Elective Lower Limb': [
        'Total Hip Replacement',
        'Total Knee Replacement',
        'Unicompartmental Knee Replacement',
        'Revision Hip Replacement',
        'Revision Knee Replacement',
        'Ankle Replacement',
        'Foot & Ankle Surgery'
      ],
      'Elective Upper Limb': [
        'Shoulder Replacement',
        'Shoulder Arthroscopy',
        'Rotator Cuff Repair',
        'ACJ Excision',
        'Elbow Replacement',
        'Hand Surgery',
        'Carpal Tunnel Release',
        'Dupuytren\'s Contracture'
      ],
      'Spinal': [
        'Lumbar Decompression',
        'Lumbar Fusion',
        'Cervical Decompression',
        'Cervical Fusion',
        'Spinal Instrumentation',
        'Kyphoplasty/Vertebroplasty'
      ],
      'Arthroscopy': [
        'Knee Arthroscopy',
        'Shoulder Arthroscopy',
        'Hip Arthroscopy',
        'Ankle Arthroscopy',
        'ACL Reconstruction',
        'Meniscal Repair'
      ]
    }
  },
  'General Surgery': {
    subcategories: {
      'Upper GI': [
        'Laparoscopic Cholecystectomy',
        'Open Cholecystectomy',
        'Gastric Bypass',
        'Sleeve Gastrectomy',
        'Oesophagectomy',
        'Gastrectomy',
        'Hiatus Hernia Repair',
        'Anti-reflux Surgery'
      ],
      'Colorectal': [
        'Right Hemicolectomy',
        'Left Hemicolectomy',
        'Anterior Resection',
        'Abdominoperineal Resection',
        'Laparoscopic Colorectal',
        'Stoma Formation',
        'Stoma Reversal',
        'Haemorrhoidectomy',
        'Fistula Surgery'
      ],
      'Hepatobiliary': [
        'Liver Resection',
        'Pancreatic Surgery',
        'Whipple\'s Procedure',
        'Bile Duct Surgery'
      ],
      'Breast': [
        'Wide Local Excision',
        'Mastectomy',
        'Axillary Node Clearance',
        'Breast Reconstruction',
        'Sentinel Node Biopsy'
      ],
      'Emergency': [
        'Laparotomy',
        'Appendicectomy',
        'Incarcerated Hernia Repair',
        'Perforated Viscus Repair',
        'Bowel Resection'
      ],
      'Hernia': [
        'Inguinal Hernia Repair',
        'Femoral Hernia Repair',
        'Incisional Hernia Repair',
        'Paraumbilical Hernia Repair',
        'Laparoscopic Hernia Repair'
      ]
    }
  },
  'Cardiac Surgery': {
    subcategories: {
      'Coronary': [
        'CABG (On-pump)',
        'CABG (Off-pump)',
        'Minimally Invasive CABG',
        'Redo CABG'
      ],
      'Valve': [
        'Aortic Valve Replacement',
        'Mitral Valve Replacement',
        'Mitral Valve Repair',
        'Tricuspid Valve Surgery',
        'TAVI (Hybrid)'
      ],
      'Aortic': [
        'Aortic Root Replacement',
        'Ascending Aorta Replacement',
        'Aortic Arch Surgery',
        'Descending Aorta Surgery',
        'TEVAR (Hybrid)'
      ],
      'Congenital': [
        'ASD Closure',
        'VSD Closure',
        'PDA Ligation',
        'Tetralogy of Fallot Repair'
      ]
    }
  },
  'Neurosurgery': {
    subcategories: {
      'Cranial': [
        'Craniotomy',
        'Craniectomy',
        'Burr Holes',
        'Brain Tumour Resection',
        'Aneurysm Clipping',
        'AVM Excision',
        'Awake Craniotomy'
      ],
      'Spinal': [
        'Discectomy',
        'Laminectomy',
        'Spinal Fusion',
        'Spinal Tumour Resection',
        'Spinal Decompression'
      ],
      'Functional': [
        'Deep Brain Stimulation',
        'Vagal Nerve Stimulator',
        'Epilepsy Surgery'
      ]
    }
  },
  'Vascular': {
    subcategories: {
      'Arterial': [
        'AAA Repair (Open)',
        'EVAR',
        'Carotid Endarterectomy',
        'Femoral-Popliteal Bypass',
        'Femoral Endarterectomy',
        'Aorto-Bifemoral Bypass',
        'Embolectomy'
      ],
      'Venous': [
        'Varicose Vein Surgery',
        'Endovenous Laser Therapy',
        'Venous Ulcer Surgery'
      ],
      'Access': [
        'AV Fistula Formation',
        'AV Graft',
        'Permcath Insertion',
        'Hickman Line Insertion'
      ]
    }
  },
  'Urology': {
    subcategories: {
      'Endourology': [
        'TURP',
        'TURBT',
        'Cystoscopy',
        'Ureteroscopy',
        'PCNL',
        'Laser Prostatectomy'
      ],
      'Open/Laparoscopic': [
        'Nephrectomy',
        'Partial Nephrectomy',
        'Radical Prostatectomy',
        'Radical Cystectomy',
        'Ileal Conduit',
        'Pyeloplasty'
      ],
      'Reconstruction': [
        'Urethroplasty',
        'Bladder Augmentation',
        'Continent Diversion'
      ]
    }
  },
  'Gynaecology': {
    subcategories: {
      'General': [
        'Hysterectomy (Abdominal)',
        'Hysterectomy (Vaginal)',
        'Hysterectomy (Laparoscopic)',
        'Myomectomy',
        'Ovarian Cystectomy',
        'Salpingectomy'
      ],
      'Oncology': [
        'Radical Hysterectomy',
        'Lymph Node Dissection',
        'Vulvectomy',
        'Omentectomy'
      ],
      'Urogynaecology': [
        'Anterior Repair',
        'Posterior Repair',
        'TVT/TOT',
        'Sacrocolpopexy',
        'Sacrospinous Fixation'
      ],
      'Endoscopy': [
        'Diagnostic Laparoscopy',
        'Hysteroscopy',
        'Laparoscopic Sterilisation',
        'Ectopic Pregnancy Surgery'
      ]
    }
  },
  'ENT': {
    subcategories: {
      'Otology': [
        'Myringoplasty',
        'Tympanoplasty',
        'Mastoidectomy',
        'Stapedectomy',
        'Cochlear Implant'
      ],
      'Rhinology': [
        'Septoplasty',
        'Rhinoplasty',
        'FESS',
        'Polypectomy',
        'Turbinate Reduction'
      ],
      'Head & Neck': [
        'Thyroidectomy',
        'Parathyroidectomy',
        'Parotidectomy',
        'Submandibular Gland Excision',
        'Neck Dissection',
        'Laryngectomy',
        'Pharyngolaryngectomy'
      ],
      'Airway': [
        'Tonsillectomy',
        'Adenoidectomy',
        'Microlaryngoscopy',
        'Bronchoscopy',
        'Tracheostomy'
      ]
    }
  },
  'Plastics & Maxillofacial': {
    subcategories: {
      'Reconstruction': [
        'Free Flap',
        'Pedicled Flap',
        'Skin Graft',
        'Breast Reconstruction (DIEP/TRAM)',
        'Head & Neck Reconstruction'
      ],
      'Trauma': [
        'Facial Fracture Fixation',
        'Maxillary Fracture',
        'Mandibular Fracture',
        'Orbital Fracture',
        'Zygoma Fracture'
      ],
      'Hand': [
        'Tendon Repair',
        'Nerve Repair',
        'Microsurgery',
        'Replantation',
        'Hand Trauma'
      ],
      'Cosmetic': [
        'Blepharoplasty',
        'Facelift',
        'Rhinoplasty',
        'Abdominoplasty',
        'Liposuction'
      ]
    }
  },
  'Ophthalmology': [
    'Cataract Surgery',
    'Trabeculectomy',
    'Vitrectomy',
    'Retinal Detachment Repair',
    'Corneal Transplant',
    'Strabismus Surgery',
    'Oculoplastics'
  ],
  'Obstetrics': [
    'Caesarean Section',
    'Emergency Caesarean Section',
    'Instrumental Delivery',
    'Perineal Repair',
    'Manual Removal of Placenta',
    'Cervical Cerclage'
  ]
};

// Equipment/Implant Manufacturers by Specialty
export const ORTHOPAEDIC_MANUFACTURERS = {
  'Hip & Knee Replacement': [
    'Stryker',
    'DePuy Synthes',
    'Zimmer Biomet',
    'Smith & Nephew',
    'Corin',
    'Biomet',
    'Link'
  ],
  'Trauma Systems': [
    'Stryker',
    'DePuy Synthes',
    'Zimmer Biomet',
    'Smith & Nephew',
    'Acumed',
    'Orthofix'
  ],
  'Spinal Systems': [
    'Medtronic',
    'DePuy Synthes',
    'Stryker',
    'Zimmer Biomet',
    'NuVasive',
    'Globus Medical'
  ],
  'Arthroscopy': [
    'Stryker',
    'Smith & Nephew',
    'Arthrex',
    'DePuy Synthes',
    'ConMed Linvatec'
  ]
};

// Management Competencies
export const MANAGEMENT_COMPETENCIES = {
  'Leadership & People Management': [
    'Strategic Leadership',
    'Team Leadership',
    'Change Management',
    'Conflict Resolution',
    'Performance Management',
    'Coaching & Mentoring',
    'Succession Planning',
    'Talent Development',
    'Staff Engagement',
    'Workforce Planning'
  ],
  'Operational Management': [
    'Theatre Scheduling',
    'Resource Allocation',
    'Capacity Planning',
    'Efficiency Optimization',
    'List Management',
    'Emergency Prioritization',
    'Service Planning',
    'Business Continuity'
  ],
  'Financial Management': [
    'Budget Management',
    'Financial Planning',
    'Cost Control',
    'Business Case Development',
    'Contract Management',
    'Procurement',
    'Investment Appraisal',
    'Financial Reporting'
  ],
  'Quality & Governance': [
    'Clinical Governance',
    'Quality Improvement',
    'Audit',
    'Risk Management',
    'Incident Investigation',
    'Policy Development',
    'Compliance Management',
    'CQC Standards',
    'Patient Safety',
    'Infection Control'
  ],
  'Strategic & Service Development': [
    'Strategic Planning',
    'Service Redesign',
    'Innovation',
    'Project Management',
    'Stakeholder Management',
    'Partnership Working',
    'Service Integration',
    'Digital Transformation'
  ],
  'Information & Analytics': [
    'Data Analysis',
    'Performance Reporting',
    'KPI Management',
    'Dashboard Development',
    'Benchmarking',
    'Predictive Analytics',
    'Information Governance'
  ]
};

// Qualification Types
export const QUALIFICATION_TYPES = [
  'Undergraduate Degree',
  'Postgraduate Degree',
  'Master\'s Degree',
  'Doctoral Degree',
  'Professional Qualification',
  'NVQ/SVQ',
  'Certificate',
  'Diploma',
  'Fellowship',
  'Apprenticeship'
];

// Professional Bodies
export const PROFESSIONAL_BODIES = [
  'Health & Care Professions Council (HCPC)',
  'Nursing & Midwifery Council (NMC)',
  'General Medical Council (GMC)',
  'Association for Perioperative Practice (AfPP)',
  'Royal College of Nursing (RCN)',
  'Royal College of Surgeons (RCS)',
  'Chartered Management Institute (CMI)',
  'Institute of Healthcare Management (IHM)',
  'Faculty of Medical Leadership and Management (FMLM)',
  'Association of Anaesthetists',
  'British Association of Day Surgery',
  'Other'
];

// Competency Rating Scale
export const COMPETENCY_RATINGS = [
  { value: 0, label: '0 - No knowledge', color: 'gray' },
  { value: 1, label: '1 - Awareness only', color: 'red' },
  { value: 2, label: '2 - Novice (learning)', color: 'orange' },
  { value: 3, label: '3 - Competent (with supervision)', color: 'yellow' },
  { value: 4, label: '4 - Proficient (independent)', color: 'green' },
  { value: 5, label: '5 - Expert (can mentor)', color: 'blue' }
];

// ============================================================================
// COMPREHENSIVE SURGICAL COMPETENCIES
// ============================================================================

export const SURGICAL_SPECIALTIES_DETAILED = {
  'General Surgery': {
    subspecialties: {
      'Upper GI Surgery': {
        procedures: {
          elective: {
            major: [
              'Oesophagectomy (Ivor Lewis)',
              'Oesophagectomy (McKeown)',
              'Total Gastrectomy',
              'Partial Gastrectomy',
              'Whipple Procedure (Pancreaticoduodenectomy)',
              'Hepatectomy',
              'Splenectomy'
            ],
            minor: [
              'Upper GI Endoscopy',
              'ERCP',
              'Gastrostomy (PEG)',
              'Hiatus Hernia Repair'
            ]
          },
          emergency: [
            'Perforated Peptic Ulcer Repair',
            'Bleeding Peptic Ulcer',
            'Oesophageal Perforation Repair'
          ]
        },
        equipment: [
          'Upper GI Instrument Set',
          'Laparoscopic Upper GI Set',
          'Endoscopy Equipment',
          'ERCP Equipment',
          'Harmonic Scalpel',
          'LigaSure',
          'Linear Staplers (GIA)',
          'Circular Staplers (EEA)',
          'Liver Retractors',
          'Self-retaining Retractors (Thompson, Bookwalter)'
        ]
      },
      'Lower GI/Colorectal Surgery': {
        procedures: {
          elective: {
            major: [
              'Right Hemicolectomy',
              'Left Hemicolectomy',
              'Anterior Resection',
              'Abdominoperineal Resection (APR)',
              'Total Colectomy',
              'Panproctocolectomy with Ileostomy',
              'Hartmann\'s Procedure',
              'Reversal of Hartmann\'s',
              'Ileoanal Pouch Formation'
            ],
            minor: [
              'Colonoscopy',
              'Flexible Sigmoidoscopy',
              'Haemorrhoidectomy',
              'Fissurectomy',
              'Fistula-in-Ano Repair',
              'Pilonidal Sinus Excision'
            ]
          },
          emergency: [
            'Bowel Resection for Obstruction',
            'Perforated Bowel Repair',
            'Ischaemic Bowel Resection',
            'Emergency Stoma Formation'
          ]
        },
        equipment: [
          'Colorectal Instrument Set',
          'Laparoscopic Colorectal Set',
          'Colonoscopy Equipment',
          'Linear Staplers (GIA)',
          'Circular Staplers (EEA 25mm, 28mm, 31mm)',
          'End-to-End Anastomosis Staplers',
          'Harmonic Scalpel',
          'LigaSure',
          'Self-retaining Retractors',
          'Lone Star Retractor (for anal procedures)'
        ]
      },
      'Hepatobiliary Surgery': {
        procedures: {
          elective: [
            'Cholecystectomy (Laparoscopic)',
            'Cholecystectomy (Open)',
            'Liver Resection (Hepatectomy)',
            'Bile Duct Exploration',
            'Choledochojejunostomy'
          ],
          emergency: [
            'Emergency Cholecystectomy',
            'Bile Duct Injury Repair'
          ]
        },
        equipment: [
          'Laparoscopic Cholecystectomy Set',
          'Open Gallbladder Set',
          'Liver Surgery Instruments',
          'Pringle Clamps',
          'Liver Retractors',
          'Ultrasonic Dissector (CUSA)',
          'Argon Beam Coagulator',
          'Haemostatic Agents (Surgicel, Floseal)'
        ]
      },
      'Breast Surgery': {
        procedures: {
          elective: [
            'Wide Local Excision (WLE)',
            'Mastectomy (Simple)',
            'Mastectomy (Skin-sparing)',
            'Mastectomy (Nipple-sparing)',
            'Axillary Node Clearance',
            'Sentinel Lymph Node Biopsy',
            'Breast Reconstruction (Immediate)',
            'Breast Reconstruction (Delayed)',
            'Reduction Mammoplasty'
          ],
          minor: [
            'Breast Lumpectomy',
            'Breast Abscess Drainage',
            'Breast Cyst Aspiration',
            'Gynaecomastia Excision'
          ]
        },
        equipment: [
          'Breast Surgery Set',
          'Sentinel Node Detection Equipment',
          'Gamma Probe',
          'Blue Dye',
          'Wire Localisation Equipment',
          'Harmonic Scalpel',
          'Diathermy (Bipolar/Monopolar)',
          'Breast Retractors',
          'Skin Markers'
        ]
      },
      'Vascular Access Surgery': {
        procedures: [
          'Hickman Line Insertion',
          'PICC Line Insertion',
          'Portacath Insertion',
          'Permcath Insertion',
          'AV Fistula Formation',
          'AV Graft Formation'
        ],
        equipment: [
          'Central Line Sets',
          'Vascular Instruments',
          'Ultrasound Machine',
          'Fluoroscopy (C-arm)',
          'Guidewires',
          'Dilators'
        ]
      }
    }
  },

  'Trauma Orthopaedics': {
    subspecialties: {
      'Trauma Orthopaedics': {
        procedures: {
          major: [
            'Hip Fracture - Dynamic Hip Screw (DHS)',
            'Hip Fracture - Intramedullary Nail (IM Nail)',
            'Hip Fracture - Hemiarthroplasty',
            'Femoral Shaft Fracture - IM Nail',
            'Tibial Shaft Fracture - IM Nail',
            'Open Reduction Internal Fixation (ORIF) - Ankle',
            'ORIF - Distal Radius',
            'ORIF - Tibial Plateau',
            'ORIF - Acetabulum',
            'ORIF - Pelvis',
            'External Fixation - Pelvis',
            'External Fixation - Tibia'
          ],
          minor: [
            'K-wire Fixation - Hand',
            'K-wire Fixation - Foot',
            'Manipulation Under Anaesthesia (MUA)',
            'Application of Cast',
            'Removal of Metalwork'
          ]
        },
        equipment: [
          'DHS Set (Smith & Nephew, Synthes)',
          'Femoral IM Nail Set (T2 Nail, Trigen)',
          'Tibial IM Nail Set',
          'Small Fragment Set (2.7mm, 3.5mm)',
          'Large Fragment Set (4.5mm)',
          'Locking Plate Sets',
          'External Fixator Sets (Hoffman, Ilizarov)',
          'Power Tools (Drill, Saw, Reamer)',
          'Image Intensifier (C-arm)',
          'Fracture Table',
          'Traction Equipment',
          'Bone Cement',
          'K-wires (Various sizes)'
        ]
      },
      'Elective Lower Limb': {
        procedures: [
          'Total Hip Replacement (THR) - Cemented',
          'Total Hip Replacement - Uncemented',
          'Hip Revision',
          'Total Knee Replacement (TKR)',
          'Knee Revision',
          'Unicompartmental Knee Replacement',
          'Ankle Replacement',
          'Ankle Arthrodesis',
          'Bunionectomy (Hallux Valgus)',
          'Hammer Toe Correction',
          'Achilles Tendon Repair',
          'ACL Reconstruction',
          'Meniscectomy',
          'Knee Arthroscopy'
        ],
        equipment: [
          'THR Set - Cemented (Exeter, CPT)',
          'THR Set - Uncemented (Corail, Taperloc)',
          'TKR Set (Stryker, Zimmer, DePuy)',
          'Knee Arthroscopy Set',
          'ACL Reconstruction Set',
          'Foot & Ankle Sets',
          'Power Tools (Saw, Drill, Reamer)',
          'Cement Mixing Equipment',
          'Pulsatile Lavage',
          'Tourniquets',
          'Leg Holders',
          'Image Intensifier'
        ]
      },
      'Elective Upper Limb': {
        procedures: [
          'Total Shoulder Replacement',
          'Reverse Shoulder Replacement',
          'Rotator Cuff Repair',
          'Shoulder Arthroscopy',
          'Elbow Replacement',
          'Elbow Arthroscopy',
          'Carpal Tunnel Release',
          'Dupuytren\'s Contracture Release',
          'Trigger Finger Release',
          'Hand Tendon Repair',
          'Hand Fracture Fixation',
          'Wrist Arthroscopy'
        ],
        equipment: [
          'Shoulder Replacement Sets',
          'Shoulder Arthroscopy Set',
          'Elbow Replacement Set',
          'Hand Instrument Set',
          'Small Fragment Sets',
          'K-wires',
          'Mini External Fixators',
          'Tourniquet',
          'Image Intensifier',
          'Arthroscopy Tower'
        ]
      },
      'Spinal Surgery': {
        procedures: [
          'Lumbar Discectomy',
          'Lumbar Decompression (Laminectomy)',
          'Lumbar Fusion (PLIF)',
          'Lumbar Fusion (TLIF)',
          'Cervical Discectomy',
          'Cervical Fusion (ACDF)',
          'Spinal Instrumentation',
          'Kyphoplasty',
          'Vertebroplasty'
        ],
        equipment: [
          'Spinal Instrument Set',
          'Pedicle Screw Systems',
          'Spinal Retractors',
          'Nerve Root Retractors',
          'Bone Graft Substitutes',
          'Spinal Cages',
          'Power Drill',
          'C-arm',
          'Neuromonitoring Equipment',
          'Microscope/Loupes'
        ]
      },
      'Paediatric Orthopaedics': {
        procedures: [
          'Club Foot Correction',
          'DDH Treatment',
          'Epiphysiodesis',
          'Osteotomy',
          'Limb Lengthening',
          'Scoliosis Correction'
        ],
        equipment: [
          'Paediatric Orthopaedic Sets',
          'Small Fragment Sets',
          'Pediatric External Fixators',
          'Paediatric Spinal Systems',
          'Casting Materials'
        ]
      }
    }
  },

  'Cardiothoracic Surgery': {
    subspecialties: {
      'Cardiac Surgery': {
        procedures: [
          'Coronary Artery Bypass Grafting (CABG)',
          'Aortic Valve Replacement (AVR)',
          'Mitral Valve Replacement',
          'Mitral Valve Repair',
          'Aortic Root Replacement (Bentall)',
          'TAVR (Transcatheter Aortic Valve Replacement)',
          'Atrial Septal Defect (ASD) Closure',
          'Ventricular Septal Defect (VSD) Closure',
          'Heart Transplant',
          'LVAD Insertion',
          'Pacemaker Insertion',
          'ICD Insertion'
        ],
        equipment: [
          'Cardiac Instrument Set',
          'Sternal Saw',
          'Sternal Retractor',
          'Cardiopulmonary Bypass Machine',
          'Heart-Lung Machine',
          'Aortic Cannulae',
          'Venous Cannulae',
          'Cardioplegia Delivery System',
          'Internal Defibrillator Paddles',
          'Pacing Wires',
          'Chest Drains',
          'Cell Saver',
          'TEE Probe'
        ]
      },
      'Thoracic Surgery': {
        procedures: {
          elective: [
            'Lobectomy',
            'Pneumonectomy',
            'Wedge Resection',
            'VATS (Video-Assisted Thoracoscopic Surgery)',
            'Oesophagectomy',
            'Mediastinoscopy',
            'Thymectomy',
            'Lung Volume Reduction Surgery'
          ],
          emergency: [
            'Chest Drain Insertion',
            'Emergency Thoracotomy',
            'Repair of Traumatic Injuries'
          ]
        },
        equipment: [
          'Thoracic Instrument Set',
          'VATS Instruments',
          'Rib Spreaders',
          'Lung Retractors',
          'Staplers (Endo-GIA)',
          'Double-Lumen ETT',
          'Bronchoscope',
          'Chest Drains (Various sizes)',
          'Underwater Seal Drainage Systems'
        ]
      }
    }
  },

  'Neurosurgery': {
    subspecialties: {
      'Cranial Surgery': {
        procedures: [
          'Craniotomy for Tumour',
          'Craniotomy for Aneurysm',
          'Craniotomy for Haematoma',
          'Cranioplasty',
          'Ventriculoperitoneal (VP) Shunt',
          'External Ventricular Drain (EVD)',
          'Burr Holes',
          'Transsphenoidal Hypophysectomy',
          'Awake Craniotomy'
        ],
        equipment: [
          'Craniotomy Set',
          'Cranial Drill (Midas Rex)',
          'Hudson Brace and Perforator',
          'Cranial Fixation (Mayfield Clamp)',
          'Operating Microscope',
          'Neuronavigation System',
          'Ultrasonic Aspirator (CUSA)',
          'Bipolar Diathermy',
          'Aneurysm Clips',
          'Shunt Systems',
          'ICP Monitoring Equipment'
        ]
      },
      'Spinal Neurosurgery': {
        procedures: [
          'Microdiscectomy',
          'Laminectomy',
          'Spinal Tumour Resection',
          'Spinal Cord Stimulator Insertion'
        ],
        equipment: [
          'Spinal Neurosurgery Set',
          'Operating Microscope',
          'Neuromonitoring',
          'Spinal Retractors'
        ]
      }
    }
  },

  'Urology': {
    subspecialties: {
      'Endourology': {
        procedures: [
          'TURP (Transurethral Resection of Prostate)',
          'TURBT (Transurethral Resection of Bladder Tumour)',
          'PCNL (Percutaneous Nephrolithotomy)',
          'Ureteroscopy (URS)',
          'Cystoscopy',
          'Urethral Dilatation',
          'JJ Stent Insertion/Removal'
        ],
        equipment: [
          'TURP Set',
          'TURBT Set',
          'Resectoscope',
          'Cystoscope (Rigid/Flexible)',
          'Ureteroscope (Rigid/Flexible)',
          'Laser (Holmium:YAG)',
          'Lithotripter',
          'Nephroscope',
          'Guidewires',
          'JJ Stents (Various sizes)',
          'Ureteric Catheters'
        ]
      },
      'Open/Laparoscopic Urology': {
        procedures: [
          'Radical Prostatectomy (Open)',
          'Radical Prostatectomy (Laparoscopic)',
          'Radical Prostatectomy (Robotic)',
          'Radical Nephrectomy',
          'Partial Nephrectomy',
          'Radical Cystectomy with Ileal Conduit',
          'Pyeloplasty',
          'Ureteric Reimplantation'
        ],
        equipment: [
          'Prostatectomy Set',
          'Nephrectomy Set',
          'Cystectomy Set',
          'Laparoscopic Urology Set',
          'Robotic Instruments (Da Vinci)',
          'Harmonic Scalpel',
          'LigaSure',
          'Bulldog Clamps',
          'Vascular Instruments'
        ]
      }
    }
  },

  'Gynaecology': {
    subspecialties: {
      'General Gynaecology': {
        procedures: [
          'Total Abdominal Hysterectomy (TAH)',
          'Vaginal Hysterectomy',
          'Laparoscopic Hysterectomy',
          'Myomectomy',
          'Oophorectomy',
          'Salpingectomy',
          'Ovarian Cystectomy',
          'Hysteroscopy',
          'Laparoscopy (Diagnostic)',
          'Dilation & Curettage (D&C)',
          'Colposcopy',
          'LLETZ Procedure'
        ],
        equipment: [
          'Major Gynaecology Set',
          'Minor Gynaecology Set',
          'Laparoscopic Gynaecology Set',
          'Hysteroscopy Set',
          'Vaginal Retractors',
          'Uterine Manipulator',
          'Harmonic Scalpel',
          'LigaSure',
          'Morcellator',
          'Colposcope',
          'LLETZ Equipment'
        ]
      },
      'Urogynaecology': {
        procedures: [
          'TVT (Tension-free Vaginal Tape)',
          'TOT (Transobturator Tape)',
          'Anterior Repair (Cystocoele)',
          'Posterior Repair (Rectocoele)',
          'Sacrocolpopexy',
          'Vaginal Vault Prolapse Repair'
        ],
        equipment: [
          'Urogynaecology Set',
          'TVT/TOT Kits',
          'Mesh Kits',
          'Vaginal Retractors'
        ]
      },
      'Obstetrics': {
        procedures: [
          'Caesarean Section (Elective)',
          'Caesarean Section (Emergency)',
          'Manual Removal of Placenta',
          'Repair of Perineal Tears (3rd/4th degree)'
        ],
        equipment: [
          'Caesarean Section Set',
          'Obstetric Instruments',
          'Cord Clamps',
          'Neonatal Resuscitation Equipment'
        ]
      }
    }
  },

  'ENT (Ear, Nose & Throat)': {
    subspecialties: {
      'Otology': {
        procedures: [
          'Myringotomy & Grommets',
          'Mastoidectomy',
          'Tympanoplasty',
          'Stapedectomy',
          'Cochlear Implant',
          'Bone Anchored Hearing Aid (BAHA)'
        ],
        equipment: [
          'Ear Microscope',
          'Ear Microinstruments',
          'Mastoid Drill',
          'Otoscope',
          'Grommet Inserters',
          'Prostheses (Stapedectomy)'
        ]
      },
      'Rhinology': {
        procedures: [
          'Septoplasty',
          'Functional Endoscopic Sinus Surgery (FESS)',
          'Rhinoplasty',
          'Nasal Polypectomy',
          'Turbinate Reduction',
          'Nasal Packing'
        ],
        equipment: [
          'Nasal Instrument Set',
          'Endoscopes (0°, 30°, 45°, 70°)',
          'Microdebrider',
          'Balloons (Balloon Sinuplasty)',
          'Nasal Packs',
          'Nasal Splints'
        ]
      },
      'Laryngology': {
        procedures: [
          'Microlaryngoscopy',
          'Vocal Cord Surgery',
          'Laryngectomy',
          'Tracheostomy',
          'Emergency Cricothyroidotomy'
        ],
        equipment: [
          'Laryngoscopes (Various sizes)',
          'Operating Microscope',
          'Laser (CO2)',
          'Tracheostomy Sets',
          'Emergency Airway Equipment'
        ]
      },
      'Head & Neck': {
        procedures: [
          'Thyroidectomy',
          'Parathyroidectomy',
          'Neck Dissection',
          'Parotidectomy',
          'Submandibular Gland Excision',
          'Tonsillectomy',
          'Adenoidectomy',
          'Tongue Base Surgery'
        ],
        equipment: [
          'Thyroid Set',
          'Head & Neck Set',
          'Harmonic Scalpel',
          'LigaSure',
          'Nerve Monitor (RLN)',
          'Tonsil Instruments',
          'Coblation System'
        ]
      }
    }
  },

  'Ophthalmology': {
    subspecialties: {
      'Cataract Surgery': {
        procedures: [
          'Phacoemulsification with IOL',
          'Manual Small Incision Cataract Surgery (MSICS)',
          'Complex Cataract Surgery'
        ],
        equipment: [
          'Phacoemulsification Machine',
          'Operating Microscope',
          'IOL Injectors',
          'Phaco Handpieces',
          'Viscoelastic',
          'Intraocular Lenses (IOLs)',
          'Microsurgical Instruments'
        ]
      },
      'Vitreoretinal Surgery': {
        procedures: [
          'Vitrectomy',
          'Retinal Detachment Repair',
          'Macular Hole Surgery',
          'Diabetic Retinopathy Surgery',
          'Intravitreal Injections'
        ],
        equipment: [
          'Vitrectomy Machine',
          'Operating Microscope',
          'Wide-angle Viewing System',
          'Endolaser',
          'Gas/Silicone Oil',
          'Scleral Buckles'
        ]
      },
      'Glaucoma Surgery': {
        procedures: [
          'Trabeculectomy',
          'Tube Shunt Surgery',
          'iStent Implantation',
          'Laser Trabeculoplasty'
        ],
        equipment: [
          'Glaucoma Shunts',
          'Laser (YAG/Argon)',
          'Microsurgical Instruments'
        ]
      },
      'Oculoplastics': {
        procedures: [
          'Ptosis Repair',
          'Ectropion/Entropion Repair',
          'Dacryocystorhinostomy (DCR)',
          'Orbital Surgery',
          'Enucleation/Evisceration'
        ],
        equipment: [
          'Oculoplastic Instrument Set',
          'Orbital Implants',
          'Lacrimal Probes and Stents'
        ]
      }
    }
  },

  'Plastic & Reconstructive Surgery': {
    subspecialties: {
      'Reconstructive Surgery': {
        procedures: [
          'Free Flap (DIEP, ALT, Radial Forearm)',
          'Pedicled Flap',
          'Skin Grafts (SSG, FTSG)',
          'Tissue Expansion',
          'Scar Revision',
          'Burn Surgery',
          'Hand Reconstruction',
          'Microvascular Surgery'
        ],
        equipment: [
          'Plastic Surgery Set',
          'Microsurgical Instruments',
          'Operating Microscope',
          'Doppler Probe',
          'Dermatome',
          'Mesher',
          'VAC Dressings',
          'Tissue Expanders'
        ]
      },
      'Cosmetic Surgery': {
        procedures: [
          'Rhinoplasty',
          'Facelift',
          'Blepharoplasty',
          'Otoplasty',
          'Breast Augmentation',
          'Breast Reduction',
          'Abdominoplasty',
          'Liposuction'
        ],
        equipment: [
          'Cosmetic Surgery Set',
          'Breast Implants',
          'Liposuction Equipment',
          'Tumescent Infiltration System'
        ]
      },
      'Cleft & Craniofacial': {
        procedures: [
          'Cleft Lip Repair',
          'Cleft Palate Repair',
          'Craniofacial Reconstruction',
          'Distraction Osteogenesis'
        ],
        equipment: [
          'Paediatric Plastic Set',
          'Cranial Fixation Systems',
          'Distraction Devices'
        ]
      }
    }
  },

  'Maxillofacial Surgery': {
    subspecialties: {
      'Trauma': {
        procedures: [
          'Mandible Fracture Fixation',
          'Maxillary Fracture Fixation (Le Fort)',
          'Zygomatic Fracture Fixation',
          'Orbital Floor Reconstruction',
          'Nasal Bone Fracture Reduction'
        ],
        equipment: [
          'Maxillofacial Plating Sets (1.5mm, 2.0mm, 2.5mm)',
          'Orbital Mesh',
          'Arch Bars',
          'IMF Screws',
          'Power Drill',
          'Image Intensifier'
        ]
      },
      'Orthognathic Surgery': {
        procedures: [
          'Le Fort I Osteotomy',
          'Bilateral Sagittal Split Osteotomy (BSSO)',
          'Genioplasty',
          'Distraction Osteogenesis'
        ],
        equipment: [
          'Orthognathic Surgery Sets',
          'Surgical Guides',
          'Bone Saws',
          'Fixation Plates'
        ]
      }
    }
  },

  'Vascular Surgery': {
    procedures: {
      arterial: [
        'Carotid Endarterectomy',
        'Aortic Aneurysm Repair (Open)',
        'EVAR (Endovascular Aneurysm Repair)',
        'Femoral-Popliteal Bypass',
        'Femoral-Distal Bypass',
        'Aorto-bifemoral Bypass',
        'Embolectomy',
        'Amputation (Above/Below Knee)'
      ],
      venous: [
        'Varicose Vein Stripping',
        'Endovenous Laser Therapy (EVLT)',
        'Radiofrequency Ablation',
        'Sclerotherapy',
        'Perforator Ligation'
      ]
    },
    equipment: [
      'Vascular Instrument Set',
      'Vascular Clamps (Various)',
      'Shunts (Javid, Pruitt)',
      'Grafts (Dacron, PTFE)',
      'Doppler Probe',
      'Vessel Loops',
      'Fogarty Catheters',
      'Heparinised Saline',
      'Laser/RF Ablation Equipment'
    ]
  }
};

// ============================================================================
// ANAESTHETIC COMPETENCIES
// ============================================================================

export const ANAESTHETIC_COMPETENCIES = {
  'Anaesthetic Machines': {
    models: [
      'Drager Fabius GS',
      'Drager Primus',
      'Drager Zeus',
      'GE Aisys',
      'GE Aespire',
      'GE Avance CS2',
      'Mindray A7',
      'Mindray A5',
      'Penlon Prima SP2'
    ],
    skills: [
      'Pre-use Check',
      'Circle System Setup',
      'Vaporizer Change',
      'Troubleshooting',
      'Emergency Backup Ventilation',
      'AGSS (Anaesthetic Gas Scavenging System)',
      'Breathing Circuit Assembly'
    ]
  },
  'Airway Management': {
    equipment: [
      'Laryngoscopes (Macintosh, Miller)',
      'Video Laryngoscope (McGrath, C-MAC, Glidescope)',
      'Supraglottic Airways (LMA Classic, LMA Supreme, i-gel)',
      'Bougie',
      'Stylet',
      'Airtraq',
      'Fibreoptic Bronchoscope',
      'Emergency Cricothyroidotomy Kit'
    ],
    procedures: [
      'Direct Laryngoscopy & Intubation',
      'Video Laryngoscopy',
      'LMA Insertion',
      'Difficult Airway Management',
      'Rapid Sequence Induction',
      'Awake Fibreoptic Intubation',
      'Emergency Front of Neck Access (FONA)',
      'Nasal Intubation',
      'Double Lumen Tube Insertion'
    ]
  },
  'Vascular Access': {
    procedures: [
      'Peripheral IV Cannulation',
      'Central Venous Catheter (CVC) - Subclavian',
      'CVC - Internal Jugular',
      'CVC - Femoral',
      'Arterial Line - Radial',
      'Arterial Line - Femoral',
      'Ultrasound-guided Vascular Access',
      'Intraosseous Access'
    ],
    equipment: [
      'Ultrasound Machine (SonoSite, GE)',
      'Central Line Kits',
      'Arterial Line Kits',
      'Pressure Transducers',
      'Guidewires',
      'Dilators'
    ]
  },
  'Regional Anaesthesia': {
    blocks: {
      neuraxial: [
        'Spinal Anaesthesia',
        'Epidural Anaesthesia',
        'Combined Spinal-Epidural (CSE)'
      ],
      upperLimb: [
        'Interscalene Block',
        'Supraclavicular Block',
        'Infraclavicular Block',
        'Axillary Block'
      ],
      lowerLimb: [
        'Femoral Nerve Block',
        'Sciatic Nerve Block',
        'Popliteal Block',
        'Adductor Canal Block',
        'Fascia Iliaca Block',
        'Ankle Block'
      ],
      truncal: [
        'TAP Block (Transversus Abdominis Plane)',
        'Rectus Sheath Block',
        'Serratus Anterior Block',
        'Erector Spinae Block',
        'Paravertebral Block',
        'Pecs Block'
      ]
    },
    equipment: [
      'Ultrasound Machine',
      'Regional Anaesthesia Needles (Stimuplex, Pajunk)',
      'Nerve Stimulator',
      'Epidural Kits',
      'Spinal Needles (Whitacre, Sprotte)',
      'Catheter Sets'
    ]
  },
  'Monitoring Equipment': {
    standard: [
      'ECG Monitor',
      'Non-invasive Blood Pressure (NIBP)',
      'Pulse Oximeter',
      'Capnography',
      'Temperature Monitor',
      'Anaesthetic Agent Monitor'
    ],
    advanced: [
      'Invasive Arterial Pressure',
      'Central Venous Pressure (CVP)',
      'Cardiac Output Monitoring (FloTrac, PiCCO, LiDCO)',
      'Pulmonary Artery Catheter (Swan-Ganz)',
      'Transoesophageal Echocardiography (TOE)',
      'Bispectral Index (BIS)',
      'Cerebral Oximetry (NIRS)',
      'Neuromuscular Monitoring (TOF)'
    ]
  },
  'Ventilation Modes': [
    'Volume Control Ventilation (VCV)',
    'Pressure Control Ventilation (PCV)',
    'Pressure Support Ventilation (PSV)',
    'SIMV (Synchronized Intermittent Mandatory Ventilation)',
    'CPAP (Continuous Positive Airway Pressure)',
    'BIPAP',
    'High Frequency Oscillation (HFO)',
    'One Lung Ventilation',
    'Protective Lung Ventilation',
    'Recruitment Manoeuvres'
  ],
  'Infusion Devices': {
    pumps: [
      'Alaris Syringe Pump',
      'Braun Perfusor',
      'Graseby Syringe Driver',
      'Alaris Infusion Pump',
      'Fresenius Infusion Pump',
      'Baxter Colleague',
      'Target Controlled Infusion (TCI) Pump'
    ],
    skills: [
      'Pump Programming',
      'TCI Setup (Propofol, Remifentanil)',
      'Drug Library Management',
      'Troubleshooting Alarms',
      'Anti-siphon Valve Setup'
    ]
  },
  'Procedures by Specialty': {
    'Cardiac Anaesthesia': [
      'TOE Probe Insertion',
      'CVP Line Insertion',
      'Arterial Line Insertion',
      'PA Catheter Insertion',
      'Induction for Cardiac Surgery',
      'Management of Cardiopulmonary Bypass',
      'Post-bypass Management',
      'IABP Management'
    ],
    'Neuroanaesthesia': [
      'Controlled Hypotension',
      'ICP Monitoring',
      'Evoked Potential Monitoring',
      'Sitting Position Management',
      'Awake Craniotomy',
      'Venous Air Embolism Management'
    ],
    'Obstetric Anaesthesia': [
      'Labour Epidural',
      'Spinal for C-Section',
      'General Anaesthesia for C-Section',
      'Management of Haemorrhage',
      'Failed Intubation Drill'
    ],
    'Paediatric Anaesthesia': [
      'Paediatric Airway Management',
      'Caudal Block',
      'Penile Block',
      'Inhalational Induction',
      'IV Induction in Children',
      'Paediatric Resuscitation'
    ]
  }
};

// ============================================================================
// RECOVERY/PACU COMPETENCIES
// ============================================================================

export const RECOVERY_COMPETENCIES = {
  'Monitoring Equipment': [
    'Multi-parameter Monitors (Philips, GE, Mindray)',
    'ECG Monitoring',
    'SpO2 Monitoring',
    'NIBP Monitoring',
    'Temperature Monitoring',
    'Capnography',
    'Arterial Line Monitoring',
    'CVP Monitoring'
  ],
  'Airway Management': {
    equipment: [
      'Oxygen Delivery Devices (Nasal Cannula, Simple Mask, Hudson Mask)',
      'High Flow Nasal Oxygen (Optiflow)',
      'CPAP Machine',
      'Bag-Valve-Mask',
      'Guedel Airways',
      'Nasopharyngeal Airways',
      'Laryngoscope',
      'Emergency Intubation Equipment'
    ],
    skills: [
      'Airway Obstruction Management',
      'Jaw Thrust/Chin Lift',
      'Oropharyngeal Airway Insertion',
      'Nasopharyngeal Airway Insertion',
      'Bag-Mask Ventilation',
      'LMA Removal',
      'Extubation',
      'Recognition of Laryngospasm',
      'Management of Laryngospasm'
    ]
  },
  'Pain Management': {
    equipment: [
      'PCA Pumps (Alaris, Graseby)',
      'Epidural Infusion Pumps',
      'Nerve Block Catheters'
    ],
    skills: [
      'PCA Setup and Programming',
      'Epidural Top-up',
      'Peripheral Nerve Block Assessment',
      'Pain Score Assessment',
      'Multimodal Analgesia',
      'Opioid Administration',
      'Regional Block Monitoring'
    ]
  },
  'Temperature Management': {
    equipment: [
      'Forced Air Warming (Bair Hugger)',
      'Fluid Warmers',
      'Temperature Probes',
      'Warming Blankets'
    ],
    skills: [
      'Prevention of Hypothermia',
      'Management of Hypothermia',
      'Recognition of Hyperthermia',
      'Shivering Management'
    ]
  },
  'Complications Management': [
    'Post-operative Nausea & Vomiting (PONV)',
    'Hypotension Management',
    'Hypertension Management',
    'Bradycardia Management',
    'Tachycardia Management',
    'Respiratory Depression',
    'Hypoxia Management',
    'Emergence Delirium',
    'Delayed Emergence',
    'Anaphylaxis Recognition & Management',
    'Haemorrhage Recognition',
    'Fluid Overload',
    'Oliguria Management'
  ],
  'Drainage Systems': [
    'Chest Drains (Underwater Seal)',
    'Redivac Drains',
    'Nasogastric Tubes',
    'Urinary Catheters',
    'Wound Drains',
    'Surgical Drain Management'
  ],
  'Assessment Scores': [
    'Aldrete Score',
    'Modified Aldrete Score',
    'Glasgow Coma Scale (GCS)',
    'Richmond Agitation-Sedation Scale (RASS)',
    'Pain Scores (NRS, VAS, Wong-Baker FACES)',
    'PONV Score'
  ],
  'Discharge Criteria': [
    'Airway Patency Assessment',
    'Respiratory Function Assessment',
    'Cardiovascular Stability',
    'Pain Control Assessment',
    'Mobility Assessment',
    'Fluid Balance Assessment',
    'Surgical Site Assessment',
    'Day Surgery Discharge Criteria'
  ]
};

// ============================================================================
// CELL SALVAGE COMPETENCIES
// ============================================================================

export const CELL_SALVAGE_COMPETENCIES = {
  'Equipment': {
    machines: [
      'Haemonetics Cell Saver 5+',
      'Haemonetics Cell Saver Elite',
      'Fresenius CATS',
      'Sorin Xtra',
      'Medtronic Autolog'
    ],
    components: [
      'Centrifuge Bowl',
      'Suction Reservoir',
      'Washing Solution',
      'Anticoagulant (Heparin/Citrate)',
      'Blood Administration Sets',
      'Suction Tubing',
      'Collection Reservoir'
    ]
  },
  'Procedures': [
    'Machine Setup & Priming',
    'Collection Phase',
    'Washing Phase',
    'Concentration Phase',
    'Re-infusion Phase',
    'Quality Control Testing',
    'Haematocrit Measurement',
    'Machine Cleaning & Decontamination',
    'Troubleshooting'
  ],
  'Clinical Applications': {
    suitable: [
      'Cardiac Surgery (CABG)',
      'Vascular Surgery (AAA)',
      'Orthopaedic Surgery (THR, Spinal)',
      'Trauma Surgery',
      'Liver Transplant',
      'Obstetrics (Caesarean Section - if clear amniotic fluid)',
      'Thoracic Surgery'
    ],
    contraindications: [
      'Contaminated Fields (Bowel)',
      'Malignancy (Relative)',
      'Infection/Sepsis',
      'Meconium-stained Amniotic Fluid'
    ]
  },
  'Monitoring & Documentation': [
    'Volume Collected',
    'Volume Washed',
    'Volume Re-infused',
    'Haematocrit (Pre & Post)',
    'Quality Parameters',
    'Anticoagulation Ratio',
    'Adverse Events',
    'Equipment Malfunction'
  ],
  'Complications & Management': [
    'Air Embolism Prevention',
    'Haemolysis Recognition',
    'Inadequate Washing',
    'Contamination Prevention',
    'Fat Embolism (Orthopaedics)',
    'Allergic Reactions',
    'Coagulopathy'
  ]
};

// ============================================================================
// HCA (HEALTHCARE ASSISTANT) COMPETENCIES
// ============================================================================

export const HCA_COMPETENCIES = {
  'Theatre Setup': {
    'General Theatre Setup': [
      'Operating Table Positioning',
      'Lighting Setup',
      'Suction Setup (Yankauer, Poole)',
      'Diathermy Plate Application',
      'Equipment Check (Diathermy, Suction)',
      'Patient Positioning Aids',
      'Pressure Area Protection',
      'Tourniquet Application',
      'Warming Devices Setup',
      'Preparing Sterile Field'
    ],
    'Specialty-Specific Setups': {
      'Orthopaedics': [
        'Fracture Table Setup',
        'Traction Equipment',
        'Image Intensifier (C-arm) Positioning',
        'Tourniquet Setup',
        'Cement Mixing Station',
        'Power Tool Setup',
        'Implant Storage & Retrieval'
      ],
      'Laparoscopy': [
        'Laparoscopy Tower Setup',
        'Insufflator Setup',
        'Camera & Light Source',
        'Monitor Positioning',
        'Instrument Trolley Preparation'
      ],
      'Cardiothoracic': [
        'Bypass Machine Positioning',
        'Cell Saver Setup',
        'Multiple Suction Setup',
        'Defibrillator Check',
        'Pacing Equipment'
      ],
      'Neurosurgery': [
        'Mayfield Clamp Setup',
        'Microscope Positioning',
        'Navigation System Setup',
        'ICP Monitoring Equipment'
      ]
    }
  },
  'Specimen Handling': {
    types: [
      'Histology Specimens',
      'Cytology Specimens',
      'Microbiology Specimens',
      'Frozen Section Specimens',
      'Stones/Foreign Bodies',
      'Amputated Limbs'
    ],
    skills: [
      'Correct Container Selection',
      'Specimen Labelling',
      'Fixative Selection (Formalin, Saline)',
      'Form Completion',
      'Chain of Custody',
      'Transport Arrangements',
      'Urgent Specimen Handling',
      'Contaminated Specimen Handling'
    ]
  },
  'Implant Management': {
    'Orthopaedic Implants': {
      'Hip Implants': [
        'Cemented Stems (Exeter, CPT, Charnley)',
        'Uncemented Stems (Corail, Taperloc, ABG)',
        'Acetabular Cups (Cemented, Uncemented)',
        'Femoral Heads (Ceramic, Metal, Polyethylene)',
        'Hip Screws (DHS, CHS)',
        'Intramedullary Nails (Femoral, Tibial)'
      ],
      'Knee Implants': [
        'Total Knee Systems (Stryker, Zimmer, DePuy)',
        'Unicompartmental Knee',
        'Patellar Components',
        'Tibial Inserts (Fixed, Mobile Bearing)'
      ],
      'Trauma Implants': [
        'Plates (Small Fragment 2.7mm, 3.5mm)',
        'Plates (Large Fragment 4.5mm)',
        'Locking Plates',
        'Screws (Cortical, Cancellous, Locking)',
        'K-wires',
        'Intramedullary Nails',
        'External Fixators'
      ],
      'Spinal Implants': [
        'Pedicle Screw Systems',
        'Rods & Connectors',
        'Interbody Cages (TLIF, PLIF, ALIF)',
        'Bone Graft Substitutes',
        'Cervical Plates'
      ]
    },
    'Cardiac Implants': [
      'Heart Valves (Mechanical, Tissue)',
      'Valve Sizes & Types',
      'Pacing Wires',
      'Sternal Wires',
      'Vascular Grafts (Dacron, PTFE)'
    ],
    'General Surgery Implants': [
      'Hernia Mesh (Various sizes & types)',
      'Staplers (Linear, Circular)',
      'Surgical Clips',
      'Haemostatic Agents'
    ],
    'Gynaecology Implants': [
      'TVT/TOT Slings',
      'Mesh Systems',
      'Morcellator Blades'
    ],
    'ENT Implants': [
      'Cochlear Implants',
      'BAHA Systems',
      'Ossicular Prostheses',
      'Tracheal Stents'
    ],
    'Ophthalmology Implants': [
      'Intraocular Lenses (IOLs)',
      'Glaucoma Shunts',
      'Scleral Buckles',
      'Orbital Implants'
    ],
    'Plastic Surgery Implants': [
      'Breast Implants (Saline, Silicone)',
      'Tissue Expanders',
      'Facial Implants'
    ],
    'Maxillofacial Implants': [
      'Fixation Plates (1.5mm, 2.0mm, 2.5mm)',
      'Screws',
      'Orbital Mesh',
      'TMJ Prostheses'
    ],
    'Management Skills': [
      'Implant Tracking & Documentation',
      'Barcode Scanning',
      'Sticker Application',
      'Implant Register Completion',
      'Storage & Stock Management',
      'Temperature Monitoring',
      'Expiry Date Checks',
      'Loan Set Management',
      'Emergency Implant Procurement'
    ]
  },
  'Operating Tables & Attachments': {
    'Table Types': [
      'Maquet Alphamaxx',
      'Maquet Betamax',
      'Trumpf TruSystem 7500',
      'Steris 5085',
      'Stryker Surgical Table'
    ],
    'Table Attachments': {
      'Head Support': [
        'Head Ring',
        'Horseshoe Headrest',
        'Gel Head Support',
        'Mayfield Clamp'
      ],
      'Arm Boards': [
        'Standard Arm Boards',
        'Radiolucent Arm Boards',
        'Arm Board Straps',
        'Lloyd Davies Leg Supports'
      ],
      'Leg Supports': [
        'Lithotomy Poles',
        'Allen Stirrups',
        'Candy Cane Stirrups',
        'Lloyd Davies Stirrups',
        'Leg Holders (Spider Straps)'
      ],
      'Body Supports': [
        'Kidney Bridge',
        'Lateral Supports',
        'Body Straps',
        'Chest Rolls',
        'Wilson Frame',
        'Montreal Mattress',
        'Vacuum Positioning Devices'
      ],
      'Extension Pieces': [
        'Table Extensions',
        'Leg Section',
        'Foot Section',
        'Fracture Table Components'
      ]
    },
    'Positioning Skills': [
      'Supine Position',
      'Prone Position',
      'Lateral Position',
      'Lithotomy Position',
      'Trendelenburg Position',
      'Reverse Trendelenburg',
      'Lloyd Davies Position',
      'Beach Chair Position',
      'Sitting Position'
    ]
  },
  'Equipment Familiarity': {
    'Diathermy': [
      'Valleylab Force FX',
      'Valleylab Force Triad',
      'Erbe VIO',
      'Erbe ICC',
      'Settings (Cut, Coag, Blend)',
      'Plate Application',
      'Troubleshooting',
      'Bipolar Forceps'
    ],
    'Suction': [
      'Wall Suction Units',
      'Portable Suction (Yankauer)',
      'Poole Suction',
      'Laparoscopic Suction/Irrigator',
      'Tubing & Connections'
    ],
    'Imaging': [
      'Image Intensifier (C-arm) Operation',
      'Radiation Safety',
      'Lead Apron Management',
      'X-ray Cassette Handling'
    ],
    'Laparoscopy Equipment': [
      'Insufflator',
      'Camera System',
      'Light Source',
      'Monitor Setup',
      'Trocar Types'
    ],
    'Power Tools': [
      'Stryker System 8',
      'DePuy Synthes Power System',
      'Medtronic Power System',
      'Drills',
      'Saws',
      'Reamers',
      'Battery Management',
      'Sterilization Compatibility'
    ],
    'Microscopes': [
      'Zeiss OPMI',
      'Leica Microscope',
      'Focus & Zoom Operation',
      'Draping',
      'Positioning'
    ],
    'Tourniquets': [
      'Zimmer ATS',
      'Stryker Tourniquet',
      'Cuff Selection & Application',
      'Pressure Settings',
      'Time Monitoring',
      'Documentation'
    ],
    'Warming Devices': [
      'Bair Hugger',
      'Hot Dog Warmer',
      'Fluid Warmers',
      'Blanket Application'
    ]
  },
  'Sterile Supplies Management': [
    'Instrument Set Selection',
    'Implant Retrieval',
    'Supplementary Instruments',
    'Suture Selection',
    'Drape Selection',
    'Gown & Glove Sizes',
    'Swab Counts',
    'Instrument Counts',
    'Sharps Management'
  ],
  'Cleaning & Turnover': [
    'Post-operative Cleaning',
    'Blood/Fluid Spillage Management',
    'Sharps Disposal',
    'Clinical Waste Segregation',
    'Equipment Decontamination',
    'Terminal Cleaning',
    'Quick Turnover Procedures'
  ]
};
