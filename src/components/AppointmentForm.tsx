import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, User, UserCheck, Clock } from 'lucide-react';
import { patients, doctors } from '../utils/data';

const AppointmentForm = ({ appointment, selectedDate, onSubmit, onClose, onDelete }) => {
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    time: '',
    date: ''
  });
  const [errors, setErrors] = useState({});

  // Initialize form data
  useEffect(() => {
    if (appointment) {
      // Editing existing appointment
      setFormData({
        patient: appointment.patient,
        doctor: appointment.doctor,
        time: appointment.time,
        date: appointment.date
      });
    } else if (selectedDate) {
      // Creating new appointment
      setFormData({
        patient: '',
        doctor: '',
        time: '',
        date: selectedDate.toISOString().split('T')[0]
      });
    }
  }, [appointment, selectedDate]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patient) newErrors.patient = 'Patient is required';
    if (!formData.doctor) newErrors.doctor = 'Doctor is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.date) newErrors.date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      onDelete(appointment.id);
      onClose();
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {appointment ? 'Edit Appointment' : 'New Appointment'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Date Display */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              {formatDate(formData.date)}
            </p>
          </div>

          {/* Patient Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Patient
            </label>
            <select
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.patient ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.name}>
                  {patient.name}
                </option>
              ))}
            </select>
            {errors.patient && (
              <p className="mt-1 text-sm text-red-600">{errors.patient}</p>
            )}
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserCheck className="inline h-4 w-4 mr-1" />
              Doctor
            </label>
            <select
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.doctor ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  Dr. {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
            {errors.doctor && (
              <p className="mt-1 text-sm text-red-600">{errors.doctor}</p>
            )}
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.time ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            {appointment && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            )}
            
            <div className="flex space-x-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{appointment ? 'Update' : 'Save'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;