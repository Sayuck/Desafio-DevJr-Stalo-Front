import type { ReactNode } from "react";
import {
  Heading,
  Modal as ModalContainer,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from "@chakra-ui/react";

export interface ModalProps extends ChakraModalProps {
  title: string;
  footer?: ReactNode;
  contentProps?: ModalContentProps;
}

// Declared outside component, no needless re-rendering
const staticArray = [4, 6, 8, 10];

/**
 * Wrapper around Chakra's {@link ModalContainer} with a
 * default layout.
 *
 * @param props - {@link ModalProps}
 */
export function Modal({
  title,
  children,
  footer = null,
  contentProps,
  ...props
}: ModalProps) {
  return (
    <ModalContainer {...props}>
      <ModalOverlay transform="auto-gpu" />
      <ModalContent
        transform="auto-gpu" // force the browser use GPU acceleration for that particular element instead of the CPU
        backdropFilter="blur(8px)"
        
        {...contentProps}
      >
        <ModalCloseButton size="lg" />
        <ModalHeader borderTopRadius="md">
          <Heading fontSize="xl" fontWeight="semibold">
            {title}
          </Heading>
        </ModalHeader>

        <ModalBody p={staticArray}>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ModalContainer>
  );
}
