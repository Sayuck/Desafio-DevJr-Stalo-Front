import React, { useCallback, useState } from "react";
import { Text } from "@chakra-ui/react";

import { SignInForm } from "@components/Forms/SignInForm";
import { SignUpForm } from "@components/Forms/SignUpForm";
import { AuthLayout } from "@layouts/Auth";
import { AuthFooter } from "@layouts/Auth/components/AuthFooter";

const Auth: NextPageWithLayout = () => {
  const [authState, setAuthState] =
    useState<AuthState>("signin");

  const changeAuthState = useCallback(
    (state: AuthState) => () => setAuthState(state),
    []
  );

  return (
    <AuthLayout
      footer={
        {
          signin: (
            <AuthFooter
              text="Não tem uma conta?"
              link="Cadastre-se"
              changeAuthState={changeAuthState("signup")}
            />
          ),
          signup: (
            <AuthFooter
              text=""
              link="Voltar para o login"
              changeAuthState={changeAuthState("signin")}
            />
          ),
        }[authState]
      }
      header={
        {
          signin: (
            <Text
              fontSize="3xl"
              fontWeight="bold"
              textAlign="center"
            >
              Bem-Vindo(a)
            </Text>
          ),
          signup: (
            <Text
              fontSize="3xl"
              fontWeight="bold"
              textAlign="center"
            >
              Cadastre sua conta.
            </Text>
          ),
        }[authState]
      }
    >
      {
        {
          signin: <SignInForm />,
          signup: (
            <SignUpForm
              redirectToSignin={changeAuthState("signin")}
            />
          ),
        }[authState]
      }
    </AuthLayout>
  );
};

Auth.getLayout = (page) => page;

export default Auth;
