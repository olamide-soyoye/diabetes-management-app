import React, { useState } from 'react';
import { Plus, Scale, TrendingUp, TrendingDown } from 'lucide-react';
import { validateWeight } from '../utils/storage';

const WeightDiet = ({ weightEntries, setWeightEntries }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    unit: 'lbs',
    notes: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateWeight(formData.weight)) {
      alert('Please enter a valid weight value.');
      return;
    }

    const newEntry = {
      ...formData,
      weight: parseFloat(formData.weight),
      id: Date.now(),
      timestamp: new Date().toISOString()
    };

    setWeightEntries(prev => [newEntry, ...prev]);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      unit: 'lbs',
      notes: ''
    });

    alert('Weight entry recorded successfully!');
  };

  const getWeightTrend = () => {
    if (weightEntries.length < 2) return null;
    
    const latest = weightEntries[0].weight;
    const previous = weightEntries[1].weight;
    const difference = latest - previous;
    
    return {
      difference: Math.abs(difference),
      direction: difference > 0 ? 'up' : difference < 0 ? 'down' : 'stable'
    };
  };

  const getAverageWeight = () => {
    if (weightEntries.length === 0) return null;
    
    const sum = weightEntries.reduce((acc, entry) => acc + entry.weight, 0);
    return (sum / weightEntries.length).toFixed(1);
  };

  const getWeightRange = () => {
    if (weightEntries.length === 0) return null;
    
    const weights = weightEntries.map(entry => entry.weight);
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    
    return { min, max };
  };

  const trend = getWeightTrend();
  const average = getAverageWeight();
  const range = getWeightRange();

  return (
    <div className="space-y-6">
      {/* Weight entry form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Record Weight</h2>
        
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter weight"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              value={formData.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="lbs">Pounds (lbs)</option>
              <option value="kg">Kilograms (kg)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any notes"
            />
          </div>

          <div className="md:col-span-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Record Weight
            </button>
          </div>
        </form>
      </div>

      {/* Weight statistics */}
      {weightEntries.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Weight Statistics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-md">
              <div className="flex items-center">
                <Scale className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Current Weight</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {weightEntries[0].weight} {weightEntries[0].unit}
              </p>
            </div>

            {average && (
              <div className="p-4 bg-green-50 rounded-md">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-green-800">Average Weight</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {average} {weightEntries[0].unit}
                </p>
              </div>
            )}

            {trend && (
              <div className={`p-4 rounded-md ${
                trend.direction === 'up' ? 'bg-red-50' : 
                trend.direction === 'down' ? 'bg-yellow-50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center">
                  {trend.direction === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
                  ) : trend.direction === 'down' ? (
                    <TrendingDown className="w-5 h-5 text-yellow-600 mr-2" />
                  ) : (
                    <div className="w-5 h-5 bg-gray-400 rounded-full mr-2" />
                  )}
                  <span className={`text-sm font-medium ${
                    trend.direction === 'up' ? 'text-red-800' :
                    trend.direction === 'down' ? 'text-yellow-800' : 'text-gray-800'
                  }`}>
                    Recent Trend
                  </span>
                </div>
                <p className={`text-2xl font-bold ${
                  trend.direction === 'up' ? 'text-red-600' :
                  trend.direction === 'down' ? 'text-yellow-600' : 'text-gray-600'
                }`}>
                  {trend.direction === 'stable' ? 'Stable' : 
                   `${trend.direction === 'up' ? '+' : '-'}${trend.difference.toFixed(1)} ${weightEntries[0].unit}`}
                </p>
              </div>
            )}

            {range && (
              <div className="p-4 bg-purple-50 rounded-md">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-purple-800">Weight Range</span>
                </div>
                <p className="text-lg font-bold text-purple-600">
                  {range.min} - {range.max} {weightEntries[0].unit}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Weight history */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Weight History</h3>
        
        {weightEntries.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Scale className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">No weight entries recorded yet.</p>
            <p className="text-sm text-gray-400 mt-1">Start tracking your weight above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {weightEntries.slice(0, 10).map((entry, index) => (
              <div 
                key={entry.id} 
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{entry.date}</span>
                    {entry.notes && (
                      <span className="text-gray-600 text-sm">({entry.notes})</span>
                    )}
                  </div>
                  {index > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {(() => {
                        const prevWeight = weightEntries[index].weight;
                        const diff = entry.weight - prevWeight;
                        if (Math.abs(diff) < 0.1) return 'No change';
                        return diff > 0 ? `+${diff.toFixed(1)} ${entry.unit}` : `${diff.toFixed(1)} ${entry.unit}`;
                      })()}
                    </div>
                  )}
                </div>
                <div className="font-bold text-lg text-blue-600">
                  {entry.weight} {entry.unit}
                </div>
              </div>
            ))}
            
            {weightEntries.length > 10 && (
              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  Showing 10 most recent entries. Total: {weightEntries.length} entries.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default WeightDiet;