import { Services } from "@services";

const UserServices =
  Services.API.createEndpoint("/register");

export const createUser =
  UserServices.createQuery<SignUpFormData, void>({
    method: "POST",
  });