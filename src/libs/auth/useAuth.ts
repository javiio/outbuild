import { useState } from 'react';
import { serverTimestamp, type Timestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useData, auth } from '@/core/data';
import { useUsers } from '@/users';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useData();
  const { add, update } = useUsers();
  const router = useRouter();

  const login = (email: string, password: string) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await update(userCredential.user.uid, {
          isOnline: true,
          lastSeen: serverTimestamp() as Timestamp,
        });
        await router.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  };

  const signup = (name: string, email: string, password: string) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await add({
          id: userCredential.user.uid,
          name,
          isOnline: true,
          lastSeen: serverTimestamp() as Timestamp,
        });
        await router.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  };

  const logout = () => {
    const id = currentUser.uid;
    signOut(auth)
      .then(async () => {
        await update(id, {
          isOnline: false,
          lastSeen: serverTimestamp() as Timestamp,
        });
        await router.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    currentUser,
    login,
    signup,
    logout,
    isLoading,
  };
};
