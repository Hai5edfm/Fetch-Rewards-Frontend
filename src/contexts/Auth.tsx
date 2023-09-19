import * as React from "react";
import { signIn } from "@/services/auth/sign-in";
import { LoginProps } from "@/interfaces/auth";
import { OK } from "@/utils/contants/https-status";

interface AuthContextProps {
  loading: boolean;
  authed: boolean;
  handleSignIn: (data: LoginProps) => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

// eslint-disable-next-line
const AuthContext: any = React.createContext<AuthContextProps | null>(null);

const AuthProvider = (props: Props) => {
  const [authed, setAuthed] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSignIn = async (data: LoginProps) => {
    try {
      setLoading(true);
      const response = await signIn(data);

      if (response.status === OK) setAuthed(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const authProviderValue = React.useMemo(
    () => ({
      loading,
      handleSignIn,
      authed,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext<AuthContextProps | null>(AuthContext);
  if (!context) {
    throw new Error(
      "El componente debe estar dentro del context: 'SkillContext'"
    );
  }
  return context;
}

export default AuthProvider;
