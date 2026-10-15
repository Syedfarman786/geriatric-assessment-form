import { describe, expect, it } from 'vitest';
import { assessmentSchema } from './schema';

const validAssessment = {
  mrn: 'MRN-004821',
  patientName: 'Sushila Deshpande',
  dateOfBirth: '1966-08-07',
  assessmentDate: '2026-08-07',
  mobility: 'cane',
  barthelIndex: 80,
  medicationCount: 3,
  pharmacistReviewRequested: false,
  followUpDate: '2026-09-04',
  consentObtained: true,
};

describe('assessmentSchema', () => {
  it('accepts a patient who is exactly 60 years old', () => {
    const result = assessmentSchema.safeParse(validAssessment);

    expect(result.success).toBe(true);
  });

  it('rejects a patient who is one day younger than 60', () => {
    const result = assessmentSchema.safeParse({
      ...validAssessment,
      dateOfBirth: '1966-08-08',
    });

    expect(result.success).toBe(false);

    // if (!result.success) {
    //   expect(
    //     result.error.issues.some(
    //       (issue) =>
    //         issue.path[0] === 'dateOfBirth' &&
    //         issue.message === 'This pathway is for patients aged 60 and over'
    //     )
    //   ).toBe(true);
    // }
    expect(
      result.success
        ? []
        : result.error.issues.map((issue) => ({
            path: issue.path[0],
            message: issue.message,
          }))
    ).toContainEqual({
      path: 'dateOfBirth',
      message: 'This pathway is for patients aged 60 and over',
    });
  });
});
