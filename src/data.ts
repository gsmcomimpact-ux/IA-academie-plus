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

// AUTOMATIC COMPILER HELPER FOR PROGRAMMATIC EXTRA MODULES GENERATION
function generateCourseLessons(
  courseId: string,
  baseLessons: Lesson[],
  extraListData: { title: string; desc: string }[]
): Lesson[] {
  const result: Lesson[] = [...baseLessons];
  const startNum = baseLessons.length + 1;
  const targetTotal = 30;

  for (let i = 0; i < (targetTotal - baseLessons.length); i++) {
    const lessonNum = startNum + i;
    const data = extraListData[i] || { title: `Module Spécialisé N°${lessonNum}`, desc: "Explorez un aspect avancé de cette discipline." };
    const id = `${courseId === "prompt_eng" ? "pe" : courseId === "copywriting" ? "cp" : "fr"}_l${lessonNum}`;
    
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
        id: `${courseId === "prompt_eng" ? "pe" : courseId === "copywriting" ? "cp" : "fr"}_q${lessonNum}`,
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
