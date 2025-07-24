import getUser from "@/app/actions/getUser";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<Record<string, any> | null>(null);

interface CurrentUser {
  _id: string;
  name: string;
  email: string;
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const { isAuthenticated, user } = await getUser();
      setIsAuthenticated(isAuthenticated);
      if (user) {
        setCurrentUser(user);
      }
    };
    checkAuthentication().then(null);
  }, [isAuthenticated]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export default useAuth;
