import { Course, OnboardingQuestion, Lesson } from "./types";

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
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

// HANDMADE LESSONS FOR COURSE 1
const basePromptLessons: Lesson[] = [
  {
    id: "pe_l1",
    title: "La Formule Secrète d'un Prompt Parfait",
    description: "Découvrez les 4 piliers indispensables pour formuler des instructions de niveau professionnel.",
    durationMin: 12,
    steps: [
      "Pour obtenir une réponse d'excellente qualité de l'IA (comme Gemini ou ChatGPT), une simple question ne suffit pas.",
      "La formule de prompt ultime repose sur 4 éléments clés : le Rôle, la Tâche, le Contexte et les Contraintes.",
      "1. Le RÔLE : Donnez une identité claire à l'IA. Exemple : 'Agis en tant que copywriter senior expert en e-commerce'. Autrement, l'IA répondra de manière générique.",
      "2. La TÂCHE : Définissez précisément ce que l'IA doit faire. Exemple : 'Rédige un e-mail de relance pour un panier abandonné'.",
      "3. Le CONTEXTE : Expliquez à qui s'adresse le texte et quelle est la proposition de valeur. Exemple : 'Notre cible est de jeunes parents pressés, et l'e-mail propose -10%'.",
      "4. Les CONTRAINTES : Imposez des limites strictes. Exemple : 'Le sujet doit faire moins de 8 mots, et l'e-mail maximum 150 mots avec un ton empathique'."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Formulez un prompt pour rédiger un post LinkedIn percutant. Votre prompt doit définir un Rôle (ex: Expert marketing), inclure un Contexte (lancer une appli de productivité pour freelances) et une Contrainte (maximum 100 mots avec un ton décontracté).",
      systemTemplate: "LinkedIn post generation tailored with high-conversion frameworks.",
      placeholderText: "Rôle: ... \nContexte: ...\nTâche: ...\nContraintes: ...",
      exampleSolution: "Agis en tant qu'Expert Marketing Viral. Rédige un court post LinkedIn pour annoncer le lancement de notre nouvelle application d'aide pour freelances appelée 'FocusPro'. Notre cible est constituée d'entrepreneurs débordés. Contrainte : Le post doit faire moins de 100 mots, adopter un ton amical, et contenir 2 hashtags."
    }
  },
  {
    id: "pe_l2",
    title: "Techniques Avancées : Few-Shot Prompting",
    description: "Apprenez à éduquer l'IA à l'aide d'exemples complets avant de lui demander d'exécuter un travail complexe.",
    durationMin: 15,
    steps: [
      "Le 'Few-Shot Prompting' (ou apprentissage par l'exemple) consiste à fournir 2 ou 3 exemples de bonne qualité de la tâche souhaitée avant de poser la question finale.",
      "L'IA est une formidable machine à reproduire des schémas (pattern recognition). En lui montrant ce que vous attendez d'elle, vous supprimez le hasard sur le style, le format et le ton.",
      "Par exemple, si vous voulez générer des fiches produits, donnez d'abord un exemple : 'Entrée : Montre Sport, Caractéristiques : Résistante, GPS. Sortie : [La description rédigée idéale]'...",
      "Ensuite, donnez la nouvelle fiche produit et laissez l'IA compléter uniquement la sortie. Vous obtiendrez exactement le même formatage et le même niveau de qualité !"
    ],
    activityType: "quiz",
    quiz: {
      id: "pe_q2",
      question: "Qu'est-ce que le 'Few-Shot Prompting' ?",
      options: [
        { text: "Poser plusieurs questions courtes distinctes d'affilée.", isCorrect: false },
        { text: "Fournir quelques exemples de résultats attendus pour guider la structure et le ton de l'IA.", isCorrect: true },
        { text: "Diminuer le nombre de mots dans son prompt initial.", isCorrect: false },
        { text: "Forcer l'IA à répondre en un seul mot.", isCorrect: false }
      ],
      explanation: "Exact ! Le Few-Shot Prompting consiste à injecter des exemples de paires d'entrées/sorties pour apprendre au modèle la structure et le ton exacts désirés avant sa réponse finale."
    }
  },
  {
    id: "pe_l3",
    title: "Maîtriser les Formats et les Règles Systèmes",
    description: "Configurez l'IA pour qu'elle produise du code, des tableaux comparatifs structurés ou des fichiers JSON exploitables.",
    durationMin: 10,
    steps: [
      "L'une des plus grandes forces de l'IA est sa capacité à transformer de grands volumes de données brutes ou de textes en structures de données ordonnées.",
      "Vous pouvez demander des structures prédéfinies comme : un tableau Markdown, une liste à puces imbriquée, des colonnes d'avantages/inconvénients ou du code informatique.",
      "Pour forcer l'IA, utilisez des délimiteurs comme des crochets ou des blocs de code, et décrivez précisément les en-têtes du tableau souhaité.",
      "Exemple : Rédige une analyse comparative de Stripe vs PayPal sous forme de tableau Markdown composé de 3 colonnes : Fonctionnalité, Stripe, PayPal."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Créez un outil comparatif des meilleurs modèles d'IA en demandant à l'IA de sortir un tableau Markdown à 3 colonnes : Modèle, Concepteur, Points Forts.",
      systemTemplate: "Structured Markdown comparison generation.",
      placeholderText: "Saisissez votre prompt pour obtenir un tableau comparatif...",
      exampleSolution: "Agis en tant qu'Analyste Tech spécialisé dans l'IA. Rédige un comparatif entre Gemini 1.5, GPT-4o, et Claude 3.5 Sonnet sous forme de tableau comparatif Markdown avec 3 colonnes : Modèle, Entreprise, et Principal Point Fort. Reste très concis."
    }
  },
  {
    id: "pe_l4",
    title: "Le Chain-of-Thought (Pensée étape par étape)",
    description: "Forcez l'IA à décomposer son raisonnement pour démultiplier la justesse de ses réponses complexes.",
    durationMin: 14,
    steps: [
      "Le raisonnement logique des grands modèles de langage souffre d 'une faille : ils prédisent le mot suivant sans vision globale.",
      "Si vous posez un problème difficile de logique, de mathématiques ou d'analyse commerciale complexe d'un coup, l'IA risque d'inventer ou de faire des erreurs (halluciner).",
      "La technique du 'Chain-of-Thought' (chaîne de pensée) consiste à lui ordonner explicitement de décomposer son raisonnement.",
      "Pour cela, ajoutez simplement la phrase magique : 'Pense étape par étape et montre tes calculs intermédiaires avant de donner la réponse finale.'",
      "Cela donne de la place au modèle pour générer sa logique intermédiaire dans sa fenêtre de contexte, augmentant le taux de succès logiques de plus de 80%."
    ],
    activityType: "quiz",
    quiz: {
      id: "pe_q4",
      question: "Pourquoi la consigne 'Pense étape par étape' améliore-t-elle radicalement la qualité des réponses de l'IA ?",
      options: [
        { text: "Elle force le serveur cloud à tourner physiquement plus vite.", isCorrect: false },
        { text: "Elle permet à l'IA d'élaborer sa logique mot par mot dans le contexte de calcul avant la conclusion.", isCorrect: true },
        { text: "Elle force l'IA à traduire ses textes vers l'anglais.", isCorrect: false },
        { text: "Elle réduit artificiellement le coût de la consommation réseau.", isCorrect: false }
      ],
      explanation: "Parfait ! En forçant le modèle de langage à détailler sa logique intermédiaire, chaque nouveau mot s'appuie sur une probabilité de calcul plus saine, limitant d'autant plus les hallucinations."
    }
  },
  {
    id: "pe_l5",
    title: "Le Rôle-Play Avancé et Personnalités de l'IA",
    description: "Transformez ChatGPT ou Gemini en critique impitoyable ou client sceptique pour tester votre projet.",
    durationMin: 15,
    steps: [
      "Attribuer un rôle comme 'Expert marketing' est utile. Mais l'art de la simulation s'exprime dans le 'Rôle-Play Interactif'.",
      "Vous pouvez demander à l'IA d'incarner une personnalité complexe avec des convictions, un but précis, et d'interagir pas à pas avec vous.",
      "Exemple : 'Incarne un investisseur en capital-risque sceptique et difficile à convaincre. Pose-moi une seule question à la fois sur mon pitch. Attends ma réponse avant de poser la suivante.'",
      "Cette technique de dialogue progressif (conversational simulation) est idéale pour s'entraîner aux entretiens d'embauche, négocier ses prix ou faire face à des clients mécontents."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Configurez l'IA pour simuler un client mécontent de la livraison tardive de son produit. Écrivez un prompt complet délimitant son humeur et imposant qu'il ne donne qu'une réplique à la fois.",
      systemTemplate: "Interactive customer negotiation/complaint simulator setup.",
      placeholderText: "Saisissez votre prompt pour configurer le simulateur interactif...",
      exampleSolution: "Agis en tant que client mécontent qui a reçu son colis avec 5 jours de retard. Tu es froid, exigeant et sceptique. Pose-moi ta première réplique d'explication. Attends impérativement ma réponse avant de continuer. Ne rédige pas tout le dialogue d'un coup !"
    }
  },
  {
    id: "pe_l6",
    title: "Mega-Prompts & Consignes Système Complexes",
    description: "Structurez des modèles de prompts globaux pour créer des assistants IA de rédaction, de correction ou d'audit.",
    durationMin: 18,
    steps: [
      "Un 'Mega-Prompt' est un plan d'action d'ingénierie regroupant tous les piliers d'excellence : Rôle, Tâche, Few-Shot, Chain-of-Thought, et Formatage.",
      "Pour construire un mega-prompt réutilisable, on utilise souvent des délimiteurs ou des balises XML comme [TexteOriginal] ou [TonDuTexte].",
      "Vous expliquez au modèle la structure globale de sa mission, et vous lui insérez les données variables tout en bas.",
      "Exemple : '# Rôle : Expert Éditorial\\n# Exemples : ...\\n# Donnée utilisateur à traiter : [Entrez le texte ici]'.",
      "En séparant clairement la logique de consigne de la matière d'entrée variable, vous obtenez des sorties d'une stabilité absolue."
    ],
    activityType: "quiz",
    quiz: {
      id: "pe_q6",
      question: "Quel est l'intérêt principal d'utiliser des délimiteurs et des variables (comme [Texte]) dans un Mega-Prompt ?",
      options: [
        { text: "Faire en sorte que le prompt soit plus court pour l'IA.", isCorrect: false },
        { text: "Aider l'IA à séparer clairement les instructions de contrôle de la donnée à manipuler, évitant que le modèle confonde les ordres et le texte.", isCorrect: true },
        { text: "Bypass les barrières de frais de transaction de l'Académie.", isCorrect: false },
        { text: "Forcer la réponse finale à être cryptée sous format XML sécurisé.", isCorrect: false }
      ],
      explanation: "Exactement ! Isoler les ordres de structure et de formatage des données textuelles de l'utilisateur empêche le modèle de s'emmêler les pinceaux et d'obéir par erreur à des instructions contenues dans le texte d'entrée."
    }
  }
];

// DATA STRUCTURE FOR DYNAMIC AUTO-GENERATION TO HIT EXACTLY 30 LESSONS FOR COURSE 1
const promptExtraLessonsData = [
  { title: "L'art du context window & gestion des tokens", desc: "Apprenez à optimiser la longueur de vos prompts pour ne jamais perdre la mémoire de l'IA." },
  { title: "La technique d'ancrage sémantique", desc: "Verrouillez les connaissances de base au début de la conversation pour éviter les dérives." },
  { title: "Le Reverse Prompting structuré", desc: "Comment faire en sorte que l'IA écrive les meilleurs prompts pour elle-même à partir de vos exemples." },
  { title: "La méthode d'arbre de pensées (Tree-of-Thoughts)", desc: "Résolvez des problèmes hautement complexes en créant plusieurs chemins d'arguments parallèles." },
  { title: "Le prompt d'analyse SWOT d'entreprise", desc: "Analysez rapidement les forces, faiblesses, opportunités et menaces de vos concurrents grâce à l'IA." },
  { title: "Optimisation de code et débogage informatique", desc: "Apprenez à faire relire, documenter, optimiser et corriger vos codes informatiques par l'IA." },
  { title: "L'ingénierie des instructions système", desc: "Configurez les instructions permanentes sous le capot de votre application ou espace de chat." },
  { title: "Maîtrise de Gemini et intégrations Google Workspace", desc: "Ralliez rapidement vos documents Sheets et Docs professionnels à la puissance de Gemini." },
  { title: "Fils de discussion continus interdépendants", desc: "Organisez des workflows avancés où une IA critique et améliore une autre IA." },
  { title: "La réécriture massive de contenu", desc: "Reformulez de longs articles de manière subtile en préservant le sens d'origine." },
  { title: "Le prompt-tuning de routine", desc: "Divisez par dix votre charge mentale sur les tâches bureautiques quotidiennes." },
  { title: "Génération de scripts de podcasts dynamiques", desc: "Concevez des structures de dialogues audio captivantes avec des répliques naturelles." },
  { title: "Techniques anti-hallucination avancées", desc: "Sécurisez les faits réels et forcez l'IA à citer ses sources de manière stricte." },
  { title: "Le prompting multimodal créatif", desc: "Sachez amalgamer des instructions visuelles, sonores et textuelles de manière harmonieuse." },
  { title: "Conception d'idées de produits disrupteurs", desc: "Utilisez l'IA commerciale pour casser les codes de votre industrie et imaginer l'avenir." },
  { title: "Auto-correction récursive avancée", desc: "Faites relire 3 fois les réponses brutes de l'IA par elle-même avant l'affichage final." },
  { title: "Résumés de rapports complexes", desc: "Condensez des réunions ou des études de 80 pages en 5 puces mémorisables." },
  { title: "Analyses financières et audits", desc: "Déchiffrez des bilans comptables et des comptes de résultats en quelques secondes." },
  { title: "Le prompt de génération d'histoires immersives", desc: "Construisez des récits captivants et interactifs dont l'utilisateur est le héros." },
  { title: "La recherche scientifique accélérée", desc: "Sachez interroger l'IA pour résumer des papiers scientifiques complexes sans jargon." },
  { title: "Rédiger des requêtes SQL ultra-précises", desc: "Parlez en langage naturel pour manipuler et requêter vos bases de données d'entreprise." },
  { title: "Configuration d'un coach de productivité persistant", desc: "Bâtissez un compagnon quotidien intelligent qui vous garde focalisé sur vos objectifs." },
  { title: "Analyse automatisée de sentiments clients", desc: "Classifiez instantanément les avis et réclamations de vos utilisateurs sur les stores." },
  { title: "L'évaluation finale de Prompt Engineering", desc: "Valisez votre maîtrise totale de l'IA et devenez officiellement diplômé." }
];

// HANDMADE LESSONS FOR COURSE 2 (COPYWRITING)
const baseCopyLessons: Lesson[] = [
  {
    id: "cp_l1",
    title: "Le Framework PAS (Problème, Agitation, Solution)",
    description: "Maîtrisez le framework de persuasion le plus puissant du web pour doubler vos ventes.",
    durationMin: 15,
    steps: [
      "Le framework PAS est le roi secret du copywriting. Il est basé sur une psychologie humaine simple : nous fuyons la douleur plus vite que nous ne cherchons le plaisir.",
      "1. PROBLÈME : Identifiez et énoncez de manière claire un problème douloureux que rencontre votre prospect. Exemple : 'Vous passez 4 heures par jour sur vos e-mails ?'",
      "2. AGITATION : Appuyez là où ça fait mal en expliquant les conséquences négatives de ce problème à long terme. Exemple : 'Cela vous vole votre temps précieux, engendre du stress et retarde vos projets de développement.'",
      "3. SOLUTION : Présentez votre produit ou service comme le remède ultime, l'antidote logique et salvateur. Exemple : 'Avec notre assistant e-mail, automatisez 90% de vos réponses en 1 clic !'"
    ],
    activityType: "copy_sandbox",
    copyObjective: {
      scenario: "Publicité Instagram pour une bouteille d'eau isotherme intelligente.",
      audience: "Employés de bureau fatigués de boire du café froid ou de l'eau tiède.",
      goal: "Faire cliquer le prospect sur le bouton 'Acheter'.",
      placeholderText: "Entrez votre copie PAS ici...",
      exampleSolution: "Votre thé finit-il toujours tiède et sans goût à côté de votre clavier ? C'est frustrant de perdre son élan créatif pour aller le réchauffer dix fois par jour. Découvrez HydroKeep : notre bouteille intelligente maintient vos boissons brûlantes pendant 12h et vous rappelle de vous hydrater avec un léger témoin lumineux. Cliquez ici pour économiser -20% aujourd'hui !"
    }
  },
  {
    id: "cp_l2",
    title: "Créer un Titre de Vente Irrésistible",
    description: "Apprenez la science du crochet initial. Un mauvais titre ruine instantanément un bon produit.",
    durationMin: 12,
    steps: [
      "80% des internautes lisent le titre, mais seulement 20% cliquent pour lire la suite. Vos premières phrases déterminent à elles seules la réussite de votre texte.",
      "Pour créer un titre irrésistible, utilisez l'une des 3 clés psychologiques : la Curiosité, la Spécificité, ou le Bénéfice Direct.",
      "Clé 1 : La Spécificité (Les Chiffres). Exemple : 'Comment j'ai gagné 4 321€ en 12 jours.'",
      "Clé 2 : Le Bénéfice + Sans Contrainte négative. Exemple : 'Obtenez un ventre plat sans faire le moindre régime frustrant.'",
      "Clé 3 : La Curiosité piquante. Exemple : 'La vérité tabou que les banques ne veulent surtout pas que vous sachiez.'"
    ],
    activityType: "quiz",
    quiz: {
      id: "cp_q2",
      question: "Lequel de ces titres applique le mieux le concept de 'Bénéfice direct sans contrainte douloureuse' ?",
      options: [
        { text: "Nous vendons une formation d'apprentissage de l'anglais très complète sur 60 chapitres.", isCorrect: false },
        { text: "Parlez un anglais fluide en 30 jours, sans mémoriser de listes de grammaire ennuyeuses.", isCorrect: true },
        { text: "Pourquoi apprendre l'anglais est devenu crucial en 2026.", isCorrect: false },
        { text: "Cours d'anglais niveau intermédiaire sur Zoom.", isCorrect: false }
      ],
      explanation: "Absolument ! Le titre promet un bénéfice formidable ('Parlez un anglais fluide en 30 jours') sans la contrainte que tout le monde redoute ('sans mémoriser de grammaire ennuyeuse')."
    }
  },
  {
    id: "cp_l3",
    title: "Le Framework AIDA : Captiver du Début à la Fin",
    description: "Guide complet du framework AIDA (Attention, Intérêt, Désir, Action) pour structurer vos pages de vente.",
    durationMin: 15,
    steps: [
      "AIDA est le pilier central de la publicité imprimée et dynamique depuis plus d'un siècle.",
      "1. ATTENTION : Décrochez l'attention immédiatement avec un titre accrocheur ou une image suprenante.",
      "2. INTÉRÊT : Présentez une idée nouvelle, une statistique choc ou une histoire personnelle passionnante pour retenir le lecteur.",
      "3. DÉSIR : Expliquez comment leur vie sera transformée grâce au produit. Utilisez des témoignages et montrez l'état futur idéal.",
      "4. ACTION : Donnez un appel de commande clair, direct, simple et pressant (ex: inscrivez-vous maintenant, offre limitée)."
    ],
    activityType: "copy_sandbox",
    copyObjective: {
      scenario: "Newsletter vendant un guide PDF sur les revenus secondaires.",
      audience: "Salariés désireux de quitter le métro-boulot-dodo.",
      goal: "Télécharger le guide gratuit.",
      placeholderText: "Rédigez votre newsletter AIDA ici...",
      exampleSolution: "Attention : 9 salariés sur 10 rêvent de lancer un side-project sans oser franchir le pas. Intérêt : Ce n'est pas un manque d'idées, mais la peur de la complexité légale. Désir : Nous avons résumé dans un PDF gratuit de 15 pages la méthode exacte pour immatriculer votre micro-entreprise gratuitement en 4 minutes chronomètre en main. Action : Cliquez ici pour recevoir votre exemplaire instantanément par e-mail !"
    }
  }
];

// DATA STRUCTURE FOR DYNAMIC AUTO-GENERATION TO HIT EXACTLY 30 LESSONS FOR COURSE 2 (COPYWRITING)
const copywritingExtraLessonsData = [
  { title: "Le Framework FAB (Fonctionnalités, Avantages, Bénéfices)", desc: "Traduisez chaque élément technique de votre produit en bénéfices de vie irrésistibles." },
  { title: "La méthode des 4U pour l'action", desc: "Rédigez avec Urgence, Unicité, Utilité et Ultra-spécificité pour capter votre prospect." },
  { title: "L'art du Storytelling captivant", desc: "Comment raconter une histoire vécue qui crée une connexion humaine immédiate avec le lecteur." },
  { title: "Rédiger des questions de qualification d'audience", desc: "Ciblez précisément votre client idéal en lui posant des questions révélatrices." },
  { title: "Le hook d'accroche pour vidéos courtes (TikTok / Reels)", desc: "Captez le cerveau de l'internaute dans les 2 premières secondes pour éviter le swipe." },
  { title: "L'art de la ligne d'objet d'e-mail percutante", desc: "Augmentez drastiquement vos taux d'ouverture d'e-mails grâce à des techniques d'intrigue sémantique." },
  { title: "Rédiger des puces promesses hypnotiques", desc: "Donnez envie de lire le contenu complet de votre offre grâce à des bullet points fascinants." },
  { title: "Le framework des 4P (Picture, Promise, Prove, Push)", desc: "Établissez une image mentale forte de réussite avant de passer à l'appel à l'action final." },
  { title: "L'art de l'appel à l'action (CTA) ultra-vendeur", desc: "Enlevez les barrières psychologiques pour déclencher le clic d'achat immédiat de l'internaute." },
  { title: "Écrire une page de Capture (Landing Page) d'élite", desc: "Convertissez de simples visiteurs curieux en leads et prospects chauds ultra-qualifiés." },
  { title: "Rédiger une FAQ de réassurance client efficace", desc: "Éliminez les derniers doutes profonds de vos acheteurs sceptiques avant l'acte de commande." },
  { title: "L'intégration de la preuve sociale et de la crédibilité", desc: "Utilisez la parole des tiers et les avis clients authentiques pour asseoir votre autorité." },
  { title: "L'injecteur d'urgence et de rareté authentique", desc: "Faites comprendre à votre prospect qu'attendre équivaut à rater une opportunité en or." },
  { title: "Rédiger une séquence d'e-mails de bienvenue optimisée", desc: "Le plan stratégique exact pour fidéliser de nouveaux abonnés dès la première semaine." },
  { title: "Écrire une lettre de vente longue format PDF", desc: "Structurez des argumentaires longs qui détruisent toutes les objections clients une à une." },
  { title: "Formuler des garanties de remboursement béton", desc: "Divisez par dix le risque perçu par le client en assumant la responsabilité de la réussite." },
  { title: "Le copywriting de fiches produits e-commerce Shopify", desc: "Amenez un visiteur indécis à valider son panier en lui racontant une histoire séduisante." },
  { title: "L'art de la relance de paniers abandonnés par e-mail", desc: "Rappelez subtilement au client ce qu'il est en train de rater pour restaurer la transaction." },
  { title: "La technique du contraste de prix", desc: "Donnez une valeur énorme à votre produit en le comparant intelligemment à d'autres coûts insignifiants." },
  { title: "Rédiger une newsletter d'information à fort intérêt", desc: "Éduquez votre base d'abonnés tout en plaçant vos produits avec un naturel désarmant." },
  { title: "L'écriture inclusive et l'empathie profonde", desc: "Adaptez vos mots à l'état d'esprit et à la vulnérabilité de votre client idéal." },
  { title: "Optimiser une publicité Facebook Ads pour le taux de clic", desc: "Sachez stopper le défilement frénétique du fil d'actualité grâce à des accroches puissantes." },
  { title: "La méthode du pont de sympathie (Bridge-Building)", desc: "Créez une transition fluide entre la situation actuelle difficile et la situation idéale promise." },
  { title: "Le copywriting B2B de haut niveau pour LinkedIn", desc: "Adoptez le bon ton corporate et professionnel nécessaire pour convaincre les décideurs." },
  { title: "Écrire des scripts de webinaires de vente engageants", desc: "Maîtrisez les structures de présentations interactives qui captivent l'auditoire en direct." },
  { title: "La liquidation d'objections en série dans la FAQ", desc: "Désamorcez les doutes les plus fréquents de vos prospects indécis en un clin d'œil." },
  { title: "L'évaluation finale de Copywriting d'Élite", desc: "Testez votre sens de la psychologie de vente avec l'évaluation globale académique." }
];

// HANDMADE LESSONS FOR COURSE 3 (FREELANCE)
const baseFreelanceLessons: Lesson[] = [
  {
    id: "fr_l1",
    title: "Identifier les Gigs IA à très forte valeur",
    description: "Découvrez les services que les entreprises s'arrachent actuellement et comment y répondre efficacement.",
    durationMin: 14,
    steps: [
      "Beaucoup de chefs d'entreprise sont débordés et n'ont pas le temps de se former au Prompt Engineering ou aux outils d'IA.",
      "Les opportunités de services à forte valeur les plus simples sont : la rédaction automatique d'articles de blog SEO optimisés, la création de scripts vidéo TikTok/Reels, ou la conception de prompts personnalisés pour leurs équipes.",
      "Plutôt que de vendre du 'temps', vendez un 'résultat clair'. Par exemple : 'Je rédige 4 articles SEO prêts à publier et optimisés de 1500 mots par semaine' au lieu de 'Je fais de la rédaction web'."
    ],
    activityType: "quiz",
    quiz: {
      id: "fr_q1",
      question: "Quelle méthode est la plus performante pour attirer des clients haut de gamme en tant que freelance ?",
      options: [
        { text: "Proposer les tarifs les plus bas possibles pour écraser la concurrence sur Fiverr.", isCorrect: false },
        { text: "Proposer un livrable axé sur le résultat (ex: Pack de 10 scripts de vidéos prêtes à filmer) avec une valeur claire.", isCorrect: true },
        { text: "Envoyer le même message générique à 500 entreprises au hasard sur LinkedIn.", isCorrect: false },
        { text: "Attendre passivement que les clients vous contactent sans portfolio.", isCorrect: false }
      ],
      explanation: "Parfait ! Les clients professionnels recherchent des solutions claires et packagées. Vendre un résultat sous forme de pack dissipe le doute et justifie un tarif intéressant."
    }
  },
  {
    id: "fr_l2",
    title: "Écrire une Proposition Irrésistible sur Upwork",
    description: "Évitez l'effet 'spam' et apprenez à capter l'attention d'un client en moins de 3 secondes avec une accroche personnalisée.",
    durationMin: 15,
    steps: [
      "Sur des plateformes comme Upwork, un client reçoit en moyenne 30 propositions. Il ne lira que les deux premières lignes de votre message avant de cliquer.",
      "Ne commencez jamais votre message par : 'Bonjour, je m'appelle Pierre, j'ai 5 ans d'expérience...'. Le client s'en fiche. Il veut savoir si vous comprenez SON problème.",
      "La structure gagnante : 1. L'Accroche personnalisée montrant que vous avez lu le projet. 2. La Solution rapide proposée. 3. Le Portfolio/Exemple pertinent direct. 4. Un appel à l'action conversationnel (Call-to-Action) simple.",
      "Exemple : 'Bonjour, j'ai vu que vous cherchiez un script TikTok engageant sur la finance. J'ai rédigé le mois dernier un script similaire qui a dépassé 150 000 vues. Voici la vidéo... Auriez-vous 2 minutes pour en discuter ?'"
    ],
    activityType: "copy_sandbox",
    copyObjective: {
      scenario: "Candidature Upwork pour un client cherchant un rédacteur d'e-mails de vente.",
      audience: "Un fondateur de startup SaaS en pleine croissance qui manque de temps.",
      goal: "L'amener à fixer un appel de 10 minutes avec vous.",
      placeholderText: "Rédigez votre proposition client...",
      exampleSolution: "Bonjour, j'ai lu avec intérêt votre projet de refonte de votre séquence e-mail de bienvenue. Pour un SaaS, les 3 premiers jours déterminent 80% de la rétention d'essai. Pourriez-vous m'envoyer un lien vers votre site ? Je serais ravi de vous lister 2 optimisations rapides à mettre en place immédiatement lors d'un appel rapide de 10 minutes cette semaine."
    }
  },
  {
    id: "fr_l3",
    title: "Fixer ses Tarifs et Créer ses Premières Offres",
    description: "La psychologie des prix : comment augmenter vos tarifs sans faire fuir vos clients potentiels.",
    durationMin: 18,
    steps: [
      "Vendre à l'heure installe un rapport de force malsain : plus vous travaillez vite et bien, moins vous êtes payé. Vendez TOUJOURS au projet ou à la valeur.",
      "Créez une offre avec 3 options tarifaires : Base, Recommandé (votre cible), et Premium.",
      "L'option de Base répond à l'essentiel. L'option Recommandée ajoute d'immenses bénéfices pour un prix à peine supérieur (effet d'ancrage). L'option Premium offre un accompagnement total hyper cher, ce qui donne l'air à votre offre Recommandée d'être une affaire en or."
    ],
    activityType: "quiz",
    quiz: {
      id: "fr_q3",
      question: "Pourquoi est-il généralement recommandé de vendre au forfait plutôt qu'au taux horaire ?",
      options: [
        { text: "Parce que le taux horaire est trop complexe à calculer.", isCorrect: false },
        { text: "Le forfait récompense la rapidité et la productivité, alors que le tarif horaire pénalise l'efficacité.", isCorrect: true },
        { text: "Le fisc interdit de facturer à l'heure en France.", isCorrect: false },
        { text: "Le client préfère ne jamais savoir combien de temps prend un projet.", isCorrect: false }
      ],
      explanation: "Félicitations ! En facturant au forfait, plus vous êtes rapide et maîtrisez d'outils (comme l'IA), plus votre rentabilité horaire réelle s'envole, ce qui aligne parfaitement l'intérêt du client avec le vôtre."
    }
  }
];

// DATA STRUCTURE FOR DYNAMIC AUTO-GENERATION TO HIT EXACTLY 30 LESSONS FOR COURSE 3 (FREELANCE)
const freelanceExtraLessonsData = [
  { title: "Optimiser son profil LinkedIn pour l'inbound", desc: "Transformez votre page de profil LinkedIn en un véritable entonnoir de ventes automatique." },
  { title: "La création d'un portfolio en ligne magnétique", desc: "Présentez vos travaux IA de manière hautement professionnelle même sans expérience passée." },
  { title: "Négocier de gros contrats de prestations de services", desc: "Gagnez l'assurance nécessaire pour défendre vos prix confortablement devant l'acheteur." },
  { title: "Concevoir une offre de retainer (abonnement mensuel)", desc: "Sécurisez des revenus récurrents et stables tous les mois grâce aux contrats d'accompagnement." },
  { title: "Trouver des clients en direct sur Twitter et LinkedIn", desc: "Détectez les signaux d'intérêts et repérez les besoins des clients avant tout le monde." },
  { title: "Le cold emailing (e-mailing à froid) d'excellence", desc: "Rédigez des e-mails d'introduction personnalisés qui reçoivent de vrais retours enthousiastes." },
  { title: "Gérer les retours clients compliqués avec tact", desc: "Désamorcez le mécontentement et convertissez un incident de livraison en fidélisation long terme." },
  { title: "La psychologie du closing de vente au téléphone", desc: "Apprenez à guider le prospect vers une décision d'achat sereine lors d'une démo Zoom." },
  { title: "Créer son statut de micro-entrepreneur tape-à-l'œil", desc: "Les étapes clés administratives pour lancer sa structure légale sans aucune anxiété." },
  { title: "Automatiser sa facturation et sa comptabilité de freelance", desc: "Gagnez un temps précieux tous les mois en éliminant les tâches administratives répétitives." },
  { title: "Le personal branding pour asseoir sa légitimité", desc: "Faites-vous repérer comme la référence incontournable de votre industrie d'expertise spécifique." },
  { title: "La méthode du diagnostic offert d'audit de site", desc: "Entrez en contact avec vos prospects avec une offre irrésistible de diagnostic technique gratuit." },
  { title: "Externaliser et déléguer des tâches à des freelances", desc: "Devenez un chef d'orchestre digital en coordonnant une équipe de sous-traitants de confiance." },
  { title: "Packager ses compétences d'automatisation d'IA", desc: "Proposez des créations de agents conversationnels et de flux de travail automatisés aux PME." },
  { title: "Vendre des séminaires d'initiation à l'IA aux petites entreprises", desc: "Animez des ateliers collectifs à forte valeur ajoutée directement au sein des équipes clientes." },
  { title: "Organiser sa journée de travail en télétravail", desc: "Protégez votre temps de concentration créatrice et évitez le burnout de l'indépendant." },
  { title: "Créer un profil attractif sur Malt", desc: "Positionnez vos bons tags de compétences et optimisez votre visibilité locale en référencement." },
  { title: "Prospection par enregistrement de courtes vidéos personnalisées", desc: "Envoyez des vidéos courtes d'audit Loom gratuites pour obtenir d'immenses retours qualifiés." },
  { title: "La règle fondamentale des 3 relances intelligentes", desc: "Comment relancer vos propositions commerciales restées sans réponse sans paraître insistant." },
  { title: "Proposer de la maintenance mensuelle d'outils digitaux", desc: "Gardez vos clients fidèles sur le long terme avec de petits suivis techniques mensuels d'assurance." },
  { title: "Créer un canal de contenu (YouTube/Blog) d'autorité", desc: "Créez de la valeur gratuite pour votre marché cible afin de générer des leads qualifiés entrants." },
  { title: "Le pouvoir des communautés de freelances", desc: "Créez des alliances stratégiques professionnelles pour échanger les missions et clients saturés." },
  { title: "Rédiger des contrats de prestation solides", desc: "Sécurisez vos acomptes d'engagement et protégez vos livrables contre les clients indécis." },
  { title: "Maximiser la valeur vie client (LTV)", desc: "Découvrez comment up-seller de nouveaux services complémentaires à vos clients satisfaits actuels." },
  { title: "Faire face au syndrome de l'imposteur du freelance", desc: "Apprenez à croire en la valeur réelle du gain de performance et de temps que vous vendez." },
  { title: "Se positionner comme spécialiste IA de niche", desc: "Pourquoi se spécialiser pour une industrie précise démultiplie vos barêmes de facturation." },
  { title: "L'évaluation finale de Master Freelance", desc: "Validez vos aptitudes de lancement commercial et obtenez votre diplôme de fin d'étude officiel." }
];

// HANDMADE LESSONS FOR COURSE 4 (CHATGPT MASTERY)
const baseChatgptLessons: Lesson[] = [
  {
    id: "cg_l1",
    title: "Introduction à l'Écosystème ChatGPT & GPT-4o-mini",
    description: "Partez sur des bases saines en comprenant le fonctionnement interne de GPT-4o, la gestion de compte et de l'interface.",
    durationMin: 12,
    steps: [
      "ChatGPT est le modèle de langage de pointe conçu par OpenAI qui a démocratisé l'IA.",
      "L'interface de base se divise en trois parties : le panneau latéral contenant vos fils de discussion historiques, l'espace d'écriture sémantique, et le sélecteur de modèle (GPT-4o, GPT-4o-mini ou GPT-4).",
      "GPT-4o est le modèle le plus intelligent, capable de raisonner de manière multimodale (comprendre du texte, des images, et de la voix).",
      "GPT-4o-mini est une version ultra-rapide et économique idéale pour les tâches courantes et le débogage de masse."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Formulez votre premier prompt à destination de GPT-4o-mini pour lui demander de résumer en 3 puces simples le concept d'intelligence artificielle générative.",
      systemTemplate: "Direct generation of a tailored bulleted content summary.",
      placeholderText: "Rédigez votre prompt pour résumer le concept de l'IA générative...",
      exampleSolution: "Agis comme un vulgarisateur scientifique. Explique-moi le fonctionnement général de l'IA Générative sous forme de 3 puces d'excellence très simples à comprendre pour un enfant de 10 ans."
    }
  },
  {
    id: "cg_l2",
    title: "L'art du Prompting Direct & Zéro-Shot",
    description: "Sachez interroger ChatGPT en formulant des tâches directes efficaces d'un seul jet sans exemples préalables.",
    durationMin: 10,
    steps: [
      "Le 'Zero-shot Prompting' consiste à confier une mission ou poser une question à l'IA sans lui injecter d'exemples de réponses préalables.",
      "C'est la méthode de prompting la plus courante. Elle fonctionne excellemment bien sur GPT-4o grâce à sa vaste connaissance pré-entraînée.",
      "Pour optimiser un prompt Zero-shot, nommez un rôle clair, injectez les données à analyser entourées de délimiteurs, et décrivez précisément le livrable désiré."
    ],
    activityType: "quiz",
    quiz: {
      id: "cg_q2",
      question: "Quelle est la caractéristique principale d'un prompt dit 'Zero-shot' ?",
      options: [
        { text: "Il s'appuie sur une structure d'apprentissage récursive et des boucles d'exemples.", isCorrect: false },
        { text: "Aucun exemple préalable de résultat attendu n'est fourni au modèle de langage.", isCorrect: true },
        { text: "Il demande à l'IA de s'arrêter après la génération de zéro mot sémantique.", isCorrect: false },
        { text: "L'IA utilise uniquement des sources issues d'une base de données locale sécurisée.", isCorrect: false }
      ],
      explanation: "Parfait ! Un prompt Zero-shot consiste à formuler directement la consigne de travail sans influencer le modèle par des exemples d'exécutions passées."
    }
  },
  {
    id: "cg_l3",
    title: "Le Panneau d'Instructions Personnalisées (Custom Instructions)",
    description: "Apprenez à configurer des préférences à vie sous le capot de ChatGPT pour lui inculquer votre métier et vos préférences de style.",
    durationMin: 15,
    steps: [
      "Entrer vos consignes de style, votre langue et votre contexte professionnel à chaque nouvelle discussion avec ChatGPT devient rapidement fatiguant.",
      "Pour résoudre cela, ChatGPT intègre les 'Custom Instructions' (instructions personnalisées) accessibles depuis les réglages de votre compte au bas de l'écran.",
      "Ce panneau se compose de 2 champs textuels majeurs que l'IA consulte impérativement au début de chaque nouvelle ligne sémantique de toutes vos conversations.",
      "Le premier champ : 'Que voulez-vous que ChatGPT sache sur vous pour fournir de meilleures réponses ?' (votre métier, objectifs, passions, etc.).",
      "Le second champ : 'Comment voulez-vous que ChatGPT réponde ?' (ton décontracté ou académique, format court, ne pas s'excuser inutilement, etc.)."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Rédigez la configuration idéale de votre profil pour un Custom Instruction en tant que Consultant SEO indépendant désirant des réponses courtes sans phrases de politesse superflues.",
      systemTemplate: "Custom Instructions system profiling recipe crafting.",
      placeholderText: "Section 1: À propos de moi / Section 2: Instructions de style de réponse...",
      exampleSolution: "Section 1 : Je suis Consultant SEO indépendant. J'aide des e-commerçants à croître. Section 2 : Reste direct, technique et pragmatique. Supprime toutes les phrases de salutations et de compliments superflus. Donne les réponses directement sous forme de listes d'actions."
    }
  }
];

const chatgptExtraLessonsData = [
  { title: "L'anatomie et Création des Custom GPTs", desc: "Bâtissez vos propres assistants personnalisés dotés de documents de référence et de comportements figés." },
  { title: "Utiliser la fonction Advanced Data Analysis", desc: "Fournissez des fichiers Excel ou CSV et demandez à ChatGPT de coder en Python sous le capot pour tracer des graphiques." },
  { title: "Le Scraping de données web en direct", desc: "Faites mener des recherches de veille concurrentielle en temps réel sur les moteurs de recherche par ChatGPT." },
  { title: "Le formatage de réponse en JSON pour les développeurs", desc: "Forcer l'IA à renvoyer un format objet structuré pour l'intégrer proprement dans vos applications." },
  { title: "Génération de visuels DALL-E 3 de luxe", desc: "Maîtrisez les invites artistiques pour concevoir des illustrations et logos d'un réalisme saisissant." },
  { title: "La traduction sémantique et culturelle d'élite", desc: "Traduisez vos textes de vente en conservant les expressions locales, l'humour, et l'impact émotionnel." },
  { title: "Correction de code et refactoring de scripts complexes", desc: "Soumettez vos bogues de programmation à ChatGPT et demandez-lui d'appliquer des correctifs normés." },
  { title: "La gestion intelligente de la fenêtre de contexte", desc: "La structure ultime pour résumer de gigantesques documents ou romans sans dépasser la mémoire de travail." },
  { title: "L'application Desktop et ses raccourcis d'élite", desc: "Intégrez ChatGPT au cœur de votre ordinateur pour l'invoquer instantanément lors de la rédaction d'e-mails." },
  { title: "L'Advanced Voice Mode interactif", desc: "Utilisez la prise de parole naturelle en temps réel pour pratiquer et vous entraîner aux entretiens d'un ton fluide." },
  { title: "Le Reverse-Prompting de style d'écriture", desc: "Donnez un texte que vous avez rédigé et demandez à ChatGPT d'extraire la formule sémantique précise de votre voix." },
  { title: "Analyses de bilans financiers au format PDF", desc: "Importez vos données comptables et laissez ChatGPT détecter les ratios de rentabilité et axes de réduction des coûts." },
  { title: "Ingénierie de scénarios de formation d'entreprise", desc: "Créez des parcours d'apprentissage interactifs pour guider vos nouvelles recrues dans leurs missions de poste." },
  { title: "La méthode d'optimisation SEO avancée", desc: "Structurez des arbres de mots-clés et déterminez l'intention de recherche de vos articles de blog grâce à ChatGPT." },
  { title: "Rédiger des accords juridiques et conditions d'usage", desc: "Apprenez à structurer des avant-projets de contrats solides avant de les faire valider par vos conseils." },
  { title: "Newsletters de vente à taux de clic exceptionnel", desc: "Automatisez la création de vagues de courriels captivants en injectant une structure narrative fluide." },
  { title: "L'évaluation finale de Certification d'Expert ChatGPT", desc: "Examen académique complet en conditions réelles pour certifier vos aptitudes d'expert et obtenir votre diplôme." }
];

// HANDMADE LESSONS FOR COURSE 5 (CLAUDE MASTERY)
const baseClaudeLessons: Lesson[] = [
  {
    id: "cl_l1",
    title: "Introduction à Claude 3.5 Sonnet & à l'Écosystème d'Anthropic",
    description: "Saisissez la philosophie d'Anthropic axée sur l'éthique, la sécurité, la nuance et la précision linguistique supérieure.",
    durationMin: 12,
    steps: [
      "Claude est la gamme de modèles de langage d'avant-garde initiée par Anthropic, entreprise fondée par d'anciens cadres de recherche d'OpenAI.",
      "Le modèle phare Claude 3.5 Sonnet surclasse fréquemment ses rivaux dans les tâches de rédaction littéraire, de programmation et de logique pure.",
      "L'interface Web de Claude propose des espaces d'apprentissage uniques : les Projets (Claude Projects) pour mutualiser des docs, et les Chats pour échanger.",
      "L'une des plus grandes forces de Claude réside dans son ton humble, analytique et beaucoup plus chaleureux que la prose générique habituelle de l'IA."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Formulez un prompt demandant à Claude 3.5 Sonnet d'exposer la méthode d'écriture persuasive en se concentrant sur les nuances émotionnelles douces.",
      systemTemplate: "Socio-cultural analytical perspective generation model.",
      placeholderText: "Rédigez votre invite pour structurer un plaidoyer humble...",
      exampleSolution: "Agis comme un copywriter littéraire d'élite. Rédige un court paragraphe d'introduction pour convaincre des artisans de s'engager sur une démarche éco-responsable. Utilise le style d'Anthropic Claude : reste chaleureux, humble, sans artifices ni superlatifs vendeurs."
    }
  },
  {
    id: "cl_l2",
    title: "Les Secrets du Prompting de Claude : L'excellence des balises XML",
    description: "Structurez vos instructions complexes en utilisant des balises XML personnalisées pour décongestionner le raisonnement de Claude.",
    durationMin: 15,
    steps: [
      "Contrairement à ChatGPT qui répond bien au texte brut, Claude a été spécifiquement entraîné pour interpréter de manière structurée les balises XML.",
      "Les balises XML courantes ressemblent à <context>, <instructions>, <exemples>, ou <texte_a_traiter>.",
      "L'utilisation de ces conteneurs sémantiques aide Claude à séparer hermétiquement vos directives du contenu variable à analyser, éliminant tout risque de faux raccord.",
      "Exemple de structure recommandée : '<instructions>Traduis le document suivant</instructions> <document>[Texte ici]</document>'."
    ],
    activityType: "quiz",
    quiz: {
      id: "cl_q2",
      question: "Pourquoi Claude a-t-il une affinité si forte avec les balises XML (comme <instructions> ou <data>) dans les prompts ?",
      options: [
        { text: "Les balises XML sont converties en code binaire avant d'arriver au processeur d'Anthropic.", isCorrect: false },
        { text: "Claude a été entraîné spécifiquement sur des arbres de données XML pour trier et hiérarchiser les métadonnées et consignes.", isCorrect: true },
        { text: "Elles réduisent par 10 les frais d'activation de la licence d'étudiant.", isCorrect: false },
        { text: "Elles forcent automatiquement Claude à s'interconnecter avec l'outil de génération d'images DALL-E 3.", isCorrect: false }
      ],
      explanation: "Parfait ! Les modèles d'Anthropic sont d'immenses spécialistes des balises de balisage récursif XML, ce qui leur évite de mélanger vos instructions d'administration avec les textes d'entrée."
    }
  },
  {
    id: "cl_l3",
    title: "Révolutionner son Workflow avec les Artifacts de Claude",
    description: "Exploitez les modules interactifs Artifacts pour co-créer des maquettes de sites, des applications web, des SVG ou des documents complets en direct.",
    durationMin: 15,
    steps: [
      "Un 'Artifact' est une interface visuelle séparée qui apparaît sur le côté de Claude lorsque celui-ci génère du code interactif ou des contenus majeurs autonomes.",
      "Vous pouvez modifier, rafraîchir ou exécuter ces artéfacts au fur et à mesure de votre discussion.",
      "C'est l'outil ultime pour designer des petits tableaux de bord, des animations interactives, des graphiques dynamiques ou des jeux complets en HTML d'un geste.",
      "Pour forcer Claude à créer un Artifact, demandez-lui de livrer un fichier autonome et complet : un composant React simple, une page HTML ou un script JavaScript interactif."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Rédigez un prompt pour demander à Claude de concevoir un artéfact interactif simulant une application web de calculatrice financière pour indépendants.",
      systemTemplate: "Artifact visualization interactive system layout generation.",
      placeholderText: "Formulez votre invite complexe pour générer un Artifact...",
      exampleSolution: "Agis comme un développeur UI senior. Code une page HTML autonome et interactive d'une calculatrice de chiffre d'affaires d'auto-entrepreneur d'élite. Intègre un CSS attrayant. Rends le code entièrement utilisable sous forme d'Artifact Claude."
    }
  }
];

const claudeExtraLessonsData = [
  { title: "L'anatomie et administration des Cyber Projets Claude", desc: "Créez des coffres-forts thématiques (Claude Projects) réunissant vos notices techniques et lignes directrices de style de marque." },
  { title: "Analyse avancée de volumineux dossiers PDF (200K)", desc: "Exploitez l'immense fenêtre de traitement d'Anthropic pour auditer des rapports juridiques et synthèses complexes." },
  { title: "Conception de prototypes interactifs HTML & React", desc: "Accélérez vos maquettes d'applications SaaS et livrez des versions cliquables à vos clients d'un seul jet." },
  { title: "Génération de visualisations de données d'excellence", desc: "Créez des diagrammes interactifs SVG de modélisation pour vos rapports d'affaires les plus pointus." },
  { title: "Le Prompt-Tuning pour les API de développement Claude", desc: "Optimisez vos paramètres de température et vos directives système pour intégrer Claude dans vos projets de programmation." },
  { title: "Déboguage et refactoring de scripts multi-fichiers", desc: "Soumettez des architectures complexes à Claude et demandez-lui d'assurer la cohérence globale et la correction de bogues." },
  { title: "La traduction sémantique et adaptative littéraire", desc: "Conservez les rimes, les calembours et les intentions narratives d'un texte d'origine d'un réalisme d'écriture bluffant." },
  { title: "Traitement intelligent et synthèse de transcriptions audio", desc: "Convertissez de longs fichiers textuels de réunions de 3 heures en planches de livrables et listes de tâches précises." },
  { title: "Exploiter Claude Desktop pour la productivité au clavier", desc: "Intégrez l'application officielle Anthropic pour l'invoquer à tout moment lors de la rédaction de vos rapports." },
  { title: "Le reverse-prompting de structures de logique complexe", desc: "Faites analyser un raisonnement de haute voltige par Claude pour qu'il formalise le prompt réplicateur correspondant." },
  { title: "Analyses de contrats juridiques et de clauses de risque", desc: "Laissez Claude analyser vos documents contractuels pour soulever les points de vigilance majeurs avant signature." },
  { title: "Cartographie et formulation de questions inductives", desc: "Guidez vos réunions de brainstorming d'une manière incroyablement plus riche en explorant des points d'ombre inattendus." },
  { title: "Conception de scénarios de dialogues de vente B2B", desc: "Entraînez vos équipes commerciales en paramétrant Claude en acheteur redoutable refusant de signer sans remises." },
  { title: "L'art de l'écriture en mode 'System Prompts' ultra-stricts", desc: "Paramétrez le cadre comportemental de Claude pour des agents d'intelligence de service client d'une fidélité extrême." },
  { title: "Automatiser l'ingénierie d'arbres décisionnels SQL", desc: "Construisez des requêtes de bases de données et des modélisations de flux de travail à fort impact analytique." },
  { title: "Le Deep-Reasoning et arbitrage de dilemmes complexes", desc: "Soumettez des nœuds décisionnels et demandez à Claude de poser le pour et le contre avec une justesse académique sans pareil." },
  { title: "L'évaluation finale de Certification d'Expert Claude IA", desc: "Examen académique complet en conditions réelles pour certifier vos aptitudes d'expert Anthropic Claude Plus et obtenir votre diplôme." }
];

// HANDMADE LESSONS FOR COURSE 6 (GEMINI MASTERY)
const baseGeminiLessons: Lesson[] = [
  {
    id: "gm_l1",
    title: "Introduction à Google Gemini & l'Écosystème Multimodal",
    description: "Appréhendez l'intelligence nativement multimodale de Google, capable de fusionner instantanément texte, images, audio et vidéo haute définition.",
    durationMin: 12,
    steps: [
      "Gemini est le premier modèle conçu dès le départ pour être multimodal, développé de concert par Google DeepMind et Google Research.",
      "Contrairement aux approches hybrides, Gemini traite en natif tous les types de signaux d'entrée sans convertisseurs tiers, offrant une fluidité d'interprétation unique.",
      "Le modèle phare Gemini 1.5 Pro dispose d'une gigantesque mémoire de travail, tandis que Gemini 1.5 Flash brille par sa vélocité extrême d'exécution.",
      "L'interface Web Gemini Advanced intègre de surcroît les extensions Google (Workspace, Maps, YouTube) pour des recherches dynamiques en temps réel."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Formulez un prompt demandant à Gemini de croiser une analyse de texte avec des contextes vidéos et géographiques.",
      systemTemplate: "Multimodal contextual search prompt construction model.",
      placeholderText: "Formulez votre invite multimodale associant vidéo et texte...",
      exampleSolution: "Agis comme un guide de voyage d'élite. En tenant compte d'une vidéo de randonnée de 10 minutes en haute montagne et de ma position actuelle, suggère-moi le meilleur itinéraire sécurisé et rédige un court topo explicatif."
    }
  },
  {
    id: "gm_l2",
    title: "La Révolution des 2 millions de jetons : Fenêtre de Contexte Géante",
    description: "Comprenez comment exploiter l'une des plus spectaculaires percées technologiques : l'ingestion de livres entiers ou de bases de code complètes.",
    durationMin: 15,
    steps: [
      "Gemini 1.5 Pro propose une fenêtre de contexte allant jusqu'à 2 000 000 de tokens de mémoire active.",
      "Cela équivaut à traiter environ 1 heure de vidéo, 11 heures d'audio, ou plus de 700 000 mots d'un coup.",
      "Cette fenêtre élimine le besoin d'outils RAG basiques en permettant d'injecter directement l'intégralité d'un projet de programmation complexe dans l'invite.",
      "Le Context Caching (mise en cache du contexte) permet en plus de conserver ces données chargées pour réduire drastiquement l'usage de tokens à chaque relance."
    ],
    activityType: "quiz",
    quiz: {
      id: "gm_q2",
      question: "Quelle est la taille maximale de la fenêtre de contexte offerte par Gemini 1.5 Pro pour le grand public et les développeurs ?",
      options: [
        { text: "Environ 32 000 tokens de contexte partagé par défaut.", isCorrect: false },
        { text: "Jusqu'à 2 000 000 de tokens, permettant de stocker des bibliothèques de code entières.", isCorrect: true },
        { text: "Seulement 4 096 jetons de mémoire vive avant blocage.", isCorrect: false },
        { text: "Aucune limite car le modèle n'utilise jamais de cache local.", isCorrect: false }
      ],
      explanation: "Superbe ! Gemini 1.5 Pro se démarque mondialement par sa fenêtre de contexte phénoménale de 2 millions de tokens, révolutionnant le traitement de données volumineuses."
    }
  },
  {
    id: "gm_l3",
    title: "Le Google AI Studio d'élite pour les Créateurs",
    description: "Apprenez à paramétrer gratuitement vos clés d'API et à concevoir vos propres applications boostées à l'IA de Google.",
    durationMin: 15,
    steps: [
      "Google AI Studio est la sandbox de développement officielle proposée par Google pour expérimenter rapidement les API Gemini.",
      "C'est l'outil gratuit parfait pour générer des clés d'API en un clic, tester des prompts système stricts, et ajuster la température du modèle.",
      "Vous pouvez affiner vos invites avec des règles métier strictes, des blocs d'exemples de questions-réponses, et de la génération de réponses structurées JSON.",
      "AI Studio permet également de traduire vos prototypes de prompts d'un clic en code prêt à être exporté vers vos applications Python, JavaScript, ou cURL."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Concevez le squelette de prompt système idéal pour un agent conversationnel autonome chargé de formater des rapports immobiliers stricts au format JSON.",
      systemTemplate: "Structured JSON schema prompt configuration template.",
      placeholderText: "Définissez les instructions système et le format d'objet JSON cible...",
      exampleSolution: "Instructions système : Tu es un assistant d'édition immobilière. Tu génères uniquement des réponses conformes au schéma JSON suivant : { 'prix': 0, 'surface': 0, 'atouts': [] }. Ne produis aucun texte d'introduction ou de conclusion."
    }
  }
];

const geminiExtraLessonsData = [
  { title: "Configuration et orchestration des Extensions Gemini", desc: "Activez et connectez Gmail, Drive, Flights, et Google Maps en direct à vos séances de réflexion de groupe." },
  { title: "Analyse en direct de fichiers vidéos HD en natif", desc: "Soumettez des séquences capturées ou des webinaires entiers et laissez Gemini en extraire les moments clés à la seconde près." },
  { title: "Mise en œuvre du Context Caching sous Google AI Studio", desc: "Réduisez vos coûts d'API de plus de 90% en configurant des caches permanents sur vos bases de documents." },
  { title: "Génération de formats de données structurés en JSON strict", desc: "Forcez Gemini à formuler systématiquement ses retours sous forme d'objets informatiques solides pour vos applications web." },
  { title: "L'art du Function Calling : Connecter Gemini au Web", desc: "Déclarez vos fonctions logiques internes et laissez le modèle décider quand et comment les solliciter en temps réel." },
  { title: "Analyse statistique de gigantesques rapports comptables", desc: "Tirez pleinement parti des 2 millions de jetons pour auditer des dossiers d'audits financiers agrégés sur plusieurs années." },
  { title: "Création de vos propres Gems de productivité", desc: "Personnalisez l'assistant et installez des comportements de modération permanents au cœur de votre compte Advanced." },
  { title: "Utiliser la puissance de recherche de Google Search Grounding", desc: "Bénéficiez de la rigueur de recherche d'informations en direct combinée à la génération de texte pour éliminer les hallucinations." },
  { title: "Traduction automatique de livres entiers d'un seul jet", desc: "Soumettez de colossaux manuscrits de 500 pages et appliquez des traductions linguistiques hautement fidèles aux contextes locaux." },
  { title: "Mise en place de l'API de streaming de jetons", desc: "Améliorez le confort d'usage de vos utilisateurs en affichant l'avancement de génération mot à mot en temps réel." },
  { title: "Configuration de la sécurité et filtres de sécurité Google", desc: "Ajustez de manière granulaire les niveaux de blocage de contenus indésirables ou offensants sur l'API Vertex." },
  { title: "Rédaction créative multi-voix pour scripts vidéos", desc: "Concevez des scénarios immersifs en demandant à Gemini de structurer chaque rôle par récurrence sémantique." },
  { title: "Le Reverse-Engineering de prompts pour l'UI Google", desc: "Donnez des visualisations ou des textes précis et extrayez la méthodologie d'invite optimisée pour le moteur Gemini." },
  { title: "Intégrer Gemini dans Google Docs & Sheets Workspace", desc: "Accélérez l'automatisation de vos tableurs d'analyse en liant Gemini direct à vos processus de vente quotidiens." },
  { title: "Création de formulaires interactifs animés par Gemini", desc: "Exploitez les capacités logiques de l'IA pour générer du code d'interactions sémantiques réactives d'un geste." },
  { title: "L'optimisation des prompts système pour les chatbots complexes", desc: "Bâtissez des scénarios de support à la clientèle d'une fidélité infaillible ne déviant jamais des directives de l'entreprise." },
  { title: "L'évaluation finale de Certification d'Expert Google Gemini IA", desc: "Examen académique de certification de haut niveau en conditions réelles pour décrocher votre certificat d'excellence." }
];

// HANDMADE LESSONS FOR COURSE 7 (DEEPSEEK MASTERY)
const baseDeepseekLessons: Lesson[] = [
  {
    id: "ds_l1",
    title: "Introduction à DeepSeek-R1 & au Deep Reasoning",
    description: "Appréhendez l'incroyable fonctionnement de DeepSeek-R1 et de ses modèles de raisonnement autonomes de pointe.",
    durationMin: 12,
    steps: [
      "DeepSeek-R1 est un modèle d'intelligence artificielle de premier plan qui se distingue par son processus de raisonnement systématique.",
      "Durant la génération, le modèle produit un flux de pensée complexe (Chain-of-Thought) encapsulé par les balises sémantiques <think>.",
      "Cette approche lui permet d'autocorriger ses hypothèses en direct, de vérifier ses théories mathématiques et de déboguer du code avant de livrer la réponse.",
      "D'origine open-source, DeepSeek bouscule les paradigmes de puissance brute en proposant des performances d'élite pour une fraction du coût habituel."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Formulez un prompt demandant à DeepSeek-R1 d'arbitrer un dilemme de logistique internationale en exploitant son raisonnement pas-à-pas.",
      systemTemplate: "DeepSeek-R1 structural reasoning logic template.",
      placeholderText: "Formulez votre invite pour explorer tous les angles logiques...",
      exampleSolution: "Agis comme un ingénieur logistique senior. Évalue les impacts et propose la meilleure option face à une rupture d'approvisionnement en matières premières maritimes entre l'Europe et l'Asie. Laisse libre cours à ta réflexion pas-à-pas."
    }
  },
  {
    id: "ds_l2",
    title: "Maîtriser le Chain-of-Thought (CoT) et l'Invite Neutre",
    description: "Apprenez à formuler des instructions neutres pour laisser le modèle développer pleinement ses capacités internes de pensée.",
    durationMin: 15,
    steps: [
      "L'une des erreurs courantes avec DeepSeek-R1 est de trop contraindre la structure de la réponse dans les instructions primaires.",
      "En imposant des règles d'affichage trop prématurées, vous risquez de brider le calcul de son arbre de décisions interne.",
      "La règle d'or consiste à formuler clairement l'objectif final, tout en laissant l'espace sémantique libre au processus de réflexion.",
      "Distinguez clairement la phase de conceptualisation (dans <think>) de la réponse finale délivrée au client."
    ],
    activityType: "quiz",
    quiz: {
      id: "ds_q2",
      question: "Pourquoi est-il généralement recommandé de ne pas trop contraindre la forme finale de la réponse au moment d'utiliser DeepSeek-R1 ?",
      options: [
        { text: "Parce que le modèle n'a pas accès aux bases de données géographiques globales.", isCorrect: false },
        { text: "Une restriction de mise en page trop stricte au départ peut inhiber et étouffer le bon déroulement de son raisonnement interne (CoT).", isCorrect: true },
        { text: "Parce que DeepSeek convertit toutes ses réponses finales au format CSV uniquement.", isCorrect: false },
        { text: "Pour réduire le coût moyen d'hébergement d'un serveur local.", isCorrect: false }
      ],
      explanation: "Excellent ! Contraindre prématurément la forme de la réponse de DeepSeek-R1 empêche son architecture de raisonnement de se déployer de manière optimale."
    }
  },
  {
    id: "ds_l3",
    title: "DeepSeek API & Intégrations à Coût Hyper-Réduit",
    description: "Apprenez à intégrer le endpoint officiel et à diviser vos coûts opérationnels d'API par rapport aux géants américains.",
    durationMin: 15,
    steps: [
      "DeepSeek propose l'une des API les plus économiques et performantes du marché, compatible avec la syntaxe standard d'OpenAI.",
      "Vous pouvez utiliser le modèle performant DeepSeek-V3 pour vos besoins courants de génération de textes et de réponses structurées ultra-rapides.",
      "Pour vos requêtes d'ingénierie logicielle ou mathématique de haute précision, utilisez la puissance de DeepSeek-R1.",
      "L'intégration directe à des plateformes cloud simplifie grandement la transition et la mise en production de vos applications sans fioritures."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Concevez le canevas de prompt API idéal pour commander DeepSeek-V3 afin qu'il traduise de manière brute des fiches techniques de machines industrielles.",
      systemTemplate: "API payload structured machine-oriented configuration.",
      placeholderText: "Saisissez les paramètres systèmes clés et l'invite de traduction brute...",
      exampleSolution: "Système : Tu es un traducteur de documents d'ingénierie ultra-précis. Traduis les termes techniques suivants en allemand sans fioritures ni salutations : 'capteur de couple résonnant', 'vitesse de consigne angulaire'."
    }
  }
];

const deepseekExtraLessonsData = [
  { title: "Comprendre l'architecture Mixture-of-Experts (MoE) de DeepSeek", desc: "Plongez dans les détails techniques de l'architecture V3 qui active uniquement les neurones nécessaires pour une efficacité absolue." },
  { title: "Configuration pratique et déploiement local via Ollama", desc: "Apprenez à installer et faire tourner des versions quantifiées de DeepSeek-R1 chez vous sur votre propre matériel sans connexion internet." },
  { title: "Le Prompt-Tuning pour maximiser le raisonnement de R1", desc: "Ajustez vos invites et règles directes pour guider la structure du raisonnement sans couper la puissance d'analyse du modèle." },
  { title: "Génération de code informatique de niveau supérieur avec DeepSeek-Coder", desc: "Déboguez et concevez des algorithmes complexes, des arborescences de bases de données et des applications réactives complètes d'un trait." },
  { title: "Rapprochement analytique multi-critères sous DeepSeek", desc: "Automatisez la comparaison de cahiers des charges complexes et triez la pertinence des réponses pour vos appels d'offres stratégiques." },
  { title: "Stratégies d'intégration de l'API avec les SDK officiels", desc: "Configurez l'interconnexion de DeepSeek à vos applications web Node.js et Python en conservant la pleine compatibilité OpenAI." },
  { title: "Optimisation de l'évaluation froide et vérifications logiques", desc: "Entraînez le modèle de raisonnement à faire de la double validation de calculs budgétaires pour exclure tout risque d'erreur." },
  { title: "L'art d'utiliser DeepSeek pour la recherche de brevets", desc: "Identifiez les antériorités techniques et cartographiez les technologies concurrentielles grâce à la lecture critique de brevets." },
  { title: "Scénarisation et rédaction persuasive de livres blancs", desc: "Synthétisez et structurez des sujets scientifiques ou d'ingénierie complexes pour les rendre accessibles à un public professionnel." },
  { title: "Déboguer des architectures logicielles complètes", desc: "Utilisez la capacité d'autocorrection logique de DeepSeek-R1 en lui fournissant plusieurs fichiers de codes sources dépendants." },
  { title: "Formater des flux de données pour des pipelines décisionnels", desc: "Générez des arbres d'instructions et des tables de dictionnaire de variables propres et normés pour vos processus d'affaires." },
  { title: "L'ingénierie d'invites pour la détection d'anomalies de sécurité", desc: "Analysez des logs système ou des fichiers de configurations réseau et laissez le raisonnement pas-à-pas débusquer les maillons faibles." },
  { title: "Simulation de négociations d'affaires hautement stratégiques", desc: "Paramétrez des agents interactifs dotés du raisonnement fluide de DeepSeek pour simuler des comités d'arbitrage tendus." },
  { title: "Exploiter DeepSeek pour l'écriture de scripts de formation", desc: "Générez des modules didactiques et structurez des leçons pédagogiques fluides basées sur des concepts académiques pointus." },
  { title: "Modélisation de requêtes SQL imbriquées et optimisation de flux", desc: "Construisez des requêtes relationnelles performantes et optimisez le partitionnement de vos bases de données phares d'un coup." },
  { title: "Interroger DeepSeek sur des contextes de mathématiques de haut niveau", desc: "Résolvez des équations d'optimisation opérationnelle et validez la logique de calcul de vos équations de modélisation mathématique." },
  { title: "L'évaluation finale de Certification d'Expert DeepSeek IA", desc: "Validation finale complète d'expert en conditions réelles pour obtenir votre diplôme certifié d'excellence en Reasoning models." }
];

// HANDMADE LESSONS FOR COURSE 8 (KIMI MASTERY)
const baseKimiLessons: Lesson[] = [
  {
    id: "km_l1",
    title: "Introduction à Kimi.ai & au Long Contexte de Recherche",
    description: "Appréhendez l'intelligence unique de Kimi (Moonshot AI), pionnière de la lecture de très longs documents et de la recherche web assistée.",
    durationMin: 12,
    steps: [
      "Kimi est développée par Moonshot AI et s'est imposée grâce à son support précoce et extrêmement robuste des contextes géants (200 000 caractères et plus).",
      "Le point fort de Kimi réside dans sa vitesse d'ingestion de fichiers textes volumineux et sa capacité à naviguer en temps réel sur le web sans perte d'attention.",
      "Kimi excelle à structurer de longs argumentaires de recherche, réaliser des revues de littérature approfondies et extraire des concepts clés.",
      "L'interface intègre des outils d'exploration active pour analyser en profondeur les liens croisés d'un sujet complexe."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Formulez un prompt demandant à Kimi d'analyser en profondeur une série d'articles web de recherche et de dresser un tableau synthétique.",
      systemTemplate: "Kimi multi-source web mining prompt model.",
      placeholderText: "Formulez votre invite d'exploration web profonde pour Kimi...",
      exampleSolution: "Agis comme un analyste de recherche senior. Explore en direct les 3 derniers articles traitant de la décarbonation industrielle et génère une synthèse critique structurée sous forme de tableau."
    }
  },
  {
    id: "km_l2",
    title: "Kimi+ & l'Orchestration d'Agents Personnalisés",
    description: "Explorez Kimi+ pour déployer des micro-agents spécialisés répondant à des logiques et workflows complexes.",
    durationMin: 15,
    steps: [
      "Kimi+ propose des modules et micro-agents pré-configurés pour la programmation, la relecture de contrats ou la recherche académique.",
      "Ces agents possèdent des instructions système spécifiques et un accès automatisé à des outils de calcul ou de rendu.",
      "Vous pouvez assembler des chaînes d'instructions pour faire collaborer ces modules dans votre flux de travail professionnel quotidien.",
      "L'utilisation et l'optimisation des requêtes pour Kimi+ permettent de gagner un temps précieux et d'automatiser des analyses répétitives."
    ],
    activityType: "quiz",
    quiz: {
      id: "km_q2",
      question: "Qu'est-ce que l'espace Kimi+ chez Moonshot AI ?",
      options: [
        { text: "Une extension payante servant uniquement à stocker des photos.", isCorrect: false },
        { text: "Un catalogue d'agents spécialisés et hautement configurés pour des tâches professionnelles précises.", isCorrect: true },
        { text: "Un compilateur destiné à traduire le code binaire en langage assembleur.", isCorrect: false },
        { text: "Un service de cloud gaming hébergé sur des serveurs mobiles de divertissement.", isCorrect: false }
      ],
      explanation: "Parfait ! Kimi+ propose une suite d'assistants IA et d'agents hautement formés pour accélérer vos routines créatives et techniques."
    }
  },
  {
    id: "km_l3",
    title: "L'API Moonshot & les Requêtes à Long Contexte",
    description: "Apprenez à intégrer l'API Moonshot AI au cœur de vos projets informatiques et à configurer l'ingestion massive de jetons.",
    durationMin: 15,
    steps: [
      "L'API Moonshot supporte par défaut des contextes de requêtes géants avec des temps de latence extrêmement bas.",
      "L'endpoint est entièrement compatible avec le SDK d'OpenAI, facilitant ainsi grandement les migrations ou le multi-modèles.",
      "Vous devez optimiser la structure de vos fichiers soumis pour éviter que le modèle ne perde en précision (problème du Lost in the Middle).",
      "Maîtriser les configurations d'API de Moonshot permet d'intégrer des modules d'analyse documentaire complets de premier ordre."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Créez une invite système pour l'API de Kimi ordonnant l'extraction de tous les indicateurs clés de performance (KPI) financiers d'un rapport de 100 pages.",
      systemTemplate: "Long-context key extraction template for Moonshot API.",
      placeholderText: "Définissez les instructions d'extraction documentaire de grande échelle...",
      exampleSolution: "Tu es un auditeur financier d'élite spécialisé dans le traitement de grands contextes. Analyse ce rapport annuel de 100 pages et construis une liste brute structurée de tous les KPI chiffrés avec les pages de référence."
    }
  }
];

const kimiExtraLessonsData = [
  { title: "Ingestion de fichiers PDF de plusieurs centaines de pages sous Kimi", desc: "Soumettez de colossales documentations de recherche et apprenez à poser des questions extrêmement chirurgicales." },
  { title: "Configuration des outils de recherche web en temps réel", desc: "Activez la recherche de Kimi pour auditer l'exactitude d'événements financiers ou technologiques ultra-récents." },
  { title: "L'art de la synthèse comparative multi-fichiers", desc: "Téléversez plusieurs contrats de prestation en parallèle et laissez Kimi lister en gras les contradictions et clauses de risques." },
  { title: "Exploiter la vitesse de lecture de Kimi pour les articles scientifiques", desc: "Gagnez des heures de veille technologique en demandant d'extraire les protocoles expérimentaux d'études complexes." },
  { title: "Créer un assistant de correction de code avec Moonshot AI", desc: "Intégrez des scripts d'analyse statique et laissez l'IA de Kimi réorganiser et optimiser vos fonctions d'arrière-plan." },
  { title: "Contourner les hallucinations d'extraction sur de grands volumes", desc: "Appliquez des modèles de double confirmation et sécurisez l'intégrité de vos rapports sectoriels d'élite." },
  { title: "Configurer des instructions système avancées sur Kimi+", desc: "Bâtissez des profils d'assistants d'écriture extrêmement performants respectant scrupuleusement votre identité sémantique." },
  { title: "Utiliser l'adaptation au contexte pour les fictions littéraires", desc: "Soumettez des trames narratives volumineuses et demandez d'écrire de nouveaux chapitres en gardant une parfaite cohérence de tons." },
  { title: "API Moonshot : Gestion et optimisation du cache de requêtes", desc: "Découvrez comment les mécanismes d'optimisation de Moonshot permettent d'économiser de grandes quantités de bande passante." },
  { title: "Rédiger des résumés exécutifs complexes à destination du Board", desc: "Convertissez de grands tas de données financières éparses en mémos concis et stratégiques pour la prise de décision." },
  { title: "Traduction littéraire de haute fidélité avec Kimi", desc: "Soumettez des textes romanesques de grande envergure et préservez les figures de style grâce à la vue globale du contexte." },
  { title: "L'art du RAG assisté sans base vectorielle externe", desc: "Profitez de la mémoire immense de Kimi pour placer l'ensemble de votre base de connaissances directement dans la session de discussion." },
  { title: "Analyse en direct de rapports de tendances de marché", desc: "Auditez et croisez les prédictions de cabinets reconnus et tirez-en de formidables opportunités de side-hustles d'excellence." },
  { title: "Techniques de prompting pour le traitement des langues asiatiques", desc: "Optimisez vos requêtes biculturelles grâce à la parfaite maîtrise de Kimi sur les corpus linguistiques complexes." },
  { title: "Automatisations documentaires pour les professionnels du droit", desc: "Accélérez l'audit juridique de vos chartes et annexes en demandant à Kimi d'isoler les déviations par rapport au droit national." },
  { title: "La revue de presse complète en un clic grâce au scraping collaboratif", desc: "Combinez la recherche de Kimi à des dépôts d'actualités pour formuler d'exceptionnels condensés d'information pour vos équipes." },
  { title: "L'évaluation finale de Certification d'Expert Kimi.ai", desc: "Examen académique complet en conditions réelles pour certifier vos aptitudes d'expert Kimi.ai et décrocher votre certification premium." }
];

// HANDMADE LESSONS FOR COURSE 9 (LEONARDO MASTERY)
const baseLeonardoLessons: Lesson[] = [
  {
    id: "le_l1",
    title: "Introduction à Leonardo.ai & la Génération d'Images de Nouvelle Génération",
    description: "Découvrez l'un des labs créatifs les plus avancés au monde pour générer des visuels photoréalistes d'exception avec les modèles Phoenix et Lightning.",
    durationMin: 12,
    steps: [
      "Leonardo.ai est une plateforme de pointe dédiée aux créateurs, artistes et designers, propulsée par des algorithmes propriétaires haute fidélité.",
      "Le modèle phare Leonardo Phoenix offre une adhérence de prompt (Prompt Adherence) phénoménale et un rendu de texte intégré d'une netteté absolue.",
      "La suite intègre de puissants outils de contrôle comme ControlNet ou Image-to-Image pour guider la structure géométrique de vos créations.",
      "L'interface simplifie la génération d'images, de matières 3D et d'animations vidéo haute définition en quelques secondes."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Formulez un prompt photo-réaliste pour Leonardo Phoenix décrivant un portrait de studio de haute couture avec un texte précis imprimé sur un vêtement.",
      systemTemplate: "Photorealistic styling and text integration prompt paradigm.",
      placeholderText: "Rédigez votre invite photographique intégrant du texte...",
      exampleSolution: "Studio portrait of a cybernetic programmer wearing a dark leather jacket with the words 'CODE RUNS' written in crisp neon-green typography, sharp focus, 8k resolution, cinematic lighting."
    }
  },
  {
    id: "le_l2",
    title: "Alchemy & Real-Time Canvas : Les Paramètres de Précision",
    description: "Dominez le moteur d'interprétation Alchemy, la génération Real-Time Canvas et l'ajustement du Prompt Guidance.",
    durationMin: 15,
    steps: [
      "Alchemy est la technologie d'amélioration de contraste et de réalisme de Leonardo, agissant comme un processeur photo virtuel de premier plan.",
      "Le Real-Time Canvas vous permet de dessiner des croquis simplistes et de voir l'IA les transformer instantanément en œuvres d'art peaufinées.",
      "Le Prompt Guidance (l'équivalent de la CFG Scale) gère le degré de créativité ou de fidélité par rapport à votre texte d'entrée.",
      "Utiliser un prompt négatif structuré est crucial pour débusquer et interdire l'apparition de défauts anatomiques ou d'effets flous indésirables."
    ],
    activityType: "quiz",
    quiz: {
      id: "le_q2",
      question: "Quel outil de Leonardo.ai permet de transformer instantanément vos esquisses et croquis rudimentaires en œuvres d'art éblouissantes au fur et à mesure que vous dessinez ?",
      options: [
        { text: "Le moteur Legacy Claude Render.", isCorrect: false },
        { text: "Le Real-Time Canvas, qui propose une conversion esquisse-image interactive en direct.", isCorrect: true },
        { text: "La console de code binaire Node.js.", isCorrect: false },
        { text: "Le module d'analyse statistique Excel.", isCorrect: false }
      ],
      explanation: "Bravo ! Le Real-Time Canvas de Leonardo redéfinit la créativité interactive en adaptant l'interprétation artistique en temps réel selon vos traits de pinceau."
    }
  },
  {
    id: "le_l3",
    title: "Motion, Éléments & Modèles Personnalisés Fine-Tunés",
    description: "Apprenez à animer vos créations d'images avec Leonardo Motion et à appliquer des styles de direction artistique uniques et contrôlés.",
    durationMin: 15,
    steps: [
      "Leonardo Motion insuffle la vie à vos images statiques en générant de subtils mouvements de caméra et des effets atmosphériques fluides.",
      "Les 'Elements' sont des micro-modèles (LoRAs) thématiques (comme le style Cyberpunk, Aquarelle, ou Manga) que vous pouvez combiner et doser.",
      "Vous pouvez également entraîner votre propre modèle de personnage ou de style en téléversant un dossier de 10 à 20 images de référence.",
      "L'intégration professionnelle de vos propres modèles garantit une identité de marque constante sur toute votre charte graphique."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Définissez un prompt de décors de fantasy en combinant deux thèmes contrastés de Leonardo Elements (par exemple, futuriste et style papier sculpté).",
      systemTemplate: "Multi-style Element layering prompt model.",
      placeholderText: "Combinez vos styles artistiques et thématiques de décors...",
      exampleSolution: "A majestic futuristic citadel carved out of intricate colorful paper sculpture, warm backlighting, origami aesthetic, detailed holographic portals."
    }
  }
];

const leonardoExtraLessonsData = [
  { title: "Configuration avancée de Leonardo Phoenix sur l'API", desc: "Intégrez le modèle de toute nouvelle génération directement dans vos scripts et vos applications web." },
  { title: "Maîtriser ControlNet pour guider l'anatomie et les poses", desc: "Utilisez des pose-maps et d'autres lignes de contour pour imposer des postures physiques parfaites." },
  { title: "Génération de textures 3D lisses et raccordables (Tiles)", desc: "Créez des motifs transparents d'une répétition parfaite pour l'industrie du jeu vidéo ou du web design." },
  { title: "Upscaling d'élite de HD à 8K via Universal Upscaler", desc: "Agrandissez vos visuels tout en régénérant des détails microscopiques d'une finesse incomparable." },
  { title: "Conception de planches de tendances de mode et de costumes", desc: "Associez des matières, des coupes et des palettes de couleurs harmonieuses pour vos collections." },
  { title: "Utiliser l'éditeur Canvas 2.0 pour l'Outpainting infini", desc: "Étendez les bordures de vos visuels préférés et réinventez le décor extérieur à l'infini." },
  { title: "Inpainting ciblé pour modifier des détails microscopiques", desc: "Sélectionnez une zone précise de votre création et remplacez des accessoires ou des expressions d'un trait." },
  { title: "Combinaison astucieuse de styles et d'Elements en surcouche", desc: "Dosez précisément l'impact de 3 styles graphiques différents et obtenez un mélange artistique unique." },
  { title: "Entraîner son premier modèle personnalisé d'avatar", desc: "Sélectionnez vos meilleures photos de portrait et apprenez à générer votre visage dans n'importe quel décor." },
  { title: "Création d'illustrations concept-art pour le cinéma de genre", desc: "Structurez vos décors d'arrière-plan, vos éclairages expressionnistes et vos ambiances dramatiques." },
  { title: "Production de logos vectoriels découpés et de branding", desc: "Utilisez des directives de contrastes plats et de designs épurés pour concevoir des logos percutants." },
  { title: "Optimisation de l'usage des crédits de génération quotidiens", desc: "Apprenez à planifier vos dimensions, vos ratios et les modèles de batching pour réduire vos coûts." },
  { title: "Créer de courtes capsules vidéo animées pour les réseaux", desc: "Exploitez les options de Motion pour générer des vidéos virales à fort engagement sur TikTok et Instagram." },
  { title: "Production d'assets graphiques pour des jeux vidéo 2D", desc: "Générez des packs d'icônes d'objets ou d'armes polies à l'identité visuelle rigoureusement cohérente." },
  { title: "L'art du prompt négatif professionnel sans redondance", desc: "Éliminez méthodiquement les aberrations d'éclairage ou les textures plastiques de vos rendus." },
  { title: "Automatiser son flux créatif e-commerce avec Leonardo", desc: "Prenez des photos brutes de produits et intégrez-les élégamment dans des décors de luxe en un clin d'œil." },
  { title: "L'évaluation finale de Certification d'Expert Leonardo.ai", desc: "Validation finale en conditions réelles de vos aptitudes artistiques et techniques pour décrocher votre certificat de créateur d'élite." }
];

// HANDMADE LESSONS FOR COURSE 10 (AI SOCIAL SELLING)
const baseSocialSellingLessons: Lesson[] = [
  {
    id: "ss_l1",
    title: "Introduction à l'IA Social Selling & Vente en Automatique",
    description: "Apprenez les bases de la vente automatique sur les réseaux sociaux grâce à la puissance des agents conversationnels et des modèles d'écriture persuasifs.",
    durationMin: 12,
    steps: [
      "Le Social Selling par IA consiste à automatiser l'acquisition et la conversion de prospects sur LinkedIn, Instagram et X sans interaction humaine permanente.",
      "Les outils d'IA permettent d'analyser le profil des acheteurs potentiels et de rédiger des messages d'introduction ultra-personnalisés en temps réel.",
      "Nous construisons des systèmes pas-à-pas appelés entonnoirs de vente autonomes (Self-Running Funnels) qui éduquent et vendent 24h/24.",
      "Cette introduction pose les bases pour orchestrer vos outils d'IA et transformer votre visibilité en flux de revenus prévisibles."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Rédigez un prompt pour analyser les publications récentes d'un prospect LinkedIn et lui proposer une approche de vente sur-mesure hyper-personnalisée.",
      systemTemplate: "Hyper-personalized LinkedIn outbound approach prompt template.",
      placeholderText: "Formulez votre invite d'approche client sur-mesure...",
      exampleSolution: "Agis comme un copywriter B2B expert. Analyse ce résumé de profil de VP Sales et rédige un message d'accroche spontané, court, sans jargon de vente directe, qui rebondit avec pertinence sur son post."
    }
  },
  {
    id: "ss_l2",
    title: "La Création de Contenu de Vente en Masse avec l'IA",
    description: "Découvrez comment concevoir un calendrier éditorial d'un an avec ChatGPT et Claude, puis générer des scripts infinis pour Reels et TikTok.",
    durationMin: 15,
    steps: [
      "La clé d'un contenu viral sur les réseaux sociaux est la régularité couplée à un ciblage obsessionnel des besoins profonds de votre audience.",
      "Grâce aux invites structurées multi-agents, vous pouvez forcer l'IA à adopter la ligne éditoriale exacte de votre marque et créer des accroches irrésistibles.",
      "Nous enseignons la méthode de la 'Cascade de contenu' : un seul article de blog ou rapport d'IA est dérivé en 20 micro-contenus pour vos réseaux.",
      "Appliquez ces techniques pour alimenter automatiquement vos robots de publication avec des textes d'une qualité professionnelle indéniable."
    ],
    activityType: "quiz",
    quiz: {
      id: "ss_q2",
      question: "Quelle méthode permet d'alimenter vos réseaux sociaux en continu à partir d'un seul contenu de référence rédigé avec l'IA ?",
      options: [
        { text: "La technique de la cascade (ou repurposing) assistée par IA.", isCorrect: true },
        { text: "Copier textuellement l'article de vos concurrents.", isCorrect: false },
        { text: "Générer des articles de code aléatoires sans rapport.", isCorrect: false },
        { text: "Faire appel à un robot qui spame les hashtags populaires.", isCorrect: false }
      ],
      explanation: "Parfait ! La cascade de contenu (repurposing) permet de fragmenter un contenu principal en dizaines de micro-publications parfaitement ciblées."
    }
  },
  {
    id: "ss_l3",
    title: "L'Automatisation Pas-à-Pas des DM et Tunnels Conversationnels",
    description: "Configurez ManyChat couplé à l'API de ChatGPT pour envoyer des ressources gratuites et convertir vos commentaires en ventes privées.",
    durationMin: 15,
    steps: [
      "L'automatisation des DM (Direct Messages) est le moyen le plus rapide d'augmenter le taux de conversion de vos posts de 300%.",
      "Lorsqu'un utilisateur commente un mot-clé précis, un webhook se déclenche pour envoyer une séquence IA d'évaluation de ses besoins.",
      "Nous relions ManyChat à OpenAI pour que les réponses ne soient pas de simples scripts robots froids, mais une discussion naturelle et persuasive adaptative.",
      "Ce pas-à-pas de connexion technique vous assure une liste d'acheteurs qualifiés prête à passer à la caisse sur Shopify ou Stripe."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Rédigez une consigne de rôle (System Prompt) pour un assistant ManyChat-ChatGPT chargé de qualifier en douceur un utilisateur intéressé par une formation.",
      systemTemplate: "ManyChat custom AI Qualification agent system prompt.",
      placeholderText: "Définissez les règles de conversation du chatbot conversationnel de vente...",
      exampleSolution: "Tu es un assistant de messagerie chaleureux pour Coursiv Academy. Ton but est de poser un maximum de deux questions constructives pour identifier les objectifs business de l'interlocuteur avant de lui recommander le lien d'inscription idéal."
    }
  }
];

const socialSellingExtraLessonsData = [
  { title: "Cartographier les avatars clients idéaux (ICP) grâce à l'analyse sémantique", desc: "Utilisez l'intelligence artificielle pour extraire les désirs profonds, peurs cachées et freins d'achat exacts de votre marché cible." },
  { title: "Rédiger des accroches irrésistibles (Hooks) calibrées pour les algorithmes", desc: "Créez des structures de premières phrases captivantes qui explosent les taux de de rétention sur TikTok, Instagram et LinkedIn." },
  { title: "Automatisation LinkedIn ultra-ciblée avec Phantombuster et Claude AI", desc: "Configurez des robots d'extraction de profils LinkedIn et utilisez Claude pour générer des relances relationnelles ultra-personnalisées." },
  { title: "Génération de scripts de vidéos courtes (Reels/TikTok) ultra-persuasives avec l'IA", desc: "Générez des scripts de 30 secondes structurés avec une accroche choc, un corps éducatif et un appel à l'action invisible." },
  { title: "Création de carrousels LinkedIn esthétiques et optimisés grâce au Prompting", desc: "Rédigez le texte et déterminez le plan par étape d'un carrousel viral à exporter en PDF en moins de 3 minutes." },
  { title: "Configurer un clone vocal IA d'excellence pour le service après-vente", desc: "Clonez votre voix ou une voix professionnelle pour répondre à vos prospects ou envoyer des messages personnalisés automatiques." },
  { title: "Filtres d'analyse d'audience croisés avec ChatGPT Advanced Data Analysis", desc: "Importez les statistiques d'export de vos réseaux pour que l'IA détecte l'heure, le format et l'angle les plus lucratifs." },
  { title: "Scraper et qualifier automatiquement les leads Instagram qualifiés par pertinence", desc: "Isolez les utilisateurs actifs qui interagissent avec vos concurrents et filtrez-les par intelligence artificielle." },
  { title: "L'art du 'Lead Magnet' magnétique rédigé de A à Z par l'IA", desc: "Créez en un temps record des e-books, listes de contrôle ou études de cas de qualité premium comme appâts à emails." },
  { title: "Mettre en œuvre des webhooks IA pour transférer vos leads chauds vers Notion ou Airtable", desc: "Connectez vos automatisations de messages à vos tableaux CRM sans taper une seule ligne de code grâce à Make et l'IA." },
  { title: "Programmer la re-sensibilisation automatique des paniers abandonnés sur WhatsApp", desc: "Relancez les prospects indécis par des messages WhatsApp personnalisés et interactifs rédigés finement par GPT." },
  { title: "Séquences de nurturing e-mail comportementales optimisées par GPT-4o", desc: "Générez une série d'e-mails automatisés qui répondent spécifiquement aux actions et clics de vos prospects." },
  { title: "Auditer automatiquement les profils concurrents pour identifier les niches de vente délaissées", desc: "Laissez l'IA analyser la stratégie éditoriale de vos concurrents et découvrez les angles d'attaque délaissés." },
  { title: "Générer des visuels publicitaires haute conversion avec Midjourney et Leonardo", desc: "Concevez des créas publicitaires professionnelles et d'une netteté absolue qui abaissent de moitié votre coût d'acquisition." },
  { title: "Faire de la prospection vidéo personnalisée à grande échelle avec HeyGen", desc: "Générez en masse des vidéos où l'IA prononce automatiquement le prénom de votre prospect et affiche son site internet." },
  { title: "Mesurer et optimiser le taux de conversion (CRO) de vos automatisations conversationnelles", desc: "Analysez les taux de réponse de vos robots et ajustez les variables pour maximiser le chiffre d'affaires généré." },
  { title: "L'évaluation finale de Certification d'Expert en Vente Automatique par IA", desc: "Examen académique complet pour certifier vos compétences en automatisation de vente de pointe et décrocher votre parchemin officiel d'expert." }
];

// HANDMADE LESSONS FOR COURSE 11 (VIRAL VIDEO & AUDIO PRODUCTION)
const baseViralVideoAudioLessons: Lesson[] = [
  {
    id: "vv_l1",
    title: "Introduction à la Création Vidéo & Audio avec l'IA",
    description: "Découvrez l'état de l'art des outils IA pour concevoir des vidéos virales (Runway, Sora, Kling, Luma) et générer ou cloner de l'audio haute qualité (ElevenLabs, Suno, Udio).",
    durationMin: 12,
    steps: [
      "La vidéo générée par IA s'est démocratisée avec des modèles puissants capables de synthétiser des visuels cinématiques à partir d'un prompt texte.",
      "Les technologies d'IA vocale comme ElevenLabs permettent de cloner une voix de manière indiscernable en seulement 30 secondes.",
      "Des outils de musique comme Suno et Udio composent des bandes-son originales s'adaptant parfaitement à l'intensité de vos posts verticaux.",
      "La clé du succès viral réside dans l'harmonie parfaite entre un script IA engageant, une voix captivante et des visuels dynamiques."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Rédigez un prompt pour concevoir une scène cinématique de science-fiction de 5 secondes avec Runway Gen-3 décrivant des jeux d'ombres et des éclairages néon réalistes.",
      systemTemplate: "High-end cinematic sci-fi lighting video generation prompt structure.",
      placeholderText: "Rédigez votre invite cinématique pour l'IA vidéo...",
      exampleSolution: "Cinematic close-up of an astronaut walking through a cyberpunk Tokyo street under torrential rain, neon lights reflecting on the wet ground, slow-motion rendering, volumetric fog, photorealistic texture."
    }
  },
  {
    id: "vv_l2",
    title: "Maîtriser les Modèles Text-to-Video et l'Animation de Visuels",
    description: "Apprenez à animer vos images générées et à ordonner des mouvements de caméra fluides avec Runway Gen-3 et Luma Dream Machine.",
    durationMin: 15,
    steps: [
      "Runway et Luma transforment n'importe quel visuel plat en scène vivante grâce au contrôle précis du mouvement (Motion Brush).",
      "Les invites vidéo requièrent d'indiquer la vitesse, la direction d'éclairage et le style de prise de vue (ex: panoramique, gros plan).",
      "Faire correspondre le rythme de la vidéo à la voix-off permet d'augmenter le taux de rétention de plus de 50%.",
      "Les prompts négatifs vidéo évitent l'apparition de déformations d'objets ou de coupures abruptes non fluides."
    ],
    activityType: "quiz",
    quiz: {
      id: "vv_q2",
      question: "Quel outil ou paramètre d'image-en-vidéo permet d'indiquer précisément à l'IA quelle partie spécifique de votre image doit s'animer (par exemple, de l'eau qui coule ou des cheveux au vent) ?",
      options: [
        { text: "Le Motion Brush (pinceau de mouvement) disponible dans Runway.", isCorrect: true },
        { text: "L'option d'impression de données Excel.", isCorrect: false },
        { text: "Modifier manuellement le code source HTML.", isCorrect: false },
        { text: "Le bouton de suppression totale de la mémoire vive.", isCorrect: false }
      ],
      explanation: "Excellent ! Le Motion Brush vous permet de peindre les zones spécifiques que vous souhaitez mettre en mouvement, offrant un contrôle absolu sur le dynamisme de votre plan."
    }
  },
  {
    id: "vv_l3",
    title: "Clonage Vocal Professionnel & Création Audio d'Exception",
    description: "Apprenez à générer des voix-off convaincantes, à concevoir des bruitages et à composer des fonds musicaux rythmiques.",
    durationMin: 15,
    steps: [
      "ElevenLabs offre des options d'ajustement pour peaufiner la clarté linguistique, la stabilité et l'expression dramatique de la voix.",
      "Suno et Udio permettent de générer des chansons complètes avec des couplets personnalisés rédigés par ChatGPT ou Claude.",
      "Synchroniser l'audio et la vidéo demande de caler les points de coupure visuels sur la rythmique musicale (beats).",
      "L'usage éthique des clones vocaux exige de posséder les droits ou d'utiliser vos propres enregistrements en tant que sources de référence."
    ],
    activityType: "prompt_sandbox",
    promptObjective: {
      taskDescription: "Rédigez l'invite de structure musicale parfaite pour créer un fond sonore d'action épique d'inspiration synthwave dans Suno.",
      systemTemplate: "High-energy synthwave orchestration prompt paradigm.",
      placeholderText: "Combinez vos instruments et rythmes d'ambiance d'action...",
      exampleSolution: "High-speed dark synthwave, heavy retro bassline, rhythmic analog synthesizer chords, sweeping cinematic drums, futuristic cyberpunk backdrop theme, elevated tempo, instrumental."
    }
  }
];

const viralVideoAudioExtraLessonsData = [
  { title: "Génération de scripts de vidéos courtes (Reels/TikTok/Shorts) optimisés pour la rétention", desc: "Commandez à l'IA d'intercaler des hooks d'une puissance maximale toutes les 3 secondes pour fidéliser instantanément l'attention." },
  { title: "Synchroniser automatiquement le son et l'image à l'aide de CapCut assisté par l'IA", desc: "Profitez des algorithmes de détection automatique des beats de fond pour caler vos clips de manière rythmée." },
  { title: "Animer un avatar photoréaliste qui parle naturellement avec HeyGen ou D-ID", desc: "Associez vos voix-off synthétiques à des modèles d'acteurs virtuels d'une synchronisation labiale et corporelle parfaite." },
  { title: "Créer des effets sonores (bruitages) immersifs et réalistes à partir d'invites textuelles", desc: "Produisez des sons de pluie, de claquement de porte, ou d'explosion spatiale ultra-réalistes grâce aux modèles audio régénératifs." },
  { title: "Faire de la traduction et du doublage vidéo automatique multilingue avec synchronisation labiale", desc: "Traduisez n'importe quelle capsule d'une face caméra dans 15 langues différentes tout en adaptant fidèlement les mouvements de bouche." },
  { title: "Améliorer instantanément des fichiers audio de mauvaise qualité avec Adobe Podcast", desc: "Supprimez l'écho, le vent ou les bruits ambiants d'un enregistrement au smartphone pour obtenir un rendu de micro de studio." },
  { title: "Générer des voix-off émotionnelles avec réglages fins de chuchotement et d'empathie", desc: "Ajustez les curseurs comportementaux pour imprégner des pauses dramatiques, des rires ou des intonations confiantes à vos narrations." },
  { title: "Concevoir des bandes-son cinématiques et orchestrales uniques grâce aux invites Suno avancées", desc: "Utilisez les balises de structure de morceaux telles que [Verse], [Chorus] et [Outro] pour imposer un fil mélodique mémorable." },
  { title: "Automatiser le sous-titrage dynamique avec styles énergiques et emojis avec Submagic", desc: "Installez des sous-titres animés multicolores et ultra-visuels qui retiennent les yeux du spectateur de bout en bout." },
  { title: "Faire du Face-Swap vidéo propre et de l'intégration de marque de haute qualité", desc: "Substituez le visage d'un figurant de manière impeccable pour conserver une identité visuelle d'ambassadeur unique de marque." },
  { title: "Maîtriser l'Inpainting vidéo pour supprimer des objets ou modifier des arrière-plans", desc: "Masquez les éléments perturbateurs à l'arrière-plan de vos clips et laissez l'IA d'Adobe ou de Runway recréer la texture manquante." },
  { title: "Créer une série de vidéos éducatives automatisée complète (ChatGPT + Canva + HeyGen)", desc: "Construisez une véritable usine de production en masse capable de générer 30 vidéos d'éducation financière ou de développement d'un coup." },
  { title: "Auditer et répliquer les tendances sonores virales à l'aide d'analyses prédictives", desc: "Utilisez l'intelligence artificielle pour isoler les motifs de tempo et ton de voix à l'origine des millions de vues actuels." },
  { title: "Utiliser Midjourney et Runway pour concevoir des publicités cinématographiques d'élite", desc: "Planifiez un story-board à haute résolution dans Midjourney et animez chaque panneau pour un coût de production quasi-nul." },
  { title: "Éviter les flags de détection de contenu synthétique et optimiser le trafic organique", desc: "Apprenez les subtilités pour retoucher ou modifier la signature numérique des vidéos afin d'apparaître naturellement sur les algorithmes." },
  { title: "Automatiser la déclinaison d'une vidéo longue YouTube en 10 capsules virales avec OpusClip", desc: "Laissez l'algorithme analyser les moments forts d'un podcast long, ajouter des titres percutants et recadrer intelligemment les visages en 9:16." },
  { title: "L'évaluation finale de Certification d'Expert en Création Vidéo Virale & Audio IA", desc: "Examen académique complet en conditions réelles pour décrocher votre titre certifié en ingénierie de contenus viraux multicanaux." }
];

// AUTOMATIC COMPILER HELPER FOR PROGRAMMATIC EXTRA MODULES GENERATION
function generateCourseLessons(
  courseId: string,
  baseLessons: Lesson[],
  extraListData: { title: string; desc: string }[],
  targetTotal: number = 30
): Lesson[] {
  const result: Lesson[] = [...baseLessons];
  const startNum = baseLessons.length + 1;

  for (let i = 0; i < (targetTotal - baseLessons.length); i++) {
    const lessonNum = startNum + i;
    const data = extraListData[i] || { title: `Module Spécialisé N°${lessonNum}`, desc: "Explorez un aspect avancé de cette discipline." };
    const prefix = courseId === "prompt_eng" ? "pe" : courseId === "copywriting" ? "cp" : courseId === "chatgpt_mastery" ? "cg" : courseId === "claude_mastery" ? "cl" : courseId === "gemini_mastery" ? "gm" : courseId === "deepseek_mastery" ? "ds" : courseId === "kimi_mastery" ? "ki" : courseId === "leonardo_mastery" ? "le" : courseId === "ai_social_selling" ? "ss" : courseId === "viral_video_audio" ? "vv" : "fr";
    const id = `${prefix}_l${lessonNum}`;
    
    // Rotate activities evenly to make it look outstandingly rich
    const types: ("quiz" | "prompt_sandbox" | "copy_sandbox")[] = ["quiz", "prompt_sandbox", "copy_sandbox"];
    const activityType = types[lessonNum % types.length];

    const lesson: Lesson = {
      id,
      title: data.title,
      description: data.desc,
      durationMin: 10 + (lessonNum % 10),
      steps: [
        `Dans cette leçon sur "${data.title}", nous analysons les structures fondamentales pour asseoir vos compétences professionnelles.`,
        `Comprendre ce concept vous donne un avantage concurrentiel direct et vous permet de surperformer la moyenne des praticiens sur le marché du travail.`,
        `Mettez en pratique ce que vous apprenez aujourd'hui en rédigeant des consignes structurées ou en effectuant l'évaluation interactive.`,
        `Assurez-vous de valider cette unité pour débloquer votre progression globale vers l'obtention de votre diplôme certifié A4.`
      ],
      activityType
    };

    if (activityType === "quiz") {
      lesson.quiz = {
        id: `${prefix}_q${lessonNum}`,
        question: `Quel principe fondamental définit le mieux le succès de : "${data.title}" ?`,
        options: [
          { text: "L'application des techniques de structuration et des contextes étudiés.", isCorrect: true },
          { text: "Produire une matière brute sans formuler de contrainte d'arrêt précise.", isCorrect: false },
          { text: "Externaliser l'intégralité du travail à une IA sans vérification humaine.", isCorrect: false },
          { text: "Ignorer le retour client et conserver la même stratégie sans fin.", isCorrect: false }
        ],
        explanation: `Félicitations, bonne réponse ! Pour exceller dans "${data.title}", il est primordial d'appliquer des structures rigoureuses et des contextes de validation systématiques.`
      };
    } else if (activityType === "prompt_sandbox") {
      lesson.promptObjective = {
        taskDescription: `Rédigez un prompt parfait d'application pour mettre en pratique : ${data.title}.`,
        systemTemplate: `Simulate high-fidelity validation of: ${data.title}`,
        placeholderText: `Saisissez votre prompt pour : ${data.title}...`,
        exampleSolution: `Agis en tant qu'Expert de l'IA Académie Plus. Aide-moi à développer un modèle opérationnel centré sur la compétence de "${data.title}".`
      };
    } else {
      lesson.copyObjective = {
        scenario: `Mise en pratique commerciale : ${data.title}`,
        audience: "Professionnels, chefs de projets et clients potentiels à fort budget.",
        goal: "Attirer l'attention et convaincre de la valeur de votre prestation.",
        placeholderText: `Entrez votre texte de copywriting pour ${data.title}...`,
        exampleSolution: `Découvrez notre méthode exclusive en tant que leader certifié sur "${data.title}". Améliorez votre productivité immédiatement dès cette semaine.`
      };
    }

    result.push(lesson);
  }

  return result;
}

export const COURSES: Course[] = [
  {
    id: "chatgpt_mastery",
    title: "Cours Complet ChatGPT : Dompter l'IA en 20 Modules",
    category: "ai",
    description: "Devenez un utilisateur d'élite de ChatGPT : Custom Instructions, analyse avancée de données, Custom GPTs, intégration desktop et automatisation.",
    iconName: "Cpu",
    difficulty: "Advanced",
    estimatedHours: 15,
    totalLessons: 20,
    lessons: generateCourseLessons("chatgpt_mastery", baseChatgptLessons, chatgptExtraLessonsData, 20)
  },
  {
    id: "claude_mastery",
    title: "Cours Complet Anthropic Claude : Dominer Claude en 20 Modules",
    category: "ai",
    description: "Dominez Claude 3.5 Sonnet : Projets Claude, balises XML structurantes, Artifacts interactifs et analyse de documents de 200K tokens.",
    iconName: "Cpu",
    difficulty: "Advanced",
    estimatedHours: 15,
    totalLessons: 20,
    lessons: generateCourseLessons("claude_mastery", baseClaudeLessons, claudeExtraLessonsData, 20)
  },
  {
    id: "gemini_mastery",
    title: "Cours Complet Google Gemini : Dompter Gemini en 20 Modules",
    category: "ai",
    description: "Dominez l'IA multimodale de Google : fenêtre de contexte géante de 2M tokens, Context Caching d'élite, Google AI Studio, et extensions connectées.",
    iconName: "Cpu",
    difficulty: "Advanced",
    estimatedHours: 15,
    totalLessons: 20,
    lessons: generateCourseLessons("gemini_mastery", baseGeminiLessons, geminiExtraLessonsData, 20)
  },
  {
    id: "deepseek_mastery",
    title: "Cours Complet DeepSeek : Dompter DeepSeek en 20 Modules",
    category: "ai",
    description: "Dominez DeepSeek-R1 et V3 : modèles de raisonnement (Reasoning models), flux de pensée <think>, invites neutres d'élite, coût optimisé et exécution locale.",
    iconName: "Cpu",
    difficulty: "Advanced",
    estimatedHours: 15,
    totalLessons: 20,
    lessons: generateCourseLessons("deepseek_mastery", baseDeepseekLessons, deepseekExtraLessonsData, 20)
  },
  {
    id: "kimi_mastery",
    title: "Cours Complet Kimi.ai : Dompter Kimi en 20 Modules",
    category: "ai",
    description: "Dominez Kimi.ai : traitement de très longs documents, recherche internet ultra-rapide temps réel, assistants personnalisés Kimi+, et API Moonshot.",
    iconName: "Cpu",
    difficulty: "Advanced",
    estimatedHours: 15,
    totalLessons: 20,
    lessons: generateCourseLessons("kimi_mastery", baseKimiLessons, kimiExtraLessonsData, 20)
  },
  {
    id: "leonardo_mastery",
    title: "Cours Complet Leonardo.ai : Dompter Léonardo en 20 Modules",
    category: "ai",
    description: "Dominez Leonardo.ai : génération de visuels d'exception Phoenix/Lightning, Alchemy, Real-Time Canvas, Motion vidéo, Elements et entraînement de modèles personnels.",
    iconName: "Cpu",
    difficulty: "Advanced",
    estimatedHours: 15,
    totalLessons: 20,
    lessons: generateCourseLessons("leonardo_mastery", baseLeonardoLessons, leonardoExtraLessonsData, 20)
  },
  {
    id: "ai_social_selling",
    title: "Vente Automatique & IA Social Selling : 20 Modules",
    category: "ai",
    description: "Dominez la vente automatique sur les réseaux sociaux : création de contenu viral en masse par IA, automatisation de ManyChat & ChatGPT des DMs, et tunnels autonomes pas-à-pas.",
    iconName: "Cpu",
    difficulty: "Advanced",
    estimatedHours: 15,
    totalLessons: 20,
    lessons: generateCourseLessons("ai_social_selling", baseSocialSellingLessons, socialSellingExtraLessonsData, 20)
  },
  {
    id: "viral_video_audio",
    title: "Création Vidéo Virale & Audio IA : 20 Modules",
    category: "ai",
    description: "Maîtrisez la création de vidéos hautement virales et d'audios d'exception : de la génération text-to-video avec Runway à l'art du clonage vocal ElevenLabs.",
    iconName: "Video",
    difficulty: "Advanced",
    estimatedHours: 15,
    totalLessons: 20,
    lessons: generateCourseLessons("viral_video_audio", baseViralVideoAudioLessons, viralVideoAudioExtraLessonsData, 20)
  },
  {
    id: "prompt_eng",
    title: "Masterclass ChatGPT, Gemini & Generative AI",
    category: "ai",
    description: "Apprenez les secrets de communication pour dompter ChatGPT, Gemini, Claude et générer des textes, codes et analyses de niveau Senior.",
    iconName: "Cpu",
    difficulty: "Beginner",
    estimatedHours: 12,
    totalLessons: 30,
    lessons: generateCourseLessons("prompt_eng", basePromptLessons, promptExtraLessonsData)
  },
  {
    id: "copywriting",
    title: "Copywriting avec l'IA : Formules de Vente",
    category: "copywriting",
    description: "Apprenez à rédiger des textes qui captivent, émeuvent et vendent, en utilisant les meilleurs frameworks mondiaux boostés par l'IA.",
    iconName: "PenTool",
    difficulty: "Beginner",
    estimatedHours: 10,
    totalLessons: 30,
    lessons: generateCourseLessons("copywriting", baseCopyLessons, copywritingExtraLessonsData)
  },
  {
    id: "freelance_career",
    title: "Propulser sa Carrière Freelance & Side-Hustles",
    category: "freelance",
    description: "Apprenez à packager vos nouvelles compétences IA pour les vendre sur Fiverr, Upwork, ou en direct à des clients fortunés.",
    iconName: "Briefcase",
    difficulty: "Intermediate",
    estimatedHours: 14,
    totalLessons: 30,
    lessons: generateCourseLessons("freelance_career", baseFreelanceLessons, freelanceExtraLessonsData)
  }
];

export const ACHIEVEMENTS = [
  { id: "onboard", title: "Compas Activé", description: "A complété le questionnaire de carrière personnalisé", icon: "Compass", color: "from-blue-500 to-teal-400" },
  { id: "prompt_novice", title: "Initié des Prompts", description: "A complété la première leçon de Prompt Engineering", icon: "Terminal", color: "from-purple-500 to-indigo-500" },
  { id: "copy_champ", title: "Plume Persuasive", description: "A rédigé sa première copie avec le framework PAS", icon: "PenSingle", color: "from-orange-500 to-pink-500" },
  { id: "streak_3", title: "Discipline de Fer", description: "A validé sa présence quotidienne pendant 3 jours consécutifs", icon: "Flame", color: "from-red-500 to-orange-500" },
  { id: "all_courses", title: "Guerrier du Digital", description: "A exploré tous les cours de l'académie", icon: "Award", color: "from-green-500 to-emerald-400" }
];
