import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  province?: string;
  createdAt: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, province?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Carregar utilizador do localStorage ao iniciar
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (name: string, email: string, password: string, province?: string): Promise<boolean> => {
    try {
      // Obter utilizadores existentes do localStorage
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Verificar se o email já existe
      const existingUser = users.find((u: User & { password: string }) => u.email === email);
      if (existingUser) {
        return false; // Email já registado
      }

      // Criar novo utilizador
      const newUser: User & { password: string } = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        password, // Em produção, isto seria hasheado
        province: province || 'Luanda',
        createdAt: new Date().toISOString(),
      };

      // Guardar utilizador
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Fazer login automaticamente
      const userWithoutPassword: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        province: newUser.province,
        createdAt: newUser.createdAt,
      };
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error('Erro ao registar:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Verificar se é o administrador
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin',
          name: 'Administrador',
          email: 'admin@gmail.com',
          province: 'Luanda',
          createdAt: new Date().toISOString(),
          isAdmin: true,
        };
        setUser(adminUser);
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        return true;
      }

      // Obter utilizadores do localStorage
      const usersData = localStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      // Verificar credenciais
      const foundUser = users.find(
        (u: User & { password: string }) => u.email === email && u.password === password
      );

      if (!foundUser) {
        return false; // Credenciais inválidas
      }

      // Criar objeto de utilizador sem password
      const userWithoutPassword: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        province: foundUser.province || 'Luanda',
        createdAt: foundUser.createdAt,
        isAdmin: false,
      };

      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}