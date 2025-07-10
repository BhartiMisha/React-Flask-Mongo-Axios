import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeaderComponent extends Component{
    render() {
        return(
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container-fluid justify-content-center">
                            <Link className="navbar-brand fw-bold fs-3 mx-auto text-center" to="/users">
                                <i className="bi bi-people-fill me-2"></i>User Management App
                            </Link>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent;
