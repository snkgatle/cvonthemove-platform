# CVOnTheMove Platform

## Project Overview
CVOnTheMove is a comprehensive CV builder application that allows users to create, manage, and download professional resumes. It features an interactive AI assistant to guide users through the process and offers multiple customizable templates.

## Tech Stack

### Frontend (cvonthemove-ui)
*   **Core:** React 19, TypeScript, Vite
*   **State Management:** Zustand
*   **Styling:** Tailwind CSS, Framer Motion
*   **Forms:** React Hook Form, Zod
*   **Utilities:** Axios, Lucide React

### Backend (cvonthemove-api)
*   **Core:** Node.js, Express
*   **Database:** PostgreSQL, Prisma ORM
*   **PDF Generation:** Puppeteer
*   **AI:** Google Generative AI (Gemini)
*   **Authentication:** JWT, Bcrypt
*   **Documentation:** Swagger/OpenAPI

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm
*   PostgreSQL

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd cvonthemove
    ```

2.  **Setup Backend:**
    ```bash
    cd cvonthemove-api
    npm install
    ```
    *   Create a `.env` file based on `.env.example` and configure `DATABASE_URL`, `JWT_SECRET`, etc.
    *   Initialize the database:
    ```bash
    npm run prisma:push
    ```
    *   Start the server:
    ```bash
    npm run dev
    ```

3.  **Setup Frontend:**
    ```bash
    cd ../cvonthemove-ui
    npm install
    ```
    *   Start the development server:
    ```bash
    npm run dev
    ```

4.  **Access the Application:**
    *   Frontend: `http://localhost:5173`
    *   Backend API: `http://localhost:3000`
    *   API Documentation: `http://localhost:3000/docs`

## Architecture
The application follows a client-server architecture.
*   **Frontend:** A Single Page Application (SPA) built with React. It communicates with the backend via RESTful APIs using Axios. It handles user interactions, form management, and real-time validation.
*   **Backend:** A REST API built with Express. It manages data persistence using Prisma and PostgreSQL. It handles authentication, PDF generation logic using Puppeteer, and integrates with AI services for content suggestions.

## File Structure

```
cvonthemove/
├── cvonthemove-api/         # Backend Express Application
│   ├── src/
│   │   ├── config/          # Configuration (DB, Swagger)
│   │   ├── features/        # Feature-based modules (Auth, CV Builder)
│   │   │   ├── cv-builder/
│   │   │   │   ├── controllers/
│   │   │   │   ├── routes/
│   │   │   │   ├── services/
│   │   │   │   └── ...
│   │   ├── middleware/      # Custom middleware (Auth, Validation)
│   │   └── ...
│   └── ...
├── cvonthemove-ui/          # Frontend React Application
│   ├── src/
│   │   ├── components/      # Shared UI components
│   │   ├── features/        # Feature-based modules
│   │   │   ├── auth/
│   │   │   ├── cv-builder/  # Core CV building logic & components
│   │   │   └── ...
│   │   ├── services/        # API service calls
│   │   └── ...
│   └── ...
└── README.md                # Project Documentation
```
