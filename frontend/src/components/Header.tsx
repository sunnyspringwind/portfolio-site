import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  isMainPage: boolean;
}

const Header: React.FC<HeaderProps> = ({isMainPage}) => {
  const navItems = [
    { name: "Home", path: "#hero" },
    { name: "About", path: "#about" },
    { name: "Portfolio", path: "#portfolio" },
    { name: "Roadmap", path: "#roadmap" },
    { name: "Contact", path: "#contact" },
  ];

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (path: string) => {
  if (isMainPage) {
    document.getElementById(path.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  } else {
    sessionStorage.setItem("scrollTarget", path.replace("#", ""));
    navigate("/"); // Go to home
  }
};

useEffect(() => {
  const target = sessionStorage.getItem("scrollTarget");
  if (target) {
    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("scrollTarget");
    }, 100); // slight delay for DOM to load
  }
}, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      let currentSection = "hero";

      navItems.forEach(({ path }) => {
        const sectionId = path.replace("#", "");
        const section = document.getElementById(sectionId);
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPos >= offsetTop) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownClasses =
    "absolute opacity-0 scale-95 translate-y-2 pointer-events-none transition duration-300 ease-out delay-300 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:delay-0 bg-slate-900 border ml-2 text-white";

  return (
    <header
      id="header"
      className="z-50 fixed top-0 bg-black/80 backdrop-blur-md w-screen h-auto text-white"
    >
      <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">Personal</h1>

        {/* Desktop Menu */}
        <nav className="hidden sm:block">
          <ul className="flex gap-8 text-center">
            {navItems.map((item) =>
              item.name === "Dropdown" ? (
                <li
                  key={item.path}
                  className="hover:text-green-600 relative group cursor-pointer"
                >
                  {item.name}
                  <ul className={dropdownClasses}>
                    <li className="px-4 py-2 hover:text-green-600">Option 1</li>
                    <li className="px-4 py-2 hover:text-green-600">Option 2</li>
                    <li className="px-4 py-2 hover:text-green-600 group">
                      Option 3
                      <ul className={dropdownClasses}>
                        <li className="px-4 py-2 hover:text-green-600">
                          Option 1
                        </li>
                        <li className="px-4 py-2 hover:text-green-600">
                          Option 2
                        </li>
                        <li className="px-4 py-2 hover:text-green-600">
                          Option 3
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              ) : (
                <li key={item.path}>
                  <button
                    onClick={() => {setMobileMenuOpen(false);handleClick(item.path)}}
                    className={`transition-all duration-300 hover:text-green-400 ${
                      activeSection === item.path.replace("#", "")
                        ? "text-green-400 font-semibold shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                        : "text-white"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="sm:hidden flex items-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              // Close icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <nav
        className={`sm:hidden bg-black/90 backdrop-blur-md transition-max-height duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-6 text-center">
          {navItems.map((item) =>
            item.name === "Dropdown" ? (
              <li
                key={item.path}
                className="hover:text-green-600 relative group cursor-pointer"
              >
                {item.name}
                <ul className={dropdownClasses}>
                  <li className="px-4 py-2 hover:text-green-600">Option 1</li>
                  <li className="px-4 py-2 hover:text-green-600">Option 2</li>
                  <li className="px-4 py-2 hover:text-green-600 group">
                    Option 3
                    <ul className={dropdownClasses}>
                      <li className="px-4 py-2 hover:text-green-600">
                        Option 1
                      </li>
                      <li className="px-4 py-2 hover:text-green-600">
                        Option 2
                      </li>
                      <li className="px-4 py-2 hover:text-green-600">
                        Option 3
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            ) : (
              <li key={item.path}>
                <button
                  onClick={() => {setMobileMenuOpen(false); handleClick(item.path)}} // close menu on link click
                  className={`block w-full transition-all duration-300 hover:text-green-400 ${
                    activeSection === item.path.replace("#", "")
                      ? "text-green-400 font-semibold shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
