import React from "react";
import { motion } from "motion/react";
import { Course, UserProgress } from "../types";
import { getLocalizedCourses } from "../utils/translations";
import { Award, ShieldCheck, Lock, ArrowRight, Sparkles, BookOpen } from "lucide-react";

interface CertificatesPanelProps {
  lang: "fr" | "en";
  progress: UserProgress;
  onSelectCourse: (courseId: string) => void;
  onViewCertificate: (course: Course) => void;
}

const LOCAL_TRANS = {
  fr: {
    panelTitle: "VOS CERTIFICATIONS OFFICIELLES",
    panelDesc: "Chaque fois que vous validez l'intégralité d'un programme d'apprentissage de l'Académie, nous vous décernons un certificat cryptographique d'excellence qui valide vos nouvelles compétences en IA et services digitaux.",
    unlockedBadge: "CERTIFICATS OBTENUS",
    statusCompleted: "★ VALIDE",
    statusStudying: "EN COURS",
    catAI: "Spécialisation IA",
    catDigital: "Métier Digital",
    sessionsLabel: "SESSIONS",
    viewBtn: "Consulter mon Certificat",
    lockBtn: "DÉBLOQUER LE CERTIFICAT"
  },
  en: {
    panelTitle: "YOUR OFFICIAL CERTIFICATIONS",
    panelDesc: "Every time you master an Academy specialized study track, we award you a custom verifiable cryptographic credential validating your expertise in remote AI capabilities.",
    unlockedBadge: "UNLOCKED DIPLOMAS",
    statusCompleted: "★ VALIDATED",
    statusStudying: "IN PROGRESS",
    catAI: "AI Specialization",
    catDigital: "Digital Business",
    sessionsLabel: "CHAPTERS",
    viewBtn: "View Certificate PDF",
    lockBtn: "UNLOCK CREDENTIAL"
  }
};

export default function CertificatesPanel({ lang, progress, onSelectCourse, onViewCertificate }: CertificatesPanelProps) {
  const t = (key: keyof typeof LOCAL_TRANS["fr"]) => {
    return LOCAL_TRANS[lang][key] || LOCAL_TRANS["fr"][key] || String(key);
  };

  const localizedCourses = getLocalizedCourses(lang);

  // Check if they completed a course
  const getCourseCompletedCount = (course: Course) => {
    return course.lessons.filter(l => progress.completedLessonIds[l.id]).length;
  };

  const isCourseFullyCompleted = (course: Course) => {
    return getCourseCompletedCount(course) === course.totalLessons;
  };

  // Keep track of how many certificates they actually unlocked
  const unlockedCount = localizedCourses.filter(isCourseFullyCompleted).length;

  return (
    <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-6 relative overflow-hidden font-sans">
      
      {/* Decorative radial lighting behind the badge */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wide font-mono">
              {t("panelTitle")}
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            {t("panelDesc")}
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 py-2 px-4 rounded-xl flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-[9px] text-slate-500 uppercase font-bold tracking-wider">{t("unlockedBadge")}</div>
            <div className="font-mono text-base font-black text-emerald-400">{unlockedCount} / {localizedCourses.length}</div>
          </div>
        </div>
      </div>

      {/* Certificates showcase Grid/Stack list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {localizedCourses.map((course) => {
          const completedCount = getCourseCompletedCount(course);
          const totalCount = course.totalLessons;
          const isCompleted = completedCount === totalCount;

          return (
            <div 
              key={course.id}
              className={`rounded-xl border p-4 flex flex-col justify-between min-h-[190px] transition-all relative ${
                isCompleted 
                  ? "bg-slate-950/80 border-emerald-500/20 shadow-lg shadow-emerald-500/5 hover:border-emerald-500/40"
                  : "bg-slate-950/20 border-slate-900/60"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    isCompleted 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-slate-900 text-slate-500 border border-slate-850"
                  }`}>
                    {isCompleted ? t("statusCompleted") : t("statusStudying")}
                  </span>

                  <span className="text-[10px] text-slate-500 font-mono font-semibold uppercase">
                    {course.category === "ai" ? t("catAI") : t("catDigital")}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-slate-200 line-clamp-1">{course.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-normal">{course.description}</p>
                </div>
              </div>

              {/* Completion Progress Bar */}
              <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-900">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>{t("sessionsLabel")} {completedCount}/{totalCount}</span>
                  <span className={isCompleted ? "text-emerald-400 font-bold" : "text-slate-400"}>
                    {Math.round((completedCount / totalCount) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-indigo-500"
                    }`}
                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>

              {/* Bottom Actions CTA */}
              <div className="mt-3.5 pt-1">
                {isCompleted ? (
                  <button
                    onClick={() => onViewCertificate(course)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-405 hover:to-teal-405 text-slate-950 font-bold py-2 rounded-lg text-2xs uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 cursor-pointer shadow-md select-none"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-slate-950 animate-pulse" />
                    {t("viewBtn")}
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectCourse(course.id)}
                    className="w-full bg-slate-900/50 hover:bg-slate-900 text-slate-400 hover:text-white transition-all py-2 rounded-lg text-2xs uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 border border-slate-900 hover:border-slate-800 cursor-pointer select-none"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                    {t("lockBtn")}
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
