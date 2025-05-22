export const dentalSymptoms = [
  'Toothache / Dental pain',
  'Swollen or bleeding gums', 
  'Tooth sensitivity (to hot, cold, sweet, or acidic foods)',
  'Bad breath (halitosis)',
  'Dry mouth (xerostomia)',
  'Jaw pain or clicking (possible TMJ disorder)',
  'Loose teeth',
  'Mouth sores or ulcers',
  'Swelling in the face or jaw',
  'Cracked, chipped, or broken teeth',
  'Discolored teeth',
  'Gum recession',
  'Abscess (pus-filled swelling)',
  'Difficulty chewing or biting',
  'Pain after dental procedures'
];

export const dentalMedications = {
  'Antibiotics': [
    'Amoxicillin',
    'Clindamycin (often used if allergic to penicillin)',
    'Metronidazole',
    'Erythromycin',
    'Azithromycin'
  ],
  'Analgesics / Pain Relievers': [
    'Ibuprofen (Advil, Motrin)',
    'Acetaminophen (Tylenol)',
    'Aspirin',
    'Naproxen',
    'Hydrocodone/Acetaminophen (e.g., Vicodin)'
  ],
  'Local Anesthetics': [
    'Lidocaine',
    'Articaine',
    'Mepivacaine',
    'Bupivacaine'
  ],
  'Other': [
    'Chlorhexidine mouthwash (for gingivitis or after surgery)',
    'Topical fluoride (for cavity prevention)',
    'Steroids (e.g., Dexamethasone)'
  ]
};

export const dentalAllergies = [
  'Penicillin (and related antibiotics like amoxicillin)',
  'Latex (gloves, dental dams, etc.)',
  'Local anesthetics (e.g., Lidocaine)',
  'Aspirin or NSAIDs',
  'Metals (e.g., nickel in dental crowns or braces)',
  'Acrylic / Resin materials (used in dentures or fillings)',
  'Eugenol (ingredient in some dental pastes and fillings)'
];

// Flatten medications for datalist
export const flattenedMedications = Object.values(dentalMedications).flat();