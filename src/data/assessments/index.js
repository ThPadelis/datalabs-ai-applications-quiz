import { assessment1 } from "./assessment-1";
import { assessment2 } from "./assessment-2";
import { assessment3 } from "./assessment-3";
import { assessment4 } from "./assessment-4";
import { assessment5 } from "./assessment-5";
import { assessment6 } from "./assessment-6";
import { assessment7 } from "./assessment-7";
import { assessment8 } from "./assessment-8";
import { generateMixedAssessment } from "./assessment-mixed";

export const assessments = [
  assessment1,
  assessment2,
  assessment3,
  assessment4,
  assessment5,
  assessment6,
  assessment7,
  assessment8,
  generateMixedAssessment(),
];

export const getAssessmentById = (id) => {
  if (id === 99) {
    return generateMixedAssessment();
  }
  return assessments.find((assessment) => assessment.id === id);
};

export const getAllAssessments = () => {
  return assessments;
};
