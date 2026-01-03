import express from 'express';
import { validate } from '../../../middleware/validateResource';
import { authenticate } from '../../../middleware/authenticate';
import {
    EntityDetailsSchema,
    AddressSchema,
    EducationSchema,
    WorkExperienceSchema,
    SkillSchema,
    ReferenceSchema,
    CreateCVSchema
} from '../schemas/cvSchemas';

import { CVBuilderController } from '../controllers/CVBuilderController';
import { EntityDetailsController } from '../controllers/EntityDetailsController';
import { AddressController } from '../controllers/AddressController';
import { EducationController } from '../controllers/EducationController';
import { WorkExperienceController } from '../controllers/WorkExperienceController';
import { SkillController } from '../controllers/SkillController';
import { ReferenceController } from '../controllers/ReferenceController';
import { generatePdfController } from '../controllers/pdf.controller';

const router = express.Router();

/**
 * @openapi
 * /generate-pdf:
 *   post:
 *     summary: Generate PDF of CV
 *     tags: [CV Builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [templateId, data]
 *             properties:
 *               templateId:
 *                 type: string
 *                 enum: [classic, modern, minimalist, creative, professional]
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.post('/generate-pdf', generatePdfController);

/**
 * @openapi
 * /cv-builder/{cvId}:
 *   get:
 *     summary: Get full CV data
 *     tags: [CV Builder]
 *     parameters:
 *       - in: path
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Full CV data including all relations
 *       404:
 *         description: CV not found
 */
router.get('/cv-builder/my-cv', authenticate, CVBuilderController.getCVByUserId);
router.get('/cv-builder/:cvId', CVBuilderController.getCV);

/**
 * @openapi
 * /cv-builder:
 *   post:
 *     summary: Create or Update full CV
 *     tags: [CV Builder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personalDetails:
 *                 type: object
 *               addresses:
 *                 type: array
 *               educations:
 *                 type: array
 *               workExperiences:
 *                 type: array
 *               skills:
 *                 type: array
 *               references:
 *                 type: array
 *     responses:
 *       201:
 *         description: CV created successfully
 */
router.post('/cv-builder', authenticate, validate(CreateCVSchema), CVBuilderController.createCV);

/**
 * @openapi
 * /cv-builder/{cvId}:
 *   put:
 *     summary: Update full CV
 *     tags: [CV Builder]
 *     parameters:
 *       - in: path
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personalDetails:
 *                 type: object
 *               addresses:
 *                 type: array
 *               educations:
 *                 type: array
 *               workExperiences:
 *                 type: array
 *               skills:
 *                 type: array
 *               references:
 *                 type: array
 *     responses:
 *       200:
 *         description: CV updated successfully
 */
router.put('/cv-builder/:cvId', authenticate, validate(CreateCVSchema), CVBuilderController.updateCV);

/**
 * @openapi
 * /entity-details:
 *   get:
 *     summary: Get Entity Details
 *     tags: [Entity Details]
 *     parameters:
 *       - in: query
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entity details found
 *   post:
 *     summary: Upsert Entity Details
 *     tags: [Entity Details]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email]
 *             properties:
 *               cvId:
 *                 type: string
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entity details upated
 *   delete:
 *     summary: Delete Entity Details
 *     tags: [Entity Details]
 *     parameters:
 *       - in: query
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.get('/entity-details', EntityDetailsController.get);
router.post('/entity-details', validate(EntityDetailsSchema), EntityDetailsController.upsert); // Upsert handles create/update
router.delete('/entity-details', authenticate, EntityDetailsController.delete);

/**
 * @openapi
 * /addresses:
 *   get:
 *     summary: List Addresses
 *     tags: [Addresses]
 *     parameters:
 *       - in: query
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of addresses
 *   post:
 *     summary: Add Address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [line1, city, postalCode, country, cvId]
 *             properties:
 *               cvId:
 *                 type: string
 *               line1:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address added
 */
router.get('/addresses', AddressController.list);
router.post('/addresses', validate(AddressSchema), AddressController.add);

/**
 * @openapi
 * /addresses/{id}:
 *   put:
 *     summary: Update Address
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete Address
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */

router.put('/addresses/:id', authenticate, AddressController.update); // Can also validate(AddressSchema.partial())
router.delete('/addresses/:id', authenticate, AddressController.delete);


/**
 * @openapi
 * /educations:
 *   get:
 *     summary: List Educations
 *     tags: [Education]
 *     parameters:
 *       - in: query
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of educations
 *   post:
 *     summary: Add Education
 *     tags: [Education]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [institution, degree, fieldOfStudy, startDate, cvId]
 *             properties:
 *               cvId:
 *                 type: string
 *               institution:
 *                 type: string
 *               degree:
 *                 type: string
 *     responses:
 *       200:
 *         description: Education added
 */
router.get('/educations', EducationController.list);
router.post('/educations', validate(EducationSchema), EducationController.add);

/**
 * @openapi
 * /educations/{id}:
 *   put:
 *     summary: Update Education
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete Education
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.put('/educations/:id', authenticate, EducationController.update);
router.delete('/educations/:id', authenticate, EducationController.delete);

/**
 * @openapi
 * /work-experiences:
 *   get:
 *     summary: List Work Experiences
 *     tags: [Work Experience]
 *     parameters:
 *       - in: query
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of work experiences
 *   post:
 *     summary: Add Work Experience
 *     tags: [Work Experience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [company, position, description, startDate, cvId]
 *             properties:
 *               cvId:
 *                 type: string
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Work experience added
 */
router.get('/work-experiences', WorkExperienceController.list);
router.post('/work-experiences', validate(WorkExperienceSchema), WorkExperienceController.add);

/**
 * @openapi
 * /work-experiences/{id}:
 *   put:
 *     summary: Update Work Experience
 *     tags: [Work Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete Work Experience
 *     tags: [Work Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.put('/work-experiences/:id', authenticate, WorkExperienceController.update);
router.delete('/work-experiences/:id', authenticate, WorkExperienceController.delete);

/**
 * @openapi
 * /skills:
 *   get:
 *     summary: List Skills
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of skills
 *   post:
 *     summary: Add Skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, level, cvId]
 *             properties:
 *               cvId:
 *                 type: string
 *               name:
 *                 type: string
 *               level:
 *                 type: string
 *     responses:
 *       200:
 *         description: Skill added
 */
router.get('/skills', SkillController.list);
router.post('/skills', validate(SkillSchema), SkillController.add);

/**
 * @openapi
 * /skills/{id}:
 *   put:
 *     summary: Update Skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete Skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.put('/skills/:id', authenticate, SkillController.update);
router.delete('/skills/:id', authenticate, SkillController.delete);

/**
 * @openapi
 * /references:
 *   get:
 *     summary: List References
 *     tags: [References]
 *     parameters:
 *       - in: query
 *         name: cvId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of references
 *   post:
 *     summary: Add Reference
 *     tags: [References]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, relationship, cvId]
 *             properties:
 *               cvId:
 *                 type: string
 *               name:
 *                 type: string
 *               relationship:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reference added
 */
router.get('/references', ReferenceController.list);
router.post('/references', validate(ReferenceSchema), ReferenceController.add);

/**
 * @openapi
 * /references/{id}:
 *   put:
 *     summary: Update Reference
 *     tags: [References]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete Reference
 *     tags: [References]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.put('/references/:id', authenticate, ReferenceController.update);
router.delete('/references/:id', authenticate, ReferenceController.delete);


export default router;
