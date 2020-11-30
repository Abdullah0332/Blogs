import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(){

    const user = localStorage.getItem("user")

    const LogOut = () => {
      window.location = ('/login')
      localStorage.removeItem("user");
    }

    return (
      <div >
        <AppBar>
          <Toolbar style={{display: 'flex'}}>
            <Typography variant="h5" style={{flexGrow: '1'}}>
              <Link className="navbar" to="/"><b>Blogs</b></Link>
            </Typography>
            <Typography style={{flexGrow: '20'}}>
              {user ? (
                <div>
                  <Link className="navbar" to="/Users" style={{margin:'0px 10px'}}>Users</Link>
                  <Link className="navbar" to="/createpost" style={{margin:'0px 10px'}}>Create Post</Link>
                </div>
              ) : (
                <Link className="navbar" to="/Users" style={{margin:'0px 10px'}}>Users</Link>
              )}
            </Typography>
            {user ? 
            (
              <Link className="navbar" to="/login" style={{margin:'0px 10px'}} onClick={LogOut} >Log out</Link> 
            ) : (
              <div>
                <Link className="navbar" to="/login" style={{margin:'0px 10px'}}>Login</Link>
                <Link className="navbar" to="/signup" style={{margin:'0px 10px'}}>Sign up</Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
}
