import { useCallback, useState } from "react";
import { FieldError } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {
  forwardRef,
  IconButton,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";

import { Input } from "./Input";

export interface PasswordFieldProps
  extends ChakraInputProps {
  errors: FieldError | undefined;
}

export const PasswordField = forwardRef<
  PasswordFieldProps,
  "input"
>((props, ref) => {
  const {
    errors,

    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <Input
      errors={errors}
      {...rest}
      ref={ref}
      pr="4.5rem"
      type={showPassword ? "text" : "password"}
      rightElement={
        <InputRightElement>
          <IconButton
            variant="ghost"
            icon={
              showPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )
            }
            h="1.75rem"
            size="sm"
            aria-label="Mostrar senha"
            onClick={handleClickShowPassword}
          />
        </InputRightElement>
      }
    />
  );
});
