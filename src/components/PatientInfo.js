import React from 'react';
import { Save } from 'lucide-react';
import { validateAge } from '../utils/storage';

const PatientInfo = ({ patientInfo, setPatientInfo }) => {
  const handleInputChange = (field, value) => {
    setPatientInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!patientInfo.name.trim()) {
      alert('Please enter your full name.');
      return;
    }

    if (patientInfo.age && !validateAge(patientInfo.age)) {
      alert('Age must be between 18 and 65 years.');
      return;
    }

    alert('Patient information saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Patient Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={patientInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age (18-65)
          </label>
          <input
            type="number"
            min="18"
            max="65"
            value={patientInfo.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            value={patientInfo.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            value={patientInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={patientInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
          <input
            type="text"
            value={patientInfo.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Emergency contact name and phone"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Diagnosis</label>
          <input
            type="date"
            value={patientInfo.diagnosisDate}
            onChange={(e) => handleInputChange('diagnosisDate', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Information
      </button>

      {/* Information Summary */}
      {patientInfo.name && (
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">Patient Summary</h3>
          <div className="text-sm text-blue-700">
            <p><strong>Name:</strong> {patientInfo.name}</p>
            {patientInfo.age && <p><strong>Age:</strong> {patientInfo.age} years</p>}
            {patientInfo.gender && <p><strong>Gender:</strong> {patientInfo.gender.charAt(0).toUpperCase() + patientInfo.gender.slice(1)}</p>}
            {patientInfo.diagnosisDate && <p><strong>Diagnosed:</strong> {patientInfo.diagnosisDate}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;