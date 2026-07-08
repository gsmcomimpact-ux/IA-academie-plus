import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ONBOARDING_QUESTIONS } from "../data";
import { OnboardingQuestion, UserProgress } from "../types";
import { Sparkles, Brain, Award, DollarSign, Briefcase, Cpu, Clock, Flame, GraduationCap, TrendingUp, Command, PenTool, Globe, ChevronRight, LogIn } from "lucide-react";
import { ONBOARDING_TRANSLATIONS } from "../utils/translations";

interface OnboardingProps {
  lang: "fr" | "en";
  onComplete: (answers: Record<string, string>, pathCourseIds: string[]) => void;
  onLoginClick?: () => void;
}

const getLucideIcon = (name: string) => {
  switch (name) {
    case "DollarSign": return <DollarSign className="w-5 h-5" />;
    case "Briefcase": return <Briefcase className="w-5 h-5" />;
    case "Cpu": return <Cpu className="w-5 h-5" />;
    case "Clock": return <Clock className="w-5 h-5" />;
    case "Award": return <Award className="w-5 h-5" />;
    case "Sparkles": return <Sparkles className="w-5 h-5" />;
    case "Flame": return <Flame className="w-5 h-5" />;
    case "GraduationCap": return <GraduationCap className="w-5 h-5" />;
    case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
    case "Command": return <Command className="w-5 h-5" />;
    case "PenTool": return <PenTool className="w-5 h-5" />;
    case "Globe": return <Globe className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
  }
};

export default function Onboarding({ lang, onComplete, onLoginClick }: OnboardingProps) {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentAnalysisLabel, setCurrentAnalysisLabel] = useState("");

  const ONBOARDING_QUESTIONS_LOCALIZED = ONBOARDING_TRANSLATIONS[lang] || ONBOARDING_TRANSLATIONS["fr"];
  const activeQuestion = ONBOARDING_QUESTIONS_LOCALIZED[currentStep] || ONBOARDING_QUESTIONS_LOCALIZED[0];

  // Simulated analysis checkmarks
  const analysisSteps = [
    { text: lang === "fr" ? "Analyse de vos objectifs de gains en ligne..." : "Analyzing your target online earnings...", limit: 25 },
    { text: lang === "fr" ? "Calibration des exercices de prompt personnalisé..." : "Calibrating custom prompting exercises...", limit: 50 },
    { text: lang === "fr" ? "Sélection des templates de rédaction persuasive..." : "Selecting persuasive copywriting templates...", limit: 75 },
    { text: lang === "fr" ? "Génération de votre Conseiller de Carrière IA..." : "Generating your dedicated AI Career Advisor...", limit: 100 }
  ];

  useEffect(() => {
    if (analyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              // Determine best path based on answers
              let paths = ["chatgpt_mastery", "claude_mastery", "gemini_mastery", "deepseek_mastery", "kimi_mastery", "leonardo_mastery", "ai_social_selling", "viral_video_audio", "grok_mastery", "copilot_mastery", "manus_mastery", "perplexity_mastery", "admin_redaction", "veo_mastery", "lovable_mastery", "prompt_eng", "copywriting", "freelance_career"];
              if (answers["skill"] === "prompt_engineering" || answers["skill"] === "ai_skills") {
                paths = ["chatgpt_mastery", "claude_mastery", "gemini_mastery", "deepseek_mastery", "kimi_mastery", "leonardo_mastery", "ai_social_selling", "viral_video_audio", "grok_mastery", "copilot_mastery", "manus_mastery", "perplexity_mastery", "admin_redaction", "veo_mastery", "lovable_mastery", "prompt_eng", "copywriting", "freelance_career"];
              } else if (answers["skill"] === "copywriting") {
                paths = ["copywriting", "ai_social_selling", "viral_video_audio", "grok_mastery", "copilot_mastery", "manus_mastery", "perplexity_mastery", "admin_redaction", "veo_mastery", "lovable_mastery", "chatgpt_mastery", "claude_mastery", "gemini_mastery", "deepseek_mastery", "kimi_mastery", "leonardo_mastery", "prompt_eng", "freelance_career"];
              } else if (answers["skill"] === "freelance") {
                paths = ["freelance_career", "ai_social_selling", "viral_video_audio", "grok_mastery", "copilot_mastery", "manus_mastery", "perplexity_mastery", "admin_redaction", "veo_mastery", "lovable_mastery", "chatgpt_mastery", "claude_mastery", "gemini_mastery", "deepseek_mastery", "kimi_mastery", "leonardo_mastery", "copywriting", "prompt_eng"];
              }
              onComplete(answers, paths);
            }, 1000);
            return 100;
          }
          const currentLabel = analysisSteps.find(s => prev < s.limit);
          if (currentLabel) {
            setCurrentAnalysisLabel(currentLabel.text);
          }
          return prev + 1;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [analyzing, answers]);

  const handleSelectOption = (value: string) => {
    const updatedAnswers = { ...answers, [activeQuestion.id]: value };
    setAnswers(updatedAnswers);

    if (currentStep < ONBOARDING_QUESTIONS_LOCALIZED.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setAnalyzing(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-full bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Decorative glowing background mesh */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between py-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-emerald-500/20">
            IA
          </div>
          <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            IA Académie
          </span>
          <span className="text-[10px] uppercase font-mono tracking-wider bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded ml-2">
            Plus
          </span>
        </div>
        {started && !analyzing ? (
          <span className="font-mono text-xs text-slate-400">
            {lang === "fr" ? "Étape" : "Step"} {currentStep + 1} {lang === "fr" ? "de" : "of"} {ONBOARDING_QUESTIONS_LOCALIZED.length}
          </span>
        ) : (
          !started && onLoginClick && (
            <button
              onClick={onLoginClick}
              className="text-xs font-sans font-extrabold text-emerald-400 hover:text-emerald-300 transition-colors bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              {lang === "fr" ? "Se connecter" : "Log in"}
            </button>
          )
        )}
      </div>

      {/* Hero / Start screen */}
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="flex-1 max-w-lg mx-auto flex flex-col justify-center items-center text-center z-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center shadow-2xl shadow-emerald-500/10 mb-6">
              <Brain className="w-8 h-8 text-slate-900" />
            </div>

            <h1 className="font-sans font-extrabold text-4xl leading-tight tracking-tight text-white mb-4">
              {lang === "fr" ? "Propulsez vos compétences à l'ère de l'IA" : "Propel your skills into the AI era"}
            </h1>
            
            <p className="font-sans text-slate-300 text-lg mb-8 leading-relaxed">
              {lang === "fr" 
                ? "Rejoignez notre académie interactive. Obtenez un cursus d'apprentissage sur-mesure pour maîtriser le Copywriting, le Prompting et décrocher des micro-jobs en ligne." 
                : "Join our interactive academy. Get a custom learning curriculum to master Copywriting, Prompting, and secure online micro-jobs."}
            </p>

            {/* Micro-incentives visual blocks */}
            <div className="grid grid-cols-2 gap-3 w-full mb-10 text-left">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-emerald-400 font-bold text-xl mb-1">
                  {lang === "fr" ? "Passif & Flex" : "Passive & Flex"}
                </div>
                <div className="text-xs text-slate-400">
                  {lang === "fr" ? "Seulement 15 minutes d'exercices quotidiens." : "Only 15 minutes of daily exercises."}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="text-indigo-400 font-bold text-xl mb-1">
                  {lang === "fr" ? "Pratique Réelle" : "Real Practice"}
                </div>
                <div className="text-xs text-slate-400">
                  {lang === "fr" ? "Sandbox d'IA connectée à Gemini pour s'exercer." : "AI Sandbox connected to Gemini for exercise."}
                </div>
              </div>
            </div>

            <button
              id="start-onboarding-btn"
              onClick={() => setStarted(true)}
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold py-4 px-6 rounded-xl hover:shadow-xl hover:shadow-emerald-500/15 transition-all flex items-center justify-center gap-2 text-lg active:scale-[0.98] cursor-pointer"
            >
              {lang === "fr" ? "Créer mon programme d'études personnalisé" : "Create my personalized study program"}
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {onLoginClick && (
              <button
                type="button"
                onClick={onLoginClick}
                className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors font-sans text-xs flex items-center gap-1.5 cursor-pointer font-semibold py-1.5 px-3 bg-slate-900/40 hover:bg-slate-900/80 rounded-lg border border-slate-800/60"
              >
                <LogIn className="w-3.5 h-3.5" />
                {lang === "fr" ? "Vous avez déjà un compte ? Se connecter" : "Already have an account? Log in"}
              </button>
            )}
            
            <p className="text-slate-500 text-[11px] mt-4">
              {lang === "fr" 
                ? "Déjà 45,000+ freelances et étudiants formés en 2026. Évaluation gratuite de 2 minutes." 
                : "Over 45,000+ freelancers and students trained in 2026. Free 2-minute review."}
            </p>
          </motion.div>
        ) : analyzing ? (
          <motion.div
            key="analyzing-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 max-w-lg mx-auto flex flex-col justify-center items-center text-center z-10 w-full"
          >
            <div className="relative w-24 h-24 mb-8">
              {/* Spinning active loader border */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 animate-spin" />
              <div className="absolute inset-2 bg-slate-950 rounded-full flex items-center justify-center">
                <span className="font-mono font-bold text-xl text-emerald-400">{analysisProgress}%</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold font-sans text-white mb-2">
              {lang === "fr" ? "Création de votre cursus sur-mesure..." : "Creating your custom curriculum..."}
            </h2>
            
            <p className="text-slate-400 font-mono text-sm min-h-[40px]">
              {currentAnalysisLabel}
            </p>

            <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl mt-8 text-left space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${analysisProgress > 25 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>✓</div>
                <span className={analysisProgress > 25 ? "text-slate-200" : "text-slate-500"}>
                  {lang === "fr" ? "Profil d'apprenant évalué" : "Evaluated learner profile"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${analysisProgress > 50 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>✓</div>
                <span className={analysisProgress > 50 ? "text-slate-200" : "text-slate-500"}>
                  {lang === "fr" ? "Séquençage des chapitres d'Intelligence Artificielle" : "AI lesson sequencing"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${analysisProgress > 75 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>✓</div>
                <span className={analysisProgress > 75 ? "text-slate-200" : "text-slate-500"}>
                  {lang === "fr" ? "Génération des exercices pratiques (Playground)" : "Practice labs & playground generation"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${analysisProgress >= 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>✓</div>
                <span className={analysisProgress >= 100 ? "text-slate-200" : "text-slate-500"}>
                  {lang === "fr" ? "Initialisation de la base de données de validation" : "Initializing validation database"}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1 max-w-lg mx-auto flex flex-col justify-center z-10 w-full"
          >
            {/* Standard humble progress indicator lines */}
            <div className="flex gap-1.5 w-full mb-8">
              {ONBOARDING_QUESTIONS_LOCALIZED.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    idx <= currentStep ? "bg-emerald-400" : "bg-slate-800"
                  }`}
                />
              ))}
            </div>

            <h2 className="font-sans text-2xl font-bold text-white mb-6">
              {activeQuestion.text}
            </h2>

            <div className="space-y-3.5">
              {activeQuestion.options.map((option) => (
                <button
                  key={option.value}
                  id={`option-${option.value}`}
                  onClick={() => handleSelectOption(option.value)}
                  className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-emerald-500/50 transition-all flex items-start gap-4 cursor-pointer hover:shadow-lg active:scale-[0.99] group"
                >
                  <div className="p-2.5 rounded-lg bg-slate-800 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                    {getLucideIcon(option.icon || "")}
                  </div>
                  <div className="flex-1">
                    <div className="font-sans font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-slate-400 text-xs mt-0.5">
                        {option.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 text-sm text-slate-500 hover:text-slate-300 self-center transition-colors font-mono cursor-pointer"
              >
                {lang === "fr" ? "← Étape précédente" : "← Previous step"}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="w-full max-w-lg mx-auto flex justify-between items-center py-4 border-t border-slate-900 mt-6 z-10">
        <span className="text-[10px] text-slate-600 font-mono">
          © {new Date().getFullYear()} IA Académie Plus. Tous droits réservés.
        </span>
        <div className="flex gap-3 text-[10px] text-slate-600 font-mono">
          <span className="hover:underline cursor-pointer">Confidentialité</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Conditions</span>
        </div>
      </div>
    </div>
  );
}
