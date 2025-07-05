import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ProjectPage from "./pages/ProjectDetails"
// import About from "./components/AboutSection"

function App() {
  
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project-details/:id" element={<ProjectPage />} />
                    {/* Add a catch-all route for GitHub Pages */}
          <Route path="*" element={<Navigate to='/' />}/>
        </Routes>
    </>
  )
}

export default App
