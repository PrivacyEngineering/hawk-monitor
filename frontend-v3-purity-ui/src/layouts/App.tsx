import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { SidebarTS } from "../components/Sidebar/SidebarTS";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";
import Footer from "components/Footer/Footer";
import MainPanel from "components/Layout/MainPanel";
import theme from "theme/theme.js";
import { AdminNavbarTS } from "../components/Navbars/AdminNavbarTS";
import Configurator from "components/Configurator/Configurator";
import PanelContent from "components/Layout/PanelContent";
import PanelContainer from "components/Layout/PanelContainer";
import { Redirect, Route, Switch } from "react-router-dom";
import { SidebarVariant } from "types";
import Tables from "views/Dashboard/Tables";

export const App = () => {
  const [sidebarVariant, setSidebarVariant] = useState<SidebarVariant>("transparent");
  const [fixed, setFixed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme} >
      <SidebarTS logoText={"Transparency Dashboard"} sidebarVariant={sidebarVariant} />
      <MainPanel w={{ base: "100%", xl: "calc(100% - 275px)" }}>
        <Portal><AdminNavbarTS onOpen={onOpen} brandText={"BRAND"} secondary={false} fixed={fixed} /></Portal>
        <PanelContent>
          <PanelContainer>
            <Switch>
              <Route path='/fields' component={Tables} />
              <Route path='/mappings' component={Tables} />
              <Route path='/tables' component={Tables} />
              <Redirect from={`/`} to="/mappings" />
            </Switch>
          </PanelContainer>
        </PanelContent>

        <Footer />
        <Portal>
          <FixedPlugin secondary={false} fixed={fixed} onOpen={onOpen} />
        </Portal>
        <Configurator
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={value => setFixed(value)}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
    </ChakraProvider>
  )
}