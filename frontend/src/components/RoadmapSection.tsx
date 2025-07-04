import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Target,
  Clock,
  Wrench,
  Lightbulb,
  CheckCircle,
  Circle,
} from "lucide-react";
import FortuneCookie from "../services/FortuneCookie";

type RoadmapPhase = {
  id: number;
  title: string;
  duration: string;
  goals: string[];
  tools?: string[];
  handsOn?: string[];
  completed?: boolean;
};

const appliedAIRoadmap: RoadmapPhase[] = [
  {
    id: 1,
    title: "Phase 1 — Foundations",
    duration: "2 months",
    goals: [
      "Understand conversational AI basics: intents, entities, slot filling, dialogue management",
      "Learn Rasa concepts: NLU, stories, rules, forms, custom actions",
      "Build simple bots: FAQ bot, form-filling bot",
      "Learn LLM basics: transformer models, common LLM tasks (classification, QA, generation)",
    ],
    tools: [
      "Rasa framework",
      "Hugging Face Transformers (pipeline API)",
      "Python (intermediate)",
    ],
    handsOn: [
      "Build a Rasa bot handling multiple intents and APIs",
      "Use Hugging Face pipeline API for pretrained classification and QA models",
    ],
    completed: true,
  },
  {
    id: 2,
    title: "Phase 2 — Intermediate orchestration",
    duration: "ongoing",
    goals: [
      "Integrate LLMs into bot workflows, augment or replace Rasa intent classifier",
      "Use LLMs for fallback and smart responses",
      "Learn LangChain or equivalent for RAG pipelines and combining knowledge base + LLM",
      "Build lightweight backend APIs with FastAPI or Flask",
    ],
    tools: ["LangChain", "FastAPI or Flask"],
    handsOn: [
      "Upgrade SmartGov bot: external API data, augment Rasa with LLM for complex queries",
    ],
    completed: false,
  },
  {
    id: 3,
    title: "Phase 3 — Advanced application engineering",
    duration: "3-6 months",
    goals: [
      "Master LangChain chains, agents, tools for tool-using bots",
      "Integrate memory and RAG systems for knowledge-augmented bots",
      "Learn deployment and scaling: Docker, CI/CD, model and API versioning",
    ],
    handsOn: [
      "Create assistant answering complex knowledge-base questions with multi-turn conversation",
    ],
    completed: false,
  },
  {
    id: 4,
    title: "Phase 4 — Polishing and beyond",
    duration: "6-∞ so on...",
    goals: [
      "Explore voice integration",
      "Learn monitoring and analytics tools (Rasa X, Botpress analytics)",
      "Study bot failure cases and fallback strategies for robust design",
    ],
    completed: false,
  },
];

const RoadmapSection = () => {
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(
    new Set([1])
  );

  const togglePhase = (phaseId: number) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const getStatusIcon = (phase: RoadmapPhase) => {
    return phase.completed ? (
      <CheckCircle className="w-6 h-6 text-green-400" />
    ) : (
      <Circle className="w-6 h-6 text-gray-500" />
    );
  };

  const getPhaseStyles = (phase: RoadmapPhase) => {
    const isExpanded = expandedPhases.has(phase.id);

    if (phase.completed) {
      return {
        border: "border-green-500/30",
        bg: isExpanded ? "bg-green-900/10" : "bg-gray-900",
        hover: "hover:bg-green-900/20 hover:border-green-400/50",
        dot: "bg-green-500 ring-4 ring-green-500/20",
      };
    } else {
      return {
        border: "border-gray-800",
        bg: "bg-gray-900",
        hover: "hover:bg-gray-800 hover:border-green-500/50",
        dot: "bg-gray-600 ring-2 ring-gray-600/30",
      };
    }
  };

  return (
    <div id="roadmap" className="relative min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold pt-10 my-10 md:mb-4 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
            Applied AI Learning Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A thoughtful progression through conversational AI and LLM
            integration
          </p>
          <div className="mt-6 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-gray-500" />
              <span className="text-gray-400">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">Completed</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 rounded-full"></div>

          {appliedAIRoadmap.map((phase) => {
            const styles = getPhaseStyles(phase);
            const isExpanded = expandedPhases.has(phase.id);

            return (
              <div key={phase.id} className="relative mb-8 ">
                {/* Phase dot */}
                <div
                  className={`absolute left-6 w-4 h-4 rounded-full border-4 border-black z-10 transition-all duration-500 ${styles.dot}`}
                ></div>

                <div className="ml-20">
                  <div
                    className={`rounded-xl border overflow-y-auto transition-all duration-500 ease-out transform hover:scale-[1.02] ${styles.border} ${styles.bg}`}
                  >
                    <div
                      className={`p-6 cursor-pointer transition-all duration-300 ${styles.hover}`}
                      onClick={() => togglePhase(phase.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-green-400 transition-transform duration-300" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-green-400 transition-transform duration-300" />
                            )}
                            <h2 className="text-xl font-bold text-green-400">
                              {phase.title}
                            </h2>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {phase.duration}
                            </span>
                          </div>
                          {getStatusIcon(phase)}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`transition-all duration-500 ease-out overflow-y-auto ${
                        isExpanded
                          ? "max-h-screen opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-gray-800/50 bg-black/20">
                        <div className="p-6 space-y-6">
                          {/* Learning Goals */}
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <Target className="w-5 h-5 text-green-400" />
                              <h3 className="font-semibold text-green-400">
                                Learning Goals
                              </h3>
                            </div>
                            <div className="grid gap-3">
                              {phase.goals.map((goal, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg"
                                >
                                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <p className="text-gray-300 leading-relaxed">
                                    {goal}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tools & Technologies */}
                          {phase.tools && (
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <Wrench className="w-5 h-5 text-blue-400" />
                                <h3 className="font-semibold text-blue-400">
                                  Tools & Technologies
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {phase.tools.map((tool, idx) => (
                                  <span
                                    key={idx}
                                    className="px-4 py-2 bg-blue-900/20 border border-blue-700/30 rounded-full text-sm text-blue-300 hover:border-blue-500 hover:bg-blue-900/30 transition-all duration-300 cursor-default"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Hands-on Projects */}
                          {phase.handsOn && (
                            <div className="">
                              <div className="flex items-center gap-2 mb-4">
                                <Lightbulb className="w-5 h-5 text-purple-400" />
                                <h3 className="font-semibold text-purple-400">
                                  Hands-on Projects
                                </h3>
                              </div>
                              <div className="space-y-3">
                                {phase.handsOn.map((project, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-3 p-3 bg-purple-900/10 border border-purple-800/20 rounded-lg"
                                  >
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-300 leading-relaxed">
                                      {project}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inspirational footer */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-xl border border-gray-800 p-8 backdrop-blur-sm">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
            </div>
            <p className="text-gray-300 text-lg italic mb-4 max-w-xl mx-auto">
              "Roadmap section is subject to changes as i float around currently
              working on Typescript and MERN stack as it seems to be what the
              market demands." - Ashish Limbu
            </p>
            <p className="text-pink-400 font-semibold">
              
                       <FortuneCookie />

            </p>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default RoadmapSection;
