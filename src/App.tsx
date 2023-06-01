import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/login/Login";
import { AddOrder } from "./pages/add-order/AddOrder";

setupIonicReact();

const App: React.FC = () => {
  const authUser = localStorage.getItem("username") || "";
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <switch>
          <Route path="/" exact render={() => (authUser ? <Home /> : <Login />)} />
          <Route path="/home" exact render={() => (authUser ? <Home /> : <Login />)} />
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route
              path="/add-order"
              exact
              render={() => authUser ? <AddOrder /> : <Login />}
          />
          <Route />
          <Route path="/edit/:id" 
            exact 
            render={(props) => authUser ? <AddOrder /> : <Login />}>
          </Route>
          </switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
