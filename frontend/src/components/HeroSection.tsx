import { BsFacebook, BsGithub, BsEnvelope } from "react-icons/bs";
import { ReactTyped } from "react-typed";

import hero1 from '../assets/images/portfolio/hero1.jpg';

const HeroSection: React.FC = () => {

    let reachMeClass =  'p-2 rounded-full bg-black'

  return (
    <section id="hero" className="relative bg-gray-900 text-white max-h-full overflow-hidden">
      <img
        title="me clicks memories"
        src={hero1}
        className="w-full object-cover opacity-60"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center md:pl-10">
 <h2 className="text-4xl  md:text-6xl font-bold  sm:mb-4 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
            Ashish Limbu
          </h2>        <p className="text-lg md:text-2xl mb-6">
          I'm{" "}
          <span className="text-green-400 font-semibold">
           <ReactTyped
    strings={["Living Thing", "Developer", "AI Enthusiast", 'Artist']}
    typeSpeed={50}
    backSpeed={40}
    loop
    className="text-green-400 font-semibold underline underline-offset-8"
  />
          </span>
        </p>
        <ul className="flex space-x-4">
          <li className={reachMeClass}>
            <a
              href="https://github.com/sunnyspringwind/"
              className="hover:text-green-400 text-xl"
            >
              <BsGithub />
            </a>
          </li>
          <li className={reachMeClass}>
            <a
              href="https://www.facebook.com/wAnnabe.wiZzarD"
              className="hover:text-green-400 text-xl"
            >
              <BsFacebook />
            </a>
          </li>
          <li className={reachMeClass}>
            <a
              href="aaseslimbu2@gmail.com/"
              className="hover:text-green-400 text-xl"
            >
              <BsEnvelope />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HeroSection;
