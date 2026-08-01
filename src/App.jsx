import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  BookOpen,
  Settings as SettingsIcon,
  Flame,
  Check,
  X,
  ChevronRight,
  RotateCcw,
  Bell,
  Globe,
} from "lucide-react";

const NAVY = "#1B2A4A";
const PAPER = "#F6F1E4";
const GOLD = "#C89B3C";
const TEAL = "#2F6F62";
const CORAL = "#C1453D";

const LANGUAGES = {
  es: {
    name: { tr: "İspanyolca", en: "Spanish" },
    stripes: ["#C60B1E", "#FFC400", "#C60B1E"],
    words: [
      { word: "hola", tr: "merhaba", en: "hello", ex: "¡Hola! ¿Cómo estás?", exTr: "Merhaba! Nasılsın?", exEn: "Hello! How are you?" },
      { word: "gracias", tr: "teşekkürler", en: "thank you", ex: "Muchas gracias por tu ayuda.", exTr: "Yardımın için çok teşekkürler.", exEn: "Thank you very much for your help." },
      { word: "amigo", tr: "arkadaş", en: "friend", ex: "Él es mi mejor amigo.", exTr: "O benim en iyi arkadaşım.", exEn: "He is my best friend." },
      { word: "agua", tr: "su", en: "water", ex: "Necesito un vaso de agua.", exTr: "Bir bardak suya ihtiyacım var.", exEn: "I need a glass of water." },
      { word: "casa", tr: "ev", en: "house", ex: "Mi casa está cerca del parque.", exTr: "Evim parka yakın.", exEn: "My house is near the park." },
      { word: "feliz", tr: "mutlu", en: "happy", ex: "Estoy muy feliz hoy.", exTr: "Bugün çok mutluyum.", exEn: "I am very happy today." },
    ],
  },
  en: {
    name: { tr: "İngilizce", en: "English" },
    stripes: ["#00247D", "#FFFFFF", "#CF142B"],
    words: [
      { word: "journey", tr: "yolculuk", en: "journey", ex: "It was a long journey home.", exTr: "Eve uzun bir yolculuktu.", exEn: "It was a long journey home." },
      { word: "kindness", tr: "nezaket", en: "kindness", ex: "She treated everyone with kindness.", exTr: "Herkese nezaketle davrandı.", exEn: "She treated everyone with kindness." },
      { word: "harvest", tr: "hasat", en: "harvest", ex: "The farmers celebrated the harvest.", exTr: "Çiftçiler hasadı kutladı.", exEn: "The farmers celebrated the harvest." },
      { word: "curious", tr: "meraklı", en: "curious", ex: "The child was curious about everything.", exTr: "Çocuk her şeyi merak ediyordu.", exEn: "The child was curious about everything." },
      { word: "shelter", tr: "sığınak", en: "shelter", ex: "They found shelter from the storm.", exTr: "Fırtınadan sığınacak bir yer buldular.", exEn: "They found shelter from the storm." },
      { word: "grateful", tr: "minnettar", en: "grateful", ex: "I am grateful for your support.", exTr: "Desteğin için minnettarım.", exEn: "I am grateful for your support." },
    ],
  },
  de: {
    name: { tr: "Almanca", en: "German" },
    stripes: ["#000000", "#DD0000", "#FFCE00"],
    words: [
      { word: "danke", tr: "teşekkürler", en: "thank you", ex: "Danke für deine Hilfe.", exTr: "Yardımın için teşekkürler.", exEn: "Thank you for your help." },
      { word: "Freund", tr: "arkadaş", en: "friend", ex: "Er ist mein bester Freund.", exTr: "O benim en iyi arkadaşım.", exEn: "He is my best friend." },
      { word: "Wasser", tr: "su", en: "water", ex: "Ich trinke gerne Wasser.", exTr: "Su içmeyi severim.", exEn: "I like drinking water." },
      { word: "Haus", tr: "ev", en: "house", ex: "Unser Haus ist sehr groß.", exTr: "Evimiz çok büyük.", exEn: "Our house is very big." },
      { word: "glücklich", tr: "mutlu", en: "happy", ex: "Sie ist heute sehr glücklich.", exTr: "O bugün çok mutlu.", exEn: "She is very happy today." },
      { word: "arbeiten", tr: "çalışmak", en: "to work", ex: "Ich muss morgen arbeiten.", exTr: "Yarın çalışmam gerekiyor.", exEn: "I have to work tomorrow." },
    ],
  },
  fr: {
    name: { tr: "Fransızca", en: "French" },
    stripes: ["#0055A4", "#FFFFFF", "#EF4135"],
    words: [
      { word: "bonjour", tr: "merhaba", en: "hello", ex: "Bonjour, comment allez-vous ?", exTr: "Merhaba, nasılsınız?", exEn: "Hello, how are you?" },
      { word: "merci", tr: "teşekkürler", en: "thank you", ex: "Merci beaucoup pour tout.", exTr: "Her şey için çok teşekkürler.", exEn: "Thank you very much for everything." },
      { word: "ami", tr: "arkadaş", en: "friend", ex: "C'est mon meilleur ami.", exTr: "O benim en iyi arkadaşım.", exEn: "He is my best friend." },
      { word: "maison", tr: "ev", en: "house", ex: "Notre maison est près de la mer.", exTr: "Evimiz denize yakın.", exEn: "Our house is near the sea." },
      { word: "heureux", tr: "mutlu", en: "happy", ex: "Je suis très heureux aujourd'hui.", exTr: "Bugün çok mutluyum.", exEn: "I am very happy today." },
      { word: "travailler", tr: "çalışmak", en: "to work", ex: "J'aime travailler le matin.", exTr: "Sabahları çalışmayı severim.", exEn: "I like working in the morning." },
    ],
  },
  it: {
    name: { tr: "İtalyanca", en: "Italian" },
    stripes: ["#008C45", "#F4F5F0", "#CD212A"],
    words: [
      { word: "ciao", tr: "merhaba", en: "hello", ex: "Ciao, come stai?", exTr: "Merhaba, nasılsın?", exEn: "Hello, how are you?" },
      { word: "grazie", tr: "teşekkürler", en: "thank you", ex: "Grazie mille per l'aiuto.", exTr: "Yardım için çok teşekkürler.", exEn: "Thank you so much for the help." },
      { word: "amico", tr: "arkadaş", en: "friend", ex: "È il mio migliore amico.", exTr: "O benim en iyi arkadaşım.", exEn: "He is my best friend." },
      { word: "casa", tr: "ev", en: "house", ex: "La mia casa è piccola ma bella.", exTr: "Evim küçük ama güzel.", exEn: "My house is small but beautiful." },
      { word: "felice", tr: "mutlu", en: "happy", ex: "Sono molto felice oggi.", exTr: "Bugün çok mutluyum.", exEn: "I am very happy today." },
      { word: "lavorare", tr: "çalışmak", en: "to work", ex: "Devo lavorare domani.", exTr: "Yarın çalışmam gerekiyor.", exEn: "I have to work tomorrow." },
    ],
  },
};

const T = {
  appName: { tr: "Günlük Dil", en: "Daily Language" },
  onboardTitle: { tr: "Her gün yeni bir dil", en: "A new language every day" },
  onboardSub: { tr: "Hangi dili öğrenmek istersin?", en: "Which language do you want to learn?" },
  interfaceLang: { tr: "Arayüz dili", en: "Interface language" },
  start: { tr: "Başla", en: "Get started" },
  home: { tr: "Ana Sayfa", en: "Home" },
  practice: { tr: "Pratik", en: "Practice" },
  settings: { tr: "Ayarlar", en: "Settings" },
  streak: { tr: "gün seri", en: "day streak" },
  wordsLearned: { tr: "öğrenilen kelime", en: "words learned" },
  wordOfDay: { tr: "Günün kelimesi", en: "Word of the day" },
  tapToFlip: { tr: "Anlamı görmek için dokun", en: "Tap to see the meaning" },
  startPractice: { tr: "Pratiğe başla", en: "Start practice" },
  question: { tr: "Bu kelimenin anlamı nedir?", en: "What does this word mean?" },
  next: { tr: "Sonraki", en: "Next" },
  finish: { tr: "Bitir", en: "Finish" },
  correct: { tr: "Doğru!", en: "Correct!" },
  incorrect: { tr: "Yanlış", en: "Not quite" },
  resultTitle: { tr: "Harika iş çıkardın!", en: "Great job!" },
  scoreLabel: { tr: "Doğru cevap", en: "Correct answers" },
  streakUp: { tr: "Serin bir gün arttı", en: "Your streak went up by one day" },
  backHome: { tr: "Ana sayfaya dön", en: "Back to home" },
  retry: { tr: "Tekrar dene", en: "Try again" },
  targetLangLabel: { tr: "Öğrenilen dil", en: "Learning language" },
  changeLang: { tr: "Değiştir", en: "Change" },
  reminder: { tr: "Günlük hatırlatma", en: "Daily reminder" },
  reminderTime: { tr: "Saat", en: "Time" },
  reminderNote: {
    tr: "Not: Bu tarayıcı sekmesi kapandığında bildirimler durur. Telefonunuza gerçek günlük hatırlatma için uygulamayı ana ekrana eklemen ve bildirim izni vermen gerekir.",
    en: "Note: Notifications stop once this browser tab is closed. For a real daily reminder on your phone, add the app to your home screen and allow notifications.",
  },
  testNotif: { tr: "Test bildirimi gönder", en: "Send a test notification" },
  notifSent: { tr: "Test bildirimi gönderildi", en: "Test notification sent" },
  notifDenied: { tr: "Bildirim izni verilmedi", en: "Notification permission denied" },
  todayDone: { tr: "Bugünkü pratiği tamamladın", en: "You finished today's practice" },
};

function useT(uiLang) {
  return (key) => T[key]?.[uiLang] ?? key;
}

function FlagChip({ stripes, size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
    >
      {stripes.map((c, i) => (
        <div key={i} style={{ flex: 1, background: c }} />
      ))}
    </div>
  );
}

function StreakStamp({ streak, t }) {
  return (
    <div
      style={{
        width: 108,
        height: 108,
        borderRadius: "50%",
        border: `3px dashed ${GOLD}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(-6deg)",
        color: GOLD,
        margin: "0 auto",
      }}
    >
      <Flame size={26} color={GOLD} fill={GOLD} />
      <span style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif", lineHeight: 1 }}>{streak}</span>
      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{t("streak")}</span>
    </div>
  );
}

function BottomNav({ screen, setScreen, t }) {
  const items = [
    { key: "home", icon: Home, label: t("home") },
    { key: "practice", icon: BookOpen, label: t("practice") },
    { key: "settings", icon: SettingsIcon, label: t("settings") },
  ];
  return (
    <div
      style={{
        display: "flex",
        borderTop: "1px solid #E4DFD0",
        background: PAPER,
        padding: "8px 6px calc(8px + env(safe-area-inset-bottom))",
      }}
    >
      {items.map(({ key, icon: Icon, label }) => {
        const active = screen === key || (screen === "result" && key === "practice");
        return (
          <div
            key={key}
            onClick={() => setScreen(key)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              cursor: "pointer",
              color: active ? NAVY : "#9A9280",
            }}
          >
            <Icon size={22} strokeWidth={active ? 2.4 : 2} />
            <span style={{ fontSize: 11, fontWeight: active ? 600 : 400 }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function OnboardingScreen({ uiLang, setUiLang, targetLang, setTargetLang, onStart, t }) {
  return (
    <div style={{ height: "100%", background: NAVY, color: PAPER, display: "flex", flexDirection: "column", padding: "36px 22px 24px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 24 }}>
        {["tr", "en"].map((l) => (
          <div
            key={l}
            onClick={() => setUiLang(l)}
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              background: uiLang === l ? GOLD : "transparent",
              color: uiLang === l ? NAVY : PAPER,
              border: `1px solid ${GOLD}`,
            }}
          >
            {l === "tr" ? "TR" : "EN"}
          </div>
        ))}
      </div>

      <Globe size={34} color={GOLD} style={{ marginBottom: 10 }} />
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, margin: "0 0 6px", lineHeight: 1.2 }}>{t("onboardTitle")}</h1>
      <p style={{ color: "#C9CEDA", fontSize: 15, margin: "0 0 28px" }}>{t("onboardSub")}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, overflowY: "auto" }}>
        {Object.entries(LANGUAGES).map(([code, lang]) => (
          <div
            key={code}
            onClick={() => setTargetLang(code)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 14,
              background: targetLang === code ? "rgba(200,155,60,0.18)" : "rgba(255,255,255,0.05)",
              border: targetLang === code ? `1.5px solid ${GOLD}` : "1.5px solid transparent",
              cursor: "pointer",
            }}
          >
            <FlagChip stripes={lang.stripes} size={36} />
            <span style={{ fontSize: 16, fontWeight: 500 }}>{lang.name[uiLang]}</span>
            {targetLang === code && <Check size={18} color={GOLD} style={{ marginLeft: "auto" }} />}
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        style={{
          marginTop: 20,
          background: GOLD,
          color: NAVY,
          border: "none",
          borderRadius: 14,
          padding: "14px 0",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {t("start")}
      </button>
    </div>
  );
}

function HomeScreen({ uiLang, targetLang, streak, learnedCount, onStartPractice, t }) {
  const [flipped, setFlipped] = useState(false);
  const lang = LANGUAGES[targetLang];
  const dayIndex = new Date().getDate() % lang.words.length;
  const word = lang.words[dayIndex];

  return (
    <div style={{ height: "100%", background: PAPER, display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <div style={{ padding: "22px 20px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FlagChip stripes={lang.stripes} size={30} />
          <div>
            <div style={{ fontSize: 13, color: "#8B8474" }}>{t("targetLangLabel")}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: NAVY, fontFamily: "Georgia, serif" }}>{lang.name[uiLang]}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "18px 20px 6px" }}>
        <StreakStamp streak={streak} t={t} />
        <div style={{ textAlign: "center", fontSize: 13, color: "#8B8474", marginTop: 10 }}>
          {learnedCount} {t("wordsLearned")}
        </div>
      </div>

      <div style={{ padding: "20px 20px 6px" }}>
        <div style={{ fontSize: 13, color: "#8B8474", marginBottom: 8 }}>{t("wordOfDay")}</div>
        <div
          onClick={() => setFlipped((f) => !f)}
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            padding: "22px 18px",
            minHeight: 110,
            border: "1px solid #E9E3D3",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(27,42,74,0.06)",
          }}
        >
          {!flipped ? (
            <>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 26, color: NAVY, fontWeight: 700 }}>{word.word}</div>
              <div style={{ fontSize: 12.5, color: "#B0A98F", marginTop: 8 }}>{t("tapToFlip")}</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 18, color: TEAL, fontWeight: 600 }}>{uiLang === "tr" ? word.tr : word.en}</div>
              <div style={{ fontSize: 13.5, color: "#5B5748", marginTop: 10, fontStyle: "italic" }}>{word.ex}</div>
              <div style={{ fontSize: 12.5, color: "#8B8474", marginTop: 4 }}>{uiLang === "tr" ? word.exTr : word.exEn}</div>
            </>
          )}
        </div>
      </div>

      <div style={{ padding: "18px 20px 24px", marginTop: "auto" }}>
        <button
          onClick={onStartPractice}
          style={{
            width: "100%",
            background: NAVY,
            color: PAPER,
            border: "none",
            borderRadius: 14,
            padding: "14px 0",
            fontSize: 15.5,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {t("startPractice")} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function buildQuiz(lang, uiLang) {
  const pool = lang.words;
  return pool.map((word) => {
    const correct = uiLang === "tr" ? word.tr : word.en;
    const distractors = pool
      .filter((w) => w.word !== word.word)
      .map((w) => (uiLang === "tr" ? w.tr : w.en));
    const options = [correct, ...distractors.sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
    return { word, correct, options };
  });
}

function PracticeScreen({ uiLang, targetLang, onFinish, t }) {
  const lang = LANGUAGES[targetLang];
  const [quiz] = useState(() => buildQuiz(lang, uiLang));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const current = quiz[index];
  const isLast = index === quiz.length - 1;

  const choose = (opt) => {
    if (selected) return;
    setSelected(opt);
    if (opt === current.correct) setScore((s) => s + 1);
  };

  const advance = () => {
    if (isLast) {
      onFinish(score + (selected === current.correct && score === 0 ? 0 : 0));
      onFinish(score);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  return (
    <div style={{ height: "100%", background: PAPER, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "18px 20px 10px" }}>
        <div style={{ height: 6, background: "#E9E3D3", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((index + 1) / quiz.length) * 100}%`, background: GOLD, transition: "width .3s" }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: "10px 22px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 13, color: "#8B8474", marginTop: 12 }}>{t("question")}</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 30, color: NAVY, fontWeight: 700, margin: "10px 0 26px" }}>
          {current.word.word}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {current.options.map((opt) => {
            let bg = "#FFFFFF";
            let border = "#E9E3D3";
            let color = NAVY;
            if (selected) {
              if (opt === current.correct) {
                bg = "rgba(47,111,98,0.12)";
                border = TEAL;
                color = TEAL;
              } else if (opt === selected) {
                bg = "rgba(193,69,61,0.1)";
                border = CORAL;
                color = CORAL;
              }
            }
            return (
              <div
                key={opt}
                onClick={() => choose(opt)}
                style={{
                  padding: "13px 16px",
                  borderRadius: 12,
                  border: `1.5px solid ${border}`,
                  background: bg,
                  color,
                  fontSize: 15.5,
                  fontWeight: 500,
                  cursor: selected ? "default" : "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {opt}
                {selected && opt === current.correct && <Check size={18} color={TEAL} />}
                {selected && opt === selected && opt !== current.correct && <X size={18} color={CORAL} />}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "12px 22px 24px" }}>
        <button
          onClick={advance}
          disabled={!selected}
          style={{
            width: "100%",
            background: selected ? NAVY : "#D8D2C2",
            color: PAPER,
            border: "none",
            borderRadius: 14,
            padding: "14px 0",
            fontSize: 15.5,
            fontWeight: 700,
            cursor: selected ? "pointer" : "default",
          }}
        >
          {isLast ? t("finish") : t("next")}
        </button>
      </div>
    </div>
  );
}

function ResultScreen({ score, total, onHome, onRetry, t }) {
  return (
    <div style={{ height: "100%", background: NAVY, color: PAPER, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, textAlign: "center" }}>
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "rgba(200,155,60,0.15)",
          border: `2px solid ${GOLD}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 22,
        }}
      >
        <Flame size={40} color={GOLD} fill={GOLD} />
      </div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, margin: "0 0 6px" }}>{t("resultTitle")}</h2>
      <p style={{ color: "#C9CEDA", fontSize: 15, margin: "0 0 4px" }}>
        {t("scoreLabel")}: {score}/{total}
      </p>
      <p style={{ color: GOLD, fontSize: 13.5, margin: "0 0 30px" }}>{t("streakUp")}</p>

      <button
        onClick={onHome}
        style={{ width: "100%", background: GOLD, color: NAVY, border: "none", borderRadius: 14, padding: "14px 0", fontSize: 15.5, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}
      >
        {t("backHome")}
      </button>
      <button
        onClick={onRetry}
        style={{ width: "100%", background: "transparent", color: PAPER, border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: "13px 0", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        <RotateCcw size={16} /> {t("retry")}
      </button>
    </div>
  );
}

function SettingsScreen({ uiLang, setUiLang, targetLang, setTargetLang, reminderOn, setReminderOn, reminderTime, setReminderTime, t }) {
  const [notice, setNotice] = useState("");

  const sendTest = () => {
    if (!("Notification" in window)) {
      setNotice(t("notifDenied"));
      return;
    }
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        new Notification(T.appName[uiLang], { body: t("wordOfDay") });
        setNotice(t("notifSent"));
      } else {
        setNotice(t("notifDenied"));
      }
    });
  };

  return (
    <div style={{ height: "100%", background: PAPER, overflowY: "auto", padding: "24px 20px" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: NAVY, margin: "0 0 20px" }}>{t("settings")}</h2>

      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 13, color: "#8B8474", marginBottom: 8 }}>{t("interfaceLang")}</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["tr", "en"].map((l) => (
            <div
              key={l}
              onClick={() => setUiLang(l)}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px 0",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                background: uiLang === l ? NAVY : "#FFFFFF",
                color: uiLang === l ? PAPER : NAVY,
                border: "1px solid #E9E3D3",
              }}
            >
              {l === "tr" ? "Türkçe" : "English"}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 13, color: "#8B8474", marginBottom: 8 }}>{t("targetLangLabel")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Object.entries(LANGUAGES).map(([code, lang]) => (
            <div
              key={code}
              onClick={() => setTargetLang(code)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                background: targetLang === code ? "#FFFFFF" : "transparent",
                border: targetLang === code ? `1.5px solid ${GOLD}` : "1.5px solid transparent",
                cursor: "pointer",
              }}
            >
              <FlagChip stripes={lang.stripes} size={26} />
              <span style={{ fontSize: 14.5, color: NAVY, fontWeight: 500 }}>{lang.name[uiLang]}</span>
              {targetLang === code && <Check size={16} color={GOLD} style={{ marginLeft: "auto" }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14.5, color: NAVY, fontWeight: 600 }}>
            <Bell size={17} /> {t("reminder")}
          </div>
          <div
            onClick={() => setReminderOn((v) => !v)}
            style={{
              width: 44,
              height: 26,
              borderRadius: 14,
              background: reminderOn ? TEAL : "#D8D2C2",
              position: "relative",
              cursor: "pointer",
              transition: "background .2s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: reminderOn ? 21 : 3,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#FFFFFF",
                transition: "left .2s",
              }}
            />
          </div>
        </div>

        {reminderOn && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 13.5, color: "#5B5748" }}>{t("reminderTime")}</span>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              style={{ border: "1px solid #E9E3D3", borderRadius: 8, padding: "6px 10px", fontSize: 14 }}
            />
          </div>
        )}

        <p style={{ fontSize: 12, color: "#8B8474", lineHeight: 1.5, margin: "0 0 12px" }}>{t("reminderNote")}</p>

        {reminderOn && (
          <button
            onClick={sendTest}
            style={{ background: "#FFFFFF", border: "1px solid #E9E3D3", borderRadius: 10, padding: "9px 14px", fontSize: 13.5, color: NAVY, cursor: "pointer" }}
          >
            {t("testNotif")}
          </button>
        )}
        {notice && <div style={{ fontSize: 12.5, color: TEAL, marginTop: 8 }}>{notice}</div>}
      </div>
    </div>
  );
}

export default function DailyLanguageApp() {
  const [onboarded, setOnboarded] = useState(false);
  const [uiLang, setUiLang] = useState("tr");
  const [targetLang, setTargetLang] = useState("es");
  const [screen, setScreen] = useState("home");
  const [streak, setStreak] = useState(3);
  const [learnedCount, setLearnedCount] = useState(12);
  const [lastScore, setLastScore] = useState({ score: 0, total: 0 });
  const [reminderOn, setReminderOn] = useState(false);
  const [reminderTime, setReminderTime] = useState("20:00");

  const t = useT(uiLang);

  const finishPractice = (score) => {
    setLastScore({ score, total: LANGUAGES[targetLang].words.length });
    if (score >= Math.ceil(LANGUAGES[targetLang].words.length * 0.5)) {
      setStreak((s) => s + 1);
    }
    setLearnedCount((c) => c + score);
    setScreen("result");
  };

  let body;
  if (!onboarded) {
    body = (
      <OnboardingScreen
        uiLang={uiLang}
        setUiLang={setUiLang}
        targetLang={targetLang}
        setTargetLang={setTargetLang}
        onStart={() => setOnboarded(true)}
        t={t}
      />
    );
  } else if (screen === "home") {
    body = (
      <HomeScreen
        uiLang={uiLang}
        targetLang={targetLang}
        streak={streak}
        learnedCount={learnedCount}
        onStartPractice={() => setScreen("practice")}
        t={t}
      />
    );
  } else if (screen === "practice") {
    body = <PracticeScreen uiLang={uiLang} targetLang={targetLang} onFinish={finishPractice} t={t} />;
  } else if (screen === "result") {
    body = (
      <ResultScreen
        score={lastScore.score}
        total={lastScore.total}
        onHome={() => setScreen("home")}
        onRetry={() => setScreen("practice")}
        t={t}
      />
    );
  } else if (screen === "settings") {
    body = (
      <SettingsScreen
        uiLang={uiLang}
        setUiLang={setUiLang}
        targetLang={targetLang}
        setTargetLang={setTargetLang}
        reminderOn={reminderOn}
        setReminderOn={setReminderOn}
        reminderTime={reminderTime}
        setReminderTime={setReminderTime}
        t={t}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#0F0F0F",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 0px; }`}</style>

      <div style={{ width: 390, height: 780, background: "#000", borderRadius: 46, padding: 12, boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ width: "100%", height: "100%", background: PAPER, borderRadius: 34, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
          <div style={{ height: 44, flexShrink: 0, background: onboarded && screen !== "result" ? PAPER : NAVY, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", fontSize: 13, fontWeight: 600, color: onboarded && screen !== "result" ? NAVY : PAPER }}>
            <span>9:41</span>
            <span style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)", width: 90, height: 24, background: "#000", borderRadius: 16 }} />
            <span>100%</span>
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>{body}</div>

          {onboarded && screen !== "result" && <BottomNav screen={screen} setScreen={setScreen} t={t} />}
        </div>
      </div>
    </div>
  );
}
