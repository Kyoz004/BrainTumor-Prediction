# DeepLearning Brain Tumor Classifier 🧠

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
- Git LFS (required for model file download)

### Git LFS Setup
```bash
# Install Git LFS
# Windows (using chocolatey)
choco install git-lfs

# Or download from https://git-lfs.github.com

# Initialize Git LFS
git lfs install
```

### Clone Repository
```bash
# Clone with Git LFS to get the full model file (137MB)
git lfs clone https://github.com/Kyoz004/DeepLearning-BrainTumor-Classifier.git

# Navigate to project directory
cd DeepLearning-BrainTumor-Classifier

# Verify model file size (should be ~137MB)
dir backend\models\brain_tumor_classifier.h5
```

### Setup Frontend
```bash
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

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Verify model file integrity
python -c "import h5py; h5py.File('models/brain_tumor_classifier.h5', 'r')"

# Start Flask server
python app.py
```

### Troubleshooting Model File
If the model file is only 135KB:
```bash
# Clean Git LFS cache
git lfs prune

# Force download LFS objects
git lfs pull
git lfs checkout

# Verify file size again
dir backend\models\brain_tumor_classifier.h5
```

Alternative model file sources:
1. [Kaggle Notebook](https://www.kaggle.com/code/kietdo104/xception-finetuned-brainmritumor-classifier)
2. Contact repository owner for direct download

## Usage
1. Start both frontend and backend servers
2. Access the application at `http://localhost:5173`
3. Navigate to the Diagnosis page
4. Upload an MRI scan image
5. Wait for the analysis to complete
6. View detailed results and recommendations

## Model Information
- Architecture: Xception CNN
- File Size: 137MB (full model)
- Format: HDF5 (.h5)
- Accuracy: 98.5%
- Classes: Multiple types of brain tumors

## Research & Development
### Model Training
The brain tumor classification model was developed and trained using Kaggle's GPU accelerator. You can explore the complete training process, methodology, and implementation details here:
- 📊 [Kaggle Notebook: Xception Fine-tuned Brain MRI Tumor Classifier](https://www.kaggle.com/code/kietdo104/xception-finetuned-brainmritumor-classifier)

### Model Architecture
The system utilizes a fine-tuned Xception model, which has been specifically optimized for medical image classification tasks. The model achieves high accuracy through:
- Transfer Learning from ImageNet weights
- Custom fine-tuning for brain tumor detection
- Advanced data augmentation techniques
- Optimization for medical imaging specifics

## Dataset
The model was trained on a comprehensive dataset of brain MRI scans, including:
- Multiple tumor types and classifications
- Various scanning angles and conditions
- Different medical imaging equipment outputs
- Diverse patient demographics

## Contributing
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors
- Kyoz004 (Lead Developer)

## Acknowledgments
- Van Lang University

## Contact
- GitHub: [@Kyoz004](https://github.com/Kyoz004)
- Email: kietdo14.it@gmail.com
- Kaggle: [kietdo104](https://www.kaggle.com/kietdo104)

## Version History
### v1.1 (May 2025)
- Enhanced visualization features
- Improved model accuracy to 98.5%
- Advanced analysis reporting
- Real-time detection optimization
- Git LFS integration for model distribution
- Integration with Kaggle notebook

### v1.0 (April 2025)
- Initial release
- Basic tumor detection
- Web interface implementation
- Model development and training
