type LoggedUser = {
  id: number;
  email: string;
  name: string;
  idade: number;
  token: string;
};

interface SignInFormData {
  email: string;
  password: string;
}

type AuthState = "signin" | "signup";

interface SignUpFormData {
  email: string;
  name: string;
  idade: number;
  password: string;
  confirmPassword: string;
}

interface SignInResponse {
  message: string;
  user: LoggedUser;
}
