import React, { useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import QrCodeScannerPage from "pages/QrCodeScannerPage";
import ConnectionPage from "pages/LoginPage";
import authService from "services/auth.service";
import UserAccountPage from "pages/UserAccountPage";
import DetailsPage from "pages/DetailsPage";
import TrackAndTracePage from "pages/TrackAndTracePage";
import { SnackbarProvider } from "notistack";
import MonitoringPage from "pages/MonitoringPage";

const RouterContainer = () => {
  const location = useLocation();

  return (
    <Switch>
      {!authService.isUserLoggedIn() && location.pathname !== "/login" && (
        <Redirect to="/login" />
      )}

      <Route path="/login">
        <ConnectionPage />
      </Route>

      <Route path="/user-config">
        <UserAccountPage />
      </Route>

      <Route path="/qr-code-scanner">
        <QrCodeScannerPage />
      </Route>

      <Route path="/companies/:company/:entityType/:id/trace">
        <TrackAndTracePage />
      </Route>

      <Route path="/companies/:company/:entityType/:id/monitoring">
        <MonitoringPage />
      </Route>

      <Route path="/companies/:company/:entityType/:id">
        <DetailsPage />
      </Route>

      <Route path="/">
        <QrCodeScannerPage />
      </Route>
    </Switch>
  );
};

const App = () => {
  useEffect(() => {
    const handleResize = () => {
      document.getElementById("root").style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <RouterContainer />
        </Router>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
