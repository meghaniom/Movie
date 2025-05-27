import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import logout from '../assets/image/logout.png'


const Header = () => {
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const handelLogout = () => {
        localStorage.removeItem("currentUser");
        // localStorage.clear(currentUser);
        navigate("/login");
        if (!currentUser) {
            return null;
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">MovieSite</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='p-2.5 header-change' to="/">Home</Link>
                        <Link className='p-2.5 header-change' to="/movie">About</Link>
                        <Link className='p-2.5 header-change' to="/movie">Other</Link>
                        <style jsx>
                            {
                                `
                .header-change {
                    text-decoration: none;
                    color: black;
                    font-weight: 500;
                    font-size: 18px;
                    transition: color 0.3s ease;
                }
                .header-change:hover {
                    color: #0d6efd;
                    text-decoration: none;
                }
                `        }
                        </style>
                    </Nav>
                    <Nav className="me-auto">

                        <img src={logout} style={{ width: "27px", height: "27px" }} alt="" onClick={handelLogout} />
                        <span style={{ paddingLeft: "10px" }}>
                            Logout
                        </span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Header