import { Services } from "@services";

const AuthServices =
  Services.API.createEndpoint("/api/register");

export const signUpRequest = AuthServices.createQuery<
  SignUpFormData,
  void
>({
  method: "POST",
});
