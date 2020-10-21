import React from 'react'
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faHome } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import './Layout.css';

function Layout({ children }) {
    const marg = { margin: 1 }
    return (
        <div>
            <Navbar expand="lg" className="custom-nav">
                <Navbar.Brand><h6 className="navLink">TASK</h6></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/"><h6 className="navLink"><FontAwesomeIcon icon={faHome} style={marg} />{' '}Home</h6> </Nav.Link>
                        <Nav.Link as={Link} to="/forms"> <h6 className="navLink"><FontAwesomeIcon icon={faFile} style={marg} />{' '}Forms</h6></Nav.Link>
                        <Nav.Link as={Link} to="/records"> <h6 className="navLink"><FontAwesomeIcon icon={faFileAlt} style={marg} />{' '}Records</h6></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="m-2">
                {children}
            </div>
        </div>
    )
}

export default Layout
