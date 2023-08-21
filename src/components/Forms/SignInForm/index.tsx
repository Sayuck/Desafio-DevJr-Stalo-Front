import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Flex } from "@chakra-ui/react";

import { Input } from "@components/FormFields/Input";
import { PasswordField } from "@components/FormFields/PasswordField";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const router = useRouter();

  const { data: session } = useSession();
  console.log(session);

  const onSubmit = useCallback(
    async (data: SignInFormData) => {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
        // callbackUrl: "/tasks",
      });

      if (response?.ok) {
        // router.push(response?.url || "/tasks");
        toast.success("Bem vindo!");
      } else {

        toast.error(response?.error);
      }
    },
    [router]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="2rem">
        <Input
          errors={errors.email}
          placeholder="Email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Formato de email inválido",
            },
          })}
        />
        <PasswordField
          placeholder="password"
          {...register("password", {
            required: "Password é obrigatória",
            minLength: {
              value: 8,
              message:
                "Password deve ter no mínimo 8 caracteres",
            },
          })}
          errors={errors.password}
        />

        <Button
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          borderRadius="full"
        >
          Login
        </Button>
      </Flex>
    </form>
  );
}
