import React, { useState } from 'react';
import { User, Calendar, Pill, Scale, Utensils, MessageCircle } from 'lucide-react';
import PatientInfo from './components/PatientInfo';
import BloodSugar from './components/BloodSugar';
import Medications from './components/Medications';
import WeightDiet from './components/WeightDiet';
import FoodDiary from './components/FoodDiary';
import Messages from './components/Messages';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Use localStorage hook for data persistence
  const [patientInfo, setPatientInfo] = useLocalStorage('patientInfo', {
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    emergencyContact: '',
    diagnosisDate: ''
  });

  const [bloodSugarEntries, setBloodSugarEntries] = useLocalStorage('bloodSugarEntries', []);
  const [medications, setMedications] = useLocalStorage('medications', []);
  const [weightEntries, setWeightEntries] = useLocalStorage('weightEntries', []);
  const [foodDiary, setFoodDiary] = useLocalStorage('foodDiary', []);
  const [messages, setMessages] = useLocalStorage('messages', []);

  // Navigation tabs configuration
  const tabs = [
    { id: 'profile', label: 'Patient Info', icon: User, component: PatientInfo },
    { id: 'bloodsugar', label: 'Blood Sugar', icon: Calendar, component: BloodSugar },
    { id: 'medications', label: 'Medications', icon: Pill, component: Medications },
    { id: 'weight', label: 'Weight & Diet', icon: Scale, component: WeightDiet },
    { id: 'food', label: 'Food Diary', icon: Utensils, component: FoodDiary },
    { id: 'messages', label: 'Messages', icon: MessageCircle, component: Messages }
  ];

  // Get active component
  const activeTabConfig = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabConfig?.component;

  // Props to pass to components
  const componentProps = {
    profile: { 
      patientInfo, 
      setPatientInfo 
    },
    bloodsugar: { 
      bloodSugarEntries, 
      setBloodSugarEntries 
    },
    medications: { 
      medications, 
      setMedications 
    },
    weight: { 
      weightEntries, 
      setWeightEntries 
    },
    food: { 
      foodDiary, 
      setFoodDiary 
    },
    messages: { 
      messages, 
      setMessages 
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Diabetes Management App</h1>
          <p className="text-blue-100">Your personal health companion</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4">
        {ActiveComponent && (
          <ActiveComponent {...componentProps[activeTab]} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">Diabetes Management App - Your Personal Health Companion</p>
          <p className="text-xs text-gray-400 mt-1">
            For ages 18-65 • All data stored locally • Always consult your healthcare provider for medical decisions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;