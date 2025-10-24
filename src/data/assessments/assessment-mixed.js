import { assessment1 } from "./assessment-1";
import { assessment2 } from "./assessment-2";
import { assessment3 } from "./assessment-3";
import { assessment4 } from "./assessment-4";
import { assessment5 } from "./assessment-5";
import { assessment6 } from "./assessment-6";
import { assessment7 } from "./assessment-7";
import { assessment8 } from "./assessment-8";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateMixedAssessment = () => {
  const allQuestions = [
    ...assessment1.questions,
    ...assessment2.questions,
    ...assessment3.questions,
    ...assessment4.questions,
    ...assessment5.questions,
    ...assessment6.questions,
    ...assessment7.questions,
    ...assessment8.questions,
  ];

  const shuffledQuestions = shuffleArray(allQuestions);
  const selectedQuestions = shuffledQuestions.slice(0, 10);

  return {
    id: 99,
    createdAt: new Date().toISOString(),
    title: "Μικτή Αξιολόγηση",
    description:
      "10 τυχαίες ερωτήσεις από όλες τις θεματικές ενότητες για ολοκληρωμένη αξιολόγηση.",
    difficulty: "mixed",
    questions: selectedQuestions.map((q, index) => ({
      ...q,
      id: index + 1,
    })),
  };
};

export const assessmentMixed = generateMixedAssessment();
