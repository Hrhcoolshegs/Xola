import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Edit, Save, X, AlertTriangle, FileText, Plus } from 'lucide-react';
import { patients } from '../utils/sampleData';

const Treatment = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { diagnosticData, patientId, recommendations } = location.state || {};
  const [editMode, setEditMode] = useState(false);
  const [editedRecommendations, setEditedRecommendations] = useState(recommendations || []);

  const patient = patients.find(p => p.id === patientId);

  if (!diagnosticData || !patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertTriangle size={64} className="text-yellow-500 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Treatment Data Not Found</h2>
          <p className="text-gray-600 mb-8">
            Unable to create treatment plan. Please return to the Clinical page and try again.
          </p>
          <Button variant="primary" onClick={() => navigate('/clinical')}>
            Return to Clinical
          </Button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    // Here you would typically save the changes to your backend
  };

  const handleCancel = () => {
    setEditedRecommendations(recommendations);
    setEditMode(false);
  };

  const handleRecommendationChange = (index: number, field: string, value: any) => {
    const updatedRecommendations = [...editedRecommendations];
    updatedRecommendations[index] = {
      ...updatedRecommendations[index],
      [field]: value
    };
    setEditedRecommendations(updatedRecommendations);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Treatment Plan</h1>
            <p className="text-gray-500">Create and manage treatment plans</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {editMode ? (
            <>
              <Button
                variant="outline"
                size="sm"
                icon={<X size={16} />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Save size={16} />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              icon={<Edit size={16} />}
              onClick={handleEdit}
            >
              Edit Plan
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="h-16 w-16 rounded-full bg-[#0073b9] flex items-center justify-center text-white">
                    <FileText size={32} />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{patient.name}</h3>
                  <p className="text-sm text-gray-500">ID: {patient.id}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Treatment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Procedures</span>
                    <span className="font-medium">{editedRecommendations.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Estimated Cost</span>
                    <span className="font-medium">
                      ${editedRecommendations.reduce((sum, rec) => sum + rec.cost, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Insurance Coverage</span>
                    <span className="font-medium">
                      ${editedRecommendations.reduce((sum, rec) => sum + (rec.cost * rec.insuranceCoverage / 100), 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Plus size={16} />}
                >
                  Add Procedure
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  icon={<FileText size={16} />}
                >
                  Generate Plan
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800">Treatment Procedures</h3>
              <div className="space-y-4">
                {editedRecommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border rounded-lg hover:border-[#0073b9] transition-colors"
                  >
                    {editMode ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Treatment Name
                          </label>
                          <input
                            type="text"
                            value={recommendation.treatment}
                            onChange={(e) => handleRecommendationChange(index, 'treatment', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cost ($)
                            </label>
                            <input
                              type="number"
                              value={recommendation.cost}
                              onChange={(e) => handleRecommendationChange(index, 'cost', Number(e.target.value))}
                              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Insurance Coverage (%)
                            </label>
                            <input
                              type="number"
                              value={recommendation.insuranceCoverage}
                              onChange={(e) => handleRecommendationChange(index, 'insuranceCoverage', Number(e.target.value))}
                              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Urgency
                          </label>
                          <select
                            value={recommendation.urgency}
                            onChange={(e) => handleRecommendationChange(index, 'urgency', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800">{recommendation.treatment}</h4>
                            <div className="flex items-center mt-2">
                              <Badge
                                variant={
                                  recommendation.urgency === 'High' ? 'danger' :
                                  recommendation.urgency === 'Medium' ? 'warning' : 'info'
                                }
                                size="sm"
                                className="mr-2"
                              >
                                {recommendation.urgency} Urgency
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Coverage: {recommendation.insuranceCoverage}%
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-[#0073b9]">
                              ${recommendation.cost}
                            </p>
                            <p className="text-xs text-gray-500">
                              Est. out-of-pocket: ${(recommendation.cost * (1 - recommendation.insuranceCoverage / 100)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Treatment;