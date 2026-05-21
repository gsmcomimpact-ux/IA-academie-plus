import React from "react";
import { motion } from "motion/react";
import { Course, UserProgress } from "../types";
import { COURSES, ACHIEVEMENTS } from "../data";
import CertificatesPanel from "./CertificatesPanel";
import { getLocalizedCourses, ACHIEVEMENTS_EN } from "../utils/translations";
import { 
  Sparkles, Award, Flame, Briefcase, Cpu, PenTool, CheckCircle, 
  ChevronRight, Calendar, Bookmark, GraduationCap, Compass, BookOpen, Clock, Heart, MessageSquare
} from "lucide-react";

interface DashboardProps {
  lang: "fr" | "en";
  progress: UserProgress;
  onSelectLesson: (courseId: string, lessonId: string) => void;
  onSelectCourse: (courseId: string) => void;
  onClaimDailyStreak: () => void;
  onToggleCopilot: () => void;
  onViewCertificate: (course: Course) => void;
}

const LOCAL_TRANS = {
  fr: {
    learnerProfile: "PROFIL APPRENANT",
    level: "Niveau",
    xpTotal: "XP total",
    customTutor: "Tuteur IA Personnalisé",
    recommendedTitle: "RECOMMANDÉ POUR VOUS",
    activeSyllabus: "VOTRE PROGRAMME DE FORMATION ACTIF",
    completedCountDesc: "SESSIONS TERMINÉES",
    completedCountOf: "sur",
    xpMaxLabel: "XP MAX",
    receivedXp: "Reçu +50 XP",
    completedStatus: "COMPLÉTÉ",
    startBtn: "DÉMARRER",
    lockedStatus: "Verrouillé",
    explorerTitle: "EXPLORER L'ACADÉMIE DE COMPÉTENCES",
    focusActive: "FOCUS ACTIF",
    select: "SÉLECTIONNER",
    streakTitle: "SÉRIE QUOTIDIENNE",
    streakCountLabel: "JOURS",
    streakDesc: "Gardez votre élan d'apprentissage ! Validez votre assiduité quotidienne en un clic pour maintenir votre série et réclamer des points d'XP gratuits.",
    streakValidated: "✓ PRÉSENCE VALIDÉE AUJOURD'HUI",
    streakBtn: "Valider ma présence aujourd'hui (+20 XP)",
    achievementsTitle: "MES ACCOMPLISSEMENTS",
    daysOfWeek: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    practiceSession: "Sujet d'étude",
    hourLabel: "heure de cours"
  },
  en: {
    learnerProfile: "LEARNER PROFILE",
    level: "Level",
    xpTotal: "total XP",
    customTutor: "Personal AI Tutor",
    recommendedTitle: "RECOMMENDED FOR YOU",
    activeSyllabus: "YOUR ACTIVE STUDY CURRICULUM",
    completedCountDesc: "COMPLETED LESSONS",
    completedCountOf: "of",
    xpMaxLabel: "MAX XP",
    receivedXp: "Earned +50 XP",
    completedStatus: "COMPLETED",
    startBtn: "START NOW",
    lockedStatus: "Locked",
    explorerTitle: "EXPLORE THE SKILLS ACADEMY",
    focusActive: "ACTIVE FOCUS",
    select: "SELECT",
    streakTitle: "DAILY STREAK COUNTER",
    streakCountLabel: "DAYS",
    streakDesc: "Keep your study momentum alive! Verify your daily compliance with a click to extend your streak and secure free premium XP.",
    streakValidated: "✓ ATTENDANCE VALIDATED TODAY",
    streakBtn: "Confirm attendance today (+20 XP)",
    achievementsTitle: "MY ACCOMPLISHMENTS",
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    beginner: "Beginner",
    intermediate: "Intermediate",
    practiceSession: "Practice Topic",
    hourLabel: "lesson training"
  }
};

const getIconComponent = (name: string, className = "w-5 h-5") => {
  switch (name) {
    case "Cpu": return <Cpu className={`${className} text-emerald-400`} />;
    case "PenTool": return <PenTool className={`${className} text-pink-400`} />;
    case "Briefcase": return <Briefcase className={`${className} text-indigo-400`} />;
    case "Compass": return <Compass className={`${className} text-blue-400`} />;
    case "Terminal": return <Cpu className={`${className} text-teal-400`} />;
    case "Flame": return <Flame className={`${className} text-orange-500`} />;
    default: return <Sparkles className={`${className} text-yellow-400`} />;
  }
};

export default function Dashboard({ lang, progress, onSelectLesson, onSelectCourse, onClaimDailyStreak, onToggleCopilot, onViewCertificate }: DashboardProps) {
  const t = (key: keyof typeof LOCAL_TRANS["fr"]) => {
    return LOCAL_TRANS[lang][key] || LOCAL_TRANS["fr"][key] || String(key);
  };

  const localizedCourses = getLocalizedCourses(lang);
  
  // Find current active course based on first uncompleted, or first of their roadmap
  const activeCourseId = progress?.selectedPathCourseIds?.[0] || (localizedCourses?.[0]?.id) || "prompt_eng";
  const activeCourse = (localizedCourses || []).find(c => c?.id === activeCourseId) || localizedCourses?.[0] || { id: "prompt_eng", title: "Masterclass", lessons: [], totalLessons: 30 };

  // XP Progress values
  const currentLevel = Math.floor((progress?.xp || 0) / 100) + 1;
  const xpInCurrentLevel = (progress?.xp || 0) % 105; // safe percent

  // Streak claimed today checker
  const todayStr = new Date().toISOString().split("T")[0];
  const isCheckedInToday = progress?.lastCheckInDate === todayStr;

  const daysOfWeek = (t("daysOfWeek") as string[]) || [];
  // Mock calendar status based on streak
  const currentDayIdx = (new Date().getDay() + 6) % 7; // Monday = 0, Sunday = 6

  // Check if they completed a course
  const getCourseCompletedCount = (course: Course) => {
    return (course?.lessons || []).filter(l => l && progress?.completedLessonIds?.[l.id]).length;
  };

  // Get user focus title description
  const getUserFocusTitle = () => {
    const mainInterest = progress?.onboardingAnswers?.["skill"];
    if (mainInterest === "prompt_engineering") {
      return lang === "fr" ? "Praticien Prompt Engineer" : "Prompt Engineering Specialist";
    }
    if (mainInterest === "copywriting") {
      return lang === "fr" ? "Copywriter IA d'Impact" : "High-Impact AI Copywriter";
    }
    if (mainInterest === "freelance") {
      return lang === "fr" ? "Consultant Indépendant" : "Independent AI Consultant";
    }
    return lang === "fr" ? "Apprenti Digital d'Élite" : "Elite Digital Apprentice";
  };

  const activeAchievements = lang === "fr" ? ACHIEVEMENTS : ACHIEVEMENTS_EN;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative pb-16">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Upper User Hub Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-center bg-slate-900/40 border border-slate-900 p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-indigo-500 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-emerald-500/10">
              {currentLevel}
            </div>
            <div>
              <div className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{t("learnerProfile")}</div>
              <h2 className="text-lg font-bold text-white tracking-tight">{getUserFocusTitle()}</h2>
              <p className="text-xs text-slate-400">{t("level")} {currentLevel} • {progress.xp} {t("xpTotal")}</p>
            </div>
          </div>

          {/* Level XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>{String(t("level")).toUpperCase()} {currentLevel}</span>
              <span>{xpInCurrentLevel} / 100 XP</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
                style={{ width: `${xpInCurrentLevel}%` }}
              />
            </div>
          </div>

          {/* Call-to-action bar helper */}
          <div className="flex gap-3 justify-end">
            <button
              id="open-copilot-panel"
              onClick={onToggleCopilot}
              className="bg-slate-900 hover:bg-slate-850 hover:border-emerald-500/40 transition-all py-3 px-4 rounded-xl border border-slate-800 text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md select-none"
            >
              <MessageSquare className="w-4.5 h-4.5 text-emerald-400 animate-pulse" />
              {t("customTutor")}
            </button>
          </div>
        </div>

        {/* Dashboard Grid structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT 2 COLUMNS: Recommended active roadmap path and course outline */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active roadmap card */}
            <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500/5 text-[9px] font-mono text-emerald-400 border-b border-l border-slate-900 px-3 py-1 uppercase rounded-bl-xl font-bold">
                {t("recommendedTitle")}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Bookmark className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wide font-mono">{t("activeSyllabus")}</h3>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-slate-800">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-white mb-1">{activeCourse.title}</h1>
                  <p className="text-xs text-slate-400 max-w-md leading-relaxed">{activeCourse.description}</p>
                </div>
                
                <div className="flex items-center gap-2.5 shrink-0 bg-slate-950 p-3 rounded-xl border border-slate-900">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-mono">{t("completedCountDesc")}</div>
                    <div className="text-sm font-bold font-mono text-emerald-400">{getCourseCompletedCount(activeCourse)} {t("completedCountOf")} {activeCourse.totalLessons}</div>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-800" />
                  <div className="text-center font-mono">
                    <div className="text-[10px] text-slate-400">{t("xpMaxLabel")}</div>
                    <div className="font-bold text-slate-200">+{activeCourse.totalLessons * 50}</div>
                  </div>
                </div>
              </div>

              {/* Lesson Roadmap Chapters Timeline */}
              <div className="mt-6 space-y-4">
                {activeCourse.lessons.map((lesson, idx) => {
                  const isCompleted = progress.completedLessonIds[lesson.id];
                  const isPreviousCompleted = idx === 0 || progress.completedLessonIds[activeCourse.lessons[idx - 1].id];
                  const isActive = !isCompleted && isPreviousCompleted;

                  return (
                    <div 
                      key={lesson.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isCompleted 
                          ? "bg-slate-900/20 border-slate-900 opacity-80" 
                          : isActive
                          ? "bg-gradient-to-tr from-slate-900 to-slate-950 border-emerald-500/30 hover:shadow-lg shadow-emerald-500/5"
                          : "bg-slate-950/40 border-slate-900 opacity-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono text-sm font-bold mt-0.5 ${
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-400"
                            : isActive
                            ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10"
                            : "bg-slate-850 text-slate-600"
                        }`}>
                          {isCompleted ? "✓" : (idx + 1)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 font-sans">
                            <h4 className="font-semibold text-sm text-slate-200">{lesson.title}</h4>
                            {isCompleted && <span className="text-[9px] font-mono uppercase font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{lang === "fr" ? "Reçu +50 XP" : "Earned +50 XP"}</span>}
                          </div>
                          <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">{lesson.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500 font-mono">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lesson.durationMin} MIN</span>
                            <span>•</span>
                            <span className="uppercase text-slate-400 font-bold">{lesson.activityType === "interactive_sandbox" ? (lang === "fr" ? "Atelier Sandbox" : "Practice Lab") : (lang === "fr" ? "Sujet d'étude" : "Lesson Case")}</span>
                          </div>
                        </div>
                      </div>

                      {isCompleted ? (
                        <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 shrink-0 select-none">
                          <CheckCircle className="w-4.5 h-4.5" />
                          {t("completedStatus")}
                        </div>
                      ) : isActive ? (
                        <button
                          id={`start-lesson-${lesson.id}`}
                          onClick={() => onSelectLesson(activeCourse.id, lesson.id)}
                          className="bg-emerald-500 hover:bg-emerald-405 text-slate-950 font-bold py-2 px-4 rounded-lg text-xs flex items-center gap-1 font-mono transition-all cursor-pointer shadow shadow-emerald-500/5 shrink-0"
                        >
                          {t("startBtn")}
                          <ChevronRight className="w-4.5 h-4.5" />
                        </button>
                      ) : (
                        <div className="text-xs font-mono text-slate-600 flex items-center gap-1 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-900 shrink-0 select-none">
                          {t("lockedStatus")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic Certificates Panel */}
            <CertificatesPanel 
              lang={lang}
              progress={progress}
              onSelectCourse={onSelectCourse}
              onViewCertificate={onViewCertificate}
            />

            {/* Complete Curriculum Catalog Grid */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-300 text-sm tracking-wide font-mono uppercase flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                {t("explorerTitle")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {localizedCourses.map((course) => {
                  const isCurFocus = activeCourseId === course.id;
                  const complCount = getCourseCompletedCount(course);

                  return (
                    <div 
                      key={course.id}
                      onClick={() => onSelectCourse(course.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[180px] hover:-translate-y-0.5 ${
                        isCurFocus 
                          ? "bg-slate-900/40 border-indigo-500/20 shadow-lg shadow-indigo-505" 
                          : "bg-slate-900/10 border-slate-900 hover:border-slate-800"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-2 bg-slate-900 rounded-lg">
                            {getIconComponent(course.iconName, "w-4 h-4")}
                          </div>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                            course.difficulty === "Beginner" ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                          }`}>
                            {course.difficulty === "Beginner" ? t("beginner") : t("intermediate")}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-slate-100 line-clamp-1">{course.title}</h4>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{course.description}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span>{complCount} / {course.totalLessons} {lang === "fr" ? "CHAPITRES" : "CHAPTERS"}</span>
                        {isCurFocus ? (
                          <span className="text-emerald-400 font-bold uppercase">{t("focusActive")}</span>
                        ) : (
                          <span className="text-slate-400 uppercase">{t("select")}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR: Weekly streak consistency and trophy checks */}
          <div className="space-y-8">
            
            {/* 1. Daily consistency check in */}
            <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold text-sm font-mono text-slate-200 uppercase">{t("streakTitle")}</h3>
                </div>
                <span className="font-mono text-sm font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/15 flex items-center gap-1">
                  {progress.streakCount} {t("streakCountLabel")}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {t("streakDesc")}
              </p>

              {/* Weekly blocks */}
              <div className="grid grid-cols-7 gap-1.5 py-2">
                {daysOfWeek.map((day, idx) => {
                  const isPassed = idx < currentDayIdx;
                  const isToday = idx === currentDayIdx;

                  let blockStyle = "bg-slate-950 border-slate-900 text-slate-600";
                  if (isToday) {
                    blockStyle = isCheckedInToday ? "bg-orange-500/20 border-orange-500/50 text-orange-400 font-bold" : "bg-slate-900 border-dashed border-slate-700 text-slate-400";
                  } else if (isPassed) {
                    blockStyle = "bg-orange-500/10 border-orange-500/10 text-orange-400";
                  }

                  return (
                    <div 
                      key={day}
                      className={`p-2 rounded-lg border flex flex-col items-center justify-center text-center ${blockStyle}`}
                    >
                      <span className="text-[9px] uppercase font-mono tracking-wider">{day}</span>
                      <div className="text-xs mt-1">
                        {isPassed || (isToday && isCheckedInToday) ? "✓" : "•"}
                      </div>
                    </div>
                  );
                })}
              </div>

              {isCheckedInToday ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold text-center rounded-xl flex items-center justify-center gap-1.5 select-none uppercase">
                  {t("streakValidated")}
                </div>
              ) : (
                <button
                  id="claim-streak-btn"
                  onClick={onClaimDailyStreak}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/10 transition-all cursor-pointer text-xs uppercase tracking-wider text-center"
                >
                  {t("streakBtn")}
                </button>
              )}
            </div>

            {/* 2. Custom trophies & unlocked awards checklist */}
            <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-sm font-mono text-slate-200 uppercase">{t("achievementsTitle")}</h3>
              </div>

              <div className="space-y-3.5">
                {activeAchievements.map((ach) => {
                  const isEarned = progress.achievements.includes(ach.id);

                  return (
                    <div 
                      key={ach.id}
                      className={`p-3 rounded-xl border flex items-center gap-3.5 transition-all ${
                        isEarned 
                          ? "bg-slate-900/60 border-slate-800" 
                          : "bg-slate-950/20 border-slate-950 opacity-40 select-none"
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center ${
                        isEarned 
                          ? `bg-gradient-to-tr ${ach.color} text-slate-950 shadow-md` 
                          : "bg-slate-850 text-slate-600"
                      }`}>
                        {getIconComponent(ach.icon, "w-4.5 h-4.5")}
                      </div>

                      <div>
                        <div className="font-sans font-bold text-xs text-slate-200">
                          {ach.title}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                          {ach.description}
                        </div>
                      </div>

                      {isEarned && (
                        <div className="ml-auto w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
