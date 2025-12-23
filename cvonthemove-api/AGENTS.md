# Agent Instructions: CV Builder Application

## Project Overview
This is a full-stack application that allows users to create, edit, and download professional CVs.
- **Journey 1:** Create (Multi-step form -> Template Selection -> Download).
- **Journey 2:** Edit (Fetch existing ID -> Pre-populate Form -> Update/Download).

## Tech Stack
- **Frontend:** React (Vite), TypeScript, Tailwind CSS.
- **State Management:** Zustand (for multi-page form persistence).
- **Forms:** React Hook Form + Zod (Validation).
- **Backend:** Node.js, Express.js, TypeScript.
- **Database:** PostgreSQL (via Prisma or Drizzle).
- **PDF Generation:** @react-pdf/renderer (Frontend) or Puppeteer (Backend).

## Architecture & Standards
### 📂 Folder Structure
We follow a **Feature-Based Folder Structure**. 
- All logic related to CV creation lives in `src/features/cv-builder`.
- Shared UI components live in `src/components/common`.

### 🏛️ Backend Pattern
We use a **Layered Architecture**:
1. **Routes:** Define endpoints and attach validation middleware.
2. **Controllers:** Handle req/res and call services.
3. **Services:** Contain business logic and database queries.

### 📜 Coding Standards
- **Naming:** PascalCase for React components; camelCase for functions/variables.
- **Exports:** Prefer **Named Exports** over Default Exports.
- **Types:** Strict TypeScript. No `any`. Use Zod to infer types from schemas.
- **State:** Use the Zustand store `useCVStore` to manage data between the 'Details' and 'Template' pages.

## Development Commands
- `npm run dev`: Starts both frontend and backend in development mode.
- `npm run lint`: Runs ESLint and Prettier checks.