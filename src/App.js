import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Billing from './pages/Billing';
import SignIn from './pages/SignIn';
import Main from './components/layout/Main';
import Users from './pages/Users';
import Jobs from './pages/Jobs';
import FreelancerProfile from './pages/Profile/Freelancer/FreelancerProfile';
import ClientProfile from './pages/Profile/Client/ClientProfile';
import JobDetail from './pages/Job/JobDetail';
import Applications from './pages/Applications';
import 'antd/dist/antd.css';
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import { authState } from 'recoil/atom';
import useAuthActions from 'recoil/action';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import PageNotFound from 'pages/404/PageNotFound';
import LocalStorageUtils from 'utils/LocalStorageUtils';

function App() {
  const { autoLogin } = useAuthActions();

  useEffect(() => {
    autoLogin();
  }, []);

  const token = LocalStorageUtils.getToken();

  return (
    <div className='App'>
      <Switch>
        <Route path='/sign-in' exact component={SignIn} />
        {token ? (
          <Main>
            <Route exact path='/dashboard' component={Home} />
            <Route exact path='/billing' component={Billing} />
            <Route exact path='/user' component={Users} />
            <Route
              exact
              path='/user/profile-freelancer/:accountId'
              component={FreelancerProfile}
            />
            <Route
              exact
              path='/user/profile-client/:accountId'
              component={ClientProfile}
            />
            <Route exact path='/job' component={Jobs} />
            <Route
              exact
              path='/freelancerProfile'
              component={FreelancerProfile}
            />
            <Route exact path='/clientProfile' component={ClientProfile} />
            <Route exact path='/jobDetail' component={JobDetail} />
            <Route exact path='/applications' component={Applications} />
            <Route path='*' element={<PageNotFound />} />
          </Main>
        ) : (
          <Redirect to='/sign-in' />
        )}
      </Switch>
    </div>
  );
}

export default App;
