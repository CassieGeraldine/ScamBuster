const { initializeApp } = require("firebase/app");
const { getFirestore, setDoc, doc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDoxNDufMbN9_YuFnMGwYudQN3tZy8qdSA",
  authDomain: "cyberbuster-7020c.firebaseapp.com",
  projectId: "cyberbuster-7020c",
  storageBucket: "cyberbuster-7020c.firebasestorage.app",
  messagingSenderId: "292888145046",
  appId: "1:292888145046:web:10cd26ea9f26d80fb6a6b7",
  measurementId: "G-RGD3MSK9T7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const users = [
  { id: "1", name: "Sarah Chen", avatar: "/diverse-woman-avatar.png", points: 2850, rank: 1, badges: 15, streak: 12, country: "ZA" },
  { id: "2", name: "Michael Okafor", avatar: "/man-avatar.png", points: 2720, rank: 2, badges: 13, streak: 8, country: "ZA" },
  { id: "3", name: "Alex Johnson", avatar: "/diverse-person-avatars.png", points: 2650, rank: 3, badges: 12, streak: 15, country: "ZA" },
  { id: "4", name: "Priya Patel", avatar: "/woman-avatar-2.png", points: 2480, rank: 4, badges: 11, streak: 6, country: "ZA" },
  { id: "5", name: "David Williams", avatar: "/man-avatar-2.png", points: 2350, rank: 5, badges: 10, streak: 9, country: "ZA" },
];

async function seed() {
  for (const user of users) {
    await setDoc(doc(db, "leaderboard", user.id), user);
    console.log(`Added user ${user.name}`);
  }
  process.exit();
}

seed();