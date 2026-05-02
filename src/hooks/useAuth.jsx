import React, { useState, useEffect, createContext, useContext } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for simple hackathon auth
    try {
      const storedUser = localStorage.getItem('syncflow_user');
      if (storedUser && storedUser !== 'undefined') {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse stored user", e);
      localStorage.removeItem('syncflow_user');
    }
    setLoading(false);
  }, []);

  const logIn = async (username, password) => {
    const userId = username.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!userId) throw new Error("Please enter a valid username");
    if (!password) throw new Error("Please enter a password");

    const userRef = doc(db, 'users', userId);
    
    // Check if user exists, if not create
    const userSnap = await getDoc(userRef);
    const userData = {
      uid: userId,
      email: username,
      password: password, // Note: Storing plaintext password for hackathon simplicity
      createdAt: new Date().toISOString()
    };

    if (!userSnap.exists()) {
      await setDoc(userRef, userData);
    } else {
      // Verify password
      const existingData = userSnap.data();
      if (existingData.password && existingData.password !== password) {
        throw new Error("Incorrect password for this username.");
      }
      // If the existing user doesn't have a password (from previous version without password), we just let them in.
      // Alternatively, we could update their record with the new password.
      if (!existingData.password) {
        await setDoc(userRef, { password: password }, { merge: true });
        userData.createdAt = existingData.createdAt || userData.createdAt;
      } else {
        userData.createdAt = existingData.createdAt;
      }
    }

    // Save to state and local storage immediately
    setCurrentUser(userData);
    localStorage.setItem('syncflow_user', JSON.stringify(userData));
    return userData;
  };

  const logOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('syncflow_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
