# Royal London Hospital Procedures Database

This folder contains the procedures seed data for the Theatre Operations Manager.

## Files

- **royal-london-procedures.json** - Main procedures database for Royal London Hospital

## How to Use

### 1. Editing the Procedures File

The `royal-london-procedures.json` file contains all surgical procedures with OPCS-4 codes. You can edit this file directly to:
- Add new procedures
- Modify existing procedures
- Update OPCS-4 codes
- Add common variations

### 2. Procedure Format

Each procedure follows this structure:

```json
{
  "name": "Procedure Name",
  "specialtyName": "Specialty Name",
  "subspecialtyName": "Subspecialty Name (optional)",
  "opcs4": ["CODE1", "CODE2"],
  "commonVariations": ["Abbreviation", "Alternative Name"]
}
```

### 3. Specialty Structure

The file includes 14 specialties:
- Emergency (30 procedures)
- Endoscopy (60 procedures - 2 subspecialties)
- ENT (60 procedures - 2 subspecialties)
- General Surgery (120 procedures - 4 subspecialties)
- Gynaecology (60 procedures - 2 subspecialties)
- Neurology (30 procedures - 1 subspecialty)
- Obstetrics (30 procedures)
- Ophthalmology (30 procedures)
- Oral and Maxillofacial (120 procedures - 4 subspecialties)
- Orthopaedics (90 procedures - 3 subspecialties)
- Plastics (60 procedures - 2 subspecialties)
- Renal (30 procedures - 1 subspecialty)
- Urology (60 procedures - 2 subspecialties)
- Vascular (30 procedures)

**Total:** 810 procedures (30 per subspecialty/specialty)

### 4. Seeding to Firebase

Once you've completed the procedures:

1. Navigate to `/admin/seed-procedures` in your browser
2. Click the "Seed Procedures" button
3. The system will load procedures from this JSON file and upload to Firebase

### 5. Current Status

- ✅ JSON structure created with template
- ✅ Specialty breakdown documented
- ✅ API configured to load from JSON
- ⏳ **Needs completion:** 3/810 procedures added (example procedures only)

### 6. Completing the Database

To complete all 810 procedures:

1. Open `royal-london-procedures.json`
2. Follow the template provided in the file
3. Add 30 procedures for each specialty/subspecialty
4. Ensure accurate OPCS-4 codes for each procedure
5. Test by seeding through the admin interface

### 7. OPCS-4 Code Resources

- [NHS Digital OPCS-4 Classification](https://www.datadictionary.nhs.uk/)
- [ISD Scotland OPCS-4](https://www.isdscotland.org/Products-and-Services/Terminology-Services/)
- Internal hospital coding department

### 8. Version Control

This file is tracked in Git, so you can:
- Commit changes as you add procedures
- Review history of procedure additions
- Collaborate with team members
- Revert if needed

## Example Additions

Here's how to add a procedure:

```json
{
  "name": "Laparoscopic Cholecystectomy",
  "specialtyName": "General Surgery",
  "subspecialtyName": "Upper Gastrointestinal",
  "opcs4": ["J181"],
  "commonVariations": ["Lap Chole", "Keyhole Gallbladder Removal"]
}
```

## Notes

- Ensure all specialty names match exactly what's in your hospital configuration
- Subspecialty names must match the configuration exactly
- OPCS-4 codes should be current and accurate
- Common variations help with search and recognition
