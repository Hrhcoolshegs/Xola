import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CalendarPlus, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from 'lucide-react';
import { appointments } from '../utils/sampleData';

const Appointments = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('day'); // 'day', 'week', 'month'
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Filter appointments for selected date (mock data implementation)
  const filteredAppointments = appointments.filter(appointment => {
    if (view === 'day') {
      return appointment.date === '2023-09-15'; // Mock data for current day
    }
    return true; // Show all for other views
  });
  
  // Navigate between dates
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };
  
  // Time slots for day view
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('appointments.title')}</h1>
          <p className="text-gray-500">{formatDate(selectedDate)}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            icon={<CalendarPlus size={16} />}
          >
            {t('appointments.add')}
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <Button
              variant="outline"
              size="sm"
              icon={<ChevronLeft size={16} />}
              onClick={() => navigateDate('prev')}
            >
              {t('common.previous')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(new Date())}
            >
              {t('appointments.today')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<ChevronRight size={16} />}
              iconPosition="right"
              onClick={() => navigateDate('next')}
            >
              {t('common.next')}
            </Button>
          </div>
          
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className={`px-4 py-2 text-sm ${
                view === 'day' ? 'bg-[#0073b9] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setView('day')}
            >
              Day
            </button>
            <button
              className={`px-4 py-2 text-sm ${
                view === 'week' ? 'bg-[#0073b9] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button
              className={`px-4 py-2 text-sm ${
                view === 'month' ? 'bg-[#0073b9] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setView('month')}
            >
              Month
            </button>
          </div>
        </div>
        
        {view === 'day' && (
          <div className="border rounded-md overflow-hidden">
            {timeSlots.map((time) => {
              // Find appointments for this time slot
              const appointmentsForSlot = filteredAppointments.filter(
                a => a.time.startsWith(time.split(':')[0])
              );
              
              return (
                <div 
                  key={time} 
                  className={`flex border-b last:border-b-0 ${
                    time === '12:00' ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="w-20 py-3 px-2 text-center text-sm text-gray-500 border-r">
                    {time}
                  </div>
                  <div className="flex-1 p-2 min-h-[70px]">
                    {appointmentsForSlot.length > 0 ? (
                      <div className="space-y-2">
                        {appointmentsForSlot.map(appointment => (
                          <div 
                            key={appointment.id}
                            className={`p-2 rounded text-sm ${
                              appointment.status === 'confirmed' ? 'bg-green-50 border-l-4 border-green-500' :
                              appointment.status === 'pending' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                              'bg-red-50 border-l-4 border-red-500'
                            }`}
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{appointment.patientName}</span>
                              <Badge
                                variant={
                                  appointment.status === 'confirmed' ? 'success' :
                                  appointment.status === 'pending' ? 'warning' : 'danger'
                                }
                                size="sm"
                              >
                                {t(`appointments.${appointment.status}`)}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500">{appointment.type} • {appointment.provider}</p>
                            <div className="mt-1 flex space-x-1">
                              <button className="p-1 text-[#0073b9] hover:bg-[#0073b9]/10 rounded">
                                <Eye size={12} />
                              </button>
                              <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                                <Edit size={12} />
                              </button>
                              <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {view !== 'day' && (
          <div className="flex flex-col items-center justify-center py-12">
            <CalendarPlus size={64} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">Coming Soon</h3>
            <p className="text-gray-500 mb-6">{view === 'week' ? 'Week' : 'Month'} view is still in development.</p>
            <Button variant="outline" onClick={() => setView('day')}>
              Switch to Day View
            </Button>
          </div>
        )}
      </Card>
      
      <Card title={t('appointments.upcoming')}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">{t('appointments.date')}</th>
                <th className="px-4 py-3">{t('appointments.time')}</th>
                <th className="px-4 py-3">{t('appointments.patient')}</th>
                <th className="px-4 py-3">{t('appointments.type')}</th>
                <th className="px-4 py-3">{t('appointments.provider')}</th>
                <th className="px-4 py-3">{t('appointments.status')}</th>
                <th className="px-4 py-3">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 5).map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{appointment.date}</td>
                  <td className="px-4 py-3">{appointment.time}</td>
                  <td className="px-4 py-3 font-medium">{appointment.patientName}</td>
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
                      <button 
                        className="p-1 text-red-500 hover:bg-red-100 rounded"
                        title={t('common.delete')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Appointments;