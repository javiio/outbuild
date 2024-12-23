import React, {
  useState,
  useContext,
  createContext,
  useEffect,
} from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection as collectionFb,
  doc as docFb,
  addDoc as addDocFb,
  setDoc as setDocFb,
  updateDoc as updateDocFb,
  deleteDoc as deleteDocFb,
  arrayUnion,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  useCollection as useCollectionFb,
  useCollectionOnce as useCollectionOnceFb,
  useDocument as useDocFb,
  useDocumentOnce as useDocOnceFb,
} from 'react-firebase-hooks/firestore';
import firebaseConfig from '../config/firebase.config';

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

interface DataContext {
  currentUser: any
  collection: any
  collectionOnce: any
  doc: any
  docOnce: any
  addDoc: any
  setDoc: any
  updateDoc: any
  addItemToArrayDoc: any
  deleteDoc: any
}

const dataContext = createContext<DataContext>({
  currentUser: null,
  collection: null,
  collectionOnce: null,
  doc: null,
  docOnce: null,
  addDoc: null,
  setDoc: null,
  updateDoc: null,
  addItemToArrayDoc: null,
  deleteDoc: null,
});

export const ProvideData = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(undefined);
      }
    });
  }, []);

  const collection = (path: string) =>
    useCollectionFb(
      collectionFb(getFirestore(firebaseApp), `companies/1/${path}`),
      { snapshotListenOptions: { includeMetadataChanges: true } }
    );
  
  const collectionOnce = (path: string) =>
    useCollectionOnceFb(
      collectionFb(getFirestore(firebaseApp), `companies/1/${path}`)
    );

  const doc = (...path: string[]) => {
    return useDocFb(
      docFb(getFirestore(firebaseApp), `companies/1`, ...path),
      { snapshotListenOptions: { includeMetadataChanges: true } }
    );
  };

  const docOnce = (...path: string[]) => {
    return useDocOnceFb(
      docFb(getFirestore(firebaseApp), `companies/1`, ...path)
    );
  };

  const addDoc = async (data: object, ...path: string[]) => {
    await addDocFb(
      collectionFb(getFirestore(firebaseApp), `companies/1`, ...path),
      data
    );
  };

  const setDoc = async (data: object, ...path: string[]) => {
    await setDocFb(
      docFb(getFirestore(firebaseApp), `companies/1`, ...path),
      data,
      { merge: true }
    );
  };

  const updateDoc = async (data: object, ...path: string[]) => {
    const docRef = docFb(
      getFirestore(firebaseApp),
      `companies/1`,
      ...path
    );
    await updateDocFb(docRef, data);
  };

  const addItemToArrayDoc = async (
    data: any,
    attribute: string,
    ...path: string[]
  ) => {
    const docRef = docFb(
      getFirestore(firebaseApp),
      `companies/1`,
      ...path
    );
    await updateDocFb(docRef, { [attribute]: arrayUnion(data) });
  };

  const deleteDoc = async (...path: string[]) => {
    await deleteDocFb(
      docFb(getFirestore(firebaseApp), `companies/1`, ...path)
    );
  };

  const value = {
    currentUser,
    collection,
    collectionOnce,
    doc,
    docOnce,
    addDoc,
    setDoc,
    updateDoc,
    addItemToArrayDoc,
    deleteDoc,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

export const useData = () => useContext(dataContext);
