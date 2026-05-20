import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, Award, ShieldCheck, Cpu, ArrowRight, CheckCircle, 
  BookOpen, Star, Zap, Flame, Terminal, PlayCircle, HelpCircle, 
  Lock, Bookmark, CheckCircle2, ChevronDown, Check, GraduationCap,
  LogIn, LogOut
} from "lucide-react";
import { COURSES } from "../data";
import { UI_TRANSLATIONS, getLocalizedCourses } from "../utils/translations";

interface HomepageProps {
  lang: "fr" | "en";
  onStartOnboarding: () => void;
  onGoToDashboard: () => void;
  onLoginClick: () => void;
  onLogoutClick?: () => void;
  hasOnboarded: boolean;
  hasPaid: boolean;
  fullName?: string;
}

export default function Homepage({ 
  lang,
  onStartOnboarding, 
  onGoToDashboard, 
  onLoginClick,
  onLogoutClick,
  hasOnboarded, 
  hasPaid, 
  fullName 
}: HomepageProps) {
  const t = (key: string) => {
    return UI_TRANSLATIONS[lang][key] || UI_TRANSLATIONS["fr"][key] || key;
  };

  const localizedCourses = getLocalizedCourses(lang, COURSES);

  const [activeTab, setActiveTab] = useState<"hero" | "courses" | "certs" | "pricing">("hero");
  const [demoCertName, setDemoCertName] = useState("");
  const [submittedDemo, setSubmittedDemo] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState<{ found: boolean; course?: string; recipient?: string } | null>(null);

  // FAQ Expand state
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false
  });

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleVerifyCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) return;

    const uppercaseCode = verificationCode.toUpperCase().trim();
    // Simple custom verification mockup logic based on our format
    if (uppercaseCode.startsWith("CRSV-")) {
      let matchedCourse = "Masterclass ChatGPT, Gemini & Generative AI";
      if (uppercaseCode.includes("COPY")) {
        matchedCourse = "Écriture Persuasive & Copywriting de Vente";
      } else if (uppercaseCode.includes("FREE")) {
        matchedCourse = "Carrière Freelance IA & Consultant Indépendant";
      }
      setVerificationResult({
        found: true,
        course: matchedCourse,
        recipient: fullName || "Clara Martin (Diplômée Élite)"
      });
    } else {
      setVerificationResult({
        found: false
      });
    }
  };

  const menuItems = [
    { id: "hero", label: t("home"), selector: "#hero-landing" },
    { id: "courses", label: t("coursesTitle"), selector: "#courses-grid" },
    { id: "certs", label: t("certsTitle"), selector: "#certification-details" },
    { id: "pricing", label: t("premiumAcademy"), selector: "#pricing-section" }
  ];

  const scrollToSection = (selector: string, id: "hero" | "courses" | "certs" | "pricing") => {
    setActiveTab(id);
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const faqs = [
    {
      q: "Quel est l'objectif global de l'IA Académie Plus ?",
      a: "L'IA Académie Plus est une plateforme d'excellence conçue pour former la prochaine génération de professionnels à l'ère de l'intelligence artificielle générative (ChatGPT, Gemini, Claude, etc.). Nous combinons un tuteur IA dynamique persistant, des cours théoriques pointus, des bacs à sable (sandbox) de pratique intensive et des certifications cryptographiques."
    },
    {
      q: "Combien coûte la formation et comment fonctionne le paiement ?",
      a: "L'accès à l'intégralité du cursus coûte $15 (frais d'activation uniques pour une licence à vie). Il n'y a aucun abonnement récurrent, aucun engagement caché ni frais supplémentaires. Ce montant unique comprend l'accès aux cours, l'évaluation et la génération de vos certificats officiels au format PDF."
    },
    {
      q: "Comment puis-je générer et télécharger mon certificat en PDF ?",
      a: "Dès que vous validez 100% d'un cursus de formation, un bouton 'Consulter mon Certificat' se déverrouille sur votre tableau de bord. Notre outil de mise en page haute-fidélité vous permet de configurer le certificat à votre nom et prénom complet, de choisir un style visuel (Obsidian ou Classic) et de générer l'export au format PDF ou de l'imprimer en résolution maximale instantanément."
    },
    {
      q: "Le diplôme est-il authentifiable de manière unique ?",
      a: "Oui. Chaque diplôme émis contient un matricule cryptographique de sécurité unique lié au cours et à l'identité complète de l'étudiant. Ce code permet à un recruteur ou à un client de vérifier en temps réel l'authenticité de certification directement depuis notre page d'accueil d'académie."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 antialiased overflow-x-hidden pb-16">
      
      {/* BACKGROUND GLOW DECORATIONS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* STICKY MENU BAR */}
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-2.5 cursor-pointer group select-none">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-extrabold text-slate-950 shadow-lg shadow-emerald-500/10">
              IA
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg tracking-tight leading-none bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
                IA Académie
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-1">PLUS</span>
            </div>
          </div>

          {/* DYNAMIC MENU LINKS */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-900/85">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.selector, item.id as any)}
                className={`py-2 px-4 rounded-lg text-xs font-semibold transition-all font-sans cursor-pointer ${
                  activeTab === item.id 
                    ? "bg-slate-950 border border-slate-800 text-emerald-400 font-bold shadow-sm" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* ACTIVE PORTAL BUTTON */}
           <div className="flex items-center gap-2">
            {hasPaid && hasOnboarded ? (
              <>
                <button
                  onClick={onGoToDashboard}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 px-4 sm:px-5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  {t("accessCoursesPro")}
                  <ArrowRight className="w-4 h-4" />
                </button>
                {onLogoutClick && (
                  <button
                    onClick={onLogoutClick}
                    className="bg-slate-900 hover:bg-slate-850 hover:border-red-500/20 text-slate-400 hover:text-red-450 border border-slate-800 py-2.5 px-4 rounded-xl transition-all cursor-pointer font-sans text-xs flex items-center gap-1.5 font-bold"
                    title={t("deconnexion")}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t("deconnexion")}</span>
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-300 font-bold py-2.5 px-3.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  <LogIn className="w-4 h-4" />
                  {t("connectButton")}
                </button>
                <button
                  id="commencer-training-nav"
                  onClick={onStartOnboarding}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-2.5 px-3.5 sm:px-5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  {t("registerToAcademy")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero-landing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 font-extrabold tracking-widest border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
              ★ DEBRIDEZ VOTRE CARRIÈRE DIGITALE À 100% ★
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              Formez-vous aux <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">Outils IA d'Élite</span> et Obtenez votre Diplôme.
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-sans">
              Maîtrisez les secrets d'application réels de <strong>ChatGPT, Gemini et Claude</strong>. Pratiquez dans une sandbox interactive accompagnée d'un tuteur IA dédié, et obtenez un certificat officiel de fin de formation nominatif au format <strong className="text-emerald-400">PDF haute qualité</strong> téléchargeable immédiatement.
            </p>
          </div>

          {/* Dynamic trust block info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center py-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">Certifications Officielles PDF</div>
                <div className="text-[11px] text-slate-400">Avec identification unique vérifiable</div>
              </div>
            </div>

            <div className="h-[1px] w-full sm:h-8 sm:w-[1px] bg-slate-900" />

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">Accès Cursus Complet : 15$ unique</div>
                <div className="text-[11px] text-slate-400">Pas d'abonnement. Clé d'étudiant à vie.</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-405 hover:to-teal-405 text-slate-950 font-black py-4 px-8 rounded-2xl text-sm uppercase tracking-widest font-mono flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 transition-all hover:scale-[1.01]"
            >
              Exécuter mon Guide d'Onboarding
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => scrollToSection("#courses-grid", "courses")}
              className="bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-300 font-bold py-4 px-6 rounded-2xl text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Découvrir les cours
            </button>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-slate-400 font-bold"><Flame className="w-4 h-4 text-orange-500" /> +4 500 élèves inscrits</span>
            <span>•</span>
            <span className="flex items-center gap-0.5"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> 4.9/5 satisfaction académique</span>
          </div>
        </div>

        {/* RIGHT DECORATIVE CARD: CERTIFICATE HERO VISUAL PREVIEW */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="absolute inset-x-0 top-12 bottom-0 bg-indigo-500/5 rounded-3xl blur-2xl pointer-events-none" />
          
          <div className="relative bg-slate-900 border-2 border-slate-800 p-6 rounded-3xl space-y-5 shadow-2xl">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                <Sparkles className="w-4 h-4 animate-pulse" /> CERTIFICATION EXÉCUTIVE
              </span>
              <span className="text-slate-500">DIPLÔME VERIFIÉ</span>
            </div>

            {/* Simulated certificate widget */}
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl text-center space-y-4 shadow-inner relative">
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-500/30" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-500/30" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-500/30" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-500/30" />

              <div className="space-y-0.5">
                <div className="text-[8px] font-mono tracking-widest text-[#d4af37] font-bold uppercase">IA ACADÉMIE PLUS DIPLÔME D'HONNEUR</div>
                <h3 className="font-serif italic font-extrabold text-white text-base">Certificat de Réussite</h3>
              </div>

              <div className="space-y-1">
                <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">DÉCERNÉ À :</p>
                <div className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent font-serif italic text-sm font-bold border-b border-slate-850 pb-1 max-w-[190px] mx-auto truncate">
                  {submittedDemo && demoCertName.trim() ? demoCertName.trim() : "Votre Nom & Prénom Complet"}
                </div>
              </div>

              <div className="">
                <p className="text-[8px] text-slate-500 leading-normal">
                  Ayant complété avec succès le Cursus Avancé d'Ingénierie de Prompt & IA Générative.
                </p>
                <h4 className="text-[10px] font-bold text-emerald-400 mt-1">Masterclass ChatGPT, Gemini & Generative AI</h4>
              </div>

              <div className="flex justify-between items-end border-t border-slate-900 pt-3 text-[7px] font-mono text-slate-500">
                <div className="text-left">
                  <span>REF UNIQUE :</span>
                  <div className="font-bold text-slate-300">CRSV-AI-8F97E2</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span>CRÉDITS :</span>
                  <div className="font-bold text-slate-300">VALIDÉ</div>
                </div>
              </div>
            </div>

            {/* Quick interactive sandbox to change name */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-300">Générez un aperçu instantané avec votre nom :</div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={demoCertName}
                  onChange={(e) => {
                    setDemoCertName(e.target.value);
                    setSubmittedDemo(true);
                  }}
                  placeholder="Saisissez Votre Prénom & Nom"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Ce diplôme est généré de manière dynamique sous forme de PDF d'excellence certifié.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SKILL ACADEMY CURRICULUM GRID */}
      <section id="courses-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 px-3 py-1 rounded-full col-span-3">
            {t("ourCurriculum")}
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-black text-white tracking-tight">
            {t("masterAITools")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            {t("masterAIToolsSub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localizedCourses.map((course) => {
            return (
              <div 
                key={course.id}
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="p-2.5 bg-slate-950 border border-slate-850 text-indigo-400 rounded-xl">
                      {course.id === "prompt_eng" ? (<Cpu className="w-5 h-5 text-emerald-400" />) : course.id === "copywriting" ? (<Star className="w-5 h-5 text-pink-400" />) : (<Terminal className="w-5 h-5 text-indigo-400" />)}
                    </span>
                    <span className="text-[9px] font-mono uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                      {course.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-100 tracking-tight">{course.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{course.description}</p>
                  </div>

                  {/* Lessons detail list */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[9px] font-bold font-mono text-slate-500 uppercase">{lang === "fr" ? "LEÇONS AU PROGRAMME :" : "CURRICULUM LESSONS:"}</div>
                    {course.lessons.map((lesson: any) => (
                      <div key={lesson.id} className="flex items-center gap-2 text-xs text-slate-350">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">{lesson.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-950 flex justify-between items-center text-xs font-mono text-slate-500">
                  <span>⏱ {course.estimatedHours}h {t("hoursOfTraining")}</span>
                  <span className="text-indigo-400 font-bold uppercase">{course.category.toUpperCase()} WORKSPACE</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DETAILED VERIFIABLE CERTIFICATION & PDF DOWLOAD EXPLAINER */}
      <section id="certification-details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Verification Form Widget */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-2xl relative">
          <div className="absolute top-0 right-0 bg-emerald-500/10 border-b border-l border-slate-800 text-[9px] font-mono uppercase font-bold text-emerald-400 tracking-wider px-3 py-1 rounded-bl-xl">
            SÉCURISÉ AES-256
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-slate-200 text-sm font-mono uppercase">VÉRIFIER UNE CERTIFICATION</h3>
            <p className="text-[11px] text-slate-500">Un client ou recruteur peut authentifier votre diplôme d'un simple clic.</p>
          </div>

          <form onSubmit={handleVerifyCert} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase block">Code de validation unique :</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Ex: CRSV-AI-8F97E2"
                  className="flex-1 bg-slate-950 border border-slate-850 py-3 px-4 rounded-xl text-xs font-mono tracking-widest text-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Authentifier
                </button>
              </div>
            </div>
          </form>

          {verificationResult && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-center ${
                verificationResult.found 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              <Award className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
              {verificationResult.found ? (
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-widest font-mono">DIPLÔME EXÉCUTIF AUTHENTIFIÉ</div>
                  <p className="text-xs text-slate-300 mt-1 font-sans">
                    Ce matricule valide la réussite officielle de <strong>{verificationResult.recipient}</strong> au cursus :
                  </p>
                  <p className="text-xs font-bold text-white italic">{verificationResult.course}</p>
                </div>
              ) : (
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest font-mono">CODE DE SÉCURITÉ INVALIDE</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Nous n'avons trouvé aucune certification correspondante dans le registre cryptographique de l'IA Académie Plus.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-850 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              <strong>Prénom & Nom :</strong> Pour un diplôme valide, l'étudiant doit saisir son identité complète lors de l'activation de son compte.
            </p>
          </div>
        </div>

        {/* Textual Benefits of Certificate */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
            SÉCURITÉ ET TRANSPARENCE
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-black text-white tracking-tight">
            Validez vos compétences réelles face aux entreprises
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            Saisissez votre vrai prénom et nom, apprenez toutes les formules, et téléchargez votre diplôme format A4 paysage sous format PDF d'un seul clic. Un QR Code et un matricule de cryptage garantissent sa légitimité auprès de vos futurs collaborateurs.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-200">Génération PDF Haute-Fidélité</h4>
                <p className="text-[11px] text-slate-400 leading-normal">Prêt pour l'impression physique en imprimerie de luxe ou pour être joint sous forme numérique lors de vos candidatures.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-200">Ajustable en 2 Thèmes de Prestige</h4>
                <p className="text-[11px] text-slate-400 leading-normal">Basculez entre le thème Obsidian Luxe (Sombre technique) ou Classic Parchemin (Sceau de tradition académique).</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-200">Affichage Prénom et Nom Complet</h4>
                <p className="text-[11px] text-slate-400 leading-normal">Pour être 100% conforme à l'identité légale requise dans le cadre d'un audit de compétences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENT PRICING SECTION */}
      <section id="pricing-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 px-3 py-1 rounded-full">
            ACCÈS PREMIUM SANS ABONNEMENT
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-black text-white tracking-tight">
            Un Tarif Unique de 15$ Complètement Fixe
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Pas d'inscription mensuelle douteuse. Pas de surcoût pour générer vos certificats. Réglez simplement 15 dollars une fois et accédez aux cours et examens à vie.
          </p>
        </div>

        <div className="bg-slate-900 border-2 border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden text-center space-y-6 max-w-xl mx-auto shadow-2xl">
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-[9px] font-mono font-bold text-emerald-400 px-3 py-1 border-b border-l border-slate-800 rounded-bl-xl uppercase tracking-wider">
            ÉCONOMIES IMMÉDIATES
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-200 uppercase tracking-wide font-mono">DIPLÔME PRESTIGE UNIQUE</h3>
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight font-mono mt-2">
              15,00 $ <span className="text-sm font-semibold text-slate-500 lowercase">unique</span>
            </div>
            <p className="text-[11px] text-slate-400">Aucun renouvellement d'abonnement. Accès illimité à vie.</p>
          </div>

          <div className="space-y-3 pt-3 text-left max-w-sm mx-auto text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Cursus total ChatGPT / Gemini inclus</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Générateur de diplômes PDF illimités</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Sandbox pratique de formulation de prompts</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Tuteur IA connecté aux modèles de pointe</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Mises à jour gratuites à vie des cours</span>
            </div>
          </div>

          <button
            onClick={onStartOnboarding}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-405 hover:to-teal-405 text-slate-950 font-black py-4 rounded-xl text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-emerald-500/10 active:scale-[0.99]"
          >
            Commencer le Test d'Entrée
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* CORE FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2.5xl font-black text-white tracking-tight uppercase font-mono">
            QUESTIONS FRÉQUENTES
          </h2>
          <p className="text-xs text-slate-505">Besoin d'aide ? Tout ce que vous devez connaître sur l'IA Académie Plus.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = faqOpen[index];
            return (
              <div 
                key={index}
                className="bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex justify-between items-center text-xs sm:text-sm font-bold text-slate-200 hover:text-white transition-colors cursor-pointer select-none"
                >
                  <span className="font-sans">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-slate-950 text-xs text-slate-400 leading-relaxed font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
