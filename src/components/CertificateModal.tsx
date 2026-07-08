import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { Course, UserProgress } from "../types";
import { X, Printer, Share2, Award, Calendar, ShieldCheck, Edit3, Check, Sparkles, Download, ArrowLeft } from "lucide-react";

interface CertificateModalProps {
  lang: "fr" | "en";
  course: Course;
  progress: UserProgress;
  onClose: () => void;
  onUpdateFullName: (name: string) => void;
}

const LOCAL_TRANS = {
  fr: {
    personalize: "PERSONNALISATION",
    fullNameLabel: "Prénom & Nom complet :",
    fullNamePlaceholder: "Ex: Clara Martin (Prénom & Nom)",
    editNameTip: "Saisissez vos prénom et nom de famille complets pour sceller ce titre académique officiel conforme aux critères de recrutement.",
    styleLabel: "Style Visuel :",
    sealVerified: "DIPLÔME VERIFIED DE L'ACADÉMIE",
    certIdDesc: "Ce code certifie de manière unique que vous avez validé toutes les leçons et requis académiques.",
    printBtn: "IMPRIMER / SAUVER PDF",
    downloadPngBtn: "TÉLÉCHARGER EN IMAGE PNG",
    downloadingPng: "GÉNÉRATION DU PNG...",
    shareSuccess: "PARTAGEZ YOUR RÉUSSITE",
    copiedLabel: "Texte Copié (Presse-Papier) !",
    copyBtn: "Copier le Texte & Matricule",
    defaultName: "Élite de l'IA",
    formattedDateLocale: "fr-FR",
    officielBadge: "★ ACADÉMIE D'EXCELLENCE IA & DIGITAL ★",
    certTitle: "Certificat de Réussite",
    awardedTo: "Ce titre académique officiel est fièrement décerné à :",
    awardedSub: "pour avoir complété avec succès et brio l'intégralité du programme pédagogique, des activités de sandbox pratique et des examens de l'Académie :",
    specialization: {
      ai: "Spécialisation Intelligence Artificielle",
      else: "Compétences Digitales d'Élite"
    },
    skillsRequired: "COMPÉTENCES ACQUISES TERMINÉES :",
    issuedOn: "DÉLIVRÉ LE",
    matricule: "MATRICULE DE SÉCURITÉ",
    sealLabel: "SCEAU OFFICIEL",
    directorTitle: "Prof. Élise Laurent",
    directorPos: "Rectrice de l'Académie",
    director2Title: "Dr. Alexandre Vance",
    director2Pos: "Directeur de l'Innovation",
    printTip: "Astuce d'impression : Configurez le format en Paysage (Landscape) et décochez les options de marges/en-têtes système pour un rendu parfait.",
    accomplishments: {
      chatgpt_mastery: [
        "Exploitation experte des Custom Instructions d'OpenAI",
        "Création d'assistants sur mesure (Custom GPTs) sécurisés",
        "Analyse de données complexes et automatisation de rapports"
      ],
      claude_mastery: [
        "Architecture structurante en balises XML avancées",
        "Création d'artéfacts interactifs (Artifacts HTML/React)",
        "Analyse stratégique de documents via la fenêtre géante de 200K"
      ],
      gemini_mastery: [
        "Maîtrise de la fenêtre de contexte géante (2M tokens)",
        "Mise en cache intelligente du contexte (Context Caching)",
        "Création d'agents d'IA connectés et intégration API d'élite"
      ],
      deepseek_mastery: [
        "Architecte de prompts de raisonnement (Reasoning CoT)",
        "Configuration avancée de DeepSeek-R1 en local (Ollama)",
        "Intégration d'API d'élite à coût optimisé (V3 / R1)"
      ],
      kimi_mastery: [
        "Maîtrise de l'ingestion de très longs documents (200k+ caractères)",
        "Extraction d'indicateurs financiers et audits comparatifs de précision",
        "Modélisation et interconnexion de workflows via l'API Moonshot"
      ],
      leonardo_mastery: [
        "Création de visuels photoréalistes d'élite (moteur Phoenix & Lightning)",
        "Contrôle absolu des contrastes, poses et styles (Alchemy & ControlNet)",
        "Génération de décors, animations Motion et entraînement de modèles LoRA"
      ],
      ai_social_selling: [
        "Automatisation de masse de contenu de vente (Cascade d'IA)",
        "Configuration de tunnels de messagerie ChatGPT & ManyChat",
        "Modélisation et qualification autonome d'ICP via webhooks Make"
      ],
      viral_video_audio: [
        "Génération Text-to-Video cinématique (Runway & Sora)",
        "Clonage vocal hyper-réaliste via onze curseurs ElevenLabs",
        "Composition orchestrale, sound design et mixage natif par l'IA"
      ],
      grok_mastery: [
        "Recherche de données d'opinion chaude en temps réel via le flux X",
        "Maîtrise du mode de pensée profonde de Grok-3 (Reasoning)",
        "Création visuelle d'illustrations d'exception Flux.1 dotées de texte"
      ],
      copilot_mastery: [
        "Intégration et automatisation profonde avec Word, Excel et PowerPoint",
        "Conception de Copilot GPTs personnalisés avec RAG",
        "Pilotage système et orchestration des flux via Windows 11 Copilot"
      ],
      manus_mastery: [
        "Maîtrise de l'agent autonome d'action Manus.ai et du Computer Use",
        "Délégation autonome de l'extraction de leads stratégiques",
        "Conception de solutions d'automatisation d'activité en sandbox"
      ],
      perplexity_mastery: [
        "Formulation de requêtes complexes avec le mode Pro Search",
        "Filtres avancés et isolation thématique via les modes Focus",
        "Création d'articles Pages et administration de Collections privées"
      ],
      admin_redaction: [
        "Maîtrise du style administratif (neutralité, précision sémantique)",
        "Conception de notes de synthèse et de rapports d'audience d'impact",
        "Orchestration de réponses formelles sécurisées aux réclamations"
      ],
      veo_mastery: [
        "Ingénierie de prompts cinématiques avancés et cadrage de caméras",
        "Maîtrise de l'inpainting, de l'outpainting et de l'animation d'assets",
        "Simulation de physiques environnementales complexes et éclairages"
      ],
      lovable_mastery: [
        "Génération d'applications full-stack en langage naturel",
        "Intégration d'architectures Postgres et politiques RLS Supabase",
        "Connexion sécurisée d'API tierces, Stripe Checkout et déploiement"
      ],
      prompt_eng: [
        "Formulation de prompt d'élite (Rôle, Tâche, Contexte, Contraintes)",
        "Modèles d'apprentissage par l'exemple (Few-Shot Prompting)",
        "Structuration d'analyses comparatives et données en formats systèmes"
      ],
      copywriting: [
        "Maîtrise du framework de persuasion PAS (Problème, Agitation, Solution)",
        "Création de titres de vente d'impact (Curiosité, Spécificité, Bénéfice)",
        "Déploiement du tunnel de vente AIDA (Attention, Intérêt, Désir, Action)"
      ],
      freelance: [
        "Création de services IA packagés à fort livrable",
        "Rédaction d'offres de candidature hyper-personnalisées",
        "Établissement de la grille tarifaire au forfait"
      ]
    },
    shareText: (title: string, certId: string) => `🎓 Je viens d'obtenir mon Diplôme Certifié en "${title}" de l'IA Académie Plus ! \nMatricule de sécurité : ${certId}\nDécouvrez le programme d'excellence : https://ia-academie-plus.fr`
  },
  en: {
    personalize: "CUSTOMIZATION",
    fullNameLabel: "First Name & Last Name:",
    fullNamePlaceholder: "E.g. Clara Martin (First & Last)",
    editNameTip: "Define your complete professional name to validate this university-grade digital asset compliant with recruiting criteria.",
    styleLabel: "Visual Style:",
    sealVerified: "VERIFIED ACADEMY GRADUATION TITLE",
    certIdDesc: "This unique cryptographic token certifies comprehensive verification of all interactive syllabus steps.",
    printBtn: "PRINT / SAVE AS PDF",
    downloadPngBtn: "DOWNLOAD AS PNG IMAGE",
    downloadingPng: "GENERATING PNG...",
    shareSuccess: "SHARE YOUR ACCOMPLISHMENT",
    copiedLabel: "Copied successfully to Clipboard!",
    copyBtn: "Copy Credentials text",
    defaultName: "AI Elite Scholar",
    formattedDateLocale: "en-US",
    officielBadge: "★ IA & DIGITAL ACADEMY STREAM OF EXCELLENCE ★",
    certTitle: "Certificate of Accomplishment",
    awardedTo: "This certified credential is proudly awarded to:",
    awardedSub: "for excellent and comprehensive validation of all technical chapters, hands-on practice sandbox labs, and academic criteria of:",
    specialization: {
      ai: "Specialist Certification in Artificial Intelligence",
      else: "Elite Professional Digital Skill Upgrade"
    },
    skillsRequired: "REQUISITE SKILLS COMPLETED & MASTERED:",
    issuedOn: "ISSUED ON",
    matricule: "SECURITY SERIAL CODE",
    sealLabel: "OFFICIAL SEAL",
    directorTitle: "Prof. Elise Laurent",
    directorPos: "Dean of the Academy",
    director2Title: "Dr. Alexandre Vance",
    director2Pos: "Director of AI Systems",
    printTip: "Print optimization: Set print scale to Landscape format and uncheck system margins/footer options for maximum detail.",
    accomplishments: {
      chatgpt_mastery: [
        "Expert leveraging of OpenAI Custom Instructions profiles",
        "Building custom secured generative assistants (Custom GPTs)",
        "Advanced data analytics and automated python reporting"
      ],
      claude_mastery: [
        "Advanced structured prompt modeling with XML tag hierarchies",
        "Conceiving interactive dynamic UI components (HTML/React Artifacts)",
        "Large documents synthesis mapping with the 200K token context window"
      ],
      gemini_mastery: [
        "Mastering giant context window operations (2M tokens)",
        "Configuring cost-efficient Context Caching systems",
        "Orchestrating connected web agents and elite prompt APIs"
      ],
      deepseek_mastery: [
        "Architecting reasoning prompts & Chain-of-Thought (CoT)",
        "Advanced deployment of DeepSeek-R1 locally via Ollama",
        "Optimized API orchestration of elite V3/R1 endpoints"
      ],
      kimi_mastery: [
        "Navigating ultra-long document loads (200k+ characters)",
        "Extracting high-precision KPIs and comparative audits",
        "Configuring custom system automations via Moonshot API"
      ],
      leonardo_mastery: [
        "Synthesizing next-gen photorealistic visuals (Phoenix & Lightning)",
        "Precision style mapping, poses, and camera control (Alchemy & ControlNet)",
        "Rendering Motion video assets and compiling fine-tuned LoRA models"
      ],
      ai_social_selling: [
        "Mass automation of conversion-focused social copy (Cascade)",
        "Orchestrating ManyChat x ChatGPT direct message sales funnels",
        "Autonomous semantic profiling & qualification via Make Webhooks"
      ],
      viral_video_audio: [
        "Cinematic high-performance Text-to-Video synthesis (Runway & Sora)",
        "Hyper-realistic voice cloning & dramatic line voicing (ElevenLabs)",
        "Suno orchestral composition, realistic foley effects & audio mixing"
      ],
      grok_mastery: [
        "Real-time trending public sentiment sourcing via the live X stream",
        "Expertise in Grok-3 intermediate deep thought process reasoning logs",
        "High-fidelity visual design & typography using native Flux.1 engines"
      ],
      copilot_mastery: [
        "Deep integration and office task automation with Word, Excel, and PowerPoint",
        "Custom Copilot GPT orchestration incorporating custom knowledge bases (RAG)",
        "Direct Windows 11 machine automation and efficient M365 email management"
      ],
      manus_mastery: [
        "Complete mastery of the Manus.ai autonomous action agent and Computer Use",
        "Autonomous delegation of strategic lead sourcing and web data scraping",
        "Engineering, verifying, and debugging sandbox web applications"
      ],
      perplexity_mastery: [
        "Expert prompting across Pro Search guided execution pathways",
        "Advanced isolation filtering through Academic, Code, and Discussion Focus",
        "Transforming raw answers into Page layouts and organizing Research Collections"
      ],
      admin_redaction: [
        "Executive style framing adhering to absolute neutrality, protocol, and clarity",
        "Synthesizing scattered meeting notes into flawless summaries and official records",
        "Resolving public or corporate grievances with legally sound responsive templates"
      ],
      veo_mastery: [
        "High-fidelity cinematic prompt engineering and sémantic camera movement",
        "Mastering inpainting, outpainting, image-to-video editing, and clips expansion",
        "Realistic physical simulation of environmental fluids and atmospheric conditions"
      ],
      lovable_mastery: [
        "Generating beautiful and performant full-stack apps using natural language",
        "Integrating relational Postgres databases and Row Level Security on Supabase",
        "Connecting Stripe payments gateways, external APIs, and production deployments"
      ],
      prompt_eng: [
        "Elite Prompt Framing (Role, Mission, Context, Constraints)",
        "Few-Shot Exemplar Structural Engineering models",
        "Data formatting, system structures, and reasoning loops"
      ],
      copywriting: [
        "Persuasive PAS framework style (Problem, Agitation, Solve)",
        "Conversion target hooks (Curiosity, Urgency, Gain)",
        "AIDA conversion funnel architecture (Attention, Interest, Desire, Action)"
      ],
      freelance: [
        "Packaging AI deliverables into premium micro-services",
        "Persuasive proposals with localized client personalization",
        "Flat-rate pricing methods and professional negotiations"
      ]
    },
    shareText: (title: string, certId: string) => `🎓 I have just successfully received my Verified Diploma in "${title}" from AI Academy Plus! \nCredentials verification serial: ${certId}\nReview training details: https://ia-academie-plus.fr`
  }
};

export default function CertificateModal({ lang, course, progress, onClose, onUpdateFullName }: CertificateModalProps) {
  const t = (key: keyof typeof LOCAL_TRANS["fr"]) => {
    return LOCAL_TRANS[lang][key] || LOCAL_TRANS["fr"][key] || String(key);
  };

  const defaultName = t("defaultName") as string;
  const [userName, setUserName] = useState(progress.fullName || defaultName);
  const [isEditingName, setIsEditingName] = useState(!progress.fullName);
  const [certStyle, setCertStyle] = useState<"dark" | "classic">("classic");
  const [copiedLink, setCopiedLink] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);
  const [downloadingImg, setDownloadingImg] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // Generate a mock unique verifiable ID
  const certId = `CRSV-${course.category.toUpperCase()}-${Math.abs(course.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) * 12345).toString(16).toUpperCase()}`;

  useEffect(() => {
    let active = true;
    const generateQR = async () => {
      try {
        const verifyUrl = `${window.location.origin}?verify=${certId}&name=${encodeURIComponent(userName)}`;
        const dataUrl = await QRCode.toDataURL(verifyUrl, {
          width: 200,
          margin: 1,
          color: {
            dark: "#090d16",
            light: "#ffffff",
          },
        });
        if (active) {
          setQrDataUrl(dataUrl);
        }
      } catch (err) {
        console.error("Failed to generate offline QR Code:", err);
      }
    };
    generateQR();
    return () => {
      active = false;
    };
  }, [certId, userName]);

  // Get current date formatted
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString(t("formattedDateLocale") as string, options);

  // Custom key accomplishments based on the completed course
  const getAccomplishments = () => {
    const records = LOCAL_TRANS[lang].accomplishments || LOCAL_TRANS["fr"].accomplishments;
    if (course.id === "chatgpt_mastery") return records.chatgpt_mastery;
    if (course.id === "claude_mastery") return records.claude_mastery;
    if (course.id === "gemini_mastery") return records.gemini_mastery;
    if (course.id === "deepseek_mastery") return records.deepseek_mastery;
    if (course.id === "kimi_mastery") return records.kimi_mastery;
    if (course.id === "leonardo_mastery") return records.leonardo_mastery;
    if (course.id === "ai_social_selling") return records.ai_social_selling;
    if (course.id === "viral_video_audio") return records.viral_video_audio;
    if (course.id === "grok_mastery") return records.grok_mastery;
    if (course.id === "copilot_mastery") return records.copilot_mastery;
    if (course.id === "manus_mastery") return records.manus_mastery;
    if (course.id === "perplexity_mastery") return records.perplexity_mastery;
    if (course.id === "admin_redaction") return records.admin_redaction;
    if (course.id === "veo_mastery") return records.veo_mastery;
    if (course.id === "lovable_mastery") return records.lovable_mastery;
    if (course.id === "prompt_eng") return records.prompt_eng;
    if (course.id === "copywriting") return records.copywriting;
    return records.freelance;
  };

  const handleSaveName = () => {
    if (!userName.trim()) return;
    onUpdateFullName(userName.trim());
    setIsEditingName(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPNG = async () => {
    if (!certRef.current) return;
    setDownloadingImg(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2.5, // Premium high-def scale
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const sanitizedName = userName.trim().replace(/[^a-zA-Z0-9]/g, "_");
      const sanitizedCourse = course.title.trim().replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `Certificat_IA_Academie_Plus_${sanitizedCourse}_${sanitizedName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating certificate PNG image with html2canvas:", error);
    } finally {
      setDownloadingImg(false);
    }
  };

  const handleShare = (platform: "link" | "linkedin" | "twitter") => {
    const fn = LOCAL_TRANS[lang].shareText || LOCAL_TRANS["fr"].shareText;
    const shareText = fn(course.title, certId);
    
    if (platform === "linkedin") {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://ia-academie-plus.fr")}&text=${encodeURIComponent(shareText)}`;
      window.open(url, "_blank");
    } else if (platform === "twitter") {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
      window.open(url, "_blank");
    } else {
      navigator.clipboard.writeText(shareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div id="certificate-modal-overlay" className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      
      {/* Print Style Injector */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0 !important;
          }
          body > :not(#root) {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          #root > :not(div.min-h-screen) {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          div.min-h-screen > :not(#certificate-modal-overlay) {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            min-height: 210mm !important;
            max-height: 210mm !important;
            overflow: hidden !important;
            background-color: transparent !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          div.min-h-screen {
            padding: 0 !important;
            margin: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            min-height: 210mm !important;
            background: none !important;
            display: block !important;
          }
          body * {
            visibility: hidden !important;
          }
          #certificate-modal-overlay,
          #certificate-modal-overlay * {
            visibility: visible !important;
          }
          .no-print, .no-print * {
            visibility: hidden !important;
            display: none !important;
            height: 0 !important;
          }
          #certificate-modal-overlay {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            padding: 0 !important;
            margin: 0 !important;
            background: none !important;
            backdrop-filter: none !important;
            display: block !important;
          }
          #certificate-modal-overlay > div {
            border: none !important;
            box-shadow: none !important;
            background: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            display: block !important;
          }
          #certificate-modal-overlay > div > div:last-child {
            padding: 0 !important;
            margin: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            background: none !important;
            display: block !important;
          }
          .printable-cert-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 14mm 18mm !important;
            border-width: 8px !important;
            border-style: double !important;
            border-color: ${certStyle === "classic" ? "#b8860b" : "#10b981"} !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: ${certStyle === "classic" ? "#faf6eb" : "#020617"} !important;
            background-color: ${certStyle === "classic" ? "#faf6eb" : "#020617"} !important;
            color: ${certStyle === "classic" ? "#1e293b" : "#ffffff"} !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            align-items: center !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
          }
          .printable-cert-area .cert-title {
            font-size: 34pt !important;
            margin-bottom: 2mm !important;
            line-height: 1.1 !important;
          }
          .printable-cert-area .awarded-to {
            font-size: 11pt !important;
          }
          .printable-cert-area .recipient-name {
            font-size: 38pt !important;
            line-height: 1.2 !important;
            font-weight: 800 !important;
            margin-top: 2mm !important;
            margin-bottom: 2mm !important;
          }
          .printable-cert-area .awarded-sub {
            font-size: 11pt !important;
            line-height: 1.35 !important;
          }
          .printable-cert-area .course-title {
            font-size: 17pt !important;
            font-weight: 800 !important;
          }
          .printable-cert-area .skills-container {
            padding: 3mm 6mm !important;
            margin-top: 2mm !important;
          }
          .printable-cert-area .skills-title {
            font-size: 9pt !important;
            margin-bottom: 1.5mm !important;
          }
          .printable-cert-area .skill-badge-text {
            font-size: 10pt !important;
          }
          .printable-cert-area .skill-check {
            font-size: 11pt !important;
          }
          .printable-cert-area .cert-footer {
            margin-top: 4mm !important;
            padding-top: 3mm !important;
          }
        }
      `}</style>

      {/* Main container popup */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col lg:flex-row relative"
      >
        
        {/* LEFT SIDE: CUSTOMIZER PANEL (HIDDEN ON PRINT) */}
        <div className="lg:w-80 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between bg-slate-950/60 no-print shrink-0">
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wide font-mono">{t("personalize")}</h3>
              </div>
              <button 
                onClick={onClose} 
                className="lg:hidden p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recipient Name Customization */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-mono uppercase block font-bold">{t("fullNameLabel")}</label>
              {isEditingName ? (
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={t("fullNamePlaceholder") as string}
                    className="flex-1 bg-slate-900 border border-slate-700 py-2 px-3 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                    maxLength={36}
                  />
                  <button 
                    onClick={handleSaveName}
                    disabled={!userName.trim()}
                    className="p-2 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-lg py-2 px-3 text-sm text-slate-100">
                  <span className="font-medium truncate">{userName}</span>
                  <button 
                    onClick={() => setIsEditingName(true)}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-[10.5px] text-slate-400 leading-normal">
                {t("editNameTip")}
              </p>
            </div>

            {/* Template selector */}
            <div className="space-y-2.5">
              <label className="text-xs text-slate-400 font-mono uppercase block">{t("styleLabel")}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCertStyle("classic")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    certStyle === "classic" 
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-500" 
                      : "bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                  }`}
                >
                  Classic Parchemin
                </button>
                <button
                  onClick={() => setCertStyle("dark")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    certStyle === "dark" 
                      ? "bg-slate-900 border-emerald-500 text-emerald-400" 
                      : "bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                  }`}
                >
                  Obsidian Luxe
                </button>
              </div>
            </div>

            {/* Verification box */}
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                {t("sealVerified")}
              </div>
              <div className="font-mono text-xs text-slate-300 font-bold tracking-tight bg-slate-950 py-1 px-2.5 rounded border border-slate-850 select-all">
                {certId}
              </div>
              <p className="text-[9px] text-slate-500 leading-normal">
                {t("certIdDesc")}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-2.5">
            <button
              onClick={handlePrint}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 font-mono transition-all cursor-pointer shadow-lg shadow-emerald-500/5 select-none"
            >
              <Printer className="w-4.5 h-4.5" />
              {t("printBtn")}
            </button>

            <button
              onClick={handleDownloadPNG}
              disabled={downloadingImg}
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 font-mono transition-all cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed select-none"
            >
              {downloadingImg ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
                  {t("downloadingPng")}
                </>
              ) : (
                <>
                  <Download className="w-4.5 h-4.5 text-emerald-400" />
                  {t("downloadPngBtn")}
                </>
              )}
            </button>

            <div className="text-[10px] font-mono text-slate-500 uppercase text-center mt-3">{t("shareSuccess")}</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleShare("linkedin")}
                className="bg-[#0077b5] hover:bg-[#0077b5]/90 text-white font-bold py-2 px-3 rounded-lg text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1.5 select-none"
              >
                LinkedIn
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-lg text-[11px] border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 select-none"
              >
                Twitter / X
              </button>
            </div>

            <button
              onClick={() => handleShare("link")}
              className="w-full bg-slate-950 hover:bg-slate-900 text-slate-350 border border-slate-850 py-2.5 px-4 rounded-xl text-[10px] flex items-center justify-center gap-2 font-mono transition-all cursor-pointer select-none"
            >
              <Share2 className="w-4 h-4 text-indigo-400 font-bold" />
              {copiedLink ? t("copiedLabel") : t("copyBtn")}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: THE DYNAMIC CERTIFICATE CANVAS */}
        <div className="flex-1 p-4 lg:p-8 flex flex-col justify-between items-center bg-slate-950 overflow-hidden relative min-h-[500px] lg:min-h-[595px]">
          
          {/* Close button on top-right for desktop no-print */}
          <button 
            onClick={onClose}
            className="hidden lg:flex absolute top-4 right-4 p-2 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all cursor-pointer z-10 no-print"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Golden Sparkles for dark mode */}
          {certStyle === "dark" && (
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_70%)]" />
          )}

          <div className="w-full overflow-x-auto p-1 flex justify-start lg:justify-center scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <div className="w-full min-w-[740px] lg:min-w-0 shrink-0">
              <div 
                ref={certRef}
                className={`printable-cert-area relative w-full h-auto min-h-[520px] aspect-[1.414/1] rounded-lg p-6 lg:p-11 flex flex-col justify-between items-center text-center shadow-xl transition-colors duration-300 overflow-hidden ${
                  certStyle === "classic"
                    ? "bg-[#faf6eb] border-[8px] border-double border-[#b8860b] text-slate-800 shadow-[#000000]/5"
                    : "bg-slate-950 border-[8px] border-double border-emerald-500/40 text-slate-100 shadow-[#000000]/40"
                }`}
              >
            {/* Elegant Fine Double Border Frame (Watermark style) */}
            <div className={`absolute inset-2 border-2 border-double pointer-events-none rounded-sm ${
              certStyle === "classic" ? "border-[#c5a847]/40" : "border-emerald-500/10"
            }`} />

            {/* Classical Corner Decorative Ornaments */}
            <div className={`absolute top-4 left-4 w-9 h-9 border-t-2 border-l-2 pointer-events-none ${certStyle === "classic" ? "border-[#c5a847]" : "border-emerald-500/30"}`}>
              <div className={`absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full ${certStyle === "classic" ? "bg-[#c5a847]" : "bg-emerald-500/30"}`} />
            </div>
            <div className={`absolute top-4 right-4 w-9 h-9 border-t-2 border-r-2 pointer-events-none ${certStyle === "classic" ? "border-[#c5a847]" : "border-emerald-500/30"}`}>
              <div className={`absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${certStyle === "classic" ? "bg-[#c5a847]" : "bg-emerald-500/30"}`} />
            </div>
            <div className={`absolute bottom-4 left-4 w-9 h-9 border-b-2 border-l-2 pointer-events-none ${certStyle === "classic" ? "border-[#c5a847]" : "border-emerald-500/30"}`}>
              <div className={`absolute bottom-0.5 left-0.5 w-1.5 h-1.5 rounded-full ${certStyle === "classic" ? "bg-[#c5a847]" : "bg-emerald-500/30"}`} />
            </div>
            <div className={`absolute bottom-4 right-4 w-9 h-9 border-b-2 border-r-2 pointer-events-none ${certStyle === "classic" ? "border-[#c5a847]" : "border-emerald-500/30"}`}>
              <div className={`absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${certStyle === "classic" ? "bg-[#c5a847]" : "bg-emerald-500/30"}`} />
            </div>

            {/* Header Branding */}
            <div className="space-y-1 relative z-10">
              <div className="flex items-center justify-center gap-2">
                <div className={`w-8 h-5 rounded flex items-center justify-center font-black text-[10px] ${certStyle === "classic" ? "bg-[#8b6508] text-white" : "bg-emerald-500 text-slate-950"}`}>
                  IA+
                </div>
                <span className={`font-display-academic text-sm lg:text-lg font-black tracking-[0.12em] uppercase ${certStyle === "classic" ? "text-[#5c4308]" : "text-white"}`}>
                  IA Académie Plus
                </span>
              </div>
              <div className={`text-[8px] lg:text-[9.5px] font-mono uppercase tracking-[0.18em] font-extrabold ${certStyle === "classic" ? "text-amber-800/80" : "text-emerald-400"}`}>
                {t("officielBadge")}
              </div>
            </div>

            {/* Certificate Title */}
            <div className="my-2 space-y-2 relative z-10">
              <h1 className={`cert-title font-display-academic tracking-wide text-2xl sm:text-3xl lg:text-[40px] font-black uppercase ${certStyle === "classic" ? "text-[#8b6508]" : "text-white"}`}>
                {t("certTitle")}
              </h1>
              <div className={`w-20 h-[1.5px] mx-auto ${certStyle === "classic" ? "bg-[#c5a847]" : "bg-emerald-500/60"}`} />
              <p className={`awarded-to text-[9.5px] lg:text-[11px] uppercase tracking-[0.14em] font-semibold ${certStyle === "classic" ? "text-slate-500" : "text-slate-400"}`}>
                {t("awardedTo")}
              </p>
            </div>

            {/* Participant Name (Surgically Redesigned using premium Cormorant Garamond font style) */}
            <div className="my-1.5 relative z-10">
              <span className={`recipient-name font-serif-academic italic text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-wide select-text px-4 ${
                certStyle === "classic" ? "text-slate-900 border-b-2 border-double border-[#c5a847]/40 pb-1" : "text-white border-b-2 border-double border-emerald-500/20 pb-1"
              }`}>
                {userName}
              </span>
            </div>

            {/* Achievement Text */}
            <div className="max-w-xl my-2 space-y-1 relative z-10">
              <p className={`awarded-sub text-[11px] lg:text-[12.5px] font-serif-academic italic leading-normal ${certStyle === "classic" ? "text-slate-600" : "text-slate-350"}`}>
                {t("awardedSub")}
              </p>
              <h3 className={`course-title text-sm sm:text-base lg:text-xl font-bold tracking-tight font-display-academic uppercase mt-2 ${certStyle === "classic" ? "text-[#8b6508]" : "text-emerald-400"}`}>
                {course.title}
              </h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-0.5">
                {course.category === "ai" ? (t("specialization") as any).ai : (t("specialization") as any).else}
              </p>
            </div>

            {/* Skills validation container */}
            <div className={`skills-container max-w-xl mt-1 w-full p-2.5 md:p-3.5 rounded-lg border flex flex-col items-center justify-center relative z-10 ${
              certStyle === "classic" ? "bg-slate-900/5 border-slate-900/10" : "bg-slate-950/40 border-slate-800"
            }`}>
              <div className="skills-title text-[8px] lg:text-[9px] font-mono uppercase tracking-[0.12em] text-slate-500 mb-1.5 font-bold">{t("skillsRequired")}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-[11px] font-medium text-slate-300">
                {getAccomplishments().map((val, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <span className={`skill-check text-[11px] font-extrabold ${certStyle === "classic" ? "text-amber-700" : "text-emerald-400"}`}>✓</span>
                    <span className={`skill-badge-text text-[11.5px] lg:text-[12.5px] font-serif-academic ${certStyle === "classic" ? "text-slate-700 font-medium" : "text-slate-300 font-light"}`}>{val}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Row - Dean and Director Signatures, Gold Stamp Seal */}
            <div className="w-full grid grid-cols-3 items-center gap-4 mt-4 pt-3 border-t border-slate-300/10 relative z-10">
              {/* Left Dean Signature Column */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative w-full h-10 flex items-center justify-center">
                  {/* Cursive Blue Ink Path for Real Signature Effect */}
                  <svg className={`absolute top-0 w-24 h-10 pointer-events-none opacity-90 ${certStyle === "classic" ? "text-blue-700/80" : "text-teal-400/85"}`} viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10,25 C25,12 35,35 45,15 C52,5 62,28 85,18 C70,18 55,20 40,22" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className={`font-serif-academic italic font-bold text-xs lg:text-sm tracking-wide ${certStyle === "classic" ? "text-slate-800" : "text-white"}`}>
                    {t("directorTitle")}
                  </div>
                </div>
                <div className={`w-28 h-[0.5px] ${certStyle === "classic" ? "bg-slate-300" : "bg-slate-800"}`} />
                <span className="text-[7.5px] lg:text-[8px] font-mono uppercase tracking-wider text-slate-500 mt-1 block">{t("directorPos")}</span>
              </div>

              {/* Center Embossed Gold Foil Academic Seal */}
              <div className="flex flex-col items-center justify-center relative">
                {certStyle === "classic" ? (
                  <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-tr from-[#8b6508] via-[#e5c158] to-[#9a7b1c] flex items-center justify-center p-0.5 shadow-lg border border-[#8b6508]">
                    <div className="w-full h-full rounded-full border border-dashed border-[#5c4308] flex flex-col items-center justify-center p-0.5">
                      <Award className="w-6 h-6 text-[#5c4308] animate-pulse" />
                      <span className="text-[4px] font-bold uppercase tracking-wider text-[#5c4308]">EXCELLENCE</span>
                    </div>
                    {/* Hanging red velvet ribbons */}
                    <div className="absolute top-11 left-1.5 w-2.5 h-6 bg-[#991b1b] -rotate-12 rounded-b shadow border-r border-[#7f1d1d] pointer-events-none" />
                    <div className="absolute top-11 right-1.5 w-2.5 h-6 bg-[#991b1b] rotate-12 rounded-b shadow border-l border-[#7f1d1d] pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-slate-900 border border-emerald-500/40 flex items-center justify-center p-0.5 shadow-md shadow-emerald-500/5">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500/5 to-teal-500/10 border border-dashed border-emerald-500/30 flex flex-col items-center justify-center p-0.5">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                      <span className="text-[4px] font-mono font-black text-emerald-300 tracking-wider">VERIFIED</span>
                    </div>
                    <div className="absolute top-11 left-2 w-2 h-5 bg-gradient-to-b from-emerald-500/30 to-transparent -rotate-12 rounded-b-sm pointer-events-none" />
                    <div className="absolute top-11 right-2 w-2 h-5 bg-gradient-to-b from-emerald-500/30 to-transparent rotate-12 rounded-b-sm pointer-events-none" />
                  </div>
                )}
                <span className={`text-[7px] lg:text-[8px] font-mono tracking-widest font-bold mt-1.5 uppercase ${certStyle === "classic" ? "text-amber-850" : "text-slate-400"}`}>{t("sealLabel")}</span>
              </div>

              {/* Right Chief Director Signature Column */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative w-full h-10 flex items-center justify-center">
                  {/* Cursive Blue Ink Path for Real Signature Effect */}
                  <svg className={`absolute top-0 w-24 h-10 pointer-events-none opacity-90 ${certStyle === "classic" ? "text-blue-700/80" : "text-teal-400/85"}`} viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15,18 C25,32 40,5 50,22 C60,35 70,10 82,25 C65,22 50,20 35,21" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className={`font-serif-academic italic font-bold text-xs lg:text-sm tracking-wide ${certStyle === "classic" ? "text-slate-800" : "text-white"}`}>
                    {t("director2Title")}
                  </div>
                </div>
                <div className={`w-28 h-[0.5px] ${certStyle === "classic" ? "bg-slate-300" : "bg-slate-800"}`} />
                <span className="text-[7.5px] lg:text-[8px] font-mono uppercase tracking-wider text-slate-500 mt-1 block">{t("director2Pos")}</span>
              </div>
            </div>

            {/* Bottom Row - Digital Cryptographic Verification Panel */}
            <div className="w-full border-t border-slate-300/10 pt-2 flex flex-row items-center justify-between gap-4 mt-2">
              <div className="text-left font-mono">
                <span className="text-[7px] tracking-wider text-slate-500 block uppercase font-bold">{t("issuedOn")}</span>
                <span className={`text-[10px] font-bold ${certStyle === "classic" ? "text-slate-700" : "text-slate-200"}`}>{formattedDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-white p-0.5 rounded border border-slate-200 shadow shrink-0 flex items-center justify-center">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="QR Code" 
                      className="w-8 h-8 lg:w-9 lg:h-9"
                    />
                  ) : (
                    <div className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center">
                      <div className="w-3 h-3 border border-slate-900 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <div className="text-left font-mono leading-none">
                  <span className={`text-[8px] font-bold block uppercase tracking-wider ${certStyle === "classic" ? "text-amber-850" : "text-emerald-400"}`}>{lang === "fr" ? "VÉRIFICATION SECURE" : "ONLINE VERIFICATION"}</span>
                  <span className="text-[7px] text-slate-500 block">{lang === "fr" ? "Scannez pour authentifier" : "Scan to authenticate"}</span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-[7px] tracking-wider text-slate-500 block uppercase font-bold">{t("matricule")}</span>
                <span className={`text-[10px] font-black tracking-tight ${certStyle === "classic" ? "text-slate-800" : "text-emerald-400"}`}>{certId}</span>
              </div>
            </div>

          </div>
          </div>
          </div>

          {/* Prompt warning for print mode info */}
          <div className="mt-4 text-[9.5px] text-slate-500 max-w-lg text-center leading-normal no-print font-mono">
            {t("printTip")}
          </div>

        </div>

      </motion.div>
    </div>
  );
}
