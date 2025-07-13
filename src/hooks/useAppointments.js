import { useState, useEffect } from 'react';
import { getStoredAppointments, setStoredAppointments } from '../utils/storage';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const storedAppointments = getStoredAppointments();
    setAppointments(storedAppointments);
  }, []);

  // Save appointments to localStorage whenever appointments change
  useEffect(() => {
    setStoredAppointments(appointments);
  }, [appointments]);

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointment = (id, updatedData) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, ...updatedData } : apt
      )
    );
  };

  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  };
};