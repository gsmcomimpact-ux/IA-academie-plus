import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "../types";
import { Send, Sparkles, MessageSquare, Cpu, X, Compass, ArrowRight, User } from "lucide-react";

interface AICopilotProps {
  lang: "fr" | "en";
  activeCourseTitle?: string;
  activeLessonTitle?: string;
  userGoal?: string;
  onClose?: () => void;
}

export default function AICopilot({ lang, activeCourseTitle, activeLessonTitle, userGoal, onClose }: AICopilotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: activeLessonTitle 
          ? (lang === "fr" 
              ? `Bonjour ! Je suis votre tuteur IA personnel d'apprentissage de l'IA Académie Plus. J'étudie en ce moment le cours **"${activeCourseTitle}"** avec vous. Des questions sur le chapitre **"${activeLessonTitle}"** ?` 
              : `Hello! I am your personal AI tutor from AI Academy Plus. I am currently reviewing the course **"${activeCourseTitle}"** with you. Any questions about the lesson **"${activeLessonTitle}"**?`)
          : (lang === "fr"
              ? "Bonjour ! Je suis votre tuteur IA personnel d'apprentissage de l'IA Académie Plus. Je suis là pour vous aider à maîtriser le Prompting et le Copywriting pour vous lancer en freelance !"
              : "Hello! I am your personal AI tutor from AI Academy Plus. I am here to help you master Prompting and Copywriting to successfully launch your freelance career!"),
        timestamp: new Date().toISOString()
      }
    ]);
  }, [lang, activeCourseTitle, activeLessonTitle]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const getSystemInstruction = () => {
    return `You are "IA Académie Plus Copilot", an expert AI-learning mentor specialized in digital skills, Copywriting, Prompt Engineering, and freelancing/remote work.
The user is studying the course: "${activeCourseTitle || 'General digital skill upgrade'}"
Specifically on this chapter: "${activeLessonTitle || 'General introduction'}"
The student's ultimate professional goal listed is: "${userGoal || 'Générer des revenus en ligne'}"

Guidelines for your replies:
1. Always replies in ${lang === "fr" ? "French (Français)" : "English"}.
2. Keep your answers instructional, brief, practical, with clear bullet points.
3. Be supportive, friendly, encouraging, and ask clarifying questions on their exercise outputs if applicable.
4. Try to guide them step-by-step rather than writing entire works for them.
5. If they mention copywriting, prompt formatting, or landing remote clients, speak with expert modern authority.`;
  };

  const handleSend = async (e?: React.FormEvent, presetText?: string) => {
    if (e) e.preventDefault();
    const textToSend = presetText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          systemInstruction: getSystemInstruction()
        })
      });

      if (!response.ok) {
        throw new Error(lang === "fr" ? "Erreur de communication avec le serveur." : "Error communicating with server.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || (lang === "fr" ? "Pardon, je n'ai pas pu compiler une réponse correcte." : "Sorry, I couldn't compute a response."),
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: lang === "fr" 
            ? "Oups ! Une erreur réseau est survenue. Vérifiez que votre serveur est bien actif ou inserez votre clé API Gemini dans le panneau Settings." 
            : "Oops! A network error occurred. Please make sure the server is healthy or register your Gemini API Key in the Settings panel.",
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const presets = lang === "fr" ? [
    { text: "Donne-moi une idée de side-hustle IA rapide", label: "Idées de side-hustle" },
    { text: "Comment structurer un prompt de rédaction d'article ?", label: "Structure de prompt" },
    { text: "Explique-moi la technique PAS", label: "Technique PAS" }
  ] : [
    { text: "Give me a quick AI side-hustle idea", label: "Side-hustle Ideas" },
    { text: "How to structure an article writing prompt?", label: "Prompt Structure" },
    { text: "Explain the PAS copywriting style to me", label: "PAS Framework" }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden shadow-2xl relative w-full">
      {/* Copilot Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center relative">
            <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900" />
          </div>
          <div>
            <div className="font-sans font-bold text-sm text-slate-100 flex items-center gap-1.5 font-sans">
              {lang === "fr" ? "Tuteur Personnel IA" : "Personal AI Tutor"}
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono px-1 rounded">{lang === "fr" ? "Actif" : "Active"}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-sans truncate max-w-[180px]">
              {activeLessonTitle ? `${lang === "fr" ? "Étudie :" : "Learning:"} ${activeLessonTitle}` : (lang === "fr" ? "Conseiller & Coach de Carrière" : "Career Advisor & Mentor")}
            </div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 max-w-[90%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "user" ? "bg-slate-850 border border-slate-750" : "bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 border border-emerald-500/20"
            }`}>
              {msg.role === "user" ? (
                <User className="w-4 h-4 text-slate-300" />
              ) : (
                <Cpu className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            
            <div className={`p-3 rounded-xl whitespace-pre-wrap leading-relaxed ${
              msg.role === "user" 
                ? "bg-slate-800 text-slate-200 rounded-tr-none" 
                : "bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 mr-auto max-w-[90%]">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4 text-emerald-400 animate-spin" />
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl rounded-tl-none text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              <span className="font-mono text-xs ml-1">{lang === "fr" ? "Analyse du chapitre en cours..." : "Analyzing lesson context..."}</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestions Tray */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/50 space-y-1.5">
          <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">{lang === "fr" ? "Suggestions de départ :" : "Starter suggestions:"}</div>
          <div className="flex flex-wrap gap-1.5 pb-1">
            {presets.map((preset, pidx) => (
              <button
                key={pidx}
                onClick={() => handleSend(undefined, preset.text)}
                className="text-xs bg-slate-900 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900 text-slate-300 p-2 rounded-lg flex items-center gap-1.5 transition-all text-left cursor-pointer hover:shadow lg:inline-flex"
              >
                <span>{preset.label}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input Box */}
      <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={lang === "fr" ? "Posez une question sur le cours..." : "Ask a question about the course..."}
          className="flex-1 bg-slate-900 text-slate-200 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-slate-500"
        />
        <button
          type="submit"
          id="send-ai-message"
          className="bg-emerald-500 text-slate-950 p-2.5 rounded-lg font-bold hover:bg-emerald-400 transition-all flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
          disabled={loading}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
