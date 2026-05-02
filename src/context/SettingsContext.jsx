import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const SettingsContext = createContext();

export const DEFAULT_STATUSES = ['To Do', 'In Progress', 'Done'];

export function SettingsProvider({ children }) {
  const [statuses, setStatuses] = useState(DEFAULT_STATUSES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const settingsRef = doc(db, 'settings', 'workspace');
    
    const unsubscribe = onSnapshot(settingsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.statuses && Array.isArray(data.statuses)) {
          setStatuses(data.statuses);
        }
      } else {
        // Initialize with defaults if it doesn't exist
        setDoc(settingsRef, { statuses: DEFAULT_STATUSES });
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching settings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatuses = async (newStatuses) => {
    try {
      const settingsRef = doc(db, 'settings', 'workspace');
      await setDoc(settingsRef, { statuses: newStatuses }, { merge: true });
    } catch (error) {
      console.error("Error updating statuses:", error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ statuses, loading, updateStatuses }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
