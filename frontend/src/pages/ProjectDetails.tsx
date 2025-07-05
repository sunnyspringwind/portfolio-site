import { useParams } from 'react-router-dom';
import type {Project} from '../components/ProjectSection'
import Header from '../components/Header';

import { projectList } from '../components/ProjectSection'



const ProjectPage: React.FC = () => {
  const params = useParams();
  const id = parseInt(params.id || '', 10);
  const p = projectList.find((proj: Project) => proj.id === id);

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
