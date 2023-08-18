import { Services } from "@services";

const UserServices =
  Services.API.createEndpoint("/user");

export const createUser =
  UserServices.createQuery<SignUpFormData, void>({
    method: "POST",
  });