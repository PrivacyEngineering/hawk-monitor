import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { SidebarTS } from "../components/Sidebar/SidebarTS";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";
import Footer from "components/Footer/Footer";
import MainPanel from "components/Layout/MainPanel";
import theme from "theme/theme.js";
import { AdminNavbar } from "../components/Navbars/AdminNavbar";
import Configurator from "components/Configurator/Configurator";
import PanelContent from "components/Layout/PanelContent";
import PanelContainer from "components/Layout/PanelContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import { SidebarVariant } from "types";
import { FieldPage } from "views/FieldPage";
import { FieldsPage } from "views/FieldsPage";
import { MappingPage } from "views/MappingPage";
import { MappingsPage } from "views/MappingsPage";
import { MappingsPage2 } from "views/MappingsPage2";

export const App = () => {
  const [sidebarVariant, setSidebarVariant] = useState<SidebarVariant>("transparent");
  const [fixed, setFixed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme} >
      <SidebarTS logoText="HAWK" sidebarVariant={sidebarVariant} />
      <MainPanel w={{ base: "100%", xl: "calc(100% - 275px)" }}>
        <Portal><AdminNavbar onOpen={onOpen} fixed={fixed} /></Portal>
        <PanelContent>
          <PanelContainer>
            <Routes>
              <Route path="/fields/new" element={<FieldPage />} />
              <Route path="/fields/:id" element={<FieldPage />} />
              <Route path="/fields" element={<FieldsPage />} />
              <Route path="/mappings/:id" element={<MappingPage />} />
              <Route path="/mappings" element={<MappingsPage2 />} />
              <Route path="*" element={<Navigate to="/mappings" />} />
            </Routes>
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