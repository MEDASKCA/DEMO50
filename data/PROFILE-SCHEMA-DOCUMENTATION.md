# Theatre Operations Manager - Profile Schema Documentation

This document explains every field in the profile JSON template and provides guidance for creating new user accounts.

## Quick Start
1. Copy `profile-template.json`
2. Fill in the fields according to this documentation
3. Save with a unique filename (e.g., `profile-john-smith.json`)
4. Import into Firebase or use for testing

---

## Core Identity

### `id` (string, required)
**Format:** `TOM-NHS-YYYY-NNNN`
- `TOM` = Theatre Operations Manager
- `NHS` = Organization identifier
- `YYYY` = Year
- `NNNN` = Unique 4-digit number

**Example:** `"TOM-NHS-2024-4782"`

### `firstName` (string, required)
User's legal first name.

**Example:** `"Alexander"`

### `lastName` (string, required)
User's legal last name/surname.

**Example:** `"Monterubio"`

### `postNominals` (array of strings, optional)
Professional post-nominal letters/designations displayed after name.

**Common Examples:**
- `"RN"` - Registered Nurse
- `"EMBA"` - Executive MBA
- `"CMgr"` - Chartered Manager
- `"LSSBB"` - Lean Six Sigma Black Belt
- `"MIOEE"` - Member of Institution of Occupational Safety

**Example:** `["EMBA", "CMgr", "MIOEE", "LSSBB", "RN"]`

### `professionalQualification` (string, required)
Primary professional qualification/registration.

**Examples:**
- `"Registered Nurse (RN)"`
- `"Operating Department Practitioner (ODP)"`
- `"Theatre Manager"`
- `"Clinical Nurse Specialist"`

### `roles` (array of strings, required)
Current job roles/titles.

**Example:** `["Senior Scrub Team Leader", "Lead Nurse"]`

### `band` (string, required)
NHS Agenda for Change pay band.

**Valid Values:** `"Band 5"`, `"Band 6"`, `"Band 7"`, `"Band 8a"`, `"Band 8b"`, `"Band 8c"`, `"Band 8d"`, `"Band 9"`

**Example:** `"Band 7"`

### `rating` (number, required)
User rating out of 5.

**Range:** 0.0 to 5.0

**Example:** `4.9`

### `totalShifts` (number, required)
Total number of shifts booked through the platform.

**Example:** `127`

### `completedShifts` (number, required)
Number of shifts successfully completed.

**Example:** `124`

---

## Contact Details

### `contactDetails` (object, required)

#### `email` (string, required)
Work or professional email address.

**Format:** Standard email format

**Example:** `"alexander.monterubio@nhs.net"`

#### `phone` (string, required)
Contact phone number.

**Format:** International format with country code

**Example:** `"+44 7700 900456"`

#### `preferredContact` (string, required)
Preferred method of contact.

**Valid Values:** `"email"`, `"phone"`, `"either"`

**Example:** `"email"`

---

## Location & Availability

### `location` (object, required)

#### `currentTrust` (string, required)
Current NHS Trust employing the user.

**Example:** `"Barts Health NHS Trust"`

#### `currentHospital` (string, required)
Specific hospital within the trust.

**Example:** `"Royal London Hospital"`

#### `postcode` (string, required)
UK postcode for the user's work location.

**Format:** UK postcode format (e.g., "SW1A 1AA")

**Example:** `"E1 1BB"`

#### `area` (string, required)
Geographic area description.

**Example:** `"East London"`

#### `willingToTravel` (number, required)
Maximum distance willing to travel for shifts (in miles).

**Example:** `15`

---

## Experience & Stats

### `yearsExperience` (number, required)
Total years of professional experience in healthcare/theatre operations.

**Example:** `18`

### `connections` (number, optional)
Size of professional network/connections.

**Example:** `3000`

### `competencyStats` (object, required)
Summary counts of competencies by category.

#### `mandatory` (number)
Number of mandatory training courses completed.

**Example:** `10`

#### `clinical` (number)
Number of clinical competencies/procedures mastered.

**Example:** `42`

#### `technical` (number)
Number of technical/equipment competencies.

**Example:** `28`

#### `professional` (number)
Number of professional/management competencies.

**Example:** `15`

---

## Specialty Tree

### `specialtyTree` (array, required)
Hierarchical structure of theatre areas and operational capabilities.

**Structure:**
```json
[
  {
    "name": "Theatre Area Name",
    "subcategories": [
      {
        "name": "Sub-area Name",
        "procedures": ["Procedure 1", "Procedure 2"]
      }
    ]
  }
]
```

**Theatre Area Examples:**
- Orthopaedics Theatre
- General Surgery Theatre
- Cardiac Theatre
- Neurosurgery Theatre
- Day Surgery Unit
- Vascular Theatre
- Plastics & Maxillofacial
- Gynaecology Theatre

**Sub-area Examples:**
- Trauma Theatre
- Elective Theatre
- Emergency Theatre
- Hybrid Theatre

**Procedure Examples (Operational):**
- "Emergency Fracture Cases"
- "Joint Replacement Lists"
- "24/7 Emergency Coverage"
- "Equipment Management"
- "Staff Deployment"
- "CABG Programme Management"

---

## Surgical Competencies

### `surgicalCompetencies` (array, required)
Specific clinical procedures with OPCS-4 codes and proficiency levels.

**Structure:**
```json
[
  {
    "specialty": "Specialty Name",
    "subcategories": [
      {
        "name": "Category Name",
        "procedures": [
          {
            "name": "Procedure Name",
            "opcs4": ["W241", "W242"],
            "level": "expert",
            "yearsExperience": 5,
            "frequency": "weekly",
            "lastPerformed": "Jan 2025"
          }
        ]
      }
    ]
  }
]
```

#### Level Values
- `"novice"` - Less than 1 year, requires supervision
- `"competent"` - 1-2 years, basic proficiency
- `"advanced"` - 3-5 years, independent practice
- `"expert"` - 5+ years, can teach others

#### Frequency Values
- `"daily"` - Performs daily
- `"weekly"` - Several times per week
- `"fortnightly"` - Every 2 weeks
- `"monthly"` - Once per month
- `"quarterly"` - Every 3 months
- `"rarely"` - Less than quarterly

#### Last Performed Format
`"MMM YYYY"` (e.g., "Jan 2025", "Dec 2024")

**Specialty Examples:**
- Orthopaedics & Trauma
- General Surgery
- Cardiac Surgery
- Neurosurgery
- Vascular Surgery
- Gynaecology

---

## Competency Tree

### `competencyTree` (array, required)
Theatre operations management skills and certifications.

**Structure:**
```json
[
  {
    "name": "Category Name",
    "icon": "shield",
    "subcategories": [
      {
        "name": "Subcategory Name",
        "items": [
          {
            "name": "Competency Name",
            "level": "expert",
            "expiry": "2026-03-15",
            "provider": "Provider Name",
            "description": "Description"
          }
        ]
      }
    ]
  }
]
```

#### Icon Values
- `"shield"` - Safety/compliance
- `"briefcase"` - Management/operations
- `"award"` - Achievement/certification
- `"users"` - People management

#### Main Categories
1. **Mandatory Training** - Statutory requirements
2. **Theatre Operations Management** - List management, staff management, resources
3. **Quality & Safety** - Clinical governance, patient safety, regulatory compliance
4. **Leadership & Strategic** - Strategic planning, change management, business

---

## Employment History

### `employmentHistory` (array, required)
Complete work history with most recent first.

**Structure:**
```json
[
  {
    "employer": "Trust/Organization Name",
    "hospital": "Hospital Name",
    "department": "Department",
    "position": "Job Title",
    "band": "Band 7",
    "type": "Permanent",
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "specialties": ["Specialty 1", "Specialty 2"],
    "responsibilities": ["Responsibility 1", "Responsibility 2"],
    "verifiedBy": "Verifier Name",
    "verifiedByRole": "Verifier Role",
    "verifiedDate": "YYYY-MM-DD",
    "verified": true
  }
]
```

#### Type Values
- `"Permanent"` - Permanent employment
- `"Locum"` - Locum/temporary
- `"Bank"` - NHS Bank
- `"Fixed-term"` - Fixed-term contract

#### Date Format
- **Active role:** `"endDate": null`
- **Past role:** `"endDate": "YYYY-MM-DD"`

---

## Education & Qualifications

### `education` (array, required)
Academic qualifications.

**Structure:**
```json
[
  {
    "institution": "University Name",
    "degree": "Degree Title",
    "field": "Field of Study",
    "grade": "Grade/Classification",
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "description": "Program description",
    "verified": false,
    "verificationLink": "URL",
    "certificateNumber": "CERT123"
  }
]
```

#### Degree Examples
- Bachelor of Science in Nursing
- Executive Master of Business Administration (EMBA)
- MSc Healthcare Management
- Postgraduate Diploma

#### Grade Examples
- First Class Honours
- Upper Second Class (2:1)
- Pass
- Merit
- Distinction

---

## Certifications & Licenses

### `certifications` (array, required)
Professional registrations, certifications, and licenses.

**Structure:**
```json
[
  {
    "name": "Certification Name",
    "issuer": "Issuing Organization",
    "number": "Registration Number",
    "issueDate": "YYYY-MM-DD",
    "expiryDate": "YYYY-MM-DD",
    "status": "Active"
  }
]
```

#### Status Values
- `"Active"` - Currently valid
- `"Current"` - Up to date
- `"Expired"` - Needs renewal
- `"Suspended"` - Temporarily suspended

#### Common Examples
- NMC Registration
- HCPC Registration
- ILS/BLS Certification
- Chartered Manager (CMgr)
- Lean Six Sigma certification

#### Expiry Date
- **Never expires:** `"expiryDate": null`
- **Has expiry:** `"expiryDate": "YYYY-MM-DD"`

---

## Professional Memberships

### `memberships` (array, optional)
Professional organization memberships.

**Structure:**
```json
[
  {
    "organization": "Organization Name",
    "role": "Member/Fellow/Chartered",
    "startDate": "YYYY-MM-DD",
    "current": true,
    "description": "Membership description"
  }
]
```

**Examples:**
- Association for Perioperative Practice (AfPP)
- Chartered Management Institute (CMI)
- NHS Confederation
- Royal College of Nursing (RCN)

---

## Recommendations

### `recommendations` (array, optional)
Professional recommendations from colleagues/managers.

**Structure:**
```json
[
  {
    "author": "Full Name",
    "authorRole": "Job Title",
    "authorOrganization": "Organization",
    "relationship": "Working relationship",
    "date": "YYYY-MM-DD",
    "text": "Recommendation text (2-4 paragraphs)"
  }
]
```

#### Relationship Examples
- Senior Clinical Manager
- Direct Report
- Clinical Colleague
- Senior Executive

---

## Awards & Honors

### `awards` (array, optional)
Professional awards and recognition.

**Structure:**
```json
[
  {
    "title": "Award Title",
    "issuer": "Awarding Organization",
    "date": "YYYY-MM-DD",
    "description": "Award description"
  }
]
```

**Examples:**
- NHS Operational Manager of the Year
- Trust Excellence Award
- Quality Improvement Project Award
- Leadership Excellence Award

---

## Volunteer Experience

### `volunteerWork` (array, optional)
Voluntary work and community service.

**Structure:**
```json
[
  {
    "organization": "Organization Name",
    "role": "Volunteer Role",
    "location": "Location",
    "startDate": "YYYY-MM-DD",
    "endDate": null,
    "description": "Description",
    "activities": ["Activity 1", "Activity 2"]
  }
]
```

---

## Publications

### `publications` (array, optional)
Academic publications, articles, book chapters.

**Structure:**
```json
[
  {
    "title": "Publication Title",
    "type": "Journal Article",
    "publisher": "Publisher Name",
    "date": "YYYY-MM-DD",
    "description": "Brief description",
    "coAuthors": ["Author 1", "Author 2"]
  }
]
```

#### Type Values
- Journal Article
- Book Chapter
- Conference Paper
- White Paper
- Case Study

---

## Languages

### `languages` (array, optional)
Language proficiencies.

**Structure:**
```json
[
  {
    "language": "Language Name",
    "proficiency": "Proficiency Level"
  }
]
```

#### Proficiency Levels
- Native
- Fluent
- Advanced
- Intermediate
- Conversational
- Basic

---

## Interests & Activities

### `interests` (array, optional)
Professional and personal interests.

**Structure:**
```json
[
  {
    "category": "Category Name",
    "items": ["Interest 1", "Interest 2"]
  }
]
```

**Category Examples:**
- Professional Development
- Theatre Management
- Personal
- Community

---

## Compliance

### `compliance` (object, required)
Regulatory compliance and mandatory requirements.

#### DBS (Disclosure and Barring Service)
```json
"dbs": {
  "status": "valid",
  "expiryDate": "YYYY-MM-DD",
  "updateService": true,
  "certificateNumber": "DBS001234567890"
}
```

**Status Values:** `"valid"`, `"expired"`, `"pending"`

#### HCPC/NMC Registration
```json
"hcpc": {
  "status": "active",
  "number": "Registration Number",
  "expiryDate": "YYYY-MM-DD",
  "revalidationDue": "YYYY-MM-DD"
}
```

#### Occupational Health
```json
"occupationalHealth": {
  "status": "fit",
  "lastAssessment": "YYYY-MM-DD",
  "nextDue": "YYYY-MM-DD",
  "restrictions": []
}
```

**Status Values:** `"fit"`, `"fit with restrictions"`, `"review required"`

#### Mandatory Training
```json
"mandatoryTraining": [
  {
    "name": "Course Name",
    "status": "valid",
    "expiry": "YYYY-MM-DD"
  }
]
```

**Status Values:** `"valid"`, `"expiring"`, `"expired"`

**Standard Courses:**
- Basic Life Support
- Immediate Life Support
- Safeguarding Adults L3
- Fire Safety
- Health & Safety
- Infection Prevention & Control
- Manual Handling

#### Immunisations
```json
"immunisations": [
  {
    "name": "Vaccine Name",
    "status": "current",
    "lastDose": "YYYY-MM-DD",
    "boosterDue": "YYYY-MM-DD"
  }
]
```

**Standard Vaccines:**
- Hepatitis B
- MMR
- Varicella (Chickenpox)
- Tuberculosis (BCG)
- Tetanus/Diphtheria/Polio
- COVID-19
- Influenza

#### Indemnity Insurance
```json
"indemnityInsurance": {
  "provider": "Provider Name",
  "policyNumber": "Policy Number",
  "coverage": "£10,000,000",
  "expiryDate": "YYYY-MM-DD"
}
```

---

## Preferences

### `preferences` (object, required)
User work preferences.

```json
"preferences": {
  "shifts": [],
  "travel": {
    "max": 15,
    "unit": "miles"
  },
  "minRate": 35,
  "maxHoursPerWeek": 48
}
```

---

## Track Record

### `trackRecord` (object, required)
Performance metrics.

```json
"trackRecord": {
  "reliability": 100,
  "endorsements": 47,
  "shiftsCancelled": 0,
  "shiftsCompleted": 124
}
```

#### Reliability
Percentage (0-100) based on completed vs cancelled shifts.

---

## Willing to Work At

### `willingToWorkAt` (array, optional)
List of hospitals/sites willing to work at.

**Example:**
```json
[
  "Royal London Hospital",
  "St Bartholomew's Hospital",
  "Whipps Cross University Hospital",
  "Newham University Hospital"
]
```

---

## Date Formats

All dates use **ISO 8601 format**: `YYYY-MM-DD`

**Examples:**
- `"2025-01-15"` - 15th January 2025
- `"2024-12-31"` - 31st December 2024

**Current/No end date:** Use `null`
- `"endDate": null` for current employment
- `"expiryDate": null` for certifications that don't expire

---

## Validation Rules

### Required Fields
- id, firstName, lastName
- professionalQualification, roles, band
- contactDetails (all subfields)
- location (all subfields)
- yearsExperience
- competencyStats

### Optional But Recommended
- surgicalCompetencies (if clinical role)
- employmentHistory (at least 1 entry)
- education (at least 1 entry)
- certifications (professional registrations)
- compliance (all sections for clinical roles)

### Field Constraints
- **rating:** 0.0 - 5.0
- **band:** Must be valid NHS band
- **email:** Valid email format
- **phone:** International format with +
- **postcode:** Valid UK postcode
- **dates:** ISO 8601 format (YYYY-MM-DD)

---

## Example Workflow

1. **Copy template:** `profile-template.json`
2. **Fill core identity:** Name, ID, qualification, band
3. **Add contact details:** Email, phone
4. **Set location:** Trust, hospital, postcode
5. **Add employment history:** Most recent first
6. **Add education:** Degrees and qualifications
7. **Add certifications:** NMC, HCPC, professional certs
8. **Add competencies:** Surgical procedures and management skills
9. **Fill compliance:** DBS, training, immunisations
10. **Optional sections:** Awards, recommendations, publications
11. **Validate:** Check all required fields complete
12. **Test:** Load into application

---

## Import to Firebase

Once completed, profiles can be imported to Firebase Firestore:

1. Save as `profile-[name].json`
2. Use Firebase Console → Firestore → Import
3. Collection: `staff`
4. Document ID: Use the `id` field value

Or use the Firebase Admin SDK to programmatically import.

---

## Support

For questions or issues with the profile schema:
- Check this documentation
- Review `profile-template.json` for structure
- See `MobileProfile.tsx` for how fields are displayed
- Contact: Theatre Operations Manager technical team
