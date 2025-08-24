// Utility functions for data management
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const clearStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Data validation functions
export const validateBloodSugar = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0 && num < 1000;
};

export const validateWeight = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0 && num < 2000;
};

export const validateAge = (value) => {
  const num = parseInt(value);
  return !isNaN(num) && num >= 18 && num <= 65;
};