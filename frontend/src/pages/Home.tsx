import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProjectSection from "../components/ProjectSection";
import RoadmapSection from "../components/RoadmapSection";

const Home = () => (
  <div className="w-full h-screen">
    <Header isMainPage={true} />
    <HeroSection />
    <AboutSection />
    <ProjectSection />
    <RoadmapSection />
    <ContactSection />
  </div>
);

export default Home;
