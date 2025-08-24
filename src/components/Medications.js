import React, { useState } from 'react';
import { Plus, Pill, Trash2 } from 'lucide-react';

const Medications = ({ medications, setMedications }) => {
  const [formData, setFormData] = useState({
    name: '',
    strength: '',
    frequency: '',
    dosage: '',
    prescribedBy: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter the medication name.');
      return;
    }

    const newMedication = {
      ...formData,
      id: Date.now(),
      dateAdded: new Date().toISOString()
    };

    setMedications(prev => [...prev, newMedication]);
    
    // Reset form
    setFormData({
      name: '',
      strength: '',
      frequency: '',
      dosage: '',
      prescribedBy: ''
    });

    alert('Medication added successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this medication?')) {
      setMedications(prev => prev.filter(med => med.id !== id));
    }
  };

  const frequencyOptions = [
    { value: '', label: 'Select frequency' },
    { value: 'once daily', label: 'Once daily' },
    { value: 'twice daily', label: 'Twice daily (BID)' },
    { value: 'three times daily', label: 'Three times daily (TID)' },
    { value: 'four times daily', label: 'Four times daily (QID)' },
    { value: 'every other day', label: 'Every other day' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'as needed', label: 'As needed (PRN)' }
  ];

  return (
    <div className="space-y-6">
      {/* Add medication form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Medication</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medication Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Metformin, Insulin, Lisinopril"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Strength/Dose</label>
              <input
                type="text"
                value={formData.strength}
                onChange={(e) => handleInputChange('strength', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 500mg, 10 units, 5mg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {frequencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prescribed By</label>
              <input
                type="text"
                value={formData.prescribedBy}
                onChange={(e) => handleInputChange('prescribedBy', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Doctor's name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dosage Instructions</label>
            <textarea
              value={formData.dosage}
              onChange={(e) => handleInputChange('dosage', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="e.g., Take with meals, Take on empty stomach, Inject before meals"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Medication
          </button>
        </form>
      </div>

      {/* Current medications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
          <Pill className="w-5 h-5 mr-2" />
          Current Medications ({medications.length})
        </h3>
        
        {medications.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Pill className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">No medications recorded yet.</p>
            <p className="text-sm text-gray-400 mt-1">Add your current medications above to keep track of your treatment plan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {medications.map((med) => (
              <div 
                key={med.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold text-lg text-gray-800">{med.name}</h4>
                      {med.strength && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {med.strength}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      {med.frequency && (
                        <p className="flex items-center">
                          <span className="font-medium mr-2">Frequency:</span>
                          {med.frequency.charAt(0).toUpperCase() + med.frequency.slice(1)}
                        </p>
                      )}
                      
                      {med.dosage && (
                        <p className="flex items-start">
                          <span className="font-medium mr-2 mt-0.5">Instructions:</span>
                          <span className="flex-1">{med.dosage}</span>
                        </p>
                      )}
                      
                      {med.prescribedBy && (
                        <p className="flex items-center">
                          <span className="font-medium mr-2">Prescribed by:</span>
                          {med.prescribedBy}
                        </p>
                      )}
                      
                      <p className="flex items-center text-xs">
                        <span className="font-medium mr-2">Added:</span>
                        {new Date(med.dateAdded).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(med.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    title="Remove medication"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medication reminders info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 mb-2">Important Reminders</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Always take medications as prescribed by your healthcare provider</li>
          <li>• Keep track of when you take each dose</li>
          <li>• Don't stop taking medications without consulting your doctor</li>
          <li>• Report any side effects to your healthcare provider</li>
          <li>• Keep medications in their original containers</li>
        </ul>
      </div>
    </div>
  );
};

export default Medications;