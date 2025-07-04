import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ProjectPage from "./pages/ProjectDetails"
// import About from "./components/AboutSection"

function App() {
  
  return (
    <>
    <BrowserRouter basename="/portfolio-site">  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio-details/:id" element={<ProjectPage />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
