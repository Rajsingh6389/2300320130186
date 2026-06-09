import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import NotificationsPage
from "./pages/NotificationsPage";

import PriorityInboxPage
from "./pages/PriorityInboxPage";

import {
  AppBar,
  Toolbar,
  Button
} from "@mui/material";

function App() {

  return (
    <BrowserRouter>

      <AppBar
        position="static"
      >
        <Toolbar>

          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Notifications
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/priority"
          >
            Priority Inbox
          </Button>

        </Toolbar>
      </AppBar>

      <Routes>

        <Route
          path="/"
          element={
            <NotificationsPage />
          }
        />

        <Route
          path="/priority"
          element={
            <PriorityInboxPage />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;