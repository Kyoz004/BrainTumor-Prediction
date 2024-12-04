
# Brain Tumor Prediction Website 🧠

## Introduction
This project focuses on predicting brain tumors using advanced deep learning techniques. The goal is to identify and classify tumors in brain MRI scans, leveraging state-of-the-art models and image processing methods. The system provides accurate predictions, helping healthcare professionals in the diagnosis process.

## Implementation
1. Clone the repository and navigate to the project directory.
3. The main model used in this project is based on convolutional neural networks (CNNs). You can find my models notebooks from Kaggle: Link

## Usage
To run the brain tumor prediction website, use the following command:

```bash
python app.py 
```

## Features
- **Tumor Prediction**: Analyze MRI scans to predict whether a brain tumor is present and classify it into specific categories.
  
- **Image Preprocessing**: Automated preprocessing steps including resizing, normalization, and augmentation to improve model accuracy.
  
- **Visualization**: The system generates visual overlays on MRI scans, highlighting tumor regions when detected.

- **Output**: Generates prediction results including the classification label, probability score, and visual output (if applicable).

## Libraries Used
1. **argparse**: Command-line argument parsing.
2. **numpy**: Numerical operations.
3. **pandas**: Data manipulation and analysis.
4. **tensorflow/keras**: Deep learning framework used for model creation and training.
5. **opencv-python (cv2)**: Image processing and manipulation.
6. **matplotlib**: Visualization library for plotting and image display.

## Data Preparation
- The dataset used should include brain MRI images categorized based on tumor presence or absence.
- Images should be in a standardized format (e.g., PNG or JPEG) with clear labeling.
- Custom data preprocessing scripts are included in the `data_preprocessing/` directory.

## Contribution
To contribute to the project:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and open a pull request, clearly describing your modifications.

## Authors
- **Đỗ Lý Anh Kiệt**

