import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon, 
  LogOut,
  User,
  Clock
} from 'lucide-react';
import AppointmentForm from './AppointmentForm.tsx';
import { useAppointments } from '../hooks/useAppointments';

const Calendar = ({ onLogout }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get all days in the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  // Handle clicking on a date
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
    setEditingAppointment(null);
  };

  // Handle clicking on an appointment
  const handleAppointmentClick = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  // Handle form submission
  const handleFormSubmit = (appointmentData) => {
    if (editingAppointment) {
      updateAppointment(editingAppointment.id, appointmentData);
    } else {
      addAppointment(appointmentData);
    }
    setShowForm(false);
    setEditingAppointment(null);
  };

  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
    setEditingAppointment(null);
    setSelectedDate(null);
  };

  // Navigate between months
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Navigate between days (mobile)
  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  // Format date for input
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Mobile view
  if (isMobile) {
    const todayAppointments = getAppointmentsForDate(currentDate);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Appointments</h1>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="bg-white border-b">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateDay(-1)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="flex flex-col items-center">
                <input
                  type="date"
                  value={formatDateForInput(currentDate)}
                  onChange={(e) => setCurrentDate(new Date(e.target.value))}
                  className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0"
                />
                <p className="text-sm text-gray-500">
                  {dayNames[currentDate.getDay()]}
                </p>
              </div>
              
              <button
                onClick={() => navigateDay(1)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Appointments List */}
        <div className="flex-1 p-4">
          <div className="space-y-3">
            {todayAppointments.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No appointments scheduled</p>
              </div>
            ) : (
              todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  onClick={() => handleAppointmentClick(appointment)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-gray-900">{appointment.patient}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">{appointment.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">Dr. {appointment.doctor}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Floating Add Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => handleDateClick(currentDate)}
            className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <AppointmentForm
            appointment={editingAppointment}
            selectedDate={selectedDate || currentDate}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
            onDelete={editingAppointment ? deleteAppointment : null}
          />
        )}
      </div>
    );
  }

  // Desktop view
  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Appointment Calendar</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {dayNames.map((day) => (
              <div key={day} className="p-3 text-center font-medium text-gray-500 text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const dayAppointments = day ? getAppointmentsForDate(day) : [];
              const isToday = day && day.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-32 border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !day ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => day && handleDateClick(day)}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${
                        isToday ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 3).map((appointment) => (
                          <div
                            key={appointment.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAppointmentClick(appointment);
                            }}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded truncate hover:bg-blue-200 transition-colors"
                          >
                            {appointment.time} - {appointment.patient}
                          </div>
                        ))}
                        {dayAppointments.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{dayAppointments.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <AppointmentForm
          appointment={editingAppointment}
          selectedDate={selectedDate}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
          onDelete={editingAppointment ? deleteAppointment : null}
        />
      )}
    </div>
  );
};

export default Calendar;