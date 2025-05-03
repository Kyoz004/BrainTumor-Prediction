import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Diagnosis() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const handleDragOver = (e) => {
        e.preventDefault()
        e.currentTarget.classList.add('hover')
    }

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('hover')
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.currentTarget.classList.remove('hover')
        const file = e.dataTransfer.files[0]
        handleFile(file)
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        handleFile(file)
    }

    const handleFile = (file) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file')
                return
            }
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onload = () => {
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(file)
            setError('')
        }
    }

    const removeImage = () => {
        setSelectedFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedFile) {
            setError('Please select an image to upload')
            return
        }

        setLoading(true)
        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            const response = await fetch('http://localhost:5000/api/predict', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const result = await response.json()
            navigate('/diagnosis-result', { state: { result } })
        } catch (err) {
            setError('Failed to upload image. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="diagnosis-page">
            <div className="upload-section">
                <h1 className="upload-title">Upload MRI Scan</h1>
                <p className="upload-description">
                    Please upload a clear MRI scan image for analysis. The system supports common image formats (JPEG, PNG).
                </p>

                {loading && (
                    <div className="preloader">
                        <div className="spinner"></div>
                        <p>Analyzing image...</p>
                    </div>
                )}

                <div 
                    className={`drop-area ${selectedFile ? 'has-file' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {!selectedFile ? (
                        <>
                            <i className="ri-upload-cloud-2-line drop-icon"></i>
                            <p>Drag and drop an image here or click to select</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                        </>
                    ) : (
                        <div className="preview-section">
                            <img src={previewUrl} alt="Preview" className="preview-image" />
                        </div>
                    )}
                </div>

                {error && <div className="error-message">{error}</div>}

                {selectedFile && (
                    <div className="action-buttons">
                        <button className="btn btn-secondary" onClick={removeImage}>
                            <i className="ri-delete-bin-line"></i>
                            Remove Image
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            <i className="ri-microscope-line"></i>
                            Analyze Image
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Diagnosis