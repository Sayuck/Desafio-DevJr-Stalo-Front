import { Component, ErrorInfo, ReactNode } from "react";
import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import { mutate } from "swr";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Uncaught error:", error, errorInfo);
  }

  render() {
    // Check if the error is thrown
    /* eslint-disable react/destructuring-assignment -- cant destructure  */
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Center minHeight="70vh">
          <VStack align="stretch" gap={6}>
            <Heading>Algo deu errado</Heading>
            <Button
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop -- ignore
              onClick={() => {
                mutate(
                  () => true, // Mutate all cache, incase some request return unexpected data
                  undefined, // update cache data to `undefined`
                  { revalidate: false } // do not revalidate
                );
                this.setState({ hasError: false });
              }}
            >
              Recarregar
            </Button>
          </VStack>
        </Center>
      );
    }

    // Return children components in case of no error
    return this.props.children;
    /* eslint-enable react/destructuring-assignment */
  }
}
