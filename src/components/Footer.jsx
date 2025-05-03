import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <div className="social-links">
                            <a href="#"><i className="ri-facebook-circle-line"></i></a>
                            <a href="#"><i className="ri-instagram-line"></i></a>
                            <a href="#"><i className="ri-linkedin-box-line"></i></a>
                        </div>
                        <ul className="footer-links">
                            <li><Link to="/diagnosis">Diagnosis</Link></li>
                            <li><Link to="/reports">Reports</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                        </ul>
                        <img src="/src/assets/images/Logo_VLU.png" alt="BrainTumor Society Logo" className="footer-logo" />
                        <p className="footer-copy">&copy; {new Date().getFullYear()} BrainTumor Society. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer