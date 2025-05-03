import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import tensorflow as tf
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Set the backend to Agg before importing pyplot
import matplotlib.pyplot as plt
from PIL import Image
import io
import base64
import sys
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Define base directory and model paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'brain_tumor_classifier.h5')

# Define the class dictionary
class_dict = {
    'Glioma\n(U thần kinh đệm)': 0,
    'Meningioma\n(U màng não)': 1,
    'No Tumor\n(Bình thường)': 2,
    'Pituitary\n(U tuyến yên)': 3
}

# Load the machine learning model
try:
    logger.info(f"Attempting to load model from: {MODEL_PATH}")
    
    # Configure TensorFlow for CPU usage and memory growth
    gpus = tf.config.experimental.list_physical_devices('GPU')
    if gpus:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
    
    # Define input image shape
    img_shape = (299, 299, 3)
    
    # Create base model using Xception
    base_model = tf.keras.applications.Xception(
        include_top=False,
        weights="imagenet",
        input_shape=img_shape,
        pooling='max'
    )
    
    # Freeze layers
    for layer in base_model.layers[:120]:
        layer.trainable = False
    
    # Build the model
    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.Flatten(),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(128,
                            activation='relu',
                            kernel_regularizer=tf.keras.regularizers.l2(0.02)),
        tf.keras.layers.Dropout(0.4),
        tf.keras.layers.Dense(4, activation='softmax')
    ])
    
    # Compile model
    model.compile(
        optimizer=tf.keras.optimizers.Adamax(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Load the saved model weights
    model.load_weights(MODEL_PATH)
    logger.info("Model loaded successfully")
    
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predict_image(image_path, img_size=(299, 299)):
    try:
        # Load and preprocess the image
        img = Image.open(image_path).convert('RGB')
        img = img.resize(img_size)
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Make prediction
        predictions = model.predict(img_array, verbose=0)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx] * 100)

        # Get class name
        predicted_class = [k for k, v in class_dict.items() if v == predicted_class_idx][0]

        # Create visualization
        plt.figure(figsize=(15, 15))
        
        # Plot original image
        plt.subplot(2, 1, 1)
        plt.imshow(img)
        plt.title('Original MRI Scan', pad=20)
        plt.axis('off')

        # Plot probability bar chart
        plt.subplot(2, 1, 2)
        classes = list(class_dict.keys())
        probs = predictions[0] * 100
        bars = plt.bar(classes, probs, color='skyblue')
        plt.ylim(0, 100)
        plt.ylabel('Probability (%)', fontsize=12)
        plt.xticks(rotation=45, ha='right')
        
        # Add value labels on bars
        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2., height,
                    f'{height:.1f}%',
                    ha='center', va='bottom')

        plt.tight_layout()

        # Save plot to buffer
        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png', bbox_inches='tight', dpi=100)
        img_buffer.seek(0)
        plt.close()

        plot_url = base64.b64encode(img_buffer.getvalue()).decode()
        
        # Create diagnosis message
        message = f"Symptoms detected: {predicted_class}. Based on your MRI scan, there is a {confidence:.2f}% probability. Please consult a medical professional for further evaluation."
        
        return plot_url, message

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise

@app.route('/api/predict', methods=['POST'])
def upload_image():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400

        # Create uploads directory if it doesn't exist
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(filepath)
            plot_url, diagnosis_message = predict_image(filepath)
        finally:
            # Clean up uploaded file
            if os.path.exists(filepath):
                os.remove(filepath)
        
        return jsonify({
            'image_url': f"data:image/png;base64,{plot_url}",
            'prediction': diagnosis_message
        })
            
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)