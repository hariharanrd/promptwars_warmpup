import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tasksCollection = collection(db, 'tasks');
    
    // Fallback timeout in case Firestore fails to connect (e.g. not provisioned)
    const timeoutId = setTimeout(() => {
      setLoading(false);
      console.warn("Firestore connection timeout. The database might not be provisioned or is unreachable.");
    }, 5000);

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
      clearTimeout(timeoutId);
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
      setLoading(false);
    }, (error) => {
      clearTimeout(timeoutId);
      console.error("Error fetching tasks:", error);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  const addTask = async (taskData) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, updates);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  return { tasks, loading, addTask, updateTaskStatus, updateTask, deleteTask };
}
