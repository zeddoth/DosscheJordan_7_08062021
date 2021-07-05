import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home.js";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./styles/app.css";

function App() {
  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    // si la clé n'existe pas on retourne "null"
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare le "timestamp" d'expiration avec celui actuel
    if (now.getTime() > item.expiry) {
      // si la clé est expiré ont supprime la clé du localstorage
      // et ont renvoie "null"
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };
  const isAuth = () => getWithExpiry("token");
  getWithExpiry("userId");
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        return isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
  return (
    <div className="App">
      <Router>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/" exact component={Home} on />
      </Router>
    </div>
  );
}

export default App;
