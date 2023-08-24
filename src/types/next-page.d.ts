type NextPage<T> = import("next").NextPage<T>;

type ReactElement = import("react").ReactElement;

/**
 * Augmented NextPage type that allows for a custom layout
 * to be specified.
 */
type NextPageWithLayout<Props = {}> = NextPage<Props> & {
  /** The layout to use for this page. */
  getLayout?: (page: ReactElement) => JSX.Element;
};
