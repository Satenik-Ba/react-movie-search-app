import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './components/Main/MainPage';
import Auth from './components/Authenticataion/Auth';
import {
  SIGNIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
  USER_PAGE,
} from './constants/routes';
import { AuthProvider } from './components/Authenticataion/AuthContext';
import UserPage from './components/User/UserPage';

function App() {
  return (
    <div className="App">
    <AuthProvider>
        <Header />
      <Switch>
        <Route path={SIGNIN_ROUTE}>
          <Auth />
        </Route>
        <Route path={REGISTER_ROUTE}>
          <Auth />
        </Route>
        <Route path={HOME_ROUTE} exact>
          <MainPage />
        </Route>
        <Route path={USER_PAGE}>
          <UserPage />
        </Route>
      </Switch>
      <Footer />
    </AuthProvider>
    </div>
  );
}

export default App;
