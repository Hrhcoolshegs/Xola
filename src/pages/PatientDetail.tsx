import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Calendar, FileText, History, User, Heart, Bluetooth as Tooth, AlertCircle, Pill, DollarSign, Edit } from 'lucide-react';
import { patients, appointments, clinicalData } from '../utils/sampleData';

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Find patient by ID
  const patient = patients.find(p => p.id === id);
  
  // Get patient appointments
  const patientAppointments = appointments.filter(
    appointment => appointment.patientId === id
  );
  
  // Get patient clinical data
  const patientDiagnostics = clinicalData.diagnostics.filter(
    diagnostic => diagnostic.patientId === id
  );
  
  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Patient not found</h2>
        <p className="text-gray-600 mb-4">The requested patient information could not be found.</p>
        <Link to="/patients">
          <Button variant="primary">Back to Patients</Button>
        </Link>
      </div>
    );
  }
  
  const tabs = [
    { id: 'profile', label: t('patient.profile'), icon: User },
    { id: 'medical', label: t('patient.medical'), icon: Heart },
    { id: 'dental', label: t('patient.dental'), icon: Tooth },
    { id: 'appointments', label: t('patient.appointments'), icon: Calendar },
    { id: 'treatments', label: t('patient.treatments'), icon: History },
    { id: 'billing', label: t('patient.billing'), icon: DollarSign },
    { id: 'documents', label: t('patient.documents'), icon: FileText },
    { id: 'notes', label: t('patient.notes'), icon: Edit },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/patients" className="text-[#0073b9] hover:underline mr-4 flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          {t('common.back')}
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{t('patient.details')}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-6 border-b border-gray-200">
          <div className="flex-shrink-0 w-24 h-24 bg-[#0073b9] rounded-full flex items-center justify-center text-white">
            <User size={40} />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
                <div className="flex items-center mt-1">
                  <p className="text-gray-500 text-sm">{patient.id}</p>
                  <Badge
                    variant={patient.status === 'active' ? 'success' : 'danger'}
                    size="sm"
                    className="ml-2"
                  >
                    {t(`common.${patient.status}`)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" icon={<Edit size={16} />}>
                  {t('common.edit')}
                </Button>
                <Button variant="primary" size="sm" icon={<Calendar size={16} />}>
                  {t('appointments.add')}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">{t('patients.email')}</p>
                <p className="font-medium">{patient.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('patients.phone')}</p>
                <p className="font-medium">{patient.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{patient.dob}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('patients.insurance')}</p>
                <p className="font-medium">{patient.insurance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Insurance ID</p>
                <p className="font-medium">{patient.insuranceId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Province</p>
                <p className="font-medium">{patient.province}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 font-medium text-sm flex items-center whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-[#0073b9] text-[#0073b9]' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card title="Personal Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-medium">{patient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                    <p className="font-medium">{patient.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium">{patient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="font-medium">{patient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Province</p>
                    <p className="font-medium">{patient.province}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <Badge
                      variant={patient.status === 'active' ? 'success' : 'danger'}
                    >
                      {t(`common.${patient.status}`)}
                    </Badge>
                  </div>
                </div>
              </Card>
              
              <Card title="Insurance Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Provider</p>
                    <p className="font-medium">{patient.insurance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Insurance ID</p>
                    <p className="font-medium">{patient.insuranceId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Plan Type</p>
                    <p className="font-medium">Comprehensive</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Coverage Percentage</p>
                    <p className="font-medium">80%</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          {activeTab === 'medical' && (
            <div className="space-y-6">
              <Card title="Medical History">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Allergies</h4>
                    {patient.medicalHistory?.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {patient.medicalHistory.allergies.map((allergy, index) => (
                          <Badge key={index} variant="danger">{allergy}</Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No known allergies</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Medical Conditions</h4>
                    {patient.medicalHistory?.conditions.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {patient.medicalHistory.conditions.map((condition, index) => (
                          <Badge key={index} variant="warning">{condition}</Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No known medical conditions</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Current Medications</h4>
                    {patient.medicalHistory?.medications.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {patient.medicalHistory.medications.map((medication, index) => (
                          <li key={index} className="text-gray-700">{medication}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No current medications</p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          {activeTab === 'dental' && (
            <div className="space-y-6">
              <Card title="Dental History">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Previous Procedures</h4>
                    {patient.dentalHistory?.previousProcedures.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {patient.dentalHistory.previousProcedures.map((procedure, index) => (
                          <li key={index} className="text-gray-700">{procedure}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No previous dental procedures</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Concerns</h4>
                    <p className="text-gray-700">
                      {patient.dentalHistory?.concerns || 'No concerns noted'}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card title="Recent Diagnoses">
                {patientDiagnostics.length > 0 ? (
                  <div className="space-y-6">
                    {patientDiagnostics.map((diagnostic) => (
                      <div key={diagnostic.id} className="border-b pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium text-gray-800">Diagnosis on {diagnostic.date}</h4>
                          <Button variant="outline" size="sm">View Full Report</Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Findings</h5>
                            <div className="space-y-3">
                              {diagnostic.findings.map((finding, index) => (
                                <div key={index}>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-800">{finding.condition}</span>
                                    <span className="text-sm font-medium text-gray-600">{finding.probability}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div 
                                      className="bg-[#0073b9] h-2 rounded-full" 
                                      style={{ width: `${finding.probability}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">Location: {finding.location}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {diagnostic.recommendations.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h5>
                              <div className="space-y-2">
                                {diagnostic.recommendations.map((recommendation, index) => (
                                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium text-gray-800">{recommendation.treatment}</p>
                                        <p className="text-sm text-gray-600">Cost: ${recommendation.cost} • Insurance Coverage: {recommendation.insuranceCoverage}%</p>
                                      </div>
                                      <Badge variant={
                                        recommendation.urgency === 'High' ? 'danger' :
                                        recommendation.urgency === 'Medium' ? 'warning' : 'info'
                                      }>
                                        {recommendation.urgency} Urgency
                                      </Badge>
                                    </div>
                                    {recommendation.medication !== 'None' && (
                                      <div className="mt-2 flex items-center text-sm text-gray-600">
                                        <Pill size={14} className="mr-1" />
                                        <span>{recommendation.medication}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No diagnostic records available
                  </div>
                )}
              </Card>
            </div>
          )}
          
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">Upcoming Appointments</h3>
                <Button variant="primary" size="sm" icon={<Calendar size={16} />}>
                  {t('appointments.add')}
                </Button>
              </div>
              
              {patientAppointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">{t('appointments.date')}</th>
                        <th className="px-4 py-3">{t('appointments.time')}</th>
                        <th className="px-4 py-3">{t('appointments.type')}</th>
                        <th className="px-4 py-3">{t('appointments.provider')}</th>
                        <th className="px-4 py-3">{t('appointments.status')}</th>
                        <th className="px-4 py-3">{t('common.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientAppointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{appointment.date}</td>
                          <td className="px-4 py-3">{appointment.time}</td>
                          <td className="px-4 py-3">{appointment.type}</td>
                          <td className="px-4 py-3">{appointment.provider}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                appointment.status === 'confirmed' ? 'success' :
                                appointment.status === 'pending' ? 'warning' : 'danger'
                              }
                              size="sm"
                            >
                              {t(`appointments.${appointment.status}`)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button 
                                className="p-1 text-[#0073b9] hover:bg-[#0073b9]/10 rounded"
                                title={t('common.view')}
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                                title={t('common.edit')}
                              >
                                <Edit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No appointments scheduled
                </div>
              )}
            </div>
          )}
          
          {/* Other tabs can be implemented similarly */}
          {(activeTab === 'treatments' || activeTab === 'billing' || activeTab === 'documents' || activeTab === 'notes') && (
            <div className="flex flex-col items-center justify-center py-12">
              <Calendar size={64} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Coming Soon</h3>
              <p className="text-gray-500 mb-6">This feature is still in development.</p>
              <Button variant="outline" onClick={() => setActiveTab('profile')}>
                Back to Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;