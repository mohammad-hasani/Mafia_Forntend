import React, { useState } from 'react';
import { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = (e) => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    render() {

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/"></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        
                        <Nav className="mx-auto" navbar>
                            <NavItem>
                                <Link className='nav-link' to={`/profile`}>Profile</Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to={`/charge`}>Charge</Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to={`/withdraw`}>Withdraw</Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to={`/start`}>Start</Link>
                            </NavItem>
                        </Nav>
                        
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default Header;