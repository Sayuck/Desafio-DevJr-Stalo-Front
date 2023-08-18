import { Grid, GridItem } from "@chakra-ui/react";


export type BaseTemplateProps = {
  children: React.ReactNode;
};

export function BaseLayout({
  children,
}: BaseTemplateProps) {
  return (
    <Grid
      templateRows="auto minmax(0, 1fr)"
      rowGap={4}
      maxWidth="100vw"
    >
      <GridItem
        maxWidth="100vw"
        padding={["1rem", "2rem", "4rem", "8rem"]}
      >
        {children}
      </GridItem>
    </Grid>
  );
}
