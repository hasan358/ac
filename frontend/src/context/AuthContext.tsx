import { createContext, useContext, useState, type ReactNode } from 'react';

// Определяем типы для контекста
interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
  login: (token: string, user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

// Создаём контекст с начальным значением undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер контекста
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Функция для входа: сохраняет токен и данные пользователя
  const login = (token: string, user: { id: string; name: string; email: string }) => {
    setToken(token);
    setUser(user);
    // Сохраняем токен в localStorage для персистентности
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // Функция для выхода: очищает токен и данные пользователя
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Хук для удобного использования контекста
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}