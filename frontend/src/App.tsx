import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PortfolioDetails from "./pages/ProjectDetails"
import ProjectPage from "./pages/ProjectDetails"
// import About from "./components/AboutSection"

function App() {
  
  return (
    <>
    <BrowserRouter>  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio-details/:id" element={<ProjectPage />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
