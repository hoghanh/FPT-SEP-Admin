import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Users from "./pages/Users";
import Jobs from "./pages/Jobs";
import FreelancerProfile from "./pages/Profile/Freelancer/FreelancerProfile";
import ClientProfile from "./pages/Profile/Client/ClientProfile";
import JobDetail from "./pages/Job/JobDetail";
import Applications from "./pages/Applications";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/user" component={Users} />
          <Route exact path="/user/profile-freelancer" component={FreelancerProfile} />
          <Route exact path="/user/profile-client" component={ClientProfile} />
          <Route exact path="/job" component={Jobs} />
          <Route exact path="/freelancerProfile" component={FreelancerProfile} />
          <Route exact path="/clientProfile" component={ClientProfile} />
          <Route exact path="/jobDetail" component={JobDetail} />
          <Route exact path="/applications" component={Applications} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;