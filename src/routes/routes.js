import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Indexpage from "../pages/indexpage";
import Viewsingle from "../pages/viewsingle";
import Addmovie from "../pages/addmovie";
import Login from "../pages/login";
import Profile from "../pages/profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Indexpage} exact></Route>
        <Route path="/index">
          <Redirect to="/"></Redirect>
        </Route>
        <Route path="/viewsingle/:id" component={Viewsingle} exact />
        <Route path="/viewsingle" component={Viewsingle} exact />
        <Route path="/add" component={Addmovie} exact></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
