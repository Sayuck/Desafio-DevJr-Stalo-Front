import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Flex } from "@chakra-ui/react";

import { Input } from "@components/FormFields/Input";
import { PasswordField } from "@components/FormFields/PasswordField";
import { request } from "@lib/api";
import { createUser } from "@services/User";

interface SignUpFormProps {
  redirectToSignin: () => void;
}

export function SignUpForm({
  redirectToSignin,
}: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const onSubmit = useCallback(
    async (data: SignUpFormData) => {
      const response = await request(
        createUser({ data })
      );

      if (response.type === "success") {
        toast.success("Cadastro realizado com sucesso!");
        redirectToSignin();

        return;
      }

      toast.error("Erro ao realizar cadastro");
    },
    [redirectToSignin]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="2rem">
        <Input
          placeholder="Nome"
          {...register("nome", {
            required: "Nome é obrigatório",
          })}
          errors={errors.nome}
        />


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
        <Input
          placeholder="Idade"
          {...register("idade", {
            required: false,
          })}
          errors={errors.idade}/>
        <PasswordField
          placeholder="password"
          {...register("password", {
            required: "Campo obrigatório",
            minLength: {
              value: 8,
              message:
                "password deve ter no mínimo 8 caracteres",
            },
            validate: (value) =>
              value !== getValues("confirmPassword")
                ? "passwords não conferem"
                : true,
          })}
          errors={errors.password}
        />

        <PasswordField
          placeholder="Confirmar password"
          {...register("confirmPassword", {
            required: "Campo obrigatório",
            deps: ["password"],
          })}
          errors={errors.confirmPassword}
        />
        <Button
          mt={4}
          isLoading={isSubmitting}
          borderRadius="full"
          type="submit"
        >
          Sign Up
        </Button>
      </Flex>
    </form>
  );
}
