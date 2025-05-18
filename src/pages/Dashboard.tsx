import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Button } from '../components/ui/Button';
import { Calendar, Users, DollarSign, CheckSquare, ArrowRight, BarChart2 } from 'lucide-react';
import { appointments, patients, analyticsData } from '../utils/sampleData';

const Dashboard = () => {
  const { t } = useLanguage();
  const [date] = useState(new Date());
  
  // Filter appointments for today
  const todayAppointments = appointments.filter(
    appointment => appointment.date === '2023-09-15'
  );
  
  // Get stats for display
  const totalPatients = patients.length;
  const activePatients = patients.filter(patient => patient.status === 'active').length;
  const todayRevenue = analyticsData.revenueMetrics.currentMonth / 30; // Simple approximation
  const pendingTasks = 8; // Mock data
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('dashboard.title')}</h1>
          <p className="text-gray-500">{date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            {t('appointments.add')}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t('dashboard.appointments.today')} 
          value={todayAppointments.length} 
          icon={<Calendar size={24} />}
          trend={{ value: 10, isPositive: true }}
        />
        <StatCard 
          title={t('dashboard.patients.new')} 
          value={totalPatients > 0 ? `${activePatients}/${totalPatients}` : '0'} 
          icon={<Users size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title={t('dashboard.revenue.today')} 
          value={`$${todayRevenue.toFixed(0)}`} 
          icon={<DollarSign size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title={t('dashboard.tasks.pending')} 
          value={pendingTasks} 
          icon={<CheckSquare size={24} />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('dashboard.appointments.today')}>
          <div className="space-y-4">
            {todayAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">{t('appointments.time')}</th>
                      <th className="px-4 py-3">{t('appointments.patient')}</th>
                      <th className="px-4 py-3">{t('appointments.type')}</th>
                      <th className="px-4 py-3">{t('appointments.provider')}</th>
                      <th className="px-4 py-3">{t('appointments.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{appointment.time}</td>
                        <td className="px-4 py-3">{appointment.patientName}</td>
                        <td className="px-4 py-3">{appointment.type}</td>
                        <td className="px-4 py-3">{appointment.provider}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`
                          }>
                            {t(`appointments.${appointment.status}`)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('common.noData')}
              </div>
            )}
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                {t('common.view')} {t('appointments.all')}
              </Button>
            </div>
          </div>
        </Card>
        
        <Card title={t('analytics.patients')}>
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center">
              <div className="h-64 w-full">
                <div className="h-full w-full flex flex-col items-center justify-center">
                  <BarChart2 size={64} className="text-[#0073b9] mb-4" />
                  <div className="grid grid-cols-2 w-full gap-4 mt-4">
                    {analyticsData.patientMetrics.byAge.map((ageGroup, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">{ageGroup.group}</span>
                          <span className="text-xs font-medium text-gray-700">{ageGroup.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#0073b9] h-2 rounded-full" 
                            style={{ width: `${(ageGroup.count / analyticsData.patientMetrics.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm">
                {t('common.view')} {t('analytics.title')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;