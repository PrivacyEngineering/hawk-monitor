import { Box, ThemingProps, useStyleConfig } from "@chakra-ui/react";

interface Props {
  variant?: ThemingProps<any>;
  [key: string]: any;
}

export const getStyledComponent = (themeKey: string): React.FC<Props> => (props) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig(themeKey, { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export const Card = getStyledComponent("Card");
export const CardBody = getStyledComponent("CardBody");
export const CardHeader = getStyledComponent("CardHeader");

export const MainPanel = getStyledComponent("MainPanel");
export const PanelContainer = getStyledComponent("PanelContainer");
export const PanelContent = getStyledComponent("PanelContent");
