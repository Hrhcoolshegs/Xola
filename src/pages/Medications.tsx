import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  Search, 
  Plus, 
  Filter,
  Pill,
  AlertTriangle,
  Edit,
  Trash2,
  Eye,
  X
} from 'lucide-react';
import { clinicalData } from '../utils/sampleData';

const Medications = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Get unique categories
  const categories = ['all', ...new Set(clinicalData.medications.map(med => med.category))];

  // Filter medications based on search and category
  const filteredMedications = clinicalData.medications.filter(medication => {
    const matchesSearch = 
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medication.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleMedicationClick = (medication: any) => {
    setSelectedMedication(medication);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('nav.medications')}</h1>
          <p className="text-gray-500">Manage and track medications</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            icon={<Plus size={16} />}
          >
            Add Medication
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <Button 
              variant="outline"
              icon={<Filter size={16} />}
            >
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedications.map((medication) => (
            <div
              key={medication.id}
              className="border rounded-lg p-4 hover:border-[#0073b9] transition-colors cursor-pointer"
              onClick={() => handleMedicationClick(medication)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-[#0073b9]/10 text-[#0073b9] mr-3">
                    <Pill size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{medication.name}</h3>
                    <Badge variant="secondary" size="sm">{medication.category}</Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                    <Edit size={14} />
                  </button>
                  <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Dosages</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {medication.dosages.map((dosage: string, index: number) => (
                      <Badge key={index} variant="outline" size="sm">{dosage}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Common Uses</p>
                  <p className="text-sm text-gray-600">{medication.commonUses[0]}</p>
                </div>
              </div>

              {medication.contraindications.length > 0 && (
                <div className="mt-4 p-2 bg-red-50 rounded-md flex items-start">
                  <AlertTriangle size={16} className="text-red-500 mr-2 mt-0.5" />
                  <p className="text-sm text-red-700">
                    {medication.contraindications[0]}
                    {medication.contraindications.length > 1 && ' + others'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Medication Detail Modal */}
      {showModal && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-[#0073b9]/10 text-[#0073b9] mr-3">
                    <Pill size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedMedication.name}</h2>
                    <Badge variant="secondary">{selectedMedication.category}</Badge>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Available Dosages</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedication.dosages.map((dosage: string, index: number) => (
                      <Badge key={index} variant="outline">{dosage}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Common Uses</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedMedication.commonUses.map((use: string, index: number) => (
                      <li key={index} className="text-gray-600">{use}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Contraindications</h3>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                    <ul className="list-disc list-inside space-y-1">
                      {selectedMedication.contraindications.map((item: string, index: number) => (
                        <li key={index} className="text-red-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Side Effects</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedMedication.sideEffects.map((effect: string, index: number) => (
                      <li key={index} className="text-gray-600">{effect}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Edit size={16} />}
                >
                  Edit
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Eye size={16} />}
                >
                  View History
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medications;