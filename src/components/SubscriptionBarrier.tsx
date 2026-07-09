import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CreditCard, ShieldCheck, Mail, User, Sparkles, CheckCircle2, Lock, 
  ArrowRight, Landmark, HelpCircle, Flame, Award, Globe, HelpCircle as HelpIcon 
} from "lucide-react";

const PLANS = {
  fr: [
    {
      id: "monthly",
      name: "Mensuel",
      price: "9,99 $",
      period: "/ mois",
      saving: "Essai Flexible",
      features: [
        "Accès complet aux 18 formations IA",
        "Retours du Tuteur IA en illimité",
        "Pratique Sandbox interactive",
        "Certificats nominatifs certifiés",
        "Annulation à tout moment"
      ]
    },
    {
      id: "annual",
      name: "Annuel",
      price: "59,99 $",
      period: "/ an",
      saving: "ÉCONOMIE 50%",
      badge: "RECOMMANDÉ",
      features: [
        "Équivaut à seulement 4,99 $ / mois",
        "Accès complet aux 18 formations IA",
        "Retours du Tuteur IA en illimité",
        "Pratique Sandbox interactive",
        "Certificats nominatifs certifiés",
        "Garantie satisfait ou remboursé 30j"
      ]
    },
    {
      id: "lifetime",
      name: "Accès à Vie",
      price: "99,99 $",
      period: " unique",
      saving: "À VIE PRO",
      features: [
        "Payez une seule fois, accédez pour toujours",
        "Accès à vie aux 18 formations IA",
        "Nouveaux cours futurs inclus",
        "Retours du Tuteur IA en illimité à vie",
        "Certificats nominatifs certifiés",
        "Garantie satisfait ou remboursé 30j"
      ]
    }
  ],
  en: [
    {
      id: "monthly",
      name: "Monthly",
      price: "$9.99",
      period: "/ month",
      saving: "Flexible Trial",
      features: [
        "Full access to 18+ AI courses",
        "Unlimited AI Tutor feedback",
        "Interactive Practice Sandbox",
        "Nominative Certified Certificates",
        "Cancel anytime"
      ]
    },
    {
      id: "annual",
      name: "Annual",
      price: "$59.99",
      period: "/ year",
      saving: "SAVE 50%",
      badge: "BEST VALUE",
      features: [
        "Equivalent to just $4.99 / month",
        "Full access to 18+ AI courses",
        "Unlimited AI Tutor feedback",
        "Interactive Practice Sandbox",
        "Nominative Certified Certificates",
        "30-day money back guarantee"
      ]
    },
    {
      id: "lifetime",
      name: "Lifetime Access",
      price: "$99.99",
      period: " one-time",
      saving: "MAX VALUE",
      features: [
        "Pay once, access forever",
        "Lifetime access to 18+ AI courses",
        "Future new courses included",
        "Unlimited AI Tutor feedback forever",
        "Nominative Certified Certificates",
        "30-day money back guarantee"
      ]
    }
  ]
};

interface SubscriptionBarrierProps {
  lang: "fr" | "en";
  onboardingAnswers: Record<string, string | string[]>;
  onPaymentComplete: (fullName: string, email: string, password?: string, firstName?: string, lastName?: string, planId?: string) => void;
  onReset: () => void;
  onLoginClick?: () => void;
  onClose?: () => void;
}

const LOCAL_TRANS = {
  fr: {
    title: "Débloquez votre accès premium à vie",
    sub: "Pour accéder aux ateliers d'élite sur ChatGPT, Gemini, valider vos TP et obtenir votre Certificat Officiel de Fin d'Étude, inscrivez-vous à l'Académie premium.",
    feeUnique: "Frais d'accès unique",
    noSub: "Aucun abonnement récurrent. Accès illimité à vie.",
    saving: "ÉCONOMIE 85%",
    title1: "1. COORDONNÉES DE FACTURATION",
    sub1: "Saisissez vos détails pour l'enregistrement du paiement.",
    billingName: "Nom du titulaire de carte :",
    billingNamePlaceholder: "Nom complet du Payeur",
    email: "Adresse E-mail :",
    emailPlaceholder: "Ex: clara.martin@gmail.com",
    title2: "2. PASSERELLE DE PAIEMENT SÉCURISÉE (20,00 $)",
    sub2: "Réglez l'inscription unique sans aucun frais caché.",
    cardTab: "Carte Bancaire",
    paypalTab: "PayPal / CB",
    cardNumber: "Numéro de Carte de Crédit :",
    expExpiry: "Expiration :",
    expCvc: "CVC (Cryptogramme) :",
    paypalRedirect: "Vous allez être redirigé vers la passerelle cryptée de validation PayPal pour autoriser votre débit unique de 20,00 USD.",
    paypalTip: "Frais de service & taxes compris. Accès élève immédiat dès confirmation.",
    submitBtn: "S'INSCRIRE ET PAYER PAIEMENT UNIQUE DE 20,00 $",
    fillBttn: "⚡ CLIQUEZ ICI POUR REMPLIR LES CRÉDENTIELS DE FACTURATION DE TEST",
    bypassBtn: "🚀 BYPASSER LE PAIEMENT ET ACCÉDER AU CURSUS DIRECTEMENT (DÉMO RAPIDE)",
    footnotePayment: "En procédant au règlement de $20, vous reconnaissez vous inscrire à l'IA Académie Plus et bénéficier d'une licence d'apprenant à vie. Cryptage AES-256 bits conforme PCI-DSS.",
    errName: "Veuillez saisir votre nom complet.",
    errEmail: "Veuillez saisir une adresse e-mail valide.",
    errCard: "Numéro de carte invalide (16 chiffres requis).",
    errExpiry: "Date d'expiration invalide (MM/AA requis).",
    errCvc: "Code de sécurité (CVC) invalide (3 chiffres requis).",
    loaderTitle: "Traitement de votre demande de paiement sécurisé...",
    loaderStep1: "🔑 Chiffrement SSL de la passerelle bancaire...",
    loaderStep2: "🔄 Transmission au réseau d'acquisition (Visa/Mastercard)...",
    loaderStep3: "💳 Autorisation du débit unique de 20,00 $...",
    loaderStep4: "✅ Transaction acceptée ! Préparation de vos cours scolaires...",
    
    // Account creation
    signupTitle: "🎉 PAIEMENT VALIDÉ AVEC SUCCÈS !",
    signupSub: "Créez maintenant votre compte personnel permanent d'étudiant.",
    firstName: "Prénom :",
    lastName: "Nom de Famille :",
    pwdLabel: "Créez votre Mot de Passe de connexion :",
    pwdPlaceholder: "Saisissez un mot de passe sécurisé (min. 6 car.)",
    pwdTip: "Ce mot de passe servira à sécuriser la progression de vos 30 modules.",
    signupBtn: "ACTIVER MON COMPTE & ACCÉDER AU CURSUS",
    signupFootnote: "🛡️ Diplôme nominatif infalsifiable : Le prénom et nom saisis ici seront ceux qui s'afficheront automatiquement sur vos diplômes de masterclass lors de votre réussite globale.",
    
    // Left column checkmarks
    bulletTitle1: "Formations ChatGPT, Gemini, Claude de Niveau Master",
    bulletSub1: "Concepts pro complets, du novice en prompt jusqu'aux templates freelances rentables.",
    bulletTitle2: "Certificat Officiel Nominatif avec ID unique",
    bulletSub2: "Générez, téléchargez et imprimez votre diplôme sécurisé pour valoriser votre CV ou LinkedIn.",
    bulletTitle3: "Sandbox interactive et Tuteur IA branché sur Gemini",
    bulletSub3: "Entraînez-vous en temps réel avec des retours instantanés de l'IA pour évaluer vos réponses.",
    sslSafe: "Données cryptées SSL",
    moneyBack: "Garantie Satisfait ou Remboursé 30j",
    curriculumRecom: "CURSUS RECOMMANDÉ PRÊT",
    testReset: "← Repasser le test"
  },
  en: {
    title: "Unlock Your Lifetime Premium Access",
    sub: "To access elite workshops on ChatGPT, Gemini, pass practical validation labs, and receive your Certified Diploma, join our premium academy.",
    feeUnique: "One-time entrance fee",
    noSub: "No recurring subscription. Unlimited lifetime access.",
    saving: "SAVE 85%",
    title1: "1. BILLING INFORMATION",
    sub1: "Enter your personal details below for secure payment registration.",
    billingName: "Cardholder Name:",
    billingNamePlaceholder: "Payer's full name",
    email: "Email Address:",
    emailPlaceholder: "e.g. clara.martin@gmail.com",
    title2: "2. SECURE PAYMENT GATEWAY ($20.00)",
    sub2: "Pay the single lifetime fee. Zero hidden costs.",
    cardTab: "Credit / Debit Card",
    paypalTab: "PayPal / Credit",
    cardNumber: "Credit Card Number:",
    expExpiry: "Expiration:",
    expCvc: "CVC (Security Code):",
    paypalRedirect: "You will be redirected to PayPal's secure gateway to authorize your one-time payment of 20.00 USD.",
    paypalTip: "Taxes and service fees included. Immediate student credentials upon confirmation.",
    submitBtn: "ENROLL AND PAY ONE-TIME $20.00 FEE",
    fillBttn: "⚡ CLICK HERE TO FILL TEST BILLING DETAILS INSTANTLY",
    bypassBtn: "🚀 BYPASS PAYMENT AND ACCESS CURRICULUM (FAST DEMO)",
    footnotePayment: "By proceeding with the $20 checkout, you enroll at AI Academy Plus and obtain a lifetime student license. AES-256 bits PCI-DSS compliant encryption.",
    errName: "Please enter your full name.",
    errEmail: "Please enter a valid email address.",
    errCard: "Invalid card number (16 digits required).",
    errExpiry: "Invalid expiration date (MM/YY required).",
    errCvc: "Invalid security code (3 digits CVC required).",
    loaderTitle: "Processing secure transaction approval...",
    loaderStep1: "🔑 SSL Gateway cryptographic handshake...",
    loaderStep2: "🔄 Negotiating terminal acquisition network (Visa/MC)...",
    loaderStep3: "💳 Single authorization request of $20.00...",
    loaderStep4: "✅ Transaction accepted! Syncing syllabus modules...",
    
    // Account creation
    signupTitle: "🎉 PAYMENT SUCCESSFULLY AUTHORIZED!",
    signupSub: "Create your permanent, personal student user account now.",
    firstName: "First Name:",
    lastName: "Last Name:",
    pwdLabel: "Create your Login Password:",
    pwdPlaceholder: "Choose a secure password (min. 6 chars)",
    pwdTip: "This password secures your custom progress across all 30 sub-modules.",
    signupBtn: "ACTIVATE ACCOUNT & START ACADEMY",
    signupFootnote: "🛡️ Official certified diploma: The names filled here will print word-for-word on your graduation diploma pdf upon completion.",
    
    // Left column checkmarks
    bulletTitle1: "Master-Level ChatGPT, Gemini, & Claude Cursus",
    bulletSub1: "Step-by-step professional lessons from core principles to high-ticket freelance gigs.",
    bulletTitle2: "Secure Graduation Certificate with Verification ID",
    bulletSub2: "Configure, download and instantly print your high-fidelity obsidian or classic diploma.",
    bulletTitle3: "Gemini-Powered Interactive Sandbox & Live Tutor AI",
    bulletSub3: "Receive real-time automated assessment feedback for your prompts and code blocks as you study.",
    sslSafe: "SSL Secured Connections",
    moneyBack: "30-Day Money-Back Guarantee",
    curriculumRecom: "RECOMMENDED CURRICULUM READY",
    testReset: "← Retake the test"
  }
};

export default function SubscriptionBarrier({ lang, onboardingAnswers, onPaymentComplete, onReset, onLoginClick, onClose }: SubscriptionBarrierProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<"monthly" | "annual" | "lifetime">("annual");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // New States for Post-Payment Account Creation
  const [showAccountCreation, setShowAccountCreation] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [accountError, setAccountError] = useState("");

  const t = (key: keyof typeof LOCAL_TRANS["fr"]) => {
    return LOCAL_TRANS[lang][key] || LOCAL_TRANS["fr"][key] || String(key);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 16);
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  const formatCvc = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg(t("errName"));
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg(t("errEmail"));
      return;
    }

    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        setErrorMsg(t("errCard"));
        return;
      }
      if (expiry.length < 5) {
        setErrorMsg(t("errExpiry"));
        return;
      }
      if (cvc.length < 3) {
        setErrorMsg(t("errCvc"));
        return;
      }
    }

    // Start simulation steps
    setIsSubmitting(true);
    setProcessStep(1);

    setTimeout(() => {
      setProcessStep(2); // secure contact with checkout processor
      setTimeout(() => {
        setProcessStep(3); // transaction authorization
        setTimeout(() => {
          setProcessStep(4); // success activation
          setTimeout(() => {
            // Pre-fill names based on billing fullName if possible
            const nameParts = fullName.trim().split(/\s+/);
            if (nameParts.length > 0) {
              setFirstName(nameParts[0]);
              if (nameParts.length > 1) {
                setLastName(nameParts.slice(1).join(" "));
              }
            }
            setShowAccountCreation(true);
          }, 1200);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAccountError("");

    if (!firstName.trim()) {
      setAccountError(t("errName"));
      return;
    }
    if (!lastName.trim()) {
      setAccountError(t("errName"));
      return;
    }
    if (password.length < 6) {
      setAccountError(lang === "fr" ? "Le mot de passe doit contenir au moins 6 caractères." : "Password must be at least 6 characters.");
      return;
    }

    // Finished account registration and subscription
    const combinedFullName = `${firstName.trim()} ${lastName.trim()}`;
    onPaymentComplete(combinedFullName, email.trim(), password, firstName.trim(), lastName.trim(), selectedPlanId);
  };

  // Focus specific highlight title based on onboarding
  const getPersonalizedHighlight = () => {
    const focus = onboardingAnswers["skill"];
    if (focus === "prompt_engineering") {
      return lang === "fr" 
        ? "Accès immédiat à la Masterclass ChatGPT & Gemini, prompts système avancés, sandbox et tuteur IA persistant."
        : "Immediate access to the Lifetime ChatGPT & Gemini Masterclass, advanced system prompts, design playground, and persistent AI Tutor.";
    }
    if (focus === "copywriting") {
      return lang === "fr"
        ? "Accès total au pack de Copywriting IA pro, aux formules de vente AIDA & PAS, et au générateur de newsletters."
        : "Immediate access to the Elite Copywriting module, high-converting conversion copy blueprints (AIDA, PAS), and custom newsletter generator.";
    }
    return lang === "fr"
      ? "Devenez Freelance IA d'élite : apprenez à packager, tarifer et vendre des micro-services ChatGPT/Gemini complexes."
      : "Immediate access to Elite Freelance AI roadmap: package, scale, and correctly sell intricate ChatGPT or Claude prompt engineering workflows.";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative py-8 px-4 sm:px-6 lg:px-8">
      {/* Background visual graphics */}
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      {/* Corporate header branding */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pb-8 border-b border-slate-900/45 mb-8 gap-4">
        <div className="flex items-center gap-2.5 select-none font-sans">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-extrabold text-slate-950 shadow-md">
            IA
          </div>
          <span className="font-sans font-black text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            {lang === "fr" ? "IA Académie" : "AI Academy"}
          </span>
          <span className="text-[9px] uppercase font-mono tracking-widest bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-850">
            Plus
          </span>
        </div>
        <div className="flex items-center gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-sans font-bold text-slate-400 hover:text-white transition-colors bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-850 cursor-pointer flex items-center gap-1 shadow"
            >
              ✕ {lang === "fr" ? "Retour au cours" : "Back to Course"}
            </button>
          )}
          {onLoginClick && (
            <button
              onClick={onLoginClick}
              className="text-xs font-sans font-extrabold text-emerald-400 hover:text-emerald-300 transition-colors bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 cursor-pointer flex items-center gap-1.5 shadow"
            >
              🔑 {lang === "fr" ? "Se connecter" : "Log in"}
            </button>
          )}
          <button 
            onClick={onReset}
            className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            {t("testReset")}
          </button>
        </div>
      </div>

      <div className="max-w-5.5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        
        {/* LEFT COLUMN: Premium benefits and value block */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 font-extrabold tracking-widest border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
              {t("curriculumRecom")}
            </span>
            <h1 className="text-2.5xl lg:text-3.5xl font-black text-white tracking-tight leading-tight w-full">
              {t("title")}
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("sub")}
            </p>
          </div>

          {/* Core pricing proposal banner */}
          <div className="bg-slate-900/60 border border-emerald-500/10 p-5 rounded-2xl relative overflow-hidden flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                {lang === "fr" ? "Formule sélectionnée" : "Selected Plan"}
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight mt-1">
                {PLANS[lang].find(p => p.id === selectedPlanId)?.price}
              </div>
              <div className="text-[10.5px] text-slate-400 mt-1 uppercase tracking-wider font-semibold font-mono text-indigo-300">
                {PLANS[lang].find(p => p.id === selectedPlanId)?.name} {PLANS[lang].find(p => p.id === selectedPlanId)?.period}
              </div>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 py-1.5 px-3 rounded-xl border border-emerald-500/20 text-center font-mono text-xs font-bold leading-none select-none">
              {PLANS[lang].find(p => p.id === selectedPlanId)?.saving}
            </div>
          </div>

          <p className="text-xs text-emerald-300 bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-xl leading-relaxed font-sans">
            ✨ <strong>{lang === "fr" ? "Finition incluse :" : "Syllabus Bonus:"}</strong> {getPersonalizedHighlight()}
          </p>

          {/* Trust points */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-slate-200">{t("bulletTitle1")}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{t("bulletSub1")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-slate-200">{t("bulletTitle2")}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{t("bulletSub2")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-slate-200">{t("bulletTitle3")}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{t("bulletSub3")}</p>
              </div>
            </div>
          </div>

          {/* Security logo row */}
          <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-505" /> {t("sslSafe")}</span>
            <span>{t("moneyBack")}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: REGISTRATION AND PAYMENT FORM WITH STEP LOADERS */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
          
          <AnimatePresence mode="wait">
            {showAccountCreation ? (
              <motion.form 
                key="account-registration-form"
                onSubmit={handleAccountSubmit}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-emerald-400 text-sm font-sans uppercase">🎉 {t("signupTitle")}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t("signupSub")}</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase block font-bold">{t("firstName")}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Ex: Clara"
                        className="w-full bg-slate-950 border border-slate-800 py-3 pl-10 pr-4 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase block font-bold">{t("lastName")}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Ex: Martin"
                        className="w-full bg-slate-950 border border-slate-800 py-3 pl-10 pr-4 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block font-bold">{lang === "fr" ? "Adresse E-mail pour vos rapports :" : "Email address for learning reports:"}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="email" 
                      disabled
                      value={email}
                      className="w-full bg-slate-950/60 border border-slate-900 py-3 pl-10 pr-4 rounded-xl text-xs text-slate-400 select-none cursor-not-allowed font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block font-bold font-mono">{t("pwdLabel")}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("pwdPlaceholder")}
                      className="w-full bg-slate-950 border border-slate-800 py-3 pl-10 pr-4 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-sans font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">{t("pwdTip")}</p>
                </div>

                {accountError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center rounded-xl font-mono leading-relaxed">
                    ⚠️ {accountError}
                  </div>
                )}

                <button
                  type="submit"
                  id="submit-register-account"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-405 hover:to-teal-405 text-slate-950 font-black py-4 rounded-2xl text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/10 active:scale-[0.99] select-none"
                >
                  {t("signupBtn")}
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-slate-950" />
                </button>

                <p className="text-[9.5px] text-center text-slate-450 leading-relaxed font-sans">
                  🛡️ {t("signupFootnote")}
                </p>
              </motion.form>
            ) : !isSubmitting ? (
              <motion.form 
                key="billing-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5 text-left"
              >
                {/* 3 PLANS SELECTION GROUP */}
                <div className="space-y-3 pb-3 border-b border-slate-800/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      {lang === "fr" ? "⭐ Étape 1 : Sélectionnez votre Formule d'Abonnement" : "⭐ Step 1: Select Your Subscription Plan"}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 font-extrabold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider select-none">
                      {lang === "fr" ? "Sans engagement" : "No contract"}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PLANS[lang].map((plan) => {
                      const isSelected = selectedPlanId === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlanId(plan.id as any)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between text-left select-none ${
                            isSelected
                              ? "bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20"
                              : "bg-slate-950/40 border-slate-850 hover:border-slate-800 hover:bg-slate-950/65"
                          }`}
                        >
                          {plan.badge && (
                            <span className="absolute -top-2.5 right-3.5 text-[8px] font-sans uppercase font-black bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full shadow select-none leading-none tracking-wider">
                              {plan.badge}
                            </span>
                          )}
                          <div>
                            <div className="flex items-center gap-1.5">
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? "border-emerald-500 text-emerald-500 bg-emerald-500/15" : "border-slate-750"
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                              </div>
                              <h4 className="font-extrabold text-[12px] text-white tracking-tight leading-none truncate">{plan.name}</h4>
                            </div>
                            
                            <div className="mt-3">
                              <span className="text-xl font-mono font-black text-white">{plan.price}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{plan.period}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2.5 pt-2 border-t border-slate-850 flex items-center justify-between">
                            <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-wider">{plan.saving}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-b border-slate-800 pb-3 flex items-center justify-between pt-1">
                  <div>
                    <h3 className="font-bold text-slate-200 text-sm font-sans uppercase">
                      {lang === "fr" ? "📋 Étape 2 : Coordonnées de Facturation" : "📋 Step 2: Billing Information"}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{t("sub1")}</p>
                  </div>
                  <User className="w-5 h-5 text-indigo-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase block">{t("billingName")}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t("billingNamePlaceholder")}
                        className="w-full bg-slate-950 border border-slate-800 py-3 pl-10 pr-4 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase block font-bold">{t("email")}</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("emailPlaceholder")}
                        className="w-full bg-slate-950 border border-slate-800 py-3 pl-10 pr-4 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-800 pt-3 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-200 text-sm font-sans uppercase">
                      {lang === "fr" 
                        ? `💳 Étape 3 : Mode de règlement sécurisé (${PLANS["fr"].find(p => p.id === selectedPlanId)?.price})` 
                        : `💳 Step 3: Secure Payment Method (${PLANS["en"].find(p => p.id === selectedPlanId)?.price})`}
                    </h3>
                    <p className="text-[11px] text-slate-505 mt-0.5">
                      {lang === "fr"
                        ? "Réglez votre abonnement sans frais cachés. Annulation simple."
                        : "Pay your selected subscription. Safe and secure checkout with simple cancellation."}
                    </p>
                  </div>
                  <Lock className="w-4 h-4 text-emerald-400" />
                </div>

                {/* Secure Gateway method select */}
                <div className="grid grid-cols-2 gap-3 pb-1">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer text-xs ${
                      paymentMethod === "card" 
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                        : "bg-slate-950 border-slate-850 text-slate-450 hover:bg-slate-900"
                    }`}
                  >
                    <CreditCard className="w-4.5 h-4.5" />
                    {t("cardTab")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer text-xs ${
                      paymentMethod === "paypal" 
                        ? "bg-blue-500/10 border-blue-500 text-blue-400" 
                        : "bg-slate-950 border-slate-850 text-slate-450 hover:bg-slate-900"
                    }`}
                  >
                    <Landmark className="w-4.5 h-4.5" />
                    {t("paypalTab")}
                  </button>
                </div>

                {paymentMethod === "card" ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase block">{t("cardNumber")}</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                        <input 
                           type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="4242 4242 4242 4242"
                          className="w-full bg-slate-950 border border-slate-800 py-3 pl-10 pr-4 rounded-xl text-xs font-mono tracking-widest text-slate-200 focus:outline-none focus:border-emerald-505"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">VISA / MC</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase block">{t("expExpiry")}</label>
                        <input 
                           type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/AA"
                          className="w-full bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-mono tracking-wide text-slate-250 text-center focus:outline-none focus:border-emerald-505"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 uppercase block">{t("expCvc")}</label>
                        <input 
                          type="password"
                          required
                          value={cvc}
                          onChange={(e) => setCvc(formatCvc(e.target.value))}
                          placeholder="123"
                          className="w-full bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-mono tracking-wide text-slate-250 text-center focus:outline-none focus:border-emerald-505"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-slate-950/65 border border-slate-800 text-center space-y-2">
                    <p className="text-xs text-slate-350 leading-relaxed">
                      {lang === "fr"
                        ? `Vous allez être redirigé vers la passerelle sécurisée de PayPal pour autoriser votre règlement de ${PLANS["fr"].find(p => p.id === selectedPlanId)?.price} ${PLANS["fr"].find(p => p.id === selectedPlanId)?.period}.`
                        : `You will be redirected to PayPal's secure gateway to authorize your payment of ${PLANS["en"].find(p => p.id === selectedPlanId)?.price} ${PLANS["en"].find(p => p.id === selectedPlanId)?.period}.`
                      }
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {lang === "fr"
                        ? "Frais de service & taxes de scolarité compris. Accès élève immédiat dès confirmation."
                        : "Taxes and service fees included. Immediate student credentials upon confirmation."
                      }
                    </p>
                  </div>
                )}

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center rounded-xl font-mono leading-relaxed">
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Final Submit Trigger */}
                <button
                  type="submit"
                  id="submit-payment-checkout"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-4 rounded-2xl text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/10 active:scale-[0.99] select-none"
                >
                  {lang === "fr" 
                    ? `S'ABONNER • ${PLANS["fr"].find(p => p.id === selectedPlanId)?.price} ${PLANS["fr"].find(p => p.id === selectedPlanId)?.period}`
                    : `SUBSCRIBE • ${PLANS["en"].find(p => p.id === selectedPlanId)?.price} ${PLANS["en"].find(p => p.id === selectedPlanId)?.period}`
                  }
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-800/60 mt-4 font-mono text-[10px]">
                  <button
                    type="button"
                    onClick={() => {
                      setFullName("Clara Martin");
                      setEmail("clara@academie.plus");
                      setCardNumber("4242 4242 4242 4242");
                      setExpiry("12/29");
                      setCvc("123");
                      setErrorMsg("");
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-dashed border-emerald-500/40 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all font-mono text-[11px] font-bold text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    ⚡ {lang === "fr" ? "CLIQUEZ ICI POUR REMPLIR DES COORDONNÉES DE FACTURATION DE TEST" : "CLICK HERE TO FILL OUT TEST BILLING CREDENTIALS"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      onPaymentComplete("Clara Martin", "clara@academie.plus", "password123", "Clara", "Martin", selectedPlanId);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-dashed border-indigo-500/40 text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all font-mono text-[11px] font-bold text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    🚀 {lang === "fr" ? "BYPASSER LE PAIEMENT ET ACCÉDER AU CURSUS DIRECTEMENT" : "BYPASS PAYMENT & TEST DIRECTLY (DEMO ROAD)"}
                  </button>
                </div>

                <p className="text-[9px] text-center text-slate-500 leading-normal">
                  {t("footnotePayment")}
                </p>
              </motion.form>
            ) : (
              <motion.div 
                key="billing-loader"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                {/* Visual Spinning Lock */}
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-850" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <Lock className="w-7 h-7 text-emerald-400 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2 font-sans">
                  <h3 className="font-extrabold text-white text-base font-sans">
                    {t("loaderTitle")}
                  </h3>
                  <p className="text-[11px] font-mono text-emerald-400 max-w-sm mx-auto leading-relaxed h-10">
                    {processStep === 1 && t("loaderStep1")}
                    {processStep === 2 && t("loaderStep2")}
                    {processStep === 3 && t("loaderStep3")}
                    {processStep === 4 && t("loaderStep4")}
                  </p>
                </div>

                <div className="w-full max-w-xs bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-850">
                  <div 
                    className="h-full bg-emerald-400 transition-all duration-500"
                    style={{ width: `${(processStep / 4) * 100}%` }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>

      </div>

      {/* Footer credits FAQ info */}
      <div className="max-w-4xl mx-auto w-full mt-12 pt-6 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[11px] text-slate-500 font-mono">
        <div>
          <span className="font-bold text-slate-400 flex items-center gap-1 uppercase text-[10px]"><HelpIcon className="w-4 h-4 text-indigo-400" /> {lang === "fr" ? "Quels sont les moyens de paiement ?" : "What payment methods are supported?"}</span>
          <p className="mt-1 text-slate-450 leading-relaxed">
            {lang === "fr" 
              ? "Nous acceptons toutes les cartes de crédit internationales (Visa, Mastercard, Amex) ainsi que PayPal pour un checkout fluide et instantané."
              : "We safely accept all major international credit cards (Visa, Mastercard, American Express) and PayPal for a smooth checkout process."}
          </p>
        </div>
        <div>
          <span className="font-bold text-slate-400 flex items-center gap-1 uppercase text-[10px]"><Award className="w-4 h-4 text-emerald-400" /> {lang === "fr" ? "Le certificat est-il vraiment reconnu ?" : "Is the graduation diploma fully verified?"}</span>
          <p className="mt-1 text-slate-450 leading-relaxed">
            {lang === "fr"
              ? "Oui ! Votre certificat contient un matricule cryptographique de validation unique qui certifie vos compétences réelles lors de vos candidatures ou sur LinkedIn."
              : "Absolutely! Every issued diploma comes printed with a unique safety identification hash confirming prompt qualifications on Résumés and LinkedIn."}
          </p>
        </div>
      </div>
    </div>
  );
}
