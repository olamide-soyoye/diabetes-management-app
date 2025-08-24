import React, { useState } from 'react';
import { Plus, Utensils, Coffee, Sun, Moon } from 'lucide-react';

const FoodDiary = ({ foodDiary, setFoodDiary }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    breakfast: '',
    midMorningSnack: '',
    lunch: '',
    dinner: '',
    eveningSnack: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if at least one meal is filled
    const hasContent = Object.entries(formData)
      .filter(([key]) => key !== 'date')
      .some(([, value]) => value.trim());
    
    if (!hasContent) {
      alert('Please enter at least one meal or snack.');
      return;
    }

    const newEntry = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };

    setFoodDiary(prev => [newEntry, ...prev]);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      breakfast: '',
      midMorningSnack: '',
      lunch: '',
      dinner: '',
      eveningSnack: ''
    });

    alert('Food diary entry saved successfully!');
  };

  const mealSections = [
    {
      key: 'breakfast',
      label: 'Breakfast',
      icon: Sun,
      color: 'orange',
      placeholder: 'What did you have for breakfast?'
    },
    {
      key: 'midMorningSnack',
      label: 'Mid-Morning Snack',
      icon: Coffee,
      color: 'yellow',
      placeholder: 'Mid-morning snack (if any)'
    },
    {
      key: 'lunch',
      label: 'Lunch',
      icon: Utensils,
      color: 'green',
      placeholder: 'What did you have for lunch?'
    },
    {
      key: 'dinner',
      label: 'Dinner',
      icon: Utensils,
      color: 'blue',
      placeholder: 'What did you have for dinner?'
    },
    {
      key: 'eveningSnack',
      label: 'Evening Snack',
      icon: Moon,
      color: 'purple',
      placeholder: 'Evening snack after supper (if any)'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
      yellow: { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
      green: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
      blue: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
      purple: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Food diary form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Daily Food Diary</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mealSections.map((meal) => {
              const Icon = meal.icon;
              const colorClasses = getColorClasses(meal.color);
              
              return (
                <div key={meal.key} className={`p-4 ${colorClasses.bg} ${colorClasses.border} border rounded-lg`}>
                  <label className={`flex items-center text-sm font-medium ${colorClasses.text} mb-2`}>
                    <Icon className="w-4 h-4 mr-2" />
                    {meal.label}
                  </label>
                  <textarea
                    value={formData[meal.key]}
                    onChange={(e) => handleInputChange(meal.key, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                    rows="3"
                    placeholder={meal.placeholder}
                  />
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Save Food Diary Entry
            </button>
          </div>
        </form>
      </div>

      {/* Food diary history */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Food Diary History</h3>
        
        {foodDiary.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Utensils className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">No food diary entries recorded yet.</p>
            <p className="text-sm text-gray-400 mt-1">Start tracking your meals above.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {foodDiary.slice(0, 7).map((entry) => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg text-gray-800">{entry.date}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mealSections.map((meal) => {
                    const content = entry[meal.key];
                    if (!content) return null;
                    
                    const Icon = meal.icon;
                    const colorClasses = getColorClasses(meal.color);
                    
                    return (
                      <div key={meal.key} className={`p-3 ${colorClasses.bg} rounded-md`}>
                        <div className={`flex items-center font-medium ${colorClasses.text} mb-2`}>
                          <Icon className="w-4 h-4 mr-2" />
                          {meal.label}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
                      </div>
                    );
                  })}
                </div>
                
                {/* Show empty state if no meals recorded */}
                {mealSections.every(meal => !entry[meal.key]) && (
                  <p className="text-gray-500 text-center py-4">No meals recorded for this day.</p>
                )}
              </div>
            ))}
            
            {foodDiary.length > 7 && (
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  Showing 7 most recent entries. Total: {foodDiary.length} entries.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nutrition tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">Healthy Eating Tips for Diabetes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <ul className="space-y-1">
            <li>• Choose whole grains over refined grains</li>
            <li>• Fill half your plate with non-starchy vegetables</li>
            <li>• Include lean protein at each meal</li>
            <li>• Limit sugary drinks and desserts</li>
          </ul>
          <ul className="space-y-1">
            <li>• Eat regular, balanced meals</li>
            <li>• Watch portion sizes</li>
            <li>• Choose healthy fats like nuts and olive oil</li>
            <li>• Stay hydrated with water</li>
          </ul>
        </div>
      </div>

      {/* Meal planning tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-800 mb-2">Meal Planning Suggestions</h4>
        <div className="text-sm text-green-700">
          <p className="mb-2"><strong>Diabetes-Friendly Food Ideas:</strong></p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-medium">Proteins:</p>
              <p>Fish, chicken, beans, eggs, tofu</p>
            </div>
            <div>
              <p className="font-medium">Vegetables:</p>
              <p>Broccoli, spinach, peppers, tomatoes</p>
            </div>
            <div>
              <p className="font-medium">Whole Grains:</p>
              <p>Brown rice, quinoa, oats, whole wheat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDiary;