import { COURSES } from "../data";

export type Language = "fr" | "en";

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  fr: {
    // Nav & General Headers
    academyPlus: "IA Académie Plus",
    portalPro: "Accéder au Cursus (Niveau Pro)",
    deconnexion: "Se déconnecter",
    logoutConfirm: "Voulez-vous vous déconnecter de votre compte ? Vos données de progression resteront sauvegardées de manière sécurisée.",
    soundOn: "Activer le son",
    soundOff: "Muet",
    daysStreak: "jours de série",
    progressLabel: "Progression :",
    studentPortal: "ESPACE ÉTUDIANT",
    demoStudentAccount: "COMPTE DE DÉMONSTRATION ÉTUDIANT :",
    demoAccountTip: "💡 Utilisez ce compte de démo pré-rempli pour tester immédiatement.",
    studentLogin: "Connexion Étudiant",
    studentLoginSub: "Accédez à votre espace d'apprentissage IA Académie.",
    emailLabel: "Adresse E-mail :",
    passwordLabel: "Mot de Passe :",
    loginSubmit: "SE CONNECTER EN TANT QU'ÉTUDIANT",
    loginPlaceholder: "Ex: clara@academie.plus",
    passwordPlaceholder: "Saisissez votre mot de passe",
    invalidDemoPass: "Identifiants incorrects. Veuillez utiliser l'adresse et le mot de passe de démonstration fournis.",
    accomplishmentUnlocked: "ACCOMPLISSEMENT DÉBLOQUÉ !",

    // Homepage Strings
    homeTab: "Accueil & FAQ",
    coursesTab: "Formations",
    pricingTab: "Académie Premium",
    certsTab: "Diplômes & PDF",
    heroBadge: "🔥 L'ACADÉMIE DE RÉFÉRENCE INTERNATIONALE",
    heroTitle: "Devenez un Expert d'Élite en IA, Copywriting & Freelancing",
    heroSub: "Maîtrisez les secrets d'application réels de ChatGPT, Gemini et Claude. Pratiquez dans une sandbox interactive accompagnée d'un tuteur IA dédié, et obtenez un certificat officiel nominatif de fin de formation au format PDF immédiat.",
    startJourney: "Démarrer mon évaluation de carrière gratuite",
    dashboardJump: "Aller à mon Tableau de Bord",
    verifiedStudent: "Compte Étudiant Certifié",
    keyStatsTitle: "Pourquoi nous rejoindre ?",
    statLessons: "90 Leçons Interactives",
    statLessonsDesc: "Un parcours guidé de l'initiation aux secrets d'expert d'aujourd'hui.",
    statPractice: "Sandbox Pratique",
    statPracticeDesc: "Fini la théorie ! Pratiquez en direct avec notre valideur IA ultra-précis.",
    statCert: "Diplôme Nominatif A4",
    statCertDesc: "Générez un PDF officiel haute résolution avec clé cryptographique unique.",
    statPrice: "Tarif Unique Unique de 15$",
    statPriceDesc: "Accès à vie, sans abonnement caché, sans engagement d'aucune sorte.",
    verificationTitle: "Vérificateur de Diplômes Officiels",
    verificationSub: "Saisissez un numéro de série étudiant (ex: CRSV-PE-XXXX) pour authenticité.",
    verifyPlaceholder: "Code de vérification (ex: CRSV-PROMPT-77F)",
    verifyBtn: "Vérifier la validité",
    verifySuccess: "✅ Certificat valide et enregistré !",
    verifyRecipient: "Diplômé(e) :",
    verifyCourse: "Formation accomplie :",
    verifyFail: "❌ Aucun certificat correspondant trouvé. Veuillez vérifier l'orthographe du code.",
    testimonialsTitle: "Ce que disent nos diplômés",
    faqTitle: "Questions Fréquentes (FAQ)",

    // Onboarding
    careerOnboardTitle: "Concevons ensemble votre Roadmap d'Apprenant",
    careerOnboardSub: "Répondez à 4 questions pour que notre IA personnalise votre cursus et vos objectifs de rémunération.",
    startOnboardingBtn: "Commencer l'orientation",
    analyseProfileTitle: "Analyse de votre profil en cours...",
    analyseProfileSub: "Notre algorithme IA structure vos 30 modules personnalisés en fonction de vos ambitions...",
    nextStepOnboard: "Continuer l'évaluation",
    finishOnboard: "Générer mon cursus personnalisé",

    // Subscription
    barrierTitle: "Félicitations ! Votre profil est analysé avec succès.",
    barrierSub: "Notre IA a conçu un cursus d'excellence sur-mesure pour atteindre vos objectifs de carrière.",
    barrierRecommendation: "🎯 Notre recommandation prioritaire :",
    barrierActivationTitle: "Activez votre Licence Étudiant",
    barrierFeature1: "Accès à vie complet à l'Académie Plus sans abonnement",
    barrierFeature2: "Tuteur IA intelligent personnel en temps réel (Gemini intégré)",
    barrierFeature3: "90 modules interactifs avec Sandbox de Prompt & Copywriting",
    barrierFeature4: "Certificats officiels nominatifs au format PDF téléchargeables",
    cartLabel: "RÉCAPITULATIF DE LA COMMANDE",
    productName: "Licence d'Apprentissage Immédiate à Vie",
    productPrice: "Paiement unique : 15,00 $",
    billingTitle: "Détails de Facturation Sécurisés (Stripe Demo)",
    billingName: "Nom Complet sur la Carte :",
    billingCard: "Numéro de Carte de Crédit :",
    billingExpiry: "Date d'Expiration :",
    billingCvc: "Code de Sécurité (CVC) :",
    billingSubmit: "S'INSCRIRE ET PAYER PAIEMENT UNIQUE DE 15,00 $",
    billingCreditFill: "⚡ REMPLIR LES CRÉDENTIELS DE FACTURATION DE TEST",
    billingBypass: "🚀 ACCÉDER DIRECTEMENT AU CURSUS (DÉMO RAPIDE)",
    billingFootnote: "En procédant au règlement, vous bénéficiez d'une licence d'apprenant à vie. Cryptage AES-256 conforme PCI-DSS.",

    // Dashboard UI
    profilTitle: "PROFIL APPRENANT",
    levelPrefix: "Niveau",
    levelTotalXp: "XP total",
    copilotLaunch: "Tuteur IA Personnalisé",
    copilotLaunchSub: "Posez-moi vos questions pratiques !",
    roadmapHeader: "VOTRE PROGRAMME DE FORMATION ACTIF",
    courseStatusCompleted: "SESSIONS TERMINÉES",
    xpRewardLabel: "XP MAX",
    courseHeaderSelector: "SÉLECTIONNEZ UN CURSUS D'APPRENTISSAGE",
    allAchievementsHeader: "VOS ACCOMPLISSEMENTS ET MÉDAILLES",
    viewCertifBtn: "🎖️ Consulter mon Certificat",
    launchLessonBtn: "Commencer le module",
    congratsCourseDoneTitle: "Félicitations ! Vous avez validé l'intégralité de ce cursus avec brio.",
    congratsCourseDoneSub: "Débloquez immédiatement votre certificat officiel nominatif pour valoriser votre expertise auprès de vos pairs, recruteurs ou partenaires professionnels.",
    daysStreakCompleted: "jours de série accomplis !",
    claimDailyXp: "Réclamer mes 10 XP bonus aujourd'hui",
    xpClaimedSuccess: "Félicitations ! Vous avez collecté vos 10 XP quotidiens.",

    // Course Player UI
    coursePlayerBack: "← Retour au Tableau de Bord",
    courseProgressLabel: "Progression du Cours",
    courseStepHeader: "Concepts Clés & Enseignements",
    activityHeader: "Activité Pratique Exigée",
    activityInstructions: "Consignes de l'exercice :",
    inputPromptLabel: "Votre zone de saisie interactive :",
    evaluateSubmitBtn: "Soumettre pour évaluation IA...",
    quizSubmitBtn: "Valider ma réponse",
    evaluatingFeedback: "🧠 Notre valideur IA analyse votre soumission...",
    lessonSuccessTitle: "Leçon Validée ! +50 XP",
    lessonSuccessSub: "Excellent travail d'assimilation. Vous vous rapprochez un peu plus de votre diplôme final.",
    nextLessonBtn: "Passer à la leçon suivante",
    finishCourseBtn: "Compléter le cours et décrocher mon Diplôme !",
    sandboxIntro: "Saisissez votre prompt d'application pratique ici...",
    editorTitle: "Éditeur de Copywriting Professionnel",
    scenarioLabel: "Scénario client :",
    audienceLabel: "Cible :",
    goalLabel: "Objectif attendu :",
    validationHint: "Conseil : Essayez de vous conformer aux directives d'exemple pour débloquer automatiquement le module !",

    // Copilot
    copilotWelcome: "Bonjour ! Je suis votre tuteur IA personnel d'Académie Plus. Je peux répondre à vos questions sur le Prompt Engineering, le Copywriting, ou le Freelacing en direct. Que souhaitez-vous perfectionner ?",
    copilotGoldenPromptRules: "Formule d'or du Prompt",
    copilotPASFramework: "Framework Copy PAS",
    copilotFreelanceTips: "Conseils Freelance",
    copilotPlaceholder: "Saisissez votre message sur les cours ou vos projets...",
    copilotSendBtn: "Envoyer",

    // Certificate Builder
    certTitleDefault: "CERTIFICAT DE FIN D'ÉTUDES",
    certBodyPrefix: "Ce diplôme officiel est délivré avec fierté à :",
    certBodySlogan: "Pour avoir accompli et validé avec succès l'ensemble des modules d'expertise de la formation théorique et pratique :",
    certFooterDate: "Délivré le :",
    certFooterHash: "Matricule d'Authentification Cryptographique :",
    certLayoutChoose: "Choisissez le modèle esthétique de votre certificat :",
    certBlackObsidian: "Modèle Obsidian Nocturne",
    certClassicWhite: "Modèle Classic Professionnel",
    certA4SubText: "Ce document est optimisé pour un rendu au format paysage A4 haute définition.",
    certPrintBtn: "🖨️ Imprimer mon diplôme nominatif",
    certCloseBtn: "Fermer l'espace diplôme"
  },
  en: {
    // Nav & General Headers
    academyPlus: "AI Academy Plus",
    portalPro: "Access Syllabus (Pro Level)",
    deconnexion: "Log Out",
    logoutConfirm: "Do you want to log out of your account? Your progress data will remain securely saved.",
    soundOn: "Enable sound",
    soundOff: "Mute",
    daysStreak: "days streak",
    progressLabel: "Progress:",
    studentPortal: "STUDENT PORTAL",
    demoStudentAccount: "STUDENT DEMO ACCOUNT:",
    demoAccountTip: "💡 Use this pre-filled demo account to test instantly.",
    studentLogin: "Student Login",
    studentLoginSub: "Access your AI Academy learning space.",
    emailLabel: "Email Address:",
    passwordLabel: "Password:",
    loginSubmit: "LOG IN AS A STUDENT",
    loginPlaceholder: "E.g., clara@academie.plus",
    passwordPlaceholder: "Enter your password",
    invalidDemoPass: "Incorrect credentials. Please use the provided email and demo password.",
    accomplishmentUnlocked: "ACHIEVEMENT UNLOCKED!",

    // Homepage Strings
    homeTab: "Home & FAQ",
    coursesTab: "Courses",
    pricingTab: "Premium Academy",
    certsTab: "Certificates & PDF",
    heroBadge: "🔥 THE ULTIMATE INTERNATIONAL AI ACADEMY",
    heroTitle: "Become an Elite Expert in AI, Copywriting & Freelancing",
    heroSub: "Master the real application secrets of ChatGPT, Gemini, and Claude. Practice in an interactive coding sandbox with a dedicated AI tutor, and obtain an official personalized completion certificate in high-quality printable PDF format instantly.",
    startJourney: "Start my free career assessment",
    dashboardJump: "Go to my Learner Dashboard",
    verifiedStudent: "Certified Student Account",
    keyStatsTitle: "Why Join Us?",
    statLessons: "90 Interactive Lessons",
    statLessonsDesc: "A guided learning path from raw initiation to modern executive master levels.",
    statPractice: "Hands-on Sandbox",
    statPracticeDesc: "No more passive theory! Practice live with our ultra-precise AI validator.",
    statCert: "Nominative A4 Certificate",
    statCertDesc: "Generate an official high-resolution PDF with a unique cryptographic verification serial key.",
    statPrice: "One-Time $15 Activation",
    statPriceDesc: "Lifetime access, no hidden subscriptions, no commitments of any kind.",
    verificationTitle: "Official Verification Portal",
    verificationSub: "Enter a student graduate serial number (e.g., CRSV-PE-XXXX) to authenticate credentials.",
    verifyPlaceholder: "Verification code (e.g., CRSV-PROMPT-77F)",
    verifyBtn: "Verify Code Validity",
    verifySuccess: "✅ Valid and registered certificate!",
    verifyRecipient: "Graduate:",
    verifyCourse: "Completed Program:",
    verifyFail: "❌ No matching certificate found. Please check the spelling of your code.",
    testimonialsTitle: "What our graduates are saying",
    faqTitle: "Frequently Asked Questions (FAQ)",

    // Onboarding
    careerOnboardTitle: "Let's Design Your Personal Learner Roadmap",
    careerOnboardSub: "Answer 4 quick orientation questions to customize your syllabus, active focus, and target incomes.",
    startOnboardingBtn: "Begin Career Orientation",
    analyseProfileTitle: "Analyzing your profile...",
    analyseProfileSub: "Our AI model is structuring your 30 personalized interactive modules based on your career goals...",
    nextStepOnboard: "Next Question",
    finishOnboard: "Generate My Customized Syllabus",

    // Subscription
    barrierTitle: "Congratulations! Your profile has been successfully analyzed.",
    barrierSub: "Our AI has formulated an elite personalized curriculum to help you achieve your career goals.",
    barrierRecommendation: "🎯 Core Recommended Stream:",
    barrierActivationTitle: "Activate Your Student License",
    barrierFeature1: "Complete lifetime access to AI Academy Plus without subscriptions",
    barrierFeature2: "Real-time, context-aware smart AI Tutor (Gemini-powered)",
    barrierFeature3: "90 interactive study units with live Prompt & Copywriting sandboxes",
    barrierFeature4: "Downloadable official nominative A4 high-res PDF certifications",
    cartLabel: "ORDER INVOICE SUMMARY",
    productName: "Immediate Lifetime Learning Activation License",
    productPrice: "One-time payment: $15.00",
    billingTitle: "Secure Billing Information (Stripe Demo)",
    billingName: "Full Name on Card:",
    billingCard: "Credit Card Number:",
    billingExpiry: "Expiration Date:",
    billingCvc: "Security Code (CVC):",
    billingSubmit: "ENROLL AND ACCESS SYLLABUS FOR ONE-TIME $15.00",
    billingCreditFill: "⚡ PRE-FILL TEST BILLING CREDENTIALS",
    billingBypass: "🚀 BYPASS PAYMENT AND ACCESS SESSIONS DIRECTED (QUICK DEMO)",
    billingFootnote: "By purchasing, you gain lifetime access to all streams. AES-256 standard PCI-DSS compliant.",

    // Dashboard UI
    profilTitle: "LEARNER PROFILE",
    levelPrefix: "Level",
    levelTotalXp: "total XP",
    copilotLaunch: "AI Personal Tutor",
    copilotLaunchSub: "Ask me anything about your current session!",
    roadmapHeader: "YOUR ACTIVE STUDY SYLLABUS",
    courseStatusCompleted: "SESSIONS COMPLETE",
    xpRewardLabel: "MAX XP",
    courseHeaderSelector: "SELECT AN EDUCATION STREAM",
    allAchievementsHeader: "YOUR EARNED BADGES AND CREDENTIALS",
    viewCertifBtn: "🎖️ View My Certificate",
    launchLessonBtn: "Start Study Module",
    congratsCourseDoneTitle: "Splendid! You have successfully mastered 100% of this educational stream.",
    congratsCourseDoneSub: "Unlock and download your official nominative A4 executive diploma to highlight your AI and copywriting skills to recruiters and clients worldwide.",
    daysStreakCompleted: "days streak achieved!",
    claimDailyXp: "Claim my +10 XP daily streak reward",
    xpClaimedSuccess: "Excellent! You have claimed your +10 daily check-in XP.",

    // Course Player UI
    coursePlayerBack: "← Back to Learner Dashboard",
    courseProgressLabel: "Stream Study Progress",
    courseStepHeader: "Core Knowledge & Guidelines",
    activityHeader: "Required Interactive Exercise",
    activityInstructions: "Exercise Goal & Instructions:",
    inputPromptLabel: "Interactive Saisie / Answer Sandbox:",
    evaluateSubmitBtn: "Submit for AI Evaluation...",
    quizSubmitBtn: "Submit and Validate Answer",
    evaluatingFeedback: "🧠 Our AI Validator is grading your submission...",
    lessonSuccessTitle: "Session Mastered! +50 XP",
    lessonSuccessSub: "Excellent work holding onto these parameters. You are closer to your graduation.",
    nextLessonBtn: "Next Study Lesson",
    finishCourseBtn: "Complete Course & Claim PDF Certificate!",
    sandboxIntro: "Type your custom practical prompt in this sandbox...",
    editorTitle: "Professional Writing Console",
    scenarioLabel: "Client Project Scenario:",
    audienceLabel: "Target Audience:",
    goalLabel: "Aimed Output Goal:",
    validationHint: "Hint: Try to align with the provided guidelines/examples to automatically unlock this module!",

    // Copilot
    copilotWelcome: "Hi! I am your AI personal coach at Academy Plus. I can answer your questions about Prompt Engineering, high-converting Copywriting, or Freelancing live. What are you looking to perfect today?",
    copilotGoldenPromptRules: "Golden Prompt Structure",
    copilotPASFramework: "PAS Copywriting Method",
    copilotFreelanceTips: "Freelance Client Tips",
    copilotPlaceholder: "Type your questions here regarding class or career...",
    copilotSendBtn: "Send Message",

    // Certificate Builder
    certTitleDefault: "CERTIFICATE OF MASTER COMPLETION",
    certBodyPrefix: "This official certificate is proudly awarded to:",
    certBodySlogan: "For successfully mastering and validating all theoretical and practical expertise components of the syllabus:",
    certFooterDate: "Delivered on:",
    certFooterHash: "Unique Cryptographic Authentication Key:",
    certLayoutChoose: "Configure Certificate Theme Style:",
    certBlackObsidian: "Midnight Obsidian Theme",
    certClassicWhite: "Professional Classic Light Theme",
    certA4SubText: "This certificate layout is optimized for ultra-high-resolution Landscape A4 printing.",
    certPrintBtn: "🖨️ Export PDF or Print Certificate",
    certCloseBtn: "Close Certificate Workspace"
  }
};

export const ONBOARDING_QUESTIONS_FR = [
  {
    id: "goal",
    text: "Quel est votre objectif principal ?",
    type: "single",
    options: [
      { value: "earn_money", label: "Générer un revenu complémentaire", description: "Lancer un side-hustle en toute liberté", icon: "DollarSign" },
      { value: "career_change", label: "Changer de carrière (Télétravail)", description: "Découvrir des métiers recherchés et flexibles", icon: "Briefcase" },
      { value: "ai_skills", label: "Maîtriser l'Intelligence Artificielle", description: "Devenir un expert incontournable des outils IA", icon: "Cpu" },
      { value: "time_efficiency", label: "Gagner du temps au quotidien", description: "Automatiser mes tâches répétitives au travail", icon: "Clock" }
    ]
  },
  {
    id: "experience",
    text: "Quel est votre niveau actuel avec l'IA ?",
    type: "single",
    options: [
      { value: "beginner", label: "Débutant complet", description: "Je n'ai jamais ou peu utilisé ChatGPT", icon: "Award" },
      { value: "intermediate", label: "Utilisateur occasionnel", description: "Je pose des questions simples parfois", icon: "Sparkles" },
      { value: "advanced", label: "Praticien régulier", description: "Je sais structurer de bons prompts", icon: "Zap" }
    ]
  },
  {
    id: "skill",
    text: "Quelle compétence vous attire le plus ?",
    type: "single",
    options: [
      { value: "prompt_engineering", label: "Prompt Engineering & IA", description: "Savoir parler aux modèles d'IA professionnels", icon: "Command" },
      { value: "copywriting", label: "Copywriting & Création de Contenu", description: "Rédiger des textes persasifs et percutants", icon: "PenTool" },
      { value: "freelance", label: "Freelancing & Job à Distance", description: "Trouver des clients et vendre mes services en ligne", icon: "Globe" }
    ]
  },
  {
    id: "daily_time",
    text: "Combien de temps pouvez-vous y consacrer ?",
    type: "single",
    options: [
      { value: "15", label: "15 min / jour", description: "Idéal pour apprendre en douceur", icon: "Flame" },
      { value: "30", label: "30 min / jour", description: "Recommandé pour progresser rapidement", icon: "GraduationCap" },
      { value: "60", label: "1 heure / jour", description: "Pour les plus motivés et pressés", icon: "TrendingUp" }
    ]
  }
];

export const ONBOARDING_QUESTIONS_EN = [
  {
    id: "goal",
    text: "What is your main professional goal?",
    type: "single",
    options: [
      { value: "earn_money", label: "Generate Side Income", description: "Launch and grow a highly profitable freelance path", icon: "DollarSign" },
      { value: "career_change", label: "Switch Careers (WFM)", description: "Discover high-demand, 100% remote digital opportunities", icon: "Briefcase" },
      { value: "ai_skills", label: "Master Generative AI", description: "Become an indispensable expert in leading-edge AI systems", icon: "Cpu" },
      { value: "time_efficiency", label: "Save Time Daily", description: "Automate repetitive tasks at your current occupation", icon: "Clock" }
    ]
  },
  {
    id: "experience",
    text: "What is your current experience with AI tools?",
    type: "single",
    options: [
      { value: "beginner", label: "Complete Novice", description: "I've rarely or never used ChatGPT or Gemini", icon: "Award" },
      { value: "intermediate", label: "Occasional User", description: "I sometimes type simple questions or drafts", icon: "Sparkles" },
      { value: "advanced", label: "Regular Praciticioner", description: "I structure detailed prompts and instructions", icon: "Zap" }
    ]
  },
  {
    id: "skill",
    text: "Which skill attracts you the most?",
    type: "single",
    options: [
      { value: "prompt_engineering", label: "Prompt Engineering & AI Systems", description: "Learn to command enterprise generative models", icon: "Command" },
      { value: "copywriting", label: "Copywriting & High-Converting Content", description: "Create compelling, high-converting copy that sells", icon: "PenTool" },
      { value: "freelance", label: "Consulting & Distance Careers", description: "Find clients and monetize digital services anywhere", icon: "Globe" }
    ]
  },
  {
    id: "daily_time",
    text: "How much time can you dedicate daily?",
    type: "single",
    options: [
      { value: "15", label: "15 min / day", description: "Great for easy-going micro-learning habits", icon: "Flame" },
      { value: "30", label: "30 min / day", description: "Recommended for rapid, strong progress", icon: "GraduationCap" },
      { value: "60", label: "1 hour / day", description: "For the most motivated, career-driven minds", icon: "TrendingUp" }
    ]
  }
];

export const ONBOARDING_TRANSLATIONS = {
  fr: ONBOARDING_QUESTIONS_FR,
  en: ONBOARDING_QUESTIONS_EN
};

export const ACHIEVEMENTS_EN = [
  { id: "onboard", title: "Compass Activated", description: "Completed the custom career orientation questionnaire", icon: "Compass", color: "from-blue-500 to-teal-400" },
  { id: "prompt_novice", title: "Prompt Initiated", description: "Completed the first lesson in Prompt Engineering", icon: "Terminal", color: "from-purple-500 to-indigo-500" },
  { id: "copy_champ", title: "Persuasive Quill", description: "Wrote first high-converting copy using the PAS framework", icon: "PenSingle", color: "from-orange-500 to-pink-500" },
  { id: "streak_3", title: "Unbreakable Habit", description: "Checked in and completed lessons for 3 consecutive days", icon: "Flame", color: "from-red-500 to-orange-500" },
  { id: "all_courses", title: "Digital Gladiator", description: "Explored all current learning streams in the academy", icon: "Award", color: "from-green-500 to-emerald-400" }
];

export interface TranslatedCourseContent {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessons: {
    id: string;
    title: string;
    description: string;
    steps: string[];
    activityInstructions?: string;
    quizQuestion?: string;
    quizOptions?: string[];
    explanation?: string;
    scenario?: string;
    audience?: string;
    goal?: string;
  }[];
}

export const ENGLISH_COURSES_TRANSLATIONS: Record<string, TranslatedCourseContent> = {
  chatgpt_mastery: {
    title: "Complete ChatGPT Course: Master AI in 20 Modules",
    description: "Become a power-user of ChatGPT: Custom Instructions, advanced data analysis, Custom GPTs, desktop integration, and automation.",
    difficulty: "Advanced",
    lessons: [
      {
        id: "cg_l1",
        title: "Introduction to the ChatGPT & GPT-4o-mini Ecosystem",
        description: "Start strong by mastering the fundamentals of GPT-4o, account settings, and interface management.",
        steps: [
          "ChatGPT is OpenAI's state-of-the-art model that democratized AI across the globe.",
          "The main interface consists of three parts: the sidebar containing your thread history, the main prompt workbench, and the model selector (GPT-4o, GPT-4o-mini, or GPT-4).",
          "GPT-4o is the smartest model, capable of multi-modal reasoning (understanding text, images, and speech).",
          "GPT-4o-mini is a lightning-fast, highly cost-effective model designed for everyday tasks and high-volume debugging."
        ],
        activityInstructions: "Compose a prompt for GPT-4o-mini asking it to summarize the concept of generative AI in 3 simple, understandable bullet points.",
        scenario: "Direct generation of a tailored bulleted content summary.",
        audience: "Curious tech-starters.",
        goal: "Understand generative models simply."
      },
      {
        id: "cg_l2",
        title: "The Art of Zero-Shot & Direct Prompting",
        description: "Learn to query ChatGPT efficiently for straightforward instructions in a single step without examples.",
        steps: [
          "Zero-shot prompting refers to giving ChatGPT a task or a question without introducing reference examples.",
          "This is the most common technique and works outstandingly well with GPT-4o due to its massive pre-trained knowledge base.",
          "To optimize a zero-shot prompt, assign a clear role, input data enclosed in delimiters, and precisely specify the desired format."
        ],
        quizQuestion: "What is the defining trait of a Zero-shot prompt?",
        quizOptions: [
          "It uses recursive loops and multiple prompt training examples.",
          "Absolutely no prior examples of desired outputs are fed to the model.",
          "It instructs the AI to generate exactly zero tokens of text.",
          "It gathers factual context solely from a local database."
        ],
        explanation: "Correct! Zero-shot prompting queries the AI directly on a task or question, counting on its internal capabilities without biasing it with examples."
      },
      {
        id: "cg_l3",
        title: "Mastering Custom Instructions",
        description: "Configure lifelong settings inside ChatGPT to define your background, career, and preferred tone of voice.",
        steps: [
          "Constantly feeding ChatGPT your role, style, and professional context can become exhausting.",
          "To solve this, ChatGPT offers 'Custom Instructions' under your account preferences.",
          "This workspace has 2 main sections that the AI evaluates at the start of every message in all your conversations.",
          "First section: 'What would you like ChatGPT to know about you?' (e.g. your occupation, aims, location).",
          "Second section: 'How would you like ChatGPT to respond?' (e.g. direct, no fluff, bullet points only)."
        ],
        activityInstructions: "Write a background recipe for your Custom Instructions as a Freelance SEO Consultant seeking concise, direct bullet points with zero corporate fluff.",
        scenario: "Custom Instructions system profiling recipe crafting.",
        audience: "Enterprise search marketing professionals.",
        goal: "Formulate a persistent professional persona copy."
      }
    ]
  },
  claude_mastery: {
    title: "Complete Anthropic Claude Course: Master Claude in 20 Modules",
    description: "Master Claude 3.5 Sonnet: Claude Projects, structured XML tags, interactive Artifacts, and 200K token document analysis.",
    difficulty: "Advanced",
    lessons: [
      {
        id: "cl_l1",
        title: "Introduction to Claude 3.5 Sonnet & the Anthropic Ecosystem",
        description: "Grasp Anthropic’s philosophy built on alignment, safety, nuance, and advanced linguistic accuracy.",
        steps: [
          "Claude is the highly acclaimed family of generative language models launched by Anthropic, founded by former OpenAI research leaders.",
          "The model flagship Claude 3.5 Sonnet often outperforms contemporary models on professional writing, logic, reasoning, and programming tasks.",
          "Claude's Web Interface introduces unique workspace models: Groups called Projects to bundle instructions/files, and Chat Threads.",
          "One of Claude's major traits is its humble, descriptive, and highly analytical tone, making its output sound natural and engaging."
        ],
        activityInstructions: "Compose a prompt instructing Claude 3.5 Sonnet to outline a persuasive argument focusing on gentle emotional nuances without bragging.",
        scenario: "Socio-cultural analytical perspective generation model.",
        audience: "Conscious creators and copywriters.",
        goal: "Command Claude using humble conversational styles."
      },
      {
        id: "cl_l2",
        title: "Claude Prompting Secrets: The Power of XML Tags",
        description: "Structure complex instructions using custom XML tags to optimize Claude's analytical focus.",
        steps: [
          "Unlike standard chat systems, Claude was explicitly pre-trained on programming-like structures to understand XML tags deeply.",
          "Popular tags include <context>, <instructions>, <examples>, <source_text>, or custom wrappers like <confidential_policy>.",
          "Encapsulating metadata and variables in XML blocks prevents Claude from mistaking your instructions for the data to process.",
          "A recommended structure: '<instructions>Translate this document</instructions> <document>[Paste text here]</document>'."
        ],
        quizQuestion: "Why does Claude have such a powerful affinity for XML tags (like <instructions> or <document>) inside prompts?",
        quizOptions: [
          "XML tags are compiled into raw binary codes before arriving at Anthropic's server processors.",
          "Claude was extensively pre-trained on structured XML hierarchy databases, helping it distinguish instruction layers from raw text.",
          "It lowers the visual data consumption rate in standard interface designs.",
          "It automatically links the chat with external vector illustration models."
        ],
        explanation: "Correct! Organizing documents and metadata into custom XML tags provides a clear hierarchy that isolates configuration rules from processing data."
      },
      {
        id: "cl_l3",
        title: "Revolutionizing Workflows with Claude Artifacts",
        description: "Leverage interactive Artifact panels to co-create web templates, games, SVGs, or fully operational calculators in real-time.",
        steps: [
          "An 'Artifact' is a dedicated visual container that opens side-by-side with your chat when Claude generates dense, standalone code.",
          "You can review, modify, live-execute, or interact with these visual containers directly inside your window.",
          "This is the perfect way to design responsive web dashboards, mini React applications, or beautiful vector graphics on the fly.",
          "To trigger an Artifact generation, prompt Claude to deliver a complete, standalone component, such as an HTML file or a React element."
        ],
        activityInstructions: "Fulfill a prompt triggering Claude to synthesize a fully-operational, responsive financial calculator HTML component as an Artifact.",
        scenario: "Artifact visualization interactive system layout generation.",
        audience: "Tech-savvy consultants and product designers.",
        goal: "Obtain a side-panel interactive component instantly."
      }
    ]
  },
  gemini_mastery: {
    title: "Complete Google Gemini Course: Master Gemini in 20 Modules",
    description: "Master Google’s natively multimodal AI: 2 million token context window, elite Context Caching, Google AI Studio workspace, and integrated extensions.",
    difficulty: "Advanced",
    lessons: [
      {
        id: "gm_l1",
        title: "Introduction to Google Gemini & the Multimodal Ecosystem",
        description: "Grasp Google's natively multimodal AI, designed from scratch to process text, images, audio, and high-definition video in raw form.",
        steps: [
          "Gemini is Google's first model series engineered from the ground up to be multimodal, co-developed by Google DeepMind and Google Research.",
          "Unlike hybrid models, Gemini handles multiple inputs seamlessly without routing through external OCR or speech-to-text converters.",
          "The flagship model Gemini 1.5 Pro offers unprecedented capacity, while Gemini 1.5 Flash delivers lightning-fast response times.",
          "The Advanced web companion leverages Google's connected Extensions (Workspace, Maps, YouTube) for real-time grounded context."
        ],
        activityInstructions: "Compose a multimodal prompt asking Gemini to synthesize high-resolution video segments alongside raw textual coordinate metadata.",
        scenario: "Multimodal contextual search prompt construction model.",
        audience: "Tech leads and travel content creators.",
        goal: "Configure multi-source analytical requests."
      },
      {
        id: "gm_l2",
        title: "The 2M Token Revolution: Large Context Window",
        description: "Unravel one of the most significant engineering breakthroughs: the capability to upload entire code repos or long audio files in one prompt.",
        steps: [
          "Gemini 1.5 Pro offers an active context window of up to 2,000,000 tokens of pooled active memory.",
          "This equals roughly 1 hour of high-definition video, 11 hours of audio, or more than 700,000 words in a single workflow.",
          "It minimizes custom RAG database designs by natively keeping your entire project history or document bundles inside the prompt memory.",
          "Context Caching preserves cached document references so subsequent requests cost far fewer tokens dynamically."
        ],
        quizQuestion: "What is the maximum context length offered by Google Gemini 1.5 Pro?",
        quizOptions: [
          "A default baseline limit of 32,000 standard tokens.",
          "Up to 2,000,000 tokens of fully cached active memory.",
          "Exactly 4,096 tokens of processing capacity.",
          "Unlimited memory without any caching cost reductions."
        ],
        explanation: "Correct! Gemini 1.5 Pro features a world-class 2M token context size, redefining how creators solve large-data analytical processes."
      },
      {
        id: "gm_l3",
        title: "Google AI Studio for Developers & Creators",
        description: "Learn to configure free API keys and build custom prompt architectures on Google’s official sandboxed environment.",
        steps: [
          "Google AI Studio is the direct web sandbox offered by Google to prototype models and export Gemini API keys.",
          "It is the perfect interface to write strict system instructions, test safety parameters, and fine-tune response temperature.",
          "You can structure prompt patterns with few-shot input examples and constrain outputs using strict JSON object schemas.",
          "AI Studio translates your prompt workbench layouts into immediate Python, JavaScript, and cURL development packages."
        ],
        activityInstructions: "Draft a system instruction layout configured on AI Studio to return clean, structured real-estate JSON arrays with zero fluff.",
        scenario: "Structured JSON schema prompt configuration template.",
        audience: "Real estate digital agents.",
        goal: "Set safe output parameters on Google API."
      }
    ]
  },
  deepseek_mastery: {
    title: "Complete DeepSeek Course: Master DeepSeek in 20 Modules",
    description: "Master DeepSeek-R1 and V3: reasoning models (Reasoning models), <think> thought processes, elite neutral prompting, optimized API pricing, and local pipelines.",
    difficulty: "Advanced",
    lessons: [
      {
        id: "ds_l1",
        title: "Introduction to DeepSeek-R1 & Deep Reasoning",
        description: "Understand the mechanics of DeepSeek-R1 and its cutting-edge autonomous reasoning core.",
        steps: [
          "DeepSeek-R1 is a world-class reasoning-focused model that employs self-correction and continuous verification.",
          "During generation, the model outputs a distinct internal thought process wrapped in sémantic <think> tags.",
          "This recursive reasoning pattern lets it debug code, challenge its assumptions, and refine mathematical calculations dynamically.",
          "As an open-weights model, DeepSeek delivers high-tier reasoning metrics for a mere fraction of contemporary proprietary costs."
        ],
        activityInstructions: "Draft a high-quality logistics dilemma command prompting DeepSeek-R1 to weigh risks without restricting its step-by-step thinking room.",
        scenario: "DeepSeek-R1 structural reasoning logic template.",
        audience: "Advanced logisticians and project directors.",
        goal: "Leverage pure unstructured logical reasoning."
      },
      {
        id: "ds_l2",
        title: "Mastering Chain-of-Thought (CoT) and Neutral Prompts",
        description: "Learn to construct open, objective invites that let the reasoning model use its full analytical workspace.",
        steps: [
          "A classic failure mode with DeepSeek-R1 is over-prompting or restricting response layouts early.",
          "By listing hard structural requirements prematurely, you limit the token computation of its internal CoT.",
          "The ultimate rule is to clearly define the goal while leaving the semantic path entirely open for reasoning.",
          "Distinguish the brainstorming phase (visualized in <think>) from the final output delivered."
        ],
        quizQuestion: "Why is it recommended to avoid overly constraining response formats on deep reasoning models like DeepSeek-R1?",
        quizOptions: [
          "Because DeepSeek lacks geospatial search tracking endpoints.",
          "Premature structure limits the activation of logical nodes in its recursive thinking sandbox, diminishing code and reasoning qualities.",
          "Because it forces all outputs into nested comma-separated vectors.",
          "To lower the average local hosting computational payload."
        ],
        explanation: "Correct! Over-formatting limits DeepSeek's internal reasoning tokens, preventing the model from exploring all possible branches of logic before replying."
      },
      {
        id: "ds_l3",
        title: "DeepSeek API & Ultra-Low-Cost Integrations",
        description: "Learn to call the official API endpoint and leverage cost structures up to 95% cheaper than traditional market leaders.",
        steps: [
          "DeepSeek's API offers unrivaled economics with continuous OpenAI SDK compatibility.",
          "Use the fast DeepSeek-V3 for daily text compilation, high-speed coding, and schema layout generation.",
          "Implement DeepSeek-R1 for complex debugging, deep academic validation, and mathematical modeling.",
          "API routing is clean, drop-in replacement-friendly, and offers native caching for repeating input contexts."
        ],
        activityInstructions: "Conceive an OpenAI-compatible API system body that queries DeepSeek-V3 to execute raw translation without greetings.",
        scenario: "API payload structured machine-oriented configuration.",
        audience: "Enterprise developers and solutions architects.",
        goal: "Deploy highly optimized enterprise pipelines."
      }
    ]
  },
  kimi_mastery: {
    title: "Complete Kimi.ai Course: Master Kimi in 20 Modules",
    description: "Master Kimi.ai: giant document extraction, real-time live web indexing, customized Kimi+ micro-assistant workspaces, and Moonshot API setups.",
    difficulty: "Advanced",
    lessons: [
      {
        id: "km_l1",
        title: "Introduction to Kimi.ai & Large Context Searching",
        description: "Unravel Kimi's (Moonshot AI) native capabilities to read massive multi-page document setups and perform live targeted web research.",
        steps: [
          "Kimi is crafted by Moonshot AI and succeeded rapidly by supporting world-class context limits (200,000 text characters and beyond) early.",
          "Kimi's core strengths are rapid document ingestion speed and dynamic browsing of live search engine data without forgetting context.",
          "Kimi excels in formatting complex query arguments, conducting rigorous literature audits, and generating elegant semantic graphs.",
          "The main web app interface comes packed with interactive extraction modes to locate context contradictions instantly."
        ],
        activityInstructions: "Submit a research prompt directing Kimi to parse multiple reference web pages and formulate a unified table diagram.",
        scenario: "Kimi multi-source web mining prompt model.",
        audience: "Lead researchers and senior market research planners.",
        goal: "Orchestrate real-time verified data pipelines."
      },
      {
        id: "km_l2",
        title: "Kimi+ & Orchestrating Tailored Agents",
        description: "Unlock Kimi+ to deploy specific pre-built conversational agents executing highly focused document tasks and rules.",
        steps: [
          "Kimi+ offers targeted modules preconfigured for programming assistance, legal contract audit, and scholastic reviews.",
          "These workspace agents come with expert system guidelines and authorized tools to perform accurate background lookups.",
          "You can link multiple prompts together to build automated task loops for your daily professional business.",
          "Mastering and optimizing Kimi+ workflows enables teams to automate heavy-lifting comparative reviews cleanly."
        ],
        quizQuestion: "What is the Kimi+ service within the Moonshot AI workspace?",
        quizOptions: [
          "A cloud photo storage option running on secondary mobile media nodes.",
          "A curated space of customized expert agents tuned for specific complex business and coding tasks.",
          "An assembly language simulator compiling bytes into high-level code.",
          "An enterprise social hub to share user-created presentation templates."
        ],
        explanation: "Correct! Kimi+ is a direct hub of optimized AI assistants configured with strict rules to handle intense reading, typing, or programming routines."
      },
      {
        id: "km_l3",
        title: "Moonshot API & Large Context Requests",
        description: "Integrate Moonshot's native endpoints inside your apps and manage prompt weight options without latency bottlenecks.",
        steps: [
          "The Moonshot API natively supports extremely long processing arrays with remarkably quick response times.",
          "The API endpoints share complete compatibility with OpenAI's SDK, making migration or multi-model architectures seamless.",
          "Developers must fine-tune input layouts to avoid information retrieval quality drops (the classic 'Lost in the Middle' symptom).",
          "Acquiring expert API setup knowledge empowers you to run automated production scale text audits with absolute confidence."
        ],
        activityInstructions: "Configure a raw Moonshot API payload instruction commanding Kimi to extract financial KPIs from a 100-page file.",
        scenario: "Long-context key extraction template for Moonshot API.",
        audience: "Fullset developers and data infrastructure builders.",
        goal: "Deploy ultra-long context data parsing integrations."
      }
    ]
  },
  leonardo_mastery: {
    title: "Complete Leonardo.ai Course: Master Leonardo in 20 Modules",
    description: "Master Leonardo.ai: exceptional Phoenix and Lightning renderings, Alchemy engines, Real-Time Canvas, Motion visuals, custom and fine-tuned Models.",
    difficulty: "Advanced",
    lessons: [
      {
        id: "le_l1",
        title: "Introduction to Leonardo.ai & Next-Generation Visual Design",
        description: "Unravel one of the most advanced creative studios to generate photorealistic imagery with the revolutionary Phoenix engine.",
        steps: [
          "Leonardo.ai is a leading playground engineered for designers, digital artists, and developers, leveraging top-tier proprietary pipelines.",
          "The flagship model Leonardo Phoenix features outstanding Prompt Adherence and native high-resolution text generation.",
          "The suite includes powerful guided tools like ControlNet or Image-to-Image to constrain geometry during generation.",
          "The web-based workspace easily allows creators to prompt images, synthesize 3D textures, or render high-definition animations."
        ],
        activityInstructions: "Compose a high-fashion photo prompt for Leonardo Phoenix integrating custom stylized text over clothing lines.",
        scenario: "Photorealistic styling and text integration prompt paradigm.",
        audience: "High-end product designers and creative art directors.",
        goal: "Deploy next-gen visual assets with strict guidelines."
      },
      {
        id: "le_l2",
        title: "Alchemy & Real-Time Canvas: Precision parameters",
        description: "Master the Alchemy post-processing render engine, live Real-Time Canvas rendering, and Prompt Guidance ratios.",
        steps: [
          "Alchemy acts as an elite virtual camera darkroom, enhancing lighting dynamic range, textures, and details.",
          "Real-Time Canvas maps direct hand-drawn sketches into polished high-fidelity assets interactively.",
          "Prompt Guidance (analogous to CFG scale) controls the balance between creative freedom and prompt strictness.",
          "Using clean, structured negative prompts is essential to filter out optical artifacts or weird anatomy styles."
        ],
        quizQuestion: "What interactive feature in Leonardo.ai updates a drawing into stylized artwork live as you paint?",
        quizOptions: [
          "The standard Legacy Claude code translator.",
          "The Real-Time Canvas utility, enabling live interactive sketch-to-image synthesis.",
          "The Node.js binary pipeline backend.",
          "The Excel analytical reporting grid."
        ],
        explanation: "Correct! Leonardo's Real-Time Canvas updates drawings in real time to match style vectors and text objectives."
      },
      {
        id: "le_l3",
        title: "Motion, Elements & Fine-Tuned Styles",
        description: "Learn to animate assets via Leonardo Motion and layer fine-tuned micro-models for customized branding formats.",
        steps: [
          "Leonardo Motion brings life to static image generations, producing elegant camera motions and atmospheric particle shifts.",
          "Elements are specialized theme models (e.g. Cyberpunk, Watercolor, Manga) that designers can layer and weight.",
          "You can train custom models of characters or visual directions by submitting 10 to 20 reference pictures.",
          "Deploying and locking private custom models ensures pristine, reusable styling outcomes across landing pages or catalogs."
        ],
        activityInstructions: "Structure a fantasy background prompt stacking two contrasting Leonardo Elements styles together.",
        scenario: "Multi-style Element layering prompt model.",
        audience: "Visual game designers and conceptual layout artists.",
        goal: "Combine model styles with weighted adjustments."
      }
    ]
  },
  ai_social_selling: {
    title: "Complete AI Social Selling Course: Sell on Autopilot in 20 Modules",
    description: "Master automated social media sales: viral high-volume AI content engines, ManyChat & ChatGPT automated DMs, and self-running step-by-step funnel sequences.",
    difficulty: "Advanced",
    lessons: [
      {
        id: "ss_l1",
        title: "Introduction to AI Social Selling & Automated Funnels",
        description: "Learn the foundational systems of running hands-free social selling pipelines powered by custom conversation models and persuasive templates.",
        steps: [
          "AI Social Selling refers to orchestrating lead acquisition and customer conversion loops on LinkedIn, Instagram, and X without manual intervention.",
          "AI agents analyze prospect profile resumes or recent posts to write hyper-personalized outreach messages in real-time.",
          "We construct step-by-step systems called Self-Running Funnels which nurture and sell digital products or services 24/7.",
          "This introductory unit lays down the architectural tracks to coordinate your tools into predictable streams of revenue."
        ],
        activityInstructions: "Draft a prompt to analyze a potential LinkedIn lead's profile summary and formulate a hyper-personalized outreach copy.",
        scenario: "Hyper-personalized LinkedIn outbound approach prompt template.",
        audience: "High-end product designers and creative art directors.",
        goal: "Compose a high-fashion photo prompt for Leonardo Phoenix integrating custom stylized text over clothing lines."
      },
      {
        id: "ss_l2",
        title: "High-Volume AI Content Ingestion Engines",
        description: "Learn to deploy a 365-day editorial content machine with ChatGPT and Claude, scripting hundreds of Reels, TikToks, and posts.",
        steps: [
          "The prerequisite for organic social traction is consistent posting backed by meticulous alignment with your user pain points.",
          "By deploying multi-agent structured prompting guidelines, you can instruct AI engines to capture your exact brand personas.",
          "We teach the 'Content Cascade' methodology: transforming a single master research page into 20 micro-posts for multiple channels.",
          "Leveraging these routines feeds your digital queues with high-converting items at a fraction of standard designer timelines."
        ],
        quizQuestion: "Which automated methodology allows steady daily publication routines derived from a single authority master file?",
        quizOptions: [
          "The Content Cascade (Repurposing) process supported by AI templates.",
          "Directly copying competitor texts without stylistic edits.",
          "Generating random software snippets irrelevant to your audience goals.",
          "Configuring a bot program that registers bulk trending hashtags."
        ],
        explanation: "Correct! The Content Cascade (or content repurposing) allows compiling dozens of optimized, bite-sized assets from one core model topic."
      },
      {
        id: "ss_l3",
        title: "Step-by-Step DM & Conversational Webhook setups",
        description: "Connect ManyChat workflows directly to ChatGPT's API to distribute free guides and close sales inside the inbox.",
        steps: [
          "Automating direct inbox messages is the fastest way to lift social publication conversion ratios by up to 300%.",
          "When a viewer comments on a target keyword, a system trigger automatically opens a personalized diagnostic thread.",
          "By binding chatbot systems with OpenAI, responses are context-aware, organic, exceptionally friendly, and convincing.",
          "Configuring this simple pipeline ensures your CRM channels run at high capacity while you focus on scaling your enterprise."
        ],
        activityInstructions: "Formulate a specialized system instruction (system instruction prompt) guiding an automated conversion chatbot.",
        scenario: "ManyChat custom AI Qualification agent system prompt.",
        audience: "Fullset developers and data infrastructure builders.",
        goal: "Deploy ultra-long context data parsing integrations."
      }
    ]
  },
  prompt_eng: {
    title: "ChatGPT, Gemini & Generative AI Masterclass",
    description: "Learn the secrets of professional prompting to command ChatGPT, Gemini, and Claude for senior-level content, code, and analytical output.",
    difficulty: "Beginner",
    lessons: [
      {
        id: "pe_l1",
        title: "The Golden Perfect Prompt Formula",
        description: "Discover the 4 key pillars required to outline professional enterprise prompts.",
        steps: [
          "To secure stellar responses from models (like Gemini or ChatGPT), a basic sentence is not enough.",
          "The perfect master prompt rests on 4 vital pillars: Role, Task, Context, and Constraints.",
          "1. ROLE: Assign a specific identity to the AI. E.g., 'Act as a Senior conversion-oriented E-commerce Copywriter'. Otherwise, the model replies globally and shallowly.",
          "2. TASK: Define precisely what needs to be created. E.g., 'Draft a follow-up email sequence for abandoned shopping carts'.",
          "3. CONTEXT: Outline the target segment under consideration. E.g., 'Our target audience is busy first-time parents and this email proposes a one-time 10% discount'.",
          "4. CONSTRAINTS: Introduce strict boundaries. E.g., 'The title must be under 8 words, the email body under 150 words total, written in a warm, helpful tone'."
        ],
        activityInstructions: "Write a prompt to draft an engaging LinkedIn post. Your prompt must introduce a Role (e.g., Marketing Expert), include Context (launching a productivity application for freelance workers) and a Constraint (under 100 words with a casual tone).",
        scenario: "LinkedIn post generation tailored with high-conversion frameworks.",
        audience: "Entrepreneurs and freelancers in need of productivity shifts.",
        goal: "Drive clicks to interest list."
      },
      {
        id: "pe_l2",
        title: "Advanced: Few-Shot Prompting",
        description: "Teach models via pre-set high-quality reference inputs/outputs before generating complex responses.",
        steps: [
          "Few-Shot Prompting consists of providing 2 or 3 solid, high-quality examples of the targeted output before raising your actual query.",
          "Large models are exceptional pattern recognition systems. Showing them what is expected eliminates variation in tone, format, and structure.",
          "For instance, to generate product descriptions, first input: 'Input: Sport Watch, Specs: Shockproof, Built-in GPS. Output: [Ideal descriptive paragraph...]'",
          "Then, input the new sports watch specs and let the AI fulfill the 'Output'. It will match your styled formatting perfectly!"
        ],
        quizQuestion: "What is 'Few-Shot Prompting'?",
        quizOptions: [
          "Asking multiple short disjointed questions in a row.",
          "Feeding a few examples of perfect outputs to train the tone and structural template of the AI response.",
          "Reducing the word count of your initial guiding query.",
          "Forcing the model to reply in single-word statements."
        ],
        explanation: "Correct! Few-Shot Prompting inputs precise exemplars of source/target structures, allowing the model to conform instantly to structural patterns and style constraints."
      },
      {
        id: "pe_l3",
        title: "Structuring Markdown & System Rules",
        description: "Configure models to output elegant spreadsheets, tables, lists, or structured JSON payloads.",
        steps: [
          "One of the strongest abilities of AI models is converting messy unstructured input into strictly formatted tables or data frameworks.",
          "You can request standard schemas such as: Markdown tables, nested bullet points, SWOT matrices, or JSON arrays.",
          "To guarantee strict results, outline precise column titles and append delimiter tags around your input variables.",
          "Example: 'Structure a comparative analysis of Stripe vs PayPal inside a Markdown table with three columns: Metric, Stripe, PayPal.'"
        ],
        activityInstructions: "Create a comparative table comparing leading LLM models by prompting the AI to output a 3-column Markdown table with headers: Model, Creator, Primary Strength.",
        scenario: "Structured Markdown comparison generation.",
        audience: "Enterprise buyers and technical experts.",
        goal: "Output a clean, pristine table."
      },
      {
        id: "pe_l4",
        title: "Chain-of-Thought (Step-by-Step Reasoning)",
        description: "Force models to calculate logical steps in their context window to boost complex analytical answers.",
        steps: [
          "Autoregressive LLMs predict the next token based on probability; they cannot outline a global solution outline before typing.",
          "When asked complex logical, financial, or mathematical problems directly, AI models tend to approximate too quickly and hallucinate errors.",
          "Chain-of-Thought forcing instructs the system explicitly to map out and detail its logical process step-by-step.",
          "Simply append the instruction: 'Think step-by-step and write out each logical progression or calculation before declaring the final output.'",
          "This lets the model compute facts linearly in its output buffer, increasing response accuracy of complex analyses by over 80%."
        ],
        quizQuestion: "Why does instructing 'Think step-by-step' dramatically raise analytical response accuracy?",
        quizOptions: [
          "It forces the cloud processors to hardware-overclock for a faster cycle.",
          "It allows the model to output and view its own intermediate logical calculations in its context buffer before drawing conclusions.",
          "It forces the AI to mentally translate all concepts back and forth to English.",
          "It lowers the bandwidth transmission fees associated with server nodes."
        ],
        explanation: "Precisely! By writing intermediate logic, the model's next word probability is based on already established true reasoning steps, minimizing logic jumps and errors."
      },
      {
        id: "pe_l5",
        title: "Advanced Roleplay & Interactive Agents",
        description: "Transform your workspace into mock customer interviews, investor pitches, or tough reviews.",
        steps: [
          "Setting a role is helpful, but true simulation shines through active, responsive conversational roleplay.",
          "Define a multi-step persona with criteria and strictly limit the model to outputting one speaker's line at a time.",
          "Example: 'Act as a highly skeptical Venture Capitalist reviewing my tech pitch. Ask me exactly one question at a time. Wait for my input after each question.'",
          "This interactive dynamic is ideal for training job interviews, wage negotiations, or handling disgruntled customer responses live."
        ],
        activityInstructions: "Draft a roleplay prompt for a customer relationship training sandbox. The AI must act as a client complaining about a late shipment, speaking one reply at a time.",
        scenario: "Interactive customer negotiation/complaint simulator setup.",
        audience: "Customer support executives.",
        goal: "Set a demanding, responsive dialogue flow."
      },
      {
        id: "pe_l6",
        title: "Mega-Prompts & Scalable System Guidelines",
        description: "Learn to design production-grade instructions grouping variable tags and XML blocks.",
        steps: [
          "A 'Mega-Prompt' is a blueprint uniting all high-efficacy mechanisms: Role, Task, Few-Shot, Chain-of-Thought, and Output format guidelines.",
          "To build premium mega-prompts, use separators or XML tags (e.g., [OriginalText] or [ToneValue]) to label areas.",
          "Clearly separate the permanent directive logic of your prompt from the variable data inputs provided at the bottom.",
          "Example: '# Role: Editor Expert\\n# Sample Formatting: ...\\n# User payload to process: [Paste here]'.",
          "By separating logic from variables, you achieve robust stability across varying user inputs."
        ],
        quizQuestion: "What is the core benefit of utilizing delimiters and variables (like [Text]) inside a Mega-Prompt?",
        quizOptions: [
          "It shrinks the overall token size processed by the model of choice.",
          "It clearly isolates operational control instructions from the raw input payload, preventing the model from mixing orders with variables.",
          "It bypasses billing verification layers inside AI Academy Plus.",
          "It encrypts the visual outcome into a secure XML standard."
        ],
        explanation: "Excellent! Separating instructions from raw text payloads protects your prompt logic from 'Prompt Injection', where variables accidentally hijack core instruction workflows."
      }
    ]
  },
  copywriting: {
    title: "AI copywriting: Sales Frameworks",
    description: "Write copy that captivates, connects, and converts using world-class marketing frameworks paired with leading generative engines.",
    difficulty: "Beginner",
    lessons: [
      {
        id: "cp_l1",
        title: "The PAS (Problem, Agitation, Solution) Engine",
        description: "Master the most effective high-converting web persuasive layout ever structured.",
        steps: [
          "The PAS framework is the absolute king of online persuasion. It operates on primal psychology: humans move away from pain faster than they head toward pleasure.",
          "1. PROBLEM: Pinpoint and clearly lay out a precise pain point your reader is experiencing. E.g., 'Are you wasting 4 hours a day answering support tickets?'",
          "2. AGITATION: Rub salt in the wound by detailing the long-term impact and frustrations of that issue. E.g., 'That's time taken away from scaling, keeping you stressed and stagnant.'",
          "3. SOLUTION: Introduce your product or outcome as the ultimate relief, the logical and welcoming cure. E.g., 'Meet TicketAI: automate 90% of requests in 1 click!'"
        ],
        activityInstructions: "Write an Instagram Ad copy using the PAS framework to sell an insulated water bottle to office workers who hate cold coffee or warm water.",
        scenario: "Instagram Ad campaign for a smart thermal bottle.",
        audience: "Office employees and computer writers.",
        goal: "Maximize outbound purchase clicks."
      },
      {
        id: "cp_l2",
        title: "Drafting Irresistible Hooks & Titles",
        description: "Master the science of the dynamic hook. A shallow title wastes the best copy.",
        steps: [
          "80% of web users read the title first, yet only 20% click through to read further. Your initial words hold the entire key to success.",
          "To build magnetic headlines, lean into 3 psychological triggers: Curiosity, Specificity, or Direct Benefit.",
          "Trigger 1: Specificity (By using numbers). E.g., 'How I secured $4,321 in 12 days as an absolute rookie.'",
          "Trigger 2: Benefit minus Pain. E.g., 'Achieve a flat belly in 3 weeks, without frustrating food restrictions.'",
          "Trigger 3: Intriguing Curiosity. E.g., 'The taboo bank secret they hope you never find out.'"
        ],
        quizQuestion: "Which of these headlines best showcases 'Direct Benefit without painful constraint'?",
        quizOptions: [
          "Comprehensive course on English vocabulary consisting of 60 detailed text chapters.",
          "Speak fluent English in 30 days, without memorizing tedious grammar formulas.",
          "Why studying English is becoming an essential asset in 2026.",
          "Occasional English training for intermediate learners hosted over Zoom."
        ],
        explanation: "Indeed! This headline proposes an excellent positive outcome ('Speak fluent English in 30 days') while explicitly dropping the pain points ('without tedious grammar memorization')."
      },
      {
        id: "cp_l3",
        title: "AIDA Framework: Captivate to Action",
        description: "The complete outline sequence (Attention, Interest, Desire, Action) to construct highly profitable pages.",
        steps: [
          "AIDA has been the cornerstone of persuasive printed and digital advertising for over a century.",
          "1. ATTENTION: Hook the reader instantly with a powerful statement, bold title, or surprising fact.",
          "2. INTEREST: Present a fresh point of view, an astounding stat, or an authentic narrative to hold their attention.",
          "3. DESIRE: Showcase how their life changes for the better. Leverage true social proof and illustrate the ideal future state.",
          "4. ACTION: Direct the prospect toward a clear, friction-free Call to Action command (e.g., download, register, order now)."
        ],
        activityInstructions: "Write a newsletter using the AIDA framework to drive downloads for a free PDF handbook about side-hustles.",
        scenario: "Newsletter selling a PDF guide for extra passive income.",
        audience: "9-to-5 employees eager to escape the corporate grind.",
        goal: "Maximize free guide downloads."
      }
    ]
  },
  freelance_career: {
    title: "Propel Your Freelance Career & Side-Hustles",
    description: "Package your newly acquired professional AI services to sell on Upwork, Fiverr, or directly to businesses for premium prices.",
    difficulty: "Intermediate",
    lessons: [
      {
        id: "fr_l1",
        title: "Identifying Premium, High-Value AI Gigs",
        description: "Discover the specific AI digital services businesses are actively looking to hire and pay for.",
        steps: [
          "Countless business owners are overwhelmed and simply lack the hours required to study and master Prompt Engineering or AI pipelines.",
          "High-conversion, easy-to-deploy gigs include: drafting SEO-optimized blog articles, structuring TikTok/Reels short-form video scripts, or building prompt tools for marketing teams.",
          "Never pitch 'hours of billing'. Always propose 'packaged outcomes'. E.g., 'I will deliver 4 plug-and-play SEO articles per week' instead of general 'web writing services'."
        ],
        quizQuestion: "Which approach is most effective when searching for high-budget premium freelance clients?",
        quizOptions: [
          "Listing the absolute cheapest possible service rates on Fiverr to outbid competition.",
          "Pitching a clear, outcome-focused result package (e.g., Pack of 10 ready-to-shoot video scripts) highlighting direct client value.",
          "Sending the exact same copied introductory email to 500 random accounts on LinkedIn.",
          "Waiting passive-aggressively on platforms for clients to reach out first without a portfolio."
        ],
        explanation: "Superb! Professional decision-makers want immediate, friction-free results. Proposing complete outcome packages makes buying easy and justifies premium pricing."
      },
      {
        id: "fr_l2",
        title: "Drafting Magnetic Upwork Proposals",
        description: "Skip generic spam and capture direct client attention within the first 3 seconds of reading.",
        steps: [
          "Active job listings receive dozens of proposals. Clients only scan the initial 2 sentences in their inbox before picking a freelance worker.",
          "Never start with: 'Hi, my name is John, I have 5 years of experience...'. Clients do not care. They care about their own goals and issues.",
          "The winning proposal formula: 1. Personalized opener showing you read their details. 2. Rapid solution draft. 3. Quick hyper-relevant sample link. 4. Low-commitment friendly CTA.",
          "E.g., 'Hi, I noticed you are hunting for highly viral financial TikTok scripts. Last month, I wrote a finance script that secured 150K views. Here is the link... Do you have 2 minutes to trade ideas?'"
        ],
        activityInstructions: "Draft a client proposal on Upwork asking for a sales email sequence creator. Target a busy SaaS founder who is scaling.",
        scenario: "Upwork job application for a SaaS welcome email writer.",
        audience: "Fast-growing SaaS startup founder short on hours.",
        goal: "Secure a brief 10-minute discovery call."
      },
      {
        id: "fr_l3",
        title: "Pricing Strategy & Building Tier Offers",
        description: "Pricing psychology: learn to escalate your billings comfortably without alienating prospective clients.",
        steps: [
          "Billing by the hour creates bad incentives: the faster and more proficient you are, the less money you make. Always price per project value.",
          "Draft every proposal around 3 pricing tiers: Basic, Recommended (your target choice), and Elite.",
          "The Basic tier handles raw needs. The Recommended tier packs high-value bonuses for a slightly higher price (Anchor effect). The Elite tier is an expensive, super-VIP offer which by comparison makes your Recommended option look like an absolute steal."
        ],
        quizQuestion: "Why is flat-rate per-project pricing much better than hourly billing for seasoned specialists?",
        quizOptions: [
          "Because calculating clock hours is simply too tedious for freelancers.",
          "Flat-rates reward speed, efficacy, and AI tool usage, whereas hourly rates punish expert speed with lower payouts.",
          "The tax administration prohibits hourly consulting billing paths internationally.",
          "Clients generally demand to never know how long a project took to build."
        ],
        explanation: "Perfect! By pricing outputs, your speed and automation leverage (from AI tools) boost your real hourly earnings dramatically, aligning client results directly with your profits."
      }
    ]
  }
};

export function getLocalizedCourses(lang: "fr" | "en", baseCourses: any[] = COURSES || []): any[] {
  const safeCourses = Array.isArray(baseCourses) ? baseCourses : [];
  if (lang === "fr") return safeCourses;
  
  return safeCourses.map(course => {
    if (!course) return course;
    const translatedCourse = ENGLISH_COURSES_TRANSLATIONS[course.id];
    if (!translatedCourse) return course;
    
    return {
      ...course,
      title: translatedCourse.title,
      description: translatedCourse.description,
      lessons: (course.lessons || []).map((lesson: any) => {
        if (!lesson) return lesson;
        const foundTrans = translatedCourse.lessons.find((l: any) => l.id === lesson.id);
        if (!foundTrans) {
          // Dynamic derived lesson from extraListData
          return {
            ...lesson,
            title: (lesson.title || "")
              .replace("L'art du", "The Art of")
              .replace("La technique d'", "The Technique of ")
              .replace("La méthode d'", "The Method of ")
              .replace("Le prompt d'", "The Prompt for ")
              .replace("Maîtrise de", "Mastering")
              .replace("Maîtriser", "Mastering")
              .replace("Créer", "Creating")
              .replace("Vendre", "Selling")
              .replace("Optimiser", "Optimizing")
              .replace("Concevoir", "Designing")
              .replace("Organiser", "Structuring"),
            description: "Advanced learning module outlining expert core methodologies and tactics."
          };
        }
        
        return {
          ...lesson,
          title: foundTrans.title,
          description: foundTrans.description,
          steps: foundTrans.steps || lesson.steps || [],
          quiz: lesson.quiz ? {
            ...lesson.quiz,
            question: foundTrans.quizQuestion || lesson.quiz.question,
            options: (lesson.quiz.options || []).map((opt: any, oIdx: number) => ({
              ...opt,
              text: foundTrans.quizOptions?.[oIdx] || opt.text
            })),
            explanation: foundTrans.explanation || lesson.quiz.explanation
          } : undefined,
          promptObjective: lesson.promptObjective ? {
            ...lesson.promptObjective,
            taskDescription: foundTrans.activityInstructions || lesson.promptObjective.taskDescription,
            placeholderText: "Type your custom prompt recipe here..."
          } : undefined,
          copyObjective: lesson.copyObjective ? {
            ...lesson.copyObjective,
            scenario: foundTrans.scenario || lesson.copyObjective.scenario,
            audience: foundTrans.audience || lesson.copyObjective.audience,
            goal: foundTrans.goal || lesson.copyObjective.goal,
            placeholderText: "Type your copywriting solution here..."
          } : undefined
        };
      })
    };
  });
}

