import { Route, Switch, Redirect } from "react-router-dom";
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
  VIDEO_PAGE,
} from "./constants/routes";
import UserPage from "./components/User/UserPage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserInfoActions } from "./components/redux/UserInfo";
import React, { useEffect } from "react";
import VideoMoviePage from "./components/Main/VideoMoviePage";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          UserInfoActions.setUserInfo({
            userName: user.displayName,
            userEmail: user.email,
            userId: user.uid,
          })
        );
      }
      //  else {
      //   console.log('NO USER IS SIGNED IN ');
      // }
    });
  }, [dispatch, auth]);
  const isAuthenticated = useSelector(
    (state) => state.userInfo.isAuthenticated
  );

  return (
    <div className="App">
      <Switch>
        <Route path={SIGNIN_ROUTE}>
          <Auth />
        </Route>
        <Route path={REGISTER_ROUTE}>
          <Auth />
        </Route>
        <Route path={HOME_ROUTE} exact>
          <Header />
          <MainPage />
          <Footer />
        </Route>
        {isAuthenticated && (
          <Route path={USER_PAGE}>
            <Header />
            <UserPage />
            <Footer />
          </Route>
        )}
        <Route path={VIDEO_PAGE}>
          <Header />
          <VideoMoviePage />
        </Route>
        <Redirect to={HOME_ROUTE}></Redirect>
      </Switch>
    </div>
  );
}

export default App;
