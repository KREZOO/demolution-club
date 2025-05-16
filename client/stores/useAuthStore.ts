import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!Cookies.get('access'),
  token: Cookies.get('access') || null,
  login: (token: string) => {
    Cookies.set('access', token, { expires: 7 });
    set({ isAuthenticated: true, token });
  },
  logout: () => {
    Cookies.remove('access');
    set({ isAuthenticated: false, token: null });
  },
}));
