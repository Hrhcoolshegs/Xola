import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Plus,
  Search,
  Filter,
  Pill,
  AlertTriangle,
  FileText,
  Edit,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { clinicalData } from '../utils/sampleData';

const Medications = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const medications = clinicalData.medications;

  const filteredMedications = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || med.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = Array.from(
    new Set(medications.map((med) => med.category))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {t('nav.medications')}
          </h1>
          <p className="text-gray-500">Manage medications and prescriptions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" icon={<Plus size={16} />}>
            Add Medication
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Button variant="outline" icon={<Filter size={16} />}>
              More Filters
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredMedications.map((medication) => (
            <div
              key={medication.id}
              className="border rounded-lg hover:border-[#0073b9] transition-colors"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-800">
                        {medication.name}
                      </h3>
                      <Badge variant="primary" size="sm">
                        {medication.category}
                      </Badge>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Available Dosages
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {medication.dosages.map((dosage) => (
                            <span
                              key={dosage}
                              className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700"
                            >
                              {dosage}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Common Uses
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {medication.commonUses.map((use, index) => (
                            <li key={index}>{use}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<FileText size={16} />}
                    >
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Trash2 size={16} />}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {medication.contraindications.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle
                        size={16}
                        className="text-red-600 mt-0.5 mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          Contraindications
                        </p>
                        <ul className="mt-1 list-disc list-inside text-sm text-red-700">
                          {medication.contraindications.map(
                            (contraindication, index) => (
                              <li key={index}>{contraindication}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Side Effects
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {medication.sideEffects.map((effect, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-yellow-50 text-yellow-800 rounded-md text-sm"
                          >
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<ExternalLink size={16} />}
                    >
                      Prescribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Medications;