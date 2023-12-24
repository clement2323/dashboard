
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Team from "./scenes/team";
import Sidebar from "./scenes/global/SidebarPers";
//import Dashboard from "./scenes/dashboard";

// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./themes";
//import Calendar from "./scenes/calendar/calendar";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
          <Sidebar isSidebar={isSidebar} style={{ flex: '0 0 auto' }} />
          <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
            <Topbar setIsSidebar={setIsSidebar} style={{ flex: '0 0 auto' }} />
            <main className="content" style={{ flex: '1 1 auto', overflow: 'auto' }}>
              <Routes>
                <Route path="/team" element={<Team />} />
                {/* autres routes... */}
              </Routes>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

/*Docker Part*/
/*https://mattermost.com/blog/how-to-deploy-a-react-app-to-kubernetes-using-docker/*/