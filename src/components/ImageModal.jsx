import React from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <img src={imageUrl} alt="Enlarged view" className="modal-image" />
            </div>
        </div>
    );
};

export default ImageModal;