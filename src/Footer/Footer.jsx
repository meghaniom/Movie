import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import instagram from '../assets/image/instagram.png';
import Tiktok from '../assets/image/tik-tok.png'
import discord from '../assets/image/discord.png'
import facebook from '../assets/image/facebook.png'
import twitter from '../assets/image/twitter.png'
import youtube from '../assets/image/youtube.png'
// import plex from '../assets/image/plex.png'
import linkdin from '../assets/image/linkedin.png'
const Footer = () => {
    return (
        <footer className="bg-dark text-white py-5">
            <Container>
                <Row>
                    <div style={{
                        width: "100px",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    }}>
                        <img
                            src="https://www.plex.tv/wp-content/themes/plex/assets/img/plex-logo.svg"
                            alt="Plex Logo"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                    {/* Company Column */}
                    <Col md={2} className="mb-4">
                        <h5>Company</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white-50">About</a></li>
                            <li><a href="#" className="text-white-50">Careers</a></li>
                            <li><a href="#" className="text-white-50">Our Culture</a></li>
                            <li><a href="#" className="text-white-50">Giving</a></li>
                            <li><a href="#" className="text-white-50">Partners</a></li>
                            <li><a href="#" className="text-white-50">News</a></li>
                            <li><a href="#" className="text-white-50">Pilot Program</a></li>
                            <li><a href="#" className="text-white-50">The Pilot Blog</a></li>
                            <li><a href="#" className="text-white-50">Adventure with Us</a></li>
                        </ul>
                    </Col>

                    {/* Go Premium Column */}
                    <Col md={2} className="mb-4 ">
                        <h5>Go Premium</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white-50">Plans</a></li>
                            <li><a href="#" className="text-white-50">Placency</a></li>
                            <li><a href="#" className="text-white-50">Pilot Labs</a></li>
                            <li><a href="#" className="text-white-50">Get Pinks</a></li>
                        </ul>
                    </Col>

                    {/* Downloads Column */}
                    <Col md={2} className="mb-4">
                        <h5>Downloads</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white-50">Plex Media Server</a></li>
                            <li><a href="#" className="text-white-50">Plex Apps</a></li>
                            <li><a href="#" className="text-white-50">Placency</a></li>
                            <li><a href="#" className="text-white-50">Plex Dash</a></li>
                            <li><a href="#" className="text-white-50">Where to Watch</a></li>
                        </ul>
                    </Col>

                    {/* Support Column */}
                    <Col md={2} className="mb-4">
                        <h5>Support</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white-50">Finding Help</a></li>
                            <li><a href="#" className="text-white-50">Support Library</a></li>
                            <li><a href="#" className="text-white-50">Community Partner</a></li>
                            <li><a href="#" className="text-white-50">Community Guidelines</a></li>
                            <li><a href="#" className="text-white-50">Billing Questions</a></li>
                            <li><a href="#" className="text-white-50">Status</a></li>
                            <li><a href="#" className="text-white-50">Big Journey</a></li>
                            <li><a href="#" className="text-white-50">Coordinator</a></li>
                            <li><a href="#" className="text-white-50">Get in Touch</a></li>
                        </ul>
                    </Col>

                    {/* Watch Free Column */}
                    <Col md={2} className="mb-4">
                        <h5>Watch Free</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white-50">Discover on Plex</a></li>
                            <li><a href="#" className="text-white-50">TV Channel Finder</a></li>
                            <li><a href="#" className="text-white-50">What to Watch</a></li>
                            <li><a href="#" className="text-white-50">Where To Watch on Wealth</a></li>
                            <li><a href="#" className="text-white-50">Where To Watch on Hub</a></li>
                            <li><a href="#" className="text-white-50">Ask Photos</a></li>
                            <li><a href="#" className="text-white-50">Customer's Day Preview</a></li>
                            <li><a href="#" className="text-white-50">Chairman Photos</a></li>
                        </ul>
                    </Col>
                </Row>

                {/* Bottom Copyright Row */}
                <Row className="mt-4 pt-3 border-top border-secondary">
                    <Col>
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                            <div className="mb-2">
                                <span className="text-white-50">Copyright © {new Date().getFullYear()} Plex.</span>

                                <a href="#" className="text-white-50 me-3">Privacy & Legal</a>
                                <a href="#" className="text-white-50 me-3">Accountability</a>
                                <a href="#" className="text-white-50 me-3">Hostage Cookies</a>
                                <span className="text-white-50">Language: English (US)</span>
                            </div>
                            <div className="mb-2">
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <img src={instagram} alt="" style={{ color: "rgba(255, 255, 255, .4)" }} />
                                    <img src={Tiktok} alt="" style={{ color: "rgba(255, 255, 255, .4)" }} />
                                    <img src={facebook} alt="" style={{ color: "rgba(255, 255, 255, .4)" }} />
                                    <img src={twitter} alt="" style={{ color: "rgba(255, 255, 255, .4)" }} />
                                    <img src={youtube} alt="" style={{ color: "rgba(255, 255, 255, .4)" }} />
                                    <img src={discord} alt="" style={{ color: "rgba(255, 255, 255, .4)" }} />
                                    <img src={linkdin} alt="" style={{ color: "rgba(255, 255, 255, .4)" }} />
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;