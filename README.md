# Diabetes Management App

A comprehensive React application for Type 2 diabetes patients (ages 18-65) to manage their health information, track blood sugar levels, medications, weight, diet, and communicate with healthcare providers.

## 📋 Features

### Complete Feature Set
- **Patient Information Management** - Store personal and medical information
- **Blood Sugar Monitoring** - Track up to 4 readings per day with visual indicators
- **Medication Tracking** - Manage current medications with dosages and frequencies
- **Weight & Diet Management** - Monitor weight changes and trends
- **Food Diary** - Log breakfast, lunch, dinner, and snacks (mid-morning & evening)
- **Healthcare Communication** - Send messages to physicians and nurses 

## Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
```bash
npm install lucide-react tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Start Development Server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage Guide

### Patient Information
- Enter personal details including name, age (18-65), contact information
- Record diabetes diagnosis date
- Save emergency contact information

### Blood Sugar Tracking
- Record up to 4 readings daily (fasting, before lunch, before dinner, bedtime)
- View color-coded results (green=normal, yellow=elevated, red=concerning)
- Track trends and averages over time

### Medication Management
- Add current medications with strength, frequency, and dosage instructions
- Track prescribing physician
- Remove medications as needed

### Weight & Diet Monitoring
- Log weight entries with dates and notes
- View weight trends and statistics
- Track changes over time

### Food Diary
- Log all meals: breakfast, lunch, dinner
- Record mid-morning and evening snacks
- View nutrition tips and meal planning suggestions

### Healthcare Communication
- Send messages to physicians, nurses, or other providers
- Set priority levels (normal, urgent, emergency)
- Track message history

## Data Storage

All data is stored locally in the browser using localStorage:
- **Persistent Storage**: Data survives browser sessions
- **Privacy First**: No data sent to external servers
- **Offline Capable**: Works without internet connection
- **Export Ready**: Data can be easily accessed for backup


## Health Metrics

### Blood Sugar Targets
- **Fasting**: 80-99 mg/dL (Normal)
- **Post-meal**: <140 mg/dL (Normal)
- **Visual indicators** for out-of-range values

### Weight Management
- **Trend tracking** with visual indicators
- **BMI considerations** for healthy ranges
- **Progress monitoring** over time

## Development

### Build for Production
```bash
npm run build
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Version**: 1.0.0  
**Target Audience**: Type 2 diabetes patients (ages 18-65)  
**Platform**: Web browsers with JavaScript support  
**Dependencies**: React 18+, Tailwind CSS, Lucide React icons