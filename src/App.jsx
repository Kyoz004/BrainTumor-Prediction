import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Diagnosis from './pages/Diagnosis'
import DiagnosisResult from './pages/DiagnosisResult'
import './App.css'
import './styles/styles.css'  // Updated import path

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/diagnosis-result" element={<DiagnosisResult />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
