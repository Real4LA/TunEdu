# TunEdu - Modern Learning Platform

TunEdu is a modern, feature-rich e-learning platform built with Next.js and designed for the Tunisian curriculum. It provides students with an interactive and engaging way to access lessons, exercises, and AI-powered assistance.
**Demo Video:** [Watch the demo on YouTube](https://youtu.be/3eMM4jyOY30)

## Features

- **Dynamic Curriculum Browsing:** Explore subjects across different educational levels (Primary, Middle, High School).
- **Rich Lesson Content:** View lessons with video sessions, downloadable exercises, and a dedicated discussion area.
- **AI-Powered Assistant:** Get instant help and answers to subject-specific questions.
- **User Authentication:** Secure login and registration functionality.
- **Responsive Design:** A seamless experience across desktop and mobile devices.
- **Data-Driven Content:** The application's structure (levels, subjects, lessons) is managed via simple data files, making it easy to extend.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/)

## Local Development Setup

To run this project on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- `npm`, `yarn`, or `pnpm`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Real4LA/TunEdu
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add your Firebase and Genkit configuration. You can usually get your Firebase config from the Firebase Console.

    ```bash
    # Sample .env.local

    # Firebase Client SDK Configuration
    # You can get this from your Firebase project settings
    NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
    NEXT_PUBLIC_FIREBASE_APP_ID="1:..."
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-..."

    # Genkit/Gemini API Key
    # From Google AI Studio: https://makersuite.google.com/app/apikey
    GEMINI_API_KEY="AIza..."
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## Backend & Database Integration

Currently, the application uses mock data located in `src/lib/data.ts`. To connect to a live database and use real authentication, you will need to replace the mock data with calls to a backend service like Firebase.

### Authentication Endpoints

The authentication forms (login and signup) are currently placeholders. To implement real authentication, you would typically use Firebase Authentication.

1.  **Firebase Setup:**
    - Go to your Firebase project and enable Email/Password sign-in in the Authentication section.
    - Ensure your Firebase config in `.env.local` is correct.

2.  **Signup (`src/app/auth/signup/page.tsx`):**
    - You need to create a server action or API route that uses `createUserWithEmailAndPassword` from the Firebase Auth SDK.
    - After a user is created, you should also create a corresponding user document in your Firestore `users` collection with their details (name, email, role, etc.).

3.  **Login (`src/app/auth/login/page.tsx`):**
    - Create a server action or API route that uses `signInWithEmailAndPassword` to authenticate the user.
    - Manage the user's session, for example by using Firebase's built-in session management or a library like NextAuth.js.

### Data Endpoints

All curriculum data (subjects, lessons, etc.) is statically defined. To make this dynamic, you would replace the imported arrays from `src/lib/data.ts` with real-time data fetching from a database like Firestore.

- **Example: Fetching Subjects**
  In `src/app/(main)/browse/[levelSlug]/[yearSlug]/page.tsx`, instead of this:
  ```typescript
  import { subjects } from '@/lib/data';
  const availableSubjects = subjects.filter(...);
  ```
  You would fetch data from Firestore:
  ```typescript
  // This is a conceptual example
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { db } from '@/firebase/config'; // Your Firebase config

  const subjectsRef = collection(db, 'subjects');
  const q = query(subjectsRef, where('classYearSlug', '==', yearSlug));
  const querySnapshot = await getDocs(q);
  const availableSubjects = querySnapshot.docs.map(doc => doc.data());
  ```

This would apply to all pages currently consuming static data from `src/lib/data.ts`.
