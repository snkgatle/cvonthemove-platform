import express from 'express';
import { CVController } from '../controllers/CVController';

const router = express.Router();

// Entity Details
router.get('/entity-details', CVController.getEntityDetails);
router.post('/entity-details', CVController.upsertEntityDetails);
// Note: DELETE/UPDATE can be handled by POST upsert or separate endpoints if strict REST is needed.
// Prompt asked for get,post,delete,update. I'll add them mapping to relevant logic.
router.put('/entity-details', CVController.upsertEntityDetails); // Re-use upsert

// Addresses
router.get('/addresses', CVController.getAddresses);
router.post('/addresses', CVController.addAddress);
router.put('/addresses', CVController.updateAddress);
router.delete('/addresses', CVController.deleteAddress);

// Educations
router.get('/educations', CVController.getEducations);
router.post('/educations', CVController.addEducation);
router.put('/educations', CVController.updateEducation);
router.delete('/educations', CVController.deleteEducation);

// Work Experiences
router.get('/work-experiences', CVController.getWorkExperiences);
router.post('/work-experiences', CVController.addWorkExperience);
router.put('/work-experiences', CVController.updateWorkExperience);
router.delete('/work-experiences', CVController.deleteWorkExperience);

// Skills
router.get('/skills', CVController.getSkills);
router.post('/skills', CVController.addSkill);
router.put('/skills', CVController.updateSkill);
router.delete('/skills', CVController.deleteSkill);

// References
router.get('/references', CVController.getReferences);
router.post('/references', CVController.addReference);
router.put('/references', CVController.updateReference);
router.delete('/references', CVController.deleteReference);

// CV Builder
router.get('/cv-builder', CVController.getCVBuilder);
router.post('/cv-builder', CVController.getCVBuilder); // Post might be used to sync? But GET is cleaner for fetch.
// Keeping it simple.

export default router;
