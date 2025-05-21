import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';


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
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">About</Nav.Link>
                            <Nav.Link href="#other">Other</Nav.Link>

                        </Nav>
                        <Nav className="me-auto">
                         <button style={{width: "100px", backgroundColor:"gray", border: "none", padding: "10px 10px"}} onClick={handelLogout}>Signup</button>          
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
    )
    
}

export default Header