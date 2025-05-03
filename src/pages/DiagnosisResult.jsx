import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import ImageModal from '../components/ImageModal';

function DiagnosisResult() {
    const location = useLocation();
    const result = location.state?.result;
    const [showModal, setShowModal] = useState(false);

    if (!result) {
        return (
            <div className="diagnosis-result error">
                <h1>Error</h1>
                <p>No diagnosis results found. Please try analyzing an image first.</p>
                <Link to="/diagnosis" className="btn-primary">
                    Go to Diagnosis
                </Link>
            </div>
        );
    }

    const probabilityMatch = result.prediction.match(/(\d+\.?\d*)%/);
    const probability = probabilityMatch ? parseFloat(probabilityMatch[1]) : 0;
    const tumorTypeMatch = result.prediction.match(/Symptoms detected: ([^.]+)/);
    const tumorType = tumorTypeMatch ? tumorTypeMatch[1] : 'Unknown';

    const getConfidenceLevel = (prob) => {
        if (prob > 80) return { text: 'High Confidence', color: 'var(--success-color)' };
        if (prob > 60) return { text: 'Moderate Confidence', color: 'var(--warning-color)' };
        return { text: 'Low Confidence', color: 'var(--error-color)' };
    };

    const confidenceInfo = getConfidenceLevel(probability);

    return (
        <div className="results-page">
            <div className="results-header">
                <h1 className="results-title">Diagnosis Results</h1>
                <p className="results-timestamp">Analysis completed on {new Date().toLocaleString()}</p>
            </div>
            
            {/* Original MRI Scan section */}
            <div className="results-card">
                <h2 className="card-title">Original MRI Scan</h2>
                <div className="image-container">
                    <img 
                        src={result.image_url} 
                        alt="Original MRI Scan"
                        className="mri-scan"
                        onClick={() => setShowModal(true)}
                    />
                </div>
            </div>

            {/* Modal for enlarged view */}
            {showModal && (
                <ImageModal 
                    imageUrl={result.image_url}
                    onClose={() => setShowModal(false)}
                />
            )}

            {/* Analysis Results section */}
            <div className="results-card">
                <h2 className="card-title">Analysis Results</h2>
                <div className="prediction-details">
                    <div className="result-item">
                        <h3>Detected Condition</h3>
                        <div className="condition-badge" style={{ backgroundColor: confidenceInfo.color }}>
                            {tumorType}
                        </div>
                    </div>

                    <div className="result-item">
                        <h3>Confidence Level</h3>
                        <div className="confidence-section">
                            <div className="confidence-bar">
                                <div 
                                    className="confidence-fill"
                                    style={{ 
                                        width: `${probability}%`,
                                        backgroundColor: confidenceInfo.color
                                    }}
                                >
                                    {probability.toFixed(1)}%
                                </div>
                            </div>
                            <p className="confidence-text" style={{ color: confidenceInfo.color }}>
                                {confidenceInfo.text}
                            </p>
                        </div>
                    </div>

                    <div className="result-item">
                        <h3>Medical Recommendations</h3>
                        <ul className="recommendations-list">
                            <li>This is an AI-assisted preliminary analysis only</li>
                            <li>The system has detected patterns consistent with {tumorType}</li>
                            <li>Analysis confidence level is {probability.toFixed(1)}%</li>
                            <li>Please consult with a qualified medical professional for proper diagnosis</li>
                        </ul>
                    </div>
                </div>

                <div className="action-buttons">
                    <Link to="/diagnosis" className="btn btn-primary">
                        <i className="ri-microscope-line"></i>
                        Analyze Another Scan
                    </Link>
                    <button onClick={() => window.print()} className="btn btn-secondary">
                        <i className="ri-printer-line"></i>
                        Print Report
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DiagnosisResult;