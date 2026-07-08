/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";
import CoursePlayer from "./components/CoursePlayer";
import AICopilot from "./components/AICopilot";
import CertificateModal from "./components/CertificateModal";
import PromptsReportModal from "./components/PromptsReportModal";
import SubscriptionBarrier from "./components/SubscriptionBarrier";
import Homepage from "./components/Homepage";
import { UserProgress, Course } from "./types";
import { COURSES } from "./data";
import { UI_TRANSLATIONS, getLocalizedCourses } from "./utils/translations";
import { Sparkles, MessageSquare, Award, Flame, LogOut, CheckCircle2, ChevronRight, X, Heart, Settings, RefreshCw, Volume2, VolumeX, LogIn, User, Mail, Lock, ShieldCheck, GraduationCap } from "lucide-react";

const LOCAL_STORAGE_KEY = "coursiv_academy_progress";

const INITIAL_PROGRESS: UserProgress = {
  selectedPathCourseIds: ["chatgpt_mastery", "claude_mastery", "gemini_mastery", "deepseek_mastery", "kimi_mastery", "leonardo_mastery", "ai_social_selling", "viral_video_audio", "grok_mastery", "copilot_mastery", "manus_mastery", "perplexity_mastery", "admin_redaction", "veo_mastery", "lovable_mastery", "prompt_eng", "copywriting", "freelance_career"],
  completedLessonIds: {},
  completedCourseIds: {},
  streakCount: 1,
  lastCheckInDate: null,
  xp: 0,
  onboarded: false,
  onboardingAnswers: {},
  achievements: []
};

// Play simple retro audio synthesizers for gamification triggers
const playSound = (type: "claim" | "success" | "correct" | "click") => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "success") {
      // Arpeggio
      osc.type = "sine";
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc.start();
      osc.frequency.setValueAtTime(392.00, ctx.currentTime + 0.15); // G4
      osc.frequency.setValueAtTime(523.25, ctx.currentTime + 0.3); // C5
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.65);
      osc.stop(ctx.currentTime + 0.7);
    } else if (type === "correct") {
      osc.type = "triangle";
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc.start();
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.12); // A5
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.stop(ctx.currentTime + 0.45);
    } else if (type === "claim") {
      osc.type = "sine";
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
      osc.start();
      osc.frequency.setValueAtTime(523.25, ctx.currentTime + 0.1); // C5
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.stop(ctx.currentTime + 0.55);
    } else {
      osc.type = "sine";
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.18);
    }
  } catch (e) {
    // Audio Context not started or supported
  }
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [lang, setLang] = useState<"fr" | "en">(() => {
    return (localStorage.getItem("coursiv_academy_language") as "fr" | "en") || "fr";
  });
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [badgeBanner, setBadgeBanner] = useState<{ title: string; desc: string } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedCertCourse, setSelectedCertCourse] = useState<Course | null>(null);
  const [selectedPromptsCourse, setSelectedPromptsCourse] = useState<Course | null>(null);
  const [showHomepage, setShowHomepage] = useState(true);

  const handleToggleLang = () => {
    const nextLang = lang === "fr" ? "en" : "fr";
    setLang(nextLang);
    localStorage.setItem("coursiv_academy_language", nextLang);
    if (soundEnabled) playSound("click");
  };

  const t = (key: string) => {
    return UI_TRANSLATIONS[lang][key] || UI_TRANSLATIONS["fr"][key] || key;
  };

  const localizedCourses = getLocalizedCourses(lang, COURSES);

  // Login Modal form states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Load progress from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          let loadedPaths = parsed.selectedPathCourseIds || ["chatgpt_mastery", "claude_mastery", "gemini_mastery", "deepseek_mastery", "kimi_mastery", "leonardo_mastery", "ai_social_selling", "viral_video_audio", "grok_mastery", "copilot_mastery", "manus_mastery", "perplexity_mastery", "admin_redaction", "veo_mastery", "lovable_mastery", "prompt_eng", "copywriting", "freelance_career"];
          const requiredCourseIds = ["chatgpt_mastery", "claude_mastery", "gemini_mastery", "deepseek_mastery", "kimi_mastery", "leonardo_mastery", "ai_social_selling", "viral_video_audio", "grok_mastery", "copilot_mastery", "manus_mastery", "perplexity_mastery", "admin_redaction", "veo_mastery", "lovable_mastery", "prompt_eng", "copywriting", "freelance_career"];
          requiredCourseIds.forEach(id => {
            if (!loadedPaths.includes(id)) {
               // Prepend high-priority new AI courses or append them
              if (id === "chatgpt_mastery" || id === "claude_mastery" || id === "gemini_mastery" || id === "deepseek_mastery" || id === "kimi_mastery" || id === "leonardo_mastery" || id === "ai_social_selling" || id === "viral_video_audio" || id === "grok_mastery" || id === "copilot_mastery" || id === "manus_mastery" || id === "perplexity_mastery" || id === "admin_redaction" || id === "veo_mastery" || id === "lovable_mastery") {
                loadedPaths.unshift(id);
              } else {
                loadedPaths.push(id);
              }
            }
          });
          // Unique entries filter
          loadedPaths = Array.from(new Set(loadedPaths));

          setProgress({
            ...INITIAL_PROGRESS,
            ...parsed,
            completedLessonIds: parsed.completedLessonIds || {},
            completedCourseIds: parsed.completedCourseIds || {},
            selectedPathCourseIds: loadedPaths,
            achievements: parsed.achievements || [],
            onboardingAnswers: parsed.onboardingAnswers || {}
          });
        }
      } catch (e) {
        console.error("Failed to parse saved user progression.", e);
      }
    }

    // Seed a standard demo account to allow testing of authentication and state transitions
    try {
      const savedAccountsStr = localStorage.getItem("coursiv_academy_accounts");
      const savedAccounts = savedAccountsStr ? JSON.parse(savedAccountsStr) : null;
      if (!savedAccounts || Object.keys(savedAccounts).length === 0) {
        const demoAccount: UserProgress = {
          selectedPathCourseIds: ["chatgpt_mastery", "claude_mastery", "gemini_mastery", "deepseek_mastery", "kimi_mastery", "leonardo_mastery", "ai_social_selling", "viral_video_audio", "grok_mastery", "copilot_mastery", "manus_mastery", "perplexity_mastery", "admin_redaction", "veo_mastery", "lovable_mastery", "prompt_eng", "copywriting", "freelance_career"],
          completedLessonIds: {
            "prompt_basics": true,
            "few_shot": true,
            "pas_framework": true
          },
          completedCourseIds: {},
          streakCount: 3,
          lastCheckInDate: new Date().toISOString().split("T")[0],
          xp: 280,
          onboarded: true,
          onboardingAnswers: {
            "skill": "prompt_engineering",
            "time": "15_min",
            "goal": "freelance"
          },
          achievements: ["onboard", "first_lesson"],
          email: "clara@academie.plus",
          password: "password123",
          fullName: "Clara Martin",
          firstName: "Clara",
          lastName: "Martin",
          hasPaid: true,
          registrationDate: new Date().toISOString()
        };
        const initialAccounts = {
          "clara@academie.plus": demoAccount
        };
        localStorage.setItem("coursiv_academy_accounts", JSON.stringify(initialAccounts));
      }
    } catch (e) {
      console.error("Failed to seed demo accounts.", e);
    }

    try {
      if (window.location.search.includes("verify=")) {
        setShowHomepage(true);
      }
    } catch (e) {}
  }, []);

  // Save progress trigger
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgress));
    
    // Safely also back up changes to the persistent local accounts database if registered
    if (newProgress.email && newProgress.hasPaid) {
      try {
        const savedAccountsStr = localStorage.getItem("coursiv_academy_accounts");
        const savedAccounts = savedAccountsStr ? JSON.parse(savedAccountsStr) : {};
        savedAccounts[newProgress.email.toLowerCase().trim()] = newProgress;
        localStorage.setItem("coursiv_academy_accounts", JSON.stringify(savedAccounts));
      } catch (e) {
        console.error("Failed to sync account to local accounts database.", e);
      }
    }
  };

  // Auto-heal / migrate missing courses from progress.selectedPathCourseIds
  useEffect(() => {
    if (progress && progress.onboarded) {
      const allCourseIds = COURSES.map(c => c.id);
      const currentPaths = progress.selectedPathCourseIds || [];
      const missingCourseIds = allCourseIds.filter(id => !currentPaths.includes(id));
      
      if (missingCourseIds.length > 0) {
        let updatedPaths = [...currentPaths];
        // Prepend high-priority AI courses or append them
        missingCourseIds.forEach(id => {
          if (id === "lovable_mastery" || id === "veo_mastery" || id === "admin_redaction" || id === "perplexity_mastery" || id === "manus_mastery" || id === "copilot_mastery" || id === "grok_mastery" || id === "viral_video_audio" || id === "ai_social_selling" || id === "kimi_mastery" || id === "leonardo_mastery" || id === "deepseek_mastery" || id === "gemini_mastery" || id === "claude_mastery" || id === "chatgpt_mastery") {
            updatedPaths.unshift(id);
          } else {
            updatedPaths.push(id);
          }
        });
        // Remove duplicates and keep order
        updatedPaths = Array.from(new Set(updatedPaths));
        
        saveProgress({
          ...progress,
          selectedPathCourseIds: updatedPaths
        });
      }
    }
  }, [progress, progress.selectedPathCourseIds, progress.onboarded]);

  const handleLogout = () => {
    if (soundEnabled) playSound("click");
    // Backup active user session before wiping local state
    if (progress.email && progress.hasPaid) {
      try {
        const savedAccountsStr = localStorage.getItem("coursiv_academy_accounts");
        const savedAccounts = savedAccountsStr ? JSON.parse(savedAccountsStr) : {};
        savedAccounts[progress.email.toLowerCase().trim()] = progress;
        localStorage.setItem("coursiv_academy_accounts", JSON.stringify(savedAccounts));
      } catch (e) {}
    }
    
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setProgress(INITIAL_PROGRESS);
    setActiveCourseId(null);
    setActiveLessonId(null);
    setCopilotOpen(false);
    setShowHomepage(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError(lang === "fr" ? "Veuillez remplir tous les champs." : "Please fill in all fields.");
      return;
    }

    try {
      const savedAccountsStr = localStorage.getItem("coursiv_academy_accounts");
      const savedAccounts = savedAccountsStr ? JSON.parse(savedAccountsStr) : {};
      
      const targetKey = loginEmail.toLowerCase().trim();
      const matchedAccount = savedAccounts[targetKey];

      if (!matchedAccount) {
        setLoginError(lang === "fr" ? "Aucun compte étudiant trouvé avec cette adresse e-mail." : "No student account found with this email address.");
        return;
      }

      if (matchedAccount.password && matchedAccount.password !== loginPassword) {
        setLoginError(lang === "fr" ? "Mot de passe incorrect." : "Incorrect password.");
        return;
      }

      // Restore session
      if (soundEnabled) playSound("success");
      setProgress(matchedAccount);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(matchedAccount));
      
      setLoginEmail("");
      setLoginPassword("");
      setLoginError("");
      setShowLoginModal(false);
      setShowHomepage(false); // directly enter dashboard
    } catch (e) {
      setLoginError(lang === "fr" ? "Une erreur est survenue lors de l'authentification." : "An error occurred during authentication.");
    }
  };

  const handleOnboardingComplete = (answers: Record<string, string>, pathCourseIds: string[]) => {
    if (soundEnabled) playSound("success");
    const updatedProgress: UserProgress = {
      ...progress,
      onboarded: true,
      onboardingAnswers: answers,
      selectedPathCourseIds: pathCourseIds,
      achievements: ["onboard"],
      xp: 50 // Earn 50 XP for onboarding
    };
    saveProgress(updatedProgress);
    setActiveCourseId(pathCourseIds[0]);
  };

  const handleSelectLesson = (courseId: string, lessonId: string) => {
    if (soundEnabled) playSound("click");
    setActiveCourseId(courseId);
    setActiveLessonId(lessonId);
  };

  const handleSelectCourse = (courseId: string) => {
    if (soundEnabled) playSound("click");
    // Swap course sequence to place selected course as the active focus
    const filtered = progress.selectedPathCourseIds.filter(id => id !== courseId);
    const newSeq = [courseId, ...filtered];
    saveProgress({
      ...progress,
      selectedPathCourseIds: newSeq
    });
    setActiveCourseId(courseId);
  };

  const triggerBadgePopup = (title: string, desc: string) => {
    if (soundEnabled) playSound("success");
    setBadgeBanner({ title, desc });
    setTimeout(() => {
      setBadgeBanner(null);
    }, 4500);
  };

  const handleUpdateFullName = (name: string) => {
    saveProgress({
      ...progress,
      fullName: name
    });
  };

  const handleCompleteLesson = (lessonId: string, earnedXp: number) => {
    const updatedCompletedLessons = { ...progress.completedLessonIds, [lessonId]: true };
    const newAchievements = [...progress.achievements];
    
    // Evaluate achievements
    // Novice prompting
    if (lessonId === "pe_l1" && !newAchievements.includes("prompt_novice")) {
      newAchievements.push("prompt_novice");
      triggerBadgePopup(
        lang === "fr" ? "Trophée initié !" : "Initiate Trophy!",
        lang === "fr" ? "Vous avez franchi la première étape de Prompt Engineering." : "You have taken your first step in Prompt Engineering."
      );
    }

    // Copy champ PAS
    if (lessonId === "cp_l1" && !newAchievements.includes("copy_champ")) {
      newAchievements.push("copy_champ");
      triggerBadgePopup(
        lang === "fr" ? "Copie Champion !" : "Copy Champion!",
        lang === "fr" ? "Vous maitrisez le framework persuasif d'écriture PAS." : "You mastered the PAS persuasive copywriting framework."
      );
    }

    // Streak checking logic
    let currentStreak = progress.streakCount;
    if (currentStreak >= 3 && !newAchievements.includes("streak_3")) {
      newAchievements.push("streak_3");
      triggerBadgePopup(
        lang === "fr" ? "Guerrier Discipliné !" : "Disciplined Warrior!",
        lang === "fr" ? "Débloqué pour maintien d'assiduité sur 3 jours." : "Unlocked for maintaining learning streaks over 3 days."
      );
    }

    // All courses explorer
    const categoriesStudied = localizedCourses.filter(course => 
      course.lessons.some((l: any) => updatedCompletedLessons[l.id])
    ).map(c => c.category);
    
    if (categoriesStudied.length >= 3 && !newAchievements.includes("all_courses")) {
      newAchievements.push("all_courses");
      triggerBadgePopup(
        lang === "fr" ? "Légende IA Académie !" : "AI Academy Legend!",
        lang === "fr" ? "Félicitations, vous avez exploré tous les types de digital skills !" : "Congratulations, you have explored all digital skill families!"
      );
    }

    // Check if the related course is now fully completed
    const relatedCourse = localizedCourses.find(c => c.lessons.some((l: any) => l.id === lessonId));
    const newlyCompletedCourseIds = { ...progress.completedCourseIds };
    if (relatedCourse) {
      const allLessonsCompleted = relatedCourse.lessons.every((l: any) => updatedCompletedLessons[l.id]);
      if (allLessonsCompleted && !progress.completedCourseIds[relatedCourse.id]) {
        newlyCompletedCourseIds[relatedCourse.id] = true;
        setTimeout(() => {
          triggerBadgePopup(
            lang === "fr" ? "🎓 CERTIFICAT OBTENU !" : "🎓 CERTIFICATE SECURED!",
            lang === "fr" 
              ? `Félicitations ! Vous avez complété avec brio l'intégralité de "${relatedCourse.title}". Votre certificat officiel est disponible !`
              : `Congratulations! You successfully completed all modules of "${relatedCourse.title}". Your official certificate is now ready!`
          );
        }, 1200);
      }
    }


    const updatedProgress: UserProgress = {
      ...progress,
      completedLessonIds: updatedCompletedLessons,
      completedCourseIds: newlyCompletedCourseIds,
      xp: progress.xp + earnedXp,
      achievements: newAchievements
    };

    saveProgress(updatedProgress);
    setActiveLessonId(null);
    if (soundEnabled) playSound("correct");
  };

  const handleClaimDailyStreak = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (progress.lastCheckInDate === todayStr) return;

    if (soundEnabled) playSound("claim");
    const updatedStreak = progress.streakCount + 1;
    const extraXp = 20;

    const updatedProgress: UserProgress = {
      ...progress,
      streakCount: updatedStreak,
      lastCheckInDate: todayStr,
      xp: progress.xp + extraXp
    };

    saveProgress(updatedProgress);
  };

  const handleResetApp = () => {
    if (window.confirm(lang === "fr" ? "Êtes-vous sûr de vouloir réinitialiser tout votre cursus et recommencer depuis le questionnaire ?" : "Are you sure you want to reset your full curriculum progress and start over from the onboarding?")) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setProgress(INITIAL_PROGRESS);
      setActiveCourseId(null);
      setActiveLessonId(null);
      setCopilotOpen(false);
    }
  };

  const handleResetAppSimple = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setProgress(INITIAL_PROGRESS);
    setActiveCourseId(null);
    setActiveLessonId(null);
    setCopilotOpen(false);
  };

  const handlePaymentComplete = (name: string, mail: string, password?: string, firstName?: string, lastName?: string) => {
    if (soundEnabled) playSound("success");
    const updatedProgress: UserProgress = {
      ...progress,
      hasPaid: true,
      fullName: name,
      firstName: firstName || name.split(/\s+/)[0] || "",
      lastName: lastName || name.split(/\s+/).slice(1).join(" ") || "",
      password: password,
      email: mail,
      registrationDate: new Date().toISOString()
    };
    saveProgress(updatedProgress);
  };

  // Compute stats of completion
  const totalLessons = (localizedCourses || []).reduce((acc, c) => acc + (c?.totalLessons || 0), 0) || 1;
  const completedLessonsCount = Object.keys(progress?.completedLessonIds || {}).length;
  const overallCompletedPercentage = Math.round((completedLessonsCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Visual Level Badge Claim Notifications pop up overlay */}
      {badgeBanner && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-slate-900 border-2 border-emerald-500/60 p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50 max-w-sm w-full font-sans animate-bounce">
          <div className="p-3 bg-emerald-505 rounded-xl text-slate-950 font-bold bg-gradient-to-tr from-emerald-400 to-teal-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-emerald-400 text-xs uppercase font-mono tracking-wider font-bold">{t("accomplishmentUnlocked")}</div>
            <div className="font-bold text-white text-sm">{badgeBanner.title}</div>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{badgeBanner.desc}</p>
          </div>
          <button onClick={() => setBadgeBanner(null)} className="ml-auto text-slate-500 hover:text-white cursor-pointer home">✕</button>
        </div>
      )}


      {/* Main app navigation header */}
      {progress.onboarded && progress.hasPaid && (
        <header className="bg-slate-950 border-b border-slate-900 sticky top-0 z-40 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
            
            {/* Logo */}
            <div 
              onClick={() => {
                setShowHomepage(true);
                setActiveLessonId(null);
                setCopilotOpen(false);
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-extrabold text-slate-950 shadow-md group-hover:scale-105 transition-transform">
                IA
              </div>
              <span className="hidden sm:inline-block font-sans font-black text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent group-hover:opacity-95 transition-opacity">
                {t("academyPlus")}
              </span>
              <span className="hidden md:inline-block text-[9px] uppercase font-mono tracking-widest bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded border border-slate-800">
                Plus
              </span>
            </div>

            {/* Menu Links inside Dashboard for quick toggle */}
            <div className="flex items-center gap-1.5 bg-slate-900/40 p-1 rounded-xl border border-slate-900/60 shrink-0">
              <button
                onClick={() => {
                  setShowHomepage(true);
                  setActiveLessonId(null);
                }}
                className={`text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors cursor-pointer font-sans font-semibold whitespace-nowrap ${
                  showHomepage ? "bg-slate-950 text-slate-200 border border-slate-800 shadow animate-fade-in" : "text-slate-400 hover:text-white"
                }`}
              >
                {t("homeTab")}
              </button>
              <button
                onClick={() => {
                  setShowHomepage(false);
                }}
                className={`text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors cursor-pointer font-sans font-semibold whitespace-nowrap ${
                  !showHomepage ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-450 hover:text-emerald-400"
                }`}
              >
                {lang === "fr" ? "Tableau de Bord" : "Dashboard"}
              </button>
            </div>

            {/* Quick Stats overview */}
            <div className="hidden md:flex items-center gap-6 text-xs font-mono">
              <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-850">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-slate-300 font-bold">{progress.streakCount} {t("daysStreak")}</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-800" />
              <div className="text-slate-400">
                {t("progressLabel")} <span className="font-bold text-slate-200">{overallCompletedPercentage}%</span>
              </div>
            </div>

            {/* Control items */}
            <div className="flex items-center gap-2.5">
              
              {/* Student status badge */}
              <div className="hidden sm:flex items-center gap-2.5 bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-xl select-none">
                <div className="w-5 h-5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-[10px] uppercase font-mono">
                  {progress.fullName ? progress.fullName[0].toUpperCase() : "E"}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-300 font-bold leading-none max-w-[100px] truncate">{progress.fullName || (lang === "fr" ? "Éleve Pro" : "Pro Student")}</span>
                  <span className="text-[8px] font-mono text-slate-500 leading-none mt-0.5">{t("studentPortal")}</span>
                </div>
              </div>

              {/* Language Selector */}
              <button
                onClick={handleToggleLang}
                className="flex items-center justify-center h-9 px-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-emerald-450 hover:border-emerald-550/30 font-sans text-xs font-bold leading-none cursor-pointer transition-colors transition-transform select-none active:scale-95"
                title={lang === "fr" ? "Switch to English" : "Passer en Français"}
              >
                🌐 {lang.toUpperCase()}
              </button>

              <button
                onClick={() => {
                  if (soundEnabled) {
                    setSoundEnabled(false);
                  } else {
                    setSoundEnabled(true);
                    playSound("click");
                  }
                }}
                className={`hidden sm:block p-2 rounded-xl border transition-colors cursor-pointer select-none ${
                  soundEnabled ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white" : "bg-slate-950 border-slate-900 text-slate-600"
                }`}
                title={soundEnabled ? t("soundOff") : t("soundOn")}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                id="reset-coursiv-btn"
                onClick={() => {
                  if (window.confirm(t("logoutConfirm"))) {
                    handleLogout();
                  }
                }}
                className="flex items-center gap-1.5 py-2 px-3 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 text-red-400 rounded-xl transition-all cursor-pointer font-sans text-xs font-bold leading-none"
                title={lang === "fr" ? "Se déconnecter de l'Académie" : "Log out from the Academy"}
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{t("deconnexion")}</span>
              </button>

            </div>
          </div>
        </header>
      )}

      {/* Primary body screen section switcher */}
      <main className="flex-1 w-full bg-slate-952 overflow-hidden flex flex-col">
        {showHomepage ? (
          <Homepage 
            lang={lang}
            onStartOnboarding={() => {
              setShowHomepage(false);
            }}
            onGoToDashboard={() => {
              setShowHomepage(false);
            }}
            onLoginClick={() => setShowLoginModal(true)}
            onLogoutClick={handleLogout}
            hasOnboarded={progress.onboarded}
            hasPaid={!!progress.hasPaid}
            fullName={progress.fullName}
          />
        ) : !progress.onboarded ? (
          <Onboarding 
            lang={lang}
            onComplete={handleOnboardingComplete} 
            onLoginClick={() => setShowLoginModal(true)}
          />
        ) : !progress.hasPaid ? (
          <SubscriptionBarrier
            lang={lang}
            onboardingAnswers={progress.onboardingAnswers}
            onPaymentComplete={handlePaymentComplete}
            onReset={handleResetAppSimple}
            onLoginClick={() => setShowLoginModal(true)}
          />
        ) : activeLessonId ? (
          // Dynamic lesson player
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            <div className="flex-1 overflow-hidden">
              <CoursePlayer
                lang={lang}
                course={localizedCourses.find(c => c.id === activeCourseId) || localizedCourses[0]}
                lessonId={activeLessonId}
                onBackToDashboard={() => setActiveLessonId(null)}
                onCompleteLesson={handleCompleteLesson}
                isAlreadyCompleted={!!progress.completedLessonIds[activeLessonId]}
              />
            </div>
            {/* Inline persistent or floating Copilot if open during lessons */}
            {copilotOpen && (
              <div className="w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l border-slate-900 bg-slate-950 h-[380px] lg:h-auto shrink-0 z-20">
                <AICopilot
                  lang={lang}
                  activeCourseTitle={localizedCourses.find(c => c.id === activeCourseId)?.title}
                  activeLessonTitle={localizedCourses.find(c => c.id === activeCourseId)?.lessons.find(l => l.id === activeLessonId)?.title}
                  userGoal={String(progress.onboardingAnswers["goal"] || "")}
                  onClose={() => setCopilotOpen(false)}
                />
              </div>
            )}
          </div>
        ) : (
          // Main Dashboard with sliding side-assistant
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <Dashboard
                lang={lang}
                progress={progress}
                onSelectLesson={handleSelectLesson}
                onSelectCourse={handleSelectCourse}
                onClaimDailyStreak={handleClaimDailyStreak}
                onToggleCopilot={() => setCopilotOpen(!copilotOpen)}
                onViewCertificate={(course) => setSelectedCertCourse(course)}
                onViewCorrectedPrompts={(course) => setSelectedPromptsCourse(course)}
              />
            </div>

            {/* Collapsible Slide-Out Tutor panel */}
            {copilotOpen && (
              <div className="hidden lg:block w-[380px] border-l border-slate-900 bg-slate-950 shrink-0 z-20">
                <AICopilot
                  lang={lang}
                  userGoal={String(progress.onboardingAnswers["goal"] || "")}
                  onClose={() => setCopilotOpen(false)}
                />
              </div>
            )}
            
            {/* Mobile popup tutor if open */}
            {copilotOpen && (
              <div className="lg:hidden fixed inset-x-0 bottom-0 top-18 bg-slate-950/90 backdrop-blur z-50 p-4">
                <AICopilot
                  lang={lang}
                  userGoal={String(progress.onboardingAnswers["goal"] || "")}
                  onClose={() => setCopilotOpen(false)}
                />
              </div>
            )}
          </div>
        )}
      </main>
      {/* Certificate Viewer Overlay Modal */}
      {selectedCertCourse && (
        <CertificateModal
          lang={lang}
          course={selectedCertCourse}
          progress={progress}
          onClose={() => setSelectedCertCourse(null)}
          onUpdateFullName={handleUpdateFullName}
        />
      )}

      {/* Prompts Report Viewer Overlay Modal */}
      {selectedPromptsCourse && (
        <PromptsReportModal
          lang={lang}
          course={selectedPromptsCourse}
          progress={progress}
          onClose={() => setSelectedPromptsCourse(null)}
          onUpdateFullName={handleUpdateFullName}
        />
      )}

      {/* Dynamic Login Modal Pop up */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative w-full max-w-md shadow-2xl overflow-hidden font-sans"
          >
            {/* Visual background element */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={() => {
                setShowLoginModal(false);
                setLoginError("");
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-white cursor-pointer bg-slate-950/40 p-1.5 rounded-lg border border-slate-800 hover:bg-slate-950/80 transition-all font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-emerald-500/10 mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="font-sans font-black text-xl text-white">{t("studentLogin")}</h3>
              <p className="text-xs text-slate-400 mt-1">{t("studentLoginSub")}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase block font-bold">{t("emailLabel")}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="email" 
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={t("loginPlaceholder")}
                    className="w-full bg-slate-950 border border-slate-800 py-3 pl-10 pr-4 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase block font-bold font-mono">{t("passwordLabel")}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="password" 
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder={t("passwordPlaceholder")}
                    className="w-full bg-slate-950 border border-slate-800 py-3 pl-10 pr-4 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-sans font-mono"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center rounded-xl font-mono leading-relaxed">
                  ⚠️ {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-3.5 rounded-2xl text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                {t("loginSubmit")}
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
              </button>
            </form>

            <div className="mt-5 border-t border-slate-850 pt-4 text-center">
              <span className="text-[10px] font-mono text-slate-500 block">{t("demoStudentAccount")}</span>
              <div className="mt-2 text-[11px] font-sans text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-850/80 inline-block text-left w-full space-y-1">
                <div>📧 E-mail : <strong className="text-emerald-400 select-all font-mono">clara@academie.plus</strong></div>
                <div>🔑 Passe : <strong className="text-emerald-400 select-all font-mono">password123</strong></div>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-900 mt-1">💡 {t("demoAccountTip")}</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* FLOATING RETRO CONTROL PANEL (SOUND AND LANGUAGE SWITCHER BACKDROP) */}
      {(!progress.onboarded || !progress.hasPaid || showHomepage) && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          {/* Sound toggle if not in main layout */}
          <button
            onClick={() => {
              if (soundEnabled) {
                setSoundEnabled(false);
              } else {
                setSoundEnabled(true);
                playSound("click");
              }
            }}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs shadow-lg backdrop-blur ${
              soundEnabled ? "bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white" : "bg-slate-950/90 border-slate-900 text-slate-600"
            }`}
            title={soundEnabled ? t("soundOff") : t("soundOn")}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleToggleLang}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-800/80 bg-slate-900/90 backdrop-blur text-xs font-bold text-slate-200 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer shadow-lg select-none active:scale-95"
            title={lang === "fr" ? "Switch to English" : "Passer en Français"}
          >
            <span>🌐 {lang.toUpperCase()}</span>
          </button>
        </div>
      )}
    </div>
  );
}
