import React from 'react';
import Navbar from './components/Nav/Navbar'
import Users from './components/User/Users'
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import ResetPassword from './components/User/ResetPassword';
import NewPassword from './components/User/NewPassword';
import SingleUser from './components/User/SingleUser';
import UpdateUser from './components/User/UpdateUser';
import CreatePost from './components/Posts/CreatePost';
import Posts from './components/Posts/Posts';
import SinglePost from './components/Posts/SinglePost';
import UpdatePost from './components/Posts/UpdatePost';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function Routes() {

  return (
      <Router>
        <Navbar />
        <br />
        <br />
        <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />

              <Route path="/users" exact component={Users} />
              <Route path="/reset" exact component={ResetPassword} />
              <Route path="/createpost" exact component={CreatePost} />

              <Route path="/" exact component={Posts} />
              <Route path="/reset/:token" exact component={NewPassword} />
              <Route path="/user/:userId" exact component={SingleUser} />
              <Route path="/user/update/:userId" exact component={UpdateUser} />
              <Route path="/post/update/:postId" exact component={UpdatePost} />
              <Route path="/post/:postId" exact component={SinglePost}/>
          </Switch>
      </Router>  
  );
}

// const RouteRegisteration = ({ auth, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         !auth ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// };

// const RouteProtected = ({ auth, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         auth ? <Component {...props} /> : <Redirect to="/Login" />
//       }
//     />
//   );
// };

export default Routes;
