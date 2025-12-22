<instruction>You are an expert software engineer. You are working on a WIP branch. Please run `git status` and `git diff` to understand the changes and the current state of the code. Analyze the workspace context and complete the mission brief.</instruction>
<workspace_context>
<artifacts>
--- CURRENT TASK CHECKLIST ---
# Task: Database Integration and API Expansion

- [/] Database Setup <!-- id: 12 -->
    - [x] Check `.gitignore` for `.env` <!-- id: 13 -->
    - [/] Install Prisma (`prisma`, `@prisma/client`) <!-- id: 14 -->
    - [ ] Initialize Prisma (`npx prisma init`) <!-- id: 15 -->
    - [ ] Configure `datasources` in `schema.prisma` <!-- id: 16 -->
    - [ ] Create `.env` file with connection string <!-- id: 17 -->
- [ ] Schema Design <!-- id: 18 -->
    - [ ] Define `EntityDetails` (PersonalDetails) model <!-- id: 19 -->
    - [ ] Define `Address` model <!-- id: 20 -->
    - [ ] Define `Education` model <!-- id: 21 -->
    - [ ] Define `WorkExperience` model <!-- id: 22 -->
    - [ ] Define `Skill` model <!-- id: 23 -->
    - [ ] Define `Reference` model <!-- id: 24 -->
    - [ ] Run `prisma generate` and `prisma db push` <!-- id: 25 -->
- [ ] API Implementation <!-- id: 26 -->
    - [ ] Implement `EntityDetails` Controller & Service <!-- id: 27 -->
    - [ ] Implement `Address` Controller & Service <!-- id: 28 -->
    - [ ] Implement `Education` Controller & Service <!-- id: 29 -->
    - [ ] Implement `WorkExperience` Controller & Service <!-- id: 30 -->
    - [ ] Implement `Skill` Controller & Service <!-- id: 31 -->
    - [ ] Implement `Reference` Controller & Service <!-- id: 32 -->
    - [ ] Implement `CVBuilder` Controller (Aggregation) <!-- id: 33 -->
- [ ] Routes Configuration <!-- id: 34 -->
    - [ ] Register all new routes in `app.ts` <!-- id: 35 -->
- [ ] Verification <!-- id: 36 -->
    - [ ] Test endpoints (Manual/Script) <!-- id: 37 -->

--- IMPLEMENTATION PLAN ---
# Database Integration and API Expansion

The goal is to integrate Prisma with a PostgreSQL database and implement a set of CRUD endpoints for CV management, culminating in a `cv-builder` aggregation endpoint.

## User Review Required
> [!IMPORTANT]
> **Database Credentials**: The connection string will be securely stored in a `.env` file which is already git-ignored.
> **Schema Design**: Please review the proposed Prisma schema below. It assumes `EntityDetails` is the central record for a user's CV.

## Proposed Changes

### Database Setup
#### [NEW] [schema.prisma](file:///e:/Projects/CV%20On%20The%20Move/cvonthemove-api/prisma/schema.prisma)
Define the following models:
- **EntityDetails**: Stores personal information (fullName, email, etc.). Acts as the root relation.
- **Address**: Linked to EntityDetails. (Note: User asked for 'addresses' array, implying multiple or just a list management).
- **Education**: Linked to EntityDetails.
- **WorkExperience**: Linked to EntityDetails.
- **Skill**: Linked to EntityDetails.
- **Reference**: Linked to EntityDetails.

**Draft Schema:**
```prisma
model EntityDetails {
  id              String           @id @default(uuid())
  fullName        String
  email           String           @unique
  phone           String?
  location        String?
  summary         String?
  linkedinUrl     String?
  idNumber        String?
  languages       String[]
  criminalRecord  String?
  maritalStatus   String?
  
  addresses       Address[]
  educations      Education[]
  workExperiences WorkExperience[]
  skills          Skill[]
  references      Reference[]

  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}

model Address {
  id              String        @id @default(uuid())
  line1           String
  line2           String?
  city            String
  zipCode         String?
  country         String
  entityDetailsId String
  entityDetails   EntityDetails @relation(fields: [entityDetailsId], references: [id])
}

// ... Education, WorkExperience, Skill, Reference models similarly defined ...
```

### API Implementation
#### [NEW] Controllers & Services
Create the following structure under `src/controllers` and `src/services`:
- `EntityDetailsController` / `EntityDetailsService`
- `AddressController` / `AddressService`
- `EducationController` / `EducationService`
- ... (others)
- `CVBuilderController`: Fetches `EntityDetails` and includes all relations.

#### [NEW] Routes
- `src/routes/entityDetails.ts`
- `src/routes/addresses.ts`
- `src/routes/educations.ts`
- ... (others)
- `src/routes/cvBuilder.ts`

### Configuration
#### [MODIFY] [app.ts](file:///e:/Projects/CV%20On%20The%20Move/cvonthemove-api/src/app.ts)
- Register all new routes.

## Verification Plan

### Automated Tests
- Run `prisma generate` to ensure schema validity.
- Start server and manually curl the endpoints or use a test script to:
    1. Create Entity Details.
    2. Add Education/Skills.
    3. Call `/cv-builder` and verify the JSON output structure matches requirements.
</artifacts>
</workspace_context>
<mission_brief>[Describe your task here...]</mission_brief>