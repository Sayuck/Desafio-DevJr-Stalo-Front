import { Grid, GridItem } from "@chakra-ui/react";

import { FiltersHeader } from "@components/FiltersHeader";
import { Footer } from "@components/Footer";

export type BaseTemplateProps = {
  children: React.ReactNode;
};

export function BaseLayout({
  children,
}: BaseTemplateProps) {
  return (
    <Grid
      templateRows="auto minmax(0, 1fr) auto"
      rowGap={12}
      maxWidth="100vw"
      height="100vh"
    >
      <GridItem>
        <FiltersHeader />
      </GridItem>
      <GridItem
        maxWidth="100vw"
        padding={["1rem", "2rem", "4rem", "8rem"]}
      >
        {children}
      </GridItem>
      <GridItem>
        <Footer />
      </GridItem>
    </Grid>
  );
}
