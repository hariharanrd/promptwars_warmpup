# SyncFlow - Real-Time Team Task Dashboard

SyncFlow is a high-fidelity, real-time task management dashboard designed for team collaboration. It provides a seamless experience for tracking tasks, updating statuses, and ensuring team synchronization through live data updates.

## 🚀 Features

- **Real-Time Task Synchronization**: Powered by Firebase Firestore, ensuring all team members see task updates, creations, and deletions instantly without page refreshes.
- **Hackathon-Optimized Authentication**: A lightweight, frictionless sign-in system. Users join the workspace with a username and password which are stored directly in Firestore and managed via a global React Context.
- **Team Directory**: A live, real-time list of all onboarded team members pulling dynamically from the Firestore users collection.
- **Client-Side API Architecture**: Direct-to-database communication using Firebase client APIs (`onSnapshot`, `getDoc`, `setDoc`) eliminating the need for a complex middle-tier backend.
- **Modern UI/UX**: Built with a "premium-first" design philosophy using Tailwind CSS, featuring glassmorphism, smooth transitions, and responsive layouts.
- **Modular Navigation**: Instant client-side routing between Dashboard, Team, and Settings modules using React state.

## 🛠️ Tech Stack

- **Frontend Core**: [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/) for ultra-fast builds and HMR.
- **State Management**: React Context API for global authentication state and custom hooks (`useTasks`, `useAuth`).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for modern, utility-first styling.
- **Backend/Real-time**: [Firebase Modular SDK v11](https://firebase.google.com/) (Firestore specifically targeting the `promptwars` named database instance).
- **Icons**: [Lucide React](https://lucide.dev/) for a clean and consistent icon set.
- **Date Handling**: [date-fns](https://date-fns.org/) for robust date manipulation.
- **Infrastructure**: [Docker](https://www.docker.com/) for containerized deployment (Cloud Run ready).

## 📦 Getting Started

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Firebase**:
   Configure your Firebase credentials in `src/firebase.js`.

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

### Production Build

To create a production-ready bundle:
```bash
npm run build
```

### Docker

Build the container:
```bash
docker build -t syncflow-dashboard .
```

Run the container:
```bash
docker run -p 8080:80 syncflow-dashboard
```

## 🏗️ Project Structure

- `src/components/`: Reusable UI components (Sidebar, TaskGrid, TaskForm, etc.).
- `src/firebase.js`: Firebase configuration and initialization.
- `src/hooks/`: Custom React hooks for data fetching and logic.
- `Dockerfile`: Multi-stage build configuration for optimized production images.
