# Brain Tumor Detection System

## Overview
A web-based application that uses deep learning to detect and classify brain tumors from MRI scans. The system provides real-time analysis and visualization of results with high accuracy predictions.

## Features
- Upload and analyze brain MRI scans
- Real-time tumor detection and classification 
- Interactive visualization of results
- Detailed analysis reports
- Professional medical recommendations
- User-friendly interface

## Tech Stack
### Frontend
- React 18
- Vite
- TailwindCSS
- React Router DOM
- Axios

### Backend
- Python
- Flask
- TensorFlow/Keras
- OpenCV
- NumPy

## Project Structure
```
braintumor_react/
├── backend/
│   ├── app.py                 # Flask server
│   ├── requirements.txt       # Python dependencies
│   ├── models/               
│   │   └── brain_tumor_classifier.h5  # ML model
│   └── uploads/              # Temporary image storage
├── src/
│   ├── components/           # React components
│   ├── pages/               # Page components
│   ├── assets/              # Static assets
│   ├── styles/              # CSS files
│   ├── App.jsx             # Main App component
│   └── main.jsx            # Entry point
└── public/                 # Public assets
```

## Installation

### Prerequisites
- Node.js (v14+)
- Python (3.8+)
- Git LFS (for handling large model files)

### Setup Frontend
```bash
# Clone the repository
git clone https://github.com/Kyoz004/BrainTumor-Prediction.git

# Navigate to project directory
cd BrainTumor-Prediction

# Install dependencies
npm install

# Start development server
npm run dev
```

### Setup Backend
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

## Usage
1. Start both frontend and backend servers
2. Access the application at `http://localhost:5173`
3. Navigate to the Diagnosis page
4. Upload an MRI scan image
5. Wait for the analysis to complete
6. View detailed results and recommendations

## Model Information
- Architecture: Xception CNN
- Training Dataset: Brain MRI Images
- Accuracy: 98.5%
- Classes: Multiple types of brain tumors

## Contributing
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors
- Kyoz004

## Acknowledgments
- VLU University
- Brain Tumor Research Society
- Medical professionals who provided guidance

## Contact
- GitHub: [@Kyoz004](https://github.com/Kyoz004)
- Email: kietdo14.it@gmail.com

## Version History
- 1.0.0: Initial Release
    - Basic tumor detection
    - Web interface
    - Analysis reports