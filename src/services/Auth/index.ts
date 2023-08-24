import { Services } from "@services";

const AuthServices = Services.API.createEndpoint("/login");

export const signInRequest = AuthServices.createQuery<
  SignInFormData,
  void
>({
  method: "POST",
});


