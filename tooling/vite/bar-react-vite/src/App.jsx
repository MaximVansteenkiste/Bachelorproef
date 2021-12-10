import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import useNetwork from "./hooks/useNetwork";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import { ReactQueryDevtools } from "react-query/devtools";
import Login from "./pages/Login/Login";
import useCurrentUser from "./hooks/useCurrentUser";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import History from "./pages/History/History";
import LastTransactions from "./pages/Admin/LastTransactions";
import UsersOverview from "./pages/Admin/UsersOverview/UsersOverview";
import CalculateSpent from "./pages/Admin/CalculateSpent";
import UserProfileContainer from "./pages/UserProfile/UserProfileContainer";
import Export from "./pages/Export";
import * as sugar from "sugar";
import * as localNL from "sugar/locales/nl"

export { sugar };
sugar.extend();
sugar.Date.setLocale("nl");

export const MainContext = createContext();

export const number = (value = 0) =>
  value.toLocaleString("nl", { minimumFractionDigits: 1 });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: "Infinity",
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  const isOnline = useNetwork();
  const [notification, setNotification] = useState();
  const [isLoading, setIsLoading] = useState();

  return (
    <QueryClientProvider client={queryClient}>
      <MainContext.Provider value={{ setNotification, setIsLoading }}>
        <div className="container px-2 md:mx-auto pt-2 bg-background h-full">
          <Routes isLoading={isLoading} />
        </div>
        <Notification notification={notification ?? {}} />
        {!isOnline && (
          <Notification
            notification={{
              message: "U heeft geen dataverbinding",
            }}
          />
        )}
      </MainContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const Routes = ({ isLoading }) => {
  const user = useCurrentUser();

  if (user === "loading" || user?.dataLoading || isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Switch>
        <Route path="/passwordforget">
          <Login isPasswordForget={true} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/history">
          <History />
        </PrivateRoute>
        <PrivateRoute path="/me">
          <UserProfileContainer />
        </PrivateRoute>
        <AdminRoute path="/lastTransactions">
          <LastTransactions />
        </AdminRoute>
        <AdminRoute path="/users/:userId">
          <UserProfileContainer />
        </AdminRoute>
        <AdminRoute path="/users">
          <UsersOverview />
        </AdminRoute>
        <AdminRoute path="/spent">
          <CalculateSpent />
        </AdminRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

const PrivateRoute = ({ children, ...props }) => {
  const user = useCurrentUser();

  return (
    <Route
      {...props}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const AdminRoute = ({ children, ...props }) => {
  const { isAdmin, dataLoading, ...user } = useCurrentUser();

  return (
    <Route
      {...props}
      render={({ location }) =>
        !isAdmin && user && !dataLoading ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default App;
