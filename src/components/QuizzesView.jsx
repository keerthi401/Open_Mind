import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Lightbulb, 
  Sparkles, 
  Timer, 
  Flame,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export const QuizzesView = ({ 
  topics, 
  currentTopic, 
  onSelectTopic, 
  onNavigateLearn 
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState(currentTopic?.id || topics[0]?.id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const activeTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];
  const questions = activeTopic.quiz || [];
  const currentQ = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswersHistory((prev) => [
      ...prev,
      {
        question: currentQ.question,
        chosenIndex: selectedAnswer,
        correctIndex: currentQ.correctIndex,
        isCorrect,
        explanation: currentQ.explanation
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setIsQuizCompleted(true);
      // Fire confetti for celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnswersHistory([]);
    setIsQuizCompleted(false);
    setShowHint(false);
  };

  const percentageScore = Math.round((score / (questions.length || 1)) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto">
      {/* Top Header & Topic Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
            <Award className="w-3.5 h-3.5" />
            Active Recall & Diagnostic Assessment
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
            Interactive Diagnostic Quizzes
          </h1>
          <p className="text-xs text-slate-500">
            Reinforce conceptual memory through scenario-based questioning with visual explanations.
          </p>
        </div>

        {/* Topic Selector for Quiz */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">Quiz Subject:</label>
          <select
            value={selectedTopicId}
            onChange={(e) => {
              setSelectedTopicId(e.target.value);
              handleResetQuiz();
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!isQuizCompleted ? (
        /* ACTIVE QUIZ RUNNER */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress bar and question indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-slate-500 font-semibold">
                Current Score: <strong className="text-slate-900">{score}</strong> / {questions.length}
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Hint Accordion / Button */}
          {currentQ.hint && (
            <div>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700 font-semibold py-1 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHint ? "Hide Pedagogical Hint" : "Need a Hint?"}
              </button>

              {showHint && (
                <div className="mt-2 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-in fade-in duration-150">
                  <span className="font-bold">Hint: </span>
                  {currentQ.hint}
                </div>
              )}
            </div>
          )}

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrectAnswer = isAnswerSubmitted && idx === currentQ.correctIndex;
              const isWrongSelection = isAnswerSubmitted && isSelected && !isCorrectAnswer;

              let cardStyle = "border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50";
              if (isSelected && !isAnswerSubmitted) {
                cardStyle = "border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20";
              }
              if (isCorrectAnswer) {
                cardStyle = "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20";
              }
              if (isWrongSelection) {
                cardStyle = "border-rose-500 bg-rose-50 text-rose-900";
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${cardStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isCorrectAnswer
                          ? 'bg-emerald-600 text-white'
                          : isWrongSelection
                          ? 'bg-rose-600 text-white'
                          : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {option}
                    </span>
                  </div>

                  {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {isWrongSelection && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Explanation Banner (Visible after submission) */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 animate-in fade-in duration-200 ${
                selectedAnswer === currentQ.correctIndex
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/80 border-rose-200 text-rose-900'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5">
                {selectedAnswer === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct Analysis!
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" /> Conceptual Misconception:
                  </>
                )}
              </div>
              <p className="text-[11px] text-slate-700 pt-1">
                <strong>Why:</strong> {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Quiz Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedAnswer === null}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Final Score"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* QUIZ SCORE COMPLETION REPORT */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-center animate-in zoom-in-95 duration-200">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/30">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {percentageScore >= 80 ? "Mastery Achieved! 🏆" : percentageScore >= 60 ? "Solid Progress! 👏" : "Review Recommended 💡"}
            </h2>

            <p className="text-xs text-slate-500">
              You answered <strong className="text-slate-800">{score}</strong> out of <strong className="text-slate-800">{questions.length}</strong> questions correctly for <strong>{activeTopic.title}</strong>.
            </p>

            <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {percentageScore}% Accuracy
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>

            <button
              onClick={() => onNavigateLearn(activeTopic)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4" /> Review Visual Studio
            </button>
          </div>

          {/* Detailed Question by Question Review */}
          <div className="text-left space-y-4 pt-6 border-t border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">
              Detailed Question Analysis ({answersHistory.length})
            </h3>

            <div className="space-y-3">
              {answersHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                    item.isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{idx + 1}. {item.question}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                    <strong>Explanation:</strong> {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
