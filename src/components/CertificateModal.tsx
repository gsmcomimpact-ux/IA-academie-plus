import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { Course, UserProgress } from "../types";
import { X, Printer, Share2, Award, Calendar, ShieldCheck, Edit3, Check, Sparkles, Download } from "lucide-react";

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
    shareSuccess: "PARTAGEZ VOTRE RÉUSSITE",
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
    directorTitle: "🤖 Tuteur IA Académique",
    directorPos: "DIRECTEUR TECHNIQUE",
    printTip: "Astuce d'impression : Cliquez sur le bouton d'impression ci-dessus pour lancer le module de sauvegarde de votre navigateur. Configurez le format en Paysage (Landscape) et décochez les options de marges/en-têtes système pour un rendu parfait.",
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
        "Automatisation de masse de contenu de vente (méthode de la Cascade d'IA)",
        "Configuration de tunnels de messagerie connectés ManyChat x ChatGPT",
        "Modélisation et qualification autonome d'ICP via webhooks Make / Zapier"
      ],
      viral_video_audio: [
        "Génération Text-to-Video cinématique hautes performances (Runway & Sora)",
        "Clonage vocal hyper-réaliste et expressif via onze curseurs ElevenLabs",
        "Composition orchestrale, sound design et mixage natif par l'IA"
      ],
      grok_mastery: [
        "Recherche de données d'opinion chaude en temps réel via le flux X",
        "Maîtrise du mode de pensée profonde intermédiaire de Grok-3 (Reasoning)",
        "Création visuelle d'illustrations d'exception Flux.1 dotées de texte lisible"
      ],
      copilot_mastery: [
        "Intégration et automatisation profonde avec Microsoft Word, Excel et PowerPoint",
        "Conception de Copilot GPTs personnalisés avec des bases de connaissances (RAG)",
        "Pilotage système et orchestration des flux de productivité via Windows 11 Copilot"
      ],
      manus_mastery: [
        "Maîtrise complète de l'agent autonome d'action Manus.ai et du Computer Use",
        "Délégation autonome de l'extraction de leads stratégiques et extraction de données web",
        "Conception, test et débogage d'applications frontend en environnement sécurisé Sandbox"
      ],
      perplexity_mastery: [
        "Formulation experte de requêtes de ciblage complexes avec le mode Pro Search",
        "Filtres avancés et isolation thématique via les modes Focus (Academic, Code, Discussions)",
        "Création d'articles structurés Pages et administration de Collections de veille privées"
      ],
      admin_redaction: [
        "Maîtrise du style administratif (neutralité, précision, formulation impersonnelle)",
        "Conception de notes de synthèse et de comptes-rendus officiels irréprochables",
        "Orchestration de réponses formelles sécurisées aux réclamations et recours légaux"
      ],
      veo_mastery: [
        "Ingénierie de prompts cinématiques avancés et contrôle de cadrage sémantique",
        "Maîtrise de l'inpainting, de l'outpainting et de l'animation d'assets fixes",
        "Simulation hyper-réaliste de physiques environnementales complexes et éclairages"
      ],
      lovable_mastery: [
        "Génération d'applications full-stack performantes et esthétiques en langage naturel",
        "Intégration d'architectures relationnelles Postgres et politiques RLS Supabase",
        "Connexion sécurisée d'API tierces, Stripe Checkout et déploiement en production"
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
        "Rédaction d'offres de candidature hyper-personnalisées et persuasives",
        "Établissement de la grille tarifaire au forfait et de la psychologie des prix"
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
    directorTitle: "🤖 Academic AI Copilot",
    directorPos: "CHIEF TECHNICAL OFFICER",
    printTip: "Print optimization: Select the print option above to launch the system dialog. Set print scale to Landscape format and uncheck system margins/footer options for maximum detail.",
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
        "Mass automation of conversion-focused social copy (Content Cascade framework)",
        "Orchestrating ManyChat x ChatGPT direct message (DM) sales funnels",
        "Autonomous semantic profiling & qualification via Make/Zapier Webhooks"
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
        "Complete mastery of the Manus.ai autonomous action agent and Computer Use capabilities",
        "Autonomous delegation of strategic lead sourcing and cognitive web data scraping",
        "Engineering, verifying, and debugging sandbox web applications directly through natural speech"
      ],
      perplexity_mastery: [
        "Expert prompting across Pro Search guided execution pathways",
        "Advanced isolation filtering through Academic, Code, and Discussion Focus streams",
        "Transforming raw answers into Page layouts and organizing private Research Collections"
      ],
      admin_redaction: [
        "Executive style framing adhering to absolute neutrality, protocol, and clarity",
        "Synthesizing scattered meeting notes into flawless summaries and official records",
        "Resolving public or corporate grievances with legally sound responsive templates"
      ],
      veo_mastery: [
        "High-fidelity cinematic prompt engineering and semantic camera movement control",
        "Mastering inpainting, outpainting, image-to-video editing, and clips expansion",
        "Realistic physical simulation of environmental fluids, lightning, and atmospheric conditions"
      ],
      lovable_mastery: [
        "Generating beautiful and performant full-stack apps using natural language prompting",
        "Integrating relational Postgres databases and Row Level Security on Supabase",
        "Connecting Stripe payments gateways, external APIs, and seamless production deployments"
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
  const [certStyle, setCertStyle] = useState<"dark" | "classic">("dark");
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
    if (course.id === "chatgpt_mastery") {
      return records.chatgpt_mastery;
    }
    if (course.id === "claude_mastery") {
      return records.claude_mastery;
    }
    if (course.id === "gemini_mastery") {
      return records.gemini_mastery;
    }
    if (course.id === "deepseek_mastery") {
      return records.deepseek_mastery;
    }
    if (course.id === "kimi_mastery") {
      return records.kimi_mastery;
    }
    if (course.id === "leonardo_mastery") {
      return records.leonardo_mastery;
    }
    if (course.id === "ai_social_selling") {
      return records.ai_social_selling;
    }
    if (course.id === "viral_video_audio") {
      return records.viral_video_audio;
    }
    if (course.id === "grok_mastery") {
      return records.grok_mastery;
    }
    if (course.id === "copilot_mastery") {
      return records.copilot_mastery;
    }
    if (course.id === "manus_mastery") {
      return records.manus_mastery;
    }
    if (course.id === "perplexity_mastery") {
      return records.perplexity_mastery;
    }
    if (course.id === "admin_redaction") {
      return records.admin_redaction;
    }
    if (course.id === "veo_mastery") {
      return records.veo_mastery;
    }
    if (course.id === "lovable_mastery") {
      return records.lovable_mastery;
    }
    if (course.id === "prompt_eng") {
      return records.prompt_eng;
    }
    if (course.id === "copywriting") {
      return records.copywriting;
    }
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
        scale: 3, // Premium high-def scale
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: true,
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
          /* Completely collapse other elements on the site from layout to make SURE it occupies exactly ONE COPY of target A4 page list */
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
          /* Standard html and body definitions */
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
          /* Outer structural layout of App must match A4 landscape format */
          div.min-h-screen {
            padding: 0 !important;
            margin: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            min-height: 210mm !important;
            background: none !important;
            display: block !important;
          }
          /* Hide all other elements but the modal and certificate */
          body * {
            visibility: hidden !important;
          }
          #certificate-modal-overlay,
          #certificate-modal-overlay * {
            visibility: visible !important;
          }
          /* Force hide elements with no-print */
          .no-print, .no-print * {
            visibility: hidden !important;
            display: none !important;
            height: 0 !important;
          }
          /* Adjust overlay layout for printing */
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
          /* Adjust wrapper popup */
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
          /* Adjust the right container (the canvas wrapper parent) */
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
            padding: 18mm 25mm !important;
            border-width: 12px !important;
            border-style: solid !important;
            border-color: ${certStyle === "classic" ? "#d4af37" : "#059669"} !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: ${certStyle === "classic" ? "#faf9f5" : "#020617"} !important;
            background-color: ${certStyle === "classic" ? "#faf9f5" : "#020617"} !important;
            color: ${certStyle === "classic" ? "#0f172a" : "#ffffff"} !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            align-items: center !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
          }
          /* INCREASED TYPOGRAPHY / FONT SIZES CHOSEN SURGICALLY */
          .printable-cert-area .cert-title {
            font-size: 42pt !important;
            margin-bottom: 4mm !important;
            line-height: 1.15 !important;
          }
          .printable-cert-area .awarded-to {
            font-size: 14pt !important;
            margin-top: 3mm !important;
          }
          .printable-cert-area .recipient-name {
            font-size: 48pt !important;
            line-height: 1.25 !important;
            font-weight: 900 !important;
            display: inline-block !important;
            margin-top: 4mm !important;
            margin-bottom: 4mm !important;
          }
          .printable-cert-area .awarded-sub {
            font-size: 14pt !important;
            line-height: 1.45 !important;
          }
          .printable-cert-area .course-title {
            font-size: 22pt !important;
            font-weight: 800 !important;
            margin-top: 2.5mm !important;
          }
          .printable-cert-area .skills-container {
            padding: 6mm 10mm !important;
            margin-top: 4mm !important;
            border-width: 1px !important;
            border-style: solid !important;
            border-color: ${certStyle === "classic" ? "rgba(15, 23, 42, 0.15)" : "rgba(255, 255, 255, 0.2)"} !important;
            border-radius: 8px !important;
          }
          .printable-cert-area .skills-title {
            font-size: 11.5pt !important;
            margin-bottom: 2.5mm !important;
          }
          .printable-cert-area .skill-badge-text {
            font-size: 13pt !important;
            font-weight: bold !important;
          }
          .printable-cert-area .skill-check {
            font-size: 13.5pt !important;
          }
          .printable-cert-area .cert-footer {
            margin-top: 8mm !important;
            padding-top: 4mm !important;
            border-top-width: 1px !important;
            border-top-style: solid !important;
            border-top-color: ${certStyle === "classic" ? "rgba(15, 23, 42, 0.15)" : "rgba(255, 255, 255, 0.15)"} !important;
          }
          .printable-cert-area .footer-label {
            font-size: 10pt !important;
          }
          .printable-cert-area .footer-val-date {
            font-size: 13pt !important;
          }
          .printable-cert-area .footer-val-id {
            font-size: 12pt !important;
          }
          .printable-cert-area .qr-image {
            width: 22mm !important;
            height: 22mm !important;
          }
          .printable-cert-area .qr-label {
            font-size: 9.5pt !important;
          }
          .printable-cert-area .seal-badge {
            width: 22mm !important;
            height: 22mm !important;
          }
          .printable-cert-area .seal-icon {
            width: 12mm !important;
            height: 12mm !important;
          }
          .printable-cert-area .seal-label {
            font-size: 9.5pt !important;
          }
          .printable-cert-area .sig-title {
            font-size: 14pt !important;
          }
          .printable-cert-area .sig-line {
            height: 1.5px !important;
            background-color: ${certStyle === "classic" ? "rgba(15, 23, 42, 0.25)" : "rgba(255, 255, 255, 0.25)"} !important;
          }
          .printable-cert-area .sig-pos {
            font-size: 9.5pt !important;
          }
          .printable-cert-area .sig-org {
            font-size: 11.5pt !important;
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
        <div className="lg:w-80 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between bg-slate-950/60 no-print">
          <div className="space-y-6">
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
            <div className="space-y-3">
              <label className="text-xs text-slate-400 font-mono uppercase block">{t("styleLabel")}</label>
              <div className="grid grid-cols-2 gap-2">
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
                <button
                  onClick={() => setCertStyle("classic")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    certStyle === "classic" 
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-500" 
                      : "bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-805 hover:text-slate-200"
                  }`}
                >
                  Classic Parchemin
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
              className="w-full bg-emerald-500 hover:bg-emerald-405 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 font-mono transition-all cursor-pointer shadow-lg shadow-emerald-500/5 select-none"
            >
              <Printer className="w-4.5 h-4.5" />
              {t("printBtn")}
            </button>

            <button
              onClick={handleDownloadPNG}
              disabled={downloadingImg}
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-705 text-slate-200 hover:text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 font-mono transition-all cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed select-none"
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
                className="bg-[#0077b5] hover:bg-[#0077b5]/90 text-white font-bold py-2.5 px-3 rounded-lg text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1.5 select-none"
              >
                LinkedIn
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="bg-slate-900 hover:bg-slate-805 text-white font-bold py-2.5 px-3 rounded-lg text-[11px] border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 select-none"
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
        <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between items-center bg-slate-950 overflow-hidden relative min-h-[500px] lg:min-h-[595px]">
          
          {/* Close button on top-right for desktop no-print */}
          <button 
            onClick={onClose}
            className="hidden lg:flex absolute top-4 right-4 p-2 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all cursor-pointer z-10 no-print"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Golden Sparkles for dark mode */}
          {certStyle === "dark" && (
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.05)_0%,transparent_70%)]" />
          )}

          <div 
            ref={certRef}
            className={`printable-cert-area relative w-full h-auto min-h-[520px] aspect-[1.414/1] rounded-2xl border-[10px] p-8 lg:p-14 flex flex-col justify-between items-center text-center shadow-xl transition-colors duration-300 ${
              certStyle === "classic"
                ? "bg-[#faf9f5] border-[#d4af37] text-slate-800 shadow-[#000000]/5"
                : "bg-gradient-to-tr from-slate-950 to-slate-900 border-amber-500/20 text-slate-100 shadow-[#000000]/40"
            }`}
          >
            {/* Corner Decorative Ornaments (Classic has nice golden borders, Dark has modern neat corners) */}
            <div className={`absolute top-3.5 left-3.5 w-8 h-8 border-t-2 border-l-2 ${certStyle === "classic" ? "border-amber-600/60" : "border-emerald-400/30"}`} />
            <div className={`absolute top-3.5 right-3.5 w-8 h-8 border-t-2 border-r-2 ${certStyle === "classic" ? "border-amber-600/60" : "border-emerald-400/30"}`} />
            <div className={`absolute bottom-3.5 left-3.5 w-8 h-8 border-b-2 border-l-2 ${certStyle === "classic" ? "border-amber-600/60" : "border-emerald-400/30"}`} />
            <div className={`absolute bottom-3.5 right-3.5 w-8 h-8 border-b-2 border-r-2 ${certStyle === "classic" ? "border-amber-600/60" : "border-emerald-400/30"}`} />

            {/* Header branding */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-2 font-sans">
                <div className={`w-11 h-7 rounded flex items-center justify-center font-black text-xs md:text-[13px] ${certStyle === "classic" ? "bg-amber-800 text-white" : "bg-emerald-500 text-slate-950"}`}>
                  IA+
                </div>
                <span className={`font-sans font-black text-base lg:text-xl tracking-tight capitalize ${certStyle === "classic" ? "text-amber-900" : "bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent"}`}>
                  IA Académie Plus
                </span>
                <span className="text-[10px] lg:text-xs uppercase font-mono tracking-widest opacity-65 font-bold">
                  STUDIO
                </span>
              </div>
              <div className={`text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold ${certStyle === "classic" ? "text-amber-800/80" : "text-emerald-400"}`}>
                {t("officielBadge")}
              </div>
            </div>

            {/* Certificate Title */}
            <div className="my-2.5 space-y-2.5">
              <h1 className={`cert-title font-serif tracking-normal text-3xl sm:text-4xl lg:text-5xl font-black italic select-none ${certStyle === "classic" ? "text-amber-900" : "text-white"}`}>
                {t("certTitle")}
              </h1>
              <div className={`w-28 h-1 mx-auto rounded-full ${certStyle === "classic" ? "bg-amber-850" : "bg-emerald-500"}`} />
              <p className="awarded-to text-[11px] lg:text-xs uppercase tracking-widest font-mono text-slate-400/85 font-bold px-4">
                {t("awardedTo")}
              </p>
            </div>

            {/* Participant Name */}
            <div className="my-2">
              <span className={`recipient-name text-2xl sm:text-3xl lg:text-5xl font-extrabold font-serif underline decoration-dashed decoration-amber-500/60 underline-offset-10 ${
                certStyle === "classic" ? "text-slate-900" : "text-white"
              }`}>
                {userName}
              </span>
            </div>

            {/* Achievement Text */}
            <div className="max-w-xl my-2 space-y-1.5">
              <p className="awarded-sub text-xs sm:text-sm lg:text-base text-slate-400 leading-relaxed font-sans mt-1">
                {t("awardedSub")}
              </p>
              <h3 className={`course-title text-sm sm:text-base lg:text-xl font-bold tracking-tight font-sans ${certStyle === "classic" ? "text-amber-900" : "text-emerald-400"}`}>
                {course.title} ({course.category === "ai" 
                  ? (lang === "fr" ? "Spécialisation Intelligence Artificielle" : "Specialist Certification in Artificial Intelligence")
                  : (lang === "fr" ? "Compétences Digitales d'Élite" : "Elite Professional Digital Skill Upgrade")})
              </h3>
            </div>

            {/* Skills validation row */}
            <div className={`skills-container max-w-xl mt-1.5 p-3 md:p-4 rounded-xl border flex flex-col items-center justify-center ${
              certStyle === "classic" ? "bg-slate-900/5 border-slate-900/10" : "bg-slate-950/40 border-slate-800"
            }`}>
              <div className="skills-title text-[9.5px] lg:text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 font-bold">{t("skillsRequired")}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center text-xs font-medium text-slate-300 font-sans">
                {getAccomplishments().map((val, idx) => (
                  <span key={idx} className="flex items-center gap-1.5">
                    <span className={`skill-check text-[13px] ${certStyle === "classic" ? "text-amber-700 font-black" : "text-emerald-400"}`}>✓</span>
                    <span className={`skill-badge-text text-xs lg:text-[13px] font-semibold ${certStyle === "classic" ? "text-slate-700" : "text-slate-300"}`}>{val}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row - Signatures and Certificate Verification Seal */}
            {/* Bottom Row - Signatures, QR Code and Certificate Verification Seal */}
            <div className="cert-footer w-full grid grid-cols-4 items-end gap-3 mt-4 pt-4 border-t border-slate-800/20">
              {/* Date & verification ID */}
              <div className="text-left font-mono">
                <div className="footer-label text-[9px] text-slate-500 uppercase tracking-widest font-bold">{t("issuedOn")}</div>
                <div className={`footer-val-date text-xs lg:text-sm font-black ${certStyle === "classic" ? "text-slate-700" : "text-slate-100"}`}>{formattedDate}</div>
                <div className="footer-label text-[8.5px] text-slate-500 uppercase tracking-widest mt-2 font-bold">{t("matricule")}</div>
                <div className={`footer-val-id text-[10px] lg:text-xs font-bold tracking-tight opacity-90 ${certStyle === "classic" ? "text-slate-800" : "text-emerald-400"}`}>{certId}</div>
              </div>

              {/* QR Code Column */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-md shrink-0 flex items-center justify-center transition-all hover:scale-105 min-w-[56px] min-h-[56px]">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="Verification QR Code" 
                      className="qr-image w-14 h-14 lg:w-16 lg:h-16"
                    />
                  ) : (
                    <div className="w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <span className={`qr-label text-[8px] lg:text-[9px] font-mono tracking-wider mt-2 uppercase font-bold ${certStyle === "classic" ? "text-slate-500" : "text-emerald-400/95"}`}>{lang === "fr" ? "Scanner pour Vérifier" : "Scan to Verify"}</span>
              </div>

              {/* Gold Verification Badge / Seal */}
              <div className="flex flex-col items-center justify-center relative">
                <div className={`seal-badge w-14 h-14 lg:w-18 lg:h-18 rounded-full flex items-center justify-center p-2.5 relative shadow-lg ${
                  certStyle === "classic" 
                    ? "bg-amber-600 text-amber-50 outline-double outline-2 outline-offset-2 outline-amber-600" 
                    : "bg-emerald-500 text-slate-950 outline-dashed outline-2 outline-offset-2 outline-emerald-500"
                }`}>
                  <Award className="seal-icon w-8 h-8 lg:w-10 lg:h-10 animate-pulse" />
                  {/* Decorative golden ribbon underlay (CSS visual only) */}
                  <div className="absolute top-12 lg:top-15 left-2 w-2 lg:w-2.5 h-5 lg:h-7 bg-amber-700/80 -rotate-12 rounded-b-sm pointer-events-none" />
                  <div className="absolute top-12 lg:top-15 right-2 w-2 lg:w-2.5 h-5 lg:h-7 bg-amber-700/80 rotate-12 rounded-b-sm pointer-events-none" />
                </div>
                <span className={`seal-label text-[8.5px] lg:text-[9.5px] font-mono tracking-widest font-bold mt-2.5 uppercase ${certStyle === "classic" ? "text-amber-850" : "text-slate-300"}`}>{t("sealLabel")}</span>
              </div>

              {/* Signature lines */}
              <div className="text-right font-sans">
                <div className="sig-title italic font-serif text-xs lg:text-[14px] font-extrabold text-slate-500 tracking-tight">
                  {t("directorTitle")}
                </div>
                <div className="sig-line mt-1 w-full h-[1px]" />
                <div className="sig-pos text-[8.5px] lg:text-[9.5px] font-mono text-slate-500 uppercase tracking-widest mt-1.5 font-bold">{t("directorPos")}</div>
                <div className="sig-org font-mono text-xs lg:text-[13px] font-bold mt-1.5">IA Académie Plus AI</div>
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
