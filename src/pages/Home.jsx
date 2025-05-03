import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="main-content">
            <section className="introduction">
                <div className="intro-text">
                    <h2>Brain Tumor Diagnosis Support System</h2>
                    <p>Welcome to our Brain Tumor Diagnosis Support System. We provide advanced AI-powered analysis to assist in the early detection and diagnosis of brain tumors. Our system helps medical professionals make more informed decisions through accurate image analysis and comprehensive reporting.</p>
                </div>
                <div className="intro-image">
                    <img src="/src/assets/images/ung_thu_nao.png" alt="Brain Tumor Illustration" />
                </div>
            </section>

            <section className="options">
                <h3>Our Services</h3>
                <div className="option-buttons">
                    <div className="option-button-wrapper">
                        <Link to="/diagnosis" className="option-button">
                            <i className="ri-microscope-line"></i> AI Diagnosis
                        </Link>
                        <div className="description">
                            Upload brain MRI scans for AI-powered tumor detection
                        </div>
                    </div>

                    <div className="option-button-wrapper">
                        <Link to="#" className="option-button">
                            <i className="ri-file-chart-line"></i> View Reports
                        </Link>
                        <div className="description">
                            Access and analyze your diagnostic history
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home