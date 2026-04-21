import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, db } from '../lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  createdAt: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  register: (data: any) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          }
        } catch (error) {
          console.warn("Could not fetch profile, might be offline:", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        createdAt: serverTimestamp()
      };
      await setDoc(userRef, data, { merge: true });
    } catch (error) {
      console.error("Google Login failed:", error);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(result.user, { displayName: data.fullName });
      
      const userRef = doc(db, 'users', result.user.uid);
      const profileData: UserProfile = {
        uid: result.user.uid,
        email: data.email,
        displayName: data.fullName,
        phone: data.phone || '', // Keep phone as optional field in profile
        governorate: data.governorate,
        city: data.city,
        address: data.address,
        createdAt: serverTimestamp()
      };
      await setDoc(userRef, profileData);
      setProfile(profileData);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const login = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const loginAsGuest = () => {
    const guestUser = {
      uid: 'guest-123',
      email: 'guest@example.com',
      displayName: 'زائر تجريبي'
    } as User;
    
    const guestProfile: UserProfile = {
      uid: 'guest-123',
      email: 'guest@example.com',
      displayName: 'زائر تجريبي',
      phone: '01000000000',
      governorate: 'القاهرة',
      city: 'الزمالك',
      address: 'شارع التجربة',
      createdAt: new Date()
    };
    
    setUser(guestUser);
    setProfile(guestProfile);
  };

  const logout = async () => {
    try {
      if (user?.uid === 'guest-123') {
        setUser(null);
        setProfile(null);
        return;
      }
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Reset password failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginWithGoogle, register, login, loginAsGuest, logout, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
