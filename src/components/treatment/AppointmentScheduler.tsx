import { useState } from 'react';
import { format, addDays, startOfWeek, eachDayOfInterval } from 'date-fns';
import { Calendar, Clock, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface TimeSlot {
  time: string;
  available: boolean;
  provider?: string;
}

interface AppointmentSchedulerProps {
  onSchedule: (date: Date, time: string, provider: string) => void;
  availableProviders: string[];
  existingAppointments?: {
    date: string;
    time: string;
    provider: string;
    patientName: string;
  }[];
}

export const AppointmentScheduler = ({
  onSchedule,
  availableProviders,
  existingAppointments = []
}: AppointmentSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: true },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: true },
    { time: '14:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: true },
    { time: '16:00', available: true },
    { time: '16:30', available: true },
  ];

  const weekDays = eachDayOfInterval({
    start: startOfWeek(selectedDate),
    end: addDays(startOfWeek(selectedDate), 6)
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleSchedule = () => {
    if (selectedDate && selectedTime && selectedProvider) {
      onSchedule(selectedDate, selectedTime, selectedProvider);
    }
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">Schedule Appointment</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon={<ChevronLeft size={16} />}
              onClick={() => setSelectedDate(addDays(selectedDate, -7))}
            >
              Previous Week
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<ChevronRight size={16} />}
              onClick={() => setSelectedDate(addDays(selectedDate, 7))}
            >
              Next Week
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <button
              key={day.toString()}
              onClick={() => handleDateSelect(day)}
              className={`p-2 rounded-lg text-center transition-colors ${
                format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                  ? 'bg-[#0073b9] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <p className="text-xs font-medium">{format(day, 'EEE')}</p>
              <p className="text-lg">{format(day, 'd')}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Clock size={16} className="mr-2" />
              Available Time Slots
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`p-2 rounded-lg text-center transition-colors ${
                    selectedTime === slot.time
                      ? 'bg-[#0073b9] text-white'
                      : slot.available
                      ? 'hover:bg-gray-100'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <User size={16} className="mr-2" />
              Available Providers
            </h4>
            <div className="space-y-2">
              {availableProviders.map((provider) => (
                <button
                  key={provider}
                  onClick={() => setSelectedProvider(provider)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedProvider === provider
                      ? 'bg-[#0073b9] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <p className="font-medium">{provider}</p>
                  <p className="text-sm opacity-75">Available</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {existingAppointments.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Existing Appointments
            </h4>
            <div className="space-y-2">
              {existingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <Badge variant="primary">{appointment.provider}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            variant="primary"
            disabled={!selectedDate || !selectedTime || !selectedProvider}
            onClick={handleSchedule}
            icon={<Calendar size={16} />}
          >
            Schedule Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};