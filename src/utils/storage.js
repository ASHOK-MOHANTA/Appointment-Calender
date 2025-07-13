const STORAGE_KEYS = {
  APPOINTMENTS: 'clinic_appointments',
  AUTH: 'clinic_auth'
};

export const getStoredAppointments = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading appointments:', error);
    return [];
  }
};

export const setStoredAppointments = (appointments) => {
  try {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  } catch (error) {
    console.error('Error saving appointments:', error);
  }
};

export const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.AUTH);
    return stored ? JSON.parse(stored) : { isAuthenticated: false };
  } catch (error) {
    console.error('Error loading auth:', error);
    return { isAuthenticated: false };
  }
};

export const setStoredAuth = (auth) => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
  } catch (error) {
    console.error('Error saving auth:', error);
  }
};