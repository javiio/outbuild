// DEV
const DEV_FIREBASE_CONFIG = {
  apiKey: "AIzaSyALcrtGOhOqa7kr4Dn8Ug4hOsSRsNd0wBI",
  authDomain: "outbuild-kanban.firebaseapp.com",
  projectId: "outbuild-kanban",
  storageBucket: "outbuild-kanban.firebasestorage.app",
  messagingSenderId: "506770747076",
  appId: "1:506770747076:web:e8cb041a0c841df85f6391"
};

// PROD
const PROD_FIREBASE_CONFIG = {
  apiKey: "AIzaSyALcrtGOhOqa7kr4Dn8Ug4hOsSRsNd0wBI",
  authDomain: "outbuild-kanban.firebaseapp.com",
  projectId: "outbuild-kanban",
  storageBucket: "outbuild-kanban.firebasestorage.app",
  messagingSenderId: "506770747076",
  appId: "1:506770747076:web:e8cb041a0c841df85f6391"
};

export default process.env.NODE_ENV === 'production' ? PROD_FIREBASE_CONFIG : DEV_FIREBASE_CONFIG;
// export default PROD_FIREBASE_CONFIG;
