import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header className="header">
            <nav className="nav container">
                <Link to="/" className="nav__logo">
                    <i className="ri-brain-line"></i> BrainTumor Society
                </Link>

                <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`}>
                    <ul className="nav__list">
                        <li className="dropdown__item">
                            <div className="nav__link">
                                Analytics <i className="ri-arrow-down-s-line dropdown__arrow"></i>
                            </div>

                            <ul className="dropdown__menu">
                                <li>
                                    <Link to="/diagnosis" className="dropdown__link">
                                        <i className="ri-file-list-line"></i> Diagnosis
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/reports" className="dropdown__link">
                                        <i className="ri-bar-chart-line"></i> Reports
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="dropdown__item">
                            <div className="nav__link">
                                Brain Tumors <i className="ri-arrow-down-s-line dropdown__arrow"></i>
                            </div>

                            <ul className="dropdown__menu">
                                <li>
                                    <Link to="/types" className="dropdown__link">
                                        <i className="ri-microscope-line"></i> Types & Symptoms
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/treatments" className="dropdown__link">
                                        <i className="ri-medicine-bottle-line"></i> Treatments
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav__item">
                            <Link to="/about" className="nav__link">
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="nav__toggle" onClick={toggleMenu}>
                    <i className={`ri-${showMenu ? 'close' : 'menu'}-line`}></i>
                </div>
            </nav>
        </header>
    );
}

export default Header;