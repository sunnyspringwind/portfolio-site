import { useState } from "react";

type Project = {
  id: number;
  title: string;
  url?: string;
  desc: string;
  demo?: string;  
  image: string[];
  category: "App" | "Product" | "API" | "Art";
};

let imgRoute = './../src/assets/img/portfolio/';

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


const ProjectsSection = () => {
  const [filter, setFilter] = useState<"All" | Project["category"]>("All");

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-16 pt-18 bg-black text-white">
      <div className="container mx-auto px-4">
 <h2 className="text-4xl text-center md:text-6xl font-bold my-10 md:mb-4 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
            Portfolio
          </h2>
        <ul className="flex flex-wrap justify-center gap-4 mb-8">
          {["All", "App", "Product", "API", "Art"].map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer px-4 py-2 rounded ${
                filter === cat ? "bg-green-600" : "bg-gray-700"
              } hover:bg-green-500 transition`}
              onClick={() => setFilter(cat as any)}
            >
              {cat}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div key={p.id} className="bg-gray-800 rounded shadow overflow-hidden">
              <img src={p.image[0]} alt={p.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold">{p.title}</h4>
                <p className="text-gray-400 text-sm">{p.desc}</p>
                <div className="flex space-x-4 mt-2">
                  <a href={p.image[0]} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                    <i className="bi bi-zoom-in"></i> Preview
                  </a>
                  <a href={`/portfolio-details/${p.id}`} className="text-green-400 hover:text-green-300">
                    <i className="bi bi-link-45deg"></i> Details
                  </a>

                {/* <button onClick={()=><ProjectDetails id={p.id} title={p.title} desc={p.desc} image={p.image} category={p.category} />} className="text-green-400 hover:text-green-300">
                    <i className="bi bi-link-45deg"></i> <a href="`/portfolio-details/${p.id}`"> Details</a>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
export type {Project};
