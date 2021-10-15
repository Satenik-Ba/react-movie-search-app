import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainPage from "./components/Main/MainPage";
import Auth from "./components/Authenticataion/Auth";
import {
  SIGNIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE,
  USER_PAGE,
} from "./constants/routes";
import UserPage from "./components/User/UserPage";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserInfoActions } from "./components/redux/UserInfo";
import React, { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, "USER");
        dispatch(
          UserInfoActions.setUserInfo({
            userName: user.displayName,
            userEmail: user.email,
            userId: user.uid,
          })
        );
      } else {
        console.log("NO USER IS SIGNED IN ");
      }
    });
  }, [dispatch, auth]);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
