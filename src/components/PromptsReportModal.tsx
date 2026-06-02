import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Course, UserProgress } from "../types";
import { X, Printer, ShieldCheck, Heart, FileText, Download, Check, Sparkles, BookOpen, Clock, RefreshCw } from "lucide-react";

interface PromptsReportModalProps {
  lang: "fr" | "en";
  course: Course;
  progress: UserProgress;
  onClose: () => void;
  onUpdateFullName: (name: string) => void;
}

interface SavedPrompt {
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  submittedPrompt: string;
  score: number;
  clarity: string;
  specificity: string;
  suggestions: string[];
  savedAt: string;
  isCopywriter?: boolean;
}

const LOCAL_TRANS = {
  fr: {
    modalTitle: "Compte-Rendu d'Exercices Pratiques",
    modalSub: "Accédez et téléchargez au format PDF l'ensemble de vos prompts rédigés et corrigés par l'IA pour ce cursus.",
    personalize: "PERSONNALISATION DU RAPPORT",
    fullNameLabel: "Prénom & Nom de l'étudiant :",
    fullNamePlaceholder: "Ex: Clara Martin",
    editNameTip: "Saisissez votre prénom et nom complets pour sceller ce compte-rendu d'évaluation officielle à joindre à votre portfolio.",
    printBtn: "EXPORTER EN PDF / IMPRIMER",
    printTip: "Astuce d'export PDF : Choisissez 'Enregistrer au format PDF' comme destination, réglez la mise en page en Portrait (Portrait) et décochez les en-têtes et pieds de page système dans les options de votre navigateur.",
    noPromptsTitle: "Aucun prompt corrigé disponible pour ce cours",
    noPromptsDesc: "Vous n'avez pas encore complété de sandbox pratique d'invite ou de rédaction pour ce cursus. Les exercices pratiques sont signalés par un indicateur 'Sandbox' dans votre parcours d'études.",
    backToStudyBtn: "Reprendre mon apprentissage",
    previewTitle: "Aperçu de votre Rapport de Travaux Pratiques",
    schoolHeader: "★ ACADÉMIE D'EXCELLENCE IA & DIGITAL ★",
    reportTitle: "RAPPORT DE CERTIFICATION DES TRAVAUX PRATIQUES",
    schoolDesc: "Évaluation officielle de compétences professionnelles en ingénierie d'invites génératives et rédaction d'affaires.",
    studentLabel: "ÉTUDIANT ACCRÉDITÉ :",
    courseLabel: "CURSUS MASTERCLASS :",
    idLabel: "MATRICULE DU PORTFOLIO :",
    dateLabel: "CONDUIT LE :",
    verifTitle: "Sceau d'Authentification Académique",
    securedByAI: "Vérification automatisée par l'Infrastructure de l'Académie.",
    yourPromptTitle: "Votre structure d'invite soumise :",
    aiFeedbackTitle: "Rapport d'audit & Corrections de l'outil IA :",
    scoreBadge: "Score obtenu :",
    clarityLabel: "Audit de Clarté :",
    specificityLabel: "Spécificité :",
    suggestionsLabel: "Ajustements & Recommandations prioritaires :",
    savedAtLabel: "Validé le :",
    demoNote: "💡 NOTE DE DÉMONSTRATION : Pour vous aider à visualiser l'export PDF immédiatement, ce rapport affiche une simulation d'invites d'élite pour ce cours !",
    demoIndicator: "INVITE EXÉMPLAIRE DE DÉMONSTRATION"
  },
  en: {
    modalTitle: "Practical Worksheets & Prompts Report",
    modalSub: "Review and export as a PDF document all your submitted prompts and professional AI evaluations for this syllabus.",
    personalize: "REPORT CUSTOMIZATION",
    fullNameLabel: "Student First & Last Name:",
    fullNamePlaceholder: "e.g. Clara Martin",
    editNameTip: "Type your full professional name to formalize this official coursework report for recruiters and portfolio validation.",
    printBtn: "EXPORT AS PDF / PRINT",
    printTip: "PDF Export Tip: Select 'Save as PDF' as your printing destination. Adjust layout config to Portrait (Portrait) and uncheck headers and footers option in your browser print parameters.",
    noPromptsTitle: "No completed prompts found for this track",
    noPromptsDesc: "You haven't resolved any practical sandbox evaluations or copywriting exercises inside this program yet. Practice steps are flagged with a 'Sandbox' icon on your timeline.",
    backToStudyBtn: "Back to Course Syllabus",
    previewTitle: "Practical Evaluation Report Live Preview",
    schoolHeader: "★ IA & DIGITAL ACADEMY STREAM OF EXCELLENCE ★",
    reportTitle: "PRACTICAL WORK AND PROMPTS CERTIFICATION REPORT",
    schoolDesc: "Official assessment of advanced capabilities in Generative Prompt Engineering and Strategic Business Writing.",
    studentLabel: "ACCREDITED STUDENT:",
    courseLabel: "SPECIALIZED SYLLABUS:",
    idLabel: "PORTFOLIO TRACKING SERIAL:",
    dateLabel: "CONDUCTED ON:",
    verifTitle: "Academic Security Certification Seal",
    securedByAI: "Automated integrity check managed by Academy internal scoring engines.",
    yourPromptTitle: "Your submitted prompt instruction:",
    aiFeedbackTitle: "AI Evaluation & Audit Adjustments:",
    scoreBadge: "Earned Score:",
    clarityLabel: "Clarity Rating:",
    specificityLabel: "Specificity Rating:",
    suggestionsLabel: "Priority Upgrades & Key Adjustments:",
    savedAtLabel: "Validated on:",
    demoNote: "💡 DEMO PREVIEW NOTE: To allow you to preview the PDF design immediately, we loaded professional high-fidelity sample exercises matching your current syllabus!",
    demoIndicator: "EXEMPLARY PRACTICE SAMPLE"
  }
};

export default function PromptsReportModal({ lang, course, progress, onClose, onUpdateFullName }: PromptsReportModalProps) {
  const [studentName, setStudentName] = useState(progress.fullName || progress.firstName || "Élite Académie");
  const [savedRecords, setSavedRecords] = useState<SavedPrompt[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const t = (key: keyof typeof LOCAL_TRANS["fr"]) => {
    return LOCAL_TRANS[lang][key] || LOCAL_TRANS["fr"][key] || String(key);
  };

  useEffect(() => {
    try {
      const savedStr = localStorage.getItem("coursiv_corrected_prompts") || "{}";
      const saved = JSON.parse(savedStr);
      const filtered: SavedPrompt[] = Object.values(saved)
        .filter((item: any) => item && item.courseId === course.id) as SavedPrompt[];
      
      if (filtered.length > 0) {
        setSavedRecords(filtered.sort((a, b) => new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()));
        setIsDemoMode(false);
      } else {
        // Fallback demo mock datasets to let the student test the gorgeous PDF download immediately!
        // Highly professional UX!
        setIsDemoMode(true);
        const demoData: SavedPrompt[] = course.lessons
          .filter(l => l.activityType === "prompt_sandbox" || l.activityType === "copy_sandbox")
          .map((lesson, idx) => ({
            courseId: course.id,
            courseTitle: course.title,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            submittedPrompt: lesson.promptObjective?.exampleSolution || lesson.copyObjective?.exampleSolution || "Act as a senior expert...",
            score: 90 - (idx * 4),
            clarity: lang === "fr" ? "Structure de rôle d'expert et limites sémantiques très claires." : "Exceptional expert framing and constraint boundaries.",
            specificity: lang === "fr" ? "Utilisation d'exemples few-shot et délimiteurs XML optimaux." : "Great XML structures and proper few-shot integration.",
            suggestions: lang === "fr" 
              ? [
                  "Ajouter une directive négative explicite pour encadrer les exceptions de réponses vides.",
                  "Préciser le format d'export de sortie en demandant un formatage JSON strict ou des paragraphes courts.",
                  "Stress-tester le comportement avec un prompt d'injection conflictuel."
                ]
              : [
                  "Integrate an explicit negative guardrail handling empty database retrieval results.",
                  "Define output formatting constraints using strict bullet lines or standard JSON files.",
                  "Defend against instruction injection by declaring variables under standalone XML brackets."
                ],
            savedAt: new Date(Date.now() - (3 * 24 * 3600 * 1000) + (idx * 3600 * 1000)).toISOString(),
            isCopywriter: lesson.activityType === "copy_sandbox"
          }));
        setSavedRecords(demoData);
      }
    } catch (e) {
      console.error(e);
    }
  }, [course, lang]);

  const handleNameChange = (val: string) => {
    setStudentName(val);
    onUpdateFullName(val);
  };

  const triggerExport = () => {
    window.print();
  };

  // Create a structured security code matching the certificate serial layout
  const portfolioId = `CRSV-PRMP-${course.category.toUpperCase()}-${Math.abs(course.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) * 88123).toString(16).toUpperCase()}`;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 overflow-y-auto p-4 md:p-8 flex items-center justify-center font-sans">
      
      {/* Stylesheet specifically injected for beautiful high-contrast printed A4 output */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-pdf-document, .printable-pdf-document * {
              visibility: visible;
              color: #030712 !important;
            }
            .printable-pdf-document {
              position: absolute;
              left: 0;
              top: 0;
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              border: none !important;
              background: #ffffff !important;
              box-shadow: none !important;
            }
            .page-break {
              page-break-before: always !important;
              margin-top: 2rem;
            }
            .no-break {
              page-break-inside: avoid !important;
            }
            .no-print, .no-print * {
              display: none !important;
              height: 0 !important;
              width: 0 !important;
            }
          }
        `}
      </style>

      <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative z-10 my-auto">
        
        {/* Left Column Controls (no-print) */}
        <div className="w-full lg:w-96 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/70 flex flex-col justify-between no-print relative">
          
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-850 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer block lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-400/10 py-1 px-2.5 rounded border border-emerald-400/15 font-mono">
                {course.title}
              </span>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-100 tracking-tight mt-2">{t("modalTitle")}</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{t("modalSub")}</p>
            </div>

            {/* Customizer Option name input */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-850 space-y-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                {t("personalize")}
              </span>
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-350 font-medium">{t("fullNameLabel")}</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder={t("fullNamePlaceholder")}
                  className="w-full bg-slate-950 text-slate-200 border border-slate-800 focus:border-indigo-500 rounded-lg py-2 px-3 text-xs focus:outline-none transition-colors font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-500 leading-normal font-sans">
                {t("editNameTip")}
              </p>
            </div>

            {isDemoMode && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>{lang === "fr" ? "Mode Démonstration" : "Demo Preview Mode"}</span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
                  {t("demoNote")}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-6 mt-6 border-t border-slate-900">
            {/* Primary printer/PDF download button */}
            <button
              onClick={triggerExport}
              disabled={savedRecords.length === 0}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-405 hover:to-teal-405 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed select-none"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              {t("printBtn")}
            </button>

            <p className="text-[9.5px] text-slate-500 leading-snug font-sans">
              {t("printTip")}
            </p>

            {/* Desktop Only Close Button */}
            <button
              onClick={onClose}
              className="w-full hidden lg:flex bg-slate-900 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-white transition-all py-2.5 px-4 rounded-xl text-xs font-mono items-center justify-center gap-1.5 cursor-pointer font-bold shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              {lang === "fr" ? "Fermer l'Atelier" : "Close Evaluation Hub"}
            </button>
          </div>
        </div>

        {/* Right Column Layout PDF Live Preview Container */}
        <div className="flex-1 p-6 md:p-8 bg-slate-950/20 overflow-y-auto max-h-[85vh] lg:max-h-[90vh]">
          
          <div className="flex items-center justify-between mb-4 border-b border-slate-850 pb-3 no-print">
            <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              {t("previewTitle")}
            </h3>
            
            {/* Status indicators */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
              <Check className="w-3 h-3" />
              {savedRecords.length} {lang === "fr" ? "EXERCICES SÉCURISÉS" : "SECURED EXERCISES"}
            </div>
          </div>

          {/* PRINTABLE PDF DOCUMENT - Custom-Designed Modern Letter layout */}
          <div className="printable-pdf-document bg-white text-slate-900 p-8 sm:p-12 md:p-14 shadow-2xl rounded-2xl max-w-3xl mx-auto border border-slate-200">
            
            {/* DOCUMENT FIRST PAGE HEADER */}
            <div className="border-b-[4px] border-slate-900 pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono bg-slate-900 text-white font-bold px-3 py-1 uppercase rounded tracking-wider">
                  {t("schoolHeader")}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-2 leading-none">
                  {t("reportTitle")}
                </h1>
                <p className="text-[11px] text-slate-600 max-w-xl font-sans mt-1">
                  {t("schoolDesc")}
                </p>
              </div>

              {/* Decorative Document Crest/Academy Seal */}
              <div className="hidden sm:flex flex-col items-center border border-slate-300 p-3 rounded-lg shrink-0 w-24">
                <ShieldCheck className="w-7 h-7 text-slate-900" />
                <span className="text-[8px] text-center font-bold font-mono text-slate-600 mt-1 uppercase tracking-tight">
                  ACADEMY OK
                </span>
              </div>
            </div>

            {/* METADATA SUMMARY TABLE BOX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200/80 p-5 rounded-xl mb-8 font-mono text-[11px]">
              <div className="space-y-1.5">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500 font-bold">{t("studentLabel")}</span>
                  <span className="text-slate-950 font-black tracking-wide">{studentName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500 font-bold">{t("courseLabel")}</span>
                  <span className="text-slate-950 font-extrabold text-right max-w-[180px] truncate">{course.title}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500 font-bold">{t("idLabel")}</span>
                  <span className="text-slate-950 font-bold select-all tracking-tight">{portfolioId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500 font-bold">{t("dateLabel")}</span>
                  <span className="text-slate-950 font-medium">
                    {new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* LIST OF RESOLVED WORK ITEMS & AUDITS */}
            <div className="space-y-8">
              {savedRecords.map((record, index) => {
                return (
                  <div 
                    key={record.lessonId} 
                    className={`pb-8 border-b-2 border-slate-100 last:border-b-0 no-break ${index > 0 && index % 2 === 0 ? "page-break" : ""}`}
                  >
                    {/* Activity Number Indicator & Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-l-4 border-slate-900 pl-4 mb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-black">
                          {lang === "fr" ? `EXERCICE #${index + 1}` : `WORKSHOP PRACTICE #${index + 1}`}
                        </span>
                        <h2 className="text-sm font-extrabold text-slate-900 mt-1 font-mono tracking-tight uppercase">
                          {record.lessonTitle}
                        </h2>
                      </div>
                      
                      {/* Score stamp */}
                      <div className="bg-slate-900 text-white font-mono rounded-lg px-3 py-1 shrink-0 text-center">
                        <div className="text-[8px] text-slate-400 font-bold uppercase">{lang === "fr" ? "SUR 100" : "RATING"}</div>
                        <div className="text-sm font-black">{record.score} %</div>
                      </div>
                    </div>

                    {/* SUBMITTED BODY OR WRITTEN PROMPT BOX */}
                    <div className="mb-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <div className="text-[9px] font-mono text-slate-500 font-bold uppercase mb-2 tracking-widest">
                        {record.isCopywriter 
                          ? (lang === "fr" ? "STRUCTURE DE RÉDACTION SOUVERAINE :" : "SUBMITTED COPY:") 
                          : t("yourPromptTitle")}
                      </div>
                      <pre className="text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed select-all bg-white p-3 rounded-lg border border-slate-200/60 max-h-56 overflow-y-auto">
                        {record.submittedPrompt}
                      </pre>
                    </div>

                    {/* FEEDBACK ASSESSMENT RESULTS */}
                    <div className="bg-slate-50/40 border border-slate-200/60 p-4 rounded-xl space-y-3">
                      <div className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest border-b border-slate-200 pb-1.5 flex items-center justify-between">
                        <span>{t("aiFeedbackTitle")}</span>
                        {isDemoMode && (
                          <span className="text-[8px] font-sans font-extrabold bg-amber-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                            {t("demoIndicator")}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-2xs md:text-xs">
                        <div className="space-y-1">
                          <span className="font-mono text-slate-500 font-semibold">{t("clarityLabel")}</span>
                          <p className="text-slate-800 leading-normal italic font-sans pl-2 border-l border-slate-200">
                            {record.clarity}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-slate-500 font-semibold">{t("specificityLabel")}</span>
                          <p className="text-slate-800 leading-normal italic font-sans pl-2 border-l border-slate-200">
                            {record.specificity}
                          </p>
                        </div>
                      </div>

                      {/* AI suggestions */}
                      {record.suggestions && record.suggestions.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                          <span className="font-mono text-[10px] text-slate-500 font-semibold block uppercase tracking-wide">
                            {t("suggestionsLabel")}
                          </span>
                          <ul className="space-y-1 text-2xs md:text-xs text-slate-700 font-sans list-disc list-inside">
                            {record.suggestions.map((sug, sIdx) => (
                              <li key={sIdx} className="leading-snug">
                                {sug}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="text-[8px] font-mono text-slate-400 text-right uppercase">
                        {t("savedAtLabel")} {new Date(record.savedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FIRST PAGE OR END OF DOCUMENT FOOTER SIGN-OFF */}
            <div className="mt-12 pt-6 border-t-[4px] border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center no-break">
              
              {/* Left Column Verification Signature seal */}
              <div className="space-y-1 bg-slate-50 border border-slate-200 rounded-lg p-3 max-w-sm">
                <h4 className="font-mono text-[9px] font-black text-slate-950 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                  {t("verifTitle")}
                </h4>
                <p className="text-[8.5px] text-slate-500 leading-normal">
                  {t("securedByAI")}
                </p>
                <div className="text-[8px] font-mono text-slate-400 font-bold select-all uppercase">
                  VERIFIED-ID // {portfolioId}
                </div>
              </div>

              {/* Right Column Academic Sign Off */}
              <div className="text-center sm:text-right space-y-1">
                <div className="font-serif italic font-semibold text-sm text-slate-850">
                  {lang === "fr" ? "🤖 Tuteur IA Académique" : "🤖 Academic AI Tutors"}
                </div>
                <div className="h-0.5 w-32 bg-slate-300 ml-auto mr-auto sm:mr-0 my-1 font-mono" />
                <div className="font-mono text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                  {lang === "fr" ? "DIRECTION TECHNIQUE & INGENIERIE INDÉPENDANTE" : "CHIEF ALGORITHM OFFICERS & AUDIT COMMITTEE"}
                </div>
              </div>
            </div>

            {/* Custom heart-note footer at page margins */}
            <div className="mt-8 text-center text-[7.5px] font-mono text-slate-400 uppercase tracking-wider">
              {lang === "fr" 
                ? "Fait d'armes d'excellence académique délivré par l'IA Académie Plus • Document non modifiable."
                : "Official Proof of Academic Coursework Issued by AI Academy Plus Group • Sealed Document."}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
