import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { validateBloodSugar } from '../utils/storage';

const BloodSugar = ({ bloodSugarEntries, setBloodSugarEntries }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: 'fasting',
    value: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateBloodSugar(formData.value)) {
      alert('Please enter a valid blood sugar value (1-999 mg/dL).');
      return;
    }

    const newEntry = {
      ...formData,
      value: parseFloat(formData.value),
      id: Date.now(),
      timestamp: new Date().toISOString()
    };

    setBloodSugarEntries(prev => [newEntry, ...prev]);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: 'fasting',
      value: ''
    });

    alert('Blood sugar reading recorded successfully!');
  };

  const getBloodSugarLevel = (value, time) => {
    if (time === 'fasting') {
      if (value < 70) return { level: 'low', color: 'text-red-600', bg: 'bg-red-50' };
      if (value <= 99) return { level: 'normal', color: 'text-green-600', bg: 'bg-green-50' };
      if (value <= 125) return { level: 'elevated', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      return { level: 'high', color: 'text-red-600', bg: 'bg-red-50' };
    } else {
      if (value < 70) return { level: 'low', color: 'text-red-600', bg: 'bg-red-50' };
      if (value <= 140) return { level: 'normal', color: 'text-green-600', bg: 'bg-green-50' };
      if (value <= 199) return { level: 'elevated', color: 'text-yellow-600', bg: 'bg-yellow-50' };
      return { level: 'high', color: 'text-red-600', bg: 'bg-red-50' };
    }
  };

  const formatTimeLabel = (time) => {
    const labels = {
      fasting: 'Fasting',
      beforeLunch: 'Before Lunch',
      beforeDinner: 'Before Dinner',
      bedtime: 'Bedtime'
    };
    return labels[time] || time;
  };

  const getAverageLastWeek = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentEntries = bloodSugarEntries.filter(entry => 
      new Date(entry.date) >= oneWeekAgo
    );
    
    if (recentEntries.length === 0) return null;
    
    const sum = recentEntries.reduce((acc, entry) => acc + entry.value, 0);
    return (sum / recentEntries.length).toFixed(1);
  };

  const weeklyAverage = getAverageLastWeek();

  return (
    <div className="space-y-6">
      {/* Add new reading form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Record Blood Sugar Reading</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <select
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="fasting">Fasting</option>
              <option value="beforeLunch">Before Lunch</option>
              <option value="beforeDinner">Before Dinner</option>
              <option value="bedtime">Bedtime</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Sugar (mg/dL)</label>
            <input
              type="number"
              min="1"
              max="999"
              value={formData.value}
              onChange={(e) => handleInputChange('value', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter value"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Record
            </button>
          </div>
        </form>

        {/* Quick reference guide */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Blood Sugar Target Ranges:</h4>
          <div className="text-xs text-gray-600 grid grid-cols-2 gap-2">
            <div>
              <strong>Fasting:</strong> 80-99 mg/dL (Normal)
            </div>
            <div>
              <strong>After meals:</strong> &lt;140 mg/dL (Normal)
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {bloodSugarEntries.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-md">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Total Readings</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{bloodSugarEntries.length}</p>
            </div>
            
            {weeklyAverage && (
              <div className="p-4 bg-green-50 rounded-md">
                <div className="flex items-center">
                  <TrendingDown className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">7-Day Average</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{weeklyAverage} mg/dL</p>
              </div>
            )}
            
            <div className="p-4 bg-purple-50 rounded-md">
              <div className="flex items-center">
                <span className="text-sm font-medium text-purple-800">Latest Reading</span>
              </div>
              {bloodSugarEntries.length > 0 && (
                <p className="text-2xl font-bold text-purple-600">
                  {bloodSugarEntries[0].value} mg/dL
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Blood sugar history */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Readings</h3>
        
        {bloodSugarEntries.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-500">No blood sugar readings recorded yet.</p>
            <p className="text-sm text-gray-400 mt-1">Start tracking your blood sugar levels above.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {bloodSugarEntries.slice(0, 15).map((entry) => {
              const levelInfo = getBloodSugarLevel(entry.value, entry.time);
              return (
                <div 
                  key={entry.id} 
                  className={`flex justify-between items-center p-3 rounded-md ${levelInfo.bg} border-l-4 ${
                    levelInfo.level === 'normal' ? 'border-green-400' :
                    levelInfo.level === 'elevated' ? 'border-yellow-400' :
                    'border-red-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{entry.date}</span>
                      <span className="text-gray-600">{formatTimeLabel(entry.time)}</span>
                    </div>
                    <span className={`text-xs font-medium ${levelInfo.color}`}>
                      {levelInfo.level.charAt(0).toUpperCase() + levelInfo.level.slice(1)} Level
                    </span>
                  </div>
                  <div className={`font-bold text-lg ${levelInfo.color}`}>
                    {entry.value} mg/dL
                  </div>
                </div>
              );
            })}
            
            {bloodSugarEntries.length > 15 && (
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  Showing 15 most recent readings. Total: {bloodSugarEntries.length} readings.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodSugar;