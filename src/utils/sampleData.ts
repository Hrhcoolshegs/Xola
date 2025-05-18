export const patients = [
  {
    id: 'P001',
    name: 'Emma Thompson',
    dob: '1985-06-15',
    email: 'emma.thompson@example.com',
    phone: '(416) 555-1234',
    insurance: 'Sun Life Financial',
    insuranceId: 'SL789456123',
    province: 'Ontario',
    lastVisit: '2023-03-10',
    nextVisit: '2023-09-15',
    status: 'active',
    medicalHistory: {
      allergies: ['Penicillin', 'Latex'],
      conditions: ['Hypertension'],
      medications: ['Lisinopril 10mg daily']
    },
    dentalHistory: {
      previousProcedures: ['Root Canal (Tooth #18)', 'Filling (Tooth #5)'],
      concerns: 'Occasional sensitivity to cold'
    }
  },
  {
    id: 'P002',
    name: 'Daniel Williams',
    dob: '1978-11-23',
    email: 'daniel.williams@example.com',
    phone: '(604) 555-9876',
    insurance: 'Great-West Life',
    insuranceId: 'GW456123789',
    province: 'British Columbia',
    lastVisit: '2023-05-22',
    nextVisit: '2023-11-22',
    status: 'active',
    medicalHistory: {
      allergies: ['None'],
      conditions: ['Type 2 Diabetes', 'Sleep Apnea'],
      medications: ['Metformin 1000mg twice daily', 'Vitamin D supplement']
    },
    dentalHistory: {
      previousProcedures: ['Implant (Tooth #30)', 'Crown (Tooth #19)'],
      concerns: 'Grinding teeth at night'
    }
  },
  {
    id: 'P003',
    name: 'Sophie Martin',
    dob: '1990-03-08',
    email: 'sophie.martin@example.com',
    phone: '(514) 555-4567',
    insurance: 'Manulife',
    insuranceId: 'ML321654987',
    province: 'Quebec',
    lastVisit: '2023-06-14',
    nextVisit: '2023-12-14',
    status: 'active',
    medicalHistory: {
      allergies: ['Sulfa Drugs'],
      conditions: ['Asthma'],
      medications: ['Albuterol inhaler as needed']
    },
    dentalHistory: {
      previousProcedures: ['Wisdom Teeth Extraction', 'Braces (removed 2015)'],
      concerns: 'Interested in teeth whitening'
    }
  },
  {
    id: 'P004',
    name: 'Jason Lee',
    dob: '1982-09-17',
    email: 'jason.lee@example.com',
    phone: '(905) 555-7890',
    insurance: 'Canada Life',
    insuranceId: 'CL654987321',
    province: 'Ontario',
    lastVisit: '2022-11-30',
    nextVisit: null,
    status: 'inactive',
    medicalHistory: {
      allergies: ['Codeine'],
      conditions: ['None'],
      medications: ['None']
    },
    dentalHistory: {
      previousProcedures: ['Fillings (multiple)'],
      concerns: 'Discoloration on front teeth'
    }
  },
  {
    id: 'P005',
    name: 'Olivia Singh',
    dob: '1995-12-03',
    email: 'olivia.singh@example.com',
    phone: '(780) 555-2345',
    insurance: 'Blue Cross',
    insuranceId: 'BC987321654',
    province: 'Alberta',
    lastVisit: '2023-07-05',
    nextVisit: '2024-01-05',
    status: 'active',
    medicalHistory: {
      allergies: ['None'],
      conditions: ['Anxiety'],
      medications: ['Escitalopram 10mg daily']
    },
    dentalHistory: {
      previousProcedures: ['Deep Cleaning', 'Cavity Fillings'],
      concerns: 'Gum sensitivity'
    }
  },
  {
    id: 'P006',
    name: 'Robert Johnson',
    dob: '1965-05-12',
    email: 'robert.johnson@example.com',
    phone: '(902) 555-6789',
    insurance: 'Desjardins',
    insuranceId: 'DJ789123456',
    province: 'Nova Scotia',
    lastVisit: '2023-02-17',
    nextVisit: '2023-08-17',
    status: 'active',
    medicalHistory: {
      allergies: ['Aspirin'],
      conditions: ['Coronary Artery Disease', 'Hyperlipidemia'],
      medications: ['Atorvastatin 40mg daily', 'Aspirin 81mg daily', 'Metoprolol 25mg twice daily']
    },
    dentalHistory: {
      previousProcedures: ['Full Mouth Reconstruction (2018)', 'Dentures (upper)'],
      concerns: 'Difficulty adjusting to dentures'
    }
  },
  {
    id: 'P007',
    name: 'Isabella Brown',
    dob: '2012-08-20',
    email: 'parent.brown@example.com',
    phone: '(306) 555-3456',
    insurance: 'Sun Life Financial',
    insuranceId: 'SL456789123',
    province: 'Saskatchewan',
    lastVisit: '2023-06-30',
    nextVisit: '2023-12-30',
    status: 'active',
    medicalHistory: {
      allergies: ['Peanuts'],
      conditions: ['None'],
      medications: ['None']
    },
    dentalHistory: {
      previousProcedures: ['Sealants', 'Fluoride Treatment'],
      concerns: 'Thumb sucking habit'
    }
  },
  {
    id: 'P008',
    name: 'Michael Chen',
    dob: '1973-01-29',
    email: 'michael.chen@example.com',
    phone: '(647) 555-9012',
    insurance: 'Manulife',
    insuranceId: 'ML123789456',
    province: 'Ontario',
    lastVisit: '2023-04-12',
    nextVisit: '2023-10-12',
    status: 'active',
    medicalHistory: {
      allergies: ['None'],
      conditions: ['Hypertension', 'GERD'],
      medications: ['Amlodipine 5mg daily', 'Omeprazole 20mg daily']
    },
    dentalHistory: {
      previousProcedures: ['Root Canal (Tooth #14)', 'Implant (Tooth #19)'],
      concerns: 'Occasional jaw pain'
    }
  },
  {
    id: 'P009',
    name: 'Ava Tremblay',
    dob: '1988-07-14',
    email: 'ava.tremblay@example.com',
    phone: '(418) 555-5678',
    insurance: 'Desjardins',
    insuranceId: 'DJ321789456',
    province: 'Quebec',
    lastVisit: '2022-09-08',
    nextVisit: null,
    status: 'inactive',
    medicalHistory: {
      allergies: ['Erythromycin'],
      conditions: ['Hypothyroidism'],
      medications: ['Levothyroxine 50mcg daily']
    },
    dentalHistory: {
      previousProcedures: ['Composite Fillings'],
      concerns: 'Interest in cosmetic procedures'
    }
  },
  {
    id: 'P010',
    name: 'Noah Wilson',
    dob: '2005-10-11',
    email: 'parent.wilson@example.com',
    phone: '(204) 555-8901',
    insurance: 'Great-West Life',
    insuranceId: 'GW987654321',
    province: 'Manitoba',
    lastVisit: '2023-07-20',
    nextVisit: '2024-01-20',
    status: 'active',
    medicalHistory: {
      allergies: ['None'],
      conditions: ['Asthma'],
      medications: ['Fluticasone inhaler daily']
    },
    dentalHistory: {
      previousProcedures: ['Orthodontic evaluation'],
      concerns: 'Moderate crowding, considering braces'
    }
  }
];

export const appointments = [
  {
    id: 'A001',
    patientId: 'P001',
    patientName: 'Emma Thompson',
    date: '2023-09-15',
    time: '09:00',
    duration: 60,
    type: 'Regular Check-up',
    provider: 'Dr. Sarah Chen',
    status: 'confirmed',
    notes: 'Follow-up on previous treatment'
  },
  {
    id: 'A002',
    patientId: 'P002',
    patientName: 'Daniel Williams',
    date: '2023-09-15',
    time: '10:30',
    duration: 90,
    type: 'Implant Consultation',
    provider: 'Dr. James Wilson',
    status: 'confirmed',
    notes: 'Discuss options for missing molars'
  },
  {
    id: 'A003',
    patientId: 'P003',
    patientName: 'Sophie Martin',
    date: '2023-09-15',
    time: '13:00',
    duration: 60,
    type: 'Teeth Whitening',
    provider: 'Dr. Sarah Chen',
    status: 'confirmed',
    notes: 'First whitening session'
  },
  {
    id: 'A004',
    patientId: 'P005',
    patientName: 'Olivia Singh',
    date: '2023-09-16',
    time: '09:00',
    duration: 60,
    type: 'Regular Check-up',
    provider: 'Dr. James Wilson',
    status: 'pending',
    notes: 'New patient assessment'
  },
  {
    id: 'A005',
    patientId: 'P006',
    patientName: 'Robert Johnson',
    date: '2023-09-16',
    time: '11:00',
    duration: 45,
    type: 'Denture Adjustment',
    provider: 'Dr. Sarah Chen',
    status: 'confirmed',
    notes: 'Follow-up adjustment for upper denture'
  },
  {
    id: 'A006',
    patientId: 'P007',
    patientName: 'Isabella Brown',
    date: '2023-09-16',
    time: '14:00',
    duration: 45,
    type: 'Pediatric Check-up',
    provider: 'Dr. Anna Garcia',
    status: 'confirmed',
    notes: 'Regular 6-month check-up'
  },
  {
    id: 'A007',
    patientId: 'P008',
    patientName: 'Michael Chen',
    date: '2023-09-17',
    time: '10:00',
    duration: 120,
    type: 'Root Canal Therapy',
    provider: 'Dr. James Wilson',
    status: 'confirmed',
    notes: 'Treatment for tooth #12'
  },
  {
    id: 'A008',
    patientId: 'P010',
    patientName: 'Noah Wilson',
    date: '2023-09-17',
    time: '15:30',
    duration: 60,
    type: 'Orthodontic Consultation',
    provider: 'Dr. Anna Garcia',
    status: 'confirmed',
    notes: 'Initial braces consultation'
  },
  {
    id: 'A009',
    patientId: 'P001',
    patientName: 'Emma Thompson',
    date: '2023-09-22',
    time: '11:00',
    duration: 60,
    type: 'Filling',
    provider: 'Dr. Sarah Chen',
    status: 'pending',
    notes: 'Filling for tooth #29'
  },
  {
    id: 'A010',
    patientId: 'P005',
    patientName: 'Olivia Singh',
    date: '2023-09-23',
    time: '14:00',
    duration: 90,
    type: 'Deep Cleaning',
    provider: 'Dr. Anna Garcia',
    status: 'pending',
    notes: 'Full mouth deep cleaning'
  }
];

export const clinicalData = {
  diagnostics: [
    {
      id: 'D001',
      patientId: 'P001',
      date: '2023-03-10',
      findings: [
        { condition: 'Dental Caries', probability: 86, location: 'Tooth #29' },
        { condition: 'Mild Gingivitis', probability: 67, location: 'Upper Right Quadrant' },
        { condition: 'Enamel Erosion', probability: 42, location: 'Multiple Anterior Teeth' }
      ],
      images: [
        { id: 'IMG001', type: 'X-Ray', url: 'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'IMG002', type: 'Intraoral', url: 'https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=600' }
      ],
      recommendations: [
        { 
          treatment: 'Composite Filling', 
          urgency: 'High', 
          cost: 250, 
          insuranceCoverage: 80,
          medication: 'None'
        },
        { 
          treatment: 'Professional Cleaning', 
          urgency: 'Medium', 
          cost: 120, 
          insuranceCoverage: 100,
          medication: 'None'
        },
        { 
          treatment: 'Fluoride Treatment', 
          urgency: 'Low', 
          cost: 60, 
          insuranceCoverage: 100,
          medication: 'None'
        }
      ]
    },
    {
      id: 'D002',
      patientId: 'P002',
      date: '2023-05-22',
      findings: [
        { condition: 'Pericoronitis', probability: 92, location: 'Tooth #32' },
        { condition: 'Moderate Periodontitis', probability: 78, location: 'Lower Left Quadrant' },
        { condition: 'Occlusal Trauma', probability: 64, location: 'Multiple Posterior Teeth' }
      ],
      images: [
        { id: 'IMG003', type: 'Panoramic', url: 'https://images.pexels.com/photos/5355913/pexels-photo-5355913.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 'IMG004', type: 'Intraoral', url: 'https://images.pexels.com/photos/4687905/pexels-photo-4687905.jpeg?auto=compress&cs=tinysrgb&w=600' }
      ],
      recommendations: [
        { 
          treatment: 'Wisdom Tooth Extraction', 
          urgency: 'High', 
          cost: 450, 
          insuranceCoverage: 60,
          medication: 'Amoxicillin 500mg TID for 7 days, Ibuprofen 600mg QID PRN pain'
        },
        { 
          treatment: 'Scaling and Root Planing', 
          urgency: 'Medium', 
          cost: 380, 
          insuranceCoverage: 80,
          medication: 'Chlorhexidine Rinse 0.12% BID for 14 days'
        },
        { 
          treatment: 'Night Guard', 
          urgency: 'Medium', 
          cost: 300, 
          insuranceCoverage: 50,
          medication: 'None'
        }
      ]
    },
    {
      id: 'D003',
      patientId: 'P005',
      date: '2023-07-05',
      findings: [
        { condition: 'Gingival Recession', probability: 88, location: 'Multiple Teeth' },
        { condition: 'Hypersensitivity', probability: 76, location: 'Multiple Teeth' },
        { condition: 'Mild Abfraction', probability: 41, location: 'Premolars' }
      ],
      images: [
        { id: 'IMG005', type: 'Intraoral', url: 'https://images.pexels.com/photos/3845548/pexels-photo-3845548.jpeg?auto=compress&cs=tinysrgb&w=600' }
      ],
      recommendations: [
        { 
          treatment: 'Desensitizing Treatment', 
          urgency: 'Medium', 
          cost: 150, 
          insuranceCoverage: 60,
          medication: 'Prescription-strength fluoride toothpaste'
        },
        { 
          treatment: 'Soft Tissue Graft Consultation', 
          urgency: 'Low', 
          cost: 200, 
          insuranceCoverage: 50,
          medication: 'None'
        },
        { 
          treatment: 'Dietary Counseling', 
          urgency: 'Low', 
          cost: 90, 
          insuranceCoverage: 80,
          medication: 'None'
        }
      ]
    }
  ],
  medications: [
    {
      id: 'M001',
      name: 'Amoxicillin',
      category: 'Antibiotic',
      dosages: ['250mg', '500mg'],
      commonUses: ['Dental infections', 'Prophylaxis before procedures for at-risk patients'],
      contraindications: ['Penicillin allergy'],
      sideEffects: ['Diarrhea', 'Nausea', 'Rash']
    },
    {
      id: 'M002',
      name: 'Ibuprofen',
      category: 'NSAID',
      dosages: ['200mg', '400mg', '600mg', '800mg'],
      commonUses: ['Dental pain', 'Inflammation'],
      contraindications: ['Active GI bleeding', 'Severe renal impairment', 'NSAID allergy'],
      sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness']
    },
    {
      id: 'M003',
      name: 'Chlorhexidine Gluconate',
      category: 'Antiseptic',
      dosages: ['0.12%'],
      commonUses: ['Gingivitis', 'Post-surgical oral care'],
      contraindications: ['Hypersensitivity'],
      sideEffects: ['Tooth staining', 'Taste alteration', 'Increased tartar formation']
    },
    {
      id: 'M004',
      name: 'Lidocaine',
      category: 'Local Anesthetic',
      dosages: ['2%', '4%'],
      commonUses: ['Local anesthesia for dental procedures'],
      contraindications: ['Lidocaine allergy', 'Severe heart block'],
      sideEffects: ['Numbness', 'Dizziness', 'Rarely: allergic reactions']
    },
    {
      id: 'M005',
      name: 'Clindamycin',
      category: 'Antibiotic',
      dosages: ['150mg', '300mg'],
      commonUses: ['Alternative for patients with penicillin allergy'],
      contraindications: ['History of C. difficile infection'],
      sideEffects: ['Diarrhea', 'Abdominal pain', 'Rash']
    }
  ],
  treatments: [
    {
      id: 'T001',
      name: 'Composite Filling',
      category: 'Restorative',
      description: 'Tooth-colored filling to repair cavities or damaged teeth',
      averageCost: 200,
      insuranceCoverage: 'Typically 70-100%',
      duration: '30-60 minutes',
      recoveryTime: 'Immediate'
    },
    {
      id: 'T002',
      name: 'Root Canal Therapy',
      category: 'Endodontic',
      description: 'Removal of infected pulp tissue inside the tooth',
      averageCost: 800,
      insuranceCoverage: 'Typically 50-80%',
      duration: '60-90 minutes',
      recoveryTime: '1-2 days'
    },
    {
      id: 'T003',
      name: 'Crown',
      category: 'Restorative',
      description: 'Custom-made cap that covers the entire tooth',
      averageCost: 1200,
      insuranceCoverage: 'Typically 50-70%',
      duration: '2 appointments, 60-90 minutes each',
      recoveryTime: 'Immediate to 1 day'
    },
    {
      id: 'T004',
      name: 'Scaling and Root Planing',
      category: 'Periodontal',
      description: 'Deep cleaning procedure to treat gum disease',
      averageCost: 400,
      insuranceCoverage: 'Typically 70-90%',
      duration: '60-120 minutes',
      recoveryTime: '1-2 days'
    },
    {
      id: 'T005',
      name: 'Dental Implant',
      category: 'Prosthetic',
      description: 'Artificial tooth root to support replacement teeth',
      averageCost: 3000,
      insuranceCoverage: 'Typically 0-50%',
      duration: 'Multiple appointments over several months',
      recoveryTime: 'Varies, typically several months for full osseointegration'
    }
  ]
};

export const analyticsData = {
  patientMetrics: {
    total: 824,
    active: 752,
    inactive: 72,
    newThisMonth: 27,
    retention: 91,
    byAge: [
      { group: '0-18', count: 156 },
      { group: '19-35', count: 235 },
      { group: '36-50', count: 207 },
      { group: '51-65', count: 154 },
      { group: '65+', count: 72 }
    ],
    byInsurance: [
      { provider: 'Sun Life', count: 231 },
      { provider: 'Manulife', count: 178 },
      { provider: 'Great-West Life', count: 156 },
      { provider: 'Blue Cross', count: 124 },
      { provider: 'Desjardins', count: 87 },
      { provider: 'Other/None', count: 48 }
    ]
  },
  revenueMetrics: {
    currentMonth: 58750,
    previousMonth: 52500,
    yearToDate: 487500,
    projectedAnnual: 730000,
    byProcedure: [
      { procedure: 'Preventive', amount: 13500 },
      { procedure: 'Restorative', amount: 18750 },
      { procedure: 'Cosmetic', amount: 10250 },
      { procedure: 'Prosthetic', amount: 8700 },
      { procedure: 'Orthodontic', amount: 7550 }
    ]
  },
  procedureMetrics: {
    totalPerformed: 462,
    mostCommon: [
      { procedure: 'Routine Exam', count: 128 },
      { procedure: 'Dental Cleaning', count: 114 },
      { procedure: 'Filling', count: 87 },
      { procedure: 'X-Ray', count: 76 },
      { procedure: 'Crown', count: 34 },
      { procedure: 'Root Canal', count: 23 }
    ],
    satisfaction: 4.7
  },
  staffMetrics: {
    totalStaff: 12,
    utilization: 87,
    byProvider: [
      { provider: 'Dr. Sarah Chen', patients: 312, procedures: 187, revenue: 185000 },
      { provider: 'Dr. James Wilson', patients: 276, procedures: 143, revenue: 163500 },
      { provider: 'Dr. Anna Garcia', patients: 236, procedures: 132, revenue: 139000 }
    ]
  }
};