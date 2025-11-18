// ============================================================================
// COMPREHENSIVE SURGICAL COMPETENCY DATA STRUCTURE
// Updated to focus on STAFF EXPERIENCE with procedures (0-5) and equipment (3-star)
// Includes OPCS-4 codes for EPR integration
// ============================================================================

// ============================================================================
// RATING SYSTEMS
// ============================================================================

// Procedure experience levels (0-5 scale)
export const PROCEDURE_EXPERIENCE_LEVELS = {
  0: {
    value: 0,
    label: 'No knowledge',
    shortLabel: '0',
    color: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',
    activeColor: 'bg-gray-600 text-white border-gray-700',
    description: 'Never heard of this procedure'
  },
  1: {
    value: 1,
    label: 'Awareness',
    shortLabel: '1',
    color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    activeColor: 'bg-blue-600 text-white border-blue-700',
    description: 'Know it exists but no hands-on experience'
  },
  2: {
    value: 2,
    label: 'Novice',
    shortLabel: '2',
    color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
    activeColor: 'bg-orange-600 text-white border-orange-700',
    description: 'Currently learning with significant support needed',
    trackProgress: true // Only track timesPerformed and lastPerformed at this level
  },
  3: {
    value: 3,
    label: 'Competent',
    shortLabel: '3',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
    activeColor: 'bg-yellow-600 text-white border-yellow-700',
    description: 'Can scrub with supervision/assistance'
  },
  4: {
    value: 4,
    label: 'Proficient',
    shortLabel: '4',
    color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    activeColor: 'bg-green-600 text-white border-green-700',
    description: 'Independent practice, confident and safe'
  },
  5: {
    value: 5,
    label: 'Expert',
    shortLabel: '5',
    color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    activeColor: 'bg-purple-600 text-white border-purple-700',
    description: 'Can teach, supervise and mentor others'
  }
} as const;

// Equipment experience levels (3-star system)
export const EQUIPMENT_EXPERIENCE_LEVELS = {
  0: {
    value: 0,
    label: 'No experience',
    stars: 0,
    shortLabel: '0',
    color: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',
    activeColor: 'bg-gray-600 text-white border-gray-700',
    description: 'Never used this equipment'
  },
  1: {
    value: 1,
    label: 'Learning',
    stars: 1,
    shortLabel: '1',
    color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
    activeColor: 'bg-orange-600 text-white border-orange-700',
    description: 'Currently learning to use this equipment',
    trackProgress: true // Only track at learning level
  },
  2: {
    value: 2,
    label: 'With supervision',
    stars: 2,
    shortLabel: '2',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
    activeColor: 'bg-yellow-600 text-white border-yellow-700',
    description: 'Can use with supervision'
  },
  3: {
    value: 3,
    label: 'Independent',
    stars: 3,
    shortLabel: '3',
    color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    activeColor: 'bg-green-600 text-white border-green-700',
    description: 'Can use independently'
  }
} as const;

// ============================================================================
// COMPREHENSIVE NHS ORTHOPAEDIC EQUIPMENT SUPPLIERS
// Based on NHS Supply Chain Total Orthopaedic Solutions Framework
// ============================================================================

export const ORTHOPAEDIC_EQUIPMENT = {
  'Hip Arthroplasty': {
    'Stryker': {
      products: [
        'Cemented Hip Systems (Exeter V40)',
        'Uncemented Hip Systems (Accolade TMZF, Accolade II)',
        'Trident Acetabular System (Cemented)',
        'Trident Acetabular System (Uncemented)',
        'Trident II Acetabular System',
        'ADM X3 Highly Crosslinked Polyethylene',
        'Ceramic Heads (Biolox Delta)',
        'Modular Necks'
      ]
    },
    'DePuy Synthes (Johnson & Johnson)': {
      products: [
        'Corail Hip System (Uncemented Stem)',
        'Pinnacle Acetabular Cup System',
        'Marathon Highly Crosslinked Polyethylene',
        'CPT Hip System (Cemented)',
        'S-ROM Modular Hip System',
        'Articul/eze Highly Crosslinked Polyethylene',
        'Ceramic Femoral Heads (Biolox Forte, Delta)',
        'Dual Mobility Systems'
      ]
    },
    'Zimmer Biomet': {
      products: [
        'CPT Cemented Hip Stem',
        'Taperloc Uncemented Hip Stem',
        'G7 Acetabular Shell System',
        'Trabecular Metal Acetabular System',
        'Continuum Acetabular System',
        'Vivacit-E Highly Crosslinked Polyethylene',
        'Arcom Polyethylene',
        'Longevity Highly Crosslinked Polyethylene',
        'Ceramic Heads (Biolox Delta)'
      ]
    },
    'Smith & Nephew': {
      products: [
        'Polarstem Cemented Hip System',
        'Anthology Hip Systems',
        'R3 Acetabular System',
        'Reflection Acetabular System',
        'VERILAST Technology (Oxidized Zirconium)',
        'E1 Antioxidant Infused Polyethylene'
      ]
    },
    'Corin': {
      products: [
        'Metafix Cemented Stem',
        'TriFit TS Uncemented Stem',
        'Trinity Acetabular Cup System',
        'Delta-Motion Cups'
      ]
    },
    'Link': {
      products: [
        'Lubinus SP II Cemented Stem',
        'Endo-Model SL Uncemented Stem',
        'Bicon-Plus Acetabular System'
      ]
    },
    'Microport': {
      products: [
        'Profemur Modular Hip System',
        'Anthology Hip Systems'
      ]
    }
  },

  'Knee Arthroplasty': {
    'Stryker': {
      products: [
        'Triathlon Total Knee System',
        'Triathlon Tritanium Knee System',
        'Triathlon X3 Polyethylene',
        'Mako Robotic-Arm Assisted System',
        'GetAroundKnee (GAK) Mobile Bearing'
      ]
    },
    'DePuy Synthes': {
      products: [
        'Attune Knee System',
        'Attune Revision Knee System',
        'PFC Sigma Knee System',
        'LPS-Flex Mobile Knee System'
      ]
    },
    'Zimmer Biomet': {
      products: [
        'Persona Knee System',
        'Persona Revision Knee System',
        'Persona Partial Knee (Unicompartmental)',
        'Vanguard Knee System',
        'Vivacit-E Highly Crosslinked Polyethylene',
        'Rosa Knee Robotic System'
      ]
    },
    'Smith & Nephew': {
      products: [
        'Legion Total Knee System',
        'Legion Revision Knee System',
        'Journey II Total Knee System',
        'Navio Surgical System (Robotics)'
      ]
    },
    'Corin': {
      products: [
        'OPS Total Knee System',
        'UniGlide Unicompartmental Knee'
      ]
    },
    'Medacta': {
      products: [
        'GMK Sphere Total Knee',
        'MyKnee Patient-Matched Instruments'
      ]
    }
  },

  'Trauma & Fixation': {
    'Stryker': {
      products: [
        'Gamma3 Cephalomedullary Nail',
        'T2 Femoral Nail',
        'T2 Tibial Nail',
        'Expert Tibial Nail',
        'VariAx 2 Locking Plate System',
        'Hoffmann 3 External Fixation',
        'Small Fragment Locking Compression Plates'
      ]
    },
    'DePuy Synthes': {
      products: [
        'Trochanteric Fixation Nail Advanced (TFNA)',
        'Proximal Femoral Nail Antirotation (PFNA)',
        'Expert Femoral Nail',
        'Expert Tibial Nail',
        'LCP Locking Compression Plate System',
        'VA-LCP Variable Angle Locking Plates',
        'Matrix Mandible System',
        'Matrix Midface System'
      ]
    },
    'Zimmer Biomet': {
      products: [
        'Natural Nail Cephalomedullary System',
        'Trigen Intertan Nail',
        'NCB Polyaxial Locking Plate System',
        'Periarticular Locking Plates',
        'A.L.P.S. Plating System'
      ]
    },
    'Smith & Nephew': {
      products: [
        'Trigen Femoral/Tibial Nails',
        'Intertan Cephalomedullary Nail',
        'Peri-Loc Locked Plating System',
        'DVR (Distal Varus Recurvatum) Plate'
      ]
    },
    'Acumed': {
      products: [
        'Acu-Loc Wrist Plating System',
        'Polarus Humeral Rod',
        'Ankle Fracture Systems'
      ]
    },
    'Orthofix': {
      products: [
        'TrueLok External Fixation',
        'Hexapod External Fixation'
      ]
    }
  },

  'Spinal Systems': {
    'Medtronic': {
      products: [
        'CD Horizon Solera Spinal System',
        'Infinity OCT Spinal System',
        'Viper 2 Spinal System',
        'Capstone Spinal System',
        'Clydesdale Spinal System (Large Diameter)',
        'Infuse Bone Graft (rhBMP-2)',
        'O-arm Intraoperative Imaging',
        'Mazor X Stealth Robotic Guidance'
      ]
    },
    'DePuy Synthes': {
      products: [
        'Expedium Spinal System',
        'Viper Prime Spinal System',
        'MOUNTAINEER Spinal System',
        'PEEK Cages (COALESCENCE)',
        'Cervical Plates (Atlantis, Zero-P)'
      ]
    },
    'Stryker': {
      products: [
        'Xia 3 Spinal System',
        'AVS Anterior Spinal System',
        'PEEK-OPTIMA Cages',
        'SpineJack Vertebral Augmentation'
      ]
    },
    'Zimmer Biomet': {
      products: [
        'Virage OCT Spinal Fixation System',
        'Polaris Spinal System',
        'Timberline Lateral Fusion System',
        'Mobi-C Cervical Disc'
      ]
    },
    'NuVasive': {
      products: [
        'Reline Spinal Fixation',
        'XLIF (Extreme Lateral Interbody Fusion)',
        'CoRoent XL PEEK Cages',
        'Precice Limb Lengthening System'
      ]
    },
    'Globus Medical': {
      products: [
        'REVERE Stabilization System',
        'CALIBER Spinal System',
        'COALITION Interbody Devices',
        'ExcelsiusGPS Robotic Navigation'
      ]
    },
    'Alphatec Spine': {
      products: [
        'Battalion Universal Spinal Fixation',
        'Novel Lateral Interbody System'
      ]
    }
  },

  'Shoulder & Upper Limb': {
    'Zimmer Biomet': {
      products: [
        'Comprehensive Shoulder System',
        'Comprehensive Reverse Shoulder',
        'Trabecular Metal Reverse Shoulder'
      ]
    },
    'DePuy Synthes': {
      products: [
        'Global Advantage Shoulder System',
        'Global Icon Shoulder System',
        'Anchor Peg Glenoid'
      ]
    },
    'Stryker': {
      products: [
        'ReUnion Shoulder System',
        'Univers Revers Shoulder System'
      ]
    },
    'Arthrex': {
      products: [
        'Univers Revers Shoulder System'
      ]
    },
    'Tornier (Wright Medical)': {
      products: [
        'Aequalis Shoulder System',
        'Aequalis Reversed Shoulder'
      ]
    }
  },

  'Foot & Ankle': {
    'Stryker': {
      products: [
        'Star Ankle Replacement',
        'Foot & Ankle Plating Systems'
      ]
    },
    'Zimmer Biomet': {
      products: [
        'Trabecular Metal Total Ankle',
        'Comprehensive Foot & Ankle Solutions'
      ]
    },
    'Wright Medical': {
      products: [
        'INBONE Total Ankle System',
        'PROPHECY Total Ankle',
        'Bunion Correction Systems'
      ]
    },
    'Integra': {
      products: [
        'Cadence Total Ankle System',
        'ReviOS Revision Ankle System'
      ]
    }
  },

  'Arthroscopy Equipment': {
    'Stryker': {
      products: [
        '1688 4K Imaging System',
        'Arthroscopy Pump',
        'Formula Handpiece System',
        'Core Shaver System'
      ]
    },
    'Smith & Nephew': {
      products: [
        'Dyonics Power Systems',
        '4K Imaging System',
        'Fast-Fix 360 Meniscal Repair',
        'WEREWOLF Suture Passer'
      ]
    },
    'Arthrex': {
      products: [
        'Synergy 4K Imaging',
        'AR-8800 Fluid Management',
        'FiberTak Soft Anchors',
        'SwiveLock Knotless Anchors',
        'InternalBrace Ligament Augmentation'
      ]
    },
    'ConMed Linvatec': {
      products: [
        'Hall Power Pro Max Shaver',
        'Flowing Water 4K Pump'
      ]
    }
  },

  'Bone Cement & Preparation': {
    'Stryker': {
      products: [
        'Simplex Bone Cement',
        'SmartMix Cement Mixing System',
        'Palacos Bone Cement with Gentamicin'
      ]
    },
    'DePuy Synthes': {
      products: [
        'SmartSet Bone Cement',
        'Palacos Bone Cement',
        'SmartMix Mixing System'
      ]
    },
    'Zimmer Biomet': {
      products: [
        'Palacos Bone Cement',
        'Optivac Cement Mixing System'
      ]
    },
    'Heraeus Medical': {
      products: [
        'Palacos Bone Cement Range',
        'Palamed Mixing System',
        'Copal G+C (Gentamicin + Clindamycin)'
      ]
    }
  },

  'Power Tools': {
    'Stryker': {
      products: [
        'System 8 Power Tool System',
        'Core Powered Instrument Driver',
        'Saws (Sagittal, Reciprocating, Oscillating)',
        'Drills and Reamers'
      ]
    },
    'DePuy Synthes': {
      products: [
        'System III Power Tool',
        'Colibri II Reamer',
        'Battery Powered Systems'
      ]
    },
    'Medtronic': {
      products: [
        'Powered Surgical Instruments',
        'IPC (Integrated Power Console)'
      ]
    },
    'ConMed': {
      products: [
        'Hall MPro MAX Power System',
        'Hall Versipower Plus'
      ]
    }
  }
};

// ============================================================================
// GENERAL SURGERY EQUIPMENT
// ============================================================================

export const GENERAL_SURGERY_EQUIPMENT = {
  'Energy Devices': {
    'Ethicon (Johnson & Johnson)': {
      products: [
        'Harmonic HD 1000i Ultrasonic Shears',
        'Harmonic Focus+ Curved Shears',
        'Harmonic Ace+7 Shears',
        'Enseal G2 Tissue Sealer'
      ]
    },
    'Medtronic': {
      products: [
        'LigaSure Impact Vessel Sealing System',
        'LigaSure Exact Dissector',
        'LigaSure Maryland Jaw',
        'LigaSure Blunt Tip'
      ]
    },
    'Olympus': {
      products: [
        'Thunderbeat Energy Device (Ultrasonic + Bipolar)',
        'Sonicbeat Energy Device'
      ]
    }
  },

  'Staplers': {
    'Ethicon': {
      products: [
        'Echelon Flex Powered Linear Cutter (45mm, 60mm)',
        'Echelon Flex GST Reloads (Gold, Blue, Green, White)',
        'CDH Circular Stapler (21mm, 25mm, 29mm, 33mm)',
        'Proximate Linear Cutters'
      ]
    },
    'Medtronic': {
      products: [
        'Endo GIA Universal Stapler',
        'Endo GIA Reloads (Tan, Gold, Blue, Green, Black)',
        'EEA Circular Stapler (21-33mm)',
        'TA Staplers (30mm, 60mm, 90mm)'
      ]
    },
    'Intuitive Surgical': {
      products: [
        'SureForm Staplers (for Da Vinci)'
      ]
    }
  },

  'Laparoscopic Towers & Cameras': {
    'Stryker': {
      products: [
        '1688 4K Platform',
        'L11 LED Light Source',
        'Pneumosure XL Insufflator',
        'Laparoscopes (0°, 30°, 45°)'
      ]
    },
    'Olympus': {
      products: [
        'Visera Elite II 4K System',
        'Visera 4K UHD',
        'CLV-S190 Light Source',
        'UHI-4 Insufflator'
      ]
    },
    'Karl Storz': {
      products: [
        'IMAGE1 S 4K System',
        'TC 304 Insufflator',
        'Hopkins II Telescopes'
      ]
    }
  },

  'Surgical Meshes (Hernia)': {
    'Ethicon': {
      products: [
        'Physiomesh Flexible Composite Mesh',
        'Proceed Ventral Patch',
        'Ultrapro Hernia System',
        'Prolene Mesh'
      ]
    },
    'Medtronic': {
      products: [
        'Parietex Composite Mesh',
        'Parietex ProGrip Self-Fixating Mesh',
        'Symbotex Composite Mesh'
      ]
    },
    'Bard (BD)': {
      products: [
        'Ventralex Hernia Patch',
        '3DMax Mesh',
        'Sepramesh IP Composite'
      ]
    },
    'Gore': {
      products: [
        'Gore Bio-A Tissue Reinforcement',
        'Gore Dualmesh Plus'
      ]
    }
  },

  'Trocars & Access': {
    'Ethicon': {
      products: [
        'Endopath Xcel Bladeless Trocars (5mm, 12mm, 15mm)',
        'Kii Optical Access System'
      ]
    },
    'Medtronic': {
      products: [
        'VersaOne Bladeless Trocars',
        'Versaport RT Trocars',
        'OpticalCal Trocars'
      ]
    },
    'Applied Medical': {
      products: [
        'Kii Balloon Blunt Tip System',
        'Step Trocars'
      ]
    }
  }
};

// ============================================================================
// COMPREHENSIVE PROCEDURE LISTS BY SPECIALTY WITH OPCS-4 CODES
// Staff will rate their EXPERIENCE with each procedure (0-5)
// ============================================================================

export interface Procedure {
  name: string;
  opcs4: string[]; // Can have multiple codes
  commonVariations?: string[]; // Alternative names
}

export const SURGICAL_PROCEDURES_BY_SPECIALTY = {
  'Trauma Orthopaedics': {
    subcategories: {
      'Hip Trauma': {
        procedures: [
          { name: 'Dynamic Hip Screw (DHS)', opcs4: ['W241'], commonVariations: ['DHS', 'Sliding Hip Screw'] },
          { name: 'Cannulated Hip Screws', opcs4: ['W241', 'W248'] },
          { name: 'Cephalomedullary Nailing (Gamma Nail/PFNA)', opcs4: ['W244'], commonVariations: ['Gamma Nail', 'PFNA', 'Trochanteric Nail'] },
          { name: 'Hemiarthroplasty (Uncemented)', opcs4: ['W371'], commonVariations: ['Austin Moore', 'Thompson Hemiarthroplasty'] },
          { name: 'Hemiarthroplasty (Cemented)', opcs4: ['W381'] },
          { name: 'Total Hip Replacement for Fracture', opcs4: ['W371', 'W381', 'W391', 'W931'] },
          { name: 'Girdlestone Excision Arthroplasty', opcs4: ['W351'] }
        ]
      },
      'Elective Hip': {
        procedures: [
          { name: 'Total Hip Replacement - Cemented', opcs4: ['W381', 'W931'] },
          { name: 'Total Hip Replacement - Uncemented (Press Fit)', opcs4: ['W371', 'W931'] },
          { name: 'Total Hip Replacement - Hybrid', opcs4: ['W391', 'W931'] },
          { name: 'Hip Revision (Single Component - Acetabular)', opcs4: ['W382', 'W372', 'W392'] },
          { name: 'Hip Revision (Single Component - Femoral)', opcs4: ['W383', 'W373', 'W393'] },
          { name: 'Hip Revision (Both Components)', opcs4: ['W384', 'W374', 'W394', 'W934'] },
          { name: 'Complex Hip Revision with Bone Grafting', opcs4: ['W384', 'W374', 'W213'] },
          { name: 'Hip Resurfacing', opcs4: ['W371', 'W931'] },
          { name: 'Hip Arthroscopy', opcs4: ['W822', 'Y762'] },
          { name: 'Femoral Osteotomy', opcs4: ['W273'] },
          { name: 'Pelvic Osteotomy (PAO)', opcs4: ['V363', 'V373'] }
        ]
      },
      'Knee Trauma': {
        procedures: [
          { name: 'Tibial Plateau Fracture ORIF', opcs4: ['W192'] },
          { name: 'Patella Fracture ORIF (Tension Band)', opcs4: ['W191'] },
          { name: 'Distal Femur Fracture ORIF', opcs4: ['W193'] },
          { name: 'Tibial Shaft IM Nailing', opcs4: ['W194'] }
        ]
      },
      'Elective Knee': {
        procedures: [
          { name: 'Total Knee Replacement (Cemented)', opcs4: ['W401', 'W411', 'W421'] },
          { name: 'Total Knee Replacement (Cementless)', opcs4: ['W402', 'W412', 'W422'] },
          { name: 'Unicompartmental Knee Replacement (Medial)', opcs4: ['W401', 'O181'] },
          { name: 'Unicompartmental Knee Replacement (Lateral)', opcs4: ['W401', 'O181'] },
          { name: 'Patellofemoral Replacement', opcs4: ['W401'] },
          { name: 'Knee Revision (Single Component)', opcs4: ['W403', 'W413', 'W423'] },
          { name: 'Knee Revision (Both Components)', opcs4: ['W404', 'W414', 'W424'] },
          { name: 'Complex Knee Revision with Augments/Stems', opcs4: ['W404', 'W414', 'W424'] },
          { name: 'Knee Arthroscopy - Diagnostic', opcs4: ['W821', 'Y753'] },
          { name: 'Knee Arthroscopy - Meniscectomy (Partial)', opcs4: ['W821', 'W851', 'O162'] },
          { name: 'Knee Arthroscopy - Meniscectomy (Total)', opcs4: ['W821', 'W851', 'O163'] },
          { name: 'Knee Arthroscopy - Meniscal Repair', opcs4: ['W821', 'W801', 'O161'] },
          { name: 'ACL Reconstruction (Hamstring)', opcs4: ['W821', 'W801', 'O171'] },
          { name: 'ACL Reconstruction (Bone-Patellar Tendon-Bone)', opcs4: ['W821', 'W801', 'O171'] },
          { name: 'PCL Reconstruction', opcs4: ['W821', 'W801', 'O172'] },
          { name: 'Multi-Ligament Knee Reconstruction', opcs4: ['W821', 'W801', 'O178'] },
          { name: 'High Tibial Osteotomy (HTO)', opcs4: ['W273'] },
          { name: 'Distal Femoral Osteotomy (DFO)', opcs4: ['W274'] }
        ]
      },
      'Shoulder': {
        procedures: [
          { name: 'Total Shoulder Replacement (Anatomic)', opcs4: ['W461', 'W471', 'W481'] },
          { name: 'Reverse Total Shoulder Replacement', opcs4: ['W461', 'W471', 'W481'] },
          { name: 'Shoulder Hemiarthroplasty', opcs4: ['W461', 'W471', 'W481'] },
          { name: 'Shoulder Arthroscopy - Diagnostic', opcs4: ['W825', 'Y762'] },
          { name: 'Shoulder Arthroscopy - Subacromial Decompression', opcs4: ['W825', 'W854', 'O205'] },
          { name: 'Shoulder Arthroscopy - Rotator Cuff Repair (Single Tendon)', opcs4: ['W825', 'W805', 'T523'] },
          { name: 'Shoulder Arthroscopy - Rotator Cuff Repair (Massive Tear)', opcs4: ['W825', 'W805', 'T528'] },
          { name: 'Shoulder Arthroscopy - Bankart Repair (Anterior Instability)', opcs4: ['W825', 'W805', 'O211'] },
          { name: 'Shoulder Arthroscopy - SLAP Repair', opcs4: ['W825', 'W805', 'O218'] },
          { name: 'Shoulder Arthroscopy - AC Joint Excision', opcs4: ['W825', 'W854', 'O203'] },
          { name: 'Shoulder Arthroscopy - Biceps Tenodesis', opcs4: ['W825', 'T523'] },
          { name: 'Shoulder Arthroscopy - Biceps Tenotomy', opcs4: ['W825', 'T523'] },
          { name: 'Open Rotator Cuff Repair', opcs4: ['T523', 'W805', 'O208'] },
          { name: 'Latarjet Procedure (Coracoid Transfer)', opcs4: ['W212', 'O211'] },
          { name: 'Proximal Humeral Fracture ORIF', opcs4: ['W271'] },
          { name: 'Humeral Shaft IM Nailing', opcs4: ['W272'] }
        ]
      },
      'Elbow': {
        procedures: [
          { name: 'Elbow Arthroscopy', opcs4: ['W826', 'Y762'] },
          { name: 'Tennis Elbow Release (Open)', opcs4: ['T623'] },
          { name: 'Tennis Elbow Release (Arthroscopic)', opcs4: ['W826', 'T623'] },
          { name: 'Ulnar Nerve Decompression/Transposition', opcs4: ['A651', 'A652'] },
          { name: 'Total Elbow Replacement', opcs4: ['W511', 'W521', 'W531'] },
          { name: 'Radial Head Replacement', opcs4: ['W511'] },
          { name: 'Olecranon Fracture ORIF (Tension Band)', opcs4: ['W281'] },
          { name: 'Distal Humerus Fracture ORIF', opcs4: ['W282'] }
        ]
      },
      'Hand & Wrist': {
        procedures: [
          { name: 'Carpal Tunnel Release (Open)', opcs4: ['A651'] },
          { name: 'Carpal Tunnel Release (Endoscopic)', opcs4: ['A652'] },
          { name: 'Trigger Finger Release', opcs4: ['T661'] },
          { name: 'De Quervain\'s Release', opcs4: ['T668'] },
          { name: 'Dupuytren\'s Fasciectomy', opcs4: ['T542', 'T543'] },
          { name: 'Dupuytren\'s Needle Aponeurotomy', opcs4: ['T541'] },
          { name: 'Ganglion Excision', opcs4: ['T572', 'T573'] },
          { name: 'Trapeziectomy (CMC Joint Arthritis)', opcs4: ['W591', 'W592'] },
          { name: 'Trapeziectomy with Ligament Reconstruction', opcs4: ['W591', 'W592', 'W805'] },
          { name: 'Wrist Arthroscopy', opcs4: ['W827', 'Y762'] },
          { name: 'Wrist Arthrodesis (Fusion)', opcs4: ['W584', 'W585'] },
          { name: 'Scaphoid Fracture ORIF', opcs4: ['W293'] },
          { name: 'Distal Radius Fracture ORIF (Volar Plating)', opcs4: ['W293'] },
          { name: 'Distal Radius Fracture ORIF (K-wires)', opcs4: ['W294'] },
          { name: 'Hand Tendon Repair (Flexor)', opcs4: ['T523', 'T528'] },
          { name: 'Hand Tendon Repair (Extensor)', opcs4: ['T523', 'T528'] },
          { name: 'Nerve Repair (Digital Nerves)', opcs4: ['A481', 'A482'] },
          { name: 'First Web Space Release', opcs4: ['T543'] }
        ]
      },
      'Foot & Ankle': {
        procedures: [
          { name: 'Ankle Fracture ORIF (Lateral Malleolus)', opcs4: ['W321'] },
          { name: 'Ankle Fracture ORIF (Bimalleolar)', opcs4: ['W322'] },
          { name: 'Ankle Fracture ORIF (Trimalleolar)', opcs4: ['W323'] },
          { name: 'Syndesmotic Screw Insertion', opcs4: ['W324'] },
          { name: 'Ankle Arthroscopy', opcs4: ['W822', 'Y762'] },
          { name: 'Total Ankle Replacement', opcs4: ['W611', 'W621', 'W631'] },
          { name: 'Ankle Arthrodesis (Fusion)', opcs4: ['W631'] },
          { name: 'Subtalar Fusion', opcs4: ['W641'] },
          { name: 'Triple Arthrodesis', opcs4: ['W641', 'W642', 'W643'] },
          { name: 'Bunion Correction - Scarf Osteotomy', opcs4: ['W651'] },
          { name: 'Bunion Correction - Chevron Osteotomy', opcs4: ['W651'] },
          { name: 'Bunion Correction - Lapidus Procedure', opcs4: ['W652'] },
          { name: 'Hallux Rigidus - Cheilectomy', opcs4: ['W671'] },
          { name: 'Hallux Rigidus - MTP Fusion', opcs4: ['W672'] },
          { name: 'Hammer Toe Correction', opcs4: ['W681'] },
          { name: 'Morton\'s Neuroma Excision', opcs4: ['A661'] },
          { name: 'Plantar Fascia Release', opcs4: ['T691'] },
          { name: 'Achilles Tendon Repair (Open)', opcs4: ['T703'] },
          { name: 'Achilles Tendon Repair (Percutaneous)', opcs4: ['T704'] },
          { name: 'Calcaneal Fracture ORIF', opcs4: ['W341'] }
        ]
      },
      'Spinal': {
        procedures: [
          { name: 'Lumbar Microdiscectomy', opcs4: ['V254', 'V334'] },
          { name: 'Lumbar Decompression (Laminectomy)', opcs4: ['V334', 'V335'] },
          { name: 'Lumbar Fusion PLIF (Posterior Lumbar Interbody Fusion)', opcs4: ['V383', 'V384'] },
          { name: 'Lumbar Fusion TLIF (Transforaminal Lumbar Interbody Fusion)', opcs4: ['V383', 'V384'] },
          { name: 'Lumbar Fusion ALIF (Anterior Lumbar Interbody Fusion)', opcs4: ['V363', 'V364'] },
          { name: 'Lumbar Fusion Posterolateral', opcs4: ['V383'] },
          { name: 'Cervical Discectomy and Fusion (ACDF)', opcs4: ['V313', 'V314'] },
          { name: 'Cervical Laminectomy', opcs4: ['V314'] },
          { name: 'Cervical Posterior Fusion', opcs4: ['V323'] },
          { name: 'Thoracic Discectomy', opcs4: ['V244'] },
          { name: 'Thoracolumbar Fusion', opcs4: ['V343', 'V353'] },
          { name: 'Spinal Deformity Correction (Scoliosis)', opcs4: ['V373', 'V383', 'V393'] },
          { name: 'Kyphoplasty', opcs4: ['V423', 'V424'] },
          { name: 'Vertebroplasty', opcs4: ['V413', 'V414'] },
          { name: 'Spinal Tumor Resection', opcs4: ['V201', 'V202', 'V203'] },
          { name: 'Spinal Cord Decompression', opcs4: ['V334', 'V344', 'V354'] }
        ]
      },
      'Paediatric Orthopaedics': {
        procedures: [
          { name: 'Supracondylar Fracture K-wiring', opcs4: ['W194'] },
          { name: 'Forearm Fracture ORIF', opcs4: ['W292'] },
          { name: 'Femoral Fracture Flexible Nailing (ESIN)', opcs4: ['W231'] },
          { name: 'Club Foot Correction (Ponseti Casting)', opcs4: ['W701'] },
          { name: 'Club Foot Surgery (Soft Tissue Release)', opcs4: ['W702'] },
          { name: 'DDH (Developmental Dysplasia of Hip) - Closed Reduction', opcs4: ['W711'] },
          { name: 'DDH - Open Reduction', opcs4: ['W712'] },
          { name: 'Perthes Disease - Varus Osteotomy', opcs4: ['W273'] },
          { name: 'Slipped Capital Femoral Epiphysis (SCFE) Pinning', opcs4: ['W241'] },
          { name: 'Scoliosis Correction (Growing Rods)', opcs4: ['V383', 'V393'] },
          { name: 'Scoliosis Correction (Spinal Fusion)', opcs4: ['V383', 'V393'] },
          { name: 'Limb Lengthening (External Fixator)', opcs4: ['W232', 'W281'] },
          { name: 'Epiphysiodesis (Growth Arrest)', opcs4: ['W721'] }
        ]
      }
    }
  },

  'General Surgery': {
    subcategories: {
      'Upper GI': {
        procedures: [
          { name: 'Laparoscopic Cholecystectomy', opcs4: ['J183'] },
          { name: 'Open Cholecystectomy', opcs4: ['J181'] },
          { name: 'Laparoscopic Fundoplication (Nissen)', opcs4: ['G223'] },
          { name: 'Laparoscopic Fundoplication (Toupet)', opcs4: ['G223'] },
          { name: 'Open Fundoplication', opcs4: ['G221'] },
          { name: 'Laparoscopic Heller\'s Myotomy', opcs4: ['G133'] },
          { name: 'Gastrostomy (PEG) Insertion', opcs4: ['G341'] },
          { name: 'Laparoscopic Gastric Bypass (Roux-en-Y)', opcs4: ['G283'] },
          { name: 'Laparoscopic Sleeve Gastrectomy', opcs4: ['G283'] },
          { name: 'Laparoscopic Adjustable Gastric Banding', opcs4: ['G283'] },
          { name: 'Total Gastrectomy', opcs4: ['G271', 'G272'] },
          { name: 'Partial Gastrectomy', opcs4: ['G281', 'G282'] },
          { name: 'Oesophagectomy (Ivor Lewis)', opcs4: ['G011', 'G012'] },
          { name: 'Oesophagectomy (McKeown - 3 stage)', opcs4: ['G011', 'G012', 'G013'] },
          { name: 'Whipple\'s Procedure (Pancreaticoduodenectomy)', opcs4: ['J651', 'G291'] },
          { name: 'Distal Pancreatectomy', opcs4: ['J621', 'J622'] },
          { name: 'Liver Resection (Hepatectomy)', opcs4: ['J021', 'J022', 'J023', 'J024'] },
          { name: 'Splenectomy (Open)', opcs4: ['T911'] },
          { name: 'Splenectomy (Laparoscopic)', opcs4: ['T913'] }
        ]
      },
      'Colorectal': {
        procedures: [
          { name: 'Appendicectomy (Open)', opcs4: ['H011'] },
          { name: 'Appendicectomy (Laparoscopic)', opcs4: ['H013'] },
          { name: 'Right Hemicolectomy (Open)', opcs4: ['H061'] },
          { name: 'Right Hemicolectomy (Laparoscopic)', opcs4: ['H063'] },
          { name: 'Left Hemicolectomy (Open)', opcs4: ['H071'] },
          { name: 'Left Hemicolectomy (Laparoscopic)', opcs4: ['H073'] },
          { name: 'Anterior Resection (Open)', opcs4: ['H331'] },
          { name: 'Anterior Resection (Laparoscopic)', opcs4: ['H333'] },
          { name: 'Abdominoperineal Resection (APR)', opcs4: ['H081'] },
          { name: 'Total Colectomy', opcs4: ['H041'] },
          { name: 'Panproctocolectomy', opcs4: ['H041', 'H081'] },
          { name: 'Hartmann\'s Procedure', opcs4: ['H331'] },
          { name: 'Hartmann\'s Reversal', opcs4: ['H101'] },
          { name: 'Ileoanal Pouch (J-Pouch)', opcs4: ['H041', 'H342'] },
          { name: 'End Colostomy Formation', opcs4: ['H111'] },
          { name: 'Loop Colostomy Formation', opcs4: ['H111'] },
          { name: 'End Ileostomy Formation', opcs4: ['H101'] },
          { name: 'Loop Ileostomy Formation', opcs4: ['H101'] },
          { name: 'Stoma Reversal', opcs4: ['H121', 'H122'] },
          { name: 'Colonoscopy', opcs4: ['H221', 'H222'] },
          { name: 'Flexible Sigmoidoscopy', opcs4: ['H231', 'H232'] },
          { name: 'Rigid Sigmoidoscopy', opcs4: ['H231'] },
          { name: 'Haemorrhoidectomy (Open)', opcs4: ['H511'] },
          { name: 'Haemorrhoidectomy (Stapled - PPH)', opcs4: ['H512'] },
          { name: 'Haemorrhoidal Artery Ligation (HAL/THD)', opcs4: ['H513'] },
          { name: 'Fistula-in-Ano - Fistulotomy', opcs4: ['H521'] },
          { name: 'Fistula-in-Ano - Seton Insertion', opcs4: ['H522'] },
          { name: 'Fistula-in-Ano - LIFT Procedure', opcs4: ['H523'] },
          { name: 'Anal Fissure - Lateral Sphincterotomy', opcs4: ['H511'] },
          { name: 'Examination Under Anaesthetic (EUA) - Anus', opcs4: ['H481'] },
          { name: 'Pilonidal Sinus Excision', opcs4: ['S571'] },
          { name: 'Rectal Prolapse Repair (Perineal)', opcs4: ['H571'] },
          { name: 'Rectal Prolapse Repair (Abdominal - Rectopexy)', opcs4: ['H581', 'H582', 'H583'] }
        ]
      },
      'Hernias': {
        procedures: [
          { name: 'Inguinal Hernia Repair - Open (Lichtenstein)', opcs4: ['T201'] },
          { name: 'Inguinal Hernia Repair - Laparoscopic TEP', opcs4: ['T203'] },
          { name: 'Inguinal Hernia Repair - Laparoscopic TAPP', opcs4: ['T203'] },
          { name: 'Femoral Hernia Repair (Open)', opcs4: ['T211'] },
          { name: 'Femoral Hernia Repair (Laparoscopic)', opcs4: ['T213'] },
          { name: 'Umbilical Hernia Repair (Open)', opcs4: ['T271'] },
          { name: 'Umbilical Hernia Repair (Laparoscopic)', opcs4: ['T273'] },
          { name: 'Paraumbilical Hernia Repair', opcs4: ['T271'] },
          { name: 'Epigastric Hernia Repair', opcs4: ['T281'] },
          { name: 'Incisional Hernia Repair (Open with Mesh)', opcs4: ['T291'] },
          { name: 'Incisional Hernia Repair (Laparoscopic)', opcs4: ['T293'] },
          { name: 'Spigelian Hernia Repair', opcs4: ['T298'] },
          { name: 'Obturator Hernia Repair', opcs4: ['T298'] }
        ]
      },
      'Breast': {
        procedures: [
          { name: 'Wide Local Excision (WLE)', opcs4: ['B281'] },
          { name: 'Wide Local Excision + Oncoplastic Reconstruction', opcs4: ['B281', 'B282'] },
          { name: 'Sentinel Lymph Node Biopsy (SLNB)', opcs4: ['T853'] },
          { name: 'Axillary Node Clearance (ANC)', opcs4: ['T851', 'T852'] },
          { name: 'Simple Mastectomy', opcs4: ['B271'] },
          { name: 'Skin-Sparing Mastectomy', opcs4: ['B272'] },
          { name: 'Nipple-Sparing Mastectomy', opcs4: ['B273'] },
          { name: 'Mastectomy with Immediate Reconstruction (Implant)', opcs4: ['B271', 'B291'] },
          { name: 'Mastectomy with Immediate Reconstruction (LD Flap)', opcs4: ['B271', 'B301'] },
          { name: 'Mastectomy with Immediate Reconstruction (DIEP Flap)', opcs4: ['B271', 'B302'] },
          { name: 'Delayed Breast Reconstruction', opcs4: ['B291', 'B301', 'B302'] },
          { name: 'Breast Reduction (Reduction Mammoplasty)', opcs4: ['B321'] },
          { name: 'Breast Abscess Incision & Drainage', opcs4: ['B241'] },
          { name: 'Excision of Benign Breast Lump', opcs4: ['B281'] },
          { name: 'Gynaecomastia Excision', opcs4: ['B331'] },
          { name: 'Microdochectomy', opcs4: ['B351'] },
          { name: 'Hadfield\'s Procedure (Central Duct Excision)', opcs4: ['B352'] }
        ]
      },
      'Vascular Access': {
        procedures: [
          { name: 'Hickman Line Insertion', opcs4: ['E851'] },
          { name: 'PICC Line Insertion', opcs4: ['E851'] },
          { name: 'Portacath Insertion', opcs4: ['E851'] },
          { name: 'Portacath Removal', opcs4: ['E859'] },
          { name: 'Permcath Insertion', opcs4: ['E851'] },
          { name: 'Tunnelled Dialysis Catheter Insertion', opcs4: ['E851'] },
          { name: 'AV Fistula Formation (Radiocephalic)', opcs4: ['L741'] },
          { name: 'AV Fistula Formation (Brachiocephalic)', opcs4: ['L741'] },
          { name: 'AV Fistula Formation (Brachiobasilic Transposition)', opcs4: ['L742'] },
          { name: 'AV Graft Insertion', opcs4: ['L751'] }
        ]
      }
    }
  },

  'Vascular Surgery': {
    subcategories: {
      'Arterial': {
        procedures: [
          { name: 'Carotid Endarterectomy', opcs4: ['L291'] },
          { name: 'Abdominal Aortic Aneurysm Repair (Open)', opcs4: ['L181', 'L191'] },
          { name: 'Endovascular Aortic Aneurysm Repair (EVAR)', opcs4: ['L183', 'L193'] },
          { name: 'Thoracic Endovascular Aortic Repair (TEVAR)', opcs4: ['L173'] },
          { name: 'Femoral-Popliteal Bypass', opcs4: ['L511', 'L512', 'L513'] },
          { name: 'Femoral-Distal Bypass', opcs4: ['L521', 'L522'] },
          { name: 'Aorto-Bifemoral Bypass', opcs4: ['L211'] },
          { name: 'Axillo-Bifemoral Bypass', opcs4: ['L241'] },
          { name: 'Embolectomy (Femoral)', opcs4: ['L481'] },
          { name: 'Thrombectomy', opcs4: ['L481'] },
          { name: 'Profundaplasty', opcs4: ['L491'] },
          { name: 'Femoral Endarterectomy', opcs4: ['L491'] },
          { name: 'Angioplasty and Stenting', opcs4: ['L503', 'L513', 'L523'] },
          { name: 'Amputation - Above Knee (AKA)', opcs4: ['X091'] },
          { name: 'Amputation - Below Knee (BKA)', opcs4: ['X101'] },
          { name: 'Amputation - Toe', opcs4: ['X141'] },
          { name: 'Fasciotomy (Compartment Syndrome)', opcs4: ['T781'] }
        ]
      },
      'Venous': {
        procedures: [
          { name: 'Varicose Vein Surgery - High Tie and Stripping', opcs4: ['L841', 'L842', 'L851', 'L852'] },
          { name: 'Varicose Vein Surgery - Phlebectomies', opcs4: ['L862'] },
          { name: 'Endovenous Laser Therapy (EVLT)', opcs4: ['L853'] },
          { name: 'Radiofrequency Ablation (RFA)', opcs4: ['L853'] },
          { name: 'Sclerotherapy', opcs4: ['L883'] },
          { name: 'Perforator Vein Ligation', opcs4: ['L861'] },
          { name: 'Venous Ulcer Debridement', opcs4: ['S603'] }
        ]
      }
    }
  },

  'Urology': {
    subcategories: {
      'Endourology': {
        procedures: [
          { name: 'TURP (Transurethral Resection of Prostate)', opcs4: ['M651', 'M652'] },
          { name: 'TURBT (Transurethral Resection of Bladder Tumour)', opcs4: ['M421', 'M422', 'M423'] },
          { name: 'Holmium Laser Enucleation of Prostate (HoLEP)', opcs4: ['M653'] },
          { name: 'GreenLight Laser Prostatectomy (PVP)', opcs4: ['M653'] },
          { name: 'Cystoscopy (Flexible)', opcs4: ['M451'] },
          { name: 'Cystoscopy (Rigid)', opcs4: ['M451'] },
          { name: 'Ureteroscopy (Rigid)', opcs4: ['M281'] },
          { name: 'Ureteroscopy (Flexible)', opcs4: ['M281'] },
          { name: 'Laser Lithotripsy', opcs4: ['M153'] },
          { name: 'PCNL (Percutaneous Nephrolithotomy)', opcs4: ['M143'] },
          { name: 'JJ Stent Insertion', opcs4: ['M281'] },
          { name: 'JJ Stent Removal', opcs4: ['M281'] },
          { name: 'Nephrostomy Insertion', opcs4: ['M113'] },
          { name: 'Urethral Dilatation', opcs4: ['M781'] },
          { name: 'Optical Urethrotomy', opcs4: ['M782'] },
          { name: 'Bladder Neck Incision (BNI)', opcs4: ['M782'] }
        ]
      },
      'Open/Laparoscopic': {
        procedures: [
          { name: 'Radical Prostatectomy (Open)', opcs4: ['M611', 'M612'] },
          { name: 'Radical Prostatectomy (Laparoscopic)', opcs4: ['M613'] },
          { name: 'Radical Prostatectomy (Robotic)', opcs4: ['M614'] },
          { name: 'Simple Prostatectomy (Open)', opcs4: ['M621', 'M622'] },
          { name: 'Radical Nephrectomy (Open)', opcs4: ['M021', 'M022'] },
          { name: 'Radical Nephrectomy (Laparoscopic)', opcs4: ['M023'] },
          { name: 'Partial Nephrectomy (Open)', opcs4: ['M031'] },
          { name: 'Partial Nephrectomy (Laparoscopic/Robotic)', opcs4: ['M033'] },
          { name: 'Nephroureterectomy', opcs4: ['M061'] },
          { name: 'Radical Cystectomy with Ileal Conduit', opcs4: ['M341', 'M342'] },
          { name: 'Radical Cystectomy with Neobladder', opcs4: ['M341', 'M372'] },
          { name: 'Pyeloplasty (Anderson-Hynes)', opcs4: ['M191', 'M193'] },
          { name: 'Ureteric Reimplantation', opcs4: ['M301'] },
          { name: 'Orchidectomy (Simple)', opcs4: ['N211'] },
          { name: 'Orchidectomy (Radical - Inguinal)', opcs4: ['N212'] },
          { name: 'Orchidopexy (Undescended Testis)', opcs4: ['N251'] },
          { name: 'Hydrocele Repair', opcs4: ['N271'] },
          { name: 'Varicocele Repair', opcs4: ['N311'] },
          { name: 'Circumcision', opcs4: ['N301'] },
          { name: 'Vasectomy', opcs4: ['N171'] },
          { name: 'Vasovasostomy (Reversal)', opcs4: ['N181'] }
        ]
      },
      'Reconstruction': {
        procedures: [
          { name: 'Urethroplasty (Anastomotic)', opcs4: ['M711'] },
          { name: 'Urethroplasty (Buccal Mucosa Graft)', opcs4: ['M711'] },
          { name: 'Bladder Augmentation', opcs4: ['M361'] },
          { name: 'Mitrofanoff Procedure', opcs4: ['M391'] },
          { name: 'Artificial Urinary Sphincter (AUS) Insertion', opcs4: ['M531'] }
        ]
      }
    }
  },

  'Cardiothoracic Surgery': {
    subcategories: {
      'Cardiac': {
        procedures: [
          { name: 'Coronary Artery Bypass Grafting (CABG)', opcs4: ['K401', 'K402', 'K403', 'K404', 'K408', 'K409'] },
          { name: 'Aortic Valve Replacement (AVR)', opcs4: ['K251', 'K252', 'K253'] },
          { name: 'Mitral Valve Replacement', opcs4: ['K261', 'K262', 'K263'] },
          { name: 'Mitral Valve Repair', opcs4: ['K271', 'K272', 'K278'] },
          { name: 'Aortic Root Replacement (Bentall)', opcs4: ['L181', 'L182', 'K251'] },
          { name: 'TAVR (Transcatheter Aortic Valve Replacement)', opcs4: ['K252'] },
          { name: 'Atrial Septal Defect (ASD) Closure', opcs4: ['K111', 'K112'] },
          { name: 'Ventricular Septal Defect (VSD) Closure', opcs4: ['K101', 'K102'] },
          { name: 'Pacemaker Insertion', opcs4: ['K591', 'K592', 'K593', 'K594'] },
          { name: 'ICD Insertion', opcs4: ['K601', 'K602', 'K603'] }
        ]
      },
      'Thoracic': {
        procedures: [
          { name: 'Lobectomy', opcs4: ['E541', 'E542', 'E543', 'E544'] },
          { name: 'Pneumonectomy', opcs4: ['E551'] },
          { name: 'Wedge Resection', opcs4: ['E521', 'E522'] },
          { name: 'VATS (Video-Assisted Thoracoscopic Surgery)', opcs4: ['E502', 'E522', 'E542'] },
          { name: 'Oesophagectomy (Ivor Lewis)', opcs4: ['G011', 'G012'] },
          { name: 'Oesophagectomy (McKeown)', opcs4: ['G011', 'G012'] },
          { name: 'Mediastinoscopy', opcs4: ['T091'] },
          { name: 'Thymectomy', opcs4: ['T131', 'T132'] },
          { name: 'Chest Drain Insertion', opcs4: ['E851', 'E852'] },
          { name: 'Pleurodesis', opcs4: ['E832'] }
        ]
      }
    }
  },

  'Neurosurgery': {
    subcategories: {
      'Cranial': {
        procedures: [
          { name: 'Craniotomy for Tumour', opcs4: ['A041', 'A042', 'A048'] },
          { name: 'Craniotomy for Aneurysm', opcs4: ['A041', 'L361'] },
          { name: 'Craniotomy for Haematoma', opcs4: ['A041', 'A091'] },
          { name: 'Cranioplasty', opcs4: ['V251', 'V252', 'V253'] },
          { name: 'Ventriculoperitoneal (VP) Shunt', opcs4: ['A391', 'A392'] },
          { name: 'External Ventricular Drain (EVD)', opcs4: ['A381'] },
          { name: 'Burr Holes', opcs4: ['A021', 'A022'] },
          { name: 'Transsphenoidal Hypophysectomy', opcs4: ['A031', 'A032'] },
          { name: 'Awake Craniotomy', opcs4: ['A041'] }
        ]
      },
      'Spinal': {
        procedures: [
          { name: 'Microdiscectomy (Lumbar)', opcs4: ['V381', 'V382'] },
          { name: 'Lumbar Laminectomy', opcs4: ['V401', 'V402'] },
          { name: 'Cervical Discectomy & Fusion (ACDF)', opcs4: ['V381', 'V382', 'V471'] },
          { name: 'Lumbar Fusion (PLIF/TLIF)', opcs4: ['V401', 'V402', 'V471', 'V472'] },
          { name: 'Spinal Tumour Resection', opcs4: ['V141', 'V142'] },
          { name: 'Spinal Cord Stimulator Insertion', opcs4: ['A741'] }
        ]
      }
    }
  },

  'Gynaecology': {
    subcategories: {
      'General': {
        procedures: [
          { name: 'Total Abdominal Hysterectomy (TAH)', opcs4: ['Q071', 'Q072', 'Q073'] },
          { name: 'Vaginal Hysterectomy', opcs4: ['Q074'] },
          { name: 'Laparoscopic Hysterectomy', opcs4: ['Q075', 'Q076'] },
          { name: 'Myomectomy', opcs4: ['Q101', 'Q102', 'Q103'] },
          { name: 'Oophorectomy (Unilateral)', opcs4: ['Q281', 'Q282'] },
          { name: 'Oophorectomy (Bilateral)', opcs4: ['Q283', 'Q284'] },
          { name: 'Salpingectomy', opcs4: ['Q221', 'Q222'] },
          { name: 'Ovarian Cystectomy', opcs4: ['Q271', 'Q272'] },
          { name: 'Hysteroscopy', opcs4: ['Q171', 'Q172'] },
          { name: 'Laparoscopy (Diagnostic)', opcs4: ['Q181', 'Q182'] },
          { name: 'Dilation & Curettage (D&C)', opcs4: ['Q101', 'Q102'] },
          { name: 'LLETZ Procedure', opcs4: ['Q082'] }
        ]
      },
      'Urogynaecology': {
        procedures: [
          { name: 'TVT (Tension-free Vaginal Tape)', opcs4: ['M531'] },
          { name: 'TOT (Transobturator Tape)', opcs4: ['M531'] },
          { name: 'Anterior Repair (Cystocoele)', opcs4: ['P221'] },
          { name: 'Posterior Repair (Rectocoele)', opcs4: ['P231'] },
          { name: 'Sacrocolpopexy', opcs4: ['P241'] },
          { name: 'Vaginal Vault Prolapse Repair', opcs4: ['P251'] }
        ]
      },
      'Obstetrics': {
        procedures: [
          { name: 'Caesarean Section (Elective)', opcs4: ['R171', 'R172'] },
          { name: 'Caesarean Section (Emergency)', opcs4: ['R173', 'R174'] },
          { name: 'Manual Removal of Placenta', opcs4: ['R211'] },
          { name: 'Repair of Perineal Tears (3rd/4th degree)', opcs4: ['R321', 'R322'] }
        ]
      }
    }
  },

  'ENT (Ear, Nose & Throat)': {
    subcategories: {
      'Otology': {
        procedures: [
          { name: 'Myringotomy & Grommets', opcs4: ['D151', 'D152'] },
          { name: 'Mastoidectomy', opcs4: ['D131', 'D132'] },
          { name: 'Tympanoplasty', opcs4: ['D141', 'D142', 'D148'] },
          { name: 'Stapedectomy', opcs4: ['D121'] },
          { name: 'Cochlear Implant', opcs4: ['D161'] },
          { name: 'Bone Anchored Hearing Aid (BAHA)', opcs4: ['D162'] }
        ]
      },
      'Rhinology': {
        procedures: [
          { name: 'Septoplasty', opcs4: ['E021'] },
          { name: 'Functional Endoscopic Sinus Surgery (FESS)', opcs4: ['E041', 'E042', 'E043', 'E048'] },
          { name: 'Rhinoplasty', opcs4: ['E011'] },
          { name: 'Nasal Polypectomy', opcs4: ['E051'] },
          { name: 'Turbinate Reduction', opcs4: ['E061'] }
        ]
      },
      'Laryngology': {
        procedures: [
          { name: 'Microlaryngoscopy', opcs4: ['E421', 'E422'] },
          { name: 'Vocal Cord Surgery', opcs4: ['E421', 'E441'] },
          { name: 'Laryngectomy (Total)', opcs4: ['E291'] },
          { name: 'Laryngectomy (Partial)', opcs4: ['E292', 'E293'] },
          { name: 'Tracheostomy', opcs4: ['E421', 'E422'] },
          { name: 'Emergency Cricothyroidotomy', opcs4: ['E431'] }
        ]
      },
      'Head & Neck': {
        procedures: [
          { name: 'Thyroidectomy (Total)', opcs4: ['B081'] },
          { name: 'Thyroidectomy (Partial)', opcs4: ['B082', 'B083'] },
          { name: 'Parathyroidectomy', opcs4: ['B091', 'B092'] },
          { name: 'Neck Dissection (Radical)', opcs4: ['E541'] },
          { name: 'Neck Dissection (Modified Radical)', opcs4: ['E542'] },
          { name: 'Neck Dissection (Selective)', opcs4: ['E543'] },
          { name: 'Parotidectomy (Superficial)', opcs4: ['F191'] },
          { name: 'Parotidectomy (Total)', opcs4: ['F192'] },
          { name: 'Submandibular Gland Excision', opcs4: ['F211'] },
          { name: 'Tonsillectomy', opcs4: ['F341', 'F342'] },
          { name: 'Adenoidectomy', opcs4: ['E201'] }
        ]
      }
    }
  },

  'Ophthalmology': {
    subcategories: {
      'Cataract': {
        procedures: [
          { name: 'Phacoemulsification with IOL', opcs4: ['C751', 'C752'] },
          { name: 'Manual Small Incision Cataract Surgery (MSICS)', opcs4: ['C711'] },
          { name: 'Complex Cataract Surgery', opcs4: ['C758'] }
        ]
      },
      'Vitreoretinal': {
        procedures: [
          { name: 'Vitrectomy (Pars Plana)', opcs4: ['C621', 'C622'] },
          { name: 'Retinal Detachment Repair', opcs4: ['C531', 'C532', 'C533'] },
          { name: 'Macular Hole Surgery', opcs4: ['C621'] },
          { name: 'Diabetic Retinopathy Surgery', opcs4: ['C621', 'C551'] },
          { name: 'Intravitreal Injections', opcs4: ['C651'] }
        ]
      },
      'Glaucoma': {
        procedures: [
          { name: 'Trabeculectomy', opcs4: ['C411', 'C412'] },
          { name: 'Tube Shunt Surgery', opcs4: ['C431'] },
          { name: 'iStent Implantation', opcs4: ['C432'] }
        ]
      },
      'Oculoplastics': {
        procedures: [
          { name: 'Ptosis Repair', opcs4: ['C121', 'C122'] },
          { name: 'Ectropion Repair', opcs4: ['C131'] },
          { name: 'Entropion Repair', opcs4: ['C141'] },
          { name: 'Dacryocystorhinostomy (DCR)', opcs4: ['C181', 'C182'] },
          { name: 'Enucleation', opcs4: ['C041'] },
          { name: 'Evisceration', opcs4: ['C042'] }
        ]
      }
    }
  },

  'Plastic & Reconstructive Surgery': {
    subcategories: {
      'Reconstructive': {
        procedures: [
          { name: 'Free Flap (DIEP)', opcs4: ['B271', 'B272'] },
          { name: 'Free Flap (ALT)', opcs4: ['B271', 'B272'] },
          { name: 'Free Flap (Radial Forearm)', opcs4: ['B271', 'B272'] },
          { name: 'Pedicled Flap', opcs4: ['S481', 'S482'] },
          { name: 'Split Skin Graft (SSG)', opcs4: ['S491'] },
          { name: 'Full Thickness Skin Graft (FTSG)', opcs4: ['S492'] },
          { name: 'Tissue Expansion', opcs4: ['S571'] },
          { name: 'Scar Revision', opcs4: ['S501'] },
          { name: 'Burn Surgery', opcs4: ['S491', 'S492', 'S493'] }
        ]
      },
      'Cosmetic': {
        procedures: [
          { name: 'Rhinoplasty', opcs4: ['E011'] },
          { name: 'Facelift', opcs4: ['S051'] },
          { name: 'Blepharoplasty', opcs4: ['C101', 'C102'] },
          { name: 'Otoplasty', opcs4: ['D021'] },
          { name: 'Breast Augmentation', opcs4: ['B291'] },
          { name: 'Breast Reduction', opcs4: ['B281', 'B282'] },
          { name: 'Abdominoplasty', opcs4: ['T281'] },
          { name: 'Liposuction', opcs4: ['S571'] }
        ]
      },
      'Hand': {
        procedures: [
          { name: 'Carpal Tunnel Release (Open)', opcs4: ['A651'] },
          { name: 'Carpal Tunnel Release (Endoscopic)', opcs4: ['A652'] },
          { name: 'Trigger Finger Release', opcs4: ['T661'] },
          { name: 'De Quervain\'s Release', opcs4: ['T668'] },
          { name: 'Dupuytren\'s Fasciectomy', opcs4: ['T542', 'T543'] },
          { name: 'Hand Tendon Repair', opcs4: ['T511', 'T521'] }
        ]
      }
    }
  },

  'Maxillofacial Surgery': {
    subcategories: {
      'Trauma': {
        procedures: [
          { name: 'Mandible Fracture Fixation', opcs4: ['V481', 'V482'] },
          { name: 'Maxillary Fracture Fixation (Le Fort I)', opcs4: ['V331'] },
          { name: 'Maxillary Fracture Fixation (Le Fort II)', opcs4: ['V332'] },
          { name: 'Maxillary Fracture Fixation (Le Fort III)', opcs4: ['V333'] },
          { name: 'Zygomatic Fracture Fixation', opcs4: ['V281', 'V282'] },
          { name: 'Orbital Floor Reconstruction', opcs4: ['V251', 'V252'] },
          { name: 'Nasal Bone Fracture Reduction', opcs4: ['E031'] }
        ]
      },
      'Orthognathic': {
        procedures: [
          { name: 'Le Fort I Osteotomy', opcs4: ['V331'] },
          { name: 'Bilateral Sagittal Split Osteotomy (BSSO)', opcs4: ['V481'] },
          { name: 'Genioplasty', opcs4: ['V501'] },
          { name: 'Distraction Osteogenesis', opcs4: ['V252'] }
        ]
      },
      'Oral': {
        procedures: [
          { name: 'Dental Extractions (Multiple)', opcs4: ['F091', 'F092', 'F098'] },
          { name: 'Dental Implants', opcs4: ['F141', 'F142'] },
          { name: 'Removal of Impacted Wisdom Teeth', opcs4: ['F101', 'F102'] },
          { name: 'Apicectomy', opcs4: ['F111'] }
        ]
      }
    }
  }
};

// ============================================================================
// STAFF COMPETENCY RECORDS
// ============================================================================

export interface StaffProcedureExperience {
  procedureName: string;
  opcs4Codes: string[];
  experienceLevel: 0 | 1 | 2 | 3 | 4 | 5; // 0=none, 1=awareness, 2=learning, 3=supervised, 4=independent, 5=expert
  lastPerformed?: Date; // Only tracked when level = 2 (learning)
  timesPerformed?: number; // Only tracked when level = 2 (learning)
  notes?: string;
  specialty: string;
  subcategory: string;
}

export interface StaffEquipmentExperience {
  equipmentName: string;
  manufacturer: string;
  productLine: string;
  category: string; // e.g., 'Hip Arthroplasty', 'Energy Devices'
  experienceLevel: 0 | 1 | 2 | 3; // 3-star system
  lastUsed?: Date; // Only tracked when level = 1 (learning)
  timesUsed?: number; // Only tracked when level = 1 (learning)
  notes?: string;
}

// ============================================================================
// CUSTOM ADDITIONS & MODIFICATIONS
// ============================================================================

export interface CustomProcedure {
  id: string;
  name: string;
  opcs4Codes?: string[]; // Only admins can add OPCS-4 codes
  addedBy: string;
  addedByRole: string;
  addedDate: Date;
  specialty: string;
  subcategory: string;
  approved: boolean;
  approvedBy?: string;
  approvedDate?: Date;
  usageCount: number;
}

export interface CustomEquipment {
  id: string;
  name: string;
  manufacturer?: string;
  productLine?: string;
  category: string;
  addedBy: string;
  addedByRole: string;
  addedDate: Date;
  approved: boolean;
  approvedBy?: string;
  approvedDate?: Date;
  usageCount: number;
}

export interface RemovalRequest {
  id: string;
  itemId: string;
  itemName: string;
  itemType: 'procedure' | 'equipment';
  requestedBy: string;
  requestedByRole: string;
  requestDate: Date;
  reason: string;
  detailedReason?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewDate?: Date;
  reviewNotes?: string;
}

// ============================================================================
// EPR INTEGRATION
// ============================================================================

export interface ScrubEpisode {
  id: string;
  staffId: string;
  date: Date;
  procedureName: string;
  opcs4Code: string;
  role: 'Scrub Nurse' | 'Scrub Practitioner' | 'Assistant';
  surgeon: string;
  specialty: string;
  duration: number; // minutes
  complexity?: 'Routine' | 'Complex' | 'Emergency';
  matched: boolean; // Has this been matched to a procedure in the system?
  experienceUpdated: boolean; // Has the staff updated their experience level after this?
}

export interface ExperienceUpdateSuggestion {
  id: string;
  staffId: string;
  procedureName: string;
  opcs4Code: string;
  scrubEpisodeId: string;
  scrubDate: Date;
  currentLevel: number;
  suggestedLevel?: number;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdDate: Date;
  respondedDate?: Date;
}

// ============================================================================
// SCHEDULE OF COST (SOC) - NHS REFERENCE COSTS
// Protected data - requires authentication to view
// Based on NHS National Schedule of NHS Costs (2023/24)
// ============================================================================

export interface ProcedureCost {
  opcs4: string;
  procedureName: string;
  specialty: string;
  subcategory: string;
  // Cost breakdown
  theatreCost?: number; // Theatre time cost
  staffCost?: number; // Staff costs
  implantCost?: number; // Implant/device costs
  consumablesCost?: number; // Disposables and consumables
  // Total costs
  dayCase?: number; // Day case total
  inpatientElective?: number; // Elective inpatient (short stay)
  inpatientElectiveExtended?: number; // Elective inpatient (extended stay)
  inpatientEmergency?: number; // Emergency admission
  // Activity metrics
  avgTheatreTime?: number; // Minutes
  avgLengthOfStay?: number; // Days
  // Reference
  hrgCode?: string; // Healthcare Resource Group code
  tariff?: number; // National tariff (£)
  lastUpdated?: string; // Date of cost data
}

// Sample SOC data - This would be comprehensive for all procedures
// Password protected in UI: 1234
export const PROCEDURE_COSTS: Record<string, ProcedureCost> = {
  // Trauma Orthopaedics
  'W241': {
    opcs4: 'W241',
    procedureName: 'Dynamic Hip Screw (DHS)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Hip Trauma',
    theatreCost: 1250,
    staffCost: 890,
    implantCost: 450,
    consumablesCost: 280,
    dayCase: 0,
    inpatientElective: 5840,
    inpatientEmergency: 6420,
    avgTheatreTime: 75,
    avgLengthOfStay: 8,
    hrgCode: 'HN22A',
    tariff: 5840,
    lastUpdated: '2024-04'
  },
  'W244': {
    opcs4: 'W244',
    procedureName: 'Cephalomedullary Nailing (Gamma Nail/PFNA)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Hip Trauma',
    theatreCost: 1450,
    staffCost: 990,
    implantCost: 1850,
    consumablesCost: 320,
    dayCase: 0,
    inpatientElective: 7280,
    inpatientEmergency: 8120,
    avgTheatreTime: 85,
    avgLengthOfStay: 10,
    hrgCode: 'HN22B',
    tariff: 7280,
    lastUpdated: '2024-04'
  },
  'W371-W931': {
    opcs4: 'W371, W931',
    procedureName: 'Total Hip Replacement - Uncemented',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 1680,
    staffCost: 1240,
    implantCost: 2850,
    consumablesCost: 420,
    dayCase: 0,
    inpatientElective: 9850,
    inpatientElectiveExtended: 12400,
    avgTheatreTime: 110,
    avgLengthOfStay: 4,
    hrgCode: 'HN12A',
    tariff: 9850,
    lastUpdated: '2024-04'
  },
  'W381-W931': {
    opcs4: 'W381, W931',
    procedureName: 'Total Hip Replacement - Cemented',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 1680,
    staffCost: 1240,
    implantCost: 2650,
    consumablesCost: 450,
    dayCase: 0,
    inpatientElective: 9720,
    inpatientElectiveExtended: 12200,
    avgTheatreTime: 115,
    avgLengthOfStay: 4,
    hrgCode: 'HN12B',
    tariff: 9720,
    lastUpdated: '2024-04'
  },
  'W401': {
    opcs4: 'W401',
    procedureName: 'Total Knee Replacement (Cemented)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 1580,
    staffCost: 1180,
    implantCost: 2450,
    consumablesCost: 380,
    dayCase: 0,
    inpatientElective: 8920,
    inpatientElectiveExtended: 11500,
    avgTheatreTime: 105,
    avgLengthOfStay: 3,
    hrgCode: 'HN22C',
    tariff: 8920,
    lastUpdated: '2024-04'
  },
  'W821-ACL': {
    opcs4: 'W821, W801, O171',
    procedureName: 'ACL Reconstruction',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 1380,
    staffCost: 980,
    implantCost: 850,
    consumablesCost: 320,
    dayCase: 4250,
    inpatientElective: 5840,
    avgTheatreTime: 90,
    avgLengthOfStay: 1,
    hrgCode: 'HN42A',
    tariff: 4250,
    lastUpdated: '2024-04'
  },

  // General Surgery
  'J183': {
    opcs4: 'J183',
    procedureName: 'Laparoscopic Cholecystectomy',
    specialty: 'General Surgery',
    subcategory: 'Upper GI',
    theatreCost: 980,
    staffCost: 720,
    implantCost: 0,
    consumablesCost: 340,
    dayCase: 2840,
    inpatientElective: 4250,
    inpatientEmergency: 5120,
    avgTheatreTime: 65,
    avgLengthOfStay: 1,
    hrgCode: 'FZ38A',
    tariff: 2840,
    lastUpdated: '2024-04'
  },
  'H013': {
    opcs4: 'H013',
    procedureName: 'Appendicectomy (Laparoscopic)',
    specialty: 'General Surgery',
    subcategory: 'Colorectal',
    theatreCost: 890,
    staffCost: 680,
    implantCost: 0,
    consumablesCost: 280,
    dayCase: 0,
    inpatientElective: 3420,
    inpatientEmergency: 4180,
    avgTheatreTime: 55,
    avgLengthOfStay: 2,
    hrgCode: 'FZ51A',
    tariff: 3420,
    lastUpdated: '2024-04'
  },
  'H063': {
    opcs4: 'H063',
    procedureName: 'Right Hemicolectomy (Laparoscopic)',
    specialty: 'General Surgery',
    subcategory: 'Colorectal',
    theatreCost: 1820,
    staffCost: 1350,
    implantCost: 0,
    consumablesCost: 520,
    dayCase: 0,
    inpatientElective: 8640,
    avgTheatreTime: 140,
    avgLengthOfStay: 7,
    hrgCode: 'FZ49A',
    tariff: 8640,
    lastUpdated: '2024-04'
  },
  'T201': {
    opcs4: 'T201',
    procedureName: 'Inguinal Hernia Repair - Open (Lichtenstein)',
    specialty: 'General Surgery',
    subcategory: 'Hernias',
    theatreCost: 720,
    staffCost: 540,
    implantCost: 180,
    consumablesCost: 140,
    dayCase: 1680,
    inpatientElective: 2950,
    avgTheatreTime: 45,
    avgLengthOfStay: 1,
    hrgCode: 'FZ62A',
    tariff: 1680,
    lastUpdated: '2024-04'
  },

  // Vascular
  'L291': {
    opcs4: 'L291',
    procedureName: 'Carotid Endarterectomy',
    specialty: 'Vascular Surgery',
    subcategory: 'Arterial',
    theatreCost: 1650,
    staffCost: 1280,
    implantCost: 450,
    consumablesCost: 380,
    dayCase: 0,
    inpatientElective: 6840,
    avgTheatreTime: 120,
    avgLengthOfStay: 3,
    hrgCode: 'QZ15A',
    tariff: 6840,
    lastUpdated: '2024-04'
  },
  'L183-EVAR': {
    opcs4: 'L183, L193',
    procedureName: 'Endovascular Aortic Aneurysm Repair (EVAR)',
    specialty: 'Vascular Surgery',
    subcategory: 'Arterial',
    theatreCost: 2480,
    staffCost: 1850,
    implantCost: 8500,
    consumablesCost: 920,
    dayCase: 0,
    inpatientElective: 18400,
    avgTheatreTime: 180,
    avgLengthOfStay: 4,
    hrgCode: 'QZ16A',
    tariff: 18400,
    lastUpdated: '2024-04'
  },

  // Urology
  'M651': {
    opcs4: 'M651',
    procedureName: 'TURP (Transurethral Resection of Prostate)',
    specialty: 'Urology',
    subcategory: 'Endourology',
    theatreCost: 980,
    staffCost: 740,
    implantCost: 0,
    consumablesCost: 320,
    dayCase: 0,
    inpatientElective: 3680,
    avgTheatreTime: 70,
    avgLengthOfStay: 2,
    hrgCode: 'LB26A',
    tariff: 3680,
    lastUpdated: '2024-04'
  },
  'M613': {
    opcs4: 'M613',
    procedureName: 'Radical Prostatectomy (Laparoscopic)',
    specialty: 'Urology',
    subcategory: 'Open/Laparoscopic',
    theatreCost: 2180,
    staffCost: 1640,
    implantCost: 0,
    consumablesCost: 680,
    dayCase: 0,
    inpatientElective: 9850,
    avgTheatreTime: 195,
    avgLengthOfStay: 5,
    hrgCode: 'LB15A',
    tariff: 9850,
    lastUpdated: '2024-04'
  },

  // Cardiothoracic
  'K401': {
    opcs4: 'K401',
    procedureName: 'Coronary Artery Bypass Grafting (CABG)',
    specialty: 'Cardiothoracic Surgery',
    subcategory: 'Cardiac',
    theatreCost: 4850,
    staffCost: 3920,
    implantCost: 2400,
    consumablesCost: 1850,
    dayCase: 0,
    inpatientElective: 18650,
    avgTheatreTime: 240,
    avgLengthOfStay: 8,
    hrgCode: 'EA02A',
    tariff: 18650,
    lastUpdated: '2024-04'
  },
  'K251': {
    opcs4: 'K251',
    procedureName: 'Aortic Valve Replacement (AVR)',
    specialty: 'Cardiothoracic Surgery',
    subcategory: 'Cardiac',
    theatreCost: 5240,
    staffCost: 4180,
    implantCost: 3850,
    consumablesCost: 1920,
    dayCase: 0,
    inpatientElective: 22400,
    avgTheatreTime: 270,
    avgLengthOfStay: 9,
    hrgCode: 'EA08A',
    tariff: 22400,
    lastUpdated: '2024-04'
  },

  // Gynaecology
  'Q075': {
    opcs4: 'Q075',
    procedureName: 'Laparoscopic Hysterectomy',
    specialty: 'Gynaecology',
    subcategory: 'General',
    theatreCost: 1380,
    staffCost: 1050,
    implantCost: 0,
    consumablesCost: 420,
    dayCase: 0,
    inpatientElective: 4920,
    avgTheatreTime: 105,
    avgLengthOfStay: 2,
    hrgCode: 'MA10A',
    tariff: 4920,
    lastUpdated: '2024-04'
  },
  'R171': {
    opcs4: 'R171',
    procedureName: 'Caesarean Section (Elective)',
    specialty: 'Gynaecology',
    subcategory: 'Obstetrics',
    theatreCost: 980,
    staffCost: 840,
    implantCost: 0,
    consumablesCost: 280,
    dayCase: 0,
    inpatientElective: 3420,
    avgTheatreTime: 50,
    avgLengthOfStay: 3,
    hrgCode: 'NZ30A',
    tariff: 3420,
    lastUpdated: '2024-04'
  },

  // ============================================================================
  // COMPREHENSIVE EXPANSION - ALL ORTHOPAEDICS PROCEDURES
  // ============================================================================

  // Hip Trauma - Complete
  'W371-Hip': {
    opcs4: 'W371',
    procedureName: 'Hemiarthroplasty (Uncemented)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Hip Trauma',
    theatreCost: 1380,
    staffCost: 950,
    implantCost: 1650,
    consumablesCost: 290,
    inpatientEmergency: 6280,
    avgTheatreTime: 85,
    avgLengthOfStay: 9,
    hrgCode: 'HN22A',
    tariff: 6280,
    lastUpdated: '2024-04'
  },
  'W381-Hip': {
    opcs4: 'W381',
    procedureName: 'Hemiarthroplasty (Cemented)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Hip Trauma',
    theatreCost: 1380,
    staffCost: 950,
    implantCost: 1520,
    consumablesCost: 310,
    inpatientEmergency: 6180,
    avgTheatreTime: 90,
    avgLengthOfStay: 9,
    hrgCode: 'HN22A',
    tariff: 6180,
    lastUpdated: '2024-04'
  },
  'W248': {
    opcs4: 'W248',
    procedureName: 'Cannulated Hip Screws',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Hip Trauma',
    theatreCost: 1150,
    staffCost: 820,
    implantCost: 380,
    consumablesCost: 250,
    inpatientEmergency: 5640,
    avgTheatreTime: 65,
    avgLengthOfStay: 7,
    hrgCode: 'HN22A',
    tariff: 5640,
    lastUpdated: '2024-04'
  },
  'W351': {
    opcs4: 'W351',
    procedureName: 'Girdlestone Excision Arthroplasty',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Hip Trauma',
    theatreCost: 1580,
    staffCost: 1120,
    implantCost: 0,
    consumablesCost: 340,
    inpatientElective: 7280,
    avgTheatreTime: 120,
    avgLengthOfStay: 11,
    hrgCode: 'HN22B',
    tariff: 7280,
    lastUpdated: '2024-04'
  },

  // Elective Hip - Complete
  'W391-W931': {
    opcs4: 'W391, W931',
    procedureName: 'Total Hip Replacement - Hybrid',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 1680,
    staffCost: 1240,
    implantCost: 2750,
    consumablesCost: 435,
    inpatientElective: 9780,
    avgTheatreTime: 112,
    avgLengthOfStay: 4,
    hrgCode: 'HN12A',
    tariff: 9780,
    lastUpdated: '2024-04'
  },
  'W382': {
    opcs4: 'W382',
    procedureName: 'Hip Revision (Acetabular - Cemented)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 2180,
    staffCost: 1540,
    implantCost: 3850,
    consumablesCost: 580,
    inpatientElective: 14200,
    avgTheatreTime: 165,
    avgLengthOfStay: 7,
    hrgCode: 'HN14A',
    tariff: 14200,
    lastUpdated: '2024-04'
  },
  'W372': {
    opcs4: 'W372',
    procedureName: 'Hip Revision (Acetabular - Uncemented)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 2180,
    staffCost: 1540,
    implantCost: 4250,
    consumablesCost: 550,
    inpatientElective: 14580,
    avgTheatreTime: 160,
    avgLengthOfStay: 7,
    hrgCode: 'HN14A',
    tariff: 14580,
    lastUpdated: '2024-04'
  },
  'W383': {
    opcs4: 'W383',
    procedureName: 'Hip Revision (Femoral - Cemented)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 2280,
    staffCost: 1620,
    implantCost: 4150,
    consumablesCost: 620,
    inpatientElective: 14750,
    avgTheatreTime: 175,
    avgLengthOfStay: 7,
    hrgCode: 'HN14A',
    tariff: 14750,
    lastUpdated: '2024-04'
  },
  'W384': {
    opcs4: 'W384',
    procedureName: 'Hip Revision (Both Components - Cemented)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 2880,
    staffCost: 2040,
    implantCost: 6850,
    consumablesCost: 820,
    inpatientElective: 18650,
    avgTheatreTime: 210,
    avgLengthOfStay: 9,
    hrgCode: 'HN14B',
    tariff: 18650,
    lastUpdated: '2024-04'
  },
  'W822': {
    opcs4: 'W822',
    procedureName: 'Hip Arthroscopy',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 980,
    staffCost: 720,
    implantCost: 0,
    consumablesCost: 340,
    dayCase: 2980,
    avgTheatreTime: 75,
    avgLengthOfStay: 0,
    hrgCode: 'HN42B',
    tariff: 2980,
    lastUpdated: '2024-04'
  },
  'W273': {
    opcs4: 'W273',
    procedureName: 'Femoral Osteotomy',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 1780,
    staffCost: 1280,
    implantCost: 1240,
    consumablesCost: 420,
    inpatientElective: 7840,
    avgTheatreTime: 135,
    avgLengthOfStay: 5,
    hrgCode: 'HN43A',
    tariff: 7840,
    lastUpdated: '2024-04'
  },
  'V363': {
    opcs4: 'V363',
    procedureName: 'Pelvic Osteotomy (PAO)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Hip',
    theatreCost: 2480,
    staffCost: 1840,
    implantCost: 1650,
    consumablesCost: 580,
    inpatientElective: 11280,
    avgTheatreTime: 195,
    avgLengthOfStay: 6,
    hrgCode: 'HN44A',
    tariff: 11280,
    lastUpdated: '2024-04'
  },

  // Knee Trauma
  'W192': {
    opcs4: 'W192',
    procedureName: 'Tibial Plateau Fracture ORIF',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Knee Trauma',
    theatreCost: 1680,
    staffCost: 1180,
    implantCost: 1850,
    consumablesCost: 420,
    inpatientElective: 7240,
    inpatientEmergency: 8120,
    avgTheatreTime: 125,
    avgLengthOfStay: 6,
    hrgCode: 'HN32A',
    tariff: 7240,
    lastUpdated: '2024-04'
  },
  'W191': {
    opcs4: 'W191',
    procedureName: 'Patella Fracture ORIF (Tension Band)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Knee Trauma',
    theatreCost: 1280,
    staffCost: 920,
    implantCost: 420,
    consumablesCost: 280,
    inpatientElective: 4820,
    inpatientEmergency: 5420,
    avgTheatreTime: 85,
    avgLengthOfStay: 4,
    hrgCode: 'HN32B',
    tariff: 4820,
    lastUpdated: '2024-04'
  },
  'W193': {
    opcs4: 'W193',
    procedureName: 'Distal Femur Fracture ORIF',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Knee Trauma',
    theatreCost: 1880,
    staffCost: 1320,
    implantCost: 2240,
    consumablesCost: 480,
    inpatientElective: 8140,
    inpatientEmergency: 9180,
    avgTheatreTime: 145,
    avgLengthOfStay: 7,
    hrgCode: 'HN32C',
    tariff: 8140,
    lastUpdated: '2024-04'
  },
  'W194': {
    opcs4: 'W194',
    procedureName: 'Tibial Shaft IM Nailing',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Knee Trauma',
    theatreCost: 1580,
    staffCost: 1120,
    implantCost: 1980,
    consumablesCost: 380,
    inpatientEmergency: 7180,
    avgTheatreTime: 115,
    avgLengthOfStay: 5,
    hrgCode: 'HN33A',
    tariff: 7180,
    lastUpdated: '2024-04'
  },

  // Elective Knee - Major procedures
  'W402': {
    opcs4: 'W402',
    procedureName: 'Total Knee Replacement (Cementless)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 1580,
    staffCost: 1180,
    implantCost: 2680,
    consumablesCost: 360,
    inpatientElective: 9180,
    avgTheatreTime: 100,
    avgLengthOfStay: 3,
    hrgCode: 'HN22C',
    tariff: 9180,
    lastUpdated: '2024-04'
  },
  'O181-Medial': {
    opcs4: 'W401, O181',
    procedureName: 'Unicompartmental Knee Replacement (Medial)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 1380,
    staffCost: 980,
    implantCost: 1850,
    consumablesCost: 320,
    inpatientElective: 6840,
    avgTheatreTime: 85,
    avgLengthOfStay: 2,
    hrgCode: 'HN23A',
    tariff: 6840,
    lastUpdated: '2024-04'
  },
  'W403': {
    opcs4: 'W403',
    procedureName: 'Knee Revision (Single Component)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 2080,
    staffCost: 1480,
    implantCost: 3840,
    consumablesCost: 580,
    inpatientElective: 13280,
    avgTheatreTime: 155,
    avgLengthOfStay: 6,
    hrgCode: 'HN24A',
    tariff: 13280,
    lastUpdated: '2024-04'
  },
  'W404': {
    opcs4: 'W404',
    procedureName: 'Knee Revision (Both Components)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 2680,
    staffCost: 1920,
    implantCost: 6240,
    consumablesCost: 780,
    inpatientElective: 17580,
    avgTheatreTime: 195,
    avgLengthOfStay: 8,
    hrgCode: 'HN24B',
    tariff: 17580,
    lastUpdated: '2024-04'
  },
  'W851': {
    opcs4: 'W851',
    procedureName: 'Knee Arthroscopy - Meniscectomy (Partial)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 780,
    staffCost: 580,
    implantCost: 0,
    consumablesCost: 240,
    dayCase: 1840,
    avgTheatreTime: 45,
    avgLengthOfStay: 0,
    hrgCode: 'HN42A',
    tariff: 1840,
    lastUpdated: '2024-04'
  },
  'O162': {
    opcs4: 'O162',
    procedureName: 'Knee Arthroscopy - Meniscectomy (Total)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 880,
    staffCost: 640,
    implantCost: 0,
    consumablesCost: 260,
    dayCase: 2080,
    avgTheatreTime: 55,
    avgLengthOfStay: 0,
    hrgCode: 'HN42A',
    tariff: 2080,
    lastUpdated: '2024-04'
  },
  'O161': {
    opcs4: 'O161',
    procedureName: 'Knee Arthroscopy - Meniscal Repair',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 1180,
    staffCost: 840,
    implantCost: 450,
    consumablesCost: 320,
    dayCase: 3420,
    avgTheatreTime: 75,
    avgLengthOfStay: 0,
    hrgCode: 'HN42A',
    tariff: 3420,
    lastUpdated: '2024-04'
  },
  'O171': {
    opcs4: 'O171',
    procedureName: 'ACL Reconstruction (Hamstring)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 1380,
    staffCost: 980,
    implantCost: 850,
    consumablesCost: 320,
    dayCase: 4250,
    inpatientElective: 5840,
    avgTheatreTime: 90,
    avgLengthOfStay: 1,
    hrgCode: 'HN42A',
    tariff: 4250,
    lastUpdated: '2024-04'
  },
  'O172': {
    opcs4: 'O172',
    procedureName: 'PCL Reconstruction',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 1580,
    staffCost: 1120,
    implantCost: 980,
    consumablesCost: 380,
    dayCase: 4840,
    inpatientElective: 6420,
    avgTheatreTime: 105,
    avgLengthOfStay: 1,
    hrgCode: 'HN42A',
    tariff: 4840,
    lastUpdated: '2024-04'
  },
  'W274': {
    opcs4: 'W274',
    procedureName: 'High Tibial Osteotomy (HTO)',
    specialty: 'Trauma Orthopaedics',
    subcategory: 'Elective Knee',
    theatreCost: 1680,
    staffCost: 1240,
    implantCost: 1420,
    consumablesCost: 420,
    inpatientElective: 7840,
    avgTheatreTime: 120,
    avgLengthOfStay: 4,
    hrgCode: 'HN43A',
    tariff: 7840,
    lastUpdated: '2024-04'
  },

  // ============================================================================
  // GENERAL SURGERY - COMPREHENSIVE
  // ============================================================================

  // Upper GI
  'J181': {
    opcs4: 'J181',
    procedureName: 'Open Cholecystectomy',
    specialty: 'General Surgery',
    subcategory: 'Upper GI',
    theatreCost: 1380,
    staffCost: 980,
    implantCost: 0,
    consumablesCost: 340,
    inpatientElective: 4840,
    inpatientEmergency: 5920,
    avgTheatreTime: 85,
    avgLengthOfStay: 3,
    hrgCode: 'FZ38B',
    tariff: 4840,
    lastUpdated: '2024-04'
  },
  'G223': {
    opcs4: 'G223',
    procedureName: 'Laparoscopic Fundoplication (Nissen)',
    specialty: 'General Surgery',
    subcategory: 'Upper GI',
    theatreCost: 1580,
    staffCost: 1120,
    implantCost: 0,
    consumablesCost: 420,
    inpatientElective: 5840,
    avgTheatreTime: 110,
    avgLengthOfStay: 2,
    hrgCode: 'FZ21A',
    tariff: 5840,
    lastUpdated: '2024-04'
  },
  'G341': {
    opcs4: 'G341',
    procedureName: 'Gastrostomy (PEG) Insertion',
    specialty: 'General Surgery',
    subcategory: 'Upper GI',
    theatreCost: 680,
    staffCost: 520,
    implantCost: 240,
    consumablesCost: 180,
    dayCase: 1680,
    inpatientElective: 2840,
    avgTheatreTime: 35,
    avgLengthOfStay: 1,
    hrgCode: 'FZ31A',
    tariff: 1680,
    lastUpdated: '2024-04'
  },
  'G283-Sleeve': {
    opcs4: 'G283',
    procedureName: 'Laparoscopic Sleeve Gastrectomy',
    specialty: 'General Surgery',
    subcategory: 'Upper GI',
    theatreCost: 1980,
    staffCost: 1420,
    implantCost: 0,
    consumablesCost: 680,
    inpatientElective: 7840,
    avgTheatreTime: 135,
    avgLengthOfStay: 2,
    hrgCode: 'FZ12A',
    tariff: 7840,
    lastUpdated: '2024-04'
  },
  'G283-Bypass': {
    opcs4: 'G283',
    procedureName: 'Laparoscopic Gastric Bypass (Roux-en-Y)',
    specialty: 'General Surgery',
    subcategory: 'Upper GI',
    theatreCost: 2480,
    staffCost: 1780,
    implantCost: 0,
    consumablesCost: 820,
    inpatientElective: 9640,
    avgTheatreTime: 175,
    avgLengthOfStay: 3,
    hrgCode: 'FZ12B',
    tariff: 9640,
    lastUpdated: '2024-04'
  },
  'J651': {
    opcs4: 'J651',
    procedureName: 'Whipple\'s Procedure (Pancreaticoduodenectomy)',
    specialty: 'General Surgery',
    subcategory: 'Upper GI',
    theatreCost: 4280,
    staffCost: 3120,
    implantCost: 0,
    consumablesCost: 1240,
    inpatientElective: 18840,
    avgTheatreTime: 360,
    avgLengthOfStay: 14,
    hrgCode: 'FZ11A',
    tariff: 18840,
    lastUpdated: '2024-04'
  },

  // Colorectal
  'H011': {
    opcs4: 'H011',
    procedureName: 'Appendicectomy (Open)',
    specialty: 'General Surgery',
    subcategory: 'Colorectal',
    theatreCost: 980,
    staffCost: 720,
    implantCost: 0,
    consumablesCost: 240,
    inpatientElective: 2840,
    inpatientEmergency: 3680,
    avgTheatreTime: 55,
    avgLengthOfStay: 2,
    hrgCode: 'FZ51B',
    tariff: 2840,
    lastUpdated: '2024-04'
  },
  'H061': {
    opcs4: 'H061',
    procedureName: 'Right Hemicolectomy (Open)',
    specialty: 'General Surgery',
    subcategory: 'Colorectal',
    theatreCost: 2080,
    staffCost: 1480,
    implantCost: 0,
    consumablesCost: 520,
    inpatientElective: 9280,
    avgTheatreTime: 155,
    avgLengthOfStay: 8,
    hrgCode: 'FZ49B',
    tariff: 9280,
    lastUpdated: '2024-04'
  },
  'H071': {
    opcs4: 'H071',
    procedureName: 'Left Hemicolectomy (Open)',
    specialty: 'General Surgery',
    subcategory: 'Colorectal',
    theatreCost: 2180,
    staffCost: 1540,
    implantCost: 0,
    consumablesCost: 540,
    inpatientElective: 9640,
    avgTheatreTime: 165,
    avgLengthOfStay: 8,
    hrgCode: 'FZ49C',
    tariff: 9640,
    lastUpdated: '2024-04'
  },
  'H331': {
    opcs4: 'H331',
    procedureName: 'Anterior Resection (Open)',
    specialty: 'General Surgery',
    subcategory: 'Colorectal',
    theatreCost: 2480,
    staffCost: 1780,
    implantCost: 0,
    consumablesCost: 620,
    inpatientElective: 10840,
    avgTheatreTime: 185,
    avgLengthOfStay: 9,
    hrgCode: 'FZ42A',
    tariff: 10840,
    lastUpdated: '2024-04'
  },
  'H081': {
    opcs4: 'H081',
    procedureName: 'Abdominoperineal Resection (APR)',
    specialty: 'General Surgery',
    subcategory: 'Colorectal',
    theatreCost: 2880,
    staffCost: 2040,
    implantCost: 0,
    consumablesCost: 720,
    inpatientElective: 12280,
    avgTheatreTime: 215,
    avgLengthOfStay: 11,
    hrgCode: 'FZ42B',
    tariff: 12280,
    lastUpdated: '2024-04'
  },
  'H511': {
    opcs4: 'H511',
    procedureName: 'Haemorrhoidectomy (Open)',
    specialty: 'General Surgery',
    subcategory: 'Colorectal',
    theatreCost: 680,
    staffCost: 520,
    implantCost: 0,
    consumablesCost: 180,
    dayCase: 1480,
    inpatientElective: 2640,
    avgTheatreTime: 45,
    avgLengthOfStay: 1,
    hrgCode: 'FZ54A',
    tariff: 1480,
    lastUpdated: '2024-04'
  },

  // Hernias - Complete
  'T203': {
    opcs4: 'T203',
    procedureName: 'Inguinal Hernia Repair - Laparoscopic TEP',
    specialty: 'General Surgery',
    subcategory: 'Hernias',
    theatreCost: 880,
    staffCost: 640,
    implantCost: 280,
    consumablesCost: 220,
    dayCase: 2180,
    inpatientElective: 3420,
    avgTheatreTime: 55,
    avgLengthOfStay: 0,
    hrgCode: 'FZ62A',
    tariff: 2180,
    lastUpdated: '2024-04'
  },
  'T211': {
    opcs4: 'T211',
    procedureName: 'Femoral Hernia Repair (Open)',
    specialty: 'General Surgery',
    subcategory: 'Hernias',
    theatreCost: 780,
    staffCost: 580,
    implantCost: 220,
    consumablesCost: 160,
    dayCase: 1840,
    inpatientElective: 3180,
    avgTheatreTime: 50,
    avgLengthOfStay: 1,
    hrgCode: 'FZ62B',
    tariff: 1840,
    lastUpdated: '2024-04'
  },
  'T271': {
    opcs4: 'T271',
    procedureName: 'Umbilical Hernia Repair (Open)',
    specialty: 'General Surgery',
    subcategory: 'Hernias',
    theatreCost: 680,
    staffCost: 520,
    implantCost: 180,
    consumablesCost: 140,
    dayCase: 1580,
    inpatientElective: 2840,
    avgTheatreTime: 45,
    avgLengthOfStay: 0,
    hrgCode: 'FZ62C',
    tariff: 1580,
    lastUpdated: '2024-04'
  },
  'T291': {
    opcs4: 'T291',
    procedureName: 'Incisional Hernia Repair (Open with Mesh)',
    specialty: 'General Surgery',
    subcategory: 'Hernias',
    theatreCost: 1380,
    staffCost: 980,
    implantCost: 480,
    consumablesCost: 320,
    inpatientElective: 4840,
    avgTheatreTime: 95,
    avgLengthOfStay: 3,
    hrgCode: 'FZ62D',
    tariff: 4840,
    lastUpdated: '2024-04'
  },

  // ============================================================================
  // ENDOSCOPY PROCEDURES - Financial Data
  // ============================================================================

  // ERCP Procedures
  'J581': { opcs4: 'J581', procedureName: 'ERCP with Sphincterotomy', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 1450, staffCost: 1050, implantCost: 0, consumablesCost: 420, dayCase: 2920, inpatientElective: 4240, avgTheatreTime: 65, avgLengthOfStay: 1, hrgCode: 'FZ54A', tariff: 2920, lastUpdated: '2025-01' },
  'J582': { opcs4: 'J582', procedureName: 'ERCP with Stone Extraction', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 1520, staffCost: 1080, implantCost: 0, consumablesCost: 450, dayCase: 3050, inpatientElective: 4380, avgTheatreTime: 70, avgLengthOfStay: 1, hrgCode: 'FZ54B', tariff: 3050, lastUpdated: '2025-01' },
  'J583': { opcs4: 'J583', procedureName: 'ERCP with Stent Insertion', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 1480, staffCost: 1060, implantCost: 850, consumablesCost: 380, dayCase: 3770, inpatientElective: 5240, avgTheatreTime: 68, avgLengthOfStay: 2, hrgCode: 'FZ54C', tariff: 3770, lastUpdated: '2025-01' },
  'J584': { opcs4: 'J584', procedureName: 'ERCP with Balloon Dilatation', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 1440, staffCost: 1040, implantCost: 0, consumablesCost: 460, dayCase: 2940, inpatientElective: 4280, avgTheatreTime: 66, avgLengthOfStay: 1, hrgCode: 'FZ54A', tariff: 2940, lastUpdated: '2025-01' },
  'J585': { opcs4: 'J585', procedureName: 'ERCP Diagnostic', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 1280, staffCost: 920, implantCost: 0, consumablesCost: 340, dayCase: 2540, inpatientElective: 3680, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'FZ54D', tariff: 2540, lastUpdated: '2025-01' },

  // Gastroscopy and Colonoscopy
  'G451': { opcs4: 'G451', procedureName: 'Upper GI Endoscopy Diagnostic', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 580, staffCost: 420, implantCost: 0, consumablesCost: 180, dayCase: 1180, inpatientElective: 1840, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'FZ38Z', tariff: 1180, lastUpdated: '2025-01' },
  'H221': { opcs4: 'H221', procedureName: 'Colonoscopy Diagnostic', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 720, staffCost: 520, implantCost: 0, consumablesCost: 220, dayCase: 1460, inpatientElective: 2180, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'FZ50Z', tariff: 1460, lastUpdated: '2025-01' },
  'G452': { opcs4: 'G452', procedureName: 'Oesophageal Variceal Banding', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 920, staffCost: 680, implantCost: 0, consumablesCost: 340, dayCase: 1940, inpatientElective: 3120, inpatientEmergency: 3680, avgTheatreTime: 40, avgLengthOfStay: 2, hrgCode: 'FZ41A', tariff: 1940, lastUpdated: '2025-01' },
  'H222': { opcs4: 'H222', procedureName: 'Colonoscopic Polypectomy', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 840, staffCost: 610, implantCost: 0, consumablesCost: 260, dayCase: 1710, inpatientElective: 2580, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'FZ51A', tariff: 1710, lastUpdated: '2025-01' },

  // ============================================================================
  // ENT PROCEDURES - Financial Data
  // ============================================================================

  // ENT Robotic
  'E291': { opcs4: 'E291', procedureName: 'Robotic Transoral Laryngectomy', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 3240, staffCost: 2180, implantCost: 0, consumablesCost: 840, inpatientElective: 8960, avgTheatreTime: 240, avgLengthOfStay: 7, hrgCode: 'CA10A', tariff: 8960, lastUpdated: '2025-01' },
  'E292': { opcs4: 'E292', procedureName: 'Robotic Base of Tongue Resection', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 2980, staffCost: 2020, implantCost: 0, consumablesCost: 780, inpatientElective: 8240, avgTheatreTime: 210, avgLengthOfStay: 6, hrgCode: 'CA11B', tariff: 8240, lastUpdated: '2025-01' },
  'E296': { opcs4: 'E296', procedureName: 'Robotic Thyroidectomy', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 2640, staffCost: 1840, implantCost: 0, consumablesCost: 680, inpatientElective: 6840, avgTheatreTime: 180, avgLengthOfStay: 2, hrgCode: 'CA12A', tariff: 6840, lastUpdated: '2025-01' },

  // ENT Laser
  'E321': { opcs4: 'E321', procedureName: 'Laser Laryngeal Papilloma', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 1480, staffCost: 1020, implantCost: 0, consumablesCost: 420, dayCase: 2920, inpatientElective: 4240, avgTheatreTime: 60, avgLengthOfStay: 0, hrgCode: 'CA23Z', tariff: 2920, lastUpdated: '2025-01' },
  'E322': { opcs4: 'E322', procedureName: 'Laser Vocal Cord Lesion', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 1380, staffCost: 960, implantCost: 0, consumablesCost: 380, dayCase: 2720, inpatientElective: 3980, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'CA24A', tariff: 2720, lastUpdated: '2025-01' },
  'E323': { opcs4: 'E323', procedureName: 'Laser Tonsillectomy', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 1240, staffCost: 880, implantCost: 0, consumablesCost: 340, dayCase: 2460, inpatientElective: 3580, avgTheatreTime: 50, avgLengthOfStay: 0, hrgCode: 'CA30Z', tariff: 2460, lastUpdated: '2025-01' },

  // ============================================================================
  // GYNAECOLOGY PROCEDURES - Financial Data
  // ============================================================================

  // Gynae Robotic
  'Q071': { opcs4: 'Q071', procedureName: 'Robotic Hysterectomy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 2840, staffCost: 1980, implantCost: 0, consumablesCost: 760, inpatientElective: 7240, avgTheatreTime: 180, avgLengthOfStay: 2, hrgCode: 'MA10A', tariff: 7240, lastUpdated: '2025-01' },
  'Q072': { opcs4: 'Q072', procedureName: 'Robotic Myomectomy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 2640, staffCost: 1840, implantCost: 0, consumablesCost: 680, inpatientElective: 6840, avgTheatreTime: 165, avgLengthOfStay: 2, hrgCode: 'MA11B', tariff: 6840, lastUpdated: '2025-01' },
  'Q077': { opcs4: 'Q077', procedureName: 'Robotic Radical Hysterectomy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 3240, staffCost: 2180, implantCost: 0, consumablesCost: 840, inpatientElective: 8960, avgTheatreTime: 240, avgLengthOfStay: 5, hrgCode: 'MA02A', tariff: 8960, lastUpdated: '2025-01' },

  // Gynae Fertility
  'Q101': { opcs4: 'Q101', procedureName: 'Laparoscopic Ovarian Drilling', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 1640, staffCost: 1180, implantCost: 0, consumablesCost: 480, dayCase: 3300, inpatientElective: 4840, avgTheatreTime: 75, avgLengthOfStay: 0, hrgCode: 'MA21Z', tariff: 3300, lastUpdated: '2025-01' },
  'Q102': { opcs4: 'Q102', procedureName: 'Hysteroscopic Polypectomy', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 1280, staffCost: 920, implantCost: 0, consumablesCost: 360, dayCase: 2560, inpatientElective: 3720, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'MA22A', tariff: 2560, lastUpdated: '2025-01' },
  'Q115': { opcs4: 'Q115', procedureName: 'Diagnostic Hysteroscopy', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 840, staffCost: 620, implantCost: 0, consumablesCost: 240, dayCase: 1700, inpatientElective: 2480, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'MA26Z', tariff: 1700, lastUpdated: '2025-01' },

  // ============================================================================
  // NEUROLOGY PROCEDURES - Financial Data
  // ============================================================================

  'A051': { opcs4: 'A051', procedureName: 'Craniotomy for Brain Tumor', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 5840, staffCost: 3680, implantCost: 1240, consumablesCost: 1580, inpatientElective: 18240, avgTheatreTime: 360, avgLengthOfStay: 10, hrgCode: 'AA25A', tariff: 18240, lastUpdated: '2025-01' },
  'A052': { opcs4: 'A052', procedureName: 'Awake Craniotomy', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 6240, staffCost: 3920, implantCost: 1180, consumablesCost: 1680, inpatientElective: 19840, avgTheatreTime: 420, avgLengthOfStay: 8, hrgCode: 'AA25B', tariff: 19840, lastUpdated: '2025-01' },
  'A053': { opcs4: 'A053', procedureName: 'Glioblastoma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 6040, staffCost: 3820, implantCost: 1320, consumablesCost: 1620, inpatientElective: 19240, avgTheatreTime: 390, avgLengthOfStay: 12, hrgCode: 'AA26A', tariff: 19240, lastUpdated: '2025-01' },

  // ============================================================================
  // OBSTETRICS PROCEDURES - Financial Data
  // ============================================================================

  'R171': { opcs4: 'R171', procedureName: 'Caesarean Section', specialty: 'Obstetrics', subcategory: '', theatreCost: 1640, staffCost: 1240, implantCost: 0, consumablesCost: 520, inpatientElective: 3980, avgTheatreTime: 60, avgLengthOfStay: 3, hrgCode: 'NZ30A', tariff: 3980, lastUpdated: '2025-01' },
  'R172': { opcs4: 'R172', procedureName: 'Emergency Caesarean Section', specialty: 'Obstetrics', subcategory: '', theatreCost: 1840, staffCost: 1380, implantCost: 0, consumablesCost: 580, inpatientEmergency: 4640, avgTheatreTime: 50, avgLengthOfStay: 4, hrgCode: 'NZ30B', tariff: 4640, lastUpdated: '2025-01' },
  'R173': { opcs4: 'R173', procedureName: 'Caesarean Hysterectomy', specialty: 'Obstetrics', subcategory: '', theatreCost: 2840, staffCost: 1980, implantCost: 0, consumablesCost: 840, inpatientEmergency: 8240, avgTheatreTime: 180, avgLengthOfStay: 7, hrgCode: 'NZ31A', tariff: 8240, lastUpdated: '2025-01' },

  // ============================================================================
  // OPHTHALMOLOGY PROCEDURES - Financial Data
  // ============================================================================

  'C711': { opcs4: 'C711', procedureName: 'Cataract Surgery', specialty: 'Ophthalmology', subcategory: '', theatreCost: 840, staffCost: 620, implantCost: 380, consumablesCost: 240, dayCase: 2080, inpatientElective: 2980, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'BZ21A', tariff: 2080, lastUpdated: '2025-01' },
  'C712': { opcs4: 'C712', procedureName: 'Vitrectomy', specialty: 'Ophthalmology', subcategory: '', theatreCost: 1480, staffCost: 1060, implantCost: 680, consumablesCost: 420, dayCase: 3640, inpatientElective: 5180, avgTheatreTime: 90, avgLengthOfStay: 0, hrgCode: 'BZ22A', tariff: 3640, lastUpdated: '2025-01' },
  'C713': { opcs4: 'C713', procedureName: 'Retinal Detachment Repair', specialty: 'Ophthalmology', subcategory: '', theatreCost: 1640, staffCost: 1180, implantCost: 840, consumablesCost: 480, inpatientElective: 5840, avgTheatreTime: 105, avgLengthOfStay: 1, hrgCode: 'BZ23A', tariff: 5840, lastUpdated: '2025-01' },

  // ============================================================================
  // ORAL AND MAXILLOFACIAL PROCEDURES - Financial Data
  // ============================================================================

  'F111': { opcs4: 'F111', procedureName: 'Mandible Fracture Fixation', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 2240, staffCost: 1580, implantCost: 1680, consumablesCost: 640, inpatientElective: 7840, inpatientEmergency: 8640, avgTheatreTime: 150, avgLengthOfStay: 3, hrgCode: 'JC10A', tariff: 7840, lastUpdated: '2025-01' },
  'F112': { opcs4: 'F112', procedureName: 'Maxillary Fracture Fixation', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 2440, staffCost: 1720, implantCost: 1840, consumablesCost: 680, inpatientElective: 8480, inpatientEmergency: 9240, avgTheatreTime: 165, avgLengthOfStay: 4, hrgCode: 'JC11A', tariff: 8480, lastUpdated: '2025-01' },

  // OMFS Mandible
  'F141': { opcs4: 'F141', procedureName: 'Mandibular Resection', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 3640, staffCost: 2480, implantCost: 2180, consumablesCost: 980, inpatientElective: 12840, avgTheatreTime: 270, avgLengthOfStay: 8, hrgCode: 'JC20A', tariff: 12840, lastUpdated: '2025-01' },
  'F142': { opcs4: 'F142', procedureName: 'Fibula Free Flap', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 5240, staffCost: 3480, implantCost: 2640, consumablesCost: 1380, inpatientElective: 18640, avgTheatreTime: 480, avgLengthOfStay: 12, hrgCode: 'JC21A', tariff: 18640, lastUpdated: '2025-01' },

  // Orthognathic
  'F171': { opcs4: 'F171', procedureName: 'Bimaxillary Osteotomy', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 3840, staffCost: 2640, implantCost: 2380, consumablesCost: 1040, inpatientElective: 13440, avgTheatreTime: 300, avgLengthOfStay: 3, hrgCode: 'JC30A', tariff: 13440, lastUpdated: '2025-01' },
  'F172': { opcs4: 'F172', procedureName: 'Le Fort I Osteotomy', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 2840, staffCost: 1980, implantCost: 1640, consumablesCost: 780, inpatientElective: 9840, avgTheatreTime: 210, avgLengthOfStay: 2, hrgCode: 'JC31A', tariff: 9840, lastUpdated: '2025-01' },

  // Dental
  'F201': { opcs4: 'F201', procedureName: 'Surgical Extraction', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 480, staffCost: 360, implantCost: 0, consumablesCost: 140, dayCase: 980, inpatientElective: 1680, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'JC60Z', tariff: 980, lastUpdated: '2025-01' },
  'F202': { opcs4: 'F202', procedureName: 'Impacted Wisdom Tooth Removal', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 640, staffCost: 480, implantCost: 0, consumablesCost: 180, dayCase: 1300, inpatientElective: 2140, avgTheatreTime: 30, avgLengthOfStay: 0, hrgCode: 'JC61A', tariff: 1300, lastUpdated: '2025-01' },

  // ============================================================================
  // PLASTICS PROCEDURES - Financial Data
  // ============================================================================

  'S811': { opcs4: 'S811', procedureName: 'Escharotomy', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 1240, staffCost: 920, implantCost: 0, consumablesCost: 380, inpatientEmergency: 3840, avgTheatreTime: 45, avgLengthOfStay: 5, hrgCode: 'JC80A', tariff: 3840, lastUpdated: '2025-01' },
  'S813': { opcs4: 'S813', procedureName: 'Split Thickness Skin Graft', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 1840, staffCost: 1320, implantCost: 0, consumablesCost: 580, inpatientElective: 5240, avgTheatreTime: 90, avgLengthOfStay: 7, hrgCode: 'JC81A', tariff: 5240, lastUpdated: '2025-01' },
  'S819': { opcs4: 'S819', procedureName: 'Mastectomy with Reconstruction', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 3240, staffCost: 2180, implantCost: 4840, consumablesCost: 980, inpatientElective: 14840, avgTheatreTime: 240, avgLengthOfStay: 4, hrgCode: 'JC85A', tariff: 14840, lastUpdated: '2025-01' },

  // DIEP Flap
  'S841': { opcs4: 'S841', procedureName: 'DIEP Flap', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 5640, staffCost: 3680, implantCost: 0, consumablesCost: 1480, inpatientElective: 17240, avgTheatreTime: 420, avgLengthOfStay: 5, hrgCode: 'JC90A', tariff: 17240, lastUpdated: '2025-01' },
  'S842': { opcs4: 'S842', procedureName: 'Unilateral DIEP', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 4840, staffCost: 3240, implantCost: 0, consumablesCost: 1280, inpatientElective: 15240, avgTheatreTime: 360, avgLengthOfStay: 4, hrgCode: 'JC90B', tariff: 15240, lastUpdated: '2025-01' },

  // ============================================================================
  // RENAL PROCEDURES - Financial Data
  // ============================================================================

  'M021': { opcs4: 'M021', procedureName: 'Living Donor Nephrectomy', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 3240, staffCost: 2180, implantCost: 0, consumablesCost: 840, inpatientElective: 8960, avgTheatreTime: 210, avgLengthOfStay: 3, hrgCode: 'LA04A', tariff: 8960, lastUpdated: '2025-01' },
  'M023': { opcs4: 'M023', procedureName: 'Kidney Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 4840, staffCost: 3240, implantCost: 0, consumablesCost: 1380, inpatientElective: 15240, avgTheatreTime: 300, avgLengthOfStay: 10, hrgCode: 'LA07A', tariff: 15240, lastUpdated: '2025-01' },

  // ============================================================================
  // UROLOGY PROCEDURES - Financial Data
  // ============================================================================

  'M651': { opcs4: 'M651', procedureName: 'Robotic Prostatectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 3640, staffCost: 2480, implantCost: 0, consumablesCost: 980, inpatientElective: 10840, avgTheatreTime: 240, avgLengthOfStay: 2, hrgCode: 'LB24A', tariff: 10840, lastUpdated: '2025-01' },
  'M652': { opcs4: 'M652', procedureName: 'Robotic Partial Nephrectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 3440, staffCost: 2340, implantCost: 0, consumablesCost: 920, inpatientElective: 10240, avgTheatreTime: 225, avgLengthOfStay: 3, hrgCode: 'LB25A', tariff: 10240, lastUpdated: '2025-01' },

  'M681': { opcs4: 'M681', procedureName: 'Holmium Laser Prostatectomy', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 2440, staffCost: 1720, implantCost: 0, consumablesCost: 680, dayCase: 4840, inpatientElective: 6840, avgTheatreTime: 120, avgLengthOfStay: 1, hrgCode: 'LB40A', tariff: 4840, lastUpdated: '2025-01' },
  'M682': { opcs4: 'M682', procedureName: 'GreenLight Laser Prostatectomy', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 2340, staffCost: 1640, implantCost: 0, consumablesCost: 640, dayCase: 4620, inpatientElective: 6540, avgTheatreTime: 110, avgLengthOfStay: 1, hrgCode: 'LB40B', tariff: 4620, lastUpdated: '2025-01' },

  // ============================================================================
  // VASCULAR PROCEDURES - Financial Data
  // ============================================================================

  'L271': { opcs4: 'L271', procedureName: 'Abdominal Aortic Aneurysm Repair', specialty: 'Vascular', subcategory: '', theatreCost: 5240, staffCost: 3480, implantCost: 3840, consumablesCost: 1480, inpatientElective: 19840, avgTheatreTime: 360, avgLengthOfStay: 8, hrgCode: 'QZ10A', tariff: 19840, lastUpdated: '2025-01' },
  'L272': { opcs4: 'L272', procedureName: 'EVAR', specialty: 'Vascular', subcategory: '', theatreCost: 4640, staffCost: 3140, implantCost: 8840, consumablesCost: 1280, inpatientElective: 24840, avgTheatreTime: 240, avgLengthOfStay: 3, hrgCode: 'QZ11A', tariff: 24840, lastUpdated: '2025-01' },
  'L273': { opcs4: 'L273', procedureName: 'Carotid Endarterectomy', specialty: 'Vascular', subcategory: '', theatreCost: 2840, staffCost: 1980, implantCost: 0, consumablesCost: 780, inpatientElective: 7240, avgTheatreTime: 150, avgLengthOfStay: 2, hrgCode: 'QZ21A', tariff: 7240, lastUpdated: '2025-01' },

  // ============================================================================
  // ENT - Additional Financial Data
  // ============================================================================

  // ENT Laser
  'E324': { opcs4: 'E324', procedureName: 'Laser Turbinate Reduction', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'CA89Z', tariff: 360, lastUpdated: '2025-01' },
  'E325': { opcs4: 'E325', procedureName: 'Laser Laryngeal Surgery', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'CA78Z', tariff: 480, lastUpdated: '2025-01' },
  'E326': { opcs4: 'E326', procedureName: 'Laser Stapedotomy', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'CA77Z', tariff: 380, lastUpdated: '2025-01' },
  'E327': { opcs4: 'E327', procedureName: 'Laser Myringotomy', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'CA37Z', tariff: 200, lastUpdated: '2025-01' },
  'E328': { opcs4: 'E328', procedureName: 'Laser Choanal Atresia Repair', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 700, staffCost: 490, implantCost: 0, consumablesCost: 210, inpatientElective: 2000, avgTheatreTime: 87, avgLengthOfStay: 1, hrgCode: 'CA59B', tariff: 2000, lastUpdated: '2025-01' },
  'E329': { opcs4: 'E329', procedureName: 'Laser Laryngeal Web Division', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 52, avgLengthOfStay: 0, hrgCode: 'CA50Z', tariff: 520, lastUpdated: '2025-01' },
  'E330': { opcs4: 'E330', procedureName: 'Laser Subglottic Stenosis', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'CA29Z', tariff: 360, lastUpdated: '2025-01' },
  'E331': { opcs4: 'E331', procedureName: 'Laser Arytenoidectomy', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 2340, staffCost: 1640, implantCost: 0, consumablesCost: 700, inpatientElective: 7080, avgTheatreTime: 195, avgLengthOfStay: 4, hrgCode: 'CA59A', tariff: 7080, lastUpdated: '2025-01' },
  'E332': { opcs4: 'E332', procedureName: 'Laser Supraglottoplasty', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 23, avgLengthOfStay: 0, hrgCode: 'CA40Z', tariff: 240, lastUpdated: '2025-01' },
  'E333': { opcs4: 'E333', procedureName: 'Laser Nasal Polypectomy', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 2120, staffCost: 1480, implantCost: 0, consumablesCost: 640, inpatientElective: 7840, avgTheatreTime: 177, avgLengthOfStay: 6, hrgCode: 'CA66A', tariff: 7840, lastUpdated: '2025-01' },
  'E334': { opcs4: 'E334', procedureName: 'Laser Epistaxis Control', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'CA65Z', tariff: 400, lastUpdated: '2025-01' },
  'E335': { opcs4: 'E335', procedureName: 'Laser Pharyngoplasty', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'CA40Z', tariff: 540, lastUpdated: '2025-01' },
  'E336': { opcs4: 'E336', procedureName: 'Laser Tongue Base Reduction', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 50, avgLengthOfStay: 0, hrgCode: 'CA55Z', tariff: 510, lastUpdated: '2025-01' },
  'E337': { opcs4: 'E337', procedureName: 'Laser Epiglottic Cyst', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 43, avgLengthOfStay: 0, hrgCode: 'CA42Z', tariff: 440, lastUpdated: '2025-01' },
  'E338': { opcs4: 'E338', procedureName: 'Laser Laryngeal Granuloma', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'CA30Z', tariff: 520, lastUpdated: '2025-01' },
  'E339': { opcs4: 'E339', procedureName: 'Laser Reinke Edema', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'CA40Z', tariff: 540, lastUpdated: '2025-01' },
  'E340': { opcs4: 'E340', procedureName: 'Laser Laryngeal Cyst', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 22, avgLengthOfStay: 0, hrgCode: 'CA68Z', tariff: 220, lastUpdated: '2025-01' },
  'E341': { opcs4: 'E341', procedureName: 'Laser Laryngomalacia', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 49, avgLengthOfStay: 0, hrgCode: 'CA41Z', tariff: 510, lastUpdated: '2025-01' },
  'E342': { opcs4: 'E342', procedureName: 'Laser Tracheal Stenosis', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'CA10Z', tariff: 360, lastUpdated: '2025-01' },
  'E343': { opcs4: 'E343', procedureName: 'Laser Pharyngeal Pouch', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 50, avgLengthOfStay: 0, hrgCode: 'CA79Z', tariff: 510, lastUpdated: '2025-01' },
  'E344': { opcs4: 'E344', procedureName: 'Laser Laryngeal Leukoplakia', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'CA43Z', tariff: 380, lastUpdated: '2025-01' },
  'E345': { opcs4: 'E345', procedureName: 'Laser Glottic Stenosis', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'CA51Z', tariff: 360, lastUpdated: '2025-01' },
  'E346': { opcs4: 'E346', procedureName: 'Laser Tracheostomy', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'CA14Z', tariff: 360, lastUpdated: '2025-01' },
  'E347': { opcs4: 'E347', procedureName: 'Laser Anterior Commissure Tumor', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'CA81Z', tariff: 220, lastUpdated: '2025-01' },
  'E348': { opcs4: 'E348', procedureName: 'Laser Laryngeal Carcinoma In Situ', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 52, avgLengthOfStay: 0, hrgCode: 'CA89Z', tariff: 520, lastUpdated: '2025-01' },
  'E349': { opcs4: 'E349', procedureName: 'Laser Piriform Fossa Tumor', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'CA55Z', tariff: 200, lastUpdated: '2025-01' },
  'E350': { opcs4: 'E350', procedureName: 'Laser Posterior Glottic Stenosis', specialty: 'ENT', subcategory: 'ENT Laser', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'CA51Z', tariff: 540, lastUpdated: '2025-01' },

  // ENT Robotic
  'E293': { opcs4: 'E293', procedureName: 'Robotic Supraglottic Laryngectomy', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 8300, staffCost: 5810, implantCost: 0, consumablesCost: 2490, inpatientElective: 23800, avgTheatreTime: 461, avgLengthOfStay: 12, hrgCode: 'CA42A', tariff: 23800, lastUpdated: '2025-01' },
  'E294': { opcs4: 'E294', procedureName: 'Robotic Tonsillectomy', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 5510, staffCost: 3860, implantCost: 0, consumablesCost: 1650, inpatientElective: 15820, avgTheatreTime: 306, avgLengthOfStay: 8, hrgCode: 'CA16A', tariff: 15820, lastUpdated: '2025-01' },
  'E295': { opcs4: 'E295', procedureName: 'Robotic Pharyngectomy', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 7560, staffCost: 5290, implantCost: 0, consumablesCost: 2270, inpatientElective: 21120, avgTheatreTime: 420, avgLengthOfStay: 10, hrgCode: 'CA44A', tariff: 21120, lastUpdated: '2025-01' },
  'E297': { opcs4: 'E297', procedureName: 'Robotic Parotidectomy', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 5710, staffCost: 4000, implantCost: 0, consumablesCost: 1710, inpatientElective: 18020, avgTheatreTime: 317, avgLengthOfStay: 11, hrgCode: 'CA92A', tariff: 18020, lastUpdated: '2025-01' },
  'E298': { opcs4: 'E298', procedureName: 'Robotic Submandibular Gland Excision', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 5670, staffCost: 3970, implantCost: 0, consumablesCost: 1700, inpatientElective: 17340, avgTheatreTime: 315, avgLengthOfStay: 10, hrgCode: 'CA49A', tariff: 17340, lastUpdated: '2025-01' },
  'E299': { opcs4: 'E299', procedureName: 'Robotic Vallecular Cyst Excision', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 7810, staffCost: 5470, implantCost: 0, consumablesCost: 2340, inpatientElective: 22220, avgTheatreTime: 434, avgLengthOfStay: 11, hrgCode: 'CA16A', tariff: 22220, lastUpdated: '2025-01' },
  'E300': { opcs4: 'E300', procedureName: 'Robotic Epiglottis Resection', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 7520, staffCost: 5260, implantCost: 0, consumablesCost: 2260, inpatientElective: 21040, avgTheatreTime: 418, avgLengthOfStay: 10, hrgCode: 'CA82A', tariff: 21040, lastUpdated: '2025-01' },
  'E301': { opcs4: 'E301', procedureName: 'Robotic Vocal Cord Surgery', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 7470, staffCost: 5230, implantCost: 0, consumablesCost: 2240, inpatientElective: 22140, avgTheatreTime: 415, avgLengthOfStay: 12, hrgCode: 'CA43A', tariff: 22140, lastUpdated: '2025-01' },
  'E302': { opcs4: 'E302', procedureName: 'Robotic Arytenoid Resection', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 8530, staffCost: 5970, implantCost: 0, consumablesCost: 2560, inpatientElective: 22460, avgTheatreTime: 474, avgLengthOfStay: 9, hrgCode: 'CA50A', tariff: 22460, lastUpdated: '2025-01' },
  'E303': { opcs4: 'E303', procedureName: 'Robotic Hypopharyngeal Tumor Resection', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 7600, staffCost: 5320, implantCost: 0, consumablesCost: 2280, inpatientElective: 20000, avgTheatreTime: 422, avgLengthOfStay: 8, hrgCode: 'CA14A', tariff: 20000, lastUpdated: '2025-01' },
  'E304': { opcs4: 'E304', procedureName: 'Robotic Neck Dissection', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 8530, staffCost: 5970, implantCost: 0, consumablesCost: 2560, inpatientElective: 24260, avgTheatreTime: 474, avgLengthOfStay: 12, hrgCode: 'CA16A', tariff: 24260, lastUpdated: '2025-01' },
  'E305': { opcs4: 'E305', procedureName: 'Robotic Lingual Tonsillectomy', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 6350, staffCost: 4450, implantCost: 0, consumablesCost: 1910, inpatientElective: 19310, avgTheatreTime: 353, avgLengthOfStay: 11, hrgCode: 'CA65A', tariff: 19310, lastUpdated: '2025-01' },
  'E306': { opcs4: 'E306', procedureName: 'Robotic Nasopharyngeal Tumor Resection', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 7000, staffCost: 4900, implantCost: 0, consumablesCost: 2100, inpatientElective: 21200, avgTheatreTime: 389, avgLengthOfStay: 12, hrgCode: 'CA69A', tariff: 21200, lastUpdated: '2025-01' },
  'E307': { opcs4: 'E307', procedureName: 'Robotic Oropharyngeal Reconstruction', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 5900, staffCost: 4130, implantCost: 0, consumablesCost: 1770, inpatientElective: 17800, avgTheatreTime: 328, avgLengthOfStay: 10, hrgCode: 'CA86A', tariff: 17800, lastUpdated: '2025-01' },
  'E308': { opcs4: 'E308', procedureName: 'Robotic Laryngeal Cleft Repair', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 5580, staffCost: 3910, implantCost: 0, consumablesCost: 1670, inpatientElective: 17760, avgTheatreTime: 310, avgLengthOfStay: 11, hrgCode: 'CA63A', tariff: 17760, lastUpdated: '2025-01' },
  'E309': { opcs4: 'E309', procedureName: 'Robotic Zenker Diverticulectomy', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 7110, staffCost: 4980, implantCost: 0, consumablesCost: 2130, inpatientElective: 20820, avgTheatreTime: 395, avgLengthOfStay: 11, hrgCode: 'CA35A', tariff: 20820, lastUpdated: '2025-01' },
  'E310': { opcs4: 'E310', procedureName: 'Robotic Laryngeal Papilloma Removal', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 6680, staffCost: 4680, implantCost: 0, consumablesCost: 2000, inpatientElective: 19360, avgTheatreTime: 371, avgLengthOfStay: 10, hrgCode: 'CA82A', tariff: 19360, lastUpdated: '2025-01' },
  'E311': { opcs4: 'E311', procedureName: 'Robotic Piriform Sinus Tumor Resection', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 5710, staffCost: 4000, implantCost: 0, consumablesCost: 1710, inpatientElective: 18020, avgTheatreTime: 317, avgLengthOfStay: 11, hrgCode: 'CA39A', tariff: 18020, lastUpdated: '2025-01' },
  'E312': { opcs4: 'E312', procedureName: 'Robotic Glossectomy Partial', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 7510, staffCost: 5260, implantCost: 0, consumablesCost: 2250, inpatientElective: 19820, avgTheatreTime: 417, avgLengthOfStay: 8, hrgCode: 'CA55A', tariff: 19820, lastUpdated: '2025-01' },
  'E313': { opcs4: 'E313', procedureName: 'Robotic Uvulopalatopharyngoplasty', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 8480, staffCost: 5940, implantCost: 0, consumablesCost: 2540, inpatientElective: 22360, avgTheatreTime: 471, avgLengthOfStay: 9, hrgCode: 'CA34A', tariff: 22360, lastUpdated: '2025-01' },
  'E314': { opcs4: 'E314', procedureName: 'Robotic Sleep Apnea Surgery', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 7150, staffCost: 5010, implantCost: 0, consumablesCost: 2150, inpatientElective: 20310, avgTheatreTime: 397, avgLengthOfStay: 10, hrgCode: 'CA31A', tariff: 20310, lastUpdated: '2025-01' },
  'E315': { opcs4: 'E315', procedureName: 'Robotic Laryngeal Scar Excision', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 8410, staffCost: 5890, implantCost: 0, consumablesCost: 2520, inpatientElective: 22820, avgTheatreTime: 467, avgLengthOfStay: 10, hrgCode: 'CA73A', tariff: 22820, lastUpdated: '2025-01' },
  'E316': { opcs4: 'E316', procedureName: 'Robotic Aryepiglottic Fold Tumor', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 8460, staffCost: 5920, implantCost: 0, consumablesCost: 2540, inpatientElective: 23520, avgTheatreTime: 470, avgLengthOfStay: 11, hrgCode: 'CA99A', tariff: 23520, lastUpdated: '2025-01' },
  'E317': { opcs4: 'E317', procedureName: 'Robotic Retropharyngeal Tumor', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 6350, staffCost: 4450, implantCost: 0, consumablesCost: 1910, inpatientElective: 18710, avgTheatreTime: 353, avgLengthOfStay: 10, hrgCode: 'CA20A', tariff: 18710, lastUpdated: '2025-01' },
  'E318': { opcs4: 'E318', procedureName: 'Robotic Laryngocele Excision', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 5800, staffCost: 4060, implantCost: 0, consumablesCost: 1740, inpatientElective: 17000, avgTheatreTime: 322, avgLengthOfStay: 9, hrgCode: 'CA69A', tariff: 17000, lastUpdated: '2025-01' },
  'E319': { opcs4: 'E319', procedureName: 'Robotic Thyroglossal Duct Cyst', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 6050, staffCost: 4240, implantCost: 0, consumablesCost: 1820, inpatientElective: 16910, avgTheatreTime: 336, avgLengthOfStay: 8, hrgCode: 'CA21A', tariff: 16910, lastUpdated: '2025-01' },
  'E320': { opcs4: 'E320', procedureName: 'Robotic Branchial Cyst Excision', specialty: 'ENT', subcategory: 'ENT Robotic', theatreCost: 8140, staffCost: 5700, implantCost: 0, consumablesCost: 2440, inpatientElective: 21680, avgTheatreTime: 452, avgLengthOfStay: 9, hrgCode: 'CA51A', tariff: 21680, lastUpdated: '2025-01' },


  // ============================================================================
  // EMERGENCY - Additional Financial Data
  // ============================================================================

  'T421': { opcs4: 'T421', procedureName: 'Emergency Laparotomy', specialty: 'Emergency', subcategory: '', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, inpatientEmergency: 370, avgTheatreTime: 30, avgLengthOfStay: 0, hrgCode: 'FZ51Z', tariff: 310, lastUpdated: '2025-01' },
  'T422': { opcs4: 'T422', procedureName: 'Laparotomy for Perforated Viscus', specialty: 'Emergency', subcategory: '', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, inpatientEmergency: 670, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'FZ35Z', tariff: 560, lastUpdated: '2025-01' },
  'G682': { opcs4: 'G682', procedureName: 'Emergency Bowel Resection', specialty: 'Emergency', subcategory: '', theatreCost: 2280, staffCost: 1600, implantCost: 0, consumablesCost: 680, inpatientElective: 6960, inpatientEmergency: 8350, avgTheatreTime: 190, avgLengthOfStay: 4, hrgCode: 'FZ47A', tariff: 6960, lastUpdated: '2025-01' },
  'T842': { opcs4: 'T842', procedureName: 'Emergency Splenectomy', specialty: 'Emergency', subcategory: '', theatreCost: 2080, staffCost: 1460, implantCost: 0, consumablesCost: 620, inpatientElective: 7760, inpatientEmergency: 9310, avgTheatreTime: 173, avgLengthOfStay: 6, hrgCode: 'FZ24A', tariff: 7760, lastUpdated: '2025-01' },
  'T423': { opcs4: 'T423', procedureName: 'Damage Control Laparotomy', specialty: 'Emergency', subcategory: '', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, inpatientEmergency: 460, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'FZ31Z', tariff: 380, lastUpdated: '2025-01' },
  'T212': { opcs4: 'T212', procedureName: 'Emergency Hernia Repair', specialty: 'Emergency', subcategory: '', theatreCost: 620, staffCost: 430, implantCost: 0, consumablesCost: 190, inpatientElective: 1840, inpatientEmergency: 2210, avgTheatreTime: 78, avgLengthOfStay: 1, hrgCode: 'FZ77B', tariff: 1840, lastUpdated: '2025-01' },
  'H114': { opcs4: 'H114', procedureName: 'Emergency Colostomy', specialty: 'Emergency', subcategory: '', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, inpatientEmergency: 340, avgTheatreTime: 27, avgLengthOfStay: 0, hrgCode: 'FZ44Z', tariff: 280, lastUpdated: '2025-01' },
  'E541': { opcs4: 'E541', procedureName: 'Trauma Thoracotomy', specialty: 'Emergency', subcategory: '', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, inpatientEmergency: 460, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'FZ61Z', tariff: 380, lastUpdated: '2025-01' },
  'E421': { opcs4: 'E421', procedureName: 'Emergency Tracheostomy', specialty: 'Emergency', subcategory: '', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, inpatientEmergency: 480, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'FZ66Z', tariff: 400, lastUpdated: '2025-01' },
  'T861': { opcs4: 'T861', procedureName: 'Fasciotomy', specialty: 'Emergency', subcategory: '', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, inpatientEmergency: 530, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'FZ66Z', tariff: 440, lastUpdated: '2025-01' },
  'T431': { opcs4: 'T431', procedureName: 'Peritoneal Lavage', specialty: 'Emergency', subcategory: '', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, inpatientEmergency: 670, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'FZ48Z', tariff: 560, lastUpdated: '2025-01' },
  'L511': { opcs4: 'L511', procedureName: 'Emergency Vascular Repair', specialty: 'Emergency', subcategory: '', theatreCost: 410, staffCost: 290, implantCost: 0, consumablesCost: 120, inpatientElective: 2020, inpatientEmergency: 2420, avgTheatreTime: 51, avgLengthOfStay: 2, hrgCode: 'FZ16B', tariff: 2020, lastUpdated: '2025-01' },
  'E081': { opcs4: 'E081', procedureName: 'Neck Exploration', specialty: 'Emergency', subcategory: '', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, inpatientEmergency: 550, avgTheatreTime: 46, avgLengthOfStay: 0, hrgCode: 'FZ19Z', tariff: 460, lastUpdated: '2025-01' },
  'E851': { opcs4: 'E851', procedureName: 'Emergency Chest Drain', specialty: 'Emergency', subcategory: '', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, inpatientEmergency: 310, avgTheatreTime: 26, avgLengthOfStay: 0, hrgCode: 'FZ62Z', tariff: 260, lastUpdated: '2025-01' },
  'T871': { opcs4: 'T871', procedureName: 'Abscess Incision and Drainage', specialty: 'Emergency', subcategory: '', theatreCost: 780, staffCost: 550, implantCost: 0, consumablesCost: 230, inpatientElective: 2160, inpatientEmergency: 2590, avgTheatreTime: 98, avgLengthOfStay: 1, hrgCode: 'FZ24B', tariff: 2160, lastUpdated: '2025-01' },
  'T441': { opcs4: 'T441', procedureName: 'Emergency Haemorrhage Control', specialty: 'Emergency', subcategory: '', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, inpatientEmergency: 370, avgTheatreTime: 29, avgLengthOfStay: 0, hrgCode: 'FZ30Z', tariff: 310, lastUpdated: '2025-01' },
  'G151': { opcs4: 'G151', procedureName: 'Oesophageal Foreign Body Removal', specialty: 'Emergency', subcategory: '', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, inpatientEmergency: 240, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'FZ41Z', tariff: 200, lastUpdated: '2025-01' },
  'G441': { opcs4: 'G441', procedureName: 'Gastric Decompression', specialty: 'Emergency', subcategory: '', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, inpatientEmergency: 340, avgTheatreTime: 27, avgLengthOfStay: 0, hrgCode: 'FZ66Z', tariff: 280, lastUpdated: '2025-01' },
  'J571': { opcs4: 'J571', procedureName: 'Emergency Pancreatic Drainage', specialty: 'Emergency', subcategory: '', theatreCost: 7970, staffCost: 5580, implantCost: 0, consumablesCost: 2390, inpatientElective: 22540, inpatientEmergency: 27050, avgTheatreTime: 443, avgLengthOfStay: 11, hrgCode: 'FZ97A', tariff: 22540, lastUpdated: '2025-01' },
  'H542': { opcs4: 'H542', procedureName: 'Perianal Sepsis Drainage', specialty: 'Emergency', subcategory: '', theatreCost: 580, staffCost: 410, implantCost: 0, consumablesCost: 170, inpatientElective: 1760, inpatientEmergency: 2110, avgTheatreTime: 72, avgLengthOfStay: 1, hrgCode: 'FZ23B', tariff: 1760, lastUpdated: '2025-01' },
  'N501': { opcs4: 'N501', procedureName: 'Testicular Torsion Repair', specialty: 'Emergency', subcategory: '', theatreCost: 440, staffCost: 310, implantCost: 0, consumablesCost: 130, inpatientElective: 1480, inpatientEmergency: 1780, avgTheatreTime: 55, avgLengthOfStay: 1, hrgCode: 'FZ31B', tariff: 1480, lastUpdated: '2025-01' },
  'T213': { opcs4: 'T213', procedureName: 'Incarcerated Hernia Reduction', specialty: 'Emergency', subcategory: '', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, inpatientEmergency: 370, avgTheatreTime: 30, avgLengthOfStay: 0, hrgCode: 'FZ65Z', tariff: 310, lastUpdated: '2025-01' },
  'G691': { opcs4: 'G691', procedureName: 'Bowel Perforation Repair', specialty: 'Emergency', subcategory: '', theatreCost: 810, staffCost: 570, implantCost: 0, consumablesCost: 240, inpatientElective: 2820, inpatientEmergency: 3380, avgTheatreTime: 101, avgLengthOfStay: 2, hrgCode: 'FZ23B', tariff: 2820, lastUpdated: '2025-01' },
  'G323': { opcs4: 'G323', procedureName: 'Emergency Gastric Surgery', specialty: 'Emergency', subcategory: '', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, inpatientEmergency: 480, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'FZ21Z', tariff: 400, lastUpdated: '2025-01' },
  'H076': { opcs4: 'H076', procedureName: 'Emergency Colectomy', specialty: 'Emergency', subcategory: '', theatreCost: 1790, staffCost: 1250, implantCost: 0, consumablesCost: 540, inpatientElective: 6580, inpatientEmergency: 7900, avgTheatreTime: 149, avgLengthOfStay: 5, hrgCode: 'FZ49A', tariff: 6580, lastUpdated: '2025-01' },
  'T424': { opcs4: 'T424', procedureName: 'Abdominal Compartment Decompression', specialty: 'Emergency', subcategory: '', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, inpatientEmergency: 380, avgTheatreTime: 32, avgLengthOfStay: 0, hrgCode: 'FZ78Z', tariff: 320, lastUpdated: '2025-01' },
  'H151': { opcs4: 'H151', procedureName: 'Emergency Volvulus Reduction', specialty: 'Emergency', subcategory: '', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, inpatientEmergency: 580, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'FZ87Z', tariff: 480, lastUpdated: '2025-01' },
  'T425': { opcs4: 'T425', procedureName: 'Penetrating Abdominal Trauma', specialty: 'Emergency', subcategory: '', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, inpatientEmergency: 380, avgTheatreTime: 32, avgLengthOfStay: 0, hrgCode: 'FZ55Z', tariff: 320, lastUpdated: '2025-01' },
  'M451': { opcs4: 'M451', procedureName: 'Emergency Urinary Catheterization', specialty: 'Emergency', subcategory: '', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, inpatientEmergency: 260, avgTheatreTime: 22, avgLengthOfStay: 0, hrgCode: 'FZ80Z', tariff: 220, lastUpdated: '2025-01' },


  // ============================================================================
  // ENDOSCOPY - Additional Financial Data
  // ============================================================================

  // Endoscopic Retrograde Cholangiopancreatography
  'J586': { opcs4: 'J586', procedureName: 'ERCP with Pancreatic Duct Stenting', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 5670, staffCost: 3970, implantCost: 3090, consumablesCost: 1700, inpatientElective: 20430, avgTheatreTime: 315, avgLengthOfStay: 10, hrgCode: 'FZ90A', tariff: 20430, lastUpdated: '2025-01' },
  'J587': { opcs4: 'J587', procedureName: 'ERCP with Biopsy', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 780, staffCost: 550, implantCost: 0, consumablesCost: 230, inpatientElective: 2160, avgTheatreTime: 97, avgLengthOfStay: 1, hrgCode: 'FZ13B', tariff: 2160, lastUpdated: '2025-01' },
  'J588': { opcs4: 'J588', procedureName: 'ERCP with Lithotripsy', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'FZ22Z', tariff: 380, lastUpdated: '2025-01' },
  'J589': { opcs4: 'J589', procedureName: 'ERCP for Biliary Leak', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'FZ90Z', tariff: 580, lastUpdated: '2025-01' },
  'J590': { opcs4: 'J590', procedureName: 'ERCP with Metal Stent', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 110, staffCost: 80, implantCost: 710, consumablesCost: 30, dayCase: 930, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'FZ35Z', tariff: 930, lastUpdated: '2025-01' },
  'J591': { opcs4: 'J591', procedureName: 'ERCP with Plastic Stent Removal', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 260, staffCost: 180, implantCost: 1450, consumablesCost: 80, dayCase: 1970, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'FZ79Z', tariff: 1970, lastUpdated: '2025-01' },
  'J592': { opcs4: 'J592', procedureName: 'ERCP for Ampullary Tumor', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'FZ47Z', tariff: 220, lastUpdated: '2025-01' },
  'J593': { opcs4: 'J593', procedureName: 'ERCP for Stricture Dilatation', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 26, avgLengthOfStay: 0, hrgCode: 'FZ45Z', tariff: 260, lastUpdated: '2025-01' },
  'J594': { opcs4: 'J594', procedureName: 'ERCP with Cholangioscopy', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 50, avgLengthOfStay: 0, hrgCode: 'FZ19Z', tariff: 510, lastUpdated: '2025-01' },
  'J595': { opcs4: 'J595', procedureName: 'ERCP for Pancreatitis', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 8460, staffCost: 5920, implantCost: 0, consumablesCost: 2540, inpatientElective: 23520, avgTheatreTime: 470, avgLengthOfStay: 11, hrgCode: 'FZ96A', tariff: 23520, lastUpdated: '2025-01' },
  'J596': { opcs4: 'J596', procedureName: 'ERCP Double Balloon Enteroscopy', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'FZ11Z', tariff: 600, lastUpdated: '2025-01' },
  'J597': { opcs4: 'J597', procedureName: 'ERCP with Papillectomy', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 1580, staffCost: 1110, implantCost: 0, consumablesCost: 470, inpatientElective: 6160, avgTheatreTime: 132, avgLengthOfStay: 5, hrgCode: 'FZ63A', tariff: 6160, lastUpdated: '2025-01' },
  'J598': { opcs4: 'J598', procedureName: 'ERCP for Cholangiocarcinoma', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'FZ75Z', tariff: 200, lastUpdated: '2025-01' },
  'J599': { opcs4: 'J599', procedureName: 'ERCP with Nasobiliary Drain', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 41, avgLengthOfStay: 0, hrgCode: 'FZ28Z', tariff: 420, lastUpdated: '2025-01' },
  'J600': { opcs4: 'J600', procedureName: 'ERCP for Mirizzi Syndrome', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'FZ19Z', tariff: 460, lastUpdated: '2025-01' },
  'J601': { opcs4: 'J601', procedureName: 'ERCP with Precut Sphincterotomy', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'FZ21Z', tariff: 360, lastUpdated: '2025-01' },
  'J602': { opcs4: 'J602', procedureName: 'ERCP for Primary Sclerosing Cholangitis', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'FZ99Z', tariff: 480, lastUpdated: '2025-01' },
  'J603': { opcs4: 'J603', procedureName: 'ERCP with Radiofrequency Ablation', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 23, avgLengthOfStay: 0, hrgCode: 'FZ69Z', tariff: 240, lastUpdated: '2025-01' },
  'J604': { opcs4: 'J604', procedureName: 'ERCP for Chronic Pancreatitis', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 6640, staffCost: 4650, implantCost: 0, consumablesCost: 1990, inpatientElective: 18680, avgTheatreTime: 369, avgLengthOfStay: 9, hrgCode: 'FZ17A', tariff: 18680, lastUpdated: '2025-01' },
  'J605': { opcs4: 'J605', procedureName: 'ERCP with Multiple Stents', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 280, staffCost: 200, implantCost: 900, consumablesCost: 80, dayCase: 1460, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'FZ32Z', tariff: 1460, lastUpdated: '2025-01' },
  'J606': { opcs4: 'J606', procedureName: 'ERCP for Post-Cholecystectomy Syndrome', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 2410, staffCost: 1690, implantCost: 0, consumablesCost: 720, inpatientElective: 7220, avgTheatreTime: 201, avgLengthOfStay: 4, hrgCode: 'FZ68A', tariff: 7220, lastUpdated: '2025-01' },
  'J607': { opcs4: 'J607', procedureName: 'ERCP with Intraductal Ultrasound', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'FZ29Z', tariff: 460, lastUpdated: '2025-01' },
  'J608': { opcs4: 'J608', procedureName: 'ERCP for Biliary Fistula', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'FZ48Z', tariff: 320, lastUpdated: '2025-01' },
  'J609': { opcs4: 'J609', procedureName: 'ERCP Hemostasis', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 48, avgLengthOfStay: 0, hrgCode: 'FZ61Z', tariff: 480, lastUpdated: '2025-01' },
  'J610': { opcs4: 'J610', procedureName: 'ERCP Pancreatic Pseudocyst Drainage', specialty: 'Endoscopy', subcategory: 'Endoscopic Retrograde Cholangiopancreatography', theatreCost: 7540, staffCost: 5280, implantCost: 0, consumablesCost: 2260, inpatientElective: 21080, avgTheatreTime: 419, avgLengthOfStay: 10, hrgCode: 'FZ63A', tariff: 21080, lastUpdated: '2025-01' },

  // Gastroscopy and Colonoscopy
  'G453': { opcs4: 'G453', procedureName: 'Gastric Polypectomy', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 2700, staffCost: 1890, implantCost: 0, consumablesCost: 810, inpatientElective: 7800, avgTheatreTime: 225, avgLengthOfStay: 4, hrgCode: 'FZ34A', tariff: 7800, lastUpdated: '2025-01' },
  'G454': { opcs4: 'G454', procedureName: 'Oesophageal Dilatation', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 33, avgLengthOfStay: 0, hrgCode: 'FZ76Z', tariff: 340, lastUpdated: '2025-01' },
  'G455': { opcs4: 'G455', procedureName: 'PEG Insertion', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'FZ30Z', tariff: 580, lastUpdated: '2025-01' },
  'G456': { opcs4: 'G456', procedureName: 'Upper GI Bleeding Control', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 33, avgLengthOfStay: 0, hrgCode: 'FZ87Z', tariff: 340, lastUpdated: '2025-01' },
  'H223': { opcs4: 'H223', procedureName: 'Lower GI Bleeding Control', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'FZ31Z', tariff: 440, lastUpdated: '2025-01' },
  'G457': { opcs4: 'G457', procedureName: 'Endoscopic Mucosal Resection Upper GI', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 2840, staffCost: 1990, implantCost: 0, consumablesCost: 850, inpatientElective: 9280, avgTheatreTime: 237, avgLengthOfStay: 6, hrgCode: 'FZ70A', tariff: 9280, lastUpdated: '2025-01' },
  'H224': { opcs4: 'H224', procedureName: 'Endoscopic Mucosal Resection Colon', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 2140, staffCost: 1500, implantCost: 0, consumablesCost: 640, inpatientElective: 6680, avgTheatreTime: 178, avgLengthOfStay: 4, hrgCode: 'FZ76A', tariff: 6680, lastUpdated: '2025-01' },
  'G458': { opcs4: 'G458', procedureName: 'Endoscopic Submucosal Dissection Upper GI', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'FZ43Z', tariff: 320, lastUpdated: '2025-01' },
  'H225': { opcs4: 'H225', procedureName: 'Endoscopic Submucosal Dissection Colon', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 43, avgLengthOfStay: 0, hrgCode: 'FZ76Z', tariff: 440, lastUpdated: '2025-01' },
  'H226': { opcs4: 'H226', procedureName: 'Flexible Sigmoidoscopy', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 46, avgLengthOfStay: 0, hrgCode: 'FZ40Z', tariff: 460, lastUpdated: '2025-01' },
  'G459': { opcs4: 'G459', procedureName: 'Capsule Endoscopy', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 49, avgLengthOfStay: 0, hrgCode: 'FZ26Z', tariff: 510, lastUpdated: '2025-01' },
  'G460': { opcs4: 'G460', procedureName: 'Double Balloon Enteroscopy', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 32, avgLengthOfStay: 0, hrgCode: 'FZ23Z', tariff: 320, lastUpdated: '2025-01' },
  'G461': { opcs4: 'G461', procedureName: 'Oesophageal Stenting', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 210, staffCost: 150, implantCost: 980, consumablesCost: 60, dayCase: 1400, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'FZ14Z', tariff: 1400, lastUpdated: '2025-01' },
  'H227': { opcs4: 'H227', procedureName: 'Colonic Stenting', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 220, staffCost: 150, implantCost: 600, consumablesCost: 70, dayCase: 1040, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'FZ99Z', tariff: 1040, lastUpdated: '2025-01' },
  'G462': { opcs4: 'G462', procedureName: 'Gastric Foreign Body Removal', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'FZ36Z', tariff: 200, lastUpdated: '2025-01' },
  'H228': { opcs4: 'H228', procedureName: 'Colonic Foreign Body Removal', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 22, avgLengthOfStay: 0, hrgCode: 'FZ21Z', tariff: 220, lastUpdated: '2025-01' },
  'G463': { opcs4: 'G463', procedureName: 'Endoscopic Ultrasound', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'FZ11Z', tariff: 420, lastUpdated: '2025-01' },
  'G464': { opcs4: 'G464', procedureName: 'EUS-Guided Fine Needle Aspiration', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'FZ86Z', tariff: 360, lastUpdated: '2025-01' },
  'G465': { opcs4: 'G465', procedureName: 'Gastric Botox Injection', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 49, avgLengthOfStay: 0, hrgCode: 'FZ93Z', tariff: 510, lastUpdated: '2025-01' },
  'G466': { opcs4: 'G466', procedureName: 'Percutaneous Endoscopic Jejunostomy', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'FZ50Z', tariff: 320, lastUpdated: '2025-01' },
  'G467': { opcs4: 'G467', procedureName: 'Argon Plasma Coagulation', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'FZ24Z', tariff: 580, lastUpdated: '2025-01' },
  'G468': { opcs4: 'G468', procedureName: 'Zenker Diverticulum Treatment', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'FZ80Z', tariff: 480, lastUpdated: '2025-01' },
  'G469': { opcs4: 'G469', procedureName: 'Peroral Endoscopic Myotomy', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 48, avgLengthOfStay: 0, hrgCode: 'FZ62Z', tariff: 480, lastUpdated: '2025-01' },
  'H229': { opcs4: 'H229', procedureName: 'Endoscopic Retrograde Appendicitis Therapy', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'FZ38Z', tariff: 580, lastUpdated: '2025-01' },
  'G470': { opcs4: 'G470', procedureName: 'Endoscopic Full Thickness Resection', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 1500, staffCost: 1050, implantCost: 0, consumablesCost: 450, inpatientElective: 4800, avgTheatreTime: 125, avgLengthOfStay: 3, hrgCode: 'FZ83A', tariff: 4800, lastUpdated: '2025-01' },
  'H230': { opcs4: 'H230', procedureName: 'Rectal Biopsy', specialty: 'Endoscopy', subcategory: 'Gastroscopy and Colonoscopy', theatreCost: 550, staffCost: 390, implantCost: 0, consumablesCost: 170, inpatientElective: 2310, avgTheatreTime: 69, avgLengthOfStay: 2, hrgCode: 'FZ75B', tariff: 2310, lastUpdated: '2025-01' },


  // ============================================================================
  // GENERAL SURGERY - Additional Financial Data
  // ============================================================================

  // Colorectal
  'H072': { opcs4: 'H072', procedureName: 'Left Hemicolectomy', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 1460, staffCost: 1020, implantCost: 0, consumablesCost: 440, inpatientElective: 5920, avgTheatreTime: 122, avgLengthOfStay: 5, hrgCode: 'FZ19A', tariff: 5920, lastUpdated: '2025-01' },
  'H073': { opcs4: 'H073', procedureName: 'Sigmoid Colectomy', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 2270, staffCost: 1590, implantCost: 0, consumablesCost: 680, inpatientElective: 6940, avgTheatreTime: 189, avgLengthOfStay: 4, hrgCode: 'FZ59A', tariff: 6940, lastUpdated: '2025-01' },
  'H074': { opcs4: 'H074', procedureName: 'Total Colectomy', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 2680, staffCost: 1880, implantCost: 0, consumablesCost: 800, inpatientElective: 7760, avgTheatreTime: 223, avgLengthOfStay: 4, hrgCode: 'FZ61A', tariff: 7760, lastUpdated: '2025-01' },
  'H332': { opcs4: 'H332', procedureName: 'Abdominoperineal Resection', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 1860, staffCost: 1300, implantCost: 0, consumablesCost: 560, inpatientElective: 6120, avgTheatreTime: 155, avgLengthOfStay: 4, hrgCode: 'FZ66A', tariff: 6120, lastUpdated: '2025-01' },
  'H333': { opcs4: 'H333', procedureName: 'Hartmann Procedure', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 38, avgLengthOfStay: 0, hrgCode: 'FZ52Z', tariff: 380, lastUpdated: '2025-01' },
  'H111': { opcs4: 'H111', procedureName: 'Colostomy Formation', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 34, avgLengthOfStay: 0, hrgCode: 'FZ83Z', tariff: 340, lastUpdated: '2025-01' },
  'H112': { opcs4: 'H112', procedureName: 'Ileostomy Formation', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 22, avgLengthOfStay: 0, hrgCode: 'FZ48Z', tariff: 220, lastUpdated: '2025-01' },
  'H121': { opcs4: 'H121', procedureName: 'Stoma Reversal', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'FZ16Z', tariff: 320, lastUpdated: '2025-01' },
  'H521': { opcs4: 'H521', procedureName: 'Fissurectomy', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 2690, staffCost: 1880, implantCost: 0, consumablesCost: 810, inpatientElective: 7780, avgTheatreTime: 224, avgLengthOfStay: 4, hrgCode: 'FZ30A', tariff: 7780, lastUpdated: '2025-01' },
  'H531': { opcs4: 'H531', procedureName: 'Fistulotomy', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 43, avgLengthOfStay: 0, hrgCode: 'FZ57Z', tariff: 440, lastUpdated: '2025-01' },
  'H341': { opcs4: 'H341', procedureName: 'Proctectomy', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 2720, staffCost: 1900, implantCost: 0, consumablesCost: 820, inpatientElective: 7840, avgTheatreTime: 227, avgLengthOfStay: 4, hrgCode: 'FZ51A', tariff: 7840, lastUpdated: '2025-01' },
  'H351': { opcs4: 'H351', procedureName: 'Rectopexy', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 38, avgLengthOfStay: 0, hrgCode: 'FZ37Z', tariff: 380, lastUpdated: '2025-01' },
  'H012': { opcs4: 'H012', procedureName: 'Laparoscopic Appendicectomy', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 2720, staffCost: 1900, implantCost: 0, consumablesCost: 820, inpatientElective: 7240, avgTheatreTime: 227, avgLengthOfStay: 3, hrgCode: 'FZ99A', tariff: 7240, lastUpdated: '2025-01' },
  'G681': { opcs4: 'G681', procedureName: 'Small Bowel Resection', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 2700, staffCost: 1890, implantCost: 0, consumablesCost: 810, inpatientElective: 7800, avgTheatreTime: 225, avgLengthOfStay: 4, hrgCode: 'FZ49A', tariff: 7800, lastUpdated: '2025-01' },
  'H131': { opcs4: 'H131', procedureName: 'Bowel Obstruction Relief', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 30, avgLengthOfStay: 0, hrgCode: 'FZ15Z', tariff: 310, lastUpdated: '2025-01' },
  'H201': { opcs4: 'H201', procedureName: 'Colonic Polyp Removal', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'FZ71Z', tariff: 560, lastUpdated: '2025-01' },
  'S581': { opcs4: 'S581', procedureName: 'Pilonidal Sinus Excision', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 52, avgLengthOfStay: 0, hrgCode: 'FZ96Z', tariff: 520, lastUpdated: '2025-01' },
  'H541': { opcs4: 'H541', procedureName: 'Perianal Abscess Drainage', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 440, staffCost: 310, implantCost: 0, consumablesCost: 130, inpatientElective: 1480, avgTheatreTime: 55, avgLengthOfStay: 1, hrgCode: 'FZ28B', tariff: 1480, lastUpdated: '2025-01' },
  'H352': { opcs4: 'H352', procedureName: 'Rectal Prolapse Surgery', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'FZ64Z', tariff: 380, lastUpdated: '2025-01' },
  'H141': { opcs4: 'H141', procedureName: 'Colonic Stricture Dilatation', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'FZ16Z', tariff: 220, lastUpdated: '2025-01' },
  'H075': { opcs4: 'H075', procedureName: 'Ileocolic Resection', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 2390, staffCost: 1670, implantCost: 0, consumablesCost: 720, inpatientElective: 7780, avgTheatreTime: 199, avgLengthOfStay: 5, hrgCode: 'FZ50A', tariff: 7780, lastUpdated: '2025-01' },
  'H381': { opcs4: 'H381', procedureName: 'Transanal Endoscopic Microsurgery', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'FZ46Z', tariff: 420, lastUpdated: '2025-01' },
  'H342': { opcs4: 'H342', procedureName: 'Rectal Cancer Excision', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'FZ38Z', tariff: 280, lastUpdated: '2025-01' },
  'H113': { opcs4: 'H113', procedureName: 'Diverting Loop Ileostomy', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'FZ26Z', tariff: 420, lastUpdated: '2025-01' },
  'H211': { opcs4: 'H211', procedureName: 'Colonic Perforation Repair', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 520, staffCost: 360, implantCost: 0, consumablesCost: 160, inpatientElective: 2240, avgTheatreTime: 65, avgLengthOfStay: 2, hrgCode: 'FZ48B', tariff: 2240, lastUpdated: '2025-01' },
  'H391': { opcs4: 'H391', procedureName: 'Ileoanal Pouch', specialty: 'General Surgery', subcategory: 'Colorectal', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 22, avgLengthOfStay: 0, hrgCode: 'FZ64Z', tariff: 220, lastUpdated: '2025-01' },

  // Hepatobiliary
  'J021': { opcs4: 'J021', procedureName: 'Liver Resection', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 8620, staffCost: 6030, implantCost: 0, consumablesCost: 2590, inpatientElective: 24440, avgTheatreTime: 479, avgLengthOfStay: 12, hrgCode: 'FZ96A', tariff: 24440, lastUpdated: '2025-01' },
  'J022': { opcs4: 'J022', procedureName: 'Right Hepatectomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 2760, staffCost: 1930, implantCost: 0, consumablesCost: 830, inpatientElective: 8520, avgTheatreTime: 230, avgLengthOfStay: 5, hrgCode: 'FZ55A', tariff: 8520, lastUpdated: '2025-01' },
  'J023': { opcs4: 'J023', procedureName: 'Left Hepatectomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 1460, staffCost: 1020, implantCost: 0, consumablesCost: 440, inpatientElective: 6520, avgTheatreTime: 122, avgLengthOfStay: 6, hrgCode: 'FZ31A', tariff: 6520, lastUpdated: '2025-01' },
  'J041': { opcs4: 'J041', procedureName: 'Liver Transplant', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 6430, staffCost: 4500, implantCost: 0, consumablesCost: 1930, inpatientElective: 18260, avgTheatreTime: 357, avgLengthOfStay: 9, hrgCode: 'FZ44A', tariff: 18260, lastUpdated: '2025-01' },
  'J221': { opcs4: 'J221', procedureName: 'Bile Duct Exploration', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 48, avgLengthOfStay: 0, hrgCode: 'FZ27Z', tariff: 480, lastUpdated: '2025-01' },
  'J231': { opcs4: 'J231', procedureName: 'Biliary Drainage', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 800, staffCost: 560, implantCost: 0, consumablesCost: 240, inpatientElective: 2800, avgTheatreTime: 100, avgLengthOfStay: 2, hrgCode: 'FZ63B', tariff: 2800, lastUpdated: '2025-01' },
  'J241': { opcs4: 'J241', procedureName: 'Choledochotomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'FZ56Z', tariff: 280, lastUpdated: '2025-01' },
  'J251': { opcs4: 'J251', procedureName: 'Hepaticojejunostomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'FZ82Z', tariff: 540, lastUpdated: '2025-01' },
  'J061': { opcs4: 'J061', procedureName: 'Liver Cyst Excision', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'FZ70Z', tariff: 380, lastUpdated: '2025-01' },
  'J071': { opcs4: 'J071', procedureName: 'Liver Abscess Drainage', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 460, staffCost: 320, implantCost: 0, consumablesCost: 140, inpatientElective: 2120, avgTheatreTime: 58, avgLengthOfStay: 2, hrgCode: 'FZ80B', tariff: 2120, lastUpdated: '2025-01' },
  'J261': { opcs4: 'J261', procedureName: 'Bile Duct Reconstruction', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 1540, staffCost: 1080, implantCost: 0, consumablesCost: 460, inpatientElective: 4880, avgTheatreTime: 128, avgLengthOfStay: 3, hrgCode: 'FZ16A', tariff: 4880, lastUpdated: '2025-01' },
  'J191': { opcs4: 'J191', procedureName: 'Cholecystostomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'FZ35Z', tariff: 220, lastUpdated: '2025-01' },
  'J222': { opcs4: 'J222', procedureName: 'Laparoscopic CBD Exploration', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'FZ56Z', tariff: 520, lastUpdated: '2025-01' },
  'J232': { opcs4: 'J232', procedureName: 'Biliary Stenting', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 200, staffCost: 140, implantCost: 500, consumablesCost: 60, dayCase: 900, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'FZ12Z', tariff: 900, lastUpdated: '2025-01' },
  'L713': { opcs4: 'L713', procedureName: 'Hepatic Artery Embolization', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 49, avgLengthOfStay: 0, hrgCode: 'FZ23Z', tariff: 510, lastUpdated: '2025-01' },
  'L714': { opcs4: 'L714', procedureName: 'Portal Vein Embolization', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 38, avgLengthOfStay: 0, hrgCode: 'FZ35Z', tariff: 380, lastUpdated: '2025-01' },
  'J081': { opcs4: 'J081', procedureName: 'Liver Biopsy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 830, staffCost: 580, implantCost: 0, consumablesCost: 250, inpatientElective: 2860, avgTheatreTime: 104, avgLengthOfStay: 2, hrgCode: 'FZ23B', tariff: 2860, lastUpdated: '2025-01' },
  'J091': { opcs4: 'J091', procedureName: 'Radiofrequency Ablation Liver', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'FZ24Z', tariff: 280, lastUpdated: '2025-01' },
  'J092': { opcs4: 'J092', procedureName: 'Microwave Ablation Liver', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'FZ84Z', tariff: 240, lastUpdated: '2025-01' },
  'J192': { opcs4: 'J192', procedureName: 'Gallbladder Drainage Tube', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 530, staffCost: 370, implantCost: 0, consumablesCost: 160, inpatientElective: 2260, avgTheatreTime: 66, avgLengthOfStay: 2, hrgCode: 'FZ64B', tariff: 2260, lastUpdated: '2025-01' },
  'J271': { opcs4: 'J271', procedureName: 'Biliary Sphincterotomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 29, avgLengthOfStay: 0, hrgCode: 'FZ23Z', tariff: 310, lastUpdated: '2025-01' },
  'J252': { opcs4: 'J252', procedureName: 'Choledochojejunostomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 52, avgLengthOfStay: 0, hrgCode: 'FZ41Z', tariff: 520, lastUpdated: '2025-01' },
  'J024': { opcs4: 'J024', procedureName: 'Liver Metastasectomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 1760, staffCost: 1230, implantCost: 0, consumablesCost: 530, inpatientElective: 5920, avgTheatreTime: 147, avgLengthOfStay: 4, hrgCode: 'FZ51A', tariff: 5920, lastUpdated: '2025-01' },
  'J025': { opcs4: 'J025', procedureName: 'Hepatic Lobectomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 2350, staffCost: 1650, implantCost: 0, consumablesCost: 710, inpatientElective: 6510, avgTheatreTime: 196, avgLengthOfStay: 3, hrgCode: 'FZ74A', tariff: 6510, lastUpdated: '2025-01' },
  'J281': { opcs4: 'J281', procedureName: 'Bile Duct Stone Removal', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 50, avgLengthOfStay: 0, hrgCode: 'FZ44Z', tariff: 510, lastUpdated: '2025-01' },
  'J253': { opcs4: 'J253', procedureName: 'Kasai Procedure', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 56, avgLengthOfStay: 0, hrgCode: 'FZ26Z', tariff: 560, lastUpdated: '2025-01' },
  'J062': { opcs4: 'J062', procedureName: 'Liver Hydatid Cyst Removal', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'FZ86Z', tariff: 460, lastUpdated: '2025-01' },
  'J291': { opcs4: 'J291', procedureName: 'Biliary Fistula Repair', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 560, staffCost: 390, implantCost: 0, consumablesCost: 170, inpatientElective: 1720, avgTheatreTime: 70, avgLengthOfStay: 1, hrgCode: 'FZ60B', tariff: 1720, lastUpdated: '2025-01' },
  'J026': { opcs4: 'J026', procedureName: 'Liver Segmentectomy', specialty: 'General Surgery', subcategory: 'Hepatobiliary', theatreCost: 1970, staffCost: 1380, implantCost: 0, consumablesCost: 590, inpatientElective: 7540, avgTheatreTime: 164, avgLengthOfStay: 6, hrgCode: 'FZ51A', tariff: 7540, lastUpdated: '2025-01' },

  // Hyperthermic Intraperitoneal Chemotherapy
  'X651': { opcs4: 'X651', procedureName: 'HIPEC Cytoreductive Surgery', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 8260, staffCost: 5780, implantCost: 0, consumablesCost: 2480, inpatientElective: 21320, avgTheatreTime: 459, avgLengthOfStay: 8, hrgCode: 'FZ75A', tariff: 21320, lastUpdated: '2025-01' },
  'X652': { opcs4: 'X652', procedureName: 'HIPEC for Peritoneal Carcinomatosis', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6700, staffCost: 4690, implantCost: 0, consumablesCost: 2010, inpatientElective: 20000, avgTheatreTime: 372, avgLengthOfStay: 11, hrgCode: 'FZ47A', tariff: 20000, lastUpdated: '2025-01' },
  'X653': { opcs4: 'X653', procedureName: 'HIPEC for Ovarian Cancer', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6260, staffCost: 4380, implantCost: 0, consumablesCost: 1880, inpatientElective: 19720, avgTheatreTime: 348, avgLengthOfStay: 12, hrgCode: 'FZ51A', tariff: 19720, lastUpdated: '2025-01' },
  'X654': { opcs4: 'X654', procedureName: 'HIPEC for Colorectal Cancer', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 5670, staffCost: 3970, implantCost: 0, consumablesCost: 1700, inpatientElective: 16740, avgTheatreTime: 315, avgLengthOfStay: 9, hrgCode: 'FZ77A', tariff: 16740, lastUpdated: '2025-01' },
  'X655': { opcs4: 'X655', procedureName: 'HIPEC for Gastric Cancer', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6210, staffCost: 4350, implantCost: 0, consumablesCost: 1860, inpatientElective: 18420, avgTheatreTime: 345, avgLengthOfStay: 10, hrgCode: 'FZ99A', tariff: 18420, lastUpdated: '2025-01' },
  'X656': { opcs4: 'X656', procedureName: 'HIPEC for Appendiceal Cancer', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 7740, staffCost: 5420, implantCost: 0, consumablesCost: 2320, inpatientElective: 22080, avgTheatreTime: 430, avgLengthOfStay: 11, hrgCode: 'FZ74A', tariff: 22080, lastUpdated: '2025-01' },
  'X657': { opcs4: 'X657', procedureName: 'HIPEC for Mesothelioma', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6840, staffCost: 4790, implantCost: 0, consumablesCost: 2050, inpatientElective: 20880, avgTheatreTime: 380, avgLengthOfStay: 12, hrgCode: 'FZ22A', tariff: 20880, lastUpdated: '2025-01' },
  'X658': { opcs4: 'X658', procedureName: 'HIPEC with Omentectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 8050, staffCost: 5640, implantCost: 0, consumablesCost: 2420, inpatientElective: 22710, avgTheatreTime: 447, avgLengthOfStay: 11, hrgCode: 'FZ39A', tariff: 22710, lastUpdated: '2025-01' },
  'X659': { opcs4: 'X659', procedureName: 'HIPEC with Peritonectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 5720, staffCost: 4000, implantCost: 0, consumablesCost: 1720, inpatientElective: 16240, avgTheatreTime: 318, avgLengthOfStay: 8, hrgCode: 'FZ64A', tariff: 16240, lastUpdated: '2025-01' },
  'X660': { opcs4: 'X660', procedureName: 'HIPEC with Splenectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6300, staffCost: 4410, implantCost: 0, consumablesCost: 1890, inpatientElective: 19800, avgTheatreTime: 350, avgLengthOfStay: 12, hrgCode: 'FZ48A', tariff: 19800, lastUpdated: '2025-01' },
  'X661': { opcs4: 'X661', procedureName: 'HIPEC with Diaphragm Stripping', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 7220, staffCost: 5050, implantCost: 0, consumablesCost: 2170, inpatientElective: 19240, avgTheatreTime: 401, avgLengthOfStay: 8, hrgCode: 'FZ49A', tariff: 19240, lastUpdated: '2025-01' },
  'X662': { opcs4: 'X662', procedureName: 'HIPEC with Bowel Resection', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6820, staffCost: 4770, implantCost: 0, consumablesCost: 2050, inpatientElective: 20840, avgTheatreTime: 379, avgLengthOfStay: 12, hrgCode: 'FZ73A', tariff: 20840, lastUpdated: '2025-01' },
  'X663': { opcs4: 'X663', procedureName: 'HIPEC with Colectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 7110, staffCost: 4980, implantCost: 0, consumablesCost: 2130, inpatientElective: 21420, avgTheatreTime: 395, avgLengthOfStay: 12, hrgCode: 'FZ24A', tariff: 21420, lastUpdated: '2025-01' },
  'X664': { opcs4: 'X664', procedureName: 'HIPEC with Hysterectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 5760, staffCost: 4030, implantCost: 0, consumablesCost: 1730, inpatientElective: 16320, avgTheatreTime: 320, avgLengthOfStay: 8, hrgCode: 'FZ28A', tariff: 16320, lastUpdated: '2025-01' },
  'X665': { opcs4: 'X665', procedureName: 'HIPEC for Pseudomyxoma Peritonei', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6280, staffCost: 4400, implantCost: 0, consumablesCost: 1880, inpatientElective: 17360, avgTheatreTime: 349, avgLengthOfStay: 8, hrgCode: 'FZ49A', tariff: 17360, lastUpdated: '2025-01' },
  'X666': { opcs4: 'X666', procedureName: 'HIPEC with Liver Resection', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6390, staffCost: 4470, implantCost: 0, consumablesCost: 1920, inpatientElective: 18180, avgTheatreTime: 355, avgLengthOfStay: 9, hrgCode: 'FZ81A', tariff: 18180, lastUpdated: '2025-01' },
  'X667': { opcs4: 'X667', procedureName: 'HIPEC Second Look Surgery', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 5510, staffCost: 3860, implantCost: 0, consumablesCost: 1650, inpatientElective: 16420, avgTheatreTime: 306, avgLengthOfStay: 9, hrgCode: 'FZ78A', tariff: 16420, lastUpdated: '2025-01' },
  'X668': { opcs4: 'X668', procedureName: 'HIPEC with Cholecystectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6950, staffCost: 4870, implantCost: 0, consumablesCost: 2090, inpatientElective: 19910, avgTheatreTime: 386, avgLengthOfStay: 10, hrgCode: 'FZ66A', tariff: 19910, lastUpdated: '2025-01' },
  'X669': { opcs4: 'X669', procedureName: 'HIPEC Palliative', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6460, staffCost: 4520, implantCost: 0, consumablesCost: 1940, inpatientElective: 20120, avgTheatreTime: 359, avgLengthOfStay: 12, hrgCode: 'FZ54A', tariff: 20120, lastUpdated: '2025-01' },
  'X670': { opcs4: 'X670', procedureName: 'HIPEC with Pelvic Peritonectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 7670, staffCost: 5370, implantCost: 0, consumablesCost: 2300, inpatientElective: 21940, avgTheatreTime: 426, avgLengthOfStay: 11, hrgCode: 'FZ73A', tariff: 21940, lastUpdated: '2025-01' },
  'X671': { opcs4: 'X671', procedureName: 'HIPEC with Lesser Sac Peritonectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 7940, staffCost: 5560, implantCost: 0, consumablesCost: 2380, inpatientElective: 21880, avgTheatreTime: 441, avgLengthOfStay: 10, hrgCode: 'FZ35A', tariff: 21880, lastUpdated: '2025-01' },
  'X672': { opcs4: 'X672', procedureName: 'HIPEC with Greater Omentectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 5940, staffCost: 4160, implantCost: 0, consumablesCost: 1780, inpatientElective: 17280, avgTheatreTime: 330, avgLengthOfStay: 9, hrgCode: 'FZ72A', tariff: 17280, lastUpdated: '2025-01' },
  'X673': { opcs4: 'X673', procedureName: 'HIPEC with Glisson Capsule Resection', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 8060, staffCost: 5640, implantCost: 0, consumablesCost: 2420, inpatientElective: 20920, avgTheatreTime: 448, avgLengthOfStay: 8, hrgCode: 'FZ29A', tariff: 20920, lastUpdated: '2025-01' },
  'X674': { opcs4: 'X674', procedureName: 'HIPEC with Partial Gastrectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 5720, staffCost: 4000, implantCost: 0, consumablesCost: 1720, inpatientElective: 16840, avgTheatreTime: 318, avgLengthOfStay: 9, hrgCode: 'FZ20A', tariff: 16840, lastUpdated: '2025-01' },
  'X675': { opcs4: 'X675', procedureName: 'HIPEC Adjuvant Therapy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 7670, staffCost: 5370, implantCost: 0, consumablesCost: 2300, inpatientElective: 20140, avgTheatreTime: 426, avgLengthOfStay: 8, hrgCode: 'FZ63A', tariff: 20140, lastUpdated: '2025-01' },
  'X676': { opcs4: 'X676', procedureName: 'HIPEC with Right Upper Quadrant Peritonectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 7110, staffCost: 4980, implantCost: 0, consumablesCost: 2130, inpatientElective: 20220, avgTheatreTime: 395, avgLengthOfStay: 10, hrgCode: 'FZ15A', tariff: 20220, lastUpdated: '2025-01' },
  'X677': { opcs4: 'X677', procedureName: 'HIPEC with Left Upper Quadrant Peritonectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 5920, staffCost: 4140, implantCost: 0, consumablesCost: 1780, inpatientElective: 16640, avgTheatreTime: 329, avgLengthOfStay: 8, hrgCode: 'FZ30A', tariff: 16640, lastUpdated: '2025-01' },
  'X678': { opcs4: 'X678', procedureName: 'HIPEC with Appendectomy', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 5630, staffCost: 3940, implantCost: 0, consumablesCost: 1690, inpatientElective: 16060, avgTheatreTime: 313, avgLengthOfStay: 8, hrgCode: 'FZ99A', tariff: 16060, lastUpdated: '2025-01' },
  'X679': { opcs4: 'X679', procedureName: 'HIPEC for Recurrent Disease', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6710, staffCost: 4700, implantCost: 0, consumablesCost: 2010, inpatientElective: 18820, avgTheatreTime: 373, avgLengthOfStay: 9, hrgCode: 'FZ80A', tariff: 18820, lastUpdated: '2025-01' },
  'X680': { opcs4: 'X680', procedureName: 'HIPEC Complete Cytoreduction', specialty: 'General Surgery', subcategory: 'Hyperthermic Intraperitoneal Chemotherapy', theatreCost: 6340, staffCost: 4440, implantCost: 0, consumablesCost: 1900, inpatientElective: 19880, avgTheatreTime: 352, avgLengthOfStay: 12, hrgCode: 'FZ55A', tariff: 19880, lastUpdated: '2025-01' },

  // Upper Gastrointestinal
  'J182': { opcs4: 'J182', procedureName: 'Open Cholecystectomy', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 1580, staffCost: 1110, implantCost: 0, consumablesCost: 470, inpatientElective: 6760, avgTheatreTime: 132, avgLengthOfStay: 6, hrgCode: 'FZ88A', tariff: 6760, lastUpdated: '2025-01' },
  'G281': { opcs4: 'G281', procedureName: 'Laparoscopic Fundoplication', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'FZ39Z', tariff: 600, lastUpdated: '2025-01' },
  'G271': { opcs4: 'G271', procedureName: 'Total Gastrectomy', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 5760, staffCost: 4030, implantCost: 0, consumablesCost: 1730, inpatientElective: 16320, avgTheatreTime: 320, avgLengthOfStay: 8, hrgCode: 'FZ34A', tariff: 16320, lastUpdated: '2025-01' },
  'G272': { opcs4: 'G272', procedureName: 'Subtotal Gastrectomy', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 8410, staffCost: 5890, implantCost: 0, consumablesCost: 2520, inpatientElective: 22820, avgTheatreTime: 467, avgLengthOfStay: 10, hrgCode: 'FZ37A', tariff: 22820, lastUpdated: '2025-01' },
  'G282': { opcs4: 'G282', procedureName: 'Sleeve Gastrectomy', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 6250, staffCost: 4380, implantCost: 0, consumablesCost: 1880, inpatientElective: 19710, avgTheatreTime: 347, avgLengthOfStay: 12, hrgCode: 'FZ60A', tariff: 19710, lastUpdated: '2025-01' },
  'G283': { opcs4: 'G283', procedureName: 'Gastric Banding', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 41, avgLengthOfStay: 0, hrgCode: 'FZ85Z', tariff: 420, lastUpdated: '2025-01' },
  'G011': { opcs4: 'G011', procedureName: 'Oesophagectomy', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 8410, staffCost: 5890, implantCost: 0, consumablesCost: 2520, inpatientElective: 22820, avgTheatreTime: 467, avgLengthOfStay: 10, hrgCode: 'FZ63A', tariff: 22820, lastUpdated: '2025-01' },
  'G291': { opcs4: 'G291', procedureName: 'Hiatus Hernia Repair', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 500, staffCost: 350, implantCost: 0, consumablesCost: 150, inpatientElective: 2200, avgTheatreTime: 62, avgLengthOfStay: 2, hrgCode: 'FZ59B', tariff: 2200, lastUpdated: '2025-01' },
  'G411': { opcs4: 'G411', procedureName: 'Pyloromyotomy', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 26, avgLengthOfStay: 0, hrgCode: 'FZ26Z', tariff: 260, lastUpdated: '2025-01' },
  'G421': { opcs4: 'G421', procedureName: 'Gastrostomy Insertion', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'FZ63Z', tariff: 200, lastUpdated: '2025-01' },
  'G381': { opcs4: 'G381', procedureName: 'Vagotomy', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'FZ79Z', tariff: 360, lastUpdated: '2025-01' },
  'J551': { opcs4: 'J551', procedureName: 'Whipple Procedure', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 6070, staffCost: 4250, implantCost: 0, consumablesCost: 1820, inpatientElective: 16940, avgTheatreTime: 337, avgLengthOfStay: 8, hrgCode: 'FZ71A', tariff: 16940, lastUpdated: '2025-01' },
  'J561': { opcs4: 'J561', procedureName: 'Pancreatic Resection', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 6970, staffCost: 4880, implantCost: 0, consumablesCost: 2090, inpatientElective: 19340, avgTheatreTime: 387, avgLengthOfStay: 9, hrgCode: 'FZ30A', tariff: 19340, lastUpdated: '2025-01' },
  'T841': { opcs4: 'T841', procedureName: 'Splenectomy', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 2750, staffCost: 1920, implantCost: 0, consumablesCost: 830, inpatientElective: 8500, avgTheatreTime: 229, avgLengthOfStay: 5, hrgCode: 'FZ74A', tariff: 8500, lastUpdated: '2025-01' },
  'G321': { opcs4: 'G321', procedureName: 'Gastric Ulcer Repair', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 630, staffCost: 440, implantCost: 0, consumablesCost: 190, inpatientElective: 1860, avgTheatreTime: 79, avgLengthOfStay: 1, hrgCode: 'FZ95B', tariff: 1860, lastUpdated: '2025-01' },
  'G351': { opcs4: 'G351', procedureName: 'Gastrojejunostomy', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'FZ35Z', tariff: 220, lastUpdated: '2025-01' },
  'G141': { opcs4: 'G141', procedureName: 'Oesophageal Dilatation', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'FZ25Z', tariff: 540, lastUpdated: '2025-01' },
  'G281': { opcs4: 'G281', procedureName: 'Anti-reflux Surgery', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'FZ56Z', tariff: 580, lastUpdated: '2025-01' },
  'G342': { opcs4: 'G342', procedureName: 'Revision Gastric Bypass', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 2220, staffCost: 1550, implantCost: 0, consumablesCost: 670, inpatientElective: 6240, avgTheatreTime: 185, avgLengthOfStay: 3, hrgCode: 'FZ63A', tariff: 6240, lastUpdated: '2025-01' },
  'G284': { opcs4: 'G284', procedureName: 'Gastric Band Removal', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'FZ51Z', tariff: 540, lastUpdated: '2025-01' },
  'G343': { opcs4: 'G343', procedureName: 'Duodenal Switch', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'FZ56Z', tariff: 360, lastUpdated: '2025-01' },
  'G322': { opcs4: 'G322', procedureName: 'Gastric Perforation Repair', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 600, staffCost: 420, implantCost: 0, consumablesCost: 180, inpatientElective: 2400, avgTheatreTime: 75, avgLengthOfStay: 2, hrgCode: 'FZ53B', tariff: 2400, lastUpdated: '2025-01' },
  'G142': { opcs4: 'G142', procedureName: 'Oesophageal Stenting', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 210, staffCost: 150, implantCost: 980, consumablesCost: 60, dayCase: 1400, avgTheatreTime: 41, avgLengthOfStay: 0, hrgCode: 'FZ36Z', tariff: 1400, lastUpdated: '2025-01' },
  'G391': { opcs4: 'G391', procedureName: 'Gastric Volvulus Repair', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 690, staffCost: 480, implantCost: 0, consumablesCost: 210, inpatientElective: 1980, avgTheatreTime: 86, avgLengthOfStay: 1, hrgCode: 'FZ69B', tariff: 1980, lastUpdated: '2025-01' },
  'G412': { opcs4: 'G412', procedureName: 'Pyloroplasty', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'FZ43Z', tariff: 360, lastUpdated: '2025-01' },
  'G431': { opcs4: 'G431', procedureName: 'Gastric Polyp Excision', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'FZ11Z', tariff: 460, lastUpdated: '2025-01' },
  'G143': { opcs4: 'G143', procedureName: 'Oesophageal Varices Treatment', specialty: 'General Surgery', subcategory: 'Upper Gastrointestinal', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'FZ65Z', tariff: 360, lastUpdated: '2025-01' },


  // ============================================================================
  // GYNAECOLOGY - Additional Financial Data
  // ============================================================================

  // Gynae Fertility
  'Q103': { opcs4: 'Q103', procedureName: 'Hysteroscopic Myomectomy', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 1820, staffCost: 1270, implantCost: 0, consumablesCost: 550, inpatientElective: 6640, avgTheatreTime: 152, avgLengthOfStay: 5, hrgCode: 'MA83A', tariff: 6640, lastUpdated: '2025-01' },
  'Q104': { opcs4: 'Q104', procedureName: 'Hysteroscopic Septoplasty', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'MA64Z', tariff: 600, lastUpdated: '2025-01' },
  'Q105': { opcs4: 'Q105', procedureName: 'Hysteroscopic Adhesiolysis', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'MA33Z', tariff: 480, lastUpdated: '2025-01' },
  'Q106': { opcs4: 'Q106', procedureName: 'Tubal Cannulation', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'MA66Z', tariff: 580, lastUpdated: '2025-01' },
  'Q107': { opcs4: 'Q107', procedureName: 'Laparoscopic Salpingectomy', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 2810, staffCost: 1970, implantCost: 0, consumablesCost: 840, inpatientElective: 8620, avgTheatreTime: 234, avgLengthOfStay: 5, hrgCode: 'MA88A', tariff: 8620, lastUpdated: '2025-01' },
  'Q108': { opcs4: 'Q108', procedureName: 'Laparoscopic Salpingostomy', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'MA24Z', tariff: 400, lastUpdated: '2025-01' },
  'Q109': { opcs4: 'Q109', procedureName: 'Laparoscopic Fimbrioplasty', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'MA23Z', tariff: 400, lastUpdated: '2025-01' },
  'Q110': { opcs4: 'Q110', procedureName: 'Laparoscopic Ovarian Cystectomy Fertility', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 1460, staffCost: 1020, implantCost: 0, consumablesCost: 440, inpatientElective: 5320, avgTheatreTime: 122, avgLengthOfStay: 4, hrgCode: 'MA22A', tariff: 5320, lastUpdated: '2025-01' },
  'Q111': { opcs4: 'Q111', procedureName: 'Hysteroscopic Foreign Body Removal', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'MA93Z', tariff: 540, lastUpdated: '2025-01' },
  'Q112': { opcs4: 'Q112', procedureName: 'Cervical Polypectomy', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 1500, staffCost: 1050, implantCost: 0, consumablesCost: 450, inpatientElective: 5400, avgTheatreTime: 125, avgLengthOfStay: 4, hrgCode: 'MA62A', tariff: 5400, lastUpdated: '2025-01' },
  'Q113': { opcs4: 'Q113', procedureName: 'Endometrial Ablation', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 26, avgLengthOfStay: 0, hrgCode: 'MA31Z', tariff: 260, lastUpdated: '2025-01' },
  'Q114': { opcs4: 'Q114', procedureName: 'Diagnostic Laparoscopy Fertility', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'MA83Z', tariff: 540, lastUpdated: '2025-01' },
  'Q116': { opcs4: 'Q116', procedureName: 'Endometrial Biopsy', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 460, staffCost: 320, implantCost: 0, consumablesCost: 140, inpatientElective: 2120, avgTheatreTime: 57, avgLengthOfStay: 2, hrgCode: 'MA68B', tariff: 2120, lastUpdated: '2025-01' },
  'Q117': { opcs4: 'Q117', procedureName: 'Cervical Cerclage', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'MA31Z', tariff: 520, lastUpdated: '2025-01' },
  'Q118': { opcs4: 'Q118', procedureName: 'Laparoscopic Uterine Suspension', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 49, avgLengthOfStay: 0, hrgCode: 'MA18Z', tariff: 510, lastUpdated: '2025-01' },
  'Q119': { opcs4: 'Q119', procedureName: 'Vaginal Septum Excision', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'MA11Z', tariff: 200, lastUpdated: '2025-01' },
  'Q120': { opcs4: 'Q120', procedureName: 'Hymen Surgery', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 50, avgLengthOfStay: 0, hrgCode: 'MA40Z', tariff: 510, lastUpdated: '2025-01' },
  'Q121': { opcs4: 'Q121', procedureName: 'Ovarian Wedge Resection', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 2240, staffCost: 1570, implantCost: 0, consumablesCost: 670, inpatientElective: 7480, avgTheatreTime: 187, avgLengthOfStay: 5, hrgCode: 'MA18A', tariff: 7480, lastUpdated: '2025-01' },
  'Q122': { opcs4: 'Q122', procedureName: 'Uterine Artery Embolization', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'MA89Z', tariff: 580, lastUpdated: '2025-01' },
  'Q123': { opcs4: 'Q123', procedureName: 'MRI-Guided Focused Ultrasound', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'MA65Z', tariff: 260, lastUpdated: '2025-01' },
  'Q124': { opcs4: 'Q124', procedureName: 'Ovarian Tissue Cryopreservation', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'MA85Z', tariff: 480, lastUpdated: '2025-01' },
  'Q125': { opcs4: 'Q125', procedureName: 'Oocyte Retrieval', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'MA69Z', tariff: 400, lastUpdated: '2025-01' },
  'Q126': { opcs4: 'Q126', procedureName: 'Embryo Transfer', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'MA86Z', tariff: 380, lastUpdated: '2025-01' },
  'Q127': { opcs4: 'Q127', procedureName: 'Hysteroscopic Metroplasty', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'MA55Z', tariff: 400, lastUpdated: '2025-01' },
  'Q128': { opcs4: 'Q128', procedureName: 'Laparoscopic Myomectomy Fertility', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 1660, staffCost: 1160, implantCost: 0, consumablesCost: 500, inpatientElective: 5720, avgTheatreTime: 138, avgLengthOfStay: 4, hrgCode: 'MA61A', tariff: 5720, lastUpdated: '2025-01' },
  'Q129': { opcs4: 'Q129', procedureName: 'Selective Salpingography', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'MA88Z', tariff: 260, lastUpdated: '2025-01' },
  'Q130': { opcs4: 'Q130', procedureName: 'Hysterosalpingo-Contrast Sonography', specialty: 'Gynaecology', subcategory: 'Gynae Fertility', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'MA37Z', tariff: 460, lastUpdated: '2025-01' },

  // Gynae Robotic
  'Q073': { opcs4: 'Q073', procedureName: 'Robotic Sacrocolpopexy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 7920, staffCost: 5540, implantCost: 0, consumablesCost: 2380, inpatientElective: 23040, avgTheatreTime: 440, avgLengthOfStay: 12, hrgCode: 'MA28A', tariff: 23040, lastUpdated: '2025-01' },
  'Q074': { opcs4: 'Q074', procedureName: 'Robotic Endometriosis Excision', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 5800, staffCost: 4060, implantCost: 0, consumablesCost: 1740, inpatientElective: 18800, avgTheatreTime: 322, avgLengthOfStay: 12, hrgCode: 'MA60A', tariff: 18800, lastUpdated: '2025-01' },
  'Q076': { opcs4: 'Q076', procedureName: 'Robotic Salpingo-oophorectomy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 6070, staffCost: 4250, implantCost: 0, consumablesCost: 1820, inpatientElective: 18740, avgTheatreTime: 337, avgLengthOfStay: 11, hrgCode: 'MA39A', tariff: 18740, lastUpdated: '2025-01' },
  'Q078': { opcs4: 'Q078', procedureName: 'Robotic Pelvic Lymphadenectomy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 6680, staffCost: 4680, implantCost: 0, consumablesCost: 2000, inpatientElective: 19360, avgTheatreTime: 371, avgLengthOfStay: 10, hrgCode: 'MA14A', tariff: 19360, lastUpdated: '2025-01' },
  'Q079': { opcs4: 'Q079', procedureName: 'Robotic Para-aortic Lymphadenectomy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 5940, staffCost: 4160, implantCost: 0, consumablesCost: 1780, inpatientElective: 16680, avgTheatreTime: 330, avgLengthOfStay: 8, hrgCode: 'MA14A', tariff: 16680, lastUpdated: '2025-01' },
  'Q080': { opcs4: 'Q080', procedureName: 'Robotic Tubal Reanastomosis', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 6230, staffCost: 4360, implantCost: 0, consumablesCost: 1870, inpatientElective: 17260, avgTheatreTime: 346, avgLengthOfStay: 8, hrgCode: 'MA83A', tariff: 17260, lastUpdated: '2025-01' },
  'Q081': { opcs4: 'Q081', procedureName: 'Robotic Cervical Cerclage', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 6050, staffCost: 4240, implantCost: 0, consumablesCost: 1820, inpatientElective: 18710, avgTheatreTime: 336, avgLengthOfStay: 11, hrgCode: 'MA34A', tariff: 18710, lastUpdated: '2025-01' },
  'Q082': { opcs4: 'Q082', procedureName: 'Robotic Sentinel Node Biopsy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 5630, staffCost: 3940, implantCost: 0, consumablesCost: 1690, inpatientElective: 18460, avgTheatreTime: 313, avgLengthOfStay: 12, hrgCode: 'MA80A', tariff: 18460, lastUpdated: '2025-01' },
  'Q083': { opcs4: 'Q083', procedureName: 'Robotic Ovarian Transposition', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 6190, staffCost: 4330, implantCost: 0, consumablesCost: 1860, inpatientElective: 19580, avgTheatreTime: 344, avgLengthOfStay: 12, hrgCode: 'MA30A', tariff: 19580, lastUpdated: '2025-01' },
  'Q084': { opcs4: 'Q084', procedureName: 'Robotic Adhesiolysis', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 6980, staffCost: 4890, implantCost: 0, consumablesCost: 2090, inpatientElective: 20560, avgTheatreTime: 388, avgLengthOfStay: 11, hrgCode: 'MA49A', tariff: 20560, lastUpdated: '2025-01' },
  'Q085': { opcs4: 'Q085', procedureName: 'Robotic Uterine Septum Resection', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 7000, staffCost: 4900, implantCost: 0, consumablesCost: 2100, inpatientElective: 20000, avgTheatreTime: 389, avgLengthOfStay: 10, hrgCode: 'MA22A', tariff: 20000, lastUpdated: '2025-01' },
  'Q086': { opcs4: 'Q086', procedureName: 'Robotic Rectovaginal Fistula Repair', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 6010, staffCost: 4210, implantCost: 0, consumablesCost: 1800, inpatientElective: 19220, avgTheatreTime: 334, avgLengthOfStay: 12, hrgCode: 'MA99A', tariff: 19220, lastUpdated: '2025-01' },
  'Q087': { opcs4: 'Q087', procedureName: 'Robotic Vesicovaginal Fistula Repair', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 5690, staffCost: 3980, implantCost: 0, consumablesCost: 1710, inpatientElective: 17980, avgTheatreTime: 316, avgLengthOfStay: 11, hrgCode: 'MA47A', tariff: 17980, lastUpdated: '2025-01' },
  'Q088': { opcs4: 'Q088', procedureName: 'Robotic Pelvic Floor Reconstruction', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 5420, staffCost: 3790, implantCost: 0, consumablesCost: 1630, inpatientElective: 15640, avgTheatreTime: 301, avgLengthOfStay: 8, hrgCode: 'MA53A', tariff: 15640, lastUpdated: '2025-01' },
  'Q089': { opcs4: 'Q089', procedureName: 'Robotic Parametrectomy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 5900, staffCost: 4130, implantCost: 0, consumablesCost: 1770, inpatientElective: 18400, avgTheatreTime: 328, avgLengthOfStay: 11, hrgCode: 'MA65A', tariff: 18400, lastUpdated: '2025-01' },
  'Q090': { opcs4: 'Q090', procedureName: 'Robotic Omental Biopsy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 8510, staffCost: 5960, implantCost: 0, consumablesCost: 2550, inpatientElective: 23020, avgTheatreTime: 473, avgLengthOfStay: 10, hrgCode: 'MA16A', tariff: 23020, lastUpdated: '2025-01' },
  'Q091': { opcs4: 'Q091', procedureName: 'Robotic Presacral Neurectomy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 7780, staffCost: 5450, implantCost: 0, consumablesCost: 2330, inpatientElective: 20960, avgTheatreTime: 432, avgLengthOfStay: 9, hrgCode: 'MA95A', tariff: 20960, lastUpdated: '2025-01' },
  'Q092': { opcs4: 'Q092', procedureName: 'Robotic Uterosacral Ligament Suspension', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 5740, staffCost: 4020, implantCost: 0, consumablesCost: 1720, inpatientElective: 18680, avgTheatreTime: 319, avgLengthOfStay: 12, hrgCode: 'MA21A', tariff: 18680, lastUpdated: '2025-01' },
  'Q093': { opcs4: 'Q093', procedureName: 'Robotic Broad Ligament Mass Excision', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 7220, staffCost: 5050, implantCost: 0, consumablesCost: 2170, inpatientElective: 21040, avgTheatreTime: 401, avgLengthOfStay: 11, hrgCode: 'MA74A', tariff: 21040, lastUpdated: '2025-01' },
  'Q094': { opcs4: 'Q094', procedureName: 'Robotic Peritoneal Staging', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 8370, staffCost: 5860, implantCost: 0, consumablesCost: 2510, inpatientElective: 23940, avgTheatreTime: 465, avgLengthOfStay: 12, hrgCode: 'MA28A', tariff: 23940, lastUpdated: '2025-01' },
  'Q095': { opcs4: 'Q095', procedureName: 'Robotic Ovarian Cancer Debulking', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 8120, staffCost: 5680, implantCost: 0, consumablesCost: 2440, inpatientElective: 22840, avgTheatreTime: 451, avgLengthOfStay: 11, hrgCode: 'MA76A', tariff: 22840, lastUpdated: '2025-01' },
  'Q096': { opcs4: 'Q096', procedureName: 'Robotic Bowel Resection Gynae', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 7450, staffCost: 5220, implantCost: 0, consumablesCost: 2240, inpatientElective: 21510, avgTheatreTime: 414, avgLengthOfStay: 11, hrgCode: 'MA74A', tariff: 21510, lastUpdated: '2025-01' },
  'Q097': { opcs4: 'Q097', procedureName: 'Robotic Bladder Endometriosis', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 6730, staffCost: 4710, implantCost: 0, consumablesCost: 2020, inpatientElective: 18860, avgTheatreTime: 374, avgLengthOfStay: 9, hrgCode: 'MA90A', tariff: 18860, lastUpdated: '2025-01' },
  'Q098': { opcs4: 'Q098', procedureName: 'Robotic Ureteric Reimplantation', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 5580, staffCost: 3910, implantCost: 3370, consumablesCost: 1670, inpatientElective: 20530, avgTheatreTime: 310, avgLengthOfStay: 10, hrgCode: 'MA82A', tariff: 20530, lastUpdated: '2025-01' },
  'Q099': { opcs4: 'Q099', procedureName: 'Robotic Pelvic Abscess Drainage', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 7520, staffCost: 5260, implantCost: 0, consumablesCost: 2260, inpatientElective: 19840, avgTheatreTime: 418, avgLengthOfStay: 8, hrgCode: 'MA83A', tariff: 19840, lastUpdated: '2025-01' },
  'Q100': { opcs4: 'Q100', procedureName: 'Robotic Nerve Sparing Hysterectomy', specialty: 'Gynaecology', subcategory: 'Gynae Robotic', theatreCost: 6700, staffCost: 4690, implantCost: 0, consumablesCost: 2010, inpatientElective: 18800, avgTheatreTime: 372, avgLengthOfStay: 9, hrgCode: 'MA79A', tariff: 18800, lastUpdated: '2025-01' },


  // ============================================================================
  // NEUROLOGY - Additional Financial Data
  // ============================================================================

  // Neuro-Oncology
  'A054': { opcs4: 'A054', procedureName: 'Meningioma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 2240, staffCost: 1570, implantCost: 0, consumablesCost: 670, inpatientElective: 7480, avgTheatreTime: 187, avgLengthOfStay: 5, hrgCode: 'AA57A', tariff: 7480, lastUpdated: '2025-01' },
  'A055': { opcs4: 'A055', procedureName: 'Pituitary Tumor Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 3650, staffCost: 2560, implantCost: 0, consumablesCost: 1100, inpatientElective: 10310, avgTheatreTime: 304, avgLengthOfStay: 5, hrgCode: 'AA95A', tariff: 10310, lastUpdated: '2025-01' },
  'A056': { opcs4: 'A056', procedureName: 'Acoustic Neuroma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 4000, staffCost: 2800, implantCost: 0, consumablesCost: 1200, inpatientElective: 11000, avgTheatreTime: 333, avgLengthOfStay: 5, hrgCode: 'AA72A', tariff: 11000, lastUpdated: '2025-01' },
  'A057': { opcs4: 'A057', procedureName: 'Craniopharyngioma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 2860, staffCost: 2000, implantCost: 0, consumablesCost: 860, inpatientElective: 9920, avgTheatreTime: 238, avgLengthOfStay: 7, hrgCode: 'AA41A', tariff: 9920, lastUpdated: '2025-01' },
  'A058': { opcs4: 'A058', procedureName: 'Spinal Cord Tumor Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 3640, staffCost: 2550, implantCost: 0, consumablesCost: 1090, inpatientElective: 9080, avgTheatreTime: 303, avgLengthOfStay: 3, hrgCode: 'AA49A', tariff: 9080, lastUpdated: '2025-01' },
  'A059': { opcs4: 'A059', procedureName: 'Metastatic Brain Tumor Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 2630, staffCost: 1840, implantCost: 0, consumablesCost: 790, inpatientElective: 9460, avgTheatreTime: 219, avgLengthOfStay: 7, hrgCode: 'AA81A', tariff: 9460, lastUpdated: '2025-01' },
  'A060': { opcs4: 'A060', procedureName: 'Posterior Fossa Tumor', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 390, staffCost: 270, implantCost: 0, consumablesCost: 120, dayCase: 780, avgTheatreTime: 78, avgLengthOfStay: 0, hrgCode: 'AA48Z', tariff: 780, lastUpdated: '2025-01' },
  'A061': { opcs4: 'A061', procedureName: 'Corpus Callosum Tumor', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'AA42Z', tariff: 400, lastUpdated: '2025-01' },
  'A062': { opcs4: 'A062', procedureName: 'Intraventricular Tumor', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'AA52Z', tariff: 540, lastUpdated: '2025-01' },
  'A063': { opcs4: 'A063', procedureName: 'Pineal Region Tumor', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 400, staffCost: 280, implantCost: 0, consumablesCost: 120, dayCase: 800, avgTheatreTime: 79, avgLengthOfStay: 0, hrgCode: 'AA90Z', tariff: 800, lastUpdated: '2025-01' },
  'A064': { opcs4: 'A064', procedureName: 'Brainstem Glioma Biopsy', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 750, staffCost: 530, implantCost: 0, consumablesCost: 230, inpatientElective: 2110, avgTheatreTime: 94, avgLengthOfStay: 1, hrgCode: 'AA52B', tariff: 2110, lastUpdated: '2025-01' },
  'A065': { opcs4: 'A065', procedureName: 'Stereotactic Brain Biopsy', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 1230, staffCost: 860, implantCost: 0, consumablesCost: 370, inpatientElective: 3060, avgTheatreTime: 154, avgLengthOfStay: 1, hrgCode: 'AA16B', tariff: 3060, lastUpdated: '2025-01' },
  'A066': { opcs4: 'A066', procedureName: 'Ommaya Reservoir Insertion', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'AA60Z', tariff: 400, lastUpdated: '2025-01' },
  'A067': { opcs4: 'A067', procedureName: 'Gliadel Wafer Insertion', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 380, staffCost: 270, implantCost: 0, consumablesCost: 110, dayCase: 760, avgTheatreTime: 75, avgLengthOfStay: 0, hrgCode: 'AA43Z', tariff: 760, lastUpdated: '2025-01' },
  'A068': { opcs4: 'A068', procedureName: 'Laser Interstitial Thermal Therapy', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 350, staffCost: 240, implantCost: 0, consumablesCost: 110, dayCase: 700, avgTheatreTime: 70, avgLengthOfStay: 0, hrgCode: 'AA42Z', tariff: 700, lastUpdated: '2025-01' },
  'A069': { opcs4: 'A069', procedureName: 'Skull Base Tumor Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 4280, staffCost: 3000, implantCost: 0, consumablesCost: 1280, inpatientElective: 12760, avgTheatreTime: 357, avgLengthOfStay: 7, hrgCode: 'AA14A', tariff: 12760, lastUpdated: '2025-01' },
  'A070': { opcs4: 'A070', procedureName: 'Chordoma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 3760, staffCost: 2630, implantCost: 0, consumablesCost: 1130, inpatientElective: 11120, avgTheatreTime: 313, avgLengthOfStay: 6, hrgCode: 'AA96A', tariff: 11120, lastUpdated: '2025-01' },
  'A071': { opcs4: 'A071', procedureName: 'Ependymoma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 2590, staffCost: 1810, implantCost: 0, consumablesCost: 780, inpatientElective: 9380, avgTheatreTime: 216, avgLengthOfStay: 7, hrgCode: 'AA99A', tariff: 9380, lastUpdated: '2025-01' },
  'A072': { opcs4: 'A072', procedureName: 'Medulloblastoma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 3020, staffCost: 2110, implantCost: 0, consumablesCost: 910, inpatientElective: 9040, avgTheatreTime: 252, avgLengthOfStay: 5, hrgCode: 'AA73A', tariff: 9040, lastUpdated: '2025-01' },
  'A073': { opcs4: 'A073', procedureName: 'Oligodendroglioma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 3140, staffCost: 2200, implantCost: 0, consumablesCost: 940, inpatientElective: 9880, avgTheatreTime: 262, avgLengthOfStay: 6, hrgCode: 'AA98A', tariff: 9880, lastUpdated: '2025-01' },
  'A074': { opcs4: 'A074', procedureName: 'Astrocytoma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 2920, staffCost: 2040, implantCost: 0, consumablesCost: 880, inpatientElective: 7640, avgTheatreTime: 243, avgLengthOfStay: 3, hrgCode: 'AA62A', tariff: 7640, lastUpdated: '2025-01' },
  'A075': { opcs4: 'A075', procedureName: 'Hemangioblastoma Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 3350, staffCost: 2350, implantCost: 0, consumablesCost: 1010, inpatientElective: 9710, avgTheatreTime: 279, avgLengthOfStay: 5, hrgCode: 'AA88A', tariff: 9710, lastUpdated: '2025-01' },
  'A076': { opcs4: 'A076', procedureName: 'Colloid Cyst Resection', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 2890, staffCost: 2020, implantCost: 0, consumablesCost: 870, inpatientElective: 8780, avgTheatreTime: 241, avgLengthOfStay: 5, hrgCode: 'AA31A', tariff: 8780, lastUpdated: '2025-01' },
  'A077': { opcs4: 'A077', procedureName: 'Petroclival Meningioma', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 400, staffCost: 280, implantCost: 0, consumablesCost: 120, dayCase: 800, avgTheatreTime: 79, avgLengthOfStay: 0, hrgCode: 'AA94Z', tariff: 800, lastUpdated: '2025-01' },
  'A078': { opcs4: 'A078', procedureName: 'Optic Nerve Glioma', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'AA33Z', tariff: 320, lastUpdated: '2025-01' },
  'A079': { opcs4: 'A079', procedureName: 'Spinal Metastasis Decompression', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 330, staffCost: 230, implantCost: 0, consumablesCost: 100, dayCase: 660, avgTheatreTime: 66, avgLengthOfStay: 0, hrgCode: 'AA31Z', tariff: 660, lastUpdated: '2025-01' },
  'A080': { opcs4: 'A080', procedureName: 'Gamma Knife Radiosurgery', specialty: 'Neurology', subcategory: 'Neuro-Oncology', theatreCost: 420, staffCost: 290, implantCost: 0, consumablesCost: 130, dayCase: 840, avgTheatreTime: 84, avgLengthOfStay: 0, hrgCode: 'AA19Z', tariff: 840, lastUpdated: '2025-01' },


  // ============================================================================
  // OBSTETRICS - Additional Financial Data
  // ============================================================================

  'R174': { opcs4: 'R174', procedureName: 'Manual Removal of Placenta', specialty: 'Obstetrics', subcategory: '', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 33, avgLengthOfStay: 0, hrgCode: 'NZ17Z', tariff: 340, lastUpdated: '2025-01' },
  'R175': { opcs4: 'R175', procedureName: 'Repair of Perineal Tear', specialty: 'Obstetrics', subcategory: '', theatreCost: 580, staffCost: 410, implantCost: 0, consumablesCost: 170, inpatientElective: 2360, avgTheatreTime: 73, avgLengthOfStay: 2, hrgCode: 'NZ72B', tariff: 2360, lastUpdated: '2025-01' },
  'R176': { opcs4: 'R176', procedureName: 'Cervical Cerclage Obstetric', specialty: 'Obstetrics', subcategory: '', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'NZ48Z', tariff: 360, lastUpdated: '2025-01' },
  'R177': { opcs4: 'R177', procedureName: 'Evacuation of Retained Products', specialty: 'Obstetrics', subcategory: '', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'NZ78Z', tariff: 380, lastUpdated: '2025-01' },
  'R178': { opcs4: 'R178', procedureName: 'External Cephalic Version', specialty: 'Obstetrics', subcategory: '', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'NZ79Z', tariff: 460, lastUpdated: '2025-01' },
  'R179': { opcs4: 'R179', procedureName: 'Operative Vaginal Delivery', specialty: 'Obstetrics', subcategory: '', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'NZ42Z', tariff: 240, lastUpdated: '2025-01' },
  'R180': { opcs4: 'R180', procedureName: 'Postpartum Hemorrhage Control', specialty: 'Obstetrics', subcategory: '', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'NZ10Z', tariff: 320, lastUpdated: '2025-01' },
  'R181': { opcs4: 'R181', procedureName: 'Uterine Artery Embolization Obstetric', specialty: 'Obstetrics', subcategory: '', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 32, avgLengthOfStay: 0, hrgCode: 'NZ75Z', tariff: 320, lastUpdated: '2025-01' },
  'R182': { opcs4: 'R182', procedureName: 'B-Lynch Suture', specialty: 'Obstetrics', subcategory: '', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'NZ31Z', tariff: 360, lastUpdated: '2025-01' },
  'R183': { opcs4: 'R183', procedureName: 'Ectopic Pregnancy Surgery', specialty: 'Obstetrics', subcategory: '', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'NZ21Z', tariff: 420, lastUpdated: '2025-01' },
  'R184': { opcs4: 'R184', procedureName: 'Ovarian Cyst in Pregnancy', specialty: 'Obstetrics', subcategory: '', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'NZ51Z', tariff: 580, lastUpdated: '2025-01' },
  'R185': { opcs4: 'R185', procedureName: 'Appendicectomy in Pregnancy', specialty: 'Obstetrics', subcategory: '', theatreCost: 2060, staffCost: 1440, implantCost: 0, consumablesCost: 620, inpatientElective: 7720, avgTheatreTime: 172, avgLengthOfStay: 6, hrgCode: 'NZ20A', tariff: 7720, lastUpdated: '2025-01' },
  'R186': { opcs4: 'R186', procedureName: 'Maternal Cardiac Arrest Management', specialty: 'Obstetrics', subcategory: '', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'NZ94Z', tariff: 260, lastUpdated: '2025-01' },
  'R187': { opcs4: 'R187', procedureName: 'Shoulder Dystocia Management', specialty: 'Obstetrics', subcategory: '', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'NZ19Z', tariff: 220, lastUpdated: '2025-01' },
  'R188': { opcs4: 'R188', procedureName: 'Uterine Rupture Repair', specialty: 'Obstetrics', subcategory: '', theatreCost: 710, staffCost: 500, implantCost: 0, consumablesCost: 210, inpatientElective: 2620, avgTheatreTime: 89, avgLengthOfStay: 2, hrgCode: 'NZ92B', tariff: 2620, lastUpdated: '2025-01' },
  'R189': { opcs4: 'R189', procedureName: 'Cervical Laceration Repair', specialty: 'Obstetrics', subcategory: '', theatreCost: 490, staffCost: 340, implantCost: 0, consumablesCost: 150, inpatientElective: 1580, avgTheatreTime: 61, avgLengthOfStay: 1, hrgCode: 'NZ55B', tariff: 1580, lastUpdated: '2025-01' },
  'R190': { opcs4: 'R190', procedureName: 'Vaginal Birth After Caesarean', specialty: 'Obstetrics', subcategory: '', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 34, avgLengthOfStay: 0, hrgCode: 'NZ64Z', tariff: 340, lastUpdated: '2025-01' },
  'R191': { opcs4: 'R191', procedureName: 'Twin Delivery', specialty: 'Obstetrics', subcategory: '', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'NZ63Z', tariff: 280, lastUpdated: '2025-01' },
  'R192': { opcs4: 'R192', procedureName: 'Breech Delivery', specialty: 'Obstetrics', subcategory: '', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'NZ44Z', tariff: 460, lastUpdated: '2025-01' },
  'R193': { opcs4: 'R193', procedureName: 'Placenta Accreta Management', specialty: 'Obstetrics', subcategory: '', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'NZ66Z', tariff: 600, lastUpdated: '2025-01' },
  'R194': { opcs4: 'R194', procedureName: 'Fetoscopic Surgery', specialty: 'Obstetrics', subcategory: '', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 33, avgLengthOfStay: 0, hrgCode: 'NZ53Z', tariff: 340, lastUpdated: '2025-01' },
  'R195': { opcs4: 'R195', procedureName: 'Intrauterine Transfusion', specialty: 'Obstetrics', subcategory: '', theatreCost: 2280, staffCost: 1600, implantCost: 0, consumablesCost: 680, inpatientElective: 6960, avgTheatreTime: 190, avgLengthOfStay: 4, hrgCode: 'NZ35A', tariff: 6960, lastUpdated: '2025-01' },
  'R196': { opcs4: 'R196', procedureName: 'Amniotic Band Syndrome Surgery', specialty: 'Obstetrics', subcategory: '', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'NZ11Z', tariff: 420, lastUpdated: '2025-01' },
  'R197': { opcs4: 'R197', procedureName: 'Twin-Twin Transfusion Laser', specialty: 'Obstetrics', subcategory: '', theatreCost: 2390, staffCost: 1670, implantCost: 0, consumablesCost: 720, inpatientElective: 7780, avgTheatreTime: 199, avgLengthOfStay: 5, hrgCode: 'NZ92A', tariff: 7780, lastUpdated: '2025-01' },
  'R198': { opcs4: 'R198', procedureName: 'Maternal Trauma Laparotomy', specialty: 'Obstetrics', subcategory: '', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, inpatientEmergency: 340, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'NZ29Z', tariff: 280, lastUpdated: '2025-01' },
  'R199': { opcs4: 'R199', procedureName: 'Vulval Hematoma Drainage', specialty: 'Obstetrics', subcategory: '', theatreCost: 670, staffCost: 470, implantCost: 0, consumablesCost: 200, inpatientElective: 1940, avgTheatreTime: 84, avgLengthOfStay: 1, hrgCode: 'NZ72B', tariff: 1940, lastUpdated: '2025-01' },
  'R200': { opcs4: 'R200', procedureName: 'Inversion of Uterus Correction', specialty: 'Obstetrics', subcategory: '', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'NZ61Z', tariff: 220, lastUpdated: '2025-01' },


  // ============================================================================
  // OPHTHALMOLOGY - Additional Financial Data
  // ============================================================================

  'C714': { opcs4: 'C714', procedureName: 'Trabeculectomy', specialty: 'Ophthalmology', subcategory: '', theatreCost: 2090, staffCost: 1460, implantCost: 0, consumablesCost: 630, inpatientElective: 7780, avgTheatreTime: 174, avgLengthOfStay: 6, hrgCode: 'BZ56A', tariff: 7780, lastUpdated: '2025-01' },
  'C715': { opcs4: 'C715', procedureName: 'Corneal Transplant', specialty: 'Ophthalmology', subcategory: '', theatreCost: 7270, staffCost: 5090, implantCost: 0, consumablesCost: 2180, inpatientElective: 19340, avgTheatreTime: 404, avgLengthOfStay: 8, hrgCode: 'BZ23A', tariff: 19340, lastUpdated: '2025-01' },
  'C716': { opcs4: 'C716', procedureName: 'Laser Peripheral Iridotomy', specialty: 'Ophthalmology', subcategory: '', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 46, avgLengthOfStay: 0, hrgCode: 'BZ18Z', tariff: 460, lastUpdated: '2025-01' },
  'C717': { opcs4: 'C717', procedureName: 'Pan-Retinal Photocoagulation', specialty: 'Ophthalmology', subcategory: '', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 33, avgLengthOfStay: 0, hrgCode: 'BZ17Z', tariff: 340, lastUpdated: '2025-01' },
  'C718': { opcs4: 'C718', procedureName: 'Intravitreal Injection', specialty: 'Ophthalmology', subcategory: '', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'BZ42Z', tariff: 400, lastUpdated: '2025-01' },
  'C719': { opcs4: 'C719', procedureName: 'Pterygium Excision', specialty: 'Ophthalmology', subcategory: '', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'BZ79Z', tariff: 540, lastUpdated: '2025-01' },
  'C720': { opcs4: 'C720', procedureName: 'Strabismus Surgery', specialty: 'Ophthalmology', subcategory: '', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'BZ32Z', tariff: 520, lastUpdated: '2025-01' },
  'C721': { opcs4: 'C721', procedureName: 'Ectropion Repair', specialty: 'Ophthalmology', subcategory: '', theatreCost: 420, staffCost: 290, implantCost: 0, consumablesCost: 130, inpatientElective: 1440, avgTheatreTime: 52, avgLengthOfStay: 1, hrgCode: 'BZ18B', tariff: 1440, lastUpdated: '2025-01' },
  'C722': { opcs4: 'C722', procedureName: 'Entropion Repair', specialty: 'Ophthalmology', subcategory: '', theatreCost: 580, staffCost: 410, implantCost: 0, consumablesCost: 170, inpatientElective: 1760, avgTheatreTime: 72, avgLengthOfStay: 1, hrgCode: 'BZ91B', tariff: 1760, lastUpdated: '2025-01' },
  'C723': { opcs4: 'C723', procedureName: 'Blepharoplasty', specialty: 'Ophthalmology', subcategory: '', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'BZ59Z', tariff: 220, lastUpdated: '2025-01' },
  'C724': { opcs4: 'C724', procedureName: 'Dacryocystorhinostomy', specialty: 'Ophthalmology', subcategory: '', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'BZ58Z', tariff: 240, lastUpdated: '2025-01' },
  'C725': { opcs4: 'C725', procedureName: 'Enucleation', specialty: 'Ophthalmology', subcategory: '', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'BZ45Z', tariff: 580, lastUpdated: '2025-01' },
  'C726': { opcs4: 'C726', procedureName: 'Evisceration', specialty: 'Ophthalmology', subcategory: '', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 49, avgLengthOfStay: 0, hrgCode: 'BZ34Z', tariff: 510, lastUpdated: '2025-01' },
  'C727': { opcs4: 'C727', procedureName: 'Orbital Decompression', specialty: 'Ophthalmology', subcategory: '', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'BZ39Z', tariff: 540, lastUpdated: '2025-01' },
  'C728': { opcs4: 'C728', procedureName: 'Chalazion Excision', specialty: 'Ophthalmology', subcategory: '', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'BZ48Z', tariff: 360, lastUpdated: '2025-01' },
  'C729': { opcs4: 'C729', procedureName: 'Glaucoma Tube Insertion', specialty: 'Ophthalmology', subcategory: '', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'BZ84Z', tariff: 480, lastUpdated: '2025-01' },
  'C730': { opcs4: 'C730', procedureName: 'Macular Hole Surgery', specialty: 'Ophthalmology', subcategory: '', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'BZ49Z', tariff: 440, lastUpdated: '2025-01' },
  'C731': { opcs4: 'C731', procedureName: 'Epiretinal Membrane Peel', specialty: 'Ophthalmology', subcategory: '', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'BZ85Z', tariff: 580, lastUpdated: '2025-01' },
  'C732': { opcs4: 'C732', procedureName: 'Scleral Buckle', specialty: 'Ophthalmology', subcategory: '', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'BZ57Z', tariff: 520, lastUpdated: '2025-01' },
  'C733': { opcs4: 'C733', procedureName: 'Laser Capsulotomy', specialty: 'Ophthalmology', subcategory: '', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 27, avgLengthOfStay: 0, hrgCode: 'BZ30Z', tariff: 280, lastUpdated: '2025-01' },
  'C734': { opcs4: 'C734', procedureName: 'Corneal Cross-Linking', specialty: 'Ophthalmology', subcategory: '', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 38, avgLengthOfStay: 0, hrgCode: 'BZ83Z', tariff: 380, lastUpdated: '2025-01' },
  'C735': { opcs4: 'C735', procedureName: 'Refractive Lens Exchange', specialty: 'Ophthalmology', subcategory: '', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'BZ88Z', tariff: 320, lastUpdated: '2025-01' },
  'C736': { opcs4: 'C736', procedureName: 'Penetrating Keratoplasty', specialty: 'Ophthalmology', subcategory: '', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'BZ59Z', tariff: 400, lastUpdated: '2025-01' },
  'C737': { opcs4: 'C737', procedureName: 'Anterior Vitrectomy', specialty: 'Ophthalmology', subcategory: '', theatreCost: 2100, staffCost: 1470, implantCost: 0, consumablesCost: 630, inpatientElective: 6000, avgTheatreTime: 175, avgLengthOfStay: 3, hrgCode: 'BZ37A', tariff: 6000, lastUpdated: '2025-01' },
  'C738': { opcs4: 'C738', procedureName: 'Iris Repair', specialty: 'Ophthalmology', subcategory: '', theatreCost: 710, staffCost: 500, implantCost: 0, consumablesCost: 210, inpatientElective: 2020, avgTheatreTime: 89, avgLengthOfStay: 1, hrgCode: 'BZ88B', tariff: 2020, lastUpdated: '2025-01' },
  'C739': { opcs4: 'C739', procedureName: 'Conjunctival Biopsy', specialty: 'Ophthalmology', subcategory: '', theatreCost: 570, staffCost: 400, implantCost: 0, consumablesCost: 170, inpatientElective: 2340, avgTheatreTime: 71, avgLengthOfStay: 2, hrgCode: 'BZ70B', tariff: 2340, lastUpdated: '2025-01' },
  'C740': { opcs4: 'C740', procedureName: 'Orbital Tumor Excision', specialty: 'Ophthalmology', subcategory: '', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 33, avgLengthOfStay: 0, hrgCode: 'BZ26Z', tariff: 340, lastUpdated: '2025-01' },


  // ============================================================================
  // ORAL AND MAXILLOFACIAL - Additional Financial Data
  // ============================================================================

  // Dental
  'F203': { opcs4: 'F203', procedureName: 'Dental Implant Placement', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 190, staffCost: 130, implantCost: 840, consumablesCost: 60, dayCase: 1220, avgTheatreTime: 38, avgLengthOfStay: 0, hrgCode: 'JC65Z', tariff: 1220, lastUpdated: '2025-01' },
  'F204': { opcs4: 'F204', procedureName: 'Bone Grafting Alveolar Ridge', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 270, staffCost: 190, implantCost: 1420, consumablesCost: 80, dayCase: 1960, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'JC52Z', tariff: 1960, lastUpdated: '2025-01' },
  'F205': { opcs4: 'F205', procedureName: 'Sinus Lift', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 52, avgLengthOfStay: 0, hrgCode: 'JC23Z', tariff: 520, lastUpdated: '2025-01' },
  'F206': { opcs4: 'F206', procedureName: 'Canine Exposure', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'JC15Z', tariff: 360, lastUpdated: '2025-01' },
  'F207': { opcs4: 'F207', procedureName: 'Frenectomy', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 2840, staffCost: 1990, implantCost: 0, consumablesCost: 850, inpatientElective: 8680, avgTheatreTime: 237, avgLengthOfStay: 5, hrgCode: 'JC97A', tariff: 8680, lastUpdated: '2025-01' },
  'F208': { opcs4: 'F208', procedureName: 'Alveoloplasty', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'JC30Z', tariff: 440, lastUpdated: '2025-01' },
  'F209': { opcs4: 'F209', procedureName: 'Operculectomy', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 1790, staffCost: 1250, implantCost: 0, consumablesCost: 540, inpatientElective: 7180, avgTheatreTime: 149, avgLengthOfStay: 6, hrgCode: 'JC96A', tariff: 7180, lastUpdated: '2025-01' },
  'F210': { opcs4: 'F210', procedureName: 'Apicectomy', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 2530, staffCost: 1770, implantCost: 0, consumablesCost: 760, inpatientElective: 7460, avgTheatreTime: 211, avgLengthOfStay: 4, hrgCode: 'JC31A', tariff: 7460, lastUpdated: '2025-01' },
  'F211': { opcs4: 'F211', procedureName: 'Hemisection', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'JC13Z', tariff: 560, lastUpdated: '2025-01' },
  'F212': { opcs4: 'F212', procedureName: 'Crown Lengthening', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'JC51Z', tariff: 540, lastUpdated: '2025-01' },
  'F213': { opcs4: 'F213', procedureName: 'Soft Tissue Graft', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 240, staffCost: 170, implantCost: 1290, consumablesCost: 70, dayCase: 1770, avgTheatreTime: 48, avgLengthOfStay: 0, hrgCode: 'JC59Z', tariff: 1770, lastUpdated: '2025-01' },
  'F214': { opcs4: 'F214', procedureName: 'Peri-implantitis Treatment', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 240, staffCost: 170, implantCost: 580, consumablesCost: 70, dayCase: 1060, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'JC31Z', tariff: 1060, lastUpdated: '2025-01' },
  'F215': { opcs4: 'F215', procedureName: 'Guided Tissue Regeneration', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'JC54Z', tariff: 260, lastUpdated: '2025-01' },
  'F216': { opcs4: 'F216', procedureName: 'Socket Preservation', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'JC62Z', tariff: 200, lastUpdated: '2025-01' },
  'F217': { opcs4: 'F217', procedureName: 'Distraction Osteogenesis Alveolar', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'JC26Z', tariff: 440, lastUpdated: '2025-01' },
  'F218': { opcs4: 'F218', procedureName: 'GBR with Titanium Mesh', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 290, staffCost: 200, implantCost: 800, consumablesCost: 90, dayCase: 1380, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'JC13Z', tariff: 1380, lastUpdated: '2025-01' },
  'F219': { opcs4: 'F219', procedureName: 'Block Bone Graft', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 130, staffCost: 90, implantCost: 1310, consumablesCost: 40, dayCase: 1570, avgTheatreTime: 26, avgLengthOfStay: 0, hrgCode: 'JC91Z', tariff: 1570, lastUpdated: '2025-01' },
  'F220': { opcs4: 'F220', procedureName: 'PRF Application', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'JC23Z', tariff: 260, lastUpdated: '2025-01' },
  'F221': { opcs4: 'F221', procedureName: 'Zygomatic Implant', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 130, staffCost: 90, implantCost: 1260, consumablesCost: 40, dayCase: 1520, avgTheatreTime: 26, avgLengthOfStay: 0, hrgCode: 'JC27Z', tariff: 1520, lastUpdated: '2025-01' },
  'F222': { opcs4: 'F222', procedureName: 'Pterygoid Implant', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 290, staffCost: 200, implantCost: 710, consumablesCost: 90, dayCase: 1290, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'JC95Z', tariff: 1290, lastUpdated: '2025-01' },
  'F223': { opcs4: 'F223', procedureName: 'All-on-4 Implants', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 190, staffCost: 130, implantCost: 640, consumablesCost: 60, dayCase: 1020, avgTheatreTime: 38, avgLengthOfStay: 0, hrgCode: 'JC20Z', tariff: 1020, lastUpdated: '2025-01' },
  'F224': { opcs4: 'F224', procedureName: 'Implant Removal', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 110, staffCost: 80, implantCost: 830, consumablesCost: 30, dayCase: 1050, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'JC14Z', tariff: 1050, lastUpdated: '2025-01' },
  'F225': { opcs4: 'F225', procedureName: 'Vestibuloplasty', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 41, avgLengthOfStay: 0, hrgCode: 'JC88Z', tariff: 420, lastUpdated: '2025-01' },
  'F226': { opcs4: 'F226', procedureName: 'Mucosal Graft', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 260, staffCost: 180, implantCost: 670, consumablesCost: 80, dayCase: 1190, avgTheatreTime: 52, avgLengthOfStay: 0, hrgCode: 'JC62Z', tariff: 1190, lastUpdated: '2025-01' },
  'F227': { opcs4: 'F227', procedureName: 'Tuberosity Reduction', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 30, avgLengthOfStay: 0, hrgCode: 'JC33Z', tariff: 310, lastUpdated: '2025-01' },
  'F228': { opcs4: 'F228', procedureName: 'Torus Mandibularis Removal', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'JC47Z', tariff: 400, lastUpdated: '2025-01' },
  'F229': { opcs4: 'F229', procedureName: 'Torus Palatinus Removal', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'JC23Z', tariff: 400, lastUpdated: '2025-01' },
  'F230': { opcs4: 'F230', procedureName: 'Impacted Supernumerary Tooth', specialty: 'Oral and Maxillofacial', subcategory: 'Dental', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'JC78Z', tariff: 560, lastUpdated: '2025-01' },

  // OMFS Mandible
  'F143': { opcs4: 'F143', procedureName: 'Iliac Crest Bone Graft', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 110, staffCost: 80, implantCost: 530, consumablesCost: 30, dayCase: 750, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'JC81Z', tariff: 750, lastUpdated: '2025-01' },
  'F144': { opcs4: 'F144', procedureName: 'Distraction Osteogenesis Mandible', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'JC77Z', tariff: 280, lastUpdated: '2025-01' },
  'F145': { opcs4: 'F145', procedureName: 'TMJ Arthroplasty', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'JC45Z', tariff: 200, lastUpdated: '2025-01' },
  'F146': { opcs4: 'F146', procedureName: 'TMJ Arthroscopy', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'JC99Z', tariff: 260, lastUpdated: '2025-01' },
  'F147': { opcs4: 'F147', procedureName: 'Condylectomy', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 1520, staffCost: 1060, implantCost: 0, consumablesCost: 460, inpatientElective: 6040, avgTheatreTime: 127, avgLengthOfStay: 5, hrgCode: 'JC69A', tariff: 6040, lastUpdated: '2025-01' },
  'F148': { opcs4: 'F148', procedureName: 'Coronoidectomy', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 2320, staffCost: 1620, implantCost: 0, consumablesCost: 700, inpatientElective: 7040, avgTheatreTime: 193, avgLengthOfStay: 4, hrgCode: 'JC99A', tariff: 7040, lastUpdated: '2025-01' },
  'F149': { opcs4: 'F149', procedureName: 'Mandibular Osteotomy', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 2320, staffCost: 1620, implantCost: 0, consumablesCost: 700, inpatientElective: 6440, avgTheatreTime: 193, avgLengthOfStay: 3, hrgCode: 'JC29A', tariff: 6440, lastUpdated: '2025-01' },
  'F150': { opcs4: 'F150', procedureName: 'Genioplasty', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'JC28Z', tariff: 540, lastUpdated: '2025-01' },
  'F151': { opcs4: 'F151', procedureName: 'Mandibular Advancement', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 48, avgLengthOfStay: 0, hrgCode: 'JC20Z', tariff: 480, lastUpdated: '2025-01' },
  'F152': { opcs4: 'F152', procedureName: 'Hemimandibulectomy', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 2470, staffCost: 1730, implantCost: 0, consumablesCost: 740, inpatientElective: 7340, avgTheatreTime: 206, avgLengthOfStay: 4, hrgCode: 'JC63A', tariff: 7340, lastUpdated: '2025-01' },
  'F153': { opcs4: 'F153', procedureName: 'Marginal Mandibulectomy', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 2260, staffCost: 1580, implantCost: 0, consumablesCost: 680, inpatientElective: 7520, avgTheatreTime: 188, avgLengthOfStay: 5, hrgCode: 'JC48A', tariff: 7520, lastUpdated: '2025-01' },
  'F154': { opcs4: 'F154', procedureName: 'Mandibular Tumor Excision', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 56, avgLengthOfStay: 0, hrgCode: 'JC45Z', tariff: 560, lastUpdated: '2025-01' },
  'F155': { opcs4: 'F155', procedureName: 'Mandibular Cyst Enucleation', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 48, avgLengthOfStay: 0, hrgCode: 'JC93Z', tariff: 480, lastUpdated: '2025-01' },
  'F156': { opcs4: 'F156', procedureName: 'Ameloblastoma Resection', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 2400, staffCost: 1680, implantCost: 0, consumablesCost: 720, inpatientElective: 8400, avgTheatreTime: 200, avgLengthOfStay: 6, hrgCode: 'JC41A', tariff: 8400, lastUpdated: '2025-01' },
  'F157': { opcs4: 'F157', procedureName: 'Osteomyelitis Debridement', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 33, avgLengthOfStay: 0, hrgCode: 'JC56Z', tariff: 340, lastUpdated: '2025-01' },
  'F158': { opcs4: 'F158', procedureName: 'Osteoradionecrosis Treatment', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 43, avgLengthOfStay: 0, hrgCode: 'JC10Z', tariff: 440, lastUpdated: '2025-01' },
  'F159': { opcs4: 'F159', procedureName: 'Mandibular Reconstruction Plate', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 2150, staffCost: 1510, implantCost: 0, consumablesCost: 650, inpatientElective: 7910, avgTheatreTime: 179, avgLengthOfStay: 6, hrgCode: 'JC45A', tariff: 7910, lastUpdated: '2025-01' },
  'F160': { opcs4: 'F160', procedureName: 'Scapula Free Flap', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 5780, staffCost: 4050, implantCost: 0, consumablesCost: 1730, inpatientElective: 18760, avgTheatreTime: 321, avgLengthOfStay: 12, hrgCode: 'JC72A', tariff: 18760, lastUpdated: '2025-01' },
  'F161': { opcs4: 'F161', procedureName: 'Radial Forearm Free Flap', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 7150, staffCost: 5010, implantCost: 0, consumablesCost: 2150, inpatientElective: 20310, avgTheatreTime: 397, avgLengthOfStay: 10, hrgCode: 'JC31A', tariff: 20310, lastUpdated: '2025-01' },
  'F162': { opcs4: 'F162', procedureName: 'Anterolateral Thigh Flap', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'JC36Z', tariff: 280, lastUpdated: '2025-01' },
  'F163': { opcs4: 'F163', procedureName: 'Pectoralis Major Flap', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'JC41Z', tariff: 600, lastUpdated: '2025-01' },
  'F164': { opcs4: 'F164', procedureName: 'TMJ Disc Repositioning', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'JC71Z', tariff: 420, lastUpdated: '2025-01' },
  'F165': { opcs4: 'F165', procedureName: 'TMJ Discectomy', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 2690, staffCost: 1880, implantCost: 0, consumablesCost: 810, inpatientElective: 7180, avgTheatreTime: 224, avgLengthOfStay: 3, hrgCode: 'JC95A', tariff: 7180, lastUpdated: '2025-01' },
  'F166': { opcs4: 'F166', procedureName: 'Mandibular Ankylosis Release', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'JC46Z', tariff: 380, lastUpdated: '2025-01' },
  'F167': { opcs4: 'F167', procedureName: 'Gap Arthroplasty', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'JC62Z', tariff: 200, lastUpdated: '2025-01' },
  'F168': { opcs4: 'F168', procedureName: 'Costochondral Graft', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 260, staffCost: 180, implantCost: 1450, consumablesCost: 80, dayCase: 1970, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'JC73Z', tariff: 1970, lastUpdated: '2025-01' },
  'F169': { opcs4: 'F169', procedureName: 'Mandibular Nonunion Treatment', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'JC14Z', tariff: 560, lastUpdated: '2025-01' },
  'F170': { opcs4: 'F170', procedureName: 'Mandibular Malunion Correction', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Mandible', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 26, avgLengthOfStay: 0, hrgCode: 'JC80Z', tariff: 260, lastUpdated: '2025-01' },

  // OMFS Trauma
  'F113': { opcs4: 'F113', procedureName: 'Zygoma Fracture Fixation', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 590, staffCost: 410, implantCost: 520, consumablesCost: 180, inpatientElective: 2900, avgTheatreTime: 74, avgLengthOfStay: 2, hrgCode: 'JC90B', tariff: 2900, lastUpdated: '2025-01' },
  'F114': { opcs4: 'F114', procedureName: 'Orbital Floor Fracture Repair', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 520, staffCost: 360, implantCost: 0, consumablesCost: 160, inpatientElective: 1640, avgTheatreTime: 65, avgLengthOfStay: 1, hrgCode: 'JC37B', tariff: 1640, lastUpdated: '2025-01' },
  'F115': { opcs4: 'F115', procedureName: 'Nasal Bone Fracture Reduction', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'JC45Z', tariff: 260, lastUpdated: '2025-01' },
  'F116': { opcs4: 'F116', procedureName: 'Frontal Sinus Fracture Repair', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 540, staffCost: 380, implantCost: 0, consumablesCost: 160, inpatientElective: 1680, avgTheatreTime: 67, avgLengthOfStay: 1, hrgCode: 'JC15B', tariff: 1680, lastUpdated: '2025-01' },
  'F117': { opcs4: 'F117', procedureName: 'Pan-Facial Fracture Reconstruction', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 1870, staffCost: 1310, implantCost: 0, consumablesCost: 560, inpatientElective: 5540, avgTheatreTime: 156, avgLengthOfStay: 3, hrgCode: 'JC29A', tariff: 5540, lastUpdated: '2025-01' },
  'F118': { opcs4: 'F118', procedureName: 'Temporomandibular Joint Dislocation', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'JC42Z', tariff: 600, lastUpdated: '2025-01' },
  'F119': { opcs4: 'F119', procedureName: 'Condylar Fracture Fixation', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 470, staffCost: 330, implantCost: 1470, consumablesCost: 140, inpatientElective: 3010, avgTheatreTime: 59, avgLengthOfStay: 1, hrgCode: 'JC33B', tariff: 3010, lastUpdated: '2025-01' },
  'F120': { opcs4: 'F120', procedureName: 'Dentoalveolar Trauma', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, inpatientEmergency: 370, avgTheatreTime: 30, avgLengthOfStay: 0, hrgCode: 'JC47Z', tariff: 310, lastUpdated: '2025-01' },
  'F121': { opcs4: 'F121', procedureName: 'Soft Tissue Facial Laceration', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'JC57Z', tariff: 220, lastUpdated: '2025-01' },
  'F122': { opcs4: 'F122', procedureName: 'Parotid Duct Repair', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 810, staffCost: 570, implantCost: 0, consumablesCost: 240, inpatientElective: 2820, avgTheatreTime: 101, avgLengthOfStay: 2, hrgCode: 'JC87B', tariff: 2820, lastUpdated: '2025-01' },
  'F123': { opcs4: 'F123', procedureName: 'Facial Nerve Repair', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 590, staffCost: 410, implantCost: 0, consumablesCost: 180, inpatientElective: 2380, avgTheatreTime: 74, avgLengthOfStay: 2, hrgCode: 'JC58B', tariff: 2380, lastUpdated: '2025-01' },
  'F124': { opcs4: 'F124', procedureName: 'Le Fort I Fracture', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'JC33Z', tariff: 200, lastUpdated: '2025-01' },
  'F125': { opcs4: 'F125', procedureName: 'Le Fort II Fracture', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'JC72Z', tariff: 400, lastUpdated: '2025-01' },
  'F126': { opcs4: 'F126', procedureName: 'Le Fort III Fracture', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 26, avgLengthOfStay: 0, hrgCode: 'JC57Z', tariff: 260, lastUpdated: '2025-01' },
  'F127': { opcs4: 'F127', procedureName: 'NOE Fracture Repair', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 380, staffCost: 270, implantCost: 0, consumablesCost: 110, inpatientElective: 1360, avgTheatreTime: 48, avgLengthOfStay: 1, hrgCode: 'JC64B', tariff: 1360, lastUpdated: '2025-01' },
  'F128': { opcs4: 'F128', procedureName: 'Gunshot Wound Facial Reconstruction', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 2170, staffCost: 1520, implantCost: 0, consumablesCost: 650, inpatientElective: 6140, avgTheatreTime: 181, avgLengthOfStay: 3, hrgCode: 'JC31A', tariff: 6140, lastUpdated: '2025-01' },
  'F129': { opcs4: 'F129', procedureName: 'Avulsive Facial Injury', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'JC32Z', tariff: 480, lastUpdated: '2025-01' },
  'F130': { opcs4: 'F130', procedureName: 'Alveolar Ridge Fracture', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'JC71Z', tariff: 460, lastUpdated: '2025-01' },
  'F131': { opcs4: 'F131', procedureName: 'Palatal Fracture Repair', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 460, staffCost: 320, implantCost: 0, consumablesCost: 140, inpatientElective: 1520, avgTheatreTime: 58, avgLengthOfStay: 1, hrgCode: 'JC87B', tariff: 1520, lastUpdated: '2025-01' },
  'F132': { opcs4: 'F132', procedureName: 'Zygomatic Arch Reduction', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 41, avgLengthOfStay: 0, hrgCode: 'JC57Z', tariff: 420, lastUpdated: '2025-01' },
  'F133': { opcs4: 'F133', procedureName: 'Orbital Wall Reconstruction', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 2870, staffCost: 2010, implantCost: 0, consumablesCost: 860, inpatientElective: 8140, avgTheatreTime: 239, avgLengthOfStay: 4, hrgCode: 'JC85A', tariff: 8140, lastUpdated: '2025-01' },
  'F134': { opcs4: 'F134', procedureName: 'Subcondylar Fracture', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'JC32Z', tariff: 520, lastUpdated: '2025-01' },
  'F135': { opcs4: 'F135', procedureName: 'Symphyseal Fracture', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'JC19Z', tariff: 460, lastUpdated: '2025-01' },
  'F136': { opcs4: 'F136', procedureName: 'Parasymphyseal Fracture', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'JC61Z', tariff: 540, lastUpdated: '2025-01' },
  'F137': { opcs4: 'F137', procedureName: 'Angle Fracture Mandible', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 32, avgLengthOfStay: 0, hrgCode: 'JC67Z', tariff: 320, lastUpdated: '2025-01' },
  'F138': { opcs4: 'F138', procedureName: 'Body Fracture Mandible', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 34, avgLengthOfStay: 0, hrgCode: 'JC18Z', tariff: 340, lastUpdated: '2025-01' },
  'F139': { opcs4: 'F139', procedureName: 'Ramus Fracture', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 22, avgLengthOfStay: 0, hrgCode: 'JC34Z', tariff: 220, lastUpdated: '2025-01' },
  'F140': { opcs4: 'F140', procedureName: 'Coronoid Process Fracture', specialty: 'Oral and Maxillofacial', subcategory: 'OMFS Trauma', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'JC40Z', tariff: 360, lastUpdated: '2025-01' },

  // Orthognathic
  'F173': { opcs4: 'F173', procedureName: 'Bilateral Sagittal Split Osteotomy', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 2040, staffCost: 1430, implantCost: 0, consumablesCost: 610, inpatientElective: 7080, avgTheatreTime: 170, avgLengthOfStay: 5, hrgCode: 'JC70A', tariff: 7080, lastUpdated: '2025-01' },
  'F174': { opcs4: 'F174', procedureName: 'Maxillary Advancement', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 38, avgLengthOfStay: 0, hrgCode: 'JC96Z', tariff: 380, lastUpdated: '2025-01' },
  'F175': { opcs4: 'F175', procedureName: 'Maxillary Impaction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'JC16Z', tariff: 280, lastUpdated: '2025-01' },
  'F176': { opcs4: 'F176', procedureName: 'Maxillary Expansion', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 48, avgLengthOfStay: 0, hrgCode: 'JC66Z', tariff: 480, lastUpdated: '2025-01' },
  'F177': { opcs4: 'F177', procedureName: 'Vertical Maxillary Excess Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 27, avgLengthOfStay: 0, hrgCode: 'JC74Z', tariff: 280, lastUpdated: '2025-01' },
  'F178': { opcs4: 'F178', procedureName: 'Asymmetry Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 29, avgLengthOfStay: 0, hrgCode: 'JC75Z', tariff: 310, lastUpdated: '2025-01' },
  'F179': { opcs4: 'F179', procedureName: 'Open Bite Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 23, avgLengthOfStay: 0, hrgCode: 'JC39Z', tariff: 240, lastUpdated: '2025-01' },
  'F180': { opcs4: 'F180', procedureName: 'Deep Bite Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'JC63Z', tariff: 320, lastUpdated: '2025-01' },
  'F181': { opcs4: 'F181', procedureName: 'Class II Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 23, avgLengthOfStay: 0, hrgCode: 'JC14Z', tariff: 240, lastUpdated: '2025-01' },
  'F182': { opcs4: 'F182', procedureName: 'Class III Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'JC75Z', tariff: 320, lastUpdated: '2025-01' },
  'F183': { opcs4: 'F183', procedureName: 'Segmental Osteotomy', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 2230, staffCost: 1560, implantCost: 0, consumablesCost: 670, inpatientElective: 6260, avgTheatreTime: 186, avgLengthOfStay: 3, hrgCode: 'JC55A', tariff: 6260, lastUpdated: '2025-01' },
  'F184': { opcs4: 'F184', procedureName: 'Distraction Osteogenesis Midface', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 56, avgLengthOfStay: 0, hrgCode: 'JC90Z', tariff: 560, lastUpdated: '2025-01' },
  'F185': { opcs4: 'F185', procedureName: 'Horseshoe Osteotomy', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 1550, staffCost: 1090, implantCost: 0, consumablesCost: 470, inpatientElective: 6110, avgTheatreTime: 129, avgLengthOfStay: 5, hrgCode: 'JC12A', tariff: 6110, lastUpdated: '2025-01' },
  'F186': { opcs4: 'F186', procedureName: 'Posterior Segmental Osteotomy', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 1760, staffCost: 1230, implantCost: 0, consumablesCost: 530, inpatientElective: 6520, avgTheatreTime: 147, avgLengthOfStay: 5, hrgCode: 'JC47A', tariff: 6520, lastUpdated: '2025-01' },
  'F187': { opcs4: 'F187', procedureName: 'Orthodontic Decompensation', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'JC97Z', tariff: 360, lastUpdated: '2025-01' },
  'F188': { opcs4: 'F188', procedureName: 'Model Surgery Planning', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'JC23Z', tariff: 240, lastUpdated: '2025-01' },
  'F189': { opcs4: 'F189', procedureName: 'Maxillary Downgraft', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 220, staffCost: 150, implantCost: 980, consumablesCost: 70, dayCase: 1420, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'JC85Z', tariff: 1420, lastUpdated: '2025-01' },
  'F190': { opcs4: 'F190', procedureName: 'Alar Base Cinch', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'JC25Z', tariff: 580, lastUpdated: '2025-01' },
  'F191': { opcs4: 'F191', procedureName: 'V-Y Closure', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'JC72Z', tariff: 580, lastUpdated: '2025-01' },
  'F192': { opcs4: 'F192', procedureName: 'Three-Piece Le Fort', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 48, avgLengthOfStay: 0, hrgCode: 'JC39Z', tariff: 480, lastUpdated: '2025-01' },
  'F193': { opcs4: 'F193', procedureName: 'Transverse Discrepancy Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'JC37Z', tariff: 580, lastUpdated: '2025-01' },
  'F194': { opcs4: 'F194', procedureName: 'Yaw Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'JC85Z', tariff: 480, lastUpdated: '2025-01' },
  'F195': { opcs4: 'F195', procedureName: 'Pitch Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 21, avgLengthOfStay: 0, hrgCode: 'JC80Z', tariff: 220, lastUpdated: '2025-01' },
  'F196': { opcs4: 'F196', procedureName: 'Roll Correction', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'JC39Z', tariff: 540, lastUpdated: '2025-01' },
  'F197': { opcs4: 'F197', procedureName: 'Cleft Orthognathic Surgery', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'JC98Z', tariff: 540, lastUpdated: '2025-01' },
  'F198': { opcs4: 'F198', procedureName: 'Sleep Apnea Surgery MMA', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 46, avgLengthOfStay: 0, hrgCode: 'JC79Z', tariff: 460, lastUpdated: '2025-01' },
  'F199': { opcs4: 'F199', procedureName: 'Revision Orthognathic Surgery', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'JC53Z', tariff: 460, lastUpdated: '2025-01' },
  'F200': { opcs4: 'F200', procedureName: 'Computer-Assisted Orthognathic', specialty: 'Oral and Maxillofacial', subcategory: 'Orthognathic', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'JC22Z', tariff: 400, lastUpdated: '2025-01' },


  // ============================================================================
  // ORTHOPAEDICS - Additional Financial Data
  // ============================================================================

  // Elective Orthopaedic Joints
  'W371': { opcs4: 'W371', procedureName: 'Total Hip Replacement', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2620, staffCost: 1830, implantCost: 2110, consumablesCost: 790, inpatientElective: 10950, avgTheatreTime: 218, avgLengthOfStay: 6, hrgCode: 'HN68A', tariff: 10950, lastUpdated: '2025-01' },
  'W381': { opcs4: 'W381', procedureName: 'Revision Hip Replacement', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 1490, staffCost: 1040, implantCost: 2980, consumablesCost: 450, inpatientElective: 7760, avgTheatreTime: 124, avgLengthOfStay: 3, hrgCode: 'HN44A', tariff: 7760, lastUpdated: '2025-01' },
  'W411': { opcs4: 'W411', procedureName: 'Revision Knee Replacement', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2770, staffCost: 1940, implantCost: 1880, consumablesCost: 830, inpatientElective: 9820, avgTheatreTime: 231, avgLengthOfStay: 4, hrgCode: 'HN11A', tariff: 9820, lastUpdated: '2025-01' },
  'W461': { opcs4: 'W461', procedureName: 'Shoulder Replacement', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2380, staffCost: 1670, implantCost: 1890, consumablesCost: 710, inpatientElective: 9050, avgTheatreTime: 198, avgLengthOfStay: 4, hrgCode: 'HN47A', tariff: 9050, lastUpdated: '2025-01' },
  'W462': { opcs4: 'W462', procedureName: 'Reverse Shoulder Replacement', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2480, staffCost: 1740, implantCost: 3370, consumablesCost: 740, inpatientElective: 10130, avgTheatreTime: 207, avgLengthOfStay: 3, hrgCode: 'HN91A', tariff: 10130, lastUpdated: '2025-01' },
  'W471': { opcs4: 'W471', procedureName: 'Elbow Replacement', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 1940, staffCost: 1360, implantCost: 3140, consumablesCost: 580, inpatientElective: 9420, avgTheatreTime: 162, avgLengthOfStay: 4, hrgCode: 'HN14A', tariff: 9420, lastUpdated: '2025-01' },
  'W421': { opcs4: 'W421', procedureName: 'Ankle Replacement', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2650, staffCost: 1850, implantCost: 2400, consumablesCost: 800, inpatientElective: 10700, avgTheatreTime: 221, avgLengthOfStay: 5, hrgCode: 'HN47A', tariff: 10700, lastUpdated: '2025-01' },
  'W821': { opcs4: 'W821', procedureName: 'Hip Arthroscopy', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'HN21Z', tariff: 560, lastUpdated: '2025-01' },
  'W511': { opcs4: 'W511', procedureName: 'ACL Reconstruction', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2380, staffCost: 1670, implantCost: 0, consumablesCost: 710, inpatientElective: 7160, avgTheatreTime: 198, avgLengthOfStay: 4, hrgCode: 'HN12A', tariff: 7160, lastUpdated: '2025-01' },
  'W801': { opcs4: 'W801', procedureName: 'Meniscectomy', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2480, staffCost: 1740, implantCost: 0, consumablesCost: 740, inpatientElective: 8560, avgTheatreTime: 207, avgLengthOfStay: 6, hrgCode: 'HN20A', tariff: 8560, lastUpdated: '2025-01' },
  'W501': { opcs4: 'W501', procedureName: 'Meniscal Repair', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 620, staffCost: 430, implantCost: 0, consumablesCost: 190, inpatientElective: 2440, avgTheatreTime: 77, avgLengthOfStay: 2, hrgCode: 'HN82B', tariff: 2440, lastUpdated: '2025-01' },
  'W311': { opcs4: 'W311', procedureName: 'Hip Osteotomy', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2630, staffCost: 1840, implantCost: 0, consumablesCost: 790, inpatientElective: 7660, avgTheatreTime: 219, avgLengthOfStay: 4, hrgCode: 'HN66A', tariff: 7660, lastUpdated: '2025-01' },
  'W321': { opcs4: 'W321', procedureName: 'Knee Osteotomy', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2560, staffCost: 1790, implantCost: 0, consumablesCost: 770, inpatientElective: 8720, avgTheatreTime: 213, avgLengthOfStay: 6, hrgCode: 'HN81A', tariff: 8720, lastUpdated: '2025-01' },
  'W823': { opcs4: 'W823', procedureName: 'Shoulder Arthroscopy', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'HN16Z', tariff: 320, lastUpdated: '2025-01' },
  'W502': { opcs4: 'W502', procedureName: 'Rotator Cuff Repair', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 570, staffCost: 400, implantCost: 0, consumablesCost: 170, inpatientElective: 1740, avgTheatreTime: 71, avgLengthOfStay: 1, hrgCode: 'HN14B', tariff: 1740, lastUpdated: '2025-01' },
  'W824': { opcs4: 'W824', procedureName: 'Ankle Arthroscopy', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 30, avgLengthOfStay: 0, hrgCode: 'HN76Z', tariff: 310, lastUpdated: '2025-01' },
  'W512': { opcs4: 'W512', procedureName: 'Ankle Ligament Reconstruction', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2230, staffCost: 1560, implantCost: 0, consumablesCost: 670, inpatientElective: 6260, avgTheatreTime: 186, avgLengthOfStay: 3, hrgCode: 'HN58A', tariff: 6260, lastUpdated: '2025-01' },
  'W802': { opcs4: 'W802', procedureName: 'Cheilectomy', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 1460, staffCost: 1020, implantCost: 0, consumablesCost: 440, inpatientElective: 5320, avgTheatreTime: 122, avgLengthOfStay: 4, hrgCode: 'HN26A', tariff: 5320, lastUpdated: '2025-01' },
  'W391': { opcs4: 'W391', procedureName: 'First MTP Fusion', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2260, staffCost: 1580, implantCost: 0, consumablesCost: 680, inpatientElective: 6320, avgTheatreTime: 188, avgLengthOfStay: 3, hrgCode: 'HN88A', tariff: 6320, lastUpdated: '2025-01' },
  'W513': { opcs4: 'W513', procedureName: 'PCL Reconstruction', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 1900, staffCost: 1330, implantCost: 0, consumablesCost: 570, inpatientElective: 5600, avgTheatreTime: 158, avgLengthOfStay: 3, hrgCode: 'HN43A', tariff: 5600, lastUpdated: '2025-01' },
  'W514': { opcs4: 'W514', procedureName: 'Multi-ligament Knee Reconstruction', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 1480, staffCost: 1040, implantCost: 0, consumablesCost: 440, inpatientElective: 5960, avgTheatreTime: 123, avgLengthOfStay: 5, hrgCode: 'HN43A', tariff: 5960, lastUpdated: '2025-01' },
  'W451': { opcs4: 'W451', procedureName: 'Cartilage Restoration', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'HN57Z', tariff: 580, lastUpdated: '2025-01' },
  'W811': { opcs4: 'W811', procedureName: 'Synovectomy', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 2470, staffCost: 1730, implantCost: 0, consumablesCost: 740, inpatientElective: 6740, avgTheatreTime: 206, avgLengthOfStay: 3, hrgCode: 'HN68A', tariff: 6740, lastUpdated: '2025-01' },
  'W901': { opcs4: 'W901', procedureName: 'Joint Injection', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'HN49Z', tariff: 240, lastUpdated: '2025-01' },
  'W841': { opcs4: 'W841', procedureName: 'Arthroscopic Debridement', specialty: 'Orthopaedics', subcategory: 'Elective Orthopaedic Joints', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 46, avgLengthOfStay: 0, hrgCode: 'HN39Z', tariff: 460, lastUpdated: '2025-01' },

  // Orthopaedic Spine
  'V251': { opcs4: 'V251', procedureName: 'Lumbar Discectomy', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2220, staffCost: 1550, implantCost: 0, consumablesCost: 670, inpatientElective: 6240, avgTheatreTime: 185, avgLengthOfStay: 3, hrgCode: 'HN36A', tariff: 6240, lastUpdated: '2025-01' },
  'V261': { opcs4: 'V261', procedureName: 'Lumbar Decompression', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'HN94Z', tariff: 560, lastUpdated: '2025-01' },
  'V381': { opcs4: 'V381', procedureName: 'Lumbar Fusion', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2460, staffCost: 1720, implantCost: 0, consumablesCost: 740, inpatientElective: 7320, avgTheatreTime: 205, avgLengthOfStay: 4, hrgCode: 'HN38A', tariff: 7320, lastUpdated: '2025-01' },
  'V252': { opcs4: 'V252', procedureName: 'Cervical Discectomy and Fusion', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2780, staffCost: 1950, implantCost: 0, consumablesCost: 830, inpatientElective: 8560, avgTheatreTime: 232, avgLengthOfStay: 5, hrgCode: 'HN39A', tariff: 8560, lastUpdated: '2025-01' },
  'V262': { opcs4: 'V262', procedureName: 'Posterior Cervical Decompression', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'HN38Z', tariff: 200, lastUpdated: '2025-01' },
  'V253': { opcs4: 'V253', procedureName: 'Thoracic Discectomy', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2820, staffCost: 1970, implantCost: 0, consumablesCost: 850, inpatientElective: 9240, avgTheatreTime: 235, avgLengthOfStay: 6, hrgCode: 'HN61A', tariff: 9240, lastUpdated: '2025-01' },
  'V391': { opcs4: 'V391', procedureName: 'Scoliosis Correction', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 34, avgLengthOfStay: 0, hrgCode: 'HN78Z', tariff: 340, lastUpdated: '2025-01' },
  'V411': { opcs4: 'V411', procedureName: 'Kyphoplasty', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'HN50Z', tariff: 560, lastUpdated: '2025-01' },
  'V412': { opcs4: 'V412', procedureName: 'Vertebroplasty', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'HN78Z', tariff: 480, lastUpdated: '2025-01' },
  'V263': { opcs4: 'V263', procedureName: 'Spinal Cord Decompression', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 29, avgLengthOfStay: 0, hrgCode: 'HN43Z', tariff: 310, lastUpdated: '2025-01' },
  'V264': { opcs4: 'V264', procedureName: 'Foraminotomy', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 56, avgLengthOfStay: 0, hrgCode: 'HN59Z', tariff: 560, lastUpdated: '2025-01' },
  'V265': { opcs4: 'V265', procedureName: 'Laminoplasty', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'HN35Z', tariff: 240, lastUpdated: '2025-01' },
  'V021': { opcs4: 'V021', procedureName: 'Spinal Tumor Resection', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 1960, staffCost: 1370, implantCost: 0, consumablesCost: 590, inpatientElective: 7520, avgTheatreTime: 163, avgLengthOfStay: 6, hrgCode: 'HN99A', tariff: 7520, lastUpdated: '2025-01' },
  'V382': { opcs4: 'V382', procedureName: 'Sacroiliac Joint Fusion', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2050, staffCost: 1440, implantCost: 0, consumablesCost: 620, inpatientElective: 7110, avgTheatreTime: 171, avgLengthOfStay: 5, hrgCode: 'HN35A', tariff: 7110, lastUpdated: '2025-01' },
  'V383': { opcs4: 'V383', procedureName: 'Anterior Lumbar Interbody Fusion', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2660, staffCost: 1860, implantCost: 0, consumablesCost: 800, inpatientElective: 7720, avgTheatreTime: 222, avgLengthOfStay: 4, hrgCode: 'HN60A', tariff: 7720, lastUpdated: '2025-01' },
  'V384': { opcs4: 'V384', procedureName: 'Posterior Lumbar Interbody Fusion', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2840, staffCost: 1990, implantCost: 0, consumablesCost: 850, inpatientElective: 8080, avgTheatreTime: 237, avgLengthOfStay: 4, hrgCode: 'HN74A', tariff: 8080, lastUpdated: '2025-01' },
  'V385': { opcs4: 'V385', procedureName: 'Transforaminal Lumbar Interbody Fusion', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2140, staffCost: 1500, implantCost: 0, consumablesCost: 640, inpatientElective: 7880, avgTheatreTime: 178, avgLengthOfStay: 6, hrgCode: 'HN89A', tariff: 7880, lastUpdated: '2025-01' },
  'V386': { opcs4: 'V386', procedureName: 'Oblique Lateral Interbody Fusion', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 1860, staffCost: 1300, implantCost: 0, consumablesCost: 560, inpatientElective: 6720, avgTheatreTime: 155, avgLengthOfStay: 5, hrgCode: 'HN10A', tariff: 6720, lastUpdated: '2025-01' },
  'V387': { opcs4: 'V387', procedureName: 'Extreme Lateral Interbody Fusion', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2060, staffCost: 1440, implantCost: 0, consumablesCost: 620, inpatientElective: 6520, avgTheatreTime: 172, avgLengthOfStay: 4, hrgCode: 'HN80A', tariff: 6520, lastUpdated: '2025-01' },
  'V421': { opcs4: 'V421', procedureName: 'Minimally Invasive Spine Surgery', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'HN33Z', tariff: 540, lastUpdated: '2025-01' },
  'V422': { opcs4: 'V422', procedureName: 'Percutaneous Pedicle Screw Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 410, staffCost: 290, implantCost: 1180, consumablesCost: 120, inpatientElective: 3200, avgTheatreTime: 51, avgLengthOfStay: 2, hrgCode: 'HN95B', tariff: 3200, lastUpdated: '2025-01' },
  'V431': { opcs4: 'V431', procedureName: 'Revision Spinal Surgery', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'HN78Z', tariff: 400, lastUpdated: '2025-01' },
  'V281': { opcs4: 'V281', procedureName: 'Corpectomy', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2160, staffCost: 1510, implantCost: 0, consumablesCost: 650, inpatientElective: 7320, avgTheatreTime: 180, avgLengthOfStay: 5, hrgCode: 'HN30A', tariff: 7320, lastUpdated: '2025-01' },
  'V331': { opcs4: 'V331', procedureName: 'Spinal Osteotomy', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2400, staffCost: 1680, implantCost: 0, consumablesCost: 720, inpatientElective: 7800, avgTheatreTime: 200, avgLengthOfStay: 5, hrgCode: 'HN49A', tariff: 7800, lastUpdated: '2025-01' },
  'V441': { opcs4: 'V441', procedureName: 'Disc Replacement', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 2520, staffCost: 1760, implantCost: 2110, consumablesCost: 760, inpatientElective: 8950, avgTheatreTime: 210, avgLengthOfStay: 3, hrgCode: 'HN81A', tariff: 8950, lastUpdated: '2025-01' },
  'V451': { opcs4: 'V451', procedureName: 'Spinal Instrumentation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'HN75Z', tariff: 360, lastUpdated: '2025-01' },
  'V452': { opcs4: 'V452', procedureName: 'Spinous Process Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 640, staffCost: 450, implantCost: 710, consumablesCost: 190, inpatientElective: 3190, avgTheatreTime: 80, avgLengthOfStay: 2, hrgCode: 'HN65B', tariff: 3190, lastUpdated: '2025-01' },
  'V291': { opcs4: 'V291', procedureName: 'Sacral Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 500, staffCost: 350, implantCost: 700, consumablesCost: 150, inpatientElective: 2300, avgTheatreTime: 63, avgLengthOfStay: 1, hrgCode: 'HN23B', tariff: 2300, lastUpdated: '2025-01' },
  'V811': { opcs4: 'V811', procedureName: 'Coccygectomy', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 1600, staffCost: 1120, implantCost: 0, consumablesCost: 480, inpatientElective: 6800, avgTheatreTime: 133, avgLengthOfStay: 6, hrgCode: 'HN35A', tariff: 6800, lastUpdated: '2025-01' },
  'V461': { opcs4: 'V461', procedureName: 'Spinal Infection Debridement', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Spine', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'HN73Z', tariff: 260, lastUpdated: '2025-01' },

  // Orthopaedic Trauma
  'W242': { opcs4: 'W242', procedureName: 'Intramedullary Nail Femur', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 43, avgLengthOfStay: 0, hrgCode: 'HN13Z', tariff: 440, lastUpdated: '2025-01' },
  'W243': { opcs4: 'W243', procedureName: 'Intramedullary Nail Tibia', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'HN62Z', tariff: 440, lastUpdated: '2025-01' },
  'W461': { opcs4: 'W461', procedureName: 'Hemiarthroplasty Hip', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'HN12Z', tariff: 400, lastUpdated: '2025-01' },
  'W251': { opcs4: 'W251', procedureName: 'Pelvic Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 540, staffCost: 380, implantCost: 1260, consumablesCost: 160, inpatientElective: 2940, avgTheatreTime: 67, avgLengthOfStay: 1, hrgCode: 'HN42B', tariff: 2940, lastUpdated: '2025-01' },
  'W252': { opcs4: 'W252', procedureName: 'Acetabular Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 640, staffCost: 450, implantCost: 550, consumablesCost: 190, inpatientElective: 2430, avgTheatreTime: 80, avgLengthOfStay: 1, hrgCode: 'HN24B', tariff: 2430, lastUpdated: '2025-01' },
  'W253': { opcs4: 'W253', procedureName: 'Tibial Plateau Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 790, staffCost: 550, implantCost: 1050, consumablesCost: 240, inpatientElective: 3230, avgTheatreTime: 99, avgLengthOfStay: 1, hrgCode: 'HN59B', tariff: 3230, lastUpdated: '2025-01' },
  'W254': { opcs4: 'W254', procedureName: 'Pilon Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 660, staffCost: 460, implantCost: 1200, consumablesCost: 200, inpatientElective: 3120, avgTheatreTime: 83, avgLengthOfStay: 1, hrgCode: 'HN94B', tariff: 3120, lastUpdated: '2025-01' },
  'W255': { opcs4: 'W255', procedureName: 'Calcaneal Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 390, staffCost: 270, implantCost: 1490, consumablesCost: 120, inpatientElective: 3470, avgTheatreTime: 49, avgLengthOfStay: 2, hrgCode: 'HN48B', tariff: 3470, lastUpdated: '2025-01' },
  'W246': { opcs4: 'W246', procedureName: 'Distal Radius Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 630, staffCost: 440, implantCost: 1380, consumablesCost: 190, inpatientElective: 3840, avgTheatreTime: 79, avgLengthOfStay: 2, hrgCode: 'HN41B', tariff: 3840, lastUpdated: '2025-01' },
  'W247': { opcs4: 'W247', procedureName: 'Proximal Humerus Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 740, staffCost: 520, implantCost: 1460, consumablesCost: 220, inpatientElective: 3540, avgTheatreTime: 92, avgLengthOfStay: 1, hrgCode: 'HN19B', tariff: 3540, lastUpdated: '2025-01' },
  'W249': { opcs4: 'W249', procedureName: 'Olecranon Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 570, staffCost: 400, implantCost: 550, consumablesCost: 170, inpatientElective: 2890, avgTheatreTime: 71, avgLengthOfStay: 2, hrgCode: 'HN98B', tariff: 2890, lastUpdated: '2025-01' },
  'W250': { opcs4: 'W250', procedureName: 'Forearm Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 720, staffCost: 500, implantCost: 830, consumablesCost: 220, inpatientElective: 3470, avgTheatreTime: 90, avgLengthOfStay: 2, hrgCode: 'HN41B', tariff: 3470, lastUpdated: '2025-01' },
  'W256': { opcs4: 'W256', procedureName: 'Clavicle Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 500, staffCost: 350, implantCost: 1280, consumablesCost: 150, inpatientElective: 2880, avgTheatreTime: 63, avgLengthOfStay: 1, hrgCode: 'HN37B', tariff: 2880, lastUpdated: '2025-01' },
  'W257': { opcs4: 'W257', procedureName: 'Scapula Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 740, staffCost: 520, implantCost: 650, consumablesCost: 220, inpatientElective: 2730, avgTheatreTime: 93, avgLengthOfStay: 1, hrgCode: 'HN10B', tariff: 2730, lastUpdated: '2025-01' },
  'W258': { opcs4: 'W258', procedureName: 'Patella Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 480, staffCost: 340, implantCost: 1140, consumablesCost: 140, inpatientElective: 3300, avgTheatreTime: 60, avgLengthOfStay: 2, hrgCode: 'HN48B', tariff: 3300, lastUpdated: '2025-01' },
  'W259': { opcs4: 'W259', procedureName: 'Femoral Neck Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 370, staffCost: 260, implantCost: 800, consumablesCost: 110, inpatientElective: 2140, avgTheatreTime: 46, avgLengthOfStay: 1, hrgCode: 'HN85B', tariff: 2140, lastUpdated: '2025-01' },
  'W260': { opcs4: 'W260', procedureName: 'Intertrochanteric Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 740, staffCost: 520, implantCost: 1380, consumablesCost: 220, inpatientElective: 3460, avgTheatreTime: 92, avgLengthOfStay: 1, hrgCode: 'HN82B', tariff: 3460, lastUpdated: '2025-01' },
  'W261': { opcs4: 'W261', procedureName: 'Subtrochanteric Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 790, staffCost: 550, implantCost: 1260, consumablesCost: 240, inpatientElective: 4040, avgTheatreTime: 99, avgLengthOfStay: 2, hrgCode: 'HN62B', tariff: 4040, lastUpdated: '2025-01' },
  'W262': { opcs4: 'W262', procedureName: 'Supracondylar Fracture Fixation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 620, staffCost: 430, implantCost: 560, consumablesCost: 190, inpatientElective: 3000, avgTheatreTime: 77, avgLengthOfStay: 2, hrgCode: 'HN33B', tariff: 3000, lastUpdated: '2025-01' },
  'W341': { opcs4: 'W341', procedureName: 'Malunion Correction', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 52, avgLengthOfStay: 0, hrgCode: 'HN45Z', tariff: 520, lastUpdated: '2025-01' },
  'W901': { opcs4: 'W901', procedureName: 'Removal of Metalwork', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 32, avgLengthOfStay: 0, hrgCode: 'HN81Z', tariff: 320, lastUpdated: '2025-01' },
  'W361': { opcs4: 'W361', procedureName: 'Limb Lengthening', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'HN25Z', tariff: 560, lastUpdated: '2025-01' },
  'T862': { opcs4: 'T862', procedureName: 'Compartment Syndrome Release', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'HN96Z', tariff: 580, lastUpdated: '2025-01' },
  'X081': { opcs4: 'X081', procedureName: 'Amputation', specialty: 'Orthopaedics', subcategory: 'Orthopaedic Trauma', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'HN96Z', tariff: 600, lastUpdated: '2025-01' },


  // ============================================================================
  // PLASTICS - Additional Financial Data
  // ============================================================================

  // Burns & Breast
  'S812': { opcs4: 'S812', procedureName: 'Fasciotomy for Burns', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 50, avgLengthOfStay: 0, hrgCode: 'JC98Z', tariff: 510, lastUpdated: '2025-01' },
  'S814': { opcs4: 'S814', procedureName: 'Full Thickness Skin Graft', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 190, staffCost: 130, implantCost: 1140, consumablesCost: 60, dayCase: 1520, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'JC96Z', tariff: 1520, lastUpdated: '2025-01' },
  'S815': { opcs4: 'S815', procedureName: 'Burn Debridement', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'JC50Z', tariff: 420, lastUpdated: '2025-01' },
  'S816': { opcs4: 'S816', procedureName: 'Burn Scar Revision', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'JC85Z', tariff: 580, lastUpdated: '2025-01' },
  'S817': { opcs4: 'S817', procedureName: 'Z-Plasty', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'JC84Z', tariff: 600, lastUpdated: '2025-01' },
  'S818': { opcs4: 'S818', procedureName: 'Tissue Expansion', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'JC55Z', tariff: 400, lastUpdated: '2025-01' },
  'S820': { opcs4: 'S820', procedureName: 'Delayed Breast Reconstruction', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 1660, staffCost: 1160, implantCost: 0, consumablesCost: 500, inpatientElective: 6320, avgTheatreTime: 138, avgLengthOfStay: 5, hrgCode: 'JC96A', tariff: 6320, lastUpdated: '2025-01' },
  'S821': { opcs4: 'S821', procedureName: 'Implant-Based Reconstruction', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 1620, staffCost: 1130, implantCost: 1780, consumablesCost: 490, inpatientElective: 8620, avgTheatreTime: 135, avgLengthOfStay: 6, hrgCode: 'JC83A', tariff: 8620, lastUpdated: '2025-01' },
  'S822': { opcs4: 'S822', procedureName: 'Breast Reduction', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 23, avgLengthOfStay: 0, hrgCode: 'JC94Z', tariff: 240, lastUpdated: '2025-01' },
  'S823': { opcs4: 'S823', procedureName: 'Mastopexy', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'JC88Z', tariff: 200, lastUpdated: '2025-01' },
  'S824': { opcs4: 'S824', procedureName: 'Nipple Reconstruction', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 1870, staffCost: 1310, implantCost: 0, consumablesCost: 560, inpatientElective: 6740, avgTheatreTime: 156, avgLengthOfStay: 5, hrgCode: 'JC73A', tariff: 6740, lastUpdated: '2025-01' },
  'S825': { opcs4: 'S825', procedureName: 'Tattooing Areola', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 32, avgLengthOfStay: 0, hrgCode: 'JC87Z', tariff: 320, lastUpdated: '2025-01' },
  'S826': { opcs4: 'S826', procedureName: 'Latissimus Dorsi Flap', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 56, avgLengthOfStay: 0, hrgCode: 'JC52Z', tariff: 560, lastUpdated: '2025-01' },
  'S827': { opcs4: 'S827', procedureName: 'TRAM Flap', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'JC23Z', tariff: 360, lastUpdated: '2025-01' },
  'S828': { opcs4: 'S828', procedureName: 'Skin Grafting Burns', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 190, staffCost: 130, implantCost: 1190, consumablesCost: 60, dayCase: 1570, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'JC43Z', tariff: 1570, lastUpdated: '2025-01' },
  'S829': { opcs4: 'S829', procedureName: 'Laser Therapy Scars', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 27, avgLengthOfStay: 0, hrgCode: 'JC55Z', tariff: 280, lastUpdated: '2025-01' },
  'S830': { opcs4: 'S830', procedureName: 'Dermal Substitute Application', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'JC14Z', tariff: 420, lastUpdated: '2025-01' },
  'S831': { opcs4: 'S831', procedureName: 'Negative Pressure Wound Therapy', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 50, avgLengthOfStay: 0, hrgCode: 'JC51Z', tariff: 510, lastUpdated: '2025-01' },
  'S832': { opcs4: 'S832', procedureName: 'Cultured Epithelial Autograft', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 200, staffCost: 140, implantCost: 700, consumablesCost: 60, dayCase: 1100, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'JC20Z', tariff: 1100, lastUpdated: '2025-01' },
  'S833': { opcs4: 'S833', procedureName: 'Hand Burn Reconstruction', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 1790, staffCost: 1250, implantCost: 0, consumablesCost: 540, inpatientElective: 6580, avgTheatreTime: 149, avgLengthOfStay: 5, hrgCode: 'JC50A', tariff: 6580, lastUpdated: '2025-01' },
  'S834': { opcs4: 'S834', procedureName: 'Facial Burn Reconstruction', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 2180, staffCost: 1530, implantCost: 0, consumablesCost: 650, inpatientElective: 6160, avgTheatreTime: 182, avgLengthOfStay: 3, hrgCode: 'JC37A', tariff: 6160, lastUpdated: '2025-01' },
  'S835': { opcs4: 'S835', procedureName: 'Eyelid Reconstruction Burns', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 2590, staffCost: 1810, implantCost: 0, consumablesCost: 780, inpatientElective: 8780, avgTheatreTime: 216, avgLengthOfStay: 6, hrgCode: 'JC19A', tariff: 8780, lastUpdated: '2025-01' },
  'S836': { opcs4: 'S836', procedureName: 'Neck Contracture Release', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'JC90Z', tariff: 240, lastUpdated: '2025-01' },
  'S837': { opcs4: 'S837', procedureName: 'Axillary Contracture Release', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 41, avgLengthOfStay: 0, hrgCode: 'JC74Z', tariff: 420, lastUpdated: '2025-01' },
  'S838': { opcs4: 'S838', procedureName: 'Hypertrophic Scar Excision', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 42, avgLengthOfStay: 0, hrgCode: 'JC92Z', tariff: 420, lastUpdated: '2025-01' },
  'S839': { opcs4: 'S839', procedureName: 'Breast Symmetry Surgery', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'JC42Z', tariff: 600, lastUpdated: '2025-01' },
  'S840': { opcs4: 'S840', procedureName: 'Fat Grafting Breast', specialty: 'Plastics', subcategory: 'Burns & Breast', theatreCost: 170, staffCost: 120, implantCost: 1040, consumablesCost: 50, dayCase: 1380, avgTheatreTime: 34, avgLengthOfStay: 0, hrgCode: 'JC48Z', tariff: 1380, lastUpdated: '2025-01' },

  // Deep Inferior Epigastric Perforator
  'S843': { opcs4: 'S843', procedureName: 'Bilateral DIEP', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'JC40Z', tariff: 580, lastUpdated: '2025-01' },
  'S844': { opcs4: 'S844', procedureName: 'DIEP with Immediate Reconstruction', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 2600, staffCost: 1820, implantCost: 0, consumablesCost: 780, inpatientElective: 8800, avgTheatreTime: 217, avgLengthOfStay: 6, hrgCode: 'JC38A', tariff: 8800, lastUpdated: '2025-01' },
  'S845': { opcs4: 'S845', procedureName: 'DIEP Delayed Reconstruction', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 2240, staffCost: 1570, implantCost: 0, consumablesCost: 670, inpatientElective: 6880, avgTheatreTime: 187, avgLengthOfStay: 4, hrgCode: 'JC52A', tariff: 6880, lastUpdated: '2025-01' },
  'S846': { opcs4: 'S846', procedureName: 'DIEP Revision Surgery', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 52, avgLengthOfStay: 0, hrgCode: 'JC83Z', tariff: 520, lastUpdated: '2025-01' },
  'S847': { opcs4: 'S847', procedureName: 'DIEP Fat Grafting', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 110, staffCost: 80, implantCost: 1230, consumablesCost: 30, dayCase: 1450, avgTheatreTime: 22, avgLengthOfStay: 0, hrgCode: 'JC92Z', tariff: 1450, lastUpdated: '2025-01' },
  'S848': { opcs4: 'S848', procedureName: 'SIEA Flap', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 55, avgLengthOfStay: 0, hrgCode: 'JC57Z', tariff: 560, lastUpdated: '2025-01' },
  'S849': { opcs4: 'S849', procedureName: 'SGAP Flap', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'JC87Z', tariff: 400, lastUpdated: '2025-01' },
  'S850': { opcs4: 'S850', procedureName: 'IGAP Flap', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 48, avgLengthOfStay: 0, hrgCode: 'JC92Z', tariff: 480, lastUpdated: '2025-01' },
  'S851': { opcs4: 'S851', procedureName: 'TUG Flap', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'JC58Z', tariff: 520, lastUpdated: '2025-01' },
  'S852': { opcs4: 'S852', procedureName: 'PAP Flap', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 30, avgLengthOfStay: 0, hrgCode: 'JC10Z', tariff: 310, lastUpdated: '2025-01' },
  'S853': { opcs4: 'S853', procedureName: 'TMG Flap', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 34, avgLengthOfStay: 0, hrgCode: 'JC10Z', tariff: 340, lastUpdated: '2025-01' },
  'S854': { opcs4: 'S854', procedureName: 'Stacked DIEP Flaps', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'JC97Z', tariff: 520, lastUpdated: '2025-01' },
  'S855': { opcs4: 'S855', procedureName: 'DIEP with Lymph Node Transfer', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'JC74Z', tariff: 200, lastUpdated: '2025-01' },
  'S856': { opcs4: 'S856', procedureName: 'Perforator Mapping', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 110, staffCost: 80, implantCost: 0, consumablesCost: 30, dayCase: 220, avgTheatreTime: 22, avgLengthOfStay: 0, hrgCode: 'JC28Z', tariff: 220, lastUpdated: '2025-01' },
  'S857': { opcs4: 'S857', procedureName: 'DIEP Flap Salvage', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'JC35Z', tariff: 280, lastUpdated: '2025-01' },
  'S858': { opcs4: 'S858', procedureName: 'Microsurgical Anastomosis', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 210, staffCost: 150, implantCost: 0, consumablesCost: 60, dayCase: 420, avgTheatreTime: 41, avgLengthOfStay: 0, hrgCode: 'JC60Z', tariff: 420, lastUpdated: '2025-01' },
  'S859': { opcs4: 'S859', procedureName: 'Internal Mammary Vessels Prep', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 54, avgLengthOfStay: 0, hrgCode: 'JC61Z', tariff: 540, lastUpdated: '2025-01' },
  'S860': { opcs4: 'S860', procedureName: 'Thoracodorsal Vessels Prep', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'JC26Z', tariff: 400, lastUpdated: '2025-01' },
  'S861': { opcs4: 'S861', procedureName: 'Venous Coupler Application', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'JC13Z', tariff: 480, lastUpdated: '2025-01' },
  'S862': { opcs4: 'S862', procedureName: 'Implant to Flap Conversion', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 180, staffCost: 130, implantCost: 770, consumablesCost: 50, dayCase: 1130, avgTheatreTime: 36, avgLengthOfStay: 0, hrgCode: 'JC24Z', tariff: 1130, lastUpdated: '2025-01' },
  'S863': { opcs4: 'S863', procedureName: 'DIEP Flap Shaping', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 26, avgLengthOfStay: 0, hrgCode: 'JC72Z', tariff: 260, lastUpdated: '2025-01' },
  'S864': { opcs4: 'S864', procedureName: 'DIEP with Nipple Sparing', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'JC50Z', tariff: 540, lastUpdated: '2025-01' },
  'S865': { opcs4: 'S865', procedureName: 'DIEP Skin Paddle Design', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 29, avgLengthOfStay: 0, hrgCode: 'JC32Z', tariff: 310, lastUpdated: '2025-01' },
  'S866': { opcs4: 'S866', procedureName: 'Abdominal Wall Closure DIEP', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'JC41Z', tariff: 320, lastUpdated: '2025-01' },
  'S867': { opcs4: 'S867', procedureName: 'Mesh Reinforcement DIEP', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 200, staffCost: 140, implantCost: 1440, consumablesCost: 60, dayCase: 1840, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'JC44Z', tariff: 1840, lastUpdated: '2025-01' },
  'S868': { opcs4: 'S868', procedureName: 'DIEP Flap Monitoring', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'JC60Z', tariff: 540, lastUpdated: '2025-01' },
  'S869': { opcs4: 'S869', procedureName: 'Secondary DIEP Procedures', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'JC58Z', tariff: 200, lastUpdated: '2025-01' },
  'S870': { opcs4: 'S870', procedureName: 'DIEP Fat Necrosis Treatment', specialty: 'Plastics', subcategory: 'Deep Inferior Epigastric Perforator', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'JC54Z', tariff: 460, lastUpdated: '2025-01' },


  // ============================================================================
  // RENAL - Additional Financial Data
  // ============================================================================

  // Renal Transplant
  'M022': { opcs4: 'M022', procedureName: 'Deceased Donor Nephrectomy', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 2000, staffCost: 1400, implantCost: 0, consumablesCost: 600, inpatientElective: 6400, avgTheatreTime: 167, avgLengthOfStay: 4, hrgCode: 'LA47A', tariff: 6400, lastUpdated: '2025-01' },
  'M024': { opcs4: 'M024', procedureName: 'Laparoscopic Donor Nephrectomy', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 2320, staffCost: 1620, implantCost: 0, consumablesCost: 700, inpatientElective: 7640, avgTheatreTime: 193, avgLengthOfStay: 5, hrgCode: 'LA18A', tariff: 7640, lastUpdated: '2025-01' },
  'M025': { opcs4: 'M025', procedureName: 'Robotic Donor Nephrectomy', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 6460, staffCost: 4520, implantCost: 0, consumablesCost: 1940, inpatientElective: 20120, avgTheatreTime: 359, avgLengthOfStay: 12, hrgCode: 'LA27A', tariff: 20120, lastUpdated: '2025-01' },
  'M026': { opcs4: 'M026', procedureName: 'Transplant Nephrectomy', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 6440, staffCost: 4510, implantCost: 0, consumablesCost: 1930, inpatientElective: 18280, avgTheatreTime: 358, avgLengthOfStay: 9, hrgCode: 'LA30A', tariff: 18280, lastUpdated: '2025-01' },
  'M027': { opcs4: 'M027', procedureName: 'Transplant Biopsy', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 7610, staffCost: 5330, implantCost: 0, consumablesCost: 2280, inpatientElective: 21820, avgTheatreTime: 423, avgLengthOfStay: 11, hrgCode: 'LA73A', tariff: 21820, lastUpdated: '2025-01' },
  'M028': { opcs4: 'M028', procedureName: 'Ureteric Reimplantation Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 5650, staffCost: 3950, implantCost: 4110, consumablesCost: 1700, inpatientElective: 22610, avgTheatreTime: 314, avgLengthOfStay: 12, hrgCode: 'LA51A', tariff: 22610, lastUpdated: '2025-01' },
  'M029': { opcs4: 'M029', procedureName: 'Transplant Vascular Revision', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 7830, staffCost: 5480, implantCost: 0, consumablesCost: 2350, inpatientElective: 22860, avgTheatreTime: 435, avgLengthOfStay: 12, hrgCode: 'LA34A', tariff: 22860, lastUpdated: '2025-01' },
  'M030': { opcs4: 'M030', procedureName: 'Lymphocele Drainage', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 730, staffCost: 510, implantCost: 0, consumablesCost: 220, inpatientElective: 2060, avgTheatreTime: 91, avgLengthOfStay: 1, hrgCode: 'LA32B', tariff: 2060, lastUpdated: '2025-01' },
  'M031': { opcs4: 'M031', procedureName: 'Ureteric Stent Insertion Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 6880, staffCost: 4820, implantCost: 3550, consumablesCost: 2060, inpatientElective: 22710, avgTheatreTime: 382, avgLengthOfStay: 9, hrgCode: 'LA63A', tariff: 22710, lastUpdated: '2025-01' },
  'M032': { opcs4: 'M032', procedureName: 'Transplant Ureter Stricture', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 7020, staffCost: 4910, implantCost: 0, consumablesCost: 2110, inpatientElective: 20040, avgTheatreTime: 390, avgLengthOfStay: 10, hrgCode: 'LA39A', tariff: 20040, lastUpdated: '2025-01' },
  'M033': { opcs4: 'M033', procedureName: 'Transplant Renal Artery Stenosis', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 7430, staffCost: 5200, implantCost: 0, consumablesCost: 2230, inpatientElective: 19660, avgTheatreTime: 413, avgLengthOfStay: 8, hrgCode: 'LA61A', tariff: 19660, lastUpdated: '2025-01' },
  'M034': { opcs4: 'M034', procedureName: 'ABO Incompatible Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 6320, staffCost: 4420, implantCost: 0, consumablesCost: 1900, inpatientElective: 19840, avgTheatreTime: 351, avgLengthOfStay: 12, hrgCode: 'LA10A', tariff: 19840, lastUpdated: '2025-01' },
  'M035': { opcs4: 'M035', procedureName: 'HLA Incompatible Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 7290, staffCost: 5100, implantCost: 0, consumablesCost: 2190, inpatientElective: 19980, avgTheatreTime: 405, avgLengthOfStay: 9, hrgCode: 'LA70A', tariff: 19980, lastUpdated: '2025-01' },
  'M036': { opcs4: 'M036', procedureName: 'Paired Kidney Exchange', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 230, staffCost: 160, implantCost: 0, consumablesCost: 70, dayCase: 460, avgTheatreTime: 45, avgLengthOfStay: 0, hrgCode: 'LA92Z', tariff: 460, lastUpdated: '2025-01' },
  'M037': { opcs4: 'M037', procedureName: 'En Bloc Kidney Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 6230, staffCost: 4360, implantCost: 0, consumablesCost: 1870, inpatientElective: 17260, avgTheatreTime: 346, avgLengthOfStay: 8, hrgCode: 'LA19A', tariff: 17260, lastUpdated: '2025-01' },
  'M038': { opcs4: 'M038', procedureName: 'Pediatric Kidney Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 7690, staffCost: 5380, implantCost: 0, consumablesCost: 2310, inpatientElective: 20180, avgTheatreTime: 427, avgLengthOfStay: 8, hrgCode: 'LA82A', tariff: 20180, lastUpdated: '2025-01' },
  'M039': { opcs4: 'M039', procedureName: 'Re-Transplantation', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 5900, staffCost: 4130, implantCost: 0, consumablesCost: 1770, inpatientElective: 18400, avgTheatreTime: 328, avgLengthOfStay: 11, hrgCode: 'LA51A', tariff: 18400, lastUpdated: '2025-01' },
  'M040': { opcs4: 'M040', procedureName: 'Simultaneous Pancreas-Kidney', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 170, staffCost: 120, implantCost: 0, consumablesCost: 50, dayCase: 340, avgTheatreTime: 34, avgLengthOfStay: 0, hrgCode: 'LA45Z', tariff: 340, lastUpdated: '2025-01' },
  'M041': { opcs4: 'M041', procedureName: 'Pre-emptive Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 8300, staffCost: 5810, implantCost: 0, consumablesCost: 2490, inpatientElective: 23800, avgTheatreTime: 461, avgLengthOfStay: 12, hrgCode: 'LA25A', tariff: 23800, lastUpdated: '2025-01' },
  'M042': { opcs4: 'M042', procedureName: 'DCD Kidney Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 6050, staffCost: 4240, implantCost: 0, consumablesCost: 1820, inpatientElective: 17510, avgTheatreTime: 336, avgLengthOfStay: 9, hrgCode: 'LA27A', tariff: 17510, lastUpdated: '2025-01' },
  'M043': { opcs4: 'M043', procedureName: 'DBD Kidney Transplant', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 5580, staffCost: 3910, implantCost: 0, consumablesCost: 1670, inpatientElective: 15960, avgTheatreTime: 310, avgLengthOfStay: 8, hrgCode: 'LA92A', tariff: 15960, lastUpdated: '2025-01' },
  'M044': { opcs4: 'M044', procedureName: 'Transplant Wound Hematoma', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 7540, staffCost: 5280, implantCost: 0, consumablesCost: 2260, inpatientElective: 21080, avgTheatreTime: 419, avgLengthOfStay: 10, hrgCode: 'LA97A', tariff: 21080, lastUpdated: '2025-01' },
  'M045': { opcs4: 'M045', procedureName: 'Transplant Pyeloplasty', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 8150, staffCost: 5710, implantCost: 0, consumablesCost: 2450, inpatientElective: 22910, avgTheatreTime: 453, avgLengthOfStay: 11, hrgCode: 'LA66A', tariff: 22910, lastUpdated: '2025-01' },
  'M046': { opcs4: 'M046', procedureName: 'Machine Perfusion Preparation', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 1820, staffCost: 1270, implantCost: 0, consumablesCost: 550, inpatientElective: 6040, avgTheatreTime: 152, avgLengthOfStay: 4, hrgCode: 'LA36A', tariff: 6040, lastUpdated: '2025-01' },
  'M047': { opcs4: 'M047', procedureName: 'Normothermic Regional Perfusion', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 1510, staffCost: 1060, implantCost: 0, consumablesCost: 450, inpatientElective: 6020, avgTheatreTime: 126, avgLengthOfStay: 5, hrgCode: 'LA56A', tariff: 6020, lastUpdated: '2025-01' },
  'M048': { opcs4: 'M048', procedureName: 'Transplant Pyelonephritis Surgery', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 6980, staffCost: 4890, implantCost: 0, consumablesCost: 2090, inpatientElective: 19960, avgTheatreTime: 388, avgLengthOfStay: 10, hrgCode: 'LA17A', tariff: 19960, lastUpdated: '2025-01' },
  'M049': { opcs4: 'M049', procedureName: 'Transplant Calcineurin Toxicity', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 8350, staffCost: 5850, implantCost: 0, consumablesCost: 2510, inpatientElective: 21510, avgTheatreTime: 464, avgLengthOfStay: 8, hrgCode: 'LA87A', tariff: 21510, lastUpdated: '2025-01' },
  'M050': { opcs4: 'M050', procedureName: 'Transplant BK Virus Treatment', specialty: 'Renal', subcategory: 'Renal Transplant', theatreCost: 5720, staffCost: 4000, implantCost: 0, consumablesCost: 1720, inpatientElective: 16840, avgTheatreTime: 318, avgLengthOfStay: 9, hrgCode: 'LA54A', tariff: 16840, lastUpdated: '2025-01' },


  // ============================================================================
  // UROLOGY - Additional Financial Data
  // ============================================================================

  // Urology Laser
  'M683': { opcs4: 'M683', procedureName: 'Laser Lithotripsy', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'LB28Z', tariff: 540, lastUpdated: '2025-01' },
  'M684': { opcs4: 'M684', procedureName: 'Laser Urethrotomy', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'LB62Z', tariff: 320, lastUpdated: '2025-01' },
  'M685': { opcs4: 'M685', procedureName: 'Laser Bladder Tumor Ablation', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 49, avgLengthOfStay: 0, hrgCode: 'LB13Z', tariff: 510, lastUpdated: '2025-01' },
  'M686': { opcs4: 'M686', procedureName: 'Laser Ureteric Stricture', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 30, avgLengthOfStay: 0, hrgCode: 'LB72Z', tariff: 310, lastUpdated: '2025-01' },
  'M687': { opcs4: 'M687', procedureName: 'Thulium Laser Prostatectomy', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 2530, staffCost: 1770, implantCost: 0, consumablesCost: 760, inpatientElective: 8660, avgTheatreTime: 211, avgLengthOfStay: 6, hrgCode: 'LB18A', tariff: 8660, lastUpdated: '2025-01' },
  'M688': { opcs4: 'M688', procedureName: 'Laser Ablation Renal Tumor', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'LB15Z', tariff: 580, lastUpdated: '2025-01' },
  'M689': { opcs4: 'M689', procedureName: 'Laser Pyelotomy', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'LB25Z', tariff: 540, lastUpdated: '2025-01' },
  'M690': { opcs4: 'M690', procedureName: 'Laser Treatment BPH', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 57, avgLengthOfStay: 0, hrgCode: 'LB96Z', tariff: 580, lastUpdated: '2025-01' },
  'M691': { opcs4: 'M691', procedureName: 'Laser Bladder Neck Incision', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 150, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 310, avgTheatreTime: 29, avgLengthOfStay: 0, hrgCode: 'LB16Z', tariff: 310, lastUpdated: '2025-01' },
  'M692': { opcs4: 'M692', procedureName: 'Laser Fulguration Bladder', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 180, staffCost: 130, implantCost: 0, consumablesCost: 50, dayCase: 360, avgTheatreTime: 35, avgLengthOfStay: 0, hrgCode: 'LB94Z', tariff: 360, lastUpdated: '2025-01' },
  'M693': { opcs4: 'M693', procedureName: 'Laser Condyloma Treatment', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 250, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 510, avgTheatreTime: 50, avgLengthOfStay: 0, hrgCode: 'LB37Z', tariff: 510, lastUpdated: '2025-01' },
  'M694': { opcs4: 'M694', procedureName: 'Laser Urethral Stricture', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'LB97Z', tariff: 600, lastUpdated: '2025-01' },
  'M695': { opcs4: 'M695', procedureName: 'Laser Ejaculatory Duct Resection', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 2860, staffCost: 2000, implantCost: 0, consumablesCost: 860, inpatientElective: 9320, avgTheatreTime: 238, avgLengthOfStay: 6, hrgCode: 'LB98A', tariff: 9320, lastUpdated: '2025-01' },
  'M696': { opcs4: 'M696', procedureName: 'Laser Ureteroscopy', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 27, avgLengthOfStay: 0, hrgCode: 'LB77Z', tariff: 280, lastUpdated: '2025-01' },
  'M697': { opcs4: 'M697', procedureName: 'Retrograde Intrarenal Surgery', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 56, avgLengthOfStay: 0, hrgCode: 'LB24Z', tariff: 560, lastUpdated: '2025-01' },
  'M698': { opcs4: 'M698', procedureName: 'Laser Prostate Vaporization', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 23, avgLengthOfStay: 0, hrgCode: 'LB17Z', tariff: 240, lastUpdated: '2025-01' },
  'M699': { opcs4: 'M699', procedureName: 'Laser Dusting Stones', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'LB38Z', tariff: 480, lastUpdated: '2025-01' },
  'M700': { opcs4: 'M700', procedureName: 'Laser Basketing Stones', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'LB68Z', tariff: 260, lastUpdated: '2025-01' },
  'M701': { opcs4: 'M701', procedureName: 'Laser Ureteral Polyp', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 300, staffCost: 210, implantCost: 0, consumablesCost: 90, dayCase: 600, avgTheatreTime: 59, avgLengthOfStay: 0, hrgCode: 'LB69Z', tariff: 600, lastUpdated: '2025-01' },
  'M702': { opcs4: 'M702', procedureName: 'Laser Treating Papillary Tumor', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 190, staffCost: 130, implantCost: 0, consumablesCost: 60, dayCase: 380, avgTheatreTime: 37, avgLengthOfStay: 0, hrgCode: 'LB14Z', tariff: 380, lastUpdated: '2025-01' },
  'M703': { opcs4: 'M703', procedureName: 'Laser Calyceal Diverticulum', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'LB16Z', tariff: 200, lastUpdated: '2025-01' },
  'M704': { opcs4: 'M704', procedureName: 'Laser UPJ Obstruction', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'LB88Z', tariff: 200, lastUpdated: '2025-01' },
  'M705': { opcs4: 'M705', procedureName: 'Laser Lower Pole Access', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'LB70Z', tariff: 240, lastUpdated: '2025-01' },
  'M706': { opcs4: 'M706', procedureName: 'Laser Resection Median Lobe', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 1760, staffCost: 1230, implantCost: 0, consumablesCost: 530, inpatientElective: 5920, avgTheatreTime: 147, avgLengthOfStay: 4, hrgCode: 'LB14A', tariff: 5920, lastUpdated: '2025-01' },
  'M707': { opcs4: 'M707', procedureName: 'Laser BPH Simple Enucleation', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'LB93Z', tariff: 440, lastUpdated: '2025-01' },
  'M708': { opcs4: 'M708', procedureName: 'Laser Prostatic Utricle', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 31, avgLengthOfStay: 0, hrgCode: 'LB74Z', tariff: 320, lastUpdated: '2025-01' },
  'M709': { opcs4: 'M709', procedureName: 'Laser Vesical Diverticulum', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 40, avgLengthOfStay: 0, hrgCode: 'LB25Z', tariff: 400, lastUpdated: '2025-01' },
  'M710': { opcs4: 'M710', procedureName: 'Laser Ureteral Stone Bilateral', specialty: 'Urology', subcategory: 'Urology Laser', theatreCost: 240, staffCost: 170, implantCost: 0, consumablesCost: 70, dayCase: 480, avgTheatreTime: 47, avgLengthOfStay: 0, hrgCode: 'LB94Z', tariff: 480, lastUpdated: '2025-01' },

  // Urology Robotic
  'M653': { opcs4: 'M653', procedureName: 'Robotic Radical Nephrectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 8460, staffCost: 5920, implantCost: 0, consumablesCost: 2540, inpatientElective: 22920, avgTheatreTime: 470, avgLengthOfStay: 10, hrgCode: 'LB71A', tariff: 22920, lastUpdated: '2025-01' },
  'M654': { opcs4: 'M654', procedureName: 'Robotic Pyeloplasty', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7000, staffCost: 4900, implantCost: 0, consumablesCost: 2100, inpatientElective: 19400, avgTheatreTime: 389, avgLengthOfStay: 9, hrgCode: 'LB15A', tariff: 19400, lastUpdated: '2025-01' },
  'M655': { opcs4: 'M655', procedureName: 'Robotic Cystectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6750, staffCost: 4730, implantCost: 0, consumablesCost: 2030, inpatientElective: 18310, avgTheatreTime: 375, avgLengthOfStay: 8, hrgCode: 'LB23A', tariff: 18310, lastUpdated: '2025-01' },
  'M656': { opcs4: 'M656', procedureName: 'Robotic Sacrocolpopexy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6340, staffCost: 4440, implantCost: 0, consumablesCost: 1900, inpatientElective: 19880, avgTheatreTime: 352, avgLengthOfStay: 12, hrgCode: 'LB82A', tariff: 19880, lastUpdated: '2025-01' },
  'M657': { opcs4: 'M657', procedureName: 'Robotic Ureteric Reimplantation', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7970, staffCost: 5580, implantCost: 3830, consumablesCost: 2390, inpatientElective: 26370, avgTheatreTime: 443, avgLengthOfStay: 11, hrgCode: 'LB74A', tariff: 26370, lastUpdated: '2025-01' },
  'M658': { opcs4: 'M658', procedureName: 'Robotic Lymph Node Dissection', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7790, staffCost: 5450, implantCost: 0, consumablesCost: 2340, inpatientElective: 20380, avgTheatreTime: 433, avgLengthOfStay: 8, hrgCode: 'LB83A', tariff: 20380, lastUpdated: '2025-01' },
  'M659': { opcs4: 'M659', procedureName: 'Robotic Adrenalectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 5670, staffCost: 3970, implantCost: 0, consumablesCost: 1700, inpatientElective: 16740, avgTheatreTime: 315, avgLengthOfStay: 9, hrgCode: 'LB22A', tariff: 16740, lastUpdated: '2025-01' },
  'M660': { opcs4: 'M660', procedureName: 'Robotic Nephroureterectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7220, staffCost: 5050, implantCost: 0, consumablesCost: 2170, inpatientElective: 21640, avgTheatreTime: 401, avgLengthOfStay: 12, hrgCode: 'LB55A', tariff: 21640, lastUpdated: '2025-01' },
  'M661': { opcs4: 'M661', procedureName: 'Robotic Ileal Conduit', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6880, staffCost: 4820, implantCost: 0, consumablesCost: 2060, inpatientElective: 19160, avgTheatreTime: 382, avgLengthOfStay: 9, hrgCode: 'LB64A', tariff: 19160, lastUpdated: '2025-01' },
  'M662': { opcs4: 'M662', procedureName: 'Robotic Neobladder', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7430, staffCost: 5200, implantCost: 0, consumablesCost: 2230, inpatientElective: 19660, avgTheatreTime: 413, avgLengthOfStay: 8, hrgCode: 'LB50A', tariff: 19660, lastUpdated: '2025-01' },
  'M663': { opcs4: 'M663', procedureName: 'Robotic Varicocelectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6520, staffCost: 4560, implantCost: 0, consumablesCost: 1960, inpatientElective: 17840, avgTheatreTime: 362, avgLengthOfStay: 8, hrgCode: 'LB24A', tariff: 17840, lastUpdated: '2025-01' },
  'M664': { opcs4: 'M664', procedureName: 'Robotic Vesicovaginal Fistula', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7470, staffCost: 5230, implantCost: 0, consumablesCost: 2240, inpatientElective: 19740, avgTheatreTime: 415, avgLengthOfStay: 8, hrgCode: 'LB23A', tariff: 19740, lastUpdated: '2025-01' },
  'M665': { opcs4: 'M665', procedureName: 'Robotic Urethral Reconstruction', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7790, staffCost: 5450, implantCost: 0, consumablesCost: 2340, inpatientElective: 20980, avgTheatreTime: 433, avgLengthOfStay: 9, hrgCode: 'LB17A', tariff: 20980, lastUpdated: '2025-01' },
  'M666': { opcs4: 'M666', procedureName: 'Robotic Bladder Diverticulectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6430, staffCost: 4500, implantCost: 0, consumablesCost: 1930, inpatientElective: 17660, avgTheatreTime: 357, avgLengthOfStay: 8, hrgCode: 'LB11A', tariff: 17660, lastUpdated: '2025-01' },
  'M667': { opcs4: 'M667', procedureName: 'Robotic Simple Prostatectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 8260, staffCost: 5780, implantCost: 0, consumablesCost: 2480, inpatientElective: 23720, avgTheatreTime: 459, avgLengthOfStay: 12, hrgCode: 'LB67A', tariff: 23720, lastUpdated: '2025-01' },
  'M668': { opcs4: 'M668', procedureName: 'Robotic Ureterolysis', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7670, staffCost: 5370, implantCost: 0, consumablesCost: 2300, inpatientElective: 20740, avgTheatreTime: 426, avgLengthOfStay: 9, hrgCode: 'LB38A', tariff: 20740, lastUpdated: '2025-01' },
  'M669': { opcs4: 'M669', procedureName: 'Robotic Retroperitoneal Mass', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 8140, staffCost: 5700, implantCost: 0, consumablesCost: 2440, inpatientElective: 21680, avgTheatreTime: 452, avgLengthOfStay: 9, hrgCode: 'LB31A', tariff: 21680, lastUpdated: '2025-01' },
  'M670': { opcs4: 'M670', procedureName: 'Robotic Renal Cyst Decortication', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 8590, staffCost: 6010, implantCost: 0, consumablesCost: 2580, inpatientElective: 22580, avgTheatreTime: 477, avgLengthOfStay: 9, hrgCode: 'LB57A', tariff: 22580, lastUpdated: '2025-01' },
  'M671': { opcs4: 'M671', procedureName: 'Robotic Burch Colposuspension', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7240, staffCost: 5070, implantCost: 0, consumablesCost: 2170, inpatientElective: 19280, avgTheatreTime: 402, avgLengthOfStay: 8, hrgCode: 'LB73A', tariff: 19280, lastUpdated: '2025-01' },
  'M672': { opcs4: 'M672', procedureName: 'Robotic Urethral Diverticulum', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7160, staffCost: 5010, implantCost: 0, consumablesCost: 2150, inpatientElective: 20920, avgTheatreTime: 398, avgLengthOfStay: 11, hrgCode: 'LB29A', tariff: 20920, lastUpdated: '2025-01' },
  'M673': { opcs4: 'M673', procedureName: 'Robotic Bladder Augmentation', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6800, staffCost: 4760, implantCost: 0, consumablesCost: 2040, inpatientElective: 19600, avgTheatreTime: 378, avgLengthOfStay: 10, hrgCode: 'LB69A', tariff: 19600, lastUpdated: '2025-01' },
  'M674': { opcs4: 'M674', procedureName: 'Robotic Urachal Cyst Excision', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 8410, staffCost: 5890, implantCost: 0, consumablesCost: 2520, inpatientElective: 21620, avgTheatreTime: 467, avgLengthOfStay: 8, hrgCode: 'LB31A', tariff: 21620, lastUpdated: '2025-01' },
  'M675': { opcs4: 'M675', procedureName: 'Robotic Pelvic Lymphocele', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6120, staffCost: 4280, implantCost: 0, consumablesCost: 1840, inpatientElective: 18240, avgTheatreTime: 340, avgLengthOfStay: 10, hrgCode: 'LB89A', tariff: 18240, lastUpdated: '2025-01' },
  'M676': { opcs4: 'M676', procedureName: 'Robotic Megaureter Repair', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 7580, staffCost: 5310, implantCost: 0, consumablesCost: 2270, inpatientElective: 21760, avgTheatreTime: 421, avgLengthOfStay: 11, hrgCode: 'LB81A', tariff: 21760, lastUpdated: '2025-01' },
  'M677': { opcs4: 'M677', procedureName: 'Robotic Ureteric Stricture', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6800, staffCost: 4760, implantCost: 0, consumablesCost: 2040, inpatientElective: 18400, avgTheatreTime: 378, avgLengthOfStay: 8, hrgCode: 'LB36A', tariff: 18400, lastUpdated: '2025-01' },
  'M678': { opcs4: 'M678', procedureName: 'Robotic Calyceal Diverticulectomy', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6010, staffCost: 4210, implantCost: 0, consumablesCost: 1800, inpatientElective: 19220, avgTheatreTime: 334, avgLengthOfStay: 12, hrgCode: 'LB88A', tariff: 19220, lastUpdated: '2025-01' },
  'M679': { opcs4: 'M679', procedureName: 'Robotic Bladder Neck Reconstruction', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 6430, staffCost: 4500, implantCost: 0, consumablesCost: 1930, inpatientElective: 17660, avgTheatreTime: 357, avgLengthOfStay: 8, hrgCode: 'LB50A', tariff: 17660, lastUpdated: '2025-01' },
  'M680': { opcs4: 'M680', procedureName: 'Robotic Anderson-Hynes Pyeloplasty', specialty: 'Urology', subcategory: 'Urology Robotic', theatreCost: 8140, staffCost: 5700, implantCost: 0, consumablesCost: 2440, inpatientElective: 22880, avgTheatreTime: 452, avgLengthOfStay: 11, hrgCode: 'LB88A', tariff: 22880, lastUpdated: '2025-01' },


  // ============================================================================
  // VASCULAR - Additional Financial Data
  // ============================================================================

  'L274': { opcs4: 'L274', procedureName: 'Femoral-Popliteal Bypass', specialty: 'Vascular', subcategory: '', theatreCost: 1940, staffCost: 1360, implantCost: 0, consumablesCost: 580, inpatientElective: 5680, avgTheatreTime: 162, avgLengthOfStay: 3, hrgCode: 'QZ15A', tariff: 5680, lastUpdated: '2025-01' },
  'L275': { opcs4: 'L275', procedureName: 'Aorto-Bifemoral Bypass', specialty: 'Vascular', subcategory: '', theatreCost: 1600, staffCost: 1120, implantCost: 0, consumablesCost: 480, inpatientElective: 6800, avgTheatreTime: 133, avgLengthOfStay: 6, hrgCode: 'QZ59A', tariff: 6800, lastUpdated: '2025-01' },
  'L276': { opcs4: 'L276', procedureName: 'Thoracic Aortic Aneurysm Repair', specialty: 'Vascular', subcategory: '', theatreCost: 610, staffCost: 430, implantCost: 0, consumablesCost: 180, inpatientElective: 2420, avgTheatreTime: 76, avgLengthOfStay: 2, hrgCode: 'QZ32B', tariff: 2420, lastUpdated: '2025-01' },
  'L277': { opcs4: 'L277', procedureName: 'TEVAR', specialty: 'Vascular', subcategory: '', theatreCost: 220, staffCost: 150, implantCost: 0, consumablesCost: 70, dayCase: 440, avgTheatreTime: 44, avgLengthOfStay: 0, hrgCode: 'QZ25Z', tariff: 440, lastUpdated: '2025-01' },
  'L278': { opcs4: 'L278', procedureName: 'Lower Limb Amputation', specialty: 'Vascular', subcategory: '', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'QZ89Z', tariff: 520, lastUpdated: '2025-01' },
  'L279': { opcs4: 'L279', procedureName: 'Embolectomy', specialty: 'Vascular', subcategory: '', theatreCost: 2030, staffCost: 1420, implantCost: 0, consumablesCost: 610, inpatientElective: 7060, avgTheatreTime: 169, avgLengthOfStay: 5, hrgCode: 'QZ18A', tariff: 7060, lastUpdated: '2025-01' },
  'L280': { opcs4: 'L280', procedureName: 'Thrombectomy', specialty: 'Vascular', subcategory: '', theatreCost: 2830, staffCost: 1980, implantCost: 0, consumablesCost: 850, inpatientElective: 8060, avgTheatreTime: 236, avgLengthOfStay: 4, hrgCode: 'QZ12A', tariff: 8060, lastUpdated: '2025-01' },
  'L281': { opcs4: 'L281', procedureName: 'AV Fistula Creation', specialty: 'Vascular', subcategory: '', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'QZ65Z', tariff: 240, lastUpdated: '2025-01' },
  'L282': { opcs4: 'L282', procedureName: 'Varicose Vein Surgery', specialty: 'Vascular', subcategory: '', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'QZ77Z', tariff: 260, lastUpdated: '2025-01' },
  'L283': { opcs4: 'L283', procedureName: 'Endovenous Laser Ablation', specialty: 'Vascular', subcategory: '', theatreCost: 120, staffCost: 80, implantCost: 0, consumablesCost: 40, dayCase: 240, avgTheatreTime: 24, avgLengthOfStay: 0, hrgCode: 'QZ15Z', tariff: 240, lastUpdated: '2025-01' },
  'L284': { opcs4: 'L284', procedureName: 'Radiofrequency Ablation Veins', specialty: 'Vascular', subcategory: '', theatreCost: 130, staffCost: 90, implantCost: 0, consumablesCost: 40, dayCase: 260, avgTheatreTime: 25, avgLengthOfStay: 0, hrgCode: 'QZ53Z', tariff: 260, lastUpdated: '2025-01' },
  'L285': { opcs4: 'L285', procedureName: 'Mesenteric Artery Bypass', specialty: 'Vascular', subcategory: '', theatreCost: 2260, staffCost: 1580, implantCost: 0, consumablesCost: 680, inpatientElective: 7520, avgTheatreTime: 188, avgLengthOfStay: 5, hrgCode: 'QZ98A', tariff: 7520, lastUpdated: '2025-01' },
  'L286': { opcs4: 'L286', procedureName: 'Renal Artery Bypass', specialty: 'Vascular', subcategory: '', theatreCost: 1820, staffCost: 1270, implantCost: 0, consumablesCost: 550, inpatientElective: 6040, avgTheatreTime: 152, avgLengthOfStay: 4, hrgCode: 'QZ26A', tariff: 6040, lastUpdated: '2025-01' },
  'L287': { opcs4: 'L287', procedureName: 'Axillo-Femoral Bypass', specialty: 'Vascular', subcategory: '', theatreCost: 1740, staffCost: 1220, implantCost: 0, consumablesCost: 520, inpatientElective: 7080, avgTheatreTime: 145, avgLengthOfStay: 6, hrgCode: 'QZ83A', tariff: 7080, lastUpdated: '2025-01' },
  'L288': { opcs4: 'L288', procedureName: 'Popliteal Aneurysm Repair', specialty: 'Vascular', subcategory: '', theatreCost: 460, staffCost: 320, implantCost: 0, consumablesCost: 140, inpatientElective: 1520, avgTheatreTime: 58, avgLengthOfStay: 1, hrgCode: 'QZ88B', tariff: 1520, lastUpdated: '2025-01' },
  'L289': { opcs4: 'L289', procedureName: 'Iliac Artery Angioplasty', specialty: 'Vascular', subcategory: '', theatreCost: 160, staffCost: 110, implantCost: 0, consumablesCost: 50, dayCase: 320, avgTheatreTime: 32, avgLengthOfStay: 0, hrgCode: 'QZ73Z', tariff: 320, lastUpdated: '2025-01' },
  'L290': { opcs4: 'L290', procedureName: 'Femoral Artery Angioplasty', specialty: 'Vascular', subcategory: '', theatreCost: 280, staffCost: 200, implantCost: 0, consumablesCost: 80, dayCase: 560, avgTheatreTime: 56, avgLengthOfStay: 0, hrgCode: 'QZ30Z', tariff: 560, lastUpdated: '2025-01' },
  'L292': { opcs4: 'L292', procedureName: 'Subclavian Artery Bypass', specialty: 'Vascular', subcategory: '', theatreCost: 2750, staffCost: 1920, implantCost: 0, consumablesCost: 830, inpatientElective: 7900, avgTheatreTime: 229, avgLengthOfStay: 4, hrgCode: 'QZ92A', tariff: 7900, lastUpdated: '2025-01' },
  'L293': { opcs4: 'L293', procedureName: 'Vascular Access Revision', specialty: 'Vascular', subcategory: '', theatreCost: 270, staffCost: 190, implantCost: 0, consumablesCost: 80, dayCase: 540, avgTheatreTime: 53, avgLengthOfStay: 0, hrgCode: 'QZ36Z', tariff: 540, lastUpdated: '2025-01' },
  'L294': { opcs4: 'L294', procedureName: 'Thoracic Outlet Decompression', specialty: 'Vascular', subcategory: '', theatreCost: 290, staffCost: 200, implantCost: 0, consumablesCost: 90, dayCase: 580, avgTheatreTime: 58, avgLengthOfStay: 0, hrgCode: 'QZ34Z', tariff: 580, lastUpdated: '2025-01' },
  'L295': { opcs4: 'L295', procedureName: 'Sympathectomy', specialty: 'Vascular', subcategory: '', theatreCost: 2420, staffCost: 1690, implantCost: 0, consumablesCost: 730, inpatientElective: 6640, avgTheatreTime: 202, avgLengthOfStay: 3, hrgCode: 'QZ63A', tariff: 6640, lastUpdated: '2025-01' },
  'L296': { opcs4: 'L296', procedureName: 'Aortic Dissection Repair', specialty: 'Vascular', subcategory: '', theatreCost: 690, staffCost: 480, implantCost: 0, consumablesCost: 210, inpatientElective: 2580, avgTheatreTime: 86, avgLengthOfStay: 2, hrgCode: 'QZ58B', tariff: 2580, lastUpdated: '2025-01' },
  'L297': { opcs4: 'L297', procedureName: 'Fenestrated EVAR', specialty: 'Vascular', subcategory: '', theatreCost: 140, staffCost: 100, implantCost: 0, consumablesCost: 40, dayCase: 280, avgTheatreTime: 28, avgLengthOfStay: 0, hrgCode: 'QZ23Z', tariff: 280, lastUpdated: '2025-01' },
  'L298': { opcs4: 'L298', procedureName: 'Visceral Artery Aneurysm', specialty: 'Vascular', subcategory: '', theatreCost: 260, staffCost: 180, implantCost: 0, consumablesCost: 80, dayCase: 520, avgTheatreTime: 51, avgLengthOfStay: 0, hrgCode: 'QZ13Z', tariff: 520, lastUpdated: '2025-01' },
  'L299': { opcs4: 'L299', procedureName: 'Vena Cava Filter', specialty: 'Vascular', subcategory: '', theatreCost: 100, staffCost: 70, implantCost: 0, consumablesCost: 30, dayCase: 200, avgTheatreTime: 20, avgLengthOfStay: 0, hrgCode: 'QZ48Z', tariff: 200, lastUpdated: '2025-01' },
  'L300': { opcs4: 'L300', procedureName: 'Deep Vein Thrombosis Surgery', specialty: 'Vascular', subcategory: '', theatreCost: 200, staffCost: 140, implantCost: 0, consumablesCost: 60, dayCase: 400, avgTheatreTime: 39, avgLengthOfStay: 0, hrgCode: 'QZ61Z', tariff: 400, lastUpdated: '2025-01' },

};

// ============================================================================
// HRG CODES (Healthcare Resource Groups) & NHS TARIFFS
// Layer 2: Financial coding and reimbursement
// Based on NHS National Tariff 2024/25
// ============================================================================

export interface HRGCode {
  code: string;
  description: string;
  baseTariff: number; // £
  specialty: string;
  mappedOPCS4: string[]; // Which OPCS-4 codes map to this HRG
  avgLOS: number; // Average length of stay (days)
  dayCase?: boolean; // Can be performed as day case
  dayCaseTariff?: number; // Day case specific tariff
  trimPoint?: number; // Excess bed days threshold
  perDiemRate?: number; // Additional cost per day beyond trim point
  lastUpdated: string;
  modifiers?: {
    age?: { threshold: number; multiplier: number }; // e.g., age > 65 = 1.15x
    complications?: number; // CC/MCC multiplier
    emergency?: number; // Emergency admission multiplier
  };
}

export const HRG_CODES: Record<string, HRGCode> = {
  // Trauma Orthopaedics
  'HN12A': {
    code: 'HN12A',
    description: 'Primary Hip Replacement - Major',
    baseTariff: 9850,
    specialty: 'Trauma Orthopaedics',
    mappedOPCS4: ['W371', 'W381', 'W391', 'W931'],
    avgLOS: 4,
    trimPoint: 9,
    perDiemRate: 325,
    lastUpdated: '2024-04',
    modifiers: {
      age: { threshold: 70, multiplier: 1.12 },
      complications: 1.18,
      emergency: 1.25
    }
  },
  'HN22A': {
    code: 'HN22A',
    description: 'Hip Trauma - Major',
    baseTariff: 5840,
    specialty: 'Trauma Orthopaedics',
    mappedOPCS4: ['W241'],
    avgLOS: 8,
    trimPoint: 15,
    perDiemRate: 280,
    lastUpdated: '2024-04',
    modifiers: {
      age: { threshold: 75, multiplier: 1.15 },
      complications: 1.22,
      emergency: 1.15
    }
  },
  'HN22B': {
    code: 'HN22B',
    description: 'Hip Trauma - Very Major',
    baseTariff: 7280,
    specialty: 'Trauma Orthopaedics',
    mappedOPCS4: ['W244'],
    avgLOS: 10,
    trimPoint: 18,
    perDiemRate: 295,
    lastUpdated: '2024-04',
    modifiers: {
      age: { threshold: 75, multiplier: 1.18 },
      complications: 1.25,
      emergency: 1.2
    }
  },
  'HN22C': {
    code: 'HN22C',
    description: 'Knee Replacement - Major',
    baseTariff: 8920,
    specialty: 'Trauma Orthopaedics',
    mappedOPCS4: ['W401', 'W402', 'W411', 'W412', 'W421', 'W422'],
    avgLOS: 3,
    trimPoint: 7,
    perDiemRate: 310,
    lastUpdated: '2024-04',
    modifiers: {
      age: { threshold: 70, multiplier: 1.1 },
      complications: 1.15
    }
  },
  'HN42A': {
    code: 'HN42A',
    description: 'Knee Arthroscopy and Reconstruction',
    baseTariff: 4250,
    specialty: 'Trauma Orthopaedics',
    mappedOPCS4: ['W821', 'W801', 'O171', 'O172'],
    avgLOS: 1,
    dayCase: true,
    dayCaseTariff: 4250,
    lastUpdated: '2024-04'
  },
  'HN52A': {
    code: 'HN52A',
    description: 'Shoulder Arthroscopy - Major',
    baseTariff: 3840,
    specialty: 'Trauma Orthopaedics',
    mappedOPCS4: ['W825', 'W805', 'T523'],
    avgLOS: 1,
    dayCase: true,
    dayCaseTariff: 3840,
    lastUpdated: '2024-04'
  },
  'HN61A': {
    code: 'HN61A',
    description: 'Hand and Wrist Procedures',
    baseTariff: 2180,
    specialty: 'Trauma Orthopaedics',
    mappedOPCS4: ['A651', 'A652', 'T661', 'T668'],
    avgLOS: 0,
    dayCase: true,
    dayCaseTariff: 2180,
    lastUpdated: '2024-04'
  },
  'HN83A': {
    code: 'HN83A',
    description: 'Spinal Surgery - Major',
    baseTariff: 8640,
    specialty: 'Trauma Orthopaedics',
    mappedOPCS4: ['V254', 'V334', 'V383', 'V384'],
    avgLOS: 5,
    trimPoint: 12,
    perDiemRate: 340,
    lastUpdated: '2024-04',
    modifiers: {
      complications: 1.35
    }
  },

  // General Surgery
  'FZ38A': {
    code: 'FZ38A',
    description: 'Laparoscopic Cholecystectomy',
    baseTariff: 2840,
    specialty: 'General Surgery',
    mappedOPCS4: ['J183'],
    avgLOS: 1,
    dayCase: true,
    dayCaseTariff: 2840,
    lastUpdated: '2024-04',
    modifiers: {
      emergency: 1.45
    }
  },
  'FZ49A': {
    code: 'FZ49A',
    description: 'Large Intestine Procedures - Major',
    baseTariff: 8640,
    specialty: 'General Surgery',
    mappedOPCS4: ['H063', 'H073', 'H333'],
    avgLOS: 7,
    trimPoint: 14,
    perDiemRate: 320,
    lastUpdated: '2024-04',
    modifiers: {
      complications: 1.25,
      emergency: 1.35
    }
  },
  'FZ51A': {
    code: 'FZ51A',
    description: 'Appendicectomy',
    baseTariff: 3420,
    specialty: 'General Surgery',
    mappedOPCS4: ['H011', 'H013'],
    avgLOS: 2,
    dayCase: false,
    lastUpdated: '2024-04',
    modifiers: {
      complications: 1.28,
      emergency: 1.2
    }
  },
  'FZ62A': {
    code: 'FZ62A',
    description: 'Hernia Repair - Inguinal/Femoral',
    baseTariff: 1680,
    specialty: 'General Surgery',
    mappedOPCS4: ['T201', 'T203', 'T211', 'T213'],
    avgLOS: 0,
    dayCase: true,
    dayCaseTariff: 1680,
    lastUpdated: '2024-04'
  },
  'JA12A': {
    code: 'JA12A',
    description: 'Breast Surgery - Malignant',
    baseTariff: 3850,
    specialty: 'General Surgery',
    mappedOPCS4: ['B281', 'B271', 'B272', 'B273'],
    avgLOS: 2,
    dayCase: true,
    dayCaseTariff: 3420,
    lastUpdated: '2024-04'
  },

  // Vascular Surgery
  'QZ15A': {
    code: 'QZ15A',
    description: 'Carotid Endarterectomy',
    baseTariff: 6840,
    specialty: 'Vascular Surgery',
    mappedOPCS4: ['L291'],
    avgLOS: 3,
    trimPoint: 8,
    perDiemRate: 310,
    lastUpdated: '2024-04',
    modifiers: {
      complications: 1.32
    }
  },
  'QZ16A': {
    code: 'QZ16A',
    description: 'Aortic Aneurysm Repair - EVAR',
    baseTariff: 18400,
    specialty: 'Vascular Surgery',
    mappedOPCS4: ['L183', 'L193'],
    avgLOS: 4,
    trimPoint: 10,
    perDiemRate: 450,
    lastUpdated: '2024-04',
    modifiers: {
      age: { threshold: 75, multiplier: 1.15 },
      complications: 1.4,
      emergency: 1.5
    }
  },
  'QZ18A': {
    code: 'QZ18A',
    description: 'Lower Limb Bypass',
    baseTariff: 7280,
    specialty: 'Vascular Surgery',
    mappedOPCS4: ['L511', 'L512', 'L513', 'L521', 'L522'],
    avgLOS: 8,
    trimPoint: 16,
    perDiemRate: 295,
    lastUpdated: '2024-04',
    modifiers: {
      complications: 1.35
    }
  },

  // Urology
  'LB15A': {
    code: 'LB15A',
    description: 'Radical Prostatectomy',
    baseTariff: 9850,
    specialty: 'Urology',
    mappedOPCS4: ['M611', 'M612', 'M613', 'M614'],
    avgLOS: 5,
    trimPoint: 10,
    perDiemRate: 330,
    lastUpdated: '2024-04',
    modifiers: {
      complications: 1.22
    }
  },
  'LB26A': {
    code: 'LB26A',
    description: 'TURP and Bladder Neck Procedures',
    baseTariff: 3680,
    specialty: 'Urology',
    mappedOPCS4: ['M651', 'M652', 'M782'],
    avgLOS: 2,
    trimPoint: 5,
    perDiemRate: 280,
    lastUpdated: '2024-04'
  },
  'LB32A': {
    code: 'LB32A',
    description: 'Cystoscopy and Ureteroscopy',
    baseTariff: 2140,
    specialty: 'Urology',
    mappedOPCS4: ['M451', 'M281'],
    avgLOS: 0,
    dayCase: true,
    dayCaseTariff: 2140,
    lastUpdated: '2024-04'
  },

  // Cardiothoracic
  'EA02A': {
    code: 'EA02A',
    description: 'Coronary Artery Bypass Graft',
    baseTariff: 18650,
    specialty: 'Cardiothoracic Surgery',
    mappedOPCS4: ['K401', 'K402', 'K403', 'K404'],
    avgLOS: 8,
    trimPoint: 15,
    perDiemRate: 680,
    lastUpdated: '2024-04',
    modifiers: {
      age: { threshold: 70, multiplier: 1.2 },
      complications: 1.45,
      emergency: 1.6
    }
  },
  'EA08A': {
    code: 'EA08A',
    description: 'Valve Replacement',
    baseTariff: 22400,
    specialty: 'Cardiothoracic Surgery',
    mappedOPCS4: ['K251', 'K252', 'K253', 'K261', 'K262'],
    avgLOS: 9,
    trimPoint: 18,
    perDiemRate: 720,
    lastUpdated: '2024-04',
    modifiers: {
      age: { threshold: 70, multiplier: 1.25 },
      complications: 1.5,
      emergency: 1.7
    }
  },
  'DZ51A': {
    code: 'DZ51A',
    description: 'Thoracic Surgery - Major',
    baseTariff: 12400,
    specialty: 'Cardiothoracic Surgery',
    mappedOPCS4: ['E541', 'E542', 'E543', 'E551'],
    avgLOS: 7,
    trimPoint: 14,
    perDiemRate: 480,
    lastUpdated: '2024-04',
    modifiers: {
      complications: 1.38
    }
  },

  // Gynaecology
  'MA10A': {
    code: 'MA10A',
    description: 'Hysterectomy - Laparoscopic',
    baseTariff: 4920,
    specialty: 'Gynaecology',
    mappedOPCS4: ['Q075', 'Q076'],
    avgLOS: 2,
    trimPoint: 5,
    perDiemRate: 285,
    lastUpdated: '2024-04'
  },
  'NZ30A': {
    code: 'NZ30A',
    description: 'Caesarean Section',
    baseTariff: 3420,
    specialty: 'Gynaecology',
    mappedOPCS4: ['R171', 'R172', 'R173', 'R174'],
    avgLOS: 3,
    trimPoint: 7,
    perDiemRate: 260,
    lastUpdated: '2024-04',
    modifiers: {
      complications: 1.35,
      emergency: 1.15
    }
  },

  // ENT
  'CA21A': {
    code: 'CA21A',
    description: 'Thyroid and Parathyroid Procedures',
    baseTariff: 4180,
    specialty: 'ENT',
    mappedOPCS4: ['B081', 'B082', 'B083', 'B091', 'B092'],
    avgLOS: 2,
    trimPoint: 5,
    perDiemRate: 275,
    lastUpdated: '2024-04'
  },
  'CA31A': {
    code: 'CA31A',
    description: 'Tonsillectomy and Adenoidectomy',
    baseTariff: 1840,
    specialty: 'ENT',
    mappedOPCS4: ['F341', 'F342', 'E201'],
    avgLOS: 1,
    dayCase: true,
    dayCaseTariff: 1840,
    lastUpdated: '2024-04'
  }
};
