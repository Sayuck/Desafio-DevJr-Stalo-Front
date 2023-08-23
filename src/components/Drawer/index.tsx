import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from "@chakra-ui/react";

import { Input } from "@components/FormFields/Input";

type FormValues = {
  task: string;
};

interface DrawerComponentProps
  extends Omit<DrawerProps, "children"> {
  title: string;
  submitButtonLabel: string;
  onSubmit: SubmitHandler<FormValues>;
}

function DrawerComponent({
  title,
  submitButtonLabel,
  onSubmit,
  ...rest
}: DrawerComponentProps) {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  return (
    <Drawer
      placement="bottom"
      finalFocusRef={btnRef}
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

        <DrawerBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="ceu"
          >
            <Input
              errors={errors?.task}
              placeholder="Descrição"
              {...register("task", {
                required: "Descrição da task é obrigatório",
              })}
            />
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={rest.onClose}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            type="submit"
            form="ceu"
          >
            {submitButtonLabel}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { DrawerComponent };
