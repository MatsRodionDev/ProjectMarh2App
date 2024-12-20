import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { PROJECTS_ROUTE, USERS_ROUTE, USER_PROFILE } from '../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from "../stores/slices/roleSlice";
import { setAccount } from "../stores/slices/accountSlice";
import { useMediaQuery } from 'react-responsive';

const NavigationBar = () => {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.role.role);
    const [isOpen, setIsOpen] = useState(false);

    // Проверка на ширину экрана с использованием useMediaQuery
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    if (!role) {
        return null;
    }

    const handleLogout = () => {
        localStorage.setItem('delicious-token', "");
        dispatch(setRole(null));
        dispatch(setAccount(null));
        setIsOpen(false);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleNavLinkClick = () => {
        setIsOpen(false); // Закрываем меню при нажатии на навигационную ссылку
    };

    const styles = {
        navbar: {
            width: '100%',
            position: 'relative',
            padding: '15px'
        },
        sidebar: {
            position: 'fixed',
            top: 0,
            left: isOpen ? 0 : '-250px',
            height: '100%',
            width: '250px',
            backgroundColor: '#f8f9fa',
            transition: 'left 0.3s ease',
            paddingTop: '60px',
            zIndex: 1000,
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: isOpen ? 'block' : 'none',
            zIndex: 999,
        },
        navLink: {
            textAlign: 'center',
            padding: '15px 0',
            fontSize: '18px',
        },
        button: {
            margin: '15px auto',
            display: 'block',
        },
        desktopNav: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
        },
        desktopNavLinks: {
            display: 'flex',
            gap: '15px',
        },
        rightAligned: {
            marginLeft: 'auto', // Сдвигает элементы вправо
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
    };

    return (
        <>
            <Navbar bg="light" expand="lg" style={styles.navbar}>
                <Navbar.Brand as={Link} to={PROJECTS_ROUTE}>
                    Project Management
                </Navbar.Brand>
                {isDesktop ? (
                    <div style={styles.desktopNav}>
                        <Nav style={styles.desktopNavLinks}>
                            <Nav.Link as={Link} to={PROJECTS_ROUTE}>
                                Projects
                            </Nav.Link>
                            {role === 'Admin' && (
                                <Nav.Link as={Link} to={USERS_ROUTE}>
                                    Users
                                </Nav.Link>
                            )}
                        </Nav>
                        <div style={styles.rightAligned}>
                            <Nav.Link as={Link} to={USER_PROFILE}>
                                <i className="fas fa-user"></i>
                            </Nav.Link>
                            <Button variant="outline-secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <Navbar.Toggle onClick={toggleSidebar} />
                        <div style={styles.sidebar}>
                            <Nav className="flex-column">
                                <Nav.Link
                                    as={Link}
                                    to={PROJECTS_ROUTE}
                                    style={styles.navLink}
                                    onClick={handleNavLinkClick}
                                >
                                    Projects
                                </Nav.Link>
                                {role === 'Admin' && (
                                    <Nav.Link
                                        as={Link}
                                        to={USERS_ROUTE}
                                        style={styles.navLink}
                                        onClick={handleNavLinkClick}
                                    >
                                        Users
                                    </Nav.Link>
                                )}
                                <Nav.Link
                                    as={Link}
                                    to={USER_PROFILE}
                                    style={styles.navLink}
                                    onClick={handleNavLinkClick}
                                >
                                    <i className="fas fa-user"></i>
                                </Nav.Link>
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleLogout}
                                    style={styles.button}
                                >
                                    Logout
                                </Button>
                            </Nav>
                        </div>
                        {isOpen && <div style={styles.overlay} onClick={() => setIsOpen(false)}></div>}
                    </>
                )}
            </Navbar>
        </>
    );
};

export default NavigationBar;
