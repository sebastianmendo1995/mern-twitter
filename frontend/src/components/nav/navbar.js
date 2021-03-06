import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <ul className='nav'>
                    <li><Link to={'/tweets'} className="active">All Tweets</Link></li>
                    <li><Link to={'/profile'}>Profile</Link></li>
                    <li><Link to={'/new_tweet'}>Write a Tweet</Link></li>
                    <li><button className='btn btn-logout' onClick={this.logoutUser}>Logout</button></li>
                </ul>
            );
        } else {
            return (
                <ul className='nav'>
                    <li><Link to={'/signup'}>Signup</Link></li>
                    <li><Link to={'/login'}>Login</Link></li>
                </ul>
            );
        }
    }

    render() {
        return (
            <div className='navbar'>
                <h1>Chirper</h1>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;
