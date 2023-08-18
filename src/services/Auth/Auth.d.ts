type LoggedUser = {
  id: number;
  email: string;
  telefone: string;
  nome: string;
  idade: number;
};

interface SignInFormData {
  email: string;
  password: string;
}

type AuthState = "signin" | "signup";

interface SignUpFormData {
  email: string;
  nome: string;
  idade: number;
  password: string;
  confirmPassword: string;
}

interface SignInResponse {
  message: string;
  user: LoggedUser;
}
