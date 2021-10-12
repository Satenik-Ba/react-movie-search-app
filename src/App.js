import './App.css';
import Footer from './components/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './components/Main/MainPage';
import Auth from './components/Authenticataion/Auth';
import {SIGNIN_ROUTE, REGISTER_ROUTE, HOME_ROUTE} from './constants/routes'
import { AuthProvider } from './components/Authenticataion/AuthContext';

function App() {
  return (
    <AuthProvider>
      <header>
        <Header />
      </header>
      <Switch>
        <Route path={SIGNIN_ROUTE}>
          <Auth />
        </Route>
        <Route path={REGISTER_ROUTE}>
          <Auth />
        </Route>
        <Route path={HOME_ROUTE}>
          <MainPage />
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default App;
