import React, { useState, useEffect, createContext, useContext } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();

async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

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

    const hashedPassword = await hashPassword(password);
    const userRef = doc(db, 'users', userId);
    
    // Check if user exists, if not create
    const userSnap = await getDoc(userRef);
    let userData = {
      uid: userId,
      email: username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    if (!userSnap.exists()) {
      await setDoc(userRef, userData);
    } else {
      const existingData = userSnap.data();
      
      // Migration & Verification logic
      if (existingData.password === password) {
        // Plaintext match -> Migrate to hash
        await setDoc(userRef, { password: hashedPassword }, { merge: true });
        userData.createdAt = existingData.createdAt;
      } else if (existingData.password === hashedPassword) {
        // Hash match
        userData.createdAt = existingData.createdAt;
      } else if (!existingData.password) {
        // No password stored -> Set hash
        await setDoc(userRef, { password: hashedPassword }, { merge: true });
        userData.createdAt = existingData.createdAt || userData.createdAt;
      } else {
        throw new Error("Incorrect password for this username.");
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
