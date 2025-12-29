import { describe, it, expect } from 'vitest';
import {
  EntityDetailsSchema,
  AddressSchema,
  EducationSchema,
  WorkExperienceSchema,
  SkillSchema,
  ReferenceSchema,
} from './types';

describe('CV Builder Zod Schemas', () => {
  describe('EntityDetailsSchema', () => {
    it('should validate valid entity details', () => {
      const validData = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        location: 'New York, NY',
        summary: 'Experienced developer',
        languages: ['English', 'Spanish'],
        idNumber: '1234567890123',
        maritalStatus: 'Single',
      };
      const result = EntityDetailsSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail with invalid email', () => {
      const invalidData = {
        fullName: 'John Doe',
        email: 'invalid-email',
        phone: '1234567890',
        location: 'New York, NY',
        summary: 'Experienced developer',
        languages: ['English'],
      };
      const result = EntityDetailsSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });

    it('should allow optional fields to be missing or undefined', () => {
       const validData = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        location: 'New York, NY',
        summary: 'Experienced developer',
        languages: ['English'],
        idNumber: '1234567890123',
        maritalStatus: 'Single',
      };
      const result = EntityDetailsSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('AddressSchema', () => {
      it('should validate a valid address', () => {
          const validAddress = {
              line1: '123 Main St',
              city: 'Metropolis',
              postalCode: '10001',
              country: 'USA'
          };
          const result = AddressSchema.safeParse(validAddress);
          expect(result.success).toBe(true);
      });

      it('should require required fields', () => {
          const invalidAddress = {
              line1: '123 Main St',
              // missing city, postalCode, country
          };
          const result = AddressSchema.safeParse(invalidAddress);
          expect(result.success).toBe(false);
      });
  });

  describe('EducationSchema', () => {
      it('should validate valid education', () => {
          const validEducation = {
              institution: 'University of Tech',
              degree: 'BSc Computer Science',
              fieldOfStudy: 'Computer Science',
              startDate: '2010-09-01',
              current: false,
          };
          const result = EducationSchema.safeParse(validEducation);
          expect(result.success).toBe(true);
      });
  });

  describe('WorkExperienceSchema', () => {
      it('should validate valid work experience', () => {
          const validExperience = {
              company: 'Tech Corp',
              position: 'Senior Developer',
              description: 'Developed cool stuff',
              startDate: '2015-01-01',
              current: true,
          };
          const result = WorkExperienceSchema.safeParse(validExperience);
          expect(result.success).toBe(true);
      });
  });

  describe('SkillSchema', () => {
      it('should validate valid skill', () => {
          const validSkill = {
              name: 'React',
              level: 'Expert'
          };
          const result = SkillSchema.safeParse(validSkill);
          expect(result.success).toBe(true);
      });
  });

   describe('ReferenceSchema', () => {
      it('should validate valid reference', () => {
          const validReference = {
              name: 'Jane Doe',
              relationship: 'Manager',
              email: 'jane@example.com'
          };
          const result = ReferenceSchema.safeParse(validReference);
          expect(result.success).toBe(true);
      });
  });
});
