# SyncFlow - Real-Time Team Task Dashboard

SyncFlow is a high-fidelity, real-time task management dashboard designed for team collaboration. It provides a seamless experience for tracking tasks, updating statuses, and ensuring team synchronization through live data updates.

## 🚀 Features

- **Real-Time Synchronization**: Powered by Firebase Firestore, ensuring all team members see updates instantly without page refreshes.
- **Task Management**: Create, view, and track tasks with detailed status badges and metadata.
- **Modern UI/UX**: Built with a "premium-first" design philosophy using Tailwind CSS, featuring glassmorphism, smooth transitions, and responsive layouts.
- **Component-Driven Architecture**: Modular React components (TaskGrid, TaskForm, StatusBadge) for maintainability and scalability.

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/) for ultra-fast builds and HMR.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for modern, utility-first styling.
- **Backend/Real-time**: [Firebase Modular SDK](https://firebase.google.com/) (Firestore).
- **Icons**: [Lucide React](https://lucide.dev/) for a clean and consistent icon set.
- **Date Handling**: [date-fns](https://date-fns.org/) for robust date manipulation.
- **Infrastructure**: [Docker](https://www.docker.com/) for containerized deployment.

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
