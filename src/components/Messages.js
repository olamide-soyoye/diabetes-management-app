import React, { useState } from 'react';
import { MessageCircle, Send, User, AlertCircle, Clock } from 'lucide-react';

const Messages = ({ messages, setMessages }) => {
  const [formData, setFormData] = useState({
    recipient: 'physician',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.subject.trim()) {
      alert('Please enter a subject for your message.');
      return;
    }
    
    if (!formData.message.trim()) {
      alert('Please enter your message.');
      return;
    }

    const newMessage = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'sent',
      read: false
    };

    setMessages(prev => [newMessage, ...prev]);
    
    // Reset form
    setFormData({
      recipient: 'physician',
      subject: '',
      message: '',
      priority: 'normal'
    });

    alert('Message sent successfully to your healthcare provider!');
  };

  const recipientOptions = [
    { value: 'physician', label: 'Primary Physician' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'dietitian', label: 'Dietitian' },
    { value: 'pharmacist', label: 'Pharmacist' },
    { value: 'endocrinologist', label: 'Endocrinologist' },
    { value: 'other', label: 'Other Healthcare Provider' }
  ];

  const priorityOptions = [
    { value: 'normal', label: 'Normal', color: 'gray' },
    { value: 'urgent', label: 'Urgent', color: 'yellow' },
    { value: 'emergency', label: 'Emergency', color: 'red' }
  ];

  const commonSubjects = [
    'Blood Sugar Concerns',
    'Medication Question',
    'Side Effects',
    'Diet and Nutrition',
    'Appointment Request',
    'Test Results Question',
    'General Health Question'
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      normal: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
      urgent: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
      emergency: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
    };
    return colors[priority] || colors.normal;
  };

  return (
    <div className="space-y-6">
      {/* Send message form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Send Message to Healthcare Provider
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Send to <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.recipient}
                onChange={(e) => handleInputChange('recipient', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {recipientOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief subject line"
              required
            />
            
            {/* Common subjects quick select */}
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Quick select:</p>
              <div className="flex flex-wrap gap-1">
                {commonSubjects.map(subject => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleInputChange('subject', subject)}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-200"
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="6"
              placeholder="Describe your concern, question, or request in detail..."
              required
            />
            <div className="mt-1 text-xs text-gray-500">
              {formData.message.length}/1000 characters
            </div>
          </div>

          {/* Emergency notice */}
          {formData.priority === 'emergency' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-red-800 mb-1">Emergency Priority Selected</p>
                  <p className="text-red-700">
                    If this is a medical emergency, please call 911 immediately or go to your nearest emergency room. 
                    Do not rely on this messaging system for emergency medical care.
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </button>
        </form>
      </div>

      {/* Message history */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Message History ({messages.length})</h3>
        
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <MessageCircle className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">No messages sent yet.</p>
            <p className="text-sm text-gray-400 mt-1">Use the form above to communicate with your healthcare providers.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const priorityColors = getPriorityColor(message.priority);
              
              return (
                <div 
                  key={message.id} 
                  className={`border rounded-lg p-4 ${priorityColors.border} bg-gray-50`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <User className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-800 capitalize">
                          To: {message.recipient.replace(/([A-Z])/g, ' $1')}
                        </span>
                      </div>
                      <h4 className="font-semibold text-lg text-gray-800">{message.subject}</h4>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${priorityColors.bg} ${priorityColors.text}`}>
                        {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-700 leading-relaxed">{message.message}</p>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 border-t pt-2">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>
                      Sent on {new Date(message.timestamp).toLocaleDateString()} at {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;