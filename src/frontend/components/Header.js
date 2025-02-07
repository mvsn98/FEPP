import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { logout } from '../actions/auth'
import { history } from '../routers/AppRouter'

const Header = (props) => {
  
    const signOut = ()=>{
      localStorage.removeItem('auth');
      props.logout();
      axios.post("http://localhost:3000/users/logout", { dummy: '' }, { headers: { Authorization: 'Bearer ' + props.token } }).then(()=>{
        history.push("/console");
      })
    }

    return (
    <header className="header">
      <div className="navbar-container">
        <div className="header__content">
          <Link className="header__title" to="/home">
            <h1>Admin Control Panel</h1>
          </Link>
          <div className="header__links">
            <Link to="/create" className="header__links--item">
              <button className="button button--link">Create New Account</button>
            </Link>
            <Link to="/edit" className="header__links--item">
              <button className="button button--link">Edit A Profile</button>
            </Link>
            <Link to="#">
              <button className="button button--link" onClick={signOut}>Logout</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token
})

const mapDispatchToProps = (dispatch)=>({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);