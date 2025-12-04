import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [avatarUrl, setAvatarUrlState] = useState<string | null>(() => {
    // Load from localStorage on init
    return localStorage.getItem('userAvatar');
  });

  const setAvatarUrl = (url: string | null) => {
    setAvatarUrlState(url);
    // Persist to localStorage
    if (url) {
      localStorage.setItem('userAvatar', url);
    } else {
      localStorage.removeItem('userAvatar');
    }
  };

  return (
    <UserContext.Provider value={{ avatarUrl, setAvatarUrl }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
