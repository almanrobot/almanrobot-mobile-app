import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

// Create a context
const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
  const [auth, setAuthState] = useState<string | null>(null);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const getToken = await AsyncStorage.getItem('access_token');
      setAuthState(getToken);
    } catch (err) {
      setAuthState(null);
    }
  };

  const decodeAuth = () => {
    if (auth != null) {
      return jwt_decode(auth);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    setAuthState(null);
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, logout, getAuthState, decodeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
