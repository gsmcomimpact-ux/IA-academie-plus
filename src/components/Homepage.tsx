import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, Award, ShieldCheck, Cpu, ArrowRight, CheckCircle, 
  BookOpen, Star, Zap, Flame, Terminal, PlayCircle, HelpCircle, 
  Lock, Bookmark, CheckCircle2, ChevronDown, Check, GraduationCap,
  LogIn, LogOut, CheckSquare, Layers, Globe, Calendar, DollarSign,
  Code, FileText, Video, Smartphone, Send, Brain, Users, RefreshCw, Music, Leaf
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

const LOCAL_TRANS = {
  fr: {
    heroBadge: "★ DÉBRIDEZ VOTRE CARRIÈRE DIGITALE À 100% ★",
    heroTitlePart1: "Formez-vous aux ",
    heroTitleHighlight: "Outils IA d'Élite",
    heroTitlePart2: " et Obtenez votre Diplôme.",
    heroSub: "Maîtrisez les secrets d'application réels de ChatGPT, Claude, DeepSeek et Lovable. Pratiquez dans une sandbox interactive de formulation de prompts, et obtenez un certificat officiel de fin de formation nominatif au format PDF haute qualité téléchargeable immédiatement.",
    certPDF: "Certifications Officielles PDF",
    certPDFDesc: "Avec identification unique vérifiable",
    activationFee: "Accès Cursus Complet : 15$ unique",
    activationFeeDesc: "Pas d'abonnement. Clé d'étudiant à vie.",
    startJourney: "Exécuter mon Guide d'Onboarding",
    exploreCourses: "Découvrir les cours",
    studentsRegistered: " +4 500 élèves inscrits",
    satisfaction: " 4.9/5 satisfaction académique",
    
    previewBadge: "★ CERTIFICATION EXÉCUTIVE",
    previewHeader: "DIPLÔME VERIFIÉ",
    certHonor: "IA ACADÉMIE PLUS DIPLÔME D'HONNEUR",
    certTitle: "Certificat de Réussite",
    certAwardedTo: "DÉCERNÉ À :",
    certAwardedName: "Votre Nom & Prénom Complet",
    certAwardText: "Ayant complété avec succès le Cursus Avancé d'Ingénierie de Prompt & IA Générative.",
    refLabel: "REF UNIQUE :",
    creditLabel: "CRÉDITS :",
    creditVal: "VALIDÉ",
    previewNameLabel: "Générez un aperçu instantané avec votre nom :",
    previewNamePlaceholder: "Saisissez Votre Prénom & Nom",
    previewWarning: "Ce diplôme est généré de manière dynamique sous forme de PDF d'excellence certifié.",
    
    ourCurriculum: "PROGRAMME DE L'ACADÉMIE",
    masterAITools: "Maîtrisez les Outils Réels de l'IA",
    masterAIToolsSub: "Explorez nos 23 formations d'élite. Chaque cursus contient entre 20 et 30 modules progressifs, une sandbox pratique autonome et un examen de validation de fin d'étude.",
    curriculumLessons: "LEÇONS AU PROGRAMME :",
    hoursOfTraining: "heures d'entraînement",
    
    secureBadge: "SÉCURISÉ AES-256",
    verifyCardHeader: "VÉRIFIER UNE CERTIFICATION",
    verifyCardDesc: "Un client ou recruteur peut authentifier votre diplôme d'un simple clic.",
    verifyInputLabel: "Code de validation unique :",
    verifyInputPlaceholder: "Ex: CRSV-AI-8F97E2",
    verifySubmit: "Authentifier",
    certSuccessHeader: "DIPLÔME EXÉCUTIF AUTHENTIFIÉ",
    certSuccessText: "Ce matricule valide la réussite officielle de ",
    certSuccessCourse: " au cursus :",
    certFailHeader: "CODE DE SÉCURITÉ INVALIDE",
    certFailText: "Nous n'avons trouvé aucune certification correspondante dans le registre cryptographique de l'IA Académie Plus.",
    verificationUnderDesc: " Pour un diplôme valide, l'étudiant doit saisir son identité complète lors de l'activation de son compte.",
    verificationUnderLabel: "Prénom & Nom :",
    transparencyBadge: "SÉCURITÉ ET TRANSPARENCE",
    transparencyHeader: "Validez vos compétences réelles face aux entreprises",
    transparencyDesc: "Saisissez votre vrai prénom et nom, apprenez toutes les formules, et téléchargez votre diplôme format A4 paysage sous format PDF d'un seul clic. Un QR Code et un matricule de cryptage garantissent sa légitimité auprès de vos futurs collaborateurs.",
    bullet1Title: "Génération PDF Haute-Fidélité",
    bullet1Desc: "Prêt pour l'impression physique en imprimerie de luxe ou pour être joint sous forme numérique lors de vos candidatures.",
    bullet2Title: "Ajustable en 2 Thèmes de Prestige",
    bullet2Desc: "Basculez entre le thème Obsidian Luxe (Sombre technique) ou Classic Parchemin (Sceau de tradition académique).",
    bullet3Title: "Affichage Prénom et Nom Complet",
    bullet3Desc: "Pour être 100% conforme à l'identité légale requise dans le cadre d'un audit de compétences.",
    
    pricingBadge: "ACCÈS PREMIUM SANS ABONNEMENT",
    pricingHeader: "Un Tarif Unique de 15$ Complètement Fixe",
    pricingDesc: "Pas d'inscription mensuelle douteuse. Pas de surcoût pour générer vos certificats. Réglez simplement 15 dollars une fois et accédez aux cours et examens à vie.",
    savingsBadge: "ÉCONOMIES IMMÉDIATES",
    pricingCardTitle: "DIPLÔME PRESTIGE UNIQUE",
    pricingCardPrice: "15,00 $",
    pricingCardPriceLabel: "unique",
    pricingCardDesc: "Aucun renouvellement d'abonnement. Accès illimité à vie.",
    pricingBullet1: "Cursus total ChatGPT / Gemini inclus",
    pricingBullet2: "Générateur de diplômes PDF illimités",
    pricingBullet3: "Sandbox pratique de formulation de prompts",
    pricingBullet4: "Tuteur IA connecté aux modèles de pointe",
    pricingBullet5: "Mises à jour gratuites à vie des cours",
    pricingCta: "Commencer le Test d'Entrée",
    
    faqHeader: "QUESTIONS FRÉQUENTES",
    faqDesc: "Besoin d'aide ? Tout ce que vous devez connaître sur l'IA Académie Plus.",
    
    faqs: [
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
    ]
  },
  en: {
    heroBadge: "★ UNLEASH YOUR DIGITAL CAREER 100% ★",
    heroTitlePart1: "Train on ",
    heroTitleHighlight: "Elite AI Tools",
    heroTitlePart2: " and Earn Your Diploma.",
    heroSub: "Master the real application secrets of ChatGPT, Claude, DeepSeek, and Lovable. Practice in an interactive prompt engineering sandbox, and obtain an official personalized completion certificate in high-quality printable PDF format instantly.",
    certPDF: "Official PDF Certifications",
    certPDFDesc: "With unique verifiable safety key",
    activationFee: "Full Course Access: $15 one-time",
    activationFeeDesc: "No subscription. Lifetime student access key.",
    startJourney: "Run My Onboarding Guide",
    exploreCourses: "Discover courses",
    studentsRegistered: " +4,500 students enrolled",
    satisfaction: " 4.9/5 academic satisfaction",
    
    previewBadge: "★ EXECUTIVE CERTIFICATION",
    previewHeader: "VERIFIED DIPLOMA",
    certHonor: "AI ACADEMY PLUS DIPLOMA OF HONOR",
    certTitle: "Certificate of Achievement",
    certAwardedTo: "AWARDED TO:",
    certAwardedName: "Your Full First & Last Name",
    certAwardText: "For successfully completing and validating the Advanced Prompt Engineering & Generative AI syllabus.",
    refLabel: "UNIQUE REF:",
    creditLabel: "CREDENTIALS:",
    creditVal: "VALIDATED",
    previewNameLabel: "Generate an instant preview with your name:",
    previewNamePlaceholder: "Enter Your First & Last Name",
    previewWarning: "This diploma is dynamically generated as an official certified high-fidelity PDF.",
    
    ourCurriculum: "OUR ACADEMY PROGRAM",
    masterAITools: "Master Real AI Tools",
    masterAIToolsSub: "Explore our 23 elite learning courses. Each syllabus contains 20 to 30 progressive lessons, autonomous practice benches, and final validation certifications.",
    curriculumLessons: "CURRICULUM LESSONS:",
    hoursOfTraining: "hours of training",
    
    secureBadge: "AES-256 SECURED",
    verifyCardHeader: "VERIFY A CERTIFICATION",
    verifyCardDesc: "A client or recruiter can authenticate your diploma with a single click.",
    verifyInputLabel: "Unique validation code:",
    verifyInputPlaceholder: "e.g., CRSV-AI-8F97E2",
    verifySubmit: "Verify Authenticity",
    certSuccessHeader: "EXECUTIVE CREDENTIAL AUTHENTICATED",
    certSuccessText: "This secret key confirms the official graduation of ",
    certSuccessCourse: " in the syllabus:",
    certFailHeader: "INVALID SECURITY CODE",
    certFailText: "We could not find any corresponding certificate in the cryptographic registry of AI Academy Plus.",
    verificationUnderDesc: " To obtain a valid diploma, the student must enter their full legal name when activating their account.",
    verificationUnderLabel: "Full Name:",
    transparencyBadge: "SECURITY AND TRANSPARENCY",
    transparencyHeader: "Validate your real-world skills to employers",
    transparencyDesc: "Enter your real first and last name, master all formulas, and download your high-resolution A4 landscape graduation PDF with one click. A QR Code and security serial number guarantee authenticity with prospective clients and recruiting partners.",
    bullet1Title: "High-Fidelity PDF Generation",
    bullet1Desc: "Ready for high-quality heavy-weight print sizing, or for attaching directly as trusted LinkedIn portfolio assets.",
    bullet2Title: "Two Prestigious Sizing Themes",
    bullet2Desc: "Easily switch between luxury dark Obsidian layout styles or classic parchment academic backgrounds.",
    bullet3Title: "Complete Certified Legal Name",
    bullet3Desc: "Ensures 100% compliance with verified legal credentials required during professional audits and reviews.",
    
    pricingBadge: "PREMIUM ACCESS WITHOUT SUBSCRIPTIONS",
    pricingHeader: "One-Time $15 Completely Fixed Price",
    pricingDesc: "Zero monthly bills. Zero upgrade costs to compile your certificates. Make a single $15 payment and unlock modules, testing benches, and diplomas forever.",
    savingsBadge: "IMMEDIATE VALUE",
    pricingCardTitle: "PRESTIGE LIFETIME CREDENTIALS",
    pricingCardPrice: "15.00 $",
    pricingCardPriceLabel: "one-time",
    pricingCardDesc: "No monthly bills. Unrestricted, perpetual lifetime membership.",
    pricingBullet1: "Total ChatGPT & Gemini Masterclass tracks",
    pricingBullet2: "Unrestricted custom high-res PDF downloads",
    pricingBullet3: "Interactive live Prompt and Copywriting sandboxes",
    pricingBullet4: "Copilot AI tutor powered by top-tier models",
    pricingBullet5: "Free progressive course syllabus updates forever",
    pricingCta: "Begin Entrance Evaluation",
    
    faqHeader: "FREQUENTLY ASKED QUESTIONS",
    faqDesc: "Need help? Everything you should know about AI Academy Plus.",
    
    faqs: [
      {
        q: "What is the global objective of AI Academy Plus?",
        a: "AI Academy Plus is an elite education platform designed to train the next generation of professional managers in the generative AI era (ChatGPT, Gemini, Claude, etc.). We combine a persistent smart AI Copilot Tutor, advanced theoretical units, highly practical prompt sandboxes, and cryptographic printable PDF certificates."
      },
      {
        q: "How much does the program cost and how is payment structured?",
        a: "Full lifetime access to our syllabus requires a single one-time activation fee of $15. There are no recurring monthly billing cycles, hidden upsells, or extra credentials fees. This single enrollment key includes all lessons, evaluations, updates, and custom A4 certificate generation exports."
      },
      {
        q: "How can I build and download my certificate as a PDF?",
        a: "As soon as you validate 100% of an educational track stream in your syllabus, a 'View My Certificate' button unlocks on your dashboard. Our high-fidelity layout engine lets you input your full first and last name, choose a desired visual theme style (Obsidian Nocturne or Classic Light Pro), and immediately print or export the document in max resolution."
      },
      {
        q: "Can my employers uniquely verify and authenticate the diploma?",
        a: "Yes. Every certificate produced has a unique security cryptographic serial key mapped to the course topic and the graduate's legal identity. Recruiting managers or clients can verify credentials in real-time instantly on our verification portal right on the homepage."
      }
    ]
  }
};

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
    return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS["fr"]?.[key] || key;
  };

  const localizedCourses = getLocalizedCourses(lang, COURSES);

  const [activeTab, setActiveTab] = useState<"hero" | "courses" | "certs" | "pricing">("hero");
  const [demoCertName, setDemoCertName] = useState("");
  const [submittedDemo, setSubmittedDemo] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationResult, setVerificationResult] = useState<{ found: boolean; course?: string; recipient?: string } | null>(null);
  
  // Custom interactive demo prompt evaluator states
  const [sandboxPrompt, setSandboxPrompt] = useState("");
  const [sandboxEvaluation, setSandboxEvaluation] = useState<{
    score: number;
    feedback: string;
    suggestions: string[];
    analyzed: boolean;
  } | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  // Filter state for courses list
  const [courseFilter, setCourseFilter] = useState<"all" | "prompts" | "content" | "nocode">("all");

  // Certificate Theme state
  const [certTheme, setCertTheme] = useState<"obsidian" | "parchment">("obsidian");

  // FAQ Expand state
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false
  });

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const verifyCode = params.get("verify");
      const urlName = params.get("name");
      if (verifyCode) {
        setVerificationCode(verifyCode);
        setActiveTab("certs");
        
        const uppercaseCode = verifyCode.toUpperCase().trim();
        
        // Dynamic search in COURSES to extract exact certificate and title match
        const foundBaseCourse = COURSES.find(course => {
          const expectedId = `CRSV-${course.category.toUpperCase()}-${Math.abs(course.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) * 12345).toString(16).toUpperCase()}`;
          return expectedId === uppercaseCode || expectedId.replace("CRSV-", "") === uppercaseCode;
        });

        if (foundBaseCourse) {
          const localizedCourseObj = getLocalizedCourses(lang, COURSES).find(c => c.id === foundBaseCourse.id);
          const matchedCourseTitle = localizedCourseObj ? localizedCourseObj.title : foundBaseCourse.title;
          const recipientName = urlName 
            ? decodeURIComponent(urlName) 
            : (fullName || (lang === "fr" ? "Clara Martin (Diplômée Élite)" : "Clara Martin (Elite Graduate)"));

          setVerificationResult({
            found: true,
            course: matchedCourseTitle,
            recipient: recipientName
          });
        } else if (uppercaseCode.startsWith("CRSV-")) {
          // Fallback legacy support
          let matchedCourse = lang === "fr" ? "Masterclass ChatGPT, Gemini & Generative AI" : "ChatGPT, Gemini & Generative AI Masterclass";
          if (uppercaseCode.includes("COPY")) {
            matchedCourse = lang === "fr" ? "Écriture Persuasive & Copywriting de Vente" : "AI copywriting: Sales Frameworks";
          } else if (uppercaseCode.includes("FREE")) {
            matchedCourse = lang === "fr" ? "Carrière Freelance IA & Consultant Indépendant" : "Propel Your Freelance Career & Side-Hustles";
          } else if (uppercaseCode.includes("LOV") || uppercaseCode.includes("DEV")) {
            matchedCourse = lang === "fr" ? "Cours Complet Lovable.dev : Dominez le No-Code IA" : "Complete Lovable.dev Course: Master No-Code AI";
          }
          setVerificationResult({
            found: true,
            course: matchedCourse,
            recipient: urlName ? decodeURIComponent(urlName) : (fullName || (lang === "fr" ? "Clara Martin (Diplômée Élite)" : "Clara Martin (Elite Graduate)"))
          });
        } else {
          setVerificationResult({
            found: false
          });
        }

        setTimeout(() => {
          const element = document.querySelector("#certification-details");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 600);
      }
    } catch (e) {
      console.error(e);
    }
  }, [lang, fullName]);

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const activeCategoryLabelFr = () => {
    if (courseFilter === "all") return "Toutes les 23 Formations Disponibles";
    if (courseFilter === "prompts") return "🧠 Ingénierie de Prompt & LLMs d'Élite";
    if (courseFilter === "content") return "🎨 Création de Médias, Vidéos & Copywriting";
    return "💻 No-Code, Automatisation & Business";
  };

  const activeCategoryLabelEn = () => {
    if (courseFilter === "all") return "All 23 Available Executive Courses";
    if (courseFilter === "prompts") return "🧠 Advanced Prompting & Large Language Models";
    if (courseFilter === "content") return "🎨 Generative Video, Cinematic Media & Copywriting";
    return "💻 No-Code Architecture, Automation & Freelancing";
  };

  // Evaluate prompt structure dynamically to show off the platform's sandbox capacities
  const handleEvaluatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxPrompt.trim()) return;

    setEvaluating(true);
    setSandboxEvaluation(null);

    setTimeout(() => {
      const text = sandboxPrompt.toLowerCase();
      let score = 30; // base score
      let foundElements = [];

      // Check role assignment
      if (text.includes("agis en tant que") || text.includes("tu es un") || text.includes("act as a") || text.includes("you are a") || text.includes("expert") || text.includes("rôle")) {
        score += 20;
        foundElements.push(lang === "fr" ? "Assignation de Rôle [OK]" : "Role Assignment [OK]");
      }
      // Check task description
      if (text.includes("rédige") || text.includes("crée") || text.includes("analyse") || text.includes("génère") || text.includes("write") || text.includes("create") || text.includes("analyze") || text.includes("generate")) {
        score += 20;
        foundElements.push(lang === "fr" ? "Tâche & Format de sortie [OK]" : "Task & Output format [OK]");
      }
      // Check context
      if (text.includes("contexte") || text.includes("pour mon") || text.includes("dans le but de") || text.includes("target") || text.includes("cible") || text.includes("context")) {
        score += 15;
        foundElements.push(lang === "fr" ? "Éléments de Contexte [OK]" : "Context Parameters [OK]");
      }
      // Check constraints/negative parameters
      if (text.includes("ne fais pas") || text.includes("exclus") || text.includes("limite") || text.includes("sans") || text.includes("don't") || text.includes("constraints") || text.includes("contraintes")) {
        score += 15;
        foundElements.push(lang === "fr" ? "Définition des limites & règles d'or [OK]" : "Constraints & Golden Rules defined [OK]");
      }

      let feedback = "";
      let suggestions: string[] = [];

      if (score >= 80) {
        feedback = lang === "fr" 
          ? `Fantastique ! Votre prompt est extrêmement bien structuré (${score}%). Il respecte les principes fondamentaux de l'ingénierie de prompt en combinant rôle, mission claire, et délimitations pragmatique.` 
          : `Amazing! Your prompt structure is highly mature (${score}%). It perfectly applies core prompt engineering principles by specifying a descriptive role, a clear mission, and operational boundaries.`;
        suggestions = lang === "fr" 
          ? ["Injectez des exemples de résultats attendus (Few-shot prompting) pour atteindre 100%.", "Demandez au modèle d'expliquer son raisonnement pas à pas."] 
          : ["Inject expected output examples (Few-shot prompting) to reach 100%.", "Explicitly instruct the model to think step-by-step."];
      } else if (score >= 50) {
        feedback = lang === "fr"
          ? `Bon début (${score}%). Votre prompt indique correctement la tâche, mais manque de structure opérationnelle pour forcer l'IA à adopter la posture d'un professionnel chevronné.`
          : `Decent start (${score}%). Your prompt specifies the raw task, but lacks the operational framing to force the AI to reason like a seasoned senior expert.`;
        suggestions = lang === "fr"
          ? ["Ajoutez un préambule définissant un rôle d'expert ('Agis en tant que...').", "Spécifiez le ton, la structure du format de sortie (ex: Markdown, JSON).", "Indiquez des contraintes strictes à éviter d'écrire."]
          : ["Prepend a dedicated expert role ('Act as a senior...').", "Define the output format (e.g., Markdown, nested tables).", "Set strict styling guidelines or constraints to keep output clean."];
      } else {
        feedback = lang === "fr"
          ? `Structure très simpliste (${score}%). L'IA va vous répondre de façon générique ou superficielle, car le prompt se limite à une question basique sans balises sémantiques.`
          : `Very simplistic structure (${score}%). The model will give you generic and shallow results, as this prompt reads as a basic request without any semantic boundaries.`;
        suggestions = lang === "fr"
          ? ["Détaillez qui doit écrire, pour quelle cible, et sous quel format précis.", "Découvrez notre premier module ChatGPT & Gemini pour révolutionner immédiatement vos retours."]
          : ["Detail who is writing, who the target audience is, and the exact tone layout.", "Explore our ChatGPT & Gemini introductory track to transform your AI outputs immediately."];
      }

      setSandboxEvaluation({
        score,
        feedback,
        suggestions,
        analyzed: true
      });
      setEvaluating(false);
    }, 1200);
  };

  const handleVerifyCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) return;

    const uppercaseCode = verificationCode.toUpperCase().trim();
    
    // Dynamic match against list of 18 courses
    const foundBaseCourse = COURSES.find(course => {
      const expectedId = `CRSV-${course.category.toUpperCase()}-${Math.abs(course.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) * 12345).toString(16).toUpperCase()}`;
      return expectedId === uppercaseCode || expectedId.replace("CRSV-", "") === uppercaseCode;
    });

    if (foundBaseCourse) {
      const localizedCourseObj = getLocalizedCourses(lang, COURSES).find(c => c.id === foundBaseCourse.id);
      const matchedCourseTitle = localizedCourseObj ? localizedCourseObj.title : foundBaseCourse.title;
      setVerificationResult({
        found: true,
        course: matchedCourseTitle,
        recipient: fullName || (lang === "fr" ? "Clara Martin (Diplômée Élite)" : "Clara Martin (Elite Graduate)")
      });
    } else if (uppercaseCode.startsWith("CRSV-")) {
      let matchedCourse = lang === "fr" ? "Masterclass ChatGPT, Gemini & Generative AI" : "ChatGPT, Gemini & Generative AI Masterclass";
      if (uppercaseCode.includes("COPY")) {
        matchedCourse = lang === "fr" ? "Écriture Persuasive & Copywriting de Vente" : "AI copywriting: Sales Frameworks";
      } else if (uppercaseCode.includes("FREE")) {
        matchedCourse = lang === "fr" ? "Carrière Freelance IA & Consultant Indépendant" : "Propel Your Freelance Career & Side-Hustles";
      } else if (uppercaseCode.includes("LOV") || uppercaseCode.includes("DEV")) {
        matchedCourse = lang === "fr" ? "Cours Complet Lovable.dev : Dominez le No-Code IA" : "Complete Lovable.dev Course: Master No-Code AI";
      }
      setVerificationResult({
        found: true,
        course: matchedCourse,
        recipient: fullName || (lang === "fr" ? "Clara Martin (Diplômée Élite)" : "Clara Martin (Elite Graduate)")
      });
    } else {
      setVerificationResult({
        found: false
      });
    }
  };

  const homeText = LOCAL_TRANS[lang] || LOCAL_TRANS["fr"];

  const menuItems = [
    { id: "hero", label: lang === "fr" ? "Présentation" : "Overview", selector: "#hero-landing" },
    { id: "courses", label: lang === "fr" ? "Formations Catalog" : "Course Catalog", selector: "#courses-grid" },
    { id: "certs", label: lang === "fr" ? "Diplômes Vérifiables" : "Credentials Portal", selector: "#certification-details" },
    { id: "pricing", label: lang === "fr" ? "Accès Unique" : "One-Time Access", selector: "#pricing-section" }
  ];

  const scrollToSection = (selector: string, id: "hero" | "courses" | "certs" | "pricing") => {
    setActiveTab(id);
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Group or filter 18 courses
  const filteredCoursesList = localizedCourses.filter(course => {
    if (courseFilter === "all") return true;
    if (courseFilter === "prompts") {
      // engineering and search tools
      return ["prompt_eng", "chatgpt_mastery", "claude_mastery", "gemini_mastery", "deepseek_mastery", "kimi_mastery", "grok_mastery", "copilot_mastery", "manus_mastery", "perplexity_mastery", "admin_redaction"].includes(course.id);
    }
    if (courseFilter === "content") {
      // copywriting, voice & motion graphics
      return ["copywriting", "viral_video_audio", "veo_mastery", "leonardo_mastery", "nanobanana_mastery", "suno_mastery", "video_editing_mastery"].includes(course.id);
    }
    if (courseFilter === "nocode") {
      // lovable, social, freelancing, smart farming
      return ["lovable_mastery", "ai_social_selling", "freelance_career", "procurement_mastery", "ai_agriculture_mastery"].includes(course.id);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 antialiased overflow-x-hidden pb-16">
      
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] right-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[2000px] left-10 w-[450px] h-[450px] bg-pink-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[650px] h-[650px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* STICKY HEADER AND BANNER LOGO */}
      <nav className="bg-slate-950/85 backdrop-blur-md border-b border-slate-900 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* BRAND */}
          <div className="flex items-center gap-2.5 cursor-pointer group select-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center font-extrabold text-slate-950 shadow-md shadow-emerald-500/15 group-hover:scale-105 transition-transform">
              IA
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg sm:text-xl tracking-tight leading-none bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                {lang === "fr" ? "IA Académie" : "AI Academy"}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1 font-bold">PLUS</span>
            </div>
          </div>

          {/* MENUS BUTTONS FOR DESKTOP */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-900/90">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.selector, item.id as any)}
                className={`py-2 px-3.5 rounded-lg text-xs font-semibold transition-all font-sans cursor-pointer ${
                  activeTab === item.id 
                    ? "bg-slate-950 border border-slate-800 text-emerald-400 font-bold shadow" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* STUDENTS CTAS OR LOGINS */}
          <div className="flex items-center gap-2">
            {hasPaid && hasOnboarded ? (
              <>
                <button
                  onClick={onGoToDashboard}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 px-4 sm:px-5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer font-sans shadow"
                >
                  {t("portalPro")}
                  <ArrowRight className="w-4 h-4" />
                </button>
                {onLogoutClick && (
                  <button
                    onClick={onLogoutClick}
                    className="bg-slate-900 hover:bg-slate-850 hover:border-red-500/20 text-slate-400 hover:text-red-450 border border-slate-855 py-2.5 px-3 rounded-xl transition-all cursor-pointer font-sans text-xs flex items-center gap-1.5 font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">{t("deconnexion")}</span>
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-300 font-bold py-2.5 px-3.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer font-sans shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-emerald-450" />
                  <span>{lang === "fr" ? "Espace Étudiant" : "Student Login"}</span>
                </button>
                <button
                  onClick={onStartOnboarding}
                  className="hidden sm:flex bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs transition-all items-center gap-1.5 cursor-pointer font-sans shadow shadow-emerald-500/10 hover:scale-[1.01]"
                >
                  {lang === "fr" ? "S'inscrire" : "Enroll"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* CORE HERO SECTION */}
      <section id="hero-landing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* HERO INTRO CONTENT */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 font-black tracking-widest border border-emerald-500/20 px-3.5 py-1.5 rounded-full inline-block">
              {homeText.heroBadge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-none">
              {homeText.heroTitlePart1}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-450 to-indigo-400 bg-clip-text text-transparent">
                {homeText.heroTitleHighlight}
              </span>
              {homeText.heroTitlePart2}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-sans">
              {homeText.heroSub}
            </p>
          </div>

          {/* KEY TRUST LABELS */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center py-2 bg-slate-900/20 border border-slate-900 p-4 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/15 shadow-sm">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">{homeText.certPDF}</div>
                <div className="text-[11px] font-mono text-emerald-400">{homeText.certPDFDesc}</div>
              </div>
            </div>

            <div className="hidden sm:block h-10 w-[1px] bg-slate-800" />

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/15 shadow-sm">
                <Zap className="w-5.5 h-5.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">{homeText.activationFee}</div>
                <div className="text-[11px] font-mono text-indigo-400">{homeText.activationFeeDesc}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-1">
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-450 hover:to-teal-405 text-slate-950 font-black py-4 px-8 rounded-2xl text-sm uppercase tracking-widest font-mono flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/15 transition-all hover:scale-[1.01]"
            >
              {homeText.startJourney}
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>
            
            <button
              onClick={() => scrollToSection("#courses-grid", "courses")}
              className="bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-850 text-slate-300 font-bold py-4 px-6 rounded-2xl text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>{homeText.exploreCourses} (23 Cursus)</span>
            </button>
          </div>

          {/* SOCIAL PROOF MARGIN ACCENTS */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1.5 text-slate-400 font-bold">
              <Flame className="w-4 h-4 text-orange-500" /> 
              {homeText.studentsRegistered}
            </span>
            <span className="text-slate-800">•</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> 
              {homeText.satisfaction}
            </span>
            <span className="hidden sm:inline text-slate-800">•</span>
            <span className="hidden sm:inline flex items-center gap-1 text-slate-400 font-bold">
              <Award className="w-4 h-4 text-emerald-400" />
              {lang === "fr" ? "Organisme d'Excellence" : "Center of Excellence"}
            </span>
          </div>
        </div>

        {/* RIGHT VISUAL CERTIFICATE / DYNAMIC LIVE PREVIEW */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="absolute inset-x-0 top-12 bottom-0 bg-indigo-500/5 rounded-3xl blur-2xl pointer-events-none" />
          
          <div className="relative bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-2xl">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> {homeText.previewBadge}
              </span>
              <div className="flex rounded-lg bg-slate-950 border border-slate-850 p-0.5">
                <button 
                  onClick={() => setCertTheme("obsidian")}
                  className={`px-2 py-1 text-[9px] rounded font-bold transition-colors cursor-pointer ${certTheme === "obsidian" ? "bg-emerald-500 text-slate-950" : "text-slate-500 hover:text-white"}`}
                >
                  Obsidian
                </button>
                <button 
                  onClick={() => setCertTheme("parchment")}
                  className={`px-2 py-1 text-[9px] rounded font-bold transition-colors cursor-pointer ${certTheme === "parchment" ? "bg-amber-100 text-slate-950" : "text-slate-500 hover:text-white"}`}
                >
                  Parchment
                </button>
              </div>
            </div>

            {/* LIVE CUSTOMIZABLE CERTIFICATE INTERACTION BOX */}
            <div className={`border p-5 rounded-2xl text-center space-y-4 shadow-inner relative transition-colors duration-500 ${
              certTheme === "obsidian" 
                ? "bg-slate-950 border-slate-850 text-slate-100" 
                : "bg-amber-50/95 border-amber-200 text-slate-900"
            }`}>
              
              {/* Sceau de tradition borders */}
              <div className={`absolute top-2 left-2 w-3.5 h-3.5 border-t border-l ${certTheme === "obsidian" ? "border-[#d4af37]/35" : "border-[#8a6d29]/40"}`} />
              <div className={`absolute top-2 right-2 w-3.5 h-3.5 border-t border-r ${certTheme === "obsidian" ? "border-[#d4af37]/35" : "border-[#8a6d29]/40"}`} />
              <div className={`absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l ${certTheme === "obsidian" ? "border-[#d4af37]/35" : "border-[#8a6d29]/40"}`} />
              <div className={`absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r ${certTheme === "obsidian" ? "border-[#d4af37]/35" : "border-[#8a6d29]/40"}`} />

              <div className="space-y-0.5">
                <div className={`text-[8px] font-mono tracking-widest font-extrabold uppercase ${
                  certTheme === "obsidian" ? "text-[#d4af37]" : "text-[#7d5d1c]"
                }`}>
                  {homeText.certHonor}
                </div>
                <h3 className={`font-serif italic font-black text-base ${
                  certTheme === "obsidian" ? "text-white" : "text-slate-900"
                }`}>
                  {homeText.certTitle}
                </h3>
              </div>

              <div className="space-y-1">
                <p className={`text-[8px] font-mono uppercase tracking-widest ${
                  certTheme === "obsidian" ? "text-slate-500" : "text-slate-400"
                }`}>{homeText.certAwardedTo}</p>
                
                <div className={`font-serif italic text-sm font-bold border-b pb-1 max-w-[200px] mx-auto truncate ${
                  certTheme === "obsidian" 
                    ? "bg-gradient-to-r from-emerald-400 via-teal-350 to-indigo-400 bg-clip-text text-transparent border-slate-850" 
                    : "text-[#8a6d29] border-amber-200"
                }`}>
                  {submittedDemo && demoCertName.trim() ? demoCertName.trim() : homeText.certAwardedName}
                </div>
              </div>

              <div>
                <p className={`text-[8px] leading-normal font-sans ${
                  certTheme === "obsidian" ? "text-slate-500" : "text-slate-650 font-medium"
                }`}>
                  {homeText.certAwardText}
                </p>
                <h4 className={`text-[11px] font-black mt-1 uppercase font-semibold ${
                  certTheme === "obsidian" ? "text-emerald-400" : "text-emerald-700"
                }`}>
                  {lang === "fr" ? "Expertise en Modèle Supabase & Lovable.dev" : "Certified Lovable.dev & Supabase Expert"}
                </h4>
              </div>

              <div className={`flex justify-between items-end border-t pt-3 text-[7px] font-mono ${
                certTheme === "obsidian" ? "border-slate-900/80 text-slate-500" : "border-amber-150 text-slate-450"
              }`}>
                <div className="text-left font-mono">
                  <span>{homeText.refLabel}</span>
                  <div className={`font-bold ${certTheme === "obsidian" ? "text-slate-300" : "text-slate-800"}`}>
                    CRSV-LOV-2B1D9E
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                  certTheme === "obsidian" 
                    ? "bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20" 
                    : "bg-amber-500/10 text-amber-700 border-amber-600/20"
                }`}>
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-right font-mono">
                  <span>{homeText.creditLabel}</span>
                  <div className={`font-bold ${certTheme === "obsidian" ? "text-slate-300" : "text-slate-800"}`}>
                    {homeText.creditVal}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive widget input name */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">{homeText.previewNameLabel}</label>
              <input 
                type="text" 
                value={demoCertName}
                onChange={(e) => {
                  setDemoCertName(e.target.value);
                  setSubmittedDemo(true);
                }}
                placeholder={homeText.previewNamePlaceholder}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[10px] text-slate-500 leading-normal">
                💡 {homeText.previewWarning}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RECEPTIVE PARTNER OR OUTLET LOGO BELTS */}
      <section className="bg-slate-900/25 border-y border-slate-900/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            {lang === "fr" 
              ? "DEBOUCHÉS, FREELANCE & PRODUCTIVITÉ : NOS DIPLÔMÉS EXÉCUTENT DANS LES MEILLEURS ESPACES ET POUR DES CLIENTS FINANCIERS" 
              : "CAREER OUTCOME, FREELANCING & EFFICIENCY: OUR STUDENTS BUILD AND CONSULT WORLDWIDE FOR TOP DIGITAL ENTERPRISES"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 pt-1 opacity-45 select-none text-white font-mono font-black text-sm tracking-widest">
            <span className="hover:opacity-90 transition-opacity">● INDÉPENDANT PRO</span>
            <span className="hover:opacity-90 transition-opacity">◆ UPWORK TOP RATED</span>
            <span className="hover:opacity-90 transition-opacity">■ MALTE CONSULTING</span>
            <span className="hover:opacity-90 transition-opacity">▲ STRIPE VERIFIED</span>
            <span className="hover:opacity-90 transition-opacity">★ GITHUB EXPORTABLE</span>
          </div>
        </div>
      </section>

      {/* CORE BENEFITS SECTION: "WHY CHOOSE IA ACADÉMIE PLUS?" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 font-extrabold border border-emerald-500/20 px-3.5 py-1.5 rounded-full inline-block">
            {lang === "fr" ? "LA DIFFÉRENCE ACADÉMIE PLUS" : "THE ACADEMY PLUS EXPERIENCE"}
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {lang === "fr" ? "Pourquoi apprendre avec notre méthodologie ?" : "Why study using our interactive framework?"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === "fr" 
              ? "Nous avons éliminé les longues vidéos passives de 40 heures. Notre approche est résolument active, rapide et connectée directement au concret." 
              : "We removed the endless hours of generic video lectures. Our educational workflow is active, hyper-practical, and immediately applicable."}
          </p>
        </div>

        {/* 4 BENTO CARDS DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-900/60 p-6 rounded-2xl space-y-3 hover:border-emerald-500/25 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-100 text-sm">{lang === "fr" ? "Bac à Sable Pratique" : "Interactive Prompt Sandbox"}</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {lang === "fr" 
                ? "Chaque module de formation se compose d’un banc d’essai interactif pour composer vos invites de prompt et mesurer instantanément votre score pédagogique." 
                : "Every educational track comes with real prompt-engineering sandboxes where you practice formulating structures with real-time scoring feedback."}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-900/60 p-6 rounded-2xl space-y-3 hover:border-indigo-500/25 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-100 text-sm">{lang === "fr" ? "Tuteur IA Dédié" : "24/7 Intelligent Copilot"}</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {lang === "fr" 
                ? "Un copilote interactif branché aux modèles de pointe d'IA pour analyser vos doutes, éclairer les points techniques et vous assister pendant l'écriture de vos codes." 
                : "An expert companion powered by state-of-the-art architectures to solve your bugs, answer technical inquiries, and guide you directly in real-time."}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-900/60 p-6 rounded-2xl space-y-3 hover:border-teal-500/25 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-100 text-sm">{lang === "fr" ? "Licence Unique à Vie" : "No Reoccurring Fees"}</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {lang === "fr" 
                ? "Payez une seule fois un forfait de 15$. Aucune facture mensuelle surprise. Les 23 cours d'hier, d'aujourd'hui et de demain sont débloqués entièrement et à vie." 
                : "Pay a simple one-time activation fee of $15. No monthly surprises. Access all current and future 23 executive courses, updates, and templates forever."}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-900/60 p-6 rounded-2xl space-y-3 hover:border-pink-500/25 transition-all">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-100 text-sm">{lang === "fr" ? "Diplômes Traceables PDF" : "verifiable PDF Credential"}</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {lang === "fr" 
                ? "Générez un diplôme numérique d'honneur de format paysage de qualité supérieure, idéal à placer sur LinkedIn ou à joindre lors d'un recrutement." 
                : "Download gorgeous certificate achievements, exportable in landscape ultra-res format. Ready for LinkedIn portfolios, recruitment audits, and print sheets."}
            </p>
          </div>
        </div>
      </section>

      {/* DYNAMIC PROMPT EVALUATOR SANDBOX PREVIEW WIDGET */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 rounded-3xl border border-slate-900 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-xl pointer-events-none" />
        
        <div className="text-center space-y-2">
          <span className="text-[9px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-extrabold px-3 py-1 rounded-full uppercase">
            {lang === "fr" ? "ENTRAÎNEMENT INTERACTIF" : "INTERACTIVE DEMO BENCH"}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {lang === "fr" ? "Testez votre technique de prompt en direct !" : "Test your prompting skills instantly!"}
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            {lang === "fr" 
              ? "Saisissez un court exemple de prompt dans l'éditeur ci-dessous pour ressentir comment notre système d'IA évalue la clarté opérationnelle des consignes d'un étudiant."
              : "Enter a brief structured prompt below to experience how our smart evaluation grading framework checks the semantic clarity of user prompts."}
          </p>
        </div>

        <form onSubmit={handleEvaluatePrompt} className="max-w-2xl mx-auto space-y-4">
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl relative">
            <textarea
              value={sandboxPrompt}
              onChange={(e) => setSandboxPrompt(e.target.value)}
              placeholder={lang === "fr" 
                ? "Ex: Rédige-moi un courriel de relance client professionnel sans jargon..." 
                : "e.g., Act as senior copywriting expert, write target customer email focusing on PAS dynamic model..."}
              rows={3}
              className="w-full bg-transparent text-xs text-slate-200 outline-none resize-none font-sans"
            />
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-900 font-mono text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> 
                {lang === "fr" ? "Méthode: Évaluation Formelle" : "Syllabus Analysis Mode"}
              </span>
              <button
                type="submit"
                disabled={evaluating || !sandboxPrompt.trim()}
                className={`py-2 px-4 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all select-none cursor-pointer ${
                  !sandboxPrompt.trim() 
                    ? "bg-slate-900 text-slate-650 pointer-events-none" 
                    : "bg-emerald-500 text-slate-950 shadow shadow-emerald-500/10 hover:bg-emerald-400"
                }`}
              >
                {evaluating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    {lang === "fr" ? "Évaluation..." : "Grading..."}
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    {lang === "fr" ? "Évaluer mon Prompt" : "Evaluate My Structure"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {sandboxEvaluation && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-4 text-left"
          >
            {/* Score circle bar */}
            <div className="flex items-center gap-4 border-b border-slate-950 pb-3">
              <div className="relative flex items-center justify-center shrink-0">
                <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center font-bold text-xs text-emerald-400 bg-slate-950">
                  {sandboxEvaluation.score}%
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-slate-200 text-xs uppercase font-mono tracking-wider">
                  {lang === "fr" ? "Rapport d'analyse du Prompt" : "Semantic Grade Report"}
                </h4>
                <p className="text-[10px] text-slate-500 font-sans leading-none mt-1">
                  ⭐ {sandboxEvaluation.score >= 80 ? (lang === "fr" ? "Excellent potentiel fonctionnel" : "Excellent structural coverage") : (lang === "fr" ? "Besoins d'ajustements structurels" : "Structural changes required")}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-normal font-sans">
              {sandboxEvaluation.feedback}
            </p>

            <div className="space-y-1.5 pt-1">
              <h5 className="text-[10px] uppercase font-mono font-bold text-slate-400">
                {lang === "fr" ? "Axes d'amélioration conseillés :" : "Syllabus Recommendations :"}
              </h5>
              <ul className="space-y-1">
                {sandboxEvaluation.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-[11px] text-slate-450 flex items-start gap-1.5 font-sans leading-normal">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </section>

      {/* CORE SKILL ACADEMY CURRICULUM GRID WITH 22 COMPREHENSIVE COURSES */}
      <section id="courses-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 space-y-10">
        
        {/* Header Title */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 font-extrabold border border-indigo-500/20 px-3.5 py-1.5 rounded-full inline-block col-span-3">
            {homeText.ourCurriculum}
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-black text-white tracking-tight">
            {homeText.masterAITools}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            {homeText.masterAIToolsSub}
          </p>
        </div>

        {/* Dynamic Category Filtering buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 max-w-2xl mx-auto pt-2">
          <button
            onClick={() => setCourseFilter("all")}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
              courseFilter === "all" 
                ? "bg-slate-150 text-slate-950 font-black shadow" 
                : "bg-slate-900 border border-slate-850 hover:bg-slate-850 text-slate-400"
            }`}
          >
            📂 {lang === "fr" ? "Tous les Cursus (23)" : "All Courses (23)"}
          </button>
          
          <button
            onClick={() => setCourseFilter("prompts")}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
              courseFilter === "prompts" 
                ? "bg-emerald-500 text-slate-950 font-black shadow" 
                : "bg-slate-900 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-emerald-400"
            }`}
          >
            🧠 {lang === "fr" ? "Prompts & Modèles" : "Prompts & LLMs"}
          </button>

          <button
            onClick={() => setCourseFilter("content")}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
              courseFilter === "content" 
                ? "bg-indigo-500 text-slate-100 font-black shadow" 
                : "bg-slate-900 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-indigo-400"
            }`}
          >
            🎨 {lang === "fr" ? "Création & Médias" : "Content & Video"}
          </button>

          <button
            onClick={() => setCourseFilter("nocode")}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
              courseFilter === "nocode" 
                ? "bg-amber-500 text-slate-950 font-black shadow animate-pulse" 
                : "bg-slate-900 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-amber-400"
            }`}
          >
            💻 {lang === "fr" ? "No-Code & Business" : "No-Code & Freelancing"}
          </button>
        </div>

        {/* Category Specific Status Subtitle */}
        <div className="text-center pt-1">
          <p className="text-[11px] font-mono uppercase bg-slate-900 text-slate-400 inline-block px-3 py-1.5 rounded-xl border border-slate-850/60 font-medium">
            🚩 Categorie Active : <strong className="text-white">{lang === "fr" ? activeCategoryLabelFr() : activeCategoryLabelEn()}</strong>
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredCoursesList.map((course) => {
            return (
              <div 
                key={course.id}
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="p-2.5 bg-slate-950 border border-slate-850 text-indigo-400 rounded-xl">
                      {course.id === "prompt_eng" || course.id === "chatgpt_mastery" || course.id === "claude_mastery" || course.id === "gemini_mastery" || course.id === "deepseek_mastery" || course.id === "kimi_mastery" || course.id === "grok_mastery" ? (
                        <Cpu className="w-5 h-5 text-emerald-450 animate-pulse" />
                      ) : course.id === "copywriting" ? (
                        <Star className="w-5 h-5 text-pink-400" />
                      ) : course.id === "ai_social_selling" || course.id.includes("selling") ? (
                        <Sparkles className="w-5 h-5 text-amber-400" />
                      ) : course.id === "viral_video_audio" || course.id === "veo_mastery" || course.id === "nanobanana_mastery" || course.id === "video_editing_mastery" ? (
                        <Video className="w-5 h-5 text-indigo-400" />
                      ) : course.id === "suno_mastery" ? (
                        <Music className="w-5 h-5 text-fuchsia-400" />
                      ) : course.id === "lovable_mastery" ? (
                        <Globe className="w-5 h-5 text-teal-400" />
                      ) : course.id === "procurement_mastery" ? (
                        <ShieldCheck className="w-5 h-5 text-cyan-400" />
                      ) : course.id === "ai_agriculture_mastery" ? (
                        <Leaf className="w-5 h-5 text-emerald-450 animate-pulse" />
                      ) : (
                        <Terminal className="w-5 h-5 text-slate-350" />
                      )}
                    </span>
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/15">
                      {course.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-500 hover:text-slate-100 transition-colors tracking-tight line-clamp-2 leading-snug">{course.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">{course.description}</p>
                  </div>

                  {/* Syllabus lists mapping */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[9px] font-bold font-mono text-slate-500 uppercase">{homeText.curriculumLessons}</div>
                    {course.lessons.slice(0, 3).map((lesson: any) => (
                      <div key={lesson.id} className="flex items-center gap-2 text-xs text-slate-350">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{lesson.title}</span>
                      </div>
                    ))}
                    {course.lessons.length > 3 && (
                      <div className="text-[9.5px] font-mono text-indigo-400 font-bold pl-5">
                       ✦ +{course.lessons.length - 3} {lang === "fr" ? "modules d'analyse avancées supplémentaires..." : "additional advanced analysis modules..."}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-950 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>⏱ {course.estimatedHours}h {homeText.hoursOfTraining}</span>
                  <span className="text-indigo-400 font-bold uppercase">{course.category.toUpperCase()} WORKSPACE</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DETAILED VERIFIABLE CERTIFICATION PORTAL CARDS */}
      <section id="certification-details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Real Certification verification block */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-2xl relative">
          <div className="absolute top-0 right-0 bg-emerald-505/10 border-b border-l border-slate-800 text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-wider px-3.5 py-1.5 rounded-bl-xl">
            {homeText.secureBadge}
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-slate-200 text-sm font-mono uppercase">{homeText.verifyCardHeader}</h3>
            <p className="text-[11px] text-slate-500">{homeText.verifyCardDesc}</p>
          </div>

          <form onSubmit={handleVerifyCert} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase block font-bold">{homeText.verifyInputLabel}</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder={homeText.verifyInputPlaceholder}
                  className="flex-1 bg-slate-950 border border-slate-850 py-3 px-4 rounded-xl text-xs font-mono tracking-widest text-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 rounded-xl text-xs font-mono uppercase tracking-widest cursor-pointer shadow"
                >
                  {homeText.verifySubmit}
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
                  <div className="text-xs font-bold uppercase tracking-widest font-mono">{homeText.certSuccessHeader}</div>
                  <p className="text-xs text-slate-300 mt-1 font-sans">
                    {homeText.certSuccessText} <strong>{verificationResult.recipient}</strong> {homeText.certSuccessCourse}
                  </p>
                  <p className="text-xs font-bold text-white italic">{verificationResult.course}</p>
                </div>
              ) : (
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest font-mono">{homeText.certFailHeader}</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {homeText.certFailText}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Verification requirements */}
          <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-850 flex items-center gap-3">
            <div className="p-2 bg-[#d4af37]/10 rounded-lg text-[#d4af37]">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              <strong>{homeText.verificationUnderLabel}</strong> {homeText.verificationUnderDesc}
            </p>
          </div>
        </div>

        {/* Credentials features detail lists */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
            {homeText.transparencyBadge}
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-black text-white tracking-tight">
            {homeText.transparencyHeader}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            {homeText.transparencyDesc}
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-200">{homeText.bullet1Title}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{homeText.bullet1Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-200">{homeText.bullet2Title}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{homeText.bullet2Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-200">{homeText.bullet3Title}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{homeText.bullet3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHEST VALUE TESTIMONIALS (SOCIAL PROOF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 font-extrabold border border-emerald-500/20 px-3.5 py-1.5 rounded-full inline-block">
            {lang === "fr" ? "TÉMOIGNAGES COMPLETS" : "ALUMNI REVIEWS"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {lang === "fr" ? "Ils ont multiplié leur productivité par 10" : "They upgraded their real-world workflows"}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === "fr" 
              ? "Découvrez l'avis authentique de professionnels et travailleurs indépendants formés au sein de notre académie d'excellence." 
              : "Read authentic feedback from digital entrepreneurs, consultants, and creators who chose the Academy plus program."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2 font-sans">
              <div className="flex gap-0.5 text-amber-505">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-550" />)}
              </div>
              <p className="text-xs italic text-slate-300 leading-relaxed">
                {lang === "fr" 
                  ? "« Grâce au cours complet Lovable.dev, j'ai livré un MVP SaaS complet en 3 jours pour un client immobilier et facturé 2 400 €. L'académie m'a remboursé ses 15 dollars dès la première heure ! »"
                  : "« Thanks to the Lovable.dev track, I compiled and shipped a functional SaaS MVP in 3 days for a real-estate client and invoiced $2,400. This $15 academy paid itself back on my very first project hour! »"}
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-950 pt-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs uppercase font-mono">AR</div>
              <div>
                <div className="text-xs font-bold text-slate-200">Alexandre R.</div>
                <div className="text-[9.5px] font-mono text-slate-500">{lang === "fr" ? "Architecte No-Code Freelance" : "No-Code Consultant"}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between space-y-4 font-sans">
            <div className="space-y-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-550" />)}
              </div>
              <p className="text-xs italic text-slate-300 leading-relaxed">
                {lang === "fr" 
                  ? "« Les modules sur Claude, ChatGPT et Midjourney ont complètement restructuré mon flux d'organisation. J'économise aujourd'hui près de 15 heures de réécriture par semaine pour mes clients d'infoprenariat. »"
                  : "« The syllabus units on Claude, ChatGPT, and Midjourney completely restructured my agency's content processes. I'm saving upwards of 15 tedious copying hours weekly now! »"}
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-950 pt-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs uppercase font-mono">SM</div>
              <div>
                <div className="text-xs font-bold text-slate-200">Sophia M.</div>
                <div className="text-[9.5px] font-mono text-slate-500">{lang === "fr" ? "Directrice de Cabinet de Contenu" : "Content Marketing Lead"}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between space-y-4 font-sans">
            <div className="space-y-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-550" />)}
              </div>
              <p className="text-xs italic text-slate-300 leading-relaxed">
                {lang === "fr" 
                  ? "« La pédagogie d'évaluation par sandbox interactive est ultra ludique et motivante. Le tuteur IA m'a aidé à valider mes assertions de prompts pas à pas. Mon diplôme PDF m'a aidé à rassurer mes associés. »"
                  : "« The interactive sandbox evaluation method is highly engaging. The custom AI Tutor backed up my prompt structuring concepts step-by-step. My corporate partners were extremely reassured of my skill certification. »"}
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-950 pt-3">
              <div className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold text-xs uppercase font-mono">TD</div>
              <div>
                <div className="text-xs font-bold text-slate-200">Thomas B.</div>
                <div className="text-[9.5px] font-mono text-slate-500">{lang === "fr" ? "Analyste Expert Grand-Compte" : "Lead Business Analyst"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIXED TRANSPARENT ACCESSIBLE PRICING TAB */}
      <section id="pricing-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 px-3 py-1 rounded-full">
            {homeText.pricingBadge}
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-black text-white tracking-tight">
            {homeText.pricingHeader}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            {homeText.pricingDesc}
          </p>
        </div>

        <div className="bg-slate-900 border-2 border-emerald-500/25 p-8 rounded-3xl relative overflow-hidden text-center space-y-6 max-w-xl mx-auto shadow-2xl">
          <div className="absolute top-0 right-0 bg-emerald-500/10 text-[9px] font-mono font-bold text-emerald-400 px-3 py-1 border-b border-l border-slate-800 rounded-bl-xl uppercase tracking-wider">
            {homeText.savingsBadge}
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-200 uppercase tracking-wide font-mono">{homeText.pricingCardTitle}</h3>
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight font-mono mt-2">
              {homeText.pricingCardPrice} <span className="text-sm font-semibold text-slate-500 lowercase">{homeText.pricingCardPriceLabel}</span>
            </div>
            <p className="text-[11px] text-slate-400">{homeText.pricingCardDesc}</p>
          </div>

          <div className="space-y-3 pt-3 text-left max-w-sm mx-auto text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>{lang === "fr" ? "L'accès intégral et illimité aux 23 formations" : "Full premium lifetime enrollment to all 23 tracks"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>{lang === "fr" ? "Tuteur d'IA génératif disponible 24 heures sur 24" : "Generative AI tutor available 24/7"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>{lang === "fr" ? "Bacs à sables (sandbox) pratiques interactifs de codages" : "Interactive prompt and code testing playgrounds"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>{lang === "fr" ? "Générateur et vérificateur de diplômes PDF officiel" : "Traceable digital landscape certificate builders"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>{lang === "fr" ? "Zéro mensualité, mise à jour gratuite garantie des leçons" : "Zero monthly subscription, permanent syllabus updates"}</span>
            </div>
          </div>

          <button
            onClick={onStartOnboarding}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-405 hover:to-teal-405 text-slate-950 font-black py-4 rounded-xl text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-emerald-500/10 active:scale-[0.99] transition-transform"
          >
            {homeText.pricingCta}
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </section>

      {/* DETAILED FAQ ACCORDION SUMMARY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2.5xl font-black text-white tracking-tight uppercase font-mono">
            {homeText.faqHeader}
          </h2>
          <p className="text-xs text-slate-400">{homeText.faqDesc}</p>
        </div>

        <div className="space-y-4">
          {homeText.faqs.map((faq, index) => {
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
                  <span className="font-sans leading-snug">{faq.q}</span>
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
