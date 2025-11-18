// Auto-generated Comprehensive Inventory
// 1078 items across 14 specialties

export type InventoryCategory =
  | "Instrument Trays"
  | "Power Tools"
  | "Consumables"
  | "Implants"
  | "Medical Devices"
  | "Drapes"
  | "Prep Solutions"
  | "Operating Tables"
  | "Single Instruments";

export type Classification = "Basic" | "Specific";
export type Frequency = "Weekly" | "Monthly" | "Quarterly" | "As Needed";

export interface Contact {
  name: string;
  phone?: string;
  email?: string;
  department?: string;
}

export interface StockInfo {
  current: number;
  minimum: number;
  maximum: number;
  reorderPoint: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: InventoryCategory;
  classification: Classification;
  specialty: string[];
  supplier: string;
  productReference: string;
  sku?: string;
  udiCode?: string;
  barcode?: string;
  stock: StockInfo;
  frequency: Frequency;
  lastOrdered?: string;
  lastReceived?: string;
  contacts: {
    rep?: Contact;
    procurement?: Contact;
  };
  cost?: number;
  currency: "GBP";
  procedures: string[];
}

export const SPECIALTIES = [
  "All Specialties",
  "Trauma Orthopaedics",
  "Spines",
  "Elective Orthopaedics",
  "General Surgery",
  "Cardiac",
  "Neurosurgery",
  "Vascular",
  "Plastics",
  "Gynaecology",
  "Urology",
  "ENT",
  "Ophthalmology"
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    "id": "INV-00001",
    "name": "Sterile Drape Pack Orthopaedics 1",
    "description": "Comprehensive drape pack for Trauma Orthopaedics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-2",
    "sku": "SKU-2",
    "stock": {
      "current": 317,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 41,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00002",
    "name": "Sterile Drape Pack Orthopaedics 2",
    "description": "Comprehensive drape pack for Trauma Orthopaedics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-3",
    "sku": "SKU-3",
    "stock": {
      "current": 93,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 92,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00003",
    "name": "Sterile Drape Pack Orthopaedics 3",
    "description": "Comprehensive drape pack for Trauma Orthopaedics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-4",
    "sku": "SKU-4",
    "stock": {
      "current": 229,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 45,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00004",
    "name": "Sterile Drape Pack Orthopaedics 4",
    "description": "Comprehensive drape pack for Trauma Orthopaedics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-5",
    "sku": "SKU-5",
    "stock": {
      "current": 155,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 93,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00005",
    "name": "Sterile Drape Pack Orthopaedics 5",
    "description": "Comprehensive drape pack for Trauma Orthopaedics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-6",
    "sku": "SKU-6",
    "stock": {
      "current": 120,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 53,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00006",
    "name": "Chlorhexidine 2% Solution Orthopaedics",
    "description": "Antiseptic preparation solution for Trauma Orthopaedics",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-7",
    "sku": "SKU-7",
    "stock": {
      "current": 232,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 11,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00007",
    "name": "Betadine Solution Orthopaedics",
    "description": "Antiseptic preparation solution for Trauma Orthopaedics",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-8",
    "sku": "SKU-8",
    "stock": {
      "current": 376,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 10,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00008",
    "name": "Skin Prep Applicator Orthopaedics",
    "description": "Antiseptic preparation solution for Trauma Orthopaedics",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-9",
    "sku": "SKU-9",
    "stock": {
      "current": 223,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 5,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00009",
    "name": "Operating Table Orthopaedics Standard",
    "description": "Specialized operating table for Trauma Orthopaedics procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-10",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00010",
    "name": "Operating Table Orthopaedics Specialist",
    "description": "Specialized operating table for Trauma Orthopaedics procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-11",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00011",
    "name": "Lateral Support Set Orthopaedics",
    "description": "Positioning equipment for Trauma Orthopaedics procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-12",
    "stock": {
      "current": 33,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00012",
    "name": "Leg Holder Attachment Orthopaedics",
    "description": "Positioning equipment for Trauma Orthopaedics procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-13",
    "stock": {
      "current": 74,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00013",
    "name": "Arm Board Set Orthopaedics",
    "description": "Positioning equipment for Trauma Orthopaedics procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-14",
    "stock": {
      "current": 98,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00014",
    "name": "Gel Positioning Pads Orthopaedics",
    "description": "Positioning equipment for Trauma Orthopaedics procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-15",
    "stock": {
      "current": 27,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00015",
    "name": "Basic Instrument Tray Orthopaedics 1",
    "description": "Standard instrument set for Trauma Orthopaedics procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-16",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00016",
    "name": "Basic Instrument Tray Orthopaedics 2",
    "description": "Standard instrument set for Trauma Orthopaedics procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-17",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00017",
    "name": "Basic Instrument Tray Orthopaedics 3",
    "description": "Standard instrument set for Trauma Orthopaedics procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-18",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00018",
    "name": "Basic Instrument Tray Orthopaedics 4",
    "description": "Standard instrument set for Trauma Orthopaedics procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-19",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00019",
    "name": "Specialist Instrument Tray Orthopaedics 1",
    "description": "Specialized instrument set for Trauma Orthopaedics procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-20",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00020",
    "name": "Specialist Instrument Tray Orthopaedics 2",
    "description": "Specialized instrument set for Trauma Orthopaedics procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-21",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00021",
    "name": "Specialist Instrument Tray Orthopaedics 3",
    "description": "Specialized instrument set for Trauma Orthopaedics procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-22",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00022",
    "name": "Specialist Instrument Tray Orthopaedics 4",
    "description": "Specialized instrument set for Trauma Orthopaedics procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-23",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00023",
    "name": "Vicryl 1 Suture Orthopaedics",
    "description": "Standard consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-24",
    "sku": "SKU-24",
    "stock": {
      "current": 316,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 17,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00024",
    "name": "Vicryl 2-0 Suture Orthopaedics",
    "description": "Standard consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-25",
    "sku": "SKU-25",
    "stock": {
      "current": 376,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 16,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00025",
    "name": "PDS 1 Suture Orthopaedics",
    "description": "Standard consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-26",
    "sku": "SKU-26",
    "stock": {
      "current": 263,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 11,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00026",
    "name": "Nylon 2-0 Suture Orthopaedics",
    "description": "Standard consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-27",
    "sku": "SKU-27",
    "stock": {
      "current": 198,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 15,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00027",
    "name": "Surgical Gloves 7 Orthopaedics",
    "description": "Standard consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-28",
    "sku": "SKU-28",
    "stock": {
      "current": 322,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 11,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00028",
    "name": "Surgical Gloves 7.5 Orthopaedics",
    "description": "Standard consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-29",
    "sku": "SKU-29",
    "stock": {
      "current": 81,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 8,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00029",
    "name": "Surgical Gloves 8 Orthopaedics",
    "description": "Standard consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-30",
    "sku": "SKU-30",
    "stock": {
      "current": 239,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 20,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00030",
    "name": "Gauze Swabs x100 Orthopaedics",
    "description": "Standard consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-31",
    "sku": "SKU-31",
    "stock": {
      "current": 311,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 33,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00031",
    "name": "Specialized Wire Orthopaedics",
    "description": "Specialty-specific consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-32",
    "sku": "SKU-32",
    "stock": {
      "current": 150,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 38,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00032",
    "name": "Specialized Pin Orthopaedics",
    "description": "Specialty-specific consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-33",
    "sku": "SKU-33",
    "stock": {
      "current": 340,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 32,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00033",
    "name": "Specialized Screw Orthopaedics",
    "description": "Specialty-specific consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-34",
    "sku": "SKU-34",
    "stock": {
      "current": 194,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 9,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00034",
    "name": "Specialized Clip Orthopaedics",
    "description": "Specialty-specific consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-35",
    "sku": "SKU-35",
    "stock": {
      "current": 388,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 20,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00035",
    "name": "Specialized Drain Orthopaedics",
    "description": "Specialty-specific consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-36",
    "sku": "SKU-36",
    "stock": {
      "current": 57,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 47,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00036",
    "name": "Specialized Catheter Orthopaedics",
    "description": "Specialty-specific consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-37",
    "sku": "SKU-37",
    "stock": {
      "current": 128,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 20,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00037",
    "name": "Specialized Guide Orthopaedics",
    "description": "Specialty-specific consumable for Trauma Orthopaedics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-38",
    "sku": "SKU-38",
    "stock": {
      "current": 165,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 32,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00038",
    "name": "Implant Orthopaedics Type A Size 1",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-39",
    "sku": "SKU-39",
    "udiCode": "00801741000039",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 842,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00039",
    "name": "Implant Orthopaedics Type B Size 2",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-40",
    "sku": "SKU-40",
    "udiCode": "00801741000040",
    "stock": {
      "current": 22,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1694,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00040",
    "name": "Implant Orthopaedics Type C Size 3",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-41",
    "sku": "SKU-41",
    "udiCode": "00801741000041",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 747,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00041",
    "name": "Implant Orthopaedics Type D Size 4",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-42",
    "sku": "SKU-42",
    "udiCode": "00801741000042",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1640,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00042",
    "name": "Implant Orthopaedics Type E Size 5",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-43",
    "sku": "SKU-43",
    "udiCode": "00801741000043",
    "stock": {
      "current": 12,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1653,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00043",
    "name": "Implant Orthopaedics Type F Size 1",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-44",
    "sku": "SKU-44",
    "udiCode": "00801741000044",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1309,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00044",
    "name": "Implant Orthopaedics Type G Size 2",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-45",
    "sku": "SKU-45",
    "udiCode": "00801741000045",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1183,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00045",
    "name": "Implant Orthopaedics Type H Size 3",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-46",
    "sku": "SKU-46",
    "udiCode": "00801741000046",
    "stock": {
      "current": 7,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 314,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00046",
    "name": "Implant Orthopaedics Type I Size 4",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-47",
    "sku": "SKU-47",
    "udiCode": "00801741000047",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 542,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00047",
    "name": "Implant Orthopaedics Type J Size 5",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-48",
    "sku": "SKU-48",
    "udiCode": "00801741000048",
    "stock": {
      "current": 11,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2006,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00048",
    "name": "Implant Orthopaedics Type A Size 1",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-49",
    "sku": "SKU-49",
    "udiCode": "00801741000049",
    "stock": {
      "current": 20,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1314,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00049",
    "name": "Implant Orthopaedics Type B Size 2",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-50",
    "sku": "SKU-50",
    "udiCode": "00801741000050",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1872,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00050",
    "name": "Implant Orthopaedics Type C Size 3",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-51",
    "sku": "SKU-51",
    "udiCode": "00801741000051",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 334,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00051",
    "name": "Implant Orthopaedics Type D Size 4",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-52",
    "sku": "SKU-52",
    "udiCode": "00801741000052",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1289,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00052",
    "name": "Implant Orthopaedics Type E Size 5",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-53",
    "sku": "SKU-53",
    "udiCode": "00801741000053",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1737,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00053",
    "name": "Implant Orthopaedics Type F Size 1",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-54",
    "sku": "SKU-54",
    "udiCode": "00801741000054",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 556,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00054",
    "name": "Implant Orthopaedics Type G Size 2",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-55",
    "sku": "SKU-55",
    "udiCode": "00801741000055",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1454,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00055",
    "name": "Implant Orthopaedics Type H Size 3",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-56",
    "sku": "SKU-56",
    "udiCode": "00801741000056",
    "stock": {
      "current": 10,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 391,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00056",
    "name": "Implant Orthopaedics Type I Size 4",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-57",
    "sku": "SKU-57",
    "udiCode": "00801741000057",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 723,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00057",
    "name": "Implant Orthopaedics Type J Size 5",
    "description": "Specialized implant for Trauma Orthopaedics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-58",
    "sku": "SKU-58",
    "udiCode": "00801741000058",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1476,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00058",
    "name": "Forceps Orthopaedics 1",
    "description": "Surgical forceps for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-59",
    "stock": {
      "current": 25,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00059",
    "name": "Retractor Orthopaedics 1",
    "description": "Surgical retractor for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-60",
    "stock": {
      "current": 78,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00060",
    "name": "Clamp Orthopaedics 1",
    "description": "Surgical clamp for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-61",
    "stock": {
      "current": 82,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00061",
    "name": "Scissors Orthopaedics 1",
    "description": "Surgical scissors for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-62",
    "stock": {
      "current": 89,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00062",
    "name": "Holder Orthopaedics 1",
    "description": "Surgical holder for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-63",
    "stock": {
      "current": 58,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00063",
    "name": "Dissector Orthopaedics 1",
    "description": "Surgical dissector for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-64",
    "stock": {
      "current": 28,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00064",
    "name": "Probe Orthopaedics 1",
    "description": "Surgical probe for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-65",
    "stock": {
      "current": 46,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00065",
    "name": "Hook Orthopaedics 1",
    "description": "Surgical hook for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-66",
    "stock": {
      "current": 37,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00066",
    "name": "Elevator Orthopaedics 1",
    "description": "Surgical elevator for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-67",
    "stock": {
      "current": 75,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00067",
    "name": "Curette Orthopaedics 1",
    "description": "Surgical curette for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-68",
    "stock": {
      "current": 83,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00068",
    "name": "Forceps Orthopaedics 2",
    "description": "Surgical forceps for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-69",
    "stock": {
      "current": 76,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00069",
    "name": "Retractor Orthopaedics 2",
    "description": "Surgical retractor for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-70",
    "stock": {
      "current": 96,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00070",
    "name": "Clamp Orthopaedics 2",
    "description": "Surgical clamp for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-71",
    "stock": {
      "current": 41,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00071",
    "name": "Scissors Orthopaedics 2",
    "description": "Surgical scissors for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-72",
    "stock": {
      "current": 35,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00072",
    "name": "Holder Orthopaedics 2",
    "description": "Surgical holder for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-73",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00073",
    "name": "Dissector Orthopaedics 2",
    "description": "Surgical dissector for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-74",
    "stock": {
      "current": 20,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00074",
    "name": "Probe Orthopaedics 2",
    "description": "Surgical probe for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-75",
    "stock": {
      "current": 68,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00075",
    "name": "Hook Orthopaedics 2",
    "description": "Surgical hook for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-76",
    "stock": {
      "current": 48,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00076",
    "name": "Elevator Orthopaedics 2",
    "description": "Surgical elevator for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-77",
    "stock": {
      "current": 44,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00077",
    "name": "Curette Orthopaedics 2",
    "description": "Surgical curette for Trauma Orthopaedics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Trauma Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-78",
    "stock": {
      "current": 78,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00078",
    "name": "Sterile Drape Pack Spines 1",
    "description": "Comprehensive drape pack for Spines procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-79",
    "sku": "SKU-79",
    "stock": {
      "current": 102,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 38,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00079",
    "name": "Sterile Drape Pack Spines 2",
    "description": "Comprehensive drape pack for Spines procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-80",
    "sku": "SKU-80",
    "stock": {
      "current": 269,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 74,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00080",
    "name": "Sterile Drape Pack Spines 3",
    "description": "Comprehensive drape pack for Spines procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-81",
    "sku": "SKU-81",
    "stock": {
      "current": 150,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 90,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00081",
    "name": "Sterile Drape Pack Spines 4",
    "description": "Comprehensive drape pack for Spines procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-82",
    "sku": "SKU-82",
    "stock": {
      "current": 360,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 42,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00082",
    "name": "Sterile Drape Pack Spines 5",
    "description": "Comprehensive drape pack for Spines procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-83",
    "sku": "SKU-83",
    "stock": {
      "current": 114,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 42,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00083",
    "name": "Chlorhexidine 2% Solution Spines",
    "description": "Antiseptic preparation solution for Spines",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-84",
    "sku": "SKU-84",
    "stock": {
      "current": 198,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 14,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00084",
    "name": "Betadine Solution Spines",
    "description": "Antiseptic preparation solution for Spines",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-85",
    "sku": "SKU-85",
    "stock": {
      "current": 355,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 11,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00085",
    "name": "Skin Prep Applicator Spines",
    "description": "Antiseptic preparation solution for Spines",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-86",
    "sku": "SKU-86",
    "stock": {
      "current": 122,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00086",
    "name": "Operating Table Spines Standard",
    "description": "Specialized operating table for Spines procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-87",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00087",
    "name": "Operating Table Spines Specialist",
    "description": "Specialized operating table for Spines procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-88",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00088",
    "name": "Lateral Support Set Spines",
    "description": "Positioning equipment for Spines procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-89",
    "stock": {
      "current": 58,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00089",
    "name": "Leg Holder Attachment Spines",
    "description": "Positioning equipment for Spines procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-90",
    "stock": {
      "current": 90,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00090",
    "name": "Arm Board Set Spines",
    "description": "Positioning equipment for Spines procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-91",
    "stock": {
      "current": 86,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00091",
    "name": "Gel Positioning Pads Spines",
    "description": "Positioning equipment for Spines procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-92",
    "stock": {
      "current": 58,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00092",
    "name": "Basic Instrument Tray Spines 1",
    "description": "Standard instrument set for Spines procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-93",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00093",
    "name": "Basic Instrument Tray Spines 2",
    "description": "Standard instrument set for Spines procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-94",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00094",
    "name": "Basic Instrument Tray Spines 3",
    "description": "Standard instrument set for Spines procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-95",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00095",
    "name": "Basic Instrument Tray Spines 4",
    "description": "Standard instrument set for Spines procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-96",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00096",
    "name": "Specialist Instrument Tray Spines 1",
    "description": "Specialized instrument set for Spines procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "INST-97",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00097",
    "name": "Specialist Instrument Tray Spines 2",
    "description": "Specialized instrument set for Spines procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "INST-98",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00098",
    "name": "Specialist Instrument Tray Spines 3",
    "description": "Specialized instrument set for Spines procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "INST-99",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00099",
    "name": "Specialist Instrument Tray Spines 4",
    "description": "Specialized instrument set for Spines procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "INST-100",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00100",
    "name": "Vicryl 1 Suture Spines",
    "description": "Standard consumable for Spines",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-101",
    "sku": "SKU-101",
    "stock": {
      "current": 123,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 47,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00101",
    "name": "Vicryl 2-0 Suture Spines",
    "description": "Standard consumable for Spines",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-102",
    "sku": "SKU-102",
    "stock": {
      "current": 117,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 36,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00102",
    "name": "PDS 1 Suture Spines",
    "description": "Standard consumable for Spines",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-103",
    "sku": "SKU-103",
    "stock": {
      "current": 389,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 25,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00103",
    "name": "Nylon 2-0 Suture Spines",
    "description": "Standard consumable for Spines",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-104",
    "sku": "SKU-104",
    "stock": {
      "current": 128,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 7,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00104",
    "name": "Surgical Gloves 7 Spines",
    "description": "Standard consumable for Spines",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-105",
    "sku": "SKU-105",
    "stock": {
      "current": 281,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 35,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00105",
    "name": "Surgical Gloves 7.5 Spines",
    "description": "Standard consumable for Spines",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-106",
    "sku": "SKU-106",
    "stock": {
      "current": 285,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 11,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00106",
    "name": "Surgical Gloves 8 Spines",
    "description": "Standard consumable for Spines",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-107",
    "sku": "SKU-107",
    "stock": {
      "current": 121,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 49,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00107",
    "name": "Gauze Swabs x100 Spines",
    "description": "Standard consumable for Spines",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-108",
    "sku": "SKU-108",
    "stock": {
      "current": 316,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 35,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00108",
    "name": "Specialized Wire Spines",
    "description": "Specialty-specific consumable for Spines",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-109",
    "sku": "SKU-109",
    "stock": {
      "current": 168,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 24,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00109",
    "name": "Specialized Pin Spines",
    "description": "Specialty-specific consumable for Spines",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-110",
    "sku": "SKU-110",
    "stock": {
      "current": 129,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 28,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00110",
    "name": "Specialized Screw Spines",
    "description": "Specialty-specific consumable for Spines",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-111",
    "sku": "SKU-111",
    "stock": {
      "current": 139,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00111",
    "name": "Specialized Clip Spines",
    "description": "Specialty-specific consumable for Spines",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-112",
    "sku": "SKU-112",
    "stock": {
      "current": 289,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 14,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00112",
    "name": "Specialized Drain Spines",
    "description": "Specialty-specific consumable for Spines",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-113",
    "sku": "SKU-113",
    "stock": {
      "current": 186,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 44,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00113",
    "name": "Specialized Catheter Spines",
    "description": "Specialty-specific consumable for Spines",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-114",
    "sku": "SKU-114",
    "stock": {
      "current": 181,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 20,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00114",
    "name": "Specialized Guide Spines",
    "description": "Specialty-specific consumable for Spines",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-115",
    "sku": "SKU-115",
    "stock": {
      "current": 82,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 40,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00115",
    "name": "Implant Spines Type A Size 1",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-116",
    "sku": "SKU-116",
    "udiCode": "00801741000116",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1757,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00116",
    "name": "Implant Spines Type B Size 2",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-117",
    "sku": "SKU-117",
    "udiCode": "00801741000117",
    "stock": {
      "current": 12,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1262,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00117",
    "name": "Implant Spines Type C Size 3",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-118",
    "sku": "SKU-118",
    "udiCode": "00801741000118",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1773,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00118",
    "name": "Implant Spines Type D Size 4",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-119",
    "sku": "SKU-119",
    "udiCode": "00801741000119",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1385,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00119",
    "name": "Implant Spines Type E Size 5",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-120",
    "sku": "SKU-120",
    "udiCode": "00801741000120",
    "stock": {
      "current": 20,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 992,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00120",
    "name": "Implant Spines Type F Size 1",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-121",
    "sku": "SKU-121",
    "udiCode": "00801741000121",
    "stock": {
      "current": 22,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1355,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00121",
    "name": "Implant Spines Type G Size 2",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-122",
    "sku": "SKU-122",
    "udiCode": "00801741000122",
    "stock": {
      "current": 29,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1704,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00122",
    "name": "Implant Spines Type H Size 3",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-123",
    "sku": "SKU-123",
    "udiCode": "00801741000123",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1562,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00123",
    "name": "Implant Spines Type I Size 4",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-124",
    "sku": "SKU-124",
    "udiCode": "00801741000124",
    "stock": {
      "current": 12,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 995,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00124",
    "name": "Implant Spines Type J Size 5",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-125",
    "sku": "SKU-125",
    "udiCode": "00801741000125",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 404,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00125",
    "name": "Implant Spines Type A Size 1",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-126",
    "sku": "SKU-126",
    "udiCode": "00801741000126",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 223,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00126",
    "name": "Implant Spines Type B Size 2",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-127",
    "sku": "SKU-127",
    "udiCode": "00801741000127",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 214,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00127",
    "name": "Implant Spines Type C Size 3",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-128",
    "sku": "SKU-128",
    "udiCode": "00801741000128",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1946,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00128",
    "name": "Implant Spines Type D Size 4",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-129",
    "sku": "SKU-129",
    "udiCode": "00801741000129",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 953,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00129",
    "name": "Implant Spines Type E Size 5",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-130",
    "sku": "SKU-130",
    "udiCode": "00801741000130",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1843,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00130",
    "name": "Implant Spines Type F Size 1",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-131",
    "sku": "SKU-131",
    "udiCode": "00801741000131",
    "stock": {
      "current": 25,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 922,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00131",
    "name": "Implant Spines Type G Size 2",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-132",
    "sku": "SKU-132",
    "udiCode": "00801741000132",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1796,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00132",
    "name": "Implant Spines Type H Size 3",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-133",
    "sku": "SKU-133",
    "udiCode": "00801741000133",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 850,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00133",
    "name": "Implant Spines Type I Size 4",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-134",
    "sku": "SKU-134",
    "udiCode": "00801741000134",
    "stock": {
      "current": 22,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1527,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00134",
    "name": "Implant Spines Type J Size 5",
    "description": "Specialized implant for Spines procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Spines"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-135",
    "sku": "SKU-135",
    "udiCode": "00801741000135",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1081,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00135",
    "name": "Forceps Spines 1",
    "description": "Surgical forceps for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-136",
    "stock": {
      "current": 87,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00136",
    "name": "Retractor Spines 1",
    "description": "Surgical retractor for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-137",
    "stock": {
      "current": 46,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00137",
    "name": "Clamp Spines 1",
    "description": "Surgical clamp for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-138",
    "stock": {
      "current": 41,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00138",
    "name": "Scissors Spines 1",
    "description": "Surgical scissors for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-139",
    "stock": {
      "current": 27,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00139",
    "name": "Holder Spines 1",
    "description": "Surgical holder for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-140",
    "stock": {
      "current": 86,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00140",
    "name": "Dissector Spines 1",
    "description": "Surgical dissector for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-141",
    "stock": {
      "current": 93,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00141",
    "name": "Probe Spines 1",
    "description": "Surgical probe for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-142",
    "stock": {
      "current": 65,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00142",
    "name": "Hook Spines 1",
    "description": "Surgical hook for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-143",
    "stock": {
      "current": 64,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00143",
    "name": "Elevator Spines 1",
    "description": "Surgical elevator for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-144",
    "stock": {
      "current": 58,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00144",
    "name": "Curette Spines 1",
    "description": "Surgical curette for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-145",
    "stock": {
      "current": 95,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00145",
    "name": "Forceps Spines 2",
    "description": "Surgical forceps for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-146",
    "stock": {
      "current": 37,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00146",
    "name": "Retractor Spines 2",
    "description": "Surgical retractor for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-147",
    "stock": {
      "current": 84,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00147",
    "name": "Clamp Spines 2",
    "description": "Surgical clamp for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-148",
    "stock": {
      "current": 69,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00148",
    "name": "Scissors Spines 2",
    "description": "Surgical scissors for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-149",
    "stock": {
      "current": 64,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00149",
    "name": "Holder Spines 2",
    "description": "Surgical holder for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-150",
    "stock": {
      "current": 67,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00150",
    "name": "Dissector Spines 2",
    "description": "Surgical dissector for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-151",
    "stock": {
      "current": 49,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00151",
    "name": "Probe Spines 2",
    "description": "Surgical probe for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-152",
    "stock": {
      "current": 28,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00152",
    "name": "Hook Spines 2",
    "description": "Surgical hook for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-153",
    "stock": {
      "current": 74,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00153",
    "name": "Elevator Spines 2",
    "description": "Surgical elevator for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-154",
    "stock": {
      "current": 79,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00154",
    "name": "Curette Spines 2",
    "description": "Surgical curette for Spines",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Spines"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-155",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00155",
    "name": "Sterile Drape Pack Upper 1",
    "description": "Comprehensive drape pack for Upper Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-156",
    "sku": "SKU-156",
    "stock": {
      "current": 224,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 62,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00156",
    "name": "Sterile Drape Pack Upper 2",
    "description": "Comprehensive drape pack for Upper Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-157",
    "sku": "SKU-157",
    "stock": {
      "current": 375,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 80,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00157",
    "name": "Sterile Drape Pack Upper 3",
    "description": "Comprehensive drape pack for Upper Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-158",
    "sku": "SKU-158",
    "stock": {
      "current": 146,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 99,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00158",
    "name": "Sterile Drape Pack Upper 4",
    "description": "Comprehensive drape pack for Upper Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-159",
    "sku": "SKU-159",
    "stock": {
      "current": 261,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 70,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00159",
    "name": "Sterile Drape Pack Upper 5",
    "description": "Comprehensive drape pack for Upper Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-160",
    "sku": "SKU-160",
    "stock": {
      "current": 375,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 52,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00160",
    "name": "Chlorhexidine 2% Solution Upper",
    "description": "Antiseptic preparation solution for Upper Limb",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-161",
    "sku": "SKU-161",
    "stock": {
      "current": 290,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 14,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00161",
    "name": "Betadine Solution Upper",
    "description": "Antiseptic preparation solution for Upper Limb",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-162",
    "sku": "SKU-162",
    "stock": {
      "current": 271,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 18,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00162",
    "name": "Skin Prep Applicator Upper",
    "description": "Antiseptic preparation solution for Upper Limb",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-163",
    "sku": "SKU-163",
    "stock": {
      "current": 284,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 12,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00163",
    "name": "Operating Table Upper Standard",
    "description": "Specialized operating table for Upper Limb procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-164",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00164",
    "name": "Operating Table Upper Specialist",
    "description": "Specialized operating table for Upper Limb procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-165",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00165",
    "name": "Lateral Support Set Upper",
    "description": "Positioning equipment for Upper Limb procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-166",
    "stock": {
      "current": 77,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00166",
    "name": "Leg Holder Attachment Upper",
    "description": "Positioning equipment for Upper Limb procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-167",
    "stock": {
      "current": 33,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00167",
    "name": "Arm Board Set Upper",
    "description": "Positioning equipment for Upper Limb procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-168",
    "stock": {
      "current": 43,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00168",
    "name": "Gel Positioning Pads Upper",
    "description": "Positioning equipment for Upper Limb procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-169",
    "stock": {
      "current": 39,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00169",
    "name": "Basic Instrument Tray Upper 1",
    "description": "Standard instrument set for Upper Limb procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-170",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00170",
    "name": "Basic Instrument Tray Upper 2",
    "description": "Standard instrument set for Upper Limb procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-171",
    "stock": {
      "current": 10,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00171",
    "name": "Basic Instrument Tray Upper 3",
    "description": "Standard instrument set for Upper Limb procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-172",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00172",
    "name": "Basic Instrument Tray Upper 4",
    "description": "Standard instrument set for Upper Limb procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-173",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00173",
    "name": "Specialist Instrument Tray Upper 1",
    "description": "Specialized instrument set for Upper Limb procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-174",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00174",
    "name": "Specialist Instrument Tray Upper 2",
    "description": "Specialized instrument set for Upper Limb procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-175",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00175",
    "name": "Specialist Instrument Tray Upper 3",
    "description": "Specialized instrument set for Upper Limb procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-176",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00176",
    "name": "Specialist Instrument Tray Upper 4",
    "description": "Specialized instrument set for Upper Limb procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-177",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00177",
    "name": "Vicryl 1 Suture Upper",
    "description": "Standard consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-178",
    "sku": "SKU-178",
    "stock": {
      "current": 256,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 6,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00178",
    "name": "Vicryl 2-0 Suture Upper",
    "description": "Standard consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-179",
    "sku": "SKU-179",
    "stock": {
      "current": 233,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 6,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00179",
    "name": "PDS 1 Suture Upper",
    "description": "Standard consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-180",
    "sku": "SKU-180",
    "stock": {
      "current": 342,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 39,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00180",
    "name": "Nylon 2-0 Suture Upper",
    "description": "Standard consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-181",
    "sku": "SKU-181",
    "stock": {
      "current": 171,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 44,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00181",
    "name": "Surgical Gloves 7 Upper",
    "description": "Standard consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-182",
    "sku": "SKU-182",
    "stock": {
      "current": 165,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00182",
    "name": "Surgical Gloves 7.5 Upper",
    "description": "Standard consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-183",
    "sku": "SKU-183",
    "stock": {
      "current": 311,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 30,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00183",
    "name": "Surgical Gloves 8 Upper",
    "description": "Standard consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-184",
    "sku": "SKU-184",
    "stock": {
      "current": 101,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 13,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00184",
    "name": "Gauze Swabs x100 Upper",
    "description": "Standard consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-185",
    "sku": "SKU-185",
    "stock": {
      "current": 357,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 10,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00185",
    "name": "Specialized Wire Upper",
    "description": "Specialty-specific consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-186",
    "sku": "SKU-186",
    "stock": {
      "current": 298,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 47,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00186",
    "name": "Specialized Pin Upper",
    "description": "Specialty-specific consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-187",
    "sku": "SKU-187",
    "stock": {
      "current": 261,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 13,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00187",
    "name": "Specialized Screw Upper",
    "description": "Specialty-specific consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-188",
    "sku": "SKU-188",
    "stock": {
      "current": 135,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 25,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00188",
    "name": "Specialized Clip Upper",
    "description": "Specialty-specific consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-189",
    "sku": "SKU-189",
    "stock": {
      "current": 352,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 11,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00189",
    "name": "Specialized Drain Upper",
    "description": "Specialty-specific consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-190",
    "sku": "SKU-190",
    "stock": {
      "current": 188,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 41,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00190",
    "name": "Specialized Catheter Upper",
    "description": "Specialty-specific consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-191",
    "sku": "SKU-191",
    "stock": {
      "current": 378,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 8,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00191",
    "name": "Specialized Guide Upper",
    "description": "Specialty-specific consumable for Upper Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-192",
    "sku": "SKU-192",
    "stock": {
      "current": 386,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 26,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00192",
    "name": "Implant Upper Type A Size 1",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-193",
    "sku": "SKU-193",
    "udiCode": "00801741000193",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1732,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00193",
    "name": "Implant Upper Type B Size 2",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-194",
    "sku": "SKU-194",
    "udiCode": "00801741000194",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 908,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00194",
    "name": "Implant Upper Type C Size 3",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-195",
    "sku": "SKU-195",
    "udiCode": "00801741000195",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 486,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00195",
    "name": "Implant Upper Type D Size 4",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-196",
    "sku": "SKU-196",
    "udiCode": "00801741000196",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 591,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00196",
    "name": "Implant Upper Type E Size 5",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-197",
    "sku": "SKU-197",
    "udiCode": "00801741000197",
    "stock": {
      "current": 29,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1535,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00197",
    "name": "Implant Upper Type F Size 1",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-198",
    "sku": "SKU-198",
    "udiCode": "00801741000198",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2183,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00198",
    "name": "Implant Upper Type G Size 2",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-199",
    "sku": "SKU-199",
    "udiCode": "00801741000199",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1318,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00199",
    "name": "Implant Upper Type H Size 3",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-200",
    "sku": "SKU-200",
    "udiCode": "00801741000200",
    "stock": {
      "current": 29,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 971,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00200",
    "name": "Implant Upper Type I Size 4",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-201",
    "sku": "SKU-201",
    "udiCode": "00801741000201",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2306,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00201",
    "name": "Implant Upper Type J Size 5",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-202",
    "sku": "SKU-202",
    "udiCode": "00801741000202",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 812,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00202",
    "name": "Implant Upper Type A Size 1",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-203",
    "sku": "SKU-203",
    "udiCode": "00801741000203",
    "stock": {
      "current": 20,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2427,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00203",
    "name": "Implant Upper Type B Size 2",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-204",
    "sku": "SKU-204",
    "udiCode": "00801741000204",
    "stock": {
      "current": 29,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1176,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00204",
    "name": "Implant Upper Type C Size 3",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-205",
    "sku": "SKU-205",
    "udiCode": "00801741000205",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 711,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00205",
    "name": "Implant Upper Type D Size 4",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-206",
    "sku": "SKU-206",
    "udiCode": "00801741000206",
    "stock": {
      "current": 7,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1241,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00206",
    "name": "Implant Upper Type E Size 5",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-207",
    "sku": "SKU-207",
    "udiCode": "00801741000207",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1583,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00207",
    "name": "Implant Upper Type F Size 1",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-208",
    "sku": "SKU-208",
    "udiCode": "00801741000208",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1273,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00208",
    "name": "Implant Upper Type G Size 2",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-209",
    "sku": "SKU-209",
    "udiCode": "00801741000209",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1550,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00209",
    "name": "Implant Upper Type H Size 3",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-210",
    "sku": "SKU-210",
    "udiCode": "00801741000210",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 808,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00210",
    "name": "Implant Upper Type I Size 4",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-211",
    "sku": "SKU-211",
    "udiCode": "00801741000211",
    "stock": {
      "current": 5,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 516,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00211",
    "name": "Implant Upper Type J Size 5",
    "description": "Specialized implant for Upper Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-212",
    "sku": "SKU-212",
    "udiCode": "00801741000212",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2429,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00212",
    "name": "Forceps Upper 1",
    "description": "Surgical forceps for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-213",
    "stock": {
      "current": 83,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00213",
    "name": "Retractor Upper 1",
    "description": "Surgical retractor for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-214",
    "stock": {
      "current": 86,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00214",
    "name": "Clamp Upper 1",
    "description": "Surgical clamp for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-215",
    "stock": {
      "current": 98,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00215",
    "name": "Scissors Upper 1",
    "description": "Surgical scissors for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-216",
    "stock": {
      "current": 35,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00216",
    "name": "Holder Upper 1",
    "description": "Surgical holder for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-217",
    "stock": {
      "current": 41,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00217",
    "name": "Dissector Upper 1",
    "description": "Surgical dissector for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-218",
    "stock": {
      "current": 68,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00218",
    "name": "Probe Upper 1",
    "description": "Surgical probe for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-219",
    "stock": {
      "current": 81,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00219",
    "name": "Hook Upper 1",
    "description": "Surgical hook for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-220",
    "stock": {
      "current": 50,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00220",
    "name": "Elevator Upper 1",
    "description": "Surgical elevator for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-221",
    "stock": {
      "current": 82,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00221",
    "name": "Curette Upper 1",
    "description": "Surgical curette for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-222",
    "stock": {
      "current": 26,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00222",
    "name": "Forceps Upper 2",
    "description": "Surgical forceps for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-223",
    "stock": {
      "current": 45,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00223",
    "name": "Retractor Upper 2",
    "description": "Surgical retractor for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-224",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00224",
    "name": "Clamp Upper 2",
    "description": "Surgical clamp for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-225",
    "stock": {
      "current": 97,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00225",
    "name": "Scissors Upper 2",
    "description": "Surgical scissors for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-226",
    "stock": {
      "current": 39,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00226",
    "name": "Holder Upper 2",
    "description": "Surgical holder for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-227",
    "stock": {
      "current": 79,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00227",
    "name": "Dissector Upper 2",
    "description": "Surgical dissector for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-228",
    "stock": {
      "current": 43,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00228",
    "name": "Probe Upper 2",
    "description": "Surgical probe for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-229",
    "stock": {
      "current": 72,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00229",
    "name": "Hook Upper 2",
    "description": "Surgical hook for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-230",
    "stock": {
      "current": 23,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00230",
    "name": "Elevator Upper 2",
    "description": "Surgical elevator for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-231",
    "stock": {
      "current": 21,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00231",
    "name": "Curette Upper 2",
    "description": "Surgical curette for Upper Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-232",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00232",
    "name": "Sterile Drape Pack Lower 1",
    "description": "Comprehensive drape pack for Lower Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-233",
    "sku": "SKU-233",
    "stock": {
      "current": 66,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 69,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00233",
    "name": "Sterile Drape Pack Lower 2",
    "description": "Comprehensive drape pack for Lower Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-234",
    "sku": "SKU-234",
    "stock": {
      "current": 385,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 96,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00234",
    "name": "Sterile Drape Pack Lower 3",
    "description": "Comprehensive drape pack for Lower Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-235",
    "sku": "SKU-235",
    "stock": {
      "current": 322,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 72,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00235",
    "name": "Sterile Drape Pack Lower 4",
    "description": "Comprehensive drape pack for Lower Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-236",
    "sku": "SKU-236",
    "stock": {
      "current": 234,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 80,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00236",
    "name": "Sterile Drape Pack Lower 5",
    "description": "Comprehensive drape pack for Lower Limb procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-237",
    "sku": "SKU-237",
    "stock": {
      "current": 127,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 45,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00237",
    "name": "Chlorhexidine 2% Solution Lower",
    "description": "Antiseptic preparation solution for Lower Limb",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-238",
    "sku": "SKU-238",
    "stock": {
      "current": 133,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 5,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00238",
    "name": "Betadine Solution Lower",
    "description": "Antiseptic preparation solution for Lower Limb",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-239",
    "sku": "SKU-239",
    "stock": {
      "current": 262,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 21,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00239",
    "name": "Skin Prep Applicator Lower",
    "description": "Antiseptic preparation solution for Lower Limb",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-240",
    "sku": "SKU-240",
    "stock": {
      "current": 170,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 24,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00240",
    "name": "Operating Table Lower Standard",
    "description": "Specialized operating table for Lower Limb procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-241",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00241",
    "name": "Operating Table Lower Specialist",
    "description": "Specialized operating table for Lower Limb procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-242",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00242",
    "name": "Lateral Support Set Lower",
    "description": "Positioning equipment for Lower Limb procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-243",
    "stock": {
      "current": 82,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00243",
    "name": "Leg Holder Attachment Lower",
    "description": "Positioning equipment for Lower Limb procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-244",
    "stock": {
      "current": 65,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00244",
    "name": "Arm Board Set Lower",
    "description": "Positioning equipment for Lower Limb procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-245",
    "stock": {
      "current": 26,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00245",
    "name": "Gel Positioning Pads Lower",
    "description": "Positioning equipment for Lower Limb procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-246",
    "stock": {
      "current": 55,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00246",
    "name": "Basic Instrument Tray Lower 1",
    "description": "Standard instrument set for Lower Limb procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-247",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00247",
    "name": "Basic Instrument Tray Lower 2",
    "description": "Standard instrument set for Lower Limb procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-248",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00248",
    "name": "Basic Instrument Tray Lower 3",
    "description": "Standard instrument set for Lower Limb procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-249",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00249",
    "name": "Basic Instrument Tray Lower 4",
    "description": "Standard instrument set for Lower Limb procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-250",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00250",
    "name": "Specialist Instrument Tray Lower 1",
    "description": "Specialized instrument set for Lower Limb procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-251",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00251",
    "name": "Specialist Instrument Tray Lower 2",
    "description": "Specialized instrument set for Lower Limb procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-252",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00252",
    "name": "Specialist Instrument Tray Lower 3",
    "description": "Specialized instrument set for Lower Limb procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-253",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00253",
    "name": "Specialist Instrument Tray Lower 4",
    "description": "Specialized instrument set for Lower Limb procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-254",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00254",
    "name": "Vicryl 1 Suture Lower",
    "description": "Standard consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-255",
    "sku": "SKU-255",
    "stock": {
      "current": 81,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 14,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00255",
    "name": "Vicryl 2-0 Suture Lower",
    "description": "Standard consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-256",
    "sku": "SKU-256",
    "stock": {
      "current": 117,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 27,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00256",
    "name": "PDS 1 Suture Lower",
    "description": "Standard consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-257",
    "sku": "SKU-257",
    "stock": {
      "current": 210,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 27,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00257",
    "name": "Nylon 2-0 Suture Lower",
    "description": "Standard consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-258",
    "sku": "SKU-258",
    "stock": {
      "current": 334,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 15,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00258",
    "name": "Surgical Gloves 7 Lower",
    "description": "Standard consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-259",
    "sku": "SKU-259",
    "stock": {
      "current": 175,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 26,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00259",
    "name": "Surgical Gloves 7.5 Lower",
    "description": "Standard consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-260",
    "sku": "SKU-260",
    "stock": {
      "current": 380,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 11,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00260",
    "name": "Surgical Gloves 8 Lower",
    "description": "Standard consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-261",
    "sku": "SKU-261",
    "stock": {
      "current": 322,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 19,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00261",
    "name": "Gauze Swabs x100 Lower",
    "description": "Standard consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-262",
    "sku": "SKU-262",
    "stock": {
      "current": 382,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 46,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00262",
    "name": "Specialized Wire Lower",
    "description": "Specialty-specific consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-263",
    "sku": "SKU-263",
    "stock": {
      "current": 226,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 6,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00263",
    "name": "Specialized Pin Lower",
    "description": "Specialty-specific consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-264",
    "sku": "SKU-264",
    "stock": {
      "current": 301,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 25,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00264",
    "name": "Specialized Screw Lower",
    "description": "Specialty-specific consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-265",
    "sku": "SKU-265",
    "stock": {
      "current": 264,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 32,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00265",
    "name": "Specialized Clip Lower",
    "description": "Specialty-specific consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-266",
    "sku": "SKU-266",
    "stock": {
      "current": 269,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 46,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00266",
    "name": "Specialized Drain Lower",
    "description": "Specialty-specific consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-267",
    "sku": "SKU-267",
    "stock": {
      "current": 221,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 38,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00267",
    "name": "Specialized Catheter Lower",
    "description": "Specialty-specific consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-268",
    "sku": "SKU-268",
    "stock": {
      "current": 122,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 32,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00268",
    "name": "Specialized Guide Lower",
    "description": "Specialty-specific consumable for Lower Limb",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-269",
    "sku": "SKU-269",
    "stock": {
      "current": 190,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 33,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00269",
    "name": "Implant Lower Type A Size 1",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-270",
    "sku": "SKU-270",
    "udiCode": "00801741000270",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2492,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00270",
    "name": "Implant Lower Type B Size 2",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-271",
    "sku": "SKU-271",
    "udiCode": "00801741000271",
    "stock": {
      "current": 8,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 431,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00271",
    "name": "Implant Lower Type C Size 3",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-272",
    "sku": "SKU-272",
    "udiCode": "00801741000272",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 277,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00272",
    "name": "Implant Lower Type D Size 4",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-273",
    "sku": "SKU-273",
    "udiCode": "00801741000273",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2016,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00273",
    "name": "Implant Lower Type E Size 5",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-274",
    "sku": "SKU-274",
    "udiCode": "00801741000274",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1273,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00274",
    "name": "Implant Lower Type F Size 1",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-275",
    "sku": "SKU-275",
    "udiCode": "00801741000275",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 752,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00275",
    "name": "Implant Lower Type G Size 2",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-276",
    "sku": "SKU-276",
    "udiCode": "00801741000276",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2446,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00276",
    "name": "Implant Lower Type H Size 3",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-277",
    "sku": "SKU-277",
    "udiCode": "00801741000277",
    "stock": {
      "current": 5,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 741,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00277",
    "name": "Implant Lower Type I Size 4",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-278",
    "sku": "SKU-278",
    "udiCode": "00801741000278",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2380,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00278",
    "name": "Implant Lower Type J Size 5",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-279",
    "sku": "SKU-279",
    "udiCode": "00801741000279",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1921,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00279",
    "name": "Implant Lower Type A Size 1",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-280",
    "sku": "SKU-280",
    "udiCode": "00801741000280",
    "stock": {
      "current": 10,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 997,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00280",
    "name": "Implant Lower Type B Size 2",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-281",
    "sku": "SKU-281",
    "udiCode": "00801741000281",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 240,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00281",
    "name": "Implant Lower Type C Size 3",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-282",
    "sku": "SKU-282",
    "udiCode": "00801741000282",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 216,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00282",
    "name": "Implant Lower Type D Size 4",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-283",
    "sku": "SKU-283",
    "udiCode": "00801741000283",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 674,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00283",
    "name": "Implant Lower Type E Size 5",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-284",
    "sku": "SKU-284",
    "udiCode": "00801741000284",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2399,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00284",
    "name": "Implant Lower Type F Size 1",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-285",
    "sku": "SKU-285",
    "udiCode": "00801741000285",
    "stock": {
      "current": 5,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 728,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00285",
    "name": "Implant Lower Type G Size 2",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-286",
    "sku": "SKU-286",
    "udiCode": "00801741000286",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 831,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00286",
    "name": "Implant Lower Type H Size 3",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-287",
    "sku": "SKU-287",
    "udiCode": "00801741000287",
    "stock": {
      "current": 10,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1935,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00287",
    "name": "Implant Lower Type I Size 4",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-288",
    "sku": "SKU-288",
    "udiCode": "00801741000288",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1323,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00288",
    "name": "Implant Lower Type J Size 5",
    "description": "Specialized implant for Lower Limb procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-289",
    "sku": "SKU-289",
    "udiCode": "00801741000289",
    "stock": {
      "current": 11,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1737,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00289",
    "name": "Forceps Lower 1",
    "description": "Surgical forceps for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-290",
    "stock": {
      "current": 52,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00290",
    "name": "Retractor Lower 1",
    "description": "Surgical retractor for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-291",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00291",
    "name": "Clamp Lower 1",
    "description": "Surgical clamp for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-292",
    "stock": {
      "current": 20,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00292",
    "name": "Scissors Lower 1",
    "description": "Surgical scissors for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-293",
    "stock": {
      "current": 60,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00293",
    "name": "Holder Lower 1",
    "description": "Surgical holder for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-294",
    "stock": {
      "current": 33,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00294",
    "name": "Dissector Lower 1",
    "description": "Surgical dissector for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-295",
    "stock": {
      "current": 28,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00295",
    "name": "Probe Lower 1",
    "description": "Surgical probe for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-296",
    "stock": {
      "current": 54,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00296",
    "name": "Hook Lower 1",
    "description": "Surgical hook for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-297",
    "stock": {
      "current": 96,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00297",
    "name": "Elevator Lower 1",
    "description": "Surgical elevator for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-298",
    "stock": {
      "current": 51,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00298",
    "name": "Curette Lower 1",
    "description": "Surgical curette for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-299",
    "stock": {
      "current": 58,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00299",
    "name": "Forceps Lower 2",
    "description": "Surgical forceps for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-300",
    "stock": {
      "current": 71,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00300",
    "name": "Retractor Lower 2",
    "description": "Surgical retractor for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-301",
    "stock": {
      "current": 86,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00301",
    "name": "Clamp Lower 2",
    "description": "Surgical clamp for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-302",
    "stock": {
      "current": 85,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00302",
    "name": "Scissors Lower 2",
    "description": "Surgical scissors for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-303",
    "stock": {
      "current": 85,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00303",
    "name": "Holder Lower 2",
    "description": "Surgical holder for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-304",
    "stock": {
      "current": 39,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00304",
    "name": "Dissector Lower 2",
    "description": "Surgical dissector for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-305",
    "stock": {
      "current": 47,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00305",
    "name": "Probe Lower 2",
    "description": "Surgical probe for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-306",
    "stock": {
      "current": 72,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00306",
    "name": "Hook Lower 2",
    "description": "Surgical hook for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-307",
    "stock": {
      "current": 65,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00307",
    "name": "Elevator Lower 2",
    "description": "Surgical elevator for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-308",
    "stock": {
      "current": 79,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00308",
    "name": "Curette Lower 2",
    "description": "Surgical curette for Lower Limb",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-309",
    "stock": {
      "current": 68,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00309",
    "name": "Sterile Drape Pack Joint 1",
    "description": "Comprehensive drape pack for Joint Replacement procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-310",
    "sku": "SKU-310",
    "stock": {
      "current": 169,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 66,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00310",
    "name": "Sterile Drape Pack Joint 2",
    "description": "Comprehensive drape pack for Joint Replacement procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-311",
    "sku": "SKU-311",
    "stock": {
      "current": 52,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 51,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00311",
    "name": "Sterile Drape Pack Joint 3",
    "description": "Comprehensive drape pack for Joint Replacement procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-312",
    "sku": "SKU-312",
    "stock": {
      "current": 245,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 94,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00312",
    "name": "Sterile Drape Pack Joint 4",
    "description": "Comprehensive drape pack for Joint Replacement procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-313",
    "sku": "SKU-313",
    "stock": {
      "current": 366,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 43,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00313",
    "name": "Sterile Drape Pack Joint 5",
    "description": "Comprehensive drape pack for Joint Replacement procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-314",
    "sku": "SKU-314",
    "stock": {
      "current": 266,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 91,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00314",
    "name": "Chlorhexidine 2% Solution Joint",
    "description": "Antiseptic preparation solution for Joint Replacement",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-315",
    "sku": "SKU-315",
    "stock": {
      "current": 100,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 21,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00315",
    "name": "Betadine Solution Joint",
    "description": "Antiseptic preparation solution for Joint Replacement",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-316",
    "sku": "SKU-316",
    "stock": {
      "current": 100,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 24,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00316",
    "name": "Skin Prep Applicator Joint",
    "description": "Antiseptic preparation solution for Joint Replacement",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-317",
    "sku": "SKU-317",
    "stock": {
      "current": 104,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 15,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00317",
    "name": "Operating Table Joint Standard",
    "description": "Specialized operating table for Joint Replacement procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-318",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00318",
    "name": "Operating Table Joint Specialist",
    "description": "Specialized operating table for Joint Replacement procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-319",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00319",
    "name": "Lateral Support Set Joint",
    "description": "Positioning equipment for Joint Replacement procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-320",
    "stock": {
      "current": 69,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00320",
    "name": "Leg Holder Attachment Joint",
    "description": "Positioning equipment for Joint Replacement procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-321",
    "stock": {
      "current": 64,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00321",
    "name": "Arm Board Set Joint",
    "description": "Positioning equipment for Joint Replacement procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-322",
    "stock": {
      "current": 75,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00322",
    "name": "Gel Positioning Pads Joint",
    "description": "Positioning equipment for Joint Replacement procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-323",
    "stock": {
      "current": 57,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00323",
    "name": "Basic Instrument Tray Joint 1",
    "description": "Standard instrument set for Joint Replacement procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-324",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00324",
    "name": "Basic Instrument Tray Joint 2",
    "description": "Standard instrument set for Joint Replacement procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-325",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00325",
    "name": "Basic Instrument Tray Joint 3",
    "description": "Standard instrument set for Joint Replacement procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-326",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00326",
    "name": "Basic Instrument Tray Joint 4",
    "description": "Standard instrument set for Joint Replacement procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-327",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00327",
    "name": "Specialist Instrument Tray Joint 1",
    "description": "Specialized instrument set for Joint Replacement procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-328",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00328",
    "name": "Specialist Instrument Tray Joint 2",
    "description": "Specialized instrument set for Joint Replacement procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-329",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00329",
    "name": "Specialist Instrument Tray Joint 3",
    "description": "Specialized instrument set for Joint Replacement procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-330",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00330",
    "name": "Specialist Instrument Tray Joint 4",
    "description": "Specialized instrument set for Joint Replacement procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-331",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00331",
    "name": "Vicryl 1 Suture Joint",
    "description": "Standard consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-332",
    "sku": "SKU-332",
    "stock": {
      "current": 111,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 15,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00332",
    "name": "Vicryl 2-0 Suture Joint",
    "description": "Standard consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-333",
    "sku": "SKU-333",
    "stock": {
      "current": 218,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 31,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00333",
    "name": "PDS 1 Suture Joint",
    "description": "Standard consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-334",
    "sku": "SKU-334",
    "stock": {
      "current": 204,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 48,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00334",
    "name": "Nylon 2-0 Suture Joint",
    "description": "Standard consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-335",
    "sku": "SKU-335",
    "stock": {
      "current": 162,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 29,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00335",
    "name": "Surgical Gloves 7 Joint",
    "description": "Standard consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-336",
    "sku": "SKU-336",
    "stock": {
      "current": 215,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 33,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00336",
    "name": "Surgical Gloves 7.5 Joint",
    "description": "Standard consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-337",
    "sku": "SKU-337",
    "stock": {
      "current": 342,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 7,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00337",
    "name": "Surgical Gloves 8 Joint",
    "description": "Standard consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-338",
    "sku": "SKU-338",
    "stock": {
      "current": 97,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 40,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00338",
    "name": "Gauze Swabs x100 Joint",
    "description": "Standard consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-339",
    "sku": "SKU-339",
    "stock": {
      "current": 88,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 40,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00339",
    "name": "Specialized Wire Joint",
    "description": "Specialty-specific consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-340",
    "sku": "SKU-340",
    "stock": {
      "current": 285,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 25,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00340",
    "name": "Specialized Pin Joint",
    "description": "Specialty-specific consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-341",
    "sku": "SKU-341",
    "stock": {
      "current": 64,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 40,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00341",
    "name": "Specialized Screw Joint",
    "description": "Specialty-specific consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-342",
    "sku": "SKU-342",
    "stock": {
      "current": 297,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 8,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00342",
    "name": "Specialized Clip Joint",
    "description": "Specialty-specific consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-343",
    "sku": "SKU-343",
    "stock": {
      "current": 163,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00343",
    "name": "Specialized Drain Joint",
    "description": "Specialty-specific consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-344",
    "sku": "SKU-344",
    "stock": {
      "current": 337,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 39,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00344",
    "name": "Specialized Catheter Joint",
    "description": "Specialty-specific consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-345",
    "sku": "SKU-345",
    "stock": {
      "current": 144,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 45,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00345",
    "name": "Specialized Guide Joint",
    "description": "Specialty-specific consumable for Joint Replacement",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-346",
    "sku": "SKU-346",
    "stock": {
      "current": 121,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 14,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00346",
    "name": "Implant Joint Type A Size 1",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-347",
    "sku": "SKU-347",
    "udiCode": "00801741000347",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 353,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00347",
    "name": "Implant Joint Type B Size 2",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-348",
    "sku": "SKU-348",
    "udiCode": "00801741000348",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1657,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00348",
    "name": "Implant Joint Type C Size 3",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-349",
    "sku": "SKU-349",
    "udiCode": "00801741000349",
    "stock": {
      "current": 22,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2007,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00349",
    "name": "Implant Joint Type D Size 4",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-350",
    "sku": "SKU-350",
    "udiCode": "00801741000350",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 785,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00350",
    "name": "Implant Joint Type E Size 5",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-351",
    "sku": "SKU-351",
    "udiCode": "00801741000351",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1892,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00351",
    "name": "Implant Joint Type F Size 1",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-352",
    "sku": "SKU-352",
    "udiCode": "00801741000352",
    "stock": {
      "current": 11,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2102,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00352",
    "name": "Implant Joint Type G Size 2",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-353",
    "sku": "SKU-353",
    "udiCode": "00801741000353",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1842,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00353",
    "name": "Implant Joint Type H Size 3",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-354",
    "sku": "SKU-354",
    "udiCode": "00801741000354",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1495,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00354",
    "name": "Implant Joint Type I Size 4",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-355",
    "sku": "SKU-355",
    "udiCode": "00801741000355",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1769,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00355",
    "name": "Implant Joint Type J Size 5",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-356",
    "sku": "SKU-356",
    "udiCode": "00801741000356",
    "stock": {
      "current": 10,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 693,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00356",
    "name": "Implant Joint Type A Size 1",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-357",
    "sku": "SKU-357",
    "udiCode": "00801741000357",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1873,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00357",
    "name": "Implant Joint Type B Size 2",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-358",
    "sku": "SKU-358",
    "udiCode": "00801741000358",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2437,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00358",
    "name": "Implant Joint Type C Size 3",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-359",
    "sku": "SKU-359",
    "udiCode": "00801741000359",
    "stock": {
      "current": 22,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1241,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00359",
    "name": "Implant Joint Type D Size 4",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-360",
    "sku": "SKU-360",
    "udiCode": "00801741000360",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 960,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00360",
    "name": "Implant Joint Type E Size 5",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-361",
    "sku": "SKU-361",
    "udiCode": "00801741000361",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 342,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00361",
    "name": "Implant Joint Type F Size 1",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-362",
    "sku": "SKU-362",
    "udiCode": "00801741000362",
    "stock": {
      "current": 10,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 791,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00362",
    "name": "Implant Joint Type G Size 2",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-363",
    "sku": "SKU-363",
    "udiCode": "00801741000363",
    "stock": {
      "current": 8,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 404,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00363",
    "name": "Implant Joint Type H Size 3",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-364",
    "sku": "SKU-364",
    "udiCode": "00801741000364",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1222,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00364",
    "name": "Implant Joint Type I Size 4",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-365",
    "sku": "SKU-365",
    "udiCode": "00801741000365",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 892,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00365",
    "name": "Implant Joint Type J Size 5",
    "description": "Specialized implant for Joint Replacement procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-366",
    "sku": "SKU-366",
    "udiCode": "00801741000366",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 658,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00366",
    "name": "Forceps Joint 1",
    "description": "Surgical forceps for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-367",
    "stock": {
      "current": 22,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00367",
    "name": "Retractor Joint 1",
    "description": "Surgical retractor for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-368",
    "stock": {
      "current": 48,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00368",
    "name": "Clamp Joint 1",
    "description": "Surgical clamp for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-369",
    "stock": {
      "current": 96,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00369",
    "name": "Scissors Joint 1",
    "description": "Surgical scissors for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-370",
    "stock": {
      "current": 27,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00370",
    "name": "Holder Joint 1",
    "description": "Surgical holder for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-371",
    "stock": {
      "current": 23,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00371",
    "name": "Dissector Joint 1",
    "description": "Surgical dissector for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-372",
    "stock": {
      "current": 96,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00372",
    "name": "Probe Joint 1",
    "description": "Surgical probe for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-373",
    "stock": {
      "current": 67,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00373",
    "name": "Hook Joint 1",
    "description": "Surgical hook for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-374",
    "stock": {
      "current": 29,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00374",
    "name": "Elevator Joint 1",
    "description": "Surgical elevator for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-375",
    "stock": {
      "current": 64,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00375",
    "name": "Curette Joint 1",
    "description": "Surgical curette for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-376",
    "stock": {
      "current": 77,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00376",
    "name": "Forceps Joint 2",
    "description": "Surgical forceps for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-377",
    "stock": {
      "current": 59,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00377",
    "name": "Retractor Joint 2",
    "description": "Surgical retractor for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-378",
    "stock": {
      "current": 23,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00378",
    "name": "Clamp Joint 2",
    "description": "Surgical clamp for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-379",
    "stock": {
      "current": 86,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00379",
    "name": "Scissors Joint 2",
    "description": "Surgical scissors for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-380",
    "stock": {
      "current": 31,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00380",
    "name": "Holder Joint 2",
    "description": "Surgical holder for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-381",
    "stock": {
      "current": 43,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00381",
    "name": "Dissector Joint 2",
    "description": "Surgical dissector for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-382",
    "stock": {
      "current": 55,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00382",
    "name": "Probe Joint 2",
    "description": "Surgical probe for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-383",
    "stock": {
      "current": 41,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00383",
    "name": "Hook Joint 2",
    "description": "Surgical hook for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-384",
    "stock": {
      "current": 62,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00384",
    "name": "Elevator Joint 2",
    "description": "Surgical elevator for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-385",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00385",
    "name": "Curette Joint 2",
    "description": "Surgical curette for Joint Replacement",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Elective Orthopaedics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-386",
    "stock": {
      "current": 59,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00386",
    "name": "Sterile Drape Pack General 1",
    "description": "Comprehensive drape pack for General Surgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-387",
    "sku": "SKU-387",
    "stock": {
      "current": 276,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 59,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00387",
    "name": "Sterile Drape Pack General 2",
    "description": "Comprehensive drape pack for General Surgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-388",
    "sku": "SKU-388",
    "stock": {
      "current": 83,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 31,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00388",
    "name": "Sterile Drape Pack General 3",
    "description": "Comprehensive drape pack for General Surgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-389",
    "sku": "SKU-389",
    "stock": {
      "current": 269,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 34,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00389",
    "name": "Sterile Drape Pack General 4",
    "description": "Comprehensive drape pack for General Surgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-390",
    "sku": "SKU-390",
    "stock": {
      "current": 385,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 41,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00390",
    "name": "Sterile Drape Pack General 5",
    "description": "Comprehensive drape pack for General Surgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-391",
    "sku": "SKU-391",
    "stock": {
      "current": 202,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 92,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00391",
    "name": "Chlorhexidine 2% Solution General",
    "description": "Antiseptic preparation solution for General Surgery",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-392",
    "sku": "SKU-392",
    "stock": {
      "current": 254,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00392",
    "name": "Betadine Solution General",
    "description": "Antiseptic preparation solution for General Surgery",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-393",
    "sku": "SKU-393",
    "stock": {
      "current": 332,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 19,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00393",
    "name": "Skin Prep Applicator General",
    "description": "Antiseptic preparation solution for General Surgery",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-394",
    "sku": "SKU-394",
    "stock": {
      "current": 299,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 20,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00394",
    "name": "Operating Table General Standard",
    "description": "Specialized operating table for General Surgery procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-395",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00395",
    "name": "Operating Table General Specialist",
    "description": "Specialized operating table for General Surgery procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-396",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00396",
    "name": "Lateral Support Set General",
    "description": "Positioning equipment for General Surgery procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-397",
    "stock": {
      "current": 95,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00397",
    "name": "Leg Holder Attachment General",
    "description": "Positioning equipment for General Surgery procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-398",
    "stock": {
      "current": 40,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00398",
    "name": "Arm Board Set General",
    "description": "Positioning equipment for General Surgery procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-399",
    "stock": {
      "current": 64,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00399",
    "name": "Gel Positioning Pads General",
    "description": "Positioning equipment for General Surgery procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-400",
    "stock": {
      "current": 40,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00400",
    "name": "Basic Instrument Tray General 1",
    "description": "Standard instrument set for General Surgery procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-401",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00401",
    "name": "Basic Instrument Tray General 2",
    "description": "Standard instrument set for General Surgery procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-402",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00402",
    "name": "Basic Instrument Tray General 3",
    "description": "Standard instrument set for General Surgery procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-403",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00403",
    "name": "Basic Instrument Tray General 4",
    "description": "Standard instrument set for General Surgery procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-404",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00404",
    "name": "Specialist Instrument Tray General 1",
    "description": "Specialized instrument set for General Surgery procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "INST-405",
    "stock": {
      "current": 10,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00405",
    "name": "Specialist Instrument Tray General 2",
    "description": "Specialized instrument set for General Surgery procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "INST-406",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00406",
    "name": "Specialist Instrument Tray General 3",
    "description": "Specialized instrument set for General Surgery procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "INST-407",
    "stock": {
      "current": 10,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00407",
    "name": "Specialist Instrument Tray General 4",
    "description": "Specialized instrument set for General Surgery procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "INST-408",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00408",
    "name": "Vicryl 1 Suture General",
    "description": "Standard consumable for General Surgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-409",
    "sku": "SKU-409",
    "stock": {
      "current": 64,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 29,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00409",
    "name": "Vicryl 2-0 Suture General",
    "description": "Standard consumable for General Surgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-410",
    "sku": "SKU-410",
    "stock": {
      "current": 157,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 48,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00410",
    "name": "PDS 1 Suture General",
    "description": "Standard consumable for General Surgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-411",
    "sku": "SKU-411",
    "stock": {
      "current": 187,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 30,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00411",
    "name": "Nylon 2-0 Suture General",
    "description": "Standard consumable for General Surgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-412",
    "sku": "SKU-412",
    "stock": {
      "current": 358,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 6,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00412",
    "name": "Surgical Gloves 7 General",
    "description": "Standard consumable for General Surgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-413",
    "sku": "SKU-413",
    "stock": {
      "current": 192,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 34,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00413",
    "name": "Surgical Gloves 7.5 General",
    "description": "Standard consumable for General Surgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-414",
    "sku": "SKU-414",
    "stock": {
      "current": 231,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 39,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00414",
    "name": "Surgical Gloves 8 General",
    "description": "Standard consumable for General Surgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-415",
    "sku": "SKU-415",
    "stock": {
      "current": 132,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 48,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00415",
    "name": "Gauze Swabs x100 General",
    "description": "Standard consumable for General Surgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-416",
    "sku": "SKU-416",
    "stock": {
      "current": 302,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 14,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00416",
    "name": "Specialized Wire General",
    "description": "Specialty-specific consumable for General Surgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-417",
    "sku": "SKU-417",
    "stock": {
      "current": 353,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 5,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00417",
    "name": "Specialized Pin General",
    "description": "Specialty-specific consumable for General Surgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-418",
    "sku": "SKU-418",
    "stock": {
      "current": 71,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 27,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00418",
    "name": "Specialized Screw General",
    "description": "Specialty-specific consumable for General Surgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-419",
    "sku": "SKU-419",
    "stock": {
      "current": 348,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 46,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00419",
    "name": "Specialized Clip General",
    "description": "Specialty-specific consumable for General Surgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-420",
    "sku": "SKU-420",
    "stock": {
      "current": 233,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00420",
    "name": "Specialized Drain General",
    "description": "Specialty-specific consumable for General Surgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-421",
    "sku": "SKU-421",
    "stock": {
      "current": 167,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 37,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00421",
    "name": "Specialized Catheter General",
    "description": "Specialty-specific consumable for General Surgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-422",
    "sku": "SKU-422",
    "stock": {
      "current": 243,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 13,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00422",
    "name": "Specialized Guide General",
    "description": "Specialty-specific consumable for General Surgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-423",
    "sku": "SKU-423",
    "stock": {
      "current": 279,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 32,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00423",
    "name": "Implant General Type A Size 1",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-424",
    "sku": "SKU-424",
    "udiCode": "00801741000424",
    "stock": {
      "current": 25,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 611,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00424",
    "name": "Implant General Type B Size 2",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-425",
    "sku": "SKU-425",
    "udiCode": "00801741000425",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1863,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00425",
    "name": "Implant General Type C Size 3",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-426",
    "sku": "SKU-426",
    "udiCode": "00801741000426",
    "stock": {
      "current": 29,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 624,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00426",
    "name": "Implant General Type D Size 4",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-427",
    "sku": "SKU-427",
    "udiCode": "00801741000427",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1010,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00427",
    "name": "Implant General Type E Size 5",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-428",
    "sku": "SKU-428",
    "udiCode": "00801741000428",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2470,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00428",
    "name": "Implant General Type F Size 1",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-429",
    "sku": "SKU-429",
    "udiCode": "00801741000429",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1327,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00429",
    "name": "Implant General Type G Size 2",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-430",
    "sku": "SKU-430",
    "udiCode": "00801741000430",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1485,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00430",
    "name": "Implant General Type H Size 3",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-431",
    "sku": "SKU-431",
    "udiCode": "00801741000431",
    "stock": {
      "current": 22,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2311,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00431",
    "name": "Implant General Type I Size 4",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-432",
    "sku": "SKU-432",
    "udiCode": "00801741000432",
    "stock": {
      "current": 8,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 711,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00432",
    "name": "Implant General Type J Size 5",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-433",
    "sku": "SKU-433",
    "udiCode": "00801741000433",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2106,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00433",
    "name": "Implant General Type A Size 1",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-434",
    "sku": "SKU-434",
    "udiCode": "00801741000434",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1378,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00434",
    "name": "Implant General Type B Size 2",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-435",
    "sku": "SKU-435",
    "udiCode": "00801741000435",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1113,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00435",
    "name": "Implant General Type C Size 3",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-436",
    "sku": "SKU-436",
    "udiCode": "00801741000436",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 955,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00436",
    "name": "Implant General Type D Size 4",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-437",
    "sku": "SKU-437",
    "udiCode": "00801741000437",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 620,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00437",
    "name": "Implant General Type E Size 5",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-438",
    "sku": "SKU-438",
    "udiCode": "00801741000438",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1933,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00438",
    "name": "Implant General Type F Size 1",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-439",
    "sku": "SKU-439",
    "udiCode": "00801741000439",
    "stock": {
      "current": 25,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 520,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00439",
    "name": "Implant General Type G Size 2",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-440",
    "sku": "SKU-440",
    "udiCode": "00801741000440",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 745,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00440",
    "name": "Implant General Type H Size 3",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-441",
    "sku": "SKU-441",
    "udiCode": "00801741000441",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2215,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00441",
    "name": "Implant General Type I Size 4",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-442",
    "sku": "SKU-442",
    "udiCode": "00801741000442",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1475,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00442",
    "name": "Implant General Type J Size 5",
    "description": "Specialized implant for General Surgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-443",
    "sku": "SKU-443",
    "udiCode": "00801741000443",
    "stock": {
      "current": 11,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1488,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00443",
    "name": "Forceps General 1",
    "description": "Surgical forceps for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-444",
    "stock": {
      "current": 82,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00444",
    "name": "Retractor General 1",
    "description": "Surgical retractor for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-445",
    "stock": {
      "current": 72,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00445",
    "name": "Clamp General 1",
    "description": "Surgical clamp for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-446",
    "stock": {
      "current": 57,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00446",
    "name": "Scissors General 1",
    "description": "Surgical scissors for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-447",
    "stock": {
      "current": 44,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00447",
    "name": "Holder General 1",
    "description": "Surgical holder for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-448",
    "stock": {
      "current": 59,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00448",
    "name": "Dissector General 1",
    "description": "Surgical dissector for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-449",
    "stock": {
      "current": 81,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00449",
    "name": "Probe General 1",
    "description": "Surgical probe for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-450",
    "stock": {
      "current": 33,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00450",
    "name": "Hook General 1",
    "description": "Surgical hook for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-451",
    "stock": {
      "current": 31,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00451",
    "name": "Elevator General 1",
    "description": "Surgical elevator for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-452",
    "stock": {
      "current": 95,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00452",
    "name": "Curette General 1",
    "description": "Surgical curette for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-453",
    "stock": {
      "current": 74,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00453",
    "name": "Forceps General 2",
    "description": "Surgical forceps for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-454",
    "stock": {
      "current": 35,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00454",
    "name": "Retractor General 2",
    "description": "Surgical retractor for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-455",
    "stock": {
      "current": 26,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00455",
    "name": "Clamp General 2",
    "description": "Surgical clamp for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-456",
    "stock": {
      "current": 80,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00456",
    "name": "Scissors General 2",
    "description": "Surgical scissors for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-457",
    "stock": {
      "current": 43,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00457",
    "name": "Holder General 2",
    "description": "Surgical holder for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-458",
    "stock": {
      "current": 20,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00458",
    "name": "Dissector General 2",
    "description": "Surgical dissector for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-459",
    "stock": {
      "current": 79,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00459",
    "name": "Probe General 2",
    "description": "Surgical probe for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-460",
    "stock": {
      "current": 22,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00460",
    "name": "Hook General 2",
    "description": "Surgical hook for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-461",
    "stock": {
      "current": 66,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00461",
    "name": "Elevator General 2",
    "description": "Surgical elevator for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-462",
    "stock": {
      "current": 82,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00462",
    "name": "Curette General 2",
    "description": "Surgical curette for General Surgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "General Surgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-463",
    "stock": {
      "current": 97,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00463",
    "name": "Sterile Drape Pack Cardiac 1",
    "description": "Comprehensive drape pack for Cardiac procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-464",
    "sku": "SKU-464",
    "stock": {
      "current": 303,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 55,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00464",
    "name": "Sterile Drape Pack Cardiac 2",
    "description": "Comprehensive drape pack for Cardiac procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-465",
    "sku": "SKU-465",
    "stock": {
      "current": 332,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 76,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00465",
    "name": "Sterile Drape Pack Cardiac 3",
    "description": "Comprehensive drape pack for Cardiac procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-466",
    "sku": "SKU-466",
    "stock": {
      "current": 294,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 96,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00466",
    "name": "Sterile Drape Pack Cardiac 4",
    "description": "Comprehensive drape pack for Cardiac procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-467",
    "sku": "SKU-467",
    "stock": {
      "current": 179,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 46,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00467",
    "name": "Sterile Drape Pack Cardiac 5",
    "description": "Comprehensive drape pack for Cardiac procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-468",
    "sku": "SKU-468",
    "stock": {
      "current": 110,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 75,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00468",
    "name": "Chlorhexidine 2% Solution Cardiac",
    "description": "Antiseptic preparation solution for Cardiac",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-469",
    "sku": "SKU-469",
    "stock": {
      "current": 138,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 17,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00469",
    "name": "Betadine Solution Cardiac",
    "description": "Antiseptic preparation solution for Cardiac",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-470",
    "sku": "SKU-470",
    "stock": {
      "current": 84,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 12,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00470",
    "name": "Skin Prep Applicator Cardiac",
    "description": "Antiseptic preparation solution for Cardiac",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-471",
    "sku": "SKU-471",
    "stock": {
      "current": 92,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00471",
    "name": "Operating Table Cardiac Standard",
    "description": "Specialized operating table for Cardiac procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-472",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00472",
    "name": "Operating Table Cardiac Specialist",
    "description": "Specialized operating table for Cardiac procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-473",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00473",
    "name": "Lateral Support Set Cardiac",
    "description": "Positioning equipment for Cardiac procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-474",
    "stock": {
      "current": 84,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00474",
    "name": "Leg Holder Attachment Cardiac",
    "description": "Positioning equipment for Cardiac procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-475",
    "stock": {
      "current": 89,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00475",
    "name": "Arm Board Set Cardiac",
    "description": "Positioning equipment for Cardiac procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-476",
    "stock": {
      "current": 60,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00476",
    "name": "Gel Positioning Pads Cardiac",
    "description": "Positioning equipment for Cardiac procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-477",
    "stock": {
      "current": 100,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00477",
    "name": "Basic Instrument Tray Cardiac 1",
    "description": "Standard instrument set for Cardiac procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-478",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00478",
    "name": "Basic Instrument Tray Cardiac 2",
    "description": "Standard instrument set for Cardiac procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-479",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00479",
    "name": "Basic Instrument Tray Cardiac 3",
    "description": "Standard instrument set for Cardiac procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-480",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00480",
    "name": "Basic Instrument Tray Cardiac 4",
    "description": "Standard instrument set for Cardiac procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-481",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00481",
    "name": "Specialist Instrument Tray Cardiac 1",
    "description": "Specialized instrument set for Cardiac procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "INST-482",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00482",
    "name": "Specialist Instrument Tray Cardiac 2",
    "description": "Specialized instrument set for Cardiac procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "INST-483",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00483",
    "name": "Specialist Instrument Tray Cardiac 3",
    "description": "Specialized instrument set for Cardiac procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "INST-484",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00484",
    "name": "Specialist Instrument Tray Cardiac 4",
    "description": "Specialized instrument set for Cardiac procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "INST-485",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00485",
    "name": "Vicryl 1 Suture Cardiac",
    "description": "Standard consumable for Cardiac",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-486",
    "sku": "SKU-486",
    "stock": {
      "current": 59,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 27,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00486",
    "name": "Vicryl 2-0 Suture Cardiac",
    "description": "Standard consumable for Cardiac",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-487",
    "sku": "SKU-487",
    "stock": {
      "current": 368,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 27,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00487",
    "name": "PDS 1 Suture Cardiac",
    "description": "Standard consumable for Cardiac",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-488",
    "sku": "SKU-488",
    "stock": {
      "current": 101,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 35,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00488",
    "name": "Nylon 2-0 Suture Cardiac",
    "description": "Standard consumable for Cardiac",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-489",
    "sku": "SKU-489",
    "stock": {
      "current": 290,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 49,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00489",
    "name": "Surgical Gloves 7 Cardiac",
    "description": "Standard consumable for Cardiac",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-490",
    "sku": "SKU-490",
    "stock": {
      "current": 124,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00490",
    "name": "Surgical Gloves 7.5 Cardiac",
    "description": "Standard consumable for Cardiac",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-491",
    "sku": "SKU-491",
    "stock": {
      "current": 70,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 37,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00491",
    "name": "Surgical Gloves 8 Cardiac",
    "description": "Standard consumable for Cardiac",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-492",
    "sku": "SKU-492",
    "stock": {
      "current": 355,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 28,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00492",
    "name": "Gauze Swabs x100 Cardiac",
    "description": "Standard consumable for Cardiac",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-493",
    "sku": "SKU-493",
    "stock": {
      "current": 215,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 46,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00493",
    "name": "Specialized Wire Cardiac",
    "description": "Specialty-specific consumable for Cardiac",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-494",
    "sku": "SKU-494",
    "stock": {
      "current": 272,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 29,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00494",
    "name": "Specialized Pin Cardiac",
    "description": "Specialty-specific consumable for Cardiac",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-495",
    "sku": "SKU-495",
    "stock": {
      "current": 393,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 33,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00495",
    "name": "Specialized Screw Cardiac",
    "description": "Specialty-specific consumable for Cardiac",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-496",
    "sku": "SKU-496",
    "stock": {
      "current": 264,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 41,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00496",
    "name": "Specialized Clip Cardiac",
    "description": "Specialty-specific consumable for Cardiac",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-497",
    "sku": "SKU-497",
    "stock": {
      "current": 181,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 13,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00497",
    "name": "Specialized Drain Cardiac",
    "description": "Specialty-specific consumable for Cardiac",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-498",
    "sku": "SKU-498",
    "stock": {
      "current": 365,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 48,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00498",
    "name": "Specialized Catheter Cardiac",
    "description": "Specialty-specific consumable for Cardiac",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-499",
    "sku": "SKU-499",
    "stock": {
      "current": 238,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 25,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00499",
    "name": "Specialized Guide Cardiac",
    "description": "Specialty-specific consumable for Cardiac",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-500",
    "sku": "SKU-500",
    "stock": {
      "current": 270,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 43,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00500",
    "name": "Implant Cardiac Type A Size 1",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-501",
    "sku": "SKU-501",
    "udiCode": "00801741000501",
    "stock": {
      "current": 22,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 531,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00501",
    "name": "Implant Cardiac Type B Size 2",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-502",
    "sku": "SKU-502",
    "udiCode": "00801741000502",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1533,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00502",
    "name": "Implant Cardiac Type C Size 3",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-503",
    "sku": "SKU-503",
    "udiCode": "00801741000503",
    "stock": {
      "current": 12,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2185,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00503",
    "name": "Implant Cardiac Type D Size 4",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-504",
    "sku": "SKU-504",
    "udiCode": "00801741000504",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1966,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00504",
    "name": "Implant Cardiac Type E Size 5",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-505",
    "sku": "SKU-505",
    "udiCode": "00801741000505",
    "stock": {
      "current": 5,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 257,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00505",
    "name": "Implant Cardiac Type F Size 1",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-506",
    "sku": "SKU-506",
    "udiCode": "00801741000506",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 323,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00506",
    "name": "Implant Cardiac Type G Size 2",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-507",
    "sku": "SKU-507",
    "udiCode": "00801741000507",
    "stock": {
      "current": 20,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 541,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00507",
    "name": "Implant Cardiac Type H Size 3",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-508",
    "sku": "SKU-508",
    "udiCode": "00801741000508",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 697,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00508",
    "name": "Implant Cardiac Type I Size 4",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-509",
    "sku": "SKU-509",
    "udiCode": "00801741000509",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1989,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00509",
    "name": "Implant Cardiac Type J Size 5",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-510",
    "sku": "SKU-510",
    "udiCode": "00801741000510",
    "stock": {
      "current": 25,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1236,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00510",
    "name": "Implant Cardiac Type A Size 1",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-511",
    "sku": "SKU-511",
    "udiCode": "00801741000511",
    "stock": {
      "current": 7,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1701,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00511",
    "name": "Implant Cardiac Type B Size 2",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-512",
    "sku": "SKU-512",
    "udiCode": "00801741000512",
    "stock": {
      "current": 5,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1065,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00512",
    "name": "Implant Cardiac Type C Size 3",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-513",
    "sku": "SKU-513",
    "udiCode": "00801741000513",
    "stock": {
      "current": 5,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1306,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00513",
    "name": "Implant Cardiac Type D Size 4",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-514",
    "sku": "SKU-514",
    "udiCode": "00801741000514",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1485,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00514",
    "name": "Implant Cardiac Type E Size 5",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-515",
    "sku": "SKU-515",
    "udiCode": "00801741000515",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1095,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00515",
    "name": "Implant Cardiac Type F Size 1",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-516",
    "sku": "SKU-516",
    "udiCode": "00801741000516",
    "stock": {
      "current": 8,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1675,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00516",
    "name": "Implant Cardiac Type G Size 2",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-517",
    "sku": "SKU-517",
    "udiCode": "00801741000517",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 292,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00517",
    "name": "Implant Cardiac Type H Size 3",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-518",
    "sku": "SKU-518",
    "udiCode": "00801741000518",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 503,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00518",
    "name": "Implant Cardiac Type I Size 4",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-519",
    "sku": "SKU-519",
    "udiCode": "00801741000519",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1158,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00519",
    "name": "Implant Cardiac Type J Size 5",
    "description": "Specialized implant for Cardiac procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-520",
    "sku": "SKU-520",
    "udiCode": "00801741000520",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 554,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00520",
    "name": "Forceps Cardiac 1",
    "description": "Surgical forceps for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-521",
    "stock": {
      "current": 79,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00521",
    "name": "Retractor Cardiac 1",
    "description": "Surgical retractor for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-522",
    "stock": {
      "current": 62,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00522",
    "name": "Clamp Cardiac 1",
    "description": "Surgical clamp for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-523",
    "stock": {
      "current": 42,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00523",
    "name": "Scissors Cardiac 1",
    "description": "Surgical scissors for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-524",
    "stock": {
      "current": 69,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00524",
    "name": "Holder Cardiac 1",
    "description": "Surgical holder for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-525",
    "stock": {
      "current": 44,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00525",
    "name": "Dissector Cardiac 1",
    "description": "Surgical dissector for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-526",
    "stock": {
      "current": 46,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00526",
    "name": "Probe Cardiac 1",
    "description": "Surgical probe for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-527",
    "stock": {
      "current": 92,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00527",
    "name": "Hook Cardiac 1",
    "description": "Surgical hook for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-528",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00528",
    "name": "Elevator Cardiac 1",
    "description": "Surgical elevator for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-529",
    "stock": {
      "current": 48,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00529",
    "name": "Curette Cardiac 1",
    "description": "Surgical curette for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-530",
    "stock": {
      "current": 83,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00530",
    "name": "Forceps Cardiac 2",
    "description": "Surgical forceps for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-531",
    "stock": {
      "current": 98,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00531",
    "name": "Retractor Cardiac 2",
    "description": "Surgical retractor for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-532",
    "stock": {
      "current": 44,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00532",
    "name": "Clamp Cardiac 2",
    "description": "Surgical clamp for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-533",
    "stock": {
      "current": 26,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00533",
    "name": "Scissors Cardiac 2",
    "description": "Surgical scissors for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-534",
    "stock": {
      "current": 26,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00534",
    "name": "Holder Cardiac 2",
    "description": "Surgical holder for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-535",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00535",
    "name": "Dissector Cardiac 2",
    "description": "Surgical dissector for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-536",
    "stock": {
      "current": 65,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00536",
    "name": "Probe Cardiac 2",
    "description": "Surgical probe for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-537",
    "stock": {
      "current": 45,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00537",
    "name": "Hook Cardiac 2",
    "description": "Surgical hook for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-538",
    "stock": {
      "current": 45,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00538",
    "name": "Elevator Cardiac 2",
    "description": "Surgical elevator for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-539",
    "stock": {
      "current": 31,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00539",
    "name": "Curette Cardiac 2",
    "description": "Surgical curette for Cardiac",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Cardiac"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-540",
    "stock": {
      "current": 74,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00540",
    "name": "Sterile Drape Pack Neurosurgery 1",
    "description": "Comprehensive drape pack for Neurosurgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-541",
    "sku": "SKU-541",
    "stock": {
      "current": 391,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 88,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00541",
    "name": "Sterile Drape Pack Neurosurgery 2",
    "description": "Comprehensive drape pack for Neurosurgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-542",
    "sku": "SKU-542",
    "stock": {
      "current": 314,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 93,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00542",
    "name": "Sterile Drape Pack Neurosurgery 3",
    "description": "Comprehensive drape pack for Neurosurgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-543",
    "sku": "SKU-543",
    "stock": {
      "current": 383,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 60,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00543",
    "name": "Sterile Drape Pack Neurosurgery 4",
    "description": "Comprehensive drape pack for Neurosurgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-544",
    "sku": "SKU-544",
    "stock": {
      "current": 239,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 90,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00544",
    "name": "Sterile Drape Pack Neurosurgery 5",
    "description": "Comprehensive drape pack for Neurosurgery procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-545",
    "sku": "SKU-545",
    "stock": {
      "current": 368,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 39,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00545",
    "name": "Chlorhexidine 2% Solution Neurosurgery",
    "description": "Antiseptic preparation solution for Neurosurgery",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-546",
    "sku": "SKU-546",
    "stock": {
      "current": 326,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 8,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00546",
    "name": "Betadine Solution Neurosurgery",
    "description": "Antiseptic preparation solution for Neurosurgery",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-547",
    "sku": "SKU-547",
    "stock": {
      "current": 230,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 11,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00547",
    "name": "Skin Prep Applicator Neurosurgery",
    "description": "Antiseptic preparation solution for Neurosurgery",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-548",
    "sku": "SKU-548",
    "stock": {
      "current": 232,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00548",
    "name": "Operating Table Neurosurgery Standard",
    "description": "Specialized operating table for Neurosurgery procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-549",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00549",
    "name": "Operating Table Neurosurgery Specialist",
    "description": "Specialized operating table for Neurosurgery procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-550",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00550",
    "name": "Lateral Support Set Neurosurgery",
    "description": "Positioning equipment for Neurosurgery procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-551",
    "stock": {
      "current": 26,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00551",
    "name": "Leg Holder Attachment Neurosurgery",
    "description": "Positioning equipment for Neurosurgery procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-552",
    "stock": {
      "current": 44,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00552",
    "name": "Arm Board Set Neurosurgery",
    "description": "Positioning equipment for Neurosurgery procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-553",
    "stock": {
      "current": 64,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00553",
    "name": "Gel Positioning Pads Neurosurgery",
    "description": "Positioning equipment for Neurosurgery procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-554",
    "stock": {
      "current": 91,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00554",
    "name": "Basic Instrument Tray Neurosurgery 1",
    "description": "Standard instrument set for Neurosurgery procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-555",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00555",
    "name": "Basic Instrument Tray Neurosurgery 2",
    "description": "Standard instrument set for Neurosurgery procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-556",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00556",
    "name": "Basic Instrument Tray Neurosurgery 3",
    "description": "Standard instrument set for Neurosurgery procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-557",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00557",
    "name": "Basic Instrument Tray Neurosurgery 4",
    "description": "Standard instrument set for Neurosurgery procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-558",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00558",
    "name": "Specialist Instrument Tray Neurosurgery 1",
    "description": "Specialized instrument set for Neurosurgery procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "INST-559",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00559",
    "name": "Specialist Instrument Tray Neurosurgery 2",
    "description": "Specialized instrument set for Neurosurgery procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "INST-560",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00560",
    "name": "Specialist Instrument Tray Neurosurgery 3",
    "description": "Specialized instrument set for Neurosurgery procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "INST-561",
    "stock": {
      "current": 10,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00561",
    "name": "Specialist Instrument Tray Neurosurgery 4",
    "description": "Specialized instrument set for Neurosurgery procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "INST-562",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00562",
    "name": "Vicryl 1 Suture Neurosurgery",
    "description": "Standard consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-563",
    "sku": "SKU-563",
    "stock": {
      "current": 268,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 48,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00563",
    "name": "Vicryl 2-0 Suture Neurosurgery",
    "description": "Standard consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-564",
    "sku": "SKU-564",
    "stock": {
      "current": 368,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 7,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00564",
    "name": "PDS 1 Suture Neurosurgery",
    "description": "Standard consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-565",
    "sku": "SKU-565",
    "stock": {
      "current": 149,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 11,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00565",
    "name": "Nylon 2-0 Suture Neurosurgery",
    "description": "Standard consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-566",
    "sku": "SKU-566",
    "stock": {
      "current": 389,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 39,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00566",
    "name": "Surgical Gloves 7 Neurosurgery",
    "description": "Standard consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-567",
    "sku": "SKU-567",
    "stock": {
      "current": 396,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 39,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00567",
    "name": "Surgical Gloves 7.5 Neurosurgery",
    "description": "Standard consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-568",
    "sku": "SKU-568",
    "stock": {
      "current": 397,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 49,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00568",
    "name": "Surgical Gloves 8 Neurosurgery",
    "description": "Standard consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-569",
    "sku": "SKU-569",
    "stock": {
      "current": 184,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 49,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00569",
    "name": "Gauze Swabs x100 Neurosurgery",
    "description": "Standard consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-570",
    "sku": "SKU-570",
    "stock": {
      "current": 325,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 26,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00570",
    "name": "Specialized Wire Neurosurgery",
    "description": "Specialty-specific consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-571",
    "sku": "SKU-571",
    "stock": {
      "current": 98,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00571",
    "name": "Specialized Pin Neurosurgery",
    "description": "Specialty-specific consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-572",
    "sku": "SKU-572",
    "stock": {
      "current": 306,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 14,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00572",
    "name": "Specialized Screw Neurosurgery",
    "description": "Specialty-specific consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-573",
    "sku": "SKU-573",
    "stock": {
      "current": 384,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 48,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00573",
    "name": "Specialized Clip Neurosurgery",
    "description": "Specialty-specific consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-574",
    "sku": "SKU-574",
    "stock": {
      "current": 209,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 48,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00574",
    "name": "Specialized Drain Neurosurgery",
    "description": "Specialty-specific consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-575",
    "sku": "SKU-575",
    "stock": {
      "current": 55,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 30,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00575",
    "name": "Specialized Catheter Neurosurgery",
    "description": "Specialty-specific consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-576",
    "sku": "SKU-576",
    "stock": {
      "current": 376,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 9,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00576",
    "name": "Specialized Guide Neurosurgery",
    "description": "Specialty-specific consumable for Neurosurgery",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-577",
    "sku": "SKU-577",
    "stock": {
      "current": 240,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 46,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00577",
    "name": "Implant Neurosurgery Type A Size 1",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-578",
    "sku": "SKU-578",
    "udiCode": "00801741000578",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 803,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00578",
    "name": "Implant Neurosurgery Type B Size 2",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-579",
    "sku": "SKU-579",
    "udiCode": "00801741000579",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 654,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00579",
    "name": "Implant Neurosurgery Type C Size 3",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-580",
    "sku": "SKU-580",
    "udiCode": "00801741000580",
    "stock": {
      "current": 25,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1369,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00580",
    "name": "Implant Neurosurgery Type D Size 4",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-581",
    "sku": "SKU-581",
    "udiCode": "00801741000581",
    "stock": {
      "current": 7,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 479,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00581",
    "name": "Implant Neurosurgery Type E Size 5",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-582",
    "sku": "SKU-582",
    "udiCode": "00801741000582",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 316,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00582",
    "name": "Implant Neurosurgery Type F Size 1",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-583",
    "sku": "SKU-583",
    "udiCode": "00801741000583",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 811,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00583",
    "name": "Implant Neurosurgery Type G Size 2",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-584",
    "sku": "SKU-584",
    "udiCode": "00801741000584",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 696,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00584",
    "name": "Implant Neurosurgery Type H Size 3",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-585",
    "sku": "SKU-585",
    "udiCode": "00801741000585",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 533,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00585",
    "name": "Implant Neurosurgery Type I Size 4",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-586",
    "sku": "SKU-586",
    "udiCode": "00801741000586",
    "stock": {
      "current": 10,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2218,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00586",
    "name": "Implant Neurosurgery Type J Size 5",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-587",
    "sku": "SKU-587",
    "udiCode": "00801741000587",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1446,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00587",
    "name": "Implant Neurosurgery Type A Size 1",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-588",
    "sku": "SKU-588",
    "udiCode": "00801741000588",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2340,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00588",
    "name": "Implant Neurosurgery Type B Size 2",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-589",
    "sku": "SKU-589",
    "udiCode": "00801741000589",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1828,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00589",
    "name": "Implant Neurosurgery Type C Size 3",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-590",
    "sku": "SKU-590",
    "udiCode": "00801741000590",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 623,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00590",
    "name": "Implant Neurosurgery Type D Size 4",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-591",
    "sku": "SKU-591",
    "udiCode": "00801741000591",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 484,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00591",
    "name": "Implant Neurosurgery Type E Size 5",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-592",
    "sku": "SKU-592",
    "udiCode": "00801741000592",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1432,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00592",
    "name": "Implant Neurosurgery Type F Size 1",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-593",
    "sku": "SKU-593",
    "udiCode": "00801741000593",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1183,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00593",
    "name": "Implant Neurosurgery Type G Size 2",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-594",
    "sku": "SKU-594",
    "udiCode": "00801741000594",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2465,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00594",
    "name": "Implant Neurosurgery Type H Size 3",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-595",
    "sku": "SKU-595",
    "udiCode": "00801741000595",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2001,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00595",
    "name": "Implant Neurosurgery Type I Size 4",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-596",
    "sku": "SKU-596",
    "udiCode": "00801741000596",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 570,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00596",
    "name": "Implant Neurosurgery Type J Size 5",
    "description": "Specialized implant for Neurosurgery procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-597",
    "sku": "SKU-597",
    "udiCode": "00801741000597",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2316,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00597",
    "name": "Forceps Neurosurgery 1",
    "description": "Surgical forceps for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-598",
    "stock": {
      "current": 87,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00598",
    "name": "Retractor Neurosurgery 1",
    "description": "Surgical retractor for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-599",
    "stock": {
      "current": 28,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00599",
    "name": "Clamp Neurosurgery 1",
    "description": "Surgical clamp for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-600",
    "stock": {
      "current": 75,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00600",
    "name": "Scissors Neurosurgery 1",
    "description": "Surgical scissors for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-601",
    "stock": {
      "current": 61,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00601",
    "name": "Holder Neurosurgery 1",
    "description": "Surgical holder for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-602",
    "stock": {
      "current": 72,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00602",
    "name": "Dissector Neurosurgery 1",
    "description": "Surgical dissector for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-603",
    "stock": {
      "current": 95,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00603",
    "name": "Probe Neurosurgery 1",
    "description": "Surgical probe for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-604",
    "stock": {
      "current": 92,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00604",
    "name": "Hook Neurosurgery 1",
    "description": "Surgical hook for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-605",
    "stock": {
      "current": 23,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00605",
    "name": "Elevator Neurosurgery 1",
    "description": "Surgical elevator for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-606",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00606",
    "name": "Curette Neurosurgery 1",
    "description": "Surgical curette for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-607",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00607",
    "name": "Forceps Neurosurgery 2",
    "description": "Surgical forceps for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-608",
    "stock": {
      "current": 72,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00608",
    "name": "Retractor Neurosurgery 2",
    "description": "Surgical retractor for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-609",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00609",
    "name": "Clamp Neurosurgery 2",
    "description": "Surgical clamp for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-610",
    "stock": {
      "current": 22,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00610",
    "name": "Scissors Neurosurgery 2",
    "description": "Surgical scissors for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-611",
    "stock": {
      "current": 63,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00611",
    "name": "Holder Neurosurgery 2",
    "description": "Surgical holder for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-612",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00612",
    "name": "Dissector Neurosurgery 2",
    "description": "Surgical dissector for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-613",
    "stock": {
      "current": 22,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00613",
    "name": "Probe Neurosurgery 2",
    "description": "Surgical probe for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-614",
    "stock": {
      "current": 86,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00614",
    "name": "Hook Neurosurgery 2",
    "description": "Surgical hook for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-615",
    "stock": {
      "current": 39,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00615",
    "name": "Elevator Neurosurgery 2",
    "description": "Surgical elevator for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-616",
    "stock": {
      "current": 39,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00616",
    "name": "Curette Neurosurgery 2",
    "description": "Surgical curette for Neurosurgery",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Neurosurgery"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-617",
    "stock": {
      "current": 41,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00617",
    "name": "Sterile Drape Pack Vascular 1",
    "description": "Comprehensive drape pack for Vascular procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-618",
    "sku": "SKU-618",
    "stock": {
      "current": 96,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 30,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00618",
    "name": "Sterile Drape Pack Vascular 2",
    "description": "Comprehensive drape pack for Vascular procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-619",
    "sku": "SKU-619",
    "stock": {
      "current": 246,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 60,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00619",
    "name": "Sterile Drape Pack Vascular 3",
    "description": "Comprehensive drape pack for Vascular procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-620",
    "sku": "SKU-620",
    "stock": {
      "current": 72,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 50,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00620",
    "name": "Sterile Drape Pack Vascular 4",
    "description": "Comprehensive drape pack for Vascular procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-621",
    "sku": "SKU-621",
    "stock": {
      "current": 398,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 89,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00621",
    "name": "Sterile Drape Pack Vascular 5",
    "description": "Comprehensive drape pack for Vascular procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-622",
    "sku": "SKU-622",
    "stock": {
      "current": 52,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 66,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00622",
    "name": "Chlorhexidine 2% Solution Vascular",
    "description": "Antiseptic preparation solution for Vascular",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-623",
    "sku": "SKU-623",
    "stock": {
      "current": 73,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 20,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00623",
    "name": "Betadine Solution Vascular",
    "description": "Antiseptic preparation solution for Vascular",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-624",
    "sku": "SKU-624",
    "stock": {
      "current": 398,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 13,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00624",
    "name": "Skin Prep Applicator Vascular",
    "description": "Antiseptic preparation solution for Vascular",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-625",
    "sku": "SKU-625",
    "stock": {
      "current": 105,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 9,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00625",
    "name": "Operating Table Vascular Standard",
    "description": "Specialized operating table for Vascular procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-626",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00626",
    "name": "Operating Table Vascular Specialist",
    "description": "Specialized operating table for Vascular procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-627",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00627",
    "name": "Lateral Support Set Vascular",
    "description": "Positioning equipment for Vascular procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-628",
    "stock": {
      "current": 80,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00628",
    "name": "Leg Holder Attachment Vascular",
    "description": "Positioning equipment for Vascular procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-629",
    "stock": {
      "current": 67,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00629",
    "name": "Arm Board Set Vascular",
    "description": "Positioning equipment for Vascular procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-630",
    "stock": {
      "current": 40,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00630",
    "name": "Gel Positioning Pads Vascular",
    "description": "Positioning equipment for Vascular procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-631",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00631",
    "name": "Basic Instrument Tray Vascular 1",
    "description": "Standard instrument set for Vascular procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-632",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00632",
    "name": "Basic Instrument Tray Vascular 2",
    "description": "Standard instrument set for Vascular procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-633",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00633",
    "name": "Basic Instrument Tray Vascular 3",
    "description": "Standard instrument set for Vascular procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-634",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00634",
    "name": "Basic Instrument Tray Vascular 4",
    "description": "Standard instrument set for Vascular procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-635",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00635",
    "name": "Specialist Instrument Tray Vascular 1",
    "description": "Specialized instrument set for Vascular procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "INST-636",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00636",
    "name": "Specialist Instrument Tray Vascular 2",
    "description": "Specialized instrument set for Vascular procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "INST-637",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00637",
    "name": "Specialist Instrument Tray Vascular 3",
    "description": "Specialized instrument set for Vascular procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "INST-638",
    "stock": {
      "current": 10,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00638",
    "name": "Specialist Instrument Tray Vascular 4",
    "description": "Specialized instrument set for Vascular procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "INST-639",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00639",
    "name": "Vicryl 1 Suture Vascular",
    "description": "Standard consumable for Vascular",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-640",
    "sku": "SKU-640",
    "stock": {
      "current": 279,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 20,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00640",
    "name": "Vicryl 2-0 Suture Vascular",
    "description": "Standard consumable for Vascular",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-641",
    "sku": "SKU-641",
    "stock": {
      "current": 116,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 17,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00641",
    "name": "PDS 1 Suture Vascular",
    "description": "Standard consumable for Vascular",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-642",
    "sku": "SKU-642",
    "stock": {
      "current": 195,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00642",
    "name": "Nylon 2-0 Suture Vascular",
    "description": "Standard consumable for Vascular",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-643",
    "sku": "SKU-643",
    "stock": {
      "current": 146,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 34,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00643",
    "name": "Surgical Gloves 7 Vascular",
    "description": "Standard consumable for Vascular",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-644",
    "sku": "SKU-644",
    "stock": {
      "current": 85,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 40,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00644",
    "name": "Surgical Gloves 7.5 Vascular",
    "description": "Standard consumable for Vascular",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-645",
    "sku": "SKU-645",
    "stock": {
      "current": 172,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 38,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00645",
    "name": "Surgical Gloves 8 Vascular",
    "description": "Standard consumable for Vascular",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-646",
    "sku": "SKU-646",
    "stock": {
      "current": 175,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 13,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00646",
    "name": "Gauze Swabs x100 Vascular",
    "description": "Standard consumable for Vascular",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-647",
    "sku": "SKU-647",
    "stock": {
      "current": 254,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00647",
    "name": "Specialized Wire Vascular",
    "description": "Specialty-specific consumable for Vascular",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-648",
    "sku": "SKU-648",
    "stock": {
      "current": 50,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 8,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00648",
    "name": "Specialized Pin Vascular",
    "description": "Specialty-specific consumable for Vascular",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-649",
    "sku": "SKU-649",
    "stock": {
      "current": 84,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 25,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00649",
    "name": "Specialized Screw Vascular",
    "description": "Specialty-specific consumable for Vascular",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-650",
    "sku": "SKU-650",
    "stock": {
      "current": 398,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 26,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00650",
    "name": "Specialized Clip Vascular",
    "description": "Specialty-specific consumable for Vascular",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-651",
    "sku": "SKU-651",
    "stock": {
      "current": 113,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 7,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00651",
    "name": "Specialized Drain Vascular",
    "description": "Specialty-specific consumable for Vascular",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-652",
    "sku": "SKU-652",
    "stock": {
      "current": 312,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 7,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00652",
    "name": "Specialized Catheter Vascular",
    "description": "Specialty-specific consumable for Vascular",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-653",
    "sku": "SKU-653",
    "stock": {
      "current": 293,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 40,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00653",
    "name": "Specialized Guide Vascular",
    "description": "Specialty-specific consumable for Vascular",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-654",
    "sku": "SKU-654",
    "stock": {
      "current": 295,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 8,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00654",
    "name": "Implant Vascular Type A Size 1",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-655",
    "sku": "SKU-655",
    "udiCode": "00801741000655",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1437,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00655",
    "name": "Implant Vascular Type B Size 2",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-656",
    "sku": "SKU-656",
    "udiCode": "00801741000656",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 510,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00656",
    "name": "Implant Vascular Type C Size 3",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-657",
    "sku": "SKU-657",
    "udiCode": "00801741000657",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2467,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00657",
    "name": "Implant Vascular Type D Size 4",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-658",
    "sku": "SKU-658",
    "udiCode": "00801741000658",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 634,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00658",
    "name": "Implant Vascular Type E Size 5",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-659",
    "sku": "SKU-659",
    "udiCode": "00801741000659",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 766,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00659",
    "name": "Implant Vascular Type F Size 1",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-660",
    "sku": "SKU-660",
    "udiCode": "00801741000660",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1792,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00660",
    "name": "Implant Vascular Type G Size 2",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-661",
    "sku": "SKU-661",
    "udiCode": "00801741000661",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1426,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00661",
    "name": "Implant Vascular Type H Size 3",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-662",
    "sku": "SKU-662",
    "udiCode": "00801741000662",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1024,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00662",
    "name": "Implant Vascular Type I Size 4",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-663",
    "sku": "SKU-663",
    "udiCode": "00801741000663",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 864,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00663",
    "name": "Implant Vascular Type J Size 5",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-664",
    "sku": "SKU-664",
    "udiCode": "00801741000664",
    "stock": {
      "current": 11,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1877,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00664",
    "name": "Implant Vascular Type A Size 1",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-665",
    "sku": "SKU-665",
    "udiCode": "00801741000665",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1147,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00665",
    "name": "Implant Vascular Type B Size 2",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-666",
    "sku": "SKU-666",
    "udiCode": "00801741000666",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1326,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00666",
    "name": "Implant Vascular Type C Size 3",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-667",
    "sku": "SKU-667",
    "udiCode": "00801741000667",
    "stock": {
      "current": 5,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 845,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00667",
    "name": "Implant Vascular Type D Size 4",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-668",
    "sku": "SKU-668",
    "udiCode": "00801741000668",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1671,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00668",
    "name": "Implant Vascular Type E Size 5",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-669",
    "sku": "SKU-669",
    "udiCode": "00801741000669",
    "stock": {
      "current": 25,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 738,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00669",
    "name": "Implant Vascular Type F Size 1",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-670",
    "sku": "SKU-670",
    "udiCode": "00801741000670",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2388,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00670",
    "name": "Implant Vascular Type G Size 2",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-671",
    "sku": "SKU-671",
    "udiCode": "00801741000671",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 699,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00671",
    "name": "Implant Vascular Type H Size 3",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-672",
    "sku": "SKU-672",
    "udiCode": "00801741000672",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1518,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00672",
    "name": "Implant Vascular Type I Size 4",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-673",
    "sku": "SKU-673",
    "udiCode": "00801741000673",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2480,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00673",
    "name": "Implant Vascular Type J Size 5",
    "description": "Specialized implant for Vascular procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Vascular"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-674",
    "sku": "SKU-674",
    "udiCode": "00801741000674",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 418,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00674",
    "name": "Forceps Vascular 1",
    "description": "Surgical forceps for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-675",
    "stock": {
      "current": 28,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00675",
    "name": "Retractor Vascular 1",
    "description": "Surgical retractor for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-676",
    "stock": {
      "current": 91,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00676",
    "name": "Clamp Vascular 1",
    "description": "Surgical clamp for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-677",
    "stock": {
      "current": 44,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00677",
    "name": "Scissors Vascular 1",
    "description": "Surgical scissors for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-678",
    "stock": {
      "current": 68,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00678",
    "name": "Holder Vascular 1",
    "description": "Surgical holder for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-679",
    "stock": {
      "current": 75,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00679",
    "name": "Dissector Vascular 1",
    "description": "Surgical dissector for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-680",
    "stock": {
      "current": 67,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00680",
    "name": "Probe Vascular 1",
    "description": "Surgical probe for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-681",
    "stock": {
      "current": 33,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00681",
    "name": "Hook Vascular 1",
    "description": "Surgical hook for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-682",
    "stock": {
      "current": 55,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00682",
    "name": "Elevator Vascular 1",
    "description": "Surgical elevator for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-683",
    "stock": {
      "current": 26,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00683",
    "name": "Curette Vascular 1",
    "description": "Surgical curette for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-684",
    "stock": {
      "current": 27,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00684",
    "name": "Forceps Vascular 2",
    "description": "Surgical forceps for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-685",
    "stock": {
      "current": 45,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00685",
    "name": "Retractor Vascular 2",
    "description": "Surgical retractor for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-686",
    "stock": {
      "current": 22,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00686",
    "name": "Clamp Vascular 2",
    "description": "Surgical clamp for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-687",
    "stock": {
      "current": 64,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00687",
    "name": "Scissors Vascular 2",
    "description": "Surgical scissors for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-688",
    "stock": {
      "current": 76,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00688",
    "name": "Holder Vascular 2",
    "description": "Surgical holder for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-689",
    "stock": {
      "current": 23,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00689",
    "name": "Dissector Vascular 2",
    "description": "Surgical dissector for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-690",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00690",
    "name": "Probe Vascular 2",
    "description": "Surgical probe for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-691",
    "stock": {
      "current": 65,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00691",
    "name": "Hook Vascular 2",
    "description": "Surgical hook for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-692",
    "stock": {
      "current": 100,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00692",
    "name": "Elevator Vascular 2",
    "description": "Surgical elevator for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-693",
    "stock": {
      "current": 86,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00693",
    "name": "Curette Vascular 2",
    "description": "Surgical curette for Vascular",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Vascular"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-694",
    "stock": {
      "current": 67,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00694",
    "name": "Sterile Drape Pack Plastics 1",
    "description": "Comprehensive drape pack for Plastics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-695",
    "sku": "SKU-695",
    "stock": {
      "current": 214,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 86,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00695",
    "name": "Sterile Drape Pack Plastics 2",
    "description": "Comprehensive drape pack for Plastics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-696",
    "sku": "SKU-696",
    "stock": {
      "current": 330,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 98,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00696",
    "name": "Sterile Drape Pack Plastics 3",
    "description": "Comprehensive drape pack for Plastics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-697",
    "sku": "SKU-697",
    "stock": {
      "current": 64,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 90,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00697",
    "name": "Sterile Drape Pack Plastics 4",
    "description": "Comprehensive drape pack for Plastics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-698",
    "sku": "SKU-698",
    "stock": {
      "current": 368,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 81,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00698",
    "name": "Sterile Drape Pack Plastics 5",
    "description": "Comprehensive drape pack for Plastics procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-699",
    "sku": "SKU-699",
    "stock": {
      "current": 254,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 89,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00699",
    "name": "Chlorhexidine 2% Solution Plastics",
    "description": "Antiseptic preparation solution for Plastics",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-700",
    "sku": "SKU-700",
    "stock": {
      "current": 82,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 12,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00700",
    "name": "Betadine Solution Plastics",
    "description": "Antiseptic preparation solution for Plastics",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-701",
    "sku": "SKU-701",
    "stock": {
      "current": 212,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 24,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00701",
    "name": "Skin Prep Applicator Plastics",
    "description": "Antiseptic preparation solution for Plastics",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-702",
    "sku": "SKU-702",
    "stock": {
      "current": 332,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00702",
    "name": "Operating Table Plastics Standard",
    "description": "Specialized operating table for Plastics procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-703",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00703",
    "name": "Operating Table Plastics Specialist",
    "description": "Specialized operating table for Plastics procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-704",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00704",
    "name": "Lateral Support Set Plastics",
    "description": "Positioning equipment for Plastics procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-705",
    "stock": {
      "current": 37,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00705",
    "name": "Leg Holder Attachment Plastics",
    "description": "Positioning equipment for Plastics procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-706",
    "stock": {
      "current": 75,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00706",
    "name": "Arm Board Set Plastics",
    "description": "Positioning equipment for Plastics procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-707",
    "stock": {
      "current": 94,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00707",
    "name": "Gel Positioning Pads Plastics",
    "description": "Positioning equipment for Plastics procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-708",
    "stock": {
      "current": 40,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00708",
    "name": "Basic Instrument Tray Plastics 1",
    "description": "Standard instrument set for Plastics procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-709",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00709",
    "name": "Basic Instrument Tray Plastics 2",
    "description": "Standard instrument set for Plastics procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-710",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00710",
    "name": "Basic Instrument Tray Plastics 3",
    "description": "Standard instrument set for Plastics procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-711",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00711",
    "name": "Basic Instrument Tray Plastics 4",
    "description": "Standard instrument set for Plastics procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-712",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00712",
    "name": "Specialist Instrument Tray Plastics 1",
    "description": "Specialized instrument set for Plastics procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-713",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00713",
    "name": "Specialist Instrument Tray Plastics 2",
    "description": "Specialized instrument set for Plastics procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-714",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00714",
    "name": "Specialist Instrument Tray Plastics 3",
    "description": "Specialized instrument set for Plastics procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-715",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00715",
    "name": "Specialist Instrument Tray Plastics 4",
    "description": "Specialized instrument set for Plastics procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "INST-716",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00716",
    "name": "Vicryl 1 Suture Plastics",
    "description": "Standard consumable for Plastics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-717",
    "sku": "SKU-717",
    "stock": {
      "current": 387,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 48,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00717",
    "name": "Vicryl 2-0 Suture Plastics",
    "description": "Standard consumable for Plastics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-718",
    "sku": "SKU-718",
    "stock": {
      "current": 52,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 27,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00718",
    "name": "PDS 1 Suture Plastics",
    "description": "Standard consumable for Plastics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-719",
    "sku": "SKU-719",
    "stock": {
      "current": 392,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 8,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00719",
    "name": "Nylon 2-0 Suture Plastics",
    "description": "Standard consumable for Plastics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-720",
    "sku": "SKU-720",
    "stock": {
      "current": 153,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 33,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00720",
    "name": "Surgical Gloves 7 Plastics",
    "description": "Standard consumable for Plastics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-721",
    "sku": "SKU-721",
    "stock": {
      "current": 151,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00721",
    "name": "Surgical Gloves 7.5 Plastics",
    "description": "Standard consumable for Plastics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-722",
    "sku": "SKU-722",
    "stock": {
      "current": 219,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 9,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00722",
    "name": "Surgical Gloves 8 Plastics",
    "description": "Standard consumable for Plastics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-723",
    "sku": "SKU-723",
    "stock": {
      "current": 140,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 38,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00723",
    "name": "Gauze Swabs x100 Plastics",
    "description": "Standard consumable for Plastics",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-724",
    "sku": "SKU-724",
    "stock": {
      "current": 328,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 47,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00724",
    "name": "Specialized Wire Plastics",
    "description": "Specialty-specific consumable for Plastics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-725",
    "sku": "SKU-725",
    "stock": {
      "current": 371,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 47,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00725",
    "name": "Specialized Pin Plastics",
    "description": "Specialty-specific consumable for Plastics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-726",
    "sku": "SKU-726",
    "stock": {
      "current": 326,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 20,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00726",
    "name": "Specialized Screw Plastics",
    "description": "Specialty-specific consumable for Plastics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-727",
    "sku": "SKU-727",
    "stock": {
      "current": 276,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 28,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00727",
    "name": "Specialized Clip Plastics",
    "description": "Specialty-specific consumable for Plastics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-728",
    "sku": "SKU-728",
    "stock": {
      "current": 249,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 29,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00728",
    "name": "Specialized Drain Plastics",
    "description": "Specialty-specific consumable for Plastics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-729",
    "sku": "SKU-729",
    "stock": {
      "current": 312,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 16,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00729",
    "name": "Specialized Catheter Plastics",
    "description": "Specialty-specific consumable for Plastics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-730",
    "sku": "SKU-730",
    "stock": {
      "current": 116,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 46,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00730",
    "name": "Specialized Guide Plastics",
    "description": "Specialty-specific consumable for Plastics",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-731",
    "sku": "SKU-731",
    "stock": {
      "current": 291,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 7,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00731",
    "name": "Implant Plastics Type A Size 1",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-732",
    "sku": "SKU-732",
    "udiCode": "00801741000732",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1556,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00732",
    "name": "Implant Plastics Type B Size 2",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-733",
    "sku": "SKU-733",
    "udiCode": "00801741000733",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2239,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00733",
    "name": "Implant Plastics Type C Size 3",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-734",
    "sku": "SKU-734",
    "udiCode": "00801741000734",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1495,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00734",
    "name": "Implant Plastics Type D Size 4",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-735",
    "sku": "SKU-735",
    "udiCode": "00801741000735",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 424,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00735",
    "name": "Implant Plastics Type E Size 5",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-736",
    "sku": "SKU-736",
    "udiCode": "00801741000736",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 273,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00736",
    "name": "Implant Plastics Type F Size 1",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-737",
    "sku": "SKU-737",
    "udiCode": "00801741000737",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1617,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00737",
    "name": "Implant Plastics Type G Size 2",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-738",
    "sku": "SKU-738",
    "udiCode": "00801741000738",
    "stock": {
      "current": 12,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1678,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00738",
    "name": "Implant Plastics Type H Size 3",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-739",
    "sku": "SKU-739",
    "udiCode": "00801741000739",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2043,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00739",
    "name": "Implant Plastics Type I Size 4",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-740",
    "sku": "SKU-740",
    "udiCode": "00801741000740",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 832,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00740",
    "name": "Implant Plastics Type J Size 5",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-741",
    "sku": "SKU-741",
    "udiCode": "00801741000741",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2263,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00741",
    "name": "Implant Plastics Type A Size 1",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-742",
    "sku": "SKU-742",
    "udiCode": "00801741000742",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1496,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00742",
    "name": "Implant Plastics Type B Size 2",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-743",
    "sku": "SKU-743",
    "udiCode": "00801741000743",
    "stock": {
      "current": 7,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 964,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00743",
    "name": "Implant Plastics Type C Size 3",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-744",
    "sku": "SKU-744",
    "udiCode": "00801741000744",
    "stock": {
      "current": 10,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1400,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00744",
    "name": "Implant Plastics Type D Size 4",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-745",
    "sku": "SKU-745",
    "udiCode": "00801741000745",
    "stock": {
      "current": 10,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 450,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00745",
    "name": "Implant Plastics Type E Size 5",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-746",
    "sku": "SKU-746",
    "udiCode": "00801741000746",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2236,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00746",
    "name": "Implant Plastics Type F Size 1",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-747",
    "sku": "SKU-747",
    "udiCode": "00801741000747",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1921,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00747",
    "name": "Implant Plastics Type G Size 2",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-748",
    "sku": "SKU-748",
    "udiCode": "00801741000748",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 609,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00748",
    "name": "Implant Plastics Type H Size 3",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-749",
    "sku": "SKU-749",
    "udiCode": "00801741000749",
    "stock": {
      "current": 24,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2176,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00749",
    "name": "Implant Plastics Type I Size 4",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-750",
    "sku": "SKU-750",
    "udiCode": "00801741000750",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 641,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00750",
    "name": "Implant Plastics Type J Size 5",
    "description": "Specialized implant for Plastics procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Plastics"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-751",
    "sku": "SKU-751",
    "udiCode": "00801741000751",
    "stock": {
      "current": 29,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1788,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00751",
    "name": "Forceps Plastics 1",
    "description": "Surgical forceps for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-752",
    "stock": {
      "current": 79,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00752",
    "name": "Retractor Plastics 1",
    "description": "Surgical retractor for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-753",
    "stock": {
      "current": 79,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00753",
    "name": "Clamp Plastics 1",
    "description": "Surgical clamp for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-754",
    "stock": {
      "current": 58,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00754",
    "name": "Scissors Plastics 1",
    "description": "Surgical scissors for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-755",
    "stock": {
      "current": 34,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00755",
    "name": "Holder Plastics 1",
    "description": "Surgical holder for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-756",
    "stock": {
      "current": 72,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00756",
    "name": "Dissector Plastics 1",
    "description": "Surgical dissector for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-757",
    "stock": {
      "current": 91,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00757",
    "name": "Probe Plastics 1",
    "description": "Surgical probe for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-758",
    "stock": {
      "current": 83,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00758",
    "name": "Hook Plastics 1",
    "description": "Surgical hook for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-759",
    "stock": {
      "current": 49,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00759",
    "name": "Elevator Plastics 1",
    "description": "Surgical elevator for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-760",
    "stock": {
      "current": 88,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00760",
    "name": "Curette Plastics 1",
    "description": "Surgical curette for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-761",
    "stock": {
      "current": 99,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00761",
    "name": "Forceps Plastics 2",
    "description": "Surgical forceps for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-762",
    "stock": {
      "current": 68,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00762",
    "name": "Retractor Plastics 2",
    "description": "Surgical retractor for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-763",
    "stock": {
      "current": 23,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00763",
    "name": "Clamp Plastics 2",
    "description": "Surgical clamp for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-764",
    "stock": {
      "current": 46,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00764",
    "name": "Scissors Plastics 2",
    "description": "Surgical scissors for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-765",
    "stock": {
      "current": 62,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00765",
    "name": "Holder Plastics 2",
    "description": "Surgical holder for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-766",
    "stock": {
      "current": 25,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00766",
    "name": "Dissector Plastics 2",
    "description": "Surgical dissector for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-767",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00767",
    "name": "Probe Plastics 2",
    "description": "Surgical probe for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-768",
    "stock": {
      "current": 46,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00768",
    "name": "Hook Plastics 2",
    "description": "Surgical hook for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-769",
    "stock": {
      "current": 74,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00769",
    "name": "Elevator Plastics 2",
    "description": "Surgical elevator for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-770",
    "stock": {
      "current": 48,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00770",
    "name": "Curette Plastics 2",
    "description": "Surgical curette for Plastics",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Plastics"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-771",
    "stock": {
      "current": 95,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00771",
    "name": "Sterile Drape Pack Gynaecology 1",
    "description": "Comprehensive drape pack for Gynaecology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-772",
    "sku": "SKU-772",
    "stock": {
      "current": 316,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 41,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00772",
    "name": "Sterile Drape Pack Gynaecology 2",
    "description": "Comprehensive drape pack for Gynaecology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-773",
    "sku": "SKU-773",
    "stock": {
      "current": 377,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 86,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00773",
    "name": "Sterile Drape Pack Gynaecology 3",
    "description": "Comprehensive drape pack for Gynaecology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-774",
    "sku": "SKU-774",
    "stock": {
      "current": 170,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 84,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00774",
    "name": "Sterile Drape Pack Gynaecology 4",
    "description": "Comprehensive drape pack for Gynaecology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-775",
    "sku": "SKU-775",
    "stock": {
      "current": 122,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 89,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00775",
    "name": "Sterile Drape Pack Gynaecology 5",
    "description": "Comprehensive drape pack for Gynaecology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-776",
    "sku": "SKU-776",
    "stock": {
      "current": 210,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 88,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00776",
    "name": "Chlorhexidine 2% Solution Gynaecology",
    "description": "Antiseptic preparation solution for Gynaecology",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-777",
    "sku": "SKU-777",
    "stock": {
      "current": 347,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 12,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00777",
    "name": "Betadine Solution Gynaecology",
    "description": "Antiseptic preparation solution for Gynaecology",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-778",
    "sku": "SKU-778",
    "stock": {
      "current": 162,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 19,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00778",
    "name": "Skin Prep Applicator Gynaecology",
    "description": "Antiseptic preparation solution for Gynaecology",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-779",
    "sku": "SKU-779",
    "stock": {
      "current": 329,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 5,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00779",
    "name": "Operating Table Gynaecology Standard",
    "description": "Specialized operating table for Gynaecology procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-780",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00780",
    "name": "Operating Table Gynaecology Specialist",
    "description": "Specialized operating table for Gynaecology procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-781",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00781",
    "name": "Lateral Support Set Gynaecology",
    "description": "Positioning equipment for Gynaecology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-782",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00782",
    "name": "Leg Holder Attachment Gynaecology",
    "description": "Positioning equipment for Gynaecology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-783",
    "stock": {
      "current": 34,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00783",
    "name": "Arm Board Set Gynaecology",
    "description": "Positioning equipment for Gynaecology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-784",
    "stock": {
      "current": 41,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00784",
    "name": "Gel Positioning Pads Gynaecology",
    "description": "Positioning equipment for Gynaecology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-785",
    "stock": {
      "current": 79,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00785",
    "name": "Basic Instrument Tray Gynaecology 1",
    "description": "Standard instrument set for Gynaecology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-786",
    "stock": {
      "current": 10,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00786",
    "name": "Basic Instrument Tray Gynaecology 2",
    "description": "Standard instrument set for Gynaecology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-787",
    "stock": {
      "current": 10,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00787",
    "name": "Basic Instrument Tray Gynaecology 3",
    "description": "Standard instrument set for Gynaecology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-788",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00788",
    "name": "Basic Instrument Tray Gynaecology 4",
    "description": "Standard instrument set for Gynaecology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-789",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00789",
    "name": "Specialist Instrument Tray Gynaecology 1",
    "description": "Specialized instrument set for Gynaecology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-790",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00790",
    "name": "Specialist Instrument Tray Gynaecology 2",
    "description": "Specialized instrument set for Gynaecology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-791",
    "stock": {
      "current": 10,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00791",
    "name": "Specialist Instrument Tray Gynaecology 3",
    "description": "Specialized instrument set for Gynaecology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-792",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00792",
    "name": "Specialist Instrument Tray Gynaecology 4",
    "description": "Specialized instrument set for Gynaecology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-793",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00793",
    "name": "Vicryl 1 Suture Gynaecology",
    "description": "Standard consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-794",
    "sku": "SKU-794",
    "stock": {
      "current": 288,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 49,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00794",
    "name": "Vicryl 2-0 Suture Gynaecology",
    "description": "Standard consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-795",
    "sku": "SKU-795",
    "stock": {
      "current": 203,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 30,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00795",
    "name": "PDS 1 Suture Gynaecology",
    "description": "Standard consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-796",
    "sku": "SKU-796",
    "stock": {
      "current": 334,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 45,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00796",
    "name": "Nylon 2-0 Suture Gynaecology",
    "description": "Standard consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-797",
    "sku": "SKU-797",
    "stock": {
      "current": 273,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 15,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00797",
    "name": "Surgical Gloves 7 Gynaecology",
    "description": "Standard consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-798",
    "sku": "SKU-798",
    "stock": {
      "current": 361,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 35,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00798",
    "name": "Surgical Gloves 7.5 Gynaecology",
    "description": "Standard consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-799",
    "sku": "SKU-799",
    "stock": {
      "current": 340,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 29,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00799",
    "name": "Surgical Gloves 8 Gynaecology",
    "description": "Standard consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-800",
    "sku": "SKU-800",
    "stock": {
      "current": 268,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 38,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00800",
    "name": "Gauze Swabs x100 Gynaecology",
    "description": "Standard consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-801",
    "sku": "SKU-801",
    "stock": {
      "current": 337,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 41,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00801",
    "name": "Specialized Wire Gynaecology",
    "description": "Specialty-specific consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-802",
    "sku": "SKU-802",
    "stock": {
      "current": 221,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 21,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00802",
    "name": "Specialized Pin Gynaecology",
    "description": "Specialty-specific consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-803",
    "sku": "SKU-803",
    "stock": {
      "current": 345,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00803",
    "name": "Specialized Screw Gynaecology",
    "description": "Specialty-specific consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-804",
    "sku": "SKU-804",
    "stock": {
      "current": 185,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 49,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00804",
    "name": "Specialized Clip Gynaecology",
    "description": "Specialty-specific consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-805",
    "sku": "SKU-805",
    "stock": {
      "current": 204,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 31,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00805",
    "name": "Specialized Drain Gynaecology",
    "description": "Specialty-specific consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-806",
    "sku": "SKU-806",
    "stock": {
      "current": 254,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 25,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00806",
    "name": "Specialized Catheter Gynaecology",
    "description": "Specialty-specific consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-807",
    "sku": "SKU-807",
    "stock": {
      "current": 94,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 19,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00807",
    "name": "Specialized Guide Gynaecology",
    "description": "Specialty-specific consumable for Gynaecology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-808",
    "sku": "SKU-808",
    "stock": {
      "current": 58,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 45,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00808",
    "name": "Implant Gynaecology Type A Size 1",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-809",
    "sku": "SKU-809",
    "udiCode": "00801741000809",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2318,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00809",
    "name": "Implant Gynaecology Type B Size 2",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-810",
    "sku": "SKU-810",
    "udiCode": "00801741000810",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1638,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00810",
    "name": "Implant Gynaecology Type C Size 3",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-811",
    "sku": "SKU-811",
    "udiCode": "00801741000811",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1047,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00811",
    "name": "Implant Gynaecology Type D Size 4",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-812",
    "sku": "SKU-812",
    "udiCode": "00801741000812",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 874,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00812",
    "name": "Implant Gynaecology Type E Size 5",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-813",
    "sku": "SKU-813",
    "udiCode": "00801741000813",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1657,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00813",
    "name": "Implant Gynaecology Type F Size 1",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-814",
    "sku": "SKU-814",
    "udiCode": "00801741000814",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 495,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00814",
    "name": "Implant Gynaecology Type G Size 2",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-815",
    "sku": "SKU-815",
    "udiCode": "00801741000815",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 542,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00815",
    "name": "Implant Gynaecology Type H Size 3",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-816",
    "sku": "SKU-816",
    "udiCode": "00801741000816",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1618,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00816",
    "name": "Implant Gynaecology Type I Size 4",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-817",
    "sku": "SKU-817",
    "udiCode": "00801741000817",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2137,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00817",
    "name": "Implant Gynaecology Type J Size 5",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-818",
    "sku": "SKU-818",
    "udiCode": "00801741000818",
    "stock": {
      "current": 25,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1098,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00818",
    "name": "Implant Gynaecology Type A Size 1",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-819",
    "sku": "SKU-819",
    "udiCode": "00801741000819",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1199,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00819",
    "name": "Implant Gynaecology Type B Size 2",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-820",
    "sku": "SKU-820",
    "udiCode": "00801741000820",
    "stock": {
      "current": 8,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1931,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00820",
    "name": "Implant Gynaecology Type C Size 3",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-821",
    "sku": "SKU-821",
    "udiCode": "00801741000821",
    "stock": {
      "current": 29,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2138,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00821",
    "name": "Implant Gynaecology Type D Size 4",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-822",
    "sku": "SKU-822",
    "udiCode": "00801741000822",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 337,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00822",
    "name": "Implant Gynaecology Type E Size 5",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-823",
    "sku": "SKU-823",
    "udiCode": "00801741000823",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1300,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00823",
    "name": "Implant Gynaecology Type F Size 1",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-824",
    "sku": "SKU-824",
    "udiCode": "00801741000824",
    "stock": {
      "current": 19,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 538,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00824",
    "name": "Implant Gynaecology Type G Size 2",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-825",
    "sku": "SKU-825",
    "udiCode": "00801741000825",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2104,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00825",
    "name": "Implant Gynaecology Type H Size 3",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-826",
    "sku": "SKU-826",
    "udiCode": "00801741000826",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2428,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00826",
    "name": "Implant Gynaecology Type I Size 4",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-827",
    "sku": "SKU-827",
    "udiCode": "00801741000827",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1410,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00827",
    "name": "Implant Gynaecology Type J Size 5",
    "description": "Specialized implant for Gynaecology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-828",
    "sku": "SKU-828",
    "udiCode": "00801741000828",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1033,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00828",
    "name": "Forceps Gynaecology 1",
    "description": "Surgical forceps for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-829",
    "stock": {
      "current": 96,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00829",
    "name": "Retractor Gynaecology 1",
    "description": "Surgical retractor for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-830",
    "stock": {
      "current": 35,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00830",
    "name": "Clamp Gynaecology 1",
    "description": "Surgical clamp for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-831",
    "stock": {
      "current": 21,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00831",
    "name": "Scissors Gynaecology 1",
    "description": "Surgical scissors for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-832",
    "stock": {
      "current": 97,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00832",
    "name": "Holder Gynaecology 1",
    "description": "Surgical holder for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-833",
    "stock": {
      "current": 54,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00833",
    "name": "Dissector Gynaecology 1",
    "description": "Surgical dissector for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-834",
    "stock": {
      "current": 83,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00834",
    "name": "Probe Gynaecology 1",
    "description": "Surgical probe for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-835",
    "stock": {
      "current": 36,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00835",
    "name": "Hook Gynaecology 1",
    "description": "Surgical hook for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-836",
    "stock": {
      "current": 48,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00836",
    "name": "Elevator Gynaecology 1",
    "description": "Surgical elevator for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-837",
    "stock": {
      "current": 27,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00837",
    "name": "Curette Gynaecology 1",
    "description": "Surgical curette for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-838",
    "stock": {
      "current": 33,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00838",
    "name": "Forceps Gynaecology 2",
    "description": "Surgical forceps for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-839",
    "stock": {
      "current": 79,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00839",
    "name": "Retractor Gynaecology 2",
    "description": "Surgical retractor for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-840",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00840",
    "name": "Clamp Gynaecology 2",
    "description": "Surgical clamp for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-841",
    "stock": {
      "current": 25,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00841",
    "name": "Scissors Gynaecology 2",
    "description": "Surgical scissors for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-842",
    "stock": {
      "current": 60,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00842",
    "name": "Holder Gynaecology 2",
    "description": "Surgical holder for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-843",
    "stock": {
      "current": 98,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00843",
    "name": "Dissector Gynaecology 2",
    "description": "Surgical dissector for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-844",
    "stock": {
      "current": 66,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00844",
    "name": "Probe Gynaecology 2",
    "description": "Surgical probe for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-845",
    "stock": {
      "current": 86,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00845",
    "name": "Hook Gynaecology 2",
    "description": "Surgical hook for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-846",
    "stock": {
      "current": 96,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00846",
    "name": "Elevator Gynaecology 2",
    "description": "Surgical elevator for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-847",
    "stock": {
      "current": 75,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00847",
    "name": "Curette Gynaecology 2",
    "description": "Surgical curette for Gynaecology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Gynaecology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-848",
    "stock": {
      "current": 81,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00848",
    "name": "Sterile Drape Pack Urology 1",
    "description": "Comprehensive drape pack for Urology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-849",
    "sku": "SKU-849",
    "stock": {
      "current": 375,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 52,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00849",
    "name": "Sterile Drape Pack Urology 2",
    "description": "Comprehensive drape pack for Urology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-850",
    "sku": "SKU-850",
    "stock": {
      "current": 364,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 97,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00850",
    "name": "Sterile Drape Pack Urology 3",
    "description": "Comprehensive drape pack for Urology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-851",
    "sku": "SKU-851",
    "stock": {
      "current": 396,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 89,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00851",
    "name": "Sterile Drape Pack Urology 4",
    "description": "Comprehensive drape pack for Urology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-852",
    "sku": "SKU-852",
    "stock": {
      "current": 58,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 71,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00852",
    "name": "Sterile Drape Pack Urology 5",
    "description": "Comprehensive drape pack for Urology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-853",
    "sku": "SKU-853",
    "stock": {
      "current": 213,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 95,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00853",
    "name": "Chlorhexidine 2% Solution Urology",
    "description": "Antiseptic preparation solution for Urology",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-854",
    "sku": "SKU-854",
    "stock": {
      "current": 251,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 21,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00854",
    "name": "Betadine Solution Urology",
    "description": "Antiseptic preparation solution for Urology",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-855",
    "sku": "SKU-855",
    "stock": {
      "current": 263,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 19,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00855",
    "name": "Skin Prep Applicator Urology",
    "description": "Antiseptic preparation solution for Urology",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-856",
    "sku": "SKU-856",
    "stock": {
      "current": 330,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 19,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00856",
    "name": "Operating Table Urology Standard",
    "description": "Specialized operating table for Urology procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-857",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00857",
    "name": "Operating Table Urology Specialist",
    "description": "Specialized operating table for Urology procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-858",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00858",
    "name": "Lateral Support Set Urology",
    "description": "Positioning equipment for Urology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-859",
    "stock": {
      "current": 82,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00859",
    "name": "Leg Holder Attachment Urology",
    "description": "Positioning equipment for Urology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-860",
    "stock": {
      "current": 23,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00860",
    "name": "Arm Board Set Urology",
    "description": "Positioning equipment for Urology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-861",
    "stock": {
      "current": 25,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00861",
    "name": "Gel Positioning Pads Urology",
    "description": "Positioning equipment for Urology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-862",
    "stock": {
      "current": 99,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00862",
    "name": "Basic Instrument Tray Urology 1",
    "description": "Standard instrument set for Urology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-863",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00863",
    "name": "Basic Instrument Tray Urology 2",
    "description": "Standard instrument set for Urology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-864",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00864",
    "name": "Basic Instrument Tray Urology 3",
    "description": "Standard instrument set for Urology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-865",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00865",
    "name": "Basic Instrument Tray Urology 4",
    "description": "Standard instrument set for Urology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-866",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00866",
    "name": "Specialist Instrument Tray Urology 1",
    "description": "Specialized instrument set for Urology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-867",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00867",
    "name": "Specialist Instrument Tray Urology 2",
    "description": "Specialized instrument set for Urology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-868",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00868",
    "name": "Specialist Instrument Tray Urology 3",
    "description": "Specialized instrument set for Urology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-869",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00869",
    "name": "Specialist Instrument Tray Urology 4",
    "description": "Specialized instrument set for Urology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-870",
    "stock": {
      "current": 10,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00870",
    "name": "Vicryl 1 Suture Urology",
    "description": "Standard consumable for Urology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-871",
    "sku": "SKU-871",
    "stock": {
      "current": 158,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 17,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00871",
    "name": "Vicryl 2-0 Suture Urology",
    "description": "Standard consumable for Urology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-872",
    "sku": "SKU-872",
    "stock": {
      "current": 265,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 29,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00872",
    "name": "PDS 1 Suture Urology",
    "description": "Standard consumable for Urology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-873",
    "sku": "SKU-873",
    "stock": {
      "current": 225,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 31,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00873",
    "name": "Nylon 2-0 Suture Urology",
    "description": "Standard consumable for Urology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-874",
    "sku": "SKU-874",
    "stock": {
      "current": 263,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 8,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00874",
    "name": "Surgical Gloves 7 Urology",
    "description": "Standard consumable for Urology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-875",
    "sku": "SKU-875",
    "stock": {
      "current": 114,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 33,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00875",
    "name": "Surgical Gloves 7.5 Urology",
    "description": "Standard consumable for Urology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-876",
    "sku": "SKU-876",
    "stock": {
      "current": 118,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 30,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00876",
    "name": "Surgical Gloves 8 Urology",
    "description": "Standard consumable for Urology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-877",
    "sku": "SKU-877",
    "stock": {
      "current": 120,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 16,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00877",
    "name": "Gauze Swabs x100 Urology",
    "description": "Standard consumable for Urology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-878",
    "sku": "SKU-878",
    "stock": {
      "current": 61,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 16,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00878",
    "name": "Specialized Wire Urology",
    "description": "Specialty-specific consumable for Urology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-879",
    "sku": "SKU-879",
    "stock": {
      "current": 80,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 31,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00879",
    "name": "Specialized Pin Urology",
    "description": "Specialty-specific consumable for Urology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-880",
    "sku": "SKU-880",
    "stock": {
      "current": 89,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 5,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00880",
    "name": "Specialized Screw Urology",
    "description": "Specialty-specific consumable for Urology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-881",
    "sku": "SKU-881",
    "stock": {
      "current": 97,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 10,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00881",
    "name": "Specialized Clip Urology",
    "description": "Specialty-specific consumable for Urology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-882",
    "sku": "SKU-882",
    "stock": {
      "current": 209,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 49,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00882",
    "name": "Specialized Drain Urology",
    "description": "Specialty-specific consumable for Urology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-883",
    "sku": "SKU-883",
    "stock": {
      "current": 203,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 35,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00883",
    "name": "Specialized Catheter Urology",
    "description": "Specialty-specific consumable for Urology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-884",
    "sku": "SKU-884",
    "stock": {
      "current": 363,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 42,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00884",
    "name": "Specialized Guide Urology",
    "description": "Specialty-specific consumable for Urology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-885",
    "sku": "SKU-885",
    "stock": {
      "current": 367,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 40,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00885",
    "name": "Implant Urology Type A Size 1",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-886",
    "sku": "SKU-886",
    "udiCode": "00801741000886",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 262,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00886",
    "name": "Implant Urology Type B Size 2",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-887",
    "sku": "SKU-887",
    "udiCode": "00801741000887",
    "stock": {
      "current": 5,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1481,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00887",
    "name": "Implant Urology Type C Size 3",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-888",
    "sku": "SKU-888",
    "udiCode": "00801741000888",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 652,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00888",
    "name": "Implant Urology Type D Size 4",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-889",
    "sku": "SKU-889",
    "udiCode": "00801741000889",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 907,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00889",
    "name": "Implant Urology Type E Size 5",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-890",
    "sku": "SKU-890",
    "udiCode": "00801741000890",
    "stock": {
      "current": 14,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2150,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00890",
    "name": "Implant Urology Type F Size 1",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-891",
    "sku": "SKU-891",
    "udiCode": "00801741000891",
    "stock": {
      "current": 5,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2068,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00891",
    "name": "Implant Urology Type G Size 2",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-892",
    "sku": "SKU-892",
    "udiCode": "00801741000892",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 923,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00892",
    "name": "Implant Urology Type H Size 3",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-893",
    "sku": "SKU-893",
    "udiCode": "00801741000893",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2018,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00893",
    "name": "Implant Urology Type I Size 4",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-894",
    "sku": "SKU-894",
    "udiCode": "00801741000894",
    "stock": {
      "current": 22,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 551,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00894",
    "name": "Implant Urology Type J Size 5",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-895",
    "sku": "SKU-895",
    "udiCode": "00801741000895",
    "stock": {
      "current": 8,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1762,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00895",
    "name": "Implant Urology Type A Size 1",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-896",
    "sku": "SKU-896",
    "udiCode": "00801741000896",
    "stock": {
      "current": 7,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 807,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00896",
    "name": "Implant Urology Type B Size 2",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-897",
    "sku": "SKU-897",
    "udiCode": "00801741000897",
    "stock": {
      "current": 12,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1594,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00897",
    "name": "Implant Urology Type C Size 3",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-898",
    "sku": "SKU-898",
    "udiCode": "00801741000898",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1679,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00898",
    "name": "Implant Urology Type D Size 4",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-899",
    "sku": "SKU-899",
    "udiCode": "00801741000899",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2144,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00899",
    "name": "Implant Urology Type E Size 5",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-900",
    "sku": "SKU-900",
    "udiCode": "00801741000900",
    "stock": {
      "current": 25,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1419,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00900",
    "name": "Implant Urology Type F Size 1",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-901",
    "sku": "SKU-901",
    "udiCode": "00801741000901",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 469,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00901",
    "name": "Implant Urology Type G Size 2",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-902",
    "sku": "SKU-902",
    "udiCode": "00801741000902",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 910,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00902",
    "name": "Implant Urology Type H Size 3",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-903",
    "sku": "SKU-903",
    "udiCode": "00801741000903",
    "stock": {
      "current": 20,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1847,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00903",
    "name": "Implant Urology Type I Size 4",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-904",
    "sku": "SKU-904",
    "udiCode": "00801741000904",
    "stock": {
      "current": 22,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 991,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00904",
    "name": "Implant Urology Type J Size 5",
    "description": "Specialized implant for Urology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Urology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-905",
    "sku": "SKU-905",
    "udiCode": "00801741000905",
    "stock": {
      "current": 11,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 207,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00905",
    "name": "Forceps Urology 1",
    "description": "Surgical forceps for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-906",
    "stock": {
      "current": 28,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00906",
    "name": "Retractor Urology 1",
    "description": "Surgical retractor for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-907",
    "stock": {
      "current": 35,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00907",
    "name": "Clamp Urology 1",
    "description": "Surgical clamp for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-908",
    "stock": {
      "current": 99,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00908",
    "name": "Scissors Urology 1",
    "description": "Surgical scissors for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-909",
    "stock": {
      "current": 77,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00909",
    "name": "Holder Urology 1",
    "description": "Surgical holder for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-910",
    "stock": {
      "current": 44,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00910",
    "name": "Dissector Urology 1",
    "description": "Surgical dissector for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-911",
    "stock": {
      "current": 53,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00911",
    "name": "Probe Urology 1",
    "description": "Surgical probe for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-912",
    "stock": {
      "current": 84,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00912",
    "name": "Hook Urology 1",
    "description": "Surgical hook for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-913",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00913",
    "name": "Elevator Urology 1",
    "description": "Surgical elevator for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-914",
    "stock": {
      "current": 47,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00914",
    "name": "Curette Urology 1",
    "description": "Surgical curette for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-915",
    "stock": {
      "current": 82,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00915",
    "name": "Forceps Urology 2",
    "description": "Surgical forceps for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-916",
    "stock": {
      "current": 28,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00916",
    "name": "Retractor Urology 2",
    "description": "Surgical retractor for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-917",
    "stock": {
      "current": 59,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00917",
    "name": "Clamp Urology 2",
    "description": "Surgical clamp for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-918",
    "stock": {
      "current": 34,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00918",
    "name": "Scissors Urology 2",
    "description": "Surgical scissors for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-919",
    "stock": {
      "current": 67,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00919",
    "name": "Holder Urology 2",
    "description": "Surgical holder for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-920",
    "stock": {
      "current": 81,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00920",
    "name": "Dissector Urology 2",
    "description": "Surgical dissector for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-921",
    "stock": {
      "current": 72,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00921",
    "name": "Probe Urology 2",
    "description": "Surgical probe for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-922",
    "stock": {
      "current": 54,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00922",
    "name": "Hook Urology 2",
    "description": "Surgical hook for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-923",
    "stock": {
      "current": 21,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00923",
    "name": "Elevator Urology 2",
    "description": "Surgical elevator for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-924",
    "stock": {
      "current": 52,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00924",
    "name": "Curette Urology 2",
    "description": "Surgical curette for Urology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Urology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-925",
    "stock": {
      "current": 99,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00925",
    "name": "Sterile Drape Pack ENT 1",
    "description": "Comprehensive drape pack for ENT procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-926",
    "sku": "SKU-926",
    "stock": {
      "current": 189,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 49,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00926",
    "name": "Sterile Drape Pack ENT 2",
    "description": "Comprehensive drape pack for ENT procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-927",
    "sku": "SKU-927",
    "stock": {
      "current": 208,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 99,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00927",
    "name": "Sterile Drape Pack ENT 3",
    "description": "Comprehensive drape pack for ENT procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-928",
    "sku": "SKU-928",
    "stock": {
      "current": 289,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 67,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00928",
    "name": "Sterile Drape Pack ENT 4",
    "description": "Comprehensive drape pack for ENT procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-929",
    "sku": "SKU-929",
    "stock": {
      "current": 314,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 87,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00929",
    "name": "Sterile Drape Pack ENT 5",
    "description": "Comprehensive drape pack for ENT procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-930",
    "sku": "SKU-930",
    "stock": {
      "current": 390,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 39,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00930",
    "name": "Chlorhexidine 2% Solution ENT",
    "description": "Antiseptic preparation solution for ENT",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-931",
    "sku": "SKU-931",
    "stock": {
      "current": 250,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 10,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00931",
    "name": "Betadine Solution ENT",
    "description": "Antiseptic preparation solution for ENT",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-932",
    "sku": "SKU-932",
    "stock": {
      "current": 281,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 24,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00932",
    "name": "Skin Prep Applicator ENT",
    "description": "Antiseptic preparation solution for ENT",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-933",
    "sku": "SKU-933",
    "stock": {
      "current": 68,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 14,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00933",
    "name": "Operating Table ENT Standard",
    "description": "Specialized operating table for ENT procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-934",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00934",
    "name": "Operating Table ENT Specialist",
    "description": "Specialized operating table for ENT procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-935",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00935",
    "name": "Lateral Support Set ENT",
    "description": "Positioning equipment for ENT procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-936",
    "stock": {
      "current": 38,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00936",
    "name": "Leg Holder Attachment ENT",
    "description": "Positioning equipment for ENT procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-937",
    "stock": {
      "current": 32,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00937",
    "name": "Arm Board Set ENT",
    "description": "Positioning equipment for ENT procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-938",
    "stock": {
      "current": 40,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00938",
    "name": "Gel Positioning Pads ENT",
    "description": "Positioning equipment for ENT procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-939",
    "stock": {
      "current": 57,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00939",
    "name": "Basic Instrument Tray ENT 1",
    "description": "Standard instrument set for ENT procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-940",
    "stock": {
      "current": 5,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00940",
    "name": "Basic Instrument Tray ENT 2",
    "description": "Standard instrument set for ENT procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-941",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00941",
    "name": "Basic Instrument Tray ENT 3",
    "description": "Standard instrument set for ENT procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-942",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00942",
    "name": "Basic Instrument Tray ENT 4",
    "description": "Standard instrument set for ENT procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-943",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00943",
    "name": "Specialist Instrument Tray ENT 1",
    "description": "Specialized instrument set for ENT procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "INST-944",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00944",
    "name": "Specialist Instrument Tray ENT 2",
    "description": "Specialized instrument set for ENT procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "INST-945",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00945",
    "name": "Specialist Instrument Tray ENT 3",
    "description": "Specialized instrument set for ENT procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "INST-946",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00946",
    "name": "Specialist Instrument Tray ENT 4",
    "description": "Specialized instrument set for ENT procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "INST-947",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00947",
    "name": "Vicryl 1 Suture ENT",
    "description": "Standard consumable for ENT",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-948",
    "sku": "SKU-948",
    "stock": {
      "current": 384,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 16,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00948",
    "name": "Vicryl 2-0 Suture ENT",
    "description": "Standard consumable for ENT",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-949",
    "sku": "SKU-949",
    "stock": {
      "current": 333,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 21,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00949",
    "name": "PDS 1 Suture ENT",
    "description": "Standard consumable for ENT",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-950",
    "sku": "SKU-950",
    "stock": {
      "current": 315,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 21,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00950",
    "name": "Nylon 2-0 Suture ENT",
    "description": "Standard consumable for ENT",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-951",
    "sku": "SKU-951",
    "stock": {
      "current": 98,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 19,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00951",
    "name": "Surgical Gloves 7 ENT",
    "description": "Standard consumable for ENT",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-952",
    "sku": "SKU-952",
    "stock": {
      "current": 369,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 19,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00952",
    "name": "Surgical Gloves 7.5 ENT",
    "description": "Standard consumable for ENT",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-953",
    "sku": "SKU-953",
    "stock": {
      "current": 113,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 14,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00953",
    "name": "Surgical Gloves 8 ENT",
    "description": "Standard consumable for ENT",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-954",
    "sku": "SKU-954",
    "stock": {
      "current": 145,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 17,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00954",
    "name": "Gauze Swabs x100 ENT",
    "description": "Standard consumable for ENT",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-955",
    "sku": "SKU-955",
    "stock": {
      "current": 340,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00955",
    "name": "Specialized Wire ENT",
    "description": "Specialty-specific consumable for ENT",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-956",
    "sku": "SKU-956",
    "stock": {
      "current": 215,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 32,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00956",
    "name": "Specialized Pin ENT",
    "description": "Specialty-specific consumable for ENT",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-957",
    "sku": "SKU-957",
    "stock": {
      "current": 74,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 21,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00957",
    "name": "Specialized Screw ENT",
    "description": "Specialty-specific consumable for ENT",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-958",
    "sku": "SKU-958",
    "stock": {
      "current": 127,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 43,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00958",
    "name": "Specialized Clip ENT",
    "description": "Specialty-specific consumable for ENT",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-959",
    "sku": "SKU-959",
    "stock": {
      "current": 284,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 24,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00959",
    "name": "Specialized Drain ENT",
    "description": "Specialty-specific consumable for ENT",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-960",
    "sku": "SKU-960",
    "stock": {
      "current": 145,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 32,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00960",
    "name": "Specialized Catheter ENT",
    "description": "Specialty-specific consumable for ENT",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-961",
    "sku": "SKU-961",
    "stock": {
      "current": 221,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 38,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00961",
    "name": "Specialized Guide ENT",
    "description": "Specialty-specific consumable for ENT",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-962",
    "sku": "SKU-962",
    "stock": {
      "current": 134,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 31,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00962",
    "name": "Implant ENT Type A Size 1",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-963",
    "sku": "SKU-963",
    "udiCode": "00801741000963",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2069,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00963",
    "name": "Implant ENT Type B Size 2",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-964",
    "sku": "SKU-964",
    "udiCode": "00801741000964",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1909,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00964",
    "name": "Implant ENT Type C Size 3",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-965",
    "sku": "SKU-965",
    "udiCode": "00801741000965",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 884,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00965",
    "name": "Implant ENT Type D Size 4",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-966",
    "sku": "SKU-966",
    "udiCode": "00801741000966",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 829,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00966",
    "name": "Implant ENT Type E Size 5",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-967",
    "sku": "SKU-967",
    "udiCode": "00801741000967",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1112,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00967",
    "name": "Implant ENT Type F Size 1",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-968",
    "sku": "SKU-968",
    "udiCode": "00801741000968",
    "stock": {
      "current": 23,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 340,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00968",
    "name": "Implant ENT Type G Size 2",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-969",
    "sku": "SKU-969",
    "udiCode": "00801741000969",
    "stock": {
      "current": 17,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 765,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00969",
    "name": "Implant ENT Type H Size 3",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-970",
    "sku": "SKU-970",
    "udiCode": "00801741000970",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1317,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00970",
    "name": "Implant ENT Type I Size 4",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-971",
    "sku": "SKU-971",
    "udiCode": "00801741000971",
    "stock": {
      "current": 12,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1554,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00971",
    "name": "Implant ENT Type J Size 5",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-972",
    "sku": "SKU-972",
    "udiCode": "00801741000972",
    "stock": {
      "current": 12,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1528,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00972",
    "name": "Implant ENT Type A Size 1",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-973",
    "sku": "SKU-973",
    "udiCode": "00801741000973",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2106,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00973",
    "name": "Implant ENT Type B Size 2",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-974",
    "sku": "SKU-974",
    "udiCode": "00801741000974",
    "stock": {
      "current": 29,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1942,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00974",
    "name": "Implant ENT Type C Size 3",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-975",
    "sku": "SKU-975",
    "udiCode": "00801741000975",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1896,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00975",
    "name": "Implant ENT Type D Size 4",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-976",
    "sku": "SKU-976",
    "udiCode": "00801741000976",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2398,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00976",
    "name": "Implant ENT Type E Size 5",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-977",
    "sku": "SKU-977",
    "udiCode": "00801741000977",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1649,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00977",
    "name": "Implant ENT Type F Size 1",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-978",
    "sku": "SKU-978",
    "udiCode": "00801741000978",
    "stock": {
      "current": 10,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 553,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00978",
    "name": "Implant ENT Type G Size 2",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-979",
    "sku": "SKU-979",
    "udiCode": "00801741000979",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2344,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00979",
    "name": "Implant ENT Type H Size 3",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-980",
    "sku": "SKU-980",
    "udiCode": "00801741000980",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 850,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00980",
    "name": "Implant ENT Type I Size 4",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-981",
    "sku": "SKU-981",
    "udiCode": "00801741000981",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2116,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00981",
    "name": "Implant ENT Type J Size 5",
    "description": "Specialized implant for ENT procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "ENT"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-982",
    "sku": "SKU-982",
    "udiCode": "00801741000982",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1036,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00982",
    "name": "Forceps ENT 1",
    "description": "Surgical forceps for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-983",
    "stock": {
      "current": 87,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00983",
    "name": "Retractor ENT 1",
    "description": "Surgical retractor for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-984",
    "stock": {
      "current": 40,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00984",
    "name": "Clamp ENT 1",
    "description": "Surgical clamp for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-985",
    "stock": {
      "current": 44,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00985",
    "name": "Scissors ENT 1",
    "description": "Surgical scissors for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-986",
    "stock": {
      "current": 20,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00986",
    "name": "Holder ENT 1",
    "description": "Surgical holder for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-987",
    "stock": {
      "current": 34,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00987",
    "name": "Dissector ENT 1",
    "description": "Surgical dissector for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-988",
    "stock": {
      "current": 52,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00988",
    "name": "Probe ENT 1",
    "description": "Surgical probe for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-989",
    "stock": {
      "current": 29,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00989",
    "name": "Hook ENT 1",
    "description": "Surgical hook for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-990",
    "stock": {
      "current": 90,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00990",
    "name": "Elevator ENT 1",
    "description": "Surgical elevator for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-991",
    "stock": {
      "current": 88,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00991",
    "name": "Curette ENT 1",
    "description": "Surgical curette for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-992",
    "stock": {
      "current": 59,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00992",
    "name": "Forceps ENT 2",
    "description": "Surgical forceps for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-993",
    "stock": {
      "current": 73,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00993",
    "name": "Retractor ENT 2",
    "description": "Surgical retractor for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-994",
    "stock": {
      "current": 78,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00994",
    "name": "Clamp ENT 2",
    "description": "Surgical clamp for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-995",
    "stock": {
      "current": 54,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00995",
    "name": "Scissors ENT 2",
    "description": "Surgical scissors for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-996",
    "stock": {
      "current": 30,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00996",
    "name": "Holder ENT 2",
    "description": "Surgical holder for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-997",
    "stock": {
      "current": 82,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00997",
    "name": "Dissector ENT 2",
    "description": "Surgical dissector for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-998",
    "stock": {
      "current": 66,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00998",
    "name": "Probe ENT 2",
    "description": "Surgical probe for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-999",
    "stock": {
      "current": 97,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-00999",
    "name": "Hook ENT 2",
    "description": "Surgical hook for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1000",
    "stock": {
      "current": 71,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01000",
    "name": "Elevator ENT 2",
    "description": "Surgical elevator for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1001",
    "stock": {
      "current": 48,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01001",
    "name": "Curette ENT 2",
    "description": "Surgical curette for ENT",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "ENT"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1002",
    "stock": {
      "current": 89,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01002",
    "name": "Sterile Drape Pack Ophthalmology 1",
    "description": "Comprehensive drape pack for Ophthalmology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-1003",
    "sku": "SKU-1003",
    "stock": {
      "current": 308,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 49,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01003",
    "name": "Sterile Drape Pack Ophthalmology 2",
    "description": "Comprehensive drape pack for Ophthalmology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-1004",
    "sku": "SKU-1004",
    "stock": {
      "current": 223,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 68,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01004",
    "name": "Sterile Drape Pack Ophthalmology 3",
    "description": "Comprehensive drape pack for Ophthalmology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-1005",
    "sku": "SKU-1005",
    "stock": {
      "current": 384,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 35,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01005",
    "name": "Sterile Drape Pack Ophthalmology 4",
    "description": "Comprehensive drape pack for Ophthalmology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-1006",
    "sku": "SKU-1006",
    "stock": {
      "current": 156,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 65,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01006",
    "name": "Sterile Drape Pack Ophthalmology 5",
    "description": "Comprehensive drape pack for Ophthalmology procedures",
    "category": "Drapes",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "DRP-1007",
    "sku": "SKU-1007",
    "stock": {
      "current": 217,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-15",
    "lastReceived": "2025-01-18",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 39,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01007",
    "name": "Chlorhexidine 2% Solution Ophthalmology",
    "description": "Antiseptic preparation solution for Ophthalmology",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-1008",
    "sku": "SKU-1008",
    "stock": {
      "current": 297,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01008",
    "name": "Betadine Solution Ophthalmology",
    "description": "Antiseptic preparation solution for Ophthalmology",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-1009",
    "sku": "SKU-1009",
    "stock": {
      "current": 391,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 22,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01009",
    "name": "Skin Prep Applicator Ophthalmology",
    "description": "Antiseptic preparation solution for Ophthalmology",
    "category": "Prep Solutions",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "PREP-1010",
    "sku": "SKU-1010",
    "stock": {
      "current": 213,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-20",
    "lastReceived": "2025-01-22",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 16,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01010",
    "name": "Operating Table Ophthalmology Standard",
    "description": "Specialized operating table for Ophthalmology procedures",
    "category": "Operating Tables",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-1011",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01011",
    "name": "Operating Table Ophthalmology Specialist",
    "description": "Specialized operating table for Ophthalmology procedures",
    "category": "Operating Tables",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Maquet",
    "productReference": "TBL-1012",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "David Wilson",
        "phone": "07700 900999",
        "email": "david.wilson@getinge.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01012",
    "name": "Lateral Support Set Ophthalmology",
    "description": "Positioning equipment for Ophthalmology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-1013",
    "stock": {
      "current": 34,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01013",
    "name": "Leg Holder Attachment Ophthalmology",
    "description": "Positioning equipment for Ophthalmology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-1014",
    "stock": {
      "current": 63,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01014",
    "name": "Arm Board Set Ophthalmology",
    "description": "Positioning equipment for Ophthalmology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-1015",
    "stock": {
      "current": 93,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01015",
    "name": "Gel Positioning Pads Ophthalmology",
    "description": "Positioning equipment for Ophthalmology procedures",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "POS-1016",
    "stock": {
      "current": 61,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01016",
    "name": "Basic Instrument Tray Ophthalmology 1",
    "description": "Standard instrument set for Ophthalmology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-1017",
    "stock": {
      "current": 3,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01017",
    "name": "Basic Instrument Tray Ophthalmology 2",
    "description": "Standard instrument set for Ophthalmology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-1018",
    "stock": {
      "current": 2,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01018",
    "name": "Basic Instrument Tray Ophthalmology 3",
    "description": "Standard instrument set for Ophthalmology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-1019",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01019",
    "name": "Basic Instrument Tray Ophthalmology 4",
    "description": "Standard instrument set for Ophthalmology procedures",
    "category": "Instrument Trays",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "INST-1020",
    "stock": {
      "current": 8,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01020",
    "name": "Specialist Instrument Tray Ophthalmology 1",
    "description": "Specialized instrument set for Ophthalmology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-1021",
    "stock": {
      "current": 6,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01021",
    "name": "Specialist Instrument Tray Ophthalmology 2",
    "description": "Specialized instrument set for Ophthalmology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-1022",
    "stock": {
      "current": 7,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01022",
    "name": "Specialist Instrument Tray Ophthalmology 3",
    "description": "Specialized instrument set for Ophthalmology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-1023",
    "stock": {
      "current": 4,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01023",
    "name": "Specialist Instrument Tray Ophthalmology 4",
    "description": "Specialized instrument set for Ophthalmology procedures",
    "category": "Instrument Trays",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "INST-1024",
    "stock": {
      "current": 9,
      "minimum": 2,
      "maximum": 10,
      "reorderPoint": 2
    },
    "frequency": "As Needed",
    "contacts": {
      "rep": {
        "name": "John Smith",
        "phone": "07700 900123",
        "email": "john.smith@stryker.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01024",
    "name": "Vicryl 1 Suture Ophthalmology",
    "description": "Standard consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-1025",
    "sku": "SKU-1025",
    "stock": {
      "current": 353,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 35,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01025",
    "name": "Vicryl 2-0 Suture Ophthalmology",
    "description": "Standard consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-1026",
    "sku": "SKU-1026",
    "stock": {
      "current": 298,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 34,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01026",
    "name": "PDS 1 Suture Ophthalmology",
    "description": "Standard consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-1027",
    "sku": "SKU-1027",
    "stock": {
      "current": 335,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 32,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01027",
    "name": "Nylon 2-0 Suture Ophthalmology",
    "description": "Standard consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-1028",
    "sku": "SKU-1028",
    "stock": {
      "current": 361,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 40,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01028",
    "name": "Surgical Gloves 7 Ophthalmology",
    "description": "Standard consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-1029",
    "sku": "SKU-1029",
    "stock": {
      "current": 78,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 34,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01029",
    "name": "Surgical Gloves 7.5 Ophthalmology",
    "description": "Standard consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-1030",
    "sku": "SKU-1030",
    "stock": {
      "current": 79,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01030",
    "name": "Surgical Gloves 8 Ophthalmology",
    "description": "Standard consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-1031",
    "sku": "SKU-1031",
    "stock": {
      "current": 358,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 15,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01031",
    "name": "Gauze Swabs x100 Ophthalmology",
    "description": "Standard consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Ethicon (J&J)",
    "productReference": "CONS-1032",
    "sku": "SKU-1032",
    "stock": {
      "current": 318,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 13,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01032",
    "name": "Specialized Wire Ophthalmology",
    "description": "Specialty-specific consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-1033",
    "sku": "SKU-1033",
    "stock": {
      "current": 332,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 23,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01033",
    "name": "Specialized Pin Ophthalmology",
    "description": "Specialty-specific consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-1034",
    "sku": "SKU-1034",
    "stock": {
      "current": 338,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 25,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01034",
    "name": "Specialized Screw Ophthalmology",
    "description": "Specialty-specific consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-1035",
    "sku": "SKU-1035",
    "stock": {
      "current": 112,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 33,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01035",
    "name": "Specialized Clip Ophthalmology",
    "description": "Specialty-specific consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-1036",
    "sku": "SKU-1036",
    "stock": {
      "current": 162,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 28,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01036",
    "name": "Specialized Drain Ophthalmology",
    "description": "Specialty-specific consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-1037",
    "sku": "SKU-1037",
    "stock": {
      "current": 229,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 10,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01037",
    "name": "Specialized Catheter Ophthalmology",
    "description": "Specialty-specific consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-1038",
    "sku": "SKU-1038",
    "stock": {
      "current": 191,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 33,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01038",
    "name": "Specialized Guide Ophthalmology",
    "description": "Specialty-specific consumable for Ophthalmology",
    "category": "Consumables",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "CONS-1039",
    "sku": "SKU-1039",
    "stock": {
      "current": 374,
      "minimum": 50,
      "maximum": 400,
      "reorderPoint": 60
    },
    "frequency": "Weekly",
    "lastOrdered": "2025-01-18",
    "lastReceived": "2025-01-21",
    "contacts": {
      "rep": {
        "name": "Michael Chen",
        "phone": "07700 900789",
        "email": "mchen@its.jnj.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 12,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01039",
    "name": "Implant Ophthalmology Type A Size 1",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-1040",
    "sku": "SKU-1040",
    "udiCode": "00801741001040",
    "stock": {
      "current": 27,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 877,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01040",
    "name": "Implant Ophthalmology Type B Size 2",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-1041",
    "sku": "SKU-1041",
    "udiCode": "00801741001041",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 461,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01041",
    "name": "Implant Ophthalmology Type C Size 3",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-1042",
    "sku": "SKU-1042",
    "udiCode": "00801741001042",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 719,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01042",
    "name": "Implant Ophthalmology Type D Size 4",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-1043",
    "sku": "SKU-1043",
    "udiCode": "00801741001043",
    "stock": {
      "current": 18,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 720,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01043",
    "name": "Implant Ophthalmology Type E Size 5",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-1044",
    "sku": "SKU-1044",
    "udiCode": "00801741001044",
    "stock": {
      "current": 13,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 410,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01044",
    "name": "Implant Ophthalmology Type F Size 1",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-1045",
    "sku": "SKU-1045",
    "udiCode": "00801741001045",
    "stock": {
      "current": 15,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1306,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01045",
    "name": "Implant Ophthalmology Type G Size 2",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-1046",
    "sku": "SKU-1046",
    "udiCode": "00801741001046",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1905,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01046",
    "name": "Implant Ophthalmology Type H Size 3",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-1047",
    "sku": "SKU-1047",
    "udiCode": "00801741001047",
    "stock": {
      "current": 8,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1279,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01047",
    "name": "Implant Ophthalmology Type I Size 4",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-1048",
    "sku": "SKU-1048",
    "udiCode": "00801741001048",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1287,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01048",
    "name": "Implant Ophthalmology Type J Size 5",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-1049",
    "sku": "SKU-1049",
    "udiCode": "00801741001049",
    "stock": {
      "current": 25,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1573,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01049",
    "name": "Implant Ophthalmology Type A Size 1",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-1050",
    "sku": "SKU-1050",
    "udiCode": "00801741001050",
    "stock": {
      "current": 28,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2470,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01050",
    "name": "Implant Ophthalmology Type B Size 2",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-1051",
    "sku": "SKU-1051",
    "udiCode": "00801741001051",
    "stock": {
      "current": 9,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2455,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01051",
    "name": "Implant Ophthalmology Type C Size 3",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-1052",
    "sku": "SKU-1052",
    "udiCode": "00801741001052",
    "stock": {
      "current": 30,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2324,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01052",
    "name": "Implant Ophthalmology Type D Size 4",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-1053",
    "sku": "SKU-1053",
    "udiCode": "00801741001053",
    "stock": {
      "current": 8,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 730,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01053",
    "name": "Implant Ophthalmology Type E Size 5",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-1054",
    "sku": "SKU-1054",
    "udiCode": "00801741001054",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 848,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01054",
    "name": "Implant Ophthalmology Type F Size 1",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-1055",
    "sku": "SKU-1055",
    "udiCode": "00801741001055",
    "stock": {
      "current": 6,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 2009,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01055",
    "name": "Implant Ophthalmology Type G Size 2",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-1056",
    "sku": "SKU-1056",
    "udiCode": "00801741001056",
    "stock": {
      "current": 16,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1726,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01056",
    "name": "Implant Ophthalmology Type H Size 3",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Zimmer Biomet",
    "productReference": "IMP-1057",
    "sku": "SKU-1057",
    "udiCode": "00801741001057",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 537,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01057",
    "name": "Implant Ophthalmology Type I Size 4",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Stryker",
    "productReference": "IMP-1058",
    "sku": "SKU-1058",
    "udiCode": "00801741001058",
    "stock": {
      "current": 26,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1853,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01058",
    "name": "Implant Ophthalmology Type J Size 5",
    "description": "Specialized implant for Ophthalmology procedures",
    "category": "Implants",
    "classification": "Specific",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "Synthes (DePuy Synthes)",
    "productReference": "IMP-1059",
    "sku": "SKU-1059",
    "udiCode": "00801741001059",
    "stock": {
      "current": 21,
      "minimum": 5,
      "maximum": 30,
      "reorderPoint": 6
    },
    "frequency": "Quarterly",
    "lastOrdered": "2024-12-01",
    "lastReceived": "2024-12-08",
    "contacts": {
      "rep": {
        "name": "Sales Rep",
        "phone": "07700 900000",
        "email": "rep@supplier.com"
      },
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 1886,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01059",
    "name": "Forceps Ophthalmology 1",
    "description": "Surgical forceps for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1060",
    "stock": {
      "current": 72,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01060",
    "name": "Retractor Ophthalmology 1",
    "description": "Surgical retractor for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1061",
    "stock": {
      "current": 27,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01061",
    "name": "Clamp Ophthalmology 1",
    "description": "Surgical clamp for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1062",
    "stock": {
      "current": 64,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01062",
    "name": "Scissors Ophthalmology 1",
    "description": "Surgical scissors for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1063",
    "stock": {
      "current": 99,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01063",
    "name": "Holder Ophthalmology 1",
    "description": "Surgical holder for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1064",
    "stock": {
      "current": 84,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01064",
    "name": "Dissector Ophthalmology 1",
    "description": "Surgical dissector for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1065",
    "stock": {
      "current": 98,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01065",
    "name": "Probe Ophthalmology 1",
    "description": "Surgical probe for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1066",
    "stock": {
      "current": 71,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01066",
    "name": "Hook Ophthalmology 1",
    "description": "Surgical hook for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1067",
    "stock": {
      "current": 98,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01067",
    "name": "Elevator Ophthalmology 1",
    "description": "Surgical elevator for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1068",
    "stock": {
      "current": 53,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01068",
    "name": "Curette Ophthalmology 1",
    "description": "Surgical curette for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1069",
    "stock": {
      "current": 54,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01069",
    "name": "Forceps Ophthalmology 2",
    "description": "Surgical forceps for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1070",
    "stock": {
      "current": 80,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01070",
    "name": "Retractor Ophthalmology 2",
    "description": "Surgical retractor for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1071",
    "stock": {
      "current": 90,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01071",
    "name": "Clamp Ophthalmology 2",
    "description": "Surgical clamp for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1072",
    "stock": {
      "current": 93,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01072",
    "name": "Scissors Ophthalmology 2",
    "description": "Surgical scissors for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1073",
    "stock": {
      "current": 86,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01073",
    "name": "Holder Ophthalmology 2",
    "description": "Surgical holder for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1074",
    "stock": {
      "current": 67,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01074",
    "name": "Dissector Ophthalmology 2",
    "description": "Surgical dissector for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1075",
    "stock": {
      "current": 92,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01075",
    "name": "Probe Ophthalmology 2",
    "description": "Surgical probe for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1076",
    "stock": {
      "current": 34,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01076",
    "name": "Hook Ophthalmology 2",
    "description": "Surgical hook for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1077",
    "stock": {
      "current": 99,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01077",
    "name": "Elevator Ophthalmology 2",
    "description": "Surgical elevator for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1078",
    "stock": {
      "current": 53,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  },
  {
    "id": "INV-01078",
    "name": "Curette Ophthalmology 2",
    "description": "Surgical curette for Ophthalmology",
    "category": "Single Instruments",
    "classification": "Basic",
    "specialty": [
      "Ophthalmology"
    ],
    "supplier": "NHS Trust",
    "productReference": "SI-1079",
    "stock": {
      "current": 70,
      "minimum": 20,
      "maximum": 100,
      "reorderPoint": 24
    },
    "frequency": "Monthly",
    "contacts": {
      "procurement": {
        "name": "Sarah Jones",
        "department": "Procurement",
        "phone": "020 7123 4567",
        "email": "sarah.jones@nhs.uk"
      }
    },
    "cost": 0,
    "currency": "GBP",
    "procedures": [
      "*"
    ]
  }
];

export function getItemsByCategory(category: InventoryCategory): InventoryItem[] {
  return INVENTORY_ITEMS.filter(item => item.category === category);
}

export function getItemsByClassification(classification: Classification): InventoryItem[] {
  return INVENTORY_ITEMS.filter(item => item.classification === classification);
}

export function getItemsBySpecialty(specialty: string): InventoryItem[] {
  if (specialty === "All Specialties") return INVENTORY_ITEMS;
  return INVENTORY_ITEMS.filter(item =>
    item.specialty.includes(specialty) || item.specialty.includes("All Specialties")
  );
}

export function searchItems(query: string): InventoryItem[] {
  const lowerQuery = query.toLowerCase();
  return INVENTORY_ITEMS.filter(item =>
    item.name.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.supplier.toLowerCase().includes(lowerQuery) ||
    item.productReference.toLowerCase().includes(lowerQuery)
  );
}

export function getLowStockItems(): InventoryItem[] {
  return INVENTORY_ITEMS.filter(item =>
    item.stock.current <= item.stock.reorderPoint
  );
}

export function formatCurrency(amount: number, currency: string = "GBP"): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
