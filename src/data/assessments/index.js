import { assessment1 } from "./assessment-1";
import { assessment2 } from "./assessment-2";
import { generateMixedAssessment } from "./assessment-mixed";
import { assessment4 } from "./assessment-4";
import { assessment5 } from "./assessment-5";
import { assessment6 } from "./assessment-6";

export const assessments = [
  assessment1,
  assessment2,
  assessment4,
  assessment5,
  assessment6,
  generateMixedAssessment(),
];

export const getAssessmentById = (id) => {
  if (id === 7) {
    return generateMixedAssessment();
  }
  return assessments.find((assessment) => assessment.id === id);
};

export const getAllAssessments = () => {
  return assessments;
};

