import { useParams } from 'react-router-dom';
import type {Project} from '../components/ProjectSection'
import Header from '../components/Header';

let imgRoute = './../src/assets/img/portfolio/';
// let imgRoute = '/portfolio-site/src/assets/img/portfolio/';


const projects: Project[] = [
  {
    id: 1,
    title: "Nepal Knowledge Hub",
    url: "https://nephub.netlify.app/",
    demo: "https://youtu.be/zqHUMF9syFA?si=sWT9g7zHQQE74Z0N",
    desc: "An engaging web encyclopedia and quiz platform for curious Nepali youth, combining history, top figures, horoscope, and interactive content.",
    image: [`${imgRoute}nephub1.png`, `${imgRoute}nephub2.png`],
    category: "App"
  },
  {
    id: 2,
    title: "SmartGov Bot",
    url: "https://www.gov.il/en",
    demo: "https://youtu.be/xycd6Kgk27c?si=ECq9LVrmywYCXmSi",
    desc: "Conversational AI assistant that helps Nepali citizens navigate and fill out government forms with speech and text input support.",
    image: [`${imgRoute}smartgov_bot.png`],
    category: "App"
  },
  {

    id: 3,
    title: "MyDoctor App",
    url: "https://mydoctor.health",
    demo: "https://mydoctor.health/demo",
    desc: "A virtual clinic app offering health record tracking, online consultations, and medication reminders, especially for rural Nepali communities.",
    image: [`${imgRoute}branding-1.jpg`],
    category: "App"
  },
  {
    id: 4,
    title: "Joni Mitchell Portrait",
    url: "https://ashislimbu.art/joni",
    desc: "A digital art tribute to Joni Mitchell, reflecting themes of nostalgia, resilience, and creativity in a surreal color palette.",
    image: [`${imgRoute}joni_mitchel.png`],
    category: "Art"
  },
  {
    id: 5,
    title: "Through the Mist",
    url: "https://ashislimbu.art/mist",
    desc: "An experimental generative artwork exploring themes of memory and obscurity using procedural fog patterns and poetry overlays.",
    image: [`${imgRoute}hero1.jpg`],
    category: "Art"
  },
];


const ProjectPage: React.FC = () => {
  const params = useParams();
  const id = parseInt(params.id || '', 10);
  const p = projects.find((proj) => proj.id === id);

  if (!p) return <div className="text-red-400">Project not found</div>;

  return <ProjectDetails {...p} />;
};




const ProjectDetails: React.FC<Project> = (project) => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header isMainPage={false} />

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Image section */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
            <img src={project.image[0]} alt={project.title} className="w-full object-cover" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-green-400">{project.title}</h1>
            <p className="text-gray-300 leading-relaxed">{project.desc}</p>
            <div className="flex gap-4 mt-4">
              {project.url && (
                <a
                  href={project.url}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 text-black font-semibold rounded-lg hover:brightness-110 transition"
                  target="_blank" rel="noopener noreferrer"
                >
                  Visit Site
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 text-white font-semibold rounded-lg hover:brightness-110 transition"
                  target="_blank" rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Image gallery (if more than one image) */}
        {project.image.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.image.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg border border-gray-700">
                <img src={img} alt={`${project.title} ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        )}

        {/* Project metadata section */}
        <div className="bg-gray-900/80 border border-gray-800 p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-xl font-semibold text-emerald-300 mb-2">Project Details</h2>
          <div className="text-gray-400">
            <p><span className="text-gray-500">Project Type:</span> {project.category}</p>
            {project.url && <p><span className="text-gray-500">Website:</span> <a href={project.url} className="text-blue-400 hover:underline">{project.url}</a></p>}
            {project.demo && <p><span className="text-gray-500">Demo:</span> <a href={project.demo} className="text-pink-400 hover:underline">{project.demo}</a></p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
