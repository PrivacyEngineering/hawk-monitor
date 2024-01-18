import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react"
import React, {useEffect, useState} from "react";
import { SidebarTS } from "../components/Sidebar/SidebarTS";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";
import Footer from "components/Footer/Footer";
import theme from "theme/theme.js";
import { AdminNavbar } from "../components/Navbars/AdminNavbar";
import { MainPanel, PanelContainer, PanelContent } from "components/StyledComponent";
import Configurator from "components/Configurator/Configurator";
import { Navigate, Route, Routes } from "react-router-dom";
import { SidebarVariant } from "types/types";
import { FieldPage } from "views/FieldPage";
import { FieldsPage } from "views/FieldsPage";
import { MappingPage } from "views/MappingPage";
import { MappingsPage } from "views/MappingsPage";
import { LegalBasesPage } from "views/LegalBasesPage";
import { useThunkDispatch } from "index";
import { fetchFields } from "actions/fields";
import { fetchMappings } from "actions/mappings";
import { DlpJobs } from "views/dlp/DlpJobs";
import { DlpFindings } from "views/dlp/DlpFindings";

export const App = () => {
  const dispatch = useThunkDispatch();
  const [sidebarVariant, setSidebarVariant] = useState<SidebarVariant>("transparent");
  const [fixed, setFixed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => { fetchFields(dispatch) }, [dispatch]);
  useEffect(() => { fetchMappings(dispatch) }, [dispatch]);
  
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
              <Route path="/legalBases" element={<LegalBasesPage />} />
              <Route path="/mappings/update/:id" element={<MappingPage />} />
              <Route path="/mappings/new" element={<MappingPage />} />
              <Route path="/mappings" element={<MappingsPage />} />
              <Route path="/dlp/jobs" element={<DlpJobs />} />
              <Route path="/dlp/findings/byField/:fieldId" element={<DlpFindings/>} />
              <Route path="/dlp/findings/:id" element={<DlpFindings/>} />
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
