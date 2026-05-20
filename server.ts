import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI features will fallback to helpful simulation.");
}

// 1. API: Custom AI Tutor & Career Copilot
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages, systemInstruction, modelName } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages history array." });
    }

    if (!ai) {
      // Create a sophisticated, supportive offline conversational tutor for the student
      const lastMessage = messages[messages.length - 1]?.content || "";
      const query = lastMessage.toLowerCase();
      let responseText = "";

      if (query.includes("prompt") || query.includes("ingenierie") || query.includes("rôle") || query.includes("tâche") || query.includes("sandbox")) {
        responseText = `Excellent point ! En Prompt Engineering (Ingénierie de Prompt), rappelez-vous toujours de notre structure d'or :\n\n` +
          `1. **Rôle (Persona)** : Ex: "Agir en tant que spécialiste en marketing de tunnel de vente."\n` +
          `2. **Contexte** : Donnez-lui le contexte précis (qui est la cible et le but ?).\n` +
          `3. **Taille & Directives** : Donnez une définition claire de l'action attendue.\n` +
          `4. **Contraintes et Formats** : Ex: "Reste concis, sans superlatifs, formaté en tableau."\n\n` +
          `Cherchez-vous à perfectionner un prompt particulier actuellement ? Saisissez-le ici, je peux vous aider à le structurer !`;
      } else if (query.includes("aida") || query.includes("pas") || query.includes("copywriting") || query.includes("redac") || query.includes("text") || query.includes("persuas")) {
        responseText = `Ah, l'écriture persuasive ! Le framework **PAS (Problème, Agitation, Solution)** est l'une de nos méthodes les plus puissantes :\n\n` +
          `- **Problème** : Nommez le point sensible exact vécu par le lecteur.\n` +
          `- **Agitation** : Remuez ce point pour éveiller l'importance du problème.\n` +
          `- **Solution** : Présentez votre service ou produit comme le soulagement ultime.\n\n` +
          `Associez ce modèle à la formule de titre "Curiosité + Bénéfice" pour propulser vos taux de conversion. Quel exercice de rédaction réalisez-vous en ce moment ?`;
      } else if (query.includes("freelance") || query.includes("gagner") || query.includes("argent") || query.includes("client") || query.includes("offre") || query.includes("fiverr") || query.includes("tarif")) {
        responseText = `Pour exceller en tant que Freelance IA d'élite, ne vendez jamais de simples "corrections d'articles". Vendez des **solutions clés en main à forte valeur ajoutée** (p. ex., un pack mensuel auto-généré de 12 posts LinkedIn et visuels).\n\n` +
          `Sur Upwork ou par e-mail direct, présentez toujours un échantillon de valeur dès le premier message pour capter l'attention de votre prospect.\n\n` +
          `Voulez-vous que nous conceptualisions ensemble vos forfaits ou votre message de prospection d'expert ?`;
      } else if (query.includes("certificat") || query.includes("diplome") || query.includes("pdf") || query.includes("telecharger") || query.includes("imprimer") || query.includes("valider")) {
        responseText = `Votre Certificat Nominatif d'expert IA Académie Plus est délivré automatiquement dès que vous avez finalisé avec succès l'ensemble des modules d'un cursus.\n\n` +
          `Une fois terminé, vous pourrez personnaliser votre nom, choisir votre style visuel (Sombre/Classique), l'imprimer au format A4 Paysage haute qualité, ou le partager sur LinkedIn.\n\n` +
          `Foncez sur le 'Tableau de Bord' pour compléter vos exercices pratiques restants !`;
      } else if (query.includes("bonjour") || query.includes("salut") || query.includes("hello") || query.includes("hey") || query.includes("aide")) {
        responseText = `Bonjour cher étudiant ! 👋 Bienvenue à l'IA Académie Plus. Je suis votre tuteur d'*Intelligence Artificielle* et mentor de carrière.\n\n` +
          `Je suis à vos côtés pour valider vos prompts d'élite, optimiser vos structures d'écriture persuasive, ou définir vos packs de services freelance.\n\n` +
          `Quel sujet ou TP d'aujourd'hui souhaitez-vous aborder ensemble ?`;
      } else {
        responseText = `C'est une excellente question pour votre parcours d'apprentissage ! Dans l'Académie, nous insistons sur l'importance de décomposer chaque objectif complexe en sous-tâches simples.\n\n` +
          `Passez sur la sandbox ou l'un de nos modules interactifs de TP pour tester vos directives en pratique accompagnées de feedback immédiat.\n\n` +
          `*(Conseil : N'hésitez pas à ajouter votre GEMINI_API_KEY dans l'onglet Secrets des paramètres pour connecter mon système de discussion en direct avec le modèle de production de Google Gemini ! En attendant, je continue à vous coacher avec plaisir en direct de notre base de données locale !)*`;
      }

      return res.json({ text: responseText });
    }

    // Convert client message format back to standard Gemini content parts or simplified chat
    // We can use direct generateContent with the systemInstruction
    const model = modelName || "gemini-3.5-flash";
    
    // Format contents
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction || "You are an expert e-learning mentor from IA Académie Plus, specializing in AI tools, copywriting, remote work, and freelancing. Answer concisely and supportively.",
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in AI Tutor Chat:", error);
    res.status(500).json({ error: error.message || "An error occurred while generating response." });
  }
});

// 2. API: Prompt Sandbox and Evaluator
// This runs the user's prompt to show the result, and ALSO evaluates it like an instructional coach.
app.post("/api/ai/evaluate-prompt", async (req, res) => {
  try {
    const { promptText, taskRules } = req.body;
    
    if (!promptText || typeof promptText !== "string") {
      return res.status(400).json({ error: "Invalid prompt text provided." });
    }

    if (!ai) {
      // Offline fallback evaluation
      return res.json({
        output: "This is a simulated response to your prompt in offline mode. Configure a Gemini Key to try real prompts!",
        evaluation: {
          score: 80,
          clarity: "Good clarity, but could be more specific.",
          specificity: "Try providing detailed context.",
          suggestions: [
            "Add role guidance (e.g. 'Act as a professional copywriter')",
            "Specify the target audience",
            "Define the tone of voice explicitly"
          ]
        }
      });
    }

    // 1. Generate the actual output of the student's prompt
    const runResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are answering a prompt submitted by a student learning prompt engineering. Execute the prompt below exactly:
---
${promptText}
---`,
      config: {
        temperature: 0.7,
      }
    });

    const outputText = runResponse.text || "No output generated.";

    // 2. Evaluate the prompt structured JSON response
    const evaluationInstruction = `You are a professional Prompt Engineering Coach.
Your task is to analyze the prompt written by a student, and evaluate its quality.
The student proposed the following prompt:
"${promptText}"
${taskRules ? `The prompt was meant to address this objective: "${taskRules}"` : ""}

Evaluate the prompt and return a structured JSON evaluation.
Include:
- an overall rating score from 0 to 100
- a short summary of its clarity
- a short summary of its specificity
- a list of 2-3 highly actionable tips or instructions to improve this prompt to make it professional.`;

    const evalResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: evaluationInstruction,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["score", "clarity", "specificity", "suggestions"],
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Overall rating of the prompt from 0 to 100."
            },
            clarity: {
              type: Type.STRING,
              description: "Short feedback on readability, grammar, and intent clarity."
            },
            specificity: {
              type: Type.STRING,
              description: "Feedback on whether the prompt provides sufficient constraints, data, tone, and examples."
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 dynamic advice items on how to optimize this prompt further."
            }
          }
        }
      }
    });

    let evaluation = {};
    try {
      evaluation = JSON.parse(evalResponse.text || "{}");
    } catch (e) {
      evaluation = {
        score: 75,
        clarity: "Unable to parse structured review.",
        specificity: "Parsed as default text configuration.",
        suggestions: ["Excellent trial. Try adjusting constraints and testing again!"]
      };
    }

    res.json({
      output: outputText,
      evaluation: evaluation
    });

  } catch (error: any) {
    console.error("Error in Prompt Evaluation:", error);
    res.status(500).json({ error: error.message || "An error occurred while evaluating your prompt." });
  }
});

// 3. API: Copywriting Practice Evaluator
app.post("/api/ai/evaluate-copy", async (req, res) => {
  try {
    const { copyText, scenarioDescription, targetAudience } = req.body;
    
    if (!copyText || typeof copyText !== "string") {
      return res.status(400).json({ error: "Please write some copy to submit." });
    }

    if (!ai) {
      return res.json({
        evaluation: {
          score: 85,
          engagement: "Very compelling hook, but could call to action more explicitly.",
          readability: "Excellent, short sentences are easy to scan.",
          revisedVersion: `This is a sample improved version! Try adding an API key in Secrets to get direct, customized copywriting revisions from Gemini.`,
          feedback: ["Nice focus on the immediate reader benefit.", "Add a clear Call-To-Action at the end."]
        }
      });
    }

    const copyCoachPrompt = `You are an expert copywriting consultant from IA Académie Plus.
Analyze this copywriting draft written by a student:
"${copyText}"

The context is:
- Scenario: ${scenarioDescription || "General digital copywriting"}
- Target Audience: ${targetAudience || "General online users"}

Provide your expert feedback and score in JSON format.
You must return:
- score: an overall rating score from 0 to 100
- engagement: feedback on hook and emotional resonance
- readability: feedback on structure, brevity, and scan-friendliness
- revisedVersion: rewritten, polished professional-grade version of their copy that implements all best practices
- feedback: 2 specific bullet points on what they did well or could improve`;

    const coachResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: copyCoachPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["score", "engagement", "readability", "revisedVersion", "feedback"],
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Copy score out of 100."
            },
            engagement: {
              type: Type.STRING,
              description: "Emotional resonance & hook effectiveness score assessment."
            },
            readability: {
              type: Type.STRING,
              description: "Readability, font visual formatting advice, structural layout advice."
            },
            revisedVersion: {
              type: Type.STRING,
              description: "An improved, highly engaging alternative of the copy text."
            },
            feedback: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 critical improvement pointers."
            }
          }
        }
      }
    });

    let coachEvaluation = {};
    try {
      coachEvaluation = JSON.parse(coachResponse.text || "{}");
    } catch (e) {
      coachEvaluation = {
        score: 80,
        engagement: "Great focus, clear intent.",
        readability: "Good scan-friendliness.",
        revisedVersion: copyText,
        feedback: ["Keep experimenting with different hooks!"]
      };
    }

    res.json({ evaluation: coachEvaluation });
  } catch (error: any) {
    console.error("Error in Copy Coaching:", error);
    res.status(500).json({ error: error.message || "An error occurred during copy coaching evaluation." });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function initializeApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[IA Académie Plus Backend] Express server running on port ${PORT}`);
    console.log(`[IA Académie Plus Backend] Mode: ${process.env.NODE_ENV || "development"}`);
  });
}

initializeApp().catch((err) => {
  console.error("Failed to start server:", err);
});
