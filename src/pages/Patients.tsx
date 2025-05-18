import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { UserPlus, Search, Filter, Eye, Edit, MoreHorizontal } from 'lucide-react';
import { patients } from '../utils/sampleData';

const Patients = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Filter patients based on search term and status filter
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    
    const matchesFilter = filter === 'all' || patient.status === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('patients.title')}</h1>
          <p className="text-gray-500">{t('patients.total')}: {patients.length}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            icon={<UserPlus size={16} />}
          >
            {t('patients.add')}
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t('patients.search')}
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
              <option value="all">{t('common.all')}</option>
              <option value="active">{t('common.active')}</option>
              <option value="inactive">{t('common.inactive')}</option>
            </select>
            <Button 
              variant="outline"
              icon={<Filter size={16} />}
            >
              {t('patients.filter')}
            </Button>
          </div>
        </div>
        
        {filteredPatients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">{t('patients.name')}</th>
                  <th className="px-4 py-3">{t('patients.id')}</th>
                  <th className="px-4 py-3">{t('patients.phone')}</th>
                  <th className="px-4 py-3">{t('patients.email')}</th>
                  <th className="px-4 py-3">{t('patients.insurance')}</th>
                  <th className="px-4 py-3">{t('patients.lastVisit')}</th>
                  <th className="px-4 py-3">{t('patients.status')}</th>
                  <th className="px-4 py-3">{t('patients.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{patient.name}</td>
                    <td className="px-4 py-3">{patient.id}</td>
                    <td className="px-4 py-3">{patient.phone}</td>
                    <td className="px-4 py-3">{patient.email}</td>
                    <td className="px-4 py-3">{patient.insurance}</td>
                    <td className="px-4 py-3">{patient.lastVisit || '-'}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={patient.status === 'active' ? 'success' : 'danger'}
                        size="sm"
                      >
                        {t(`common.${patient.status}`)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => navigate(`/patients/${patient.id}`)}
                          className="p-1 text-[#0073b9] hover:bg-[#0073b9]/10 rounded"
                          title={t('patients.view')}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                          title={t('patients.edit')}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                          title="More options"
                        >
                          <MoreHorizontal size={16} />
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
            {t('common.noresults')}
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {t('common.showing')} {filteredPatients.length} {t('common.of')} {patients.length} {t('patients.title').toLowerCase()}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              {t('common.previous')}
            </Button>
            <Button variant="outline" size="sm" disabled>
              {t('common.next')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Patients;