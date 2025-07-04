import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-black text-white min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="max-w-3xl text-center">
 <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
            About Me
          </h2>        <p className="text-lg mb-4">
          I'm <span className="text-green-400 font-semibold">Aases Limbu</span> — an aspiring full stack developer passionate about building meaningful web apps, automation tools, and AI-powered assistants. 
        </p>
        <p className="text-lg mb-4">
          My work spans <span className="text-green-400">frontend design</span> with React + Tailwind, <span className="text-green-400">backend development</span> with .NET and PostgreSQL, and crafting intelligent bots with frameworks like Rasa.
        </p>
        <p className="text-lg mb-4">
          I'm fascinated by <span className="text-green-400">automation</span>, <span className="text-green-400">LLMs</span>, and creating assistants that blend technology and usability — always exploring, always learning.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <a href="#portfolio" className="bg-green-600 hover:bg-green-500 text-black px-4 py-2 rounded-xl transition">
            View Projects
          </a>
          <a href="#contact" className="border border-green-600 hover:bg-green-600 hover:text-black px-4 py-2 rounded-xl transition">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
