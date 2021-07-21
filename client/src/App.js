import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import onePagePublication from "./pages/onePagePublication";
import authorPage from "./pages/authorPage";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./styles/app.css";

function App() {
  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
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
        <Route path="/publication:idPost" exact component={onePagePublication} />
        <Route path="/publication" component={onePagePublication} />
        <Route path="/author" component={authorPage} />
        <PrivateRoute path="/" exact component={Home} on />
      </Router>
    </div>
  );
}

export default App;
