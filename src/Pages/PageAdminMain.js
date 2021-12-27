import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'
import {
    Form, FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, CardSubtitle, Container, Row, Col,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';
import { Route, Switch} from 'react-router-dom';

import { getRoles } from '../redux/Game/actions';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { renderIntoDocument } from 'react-dom/test-utils';
import $ from 'jquery';
import ReconnectingWebSocket from 'reconnecting-websocket';

import PageAdminCreate from './PageAdminCreate';
import PageAdminGame from './PageAdminGame';
import { start } from '@popperjs/core';

export var rws = undefined;

class PageAdminMain extends Component {

    constructor(props) {
        super(props);
        this.websocket_url = "ws://127.0.0.1:8000/ws/game/admin";
    }


    start_web_socket = () => {
        if(rws == undefined)
        {
            rws = new ReconnectingWebSocket(this.websocket_url);
            rws.addEventListener('open', () => {
                console.log('Open');
                // rws.send("get_players_all");
                // let players = JSON.stringify(this.state.players)
                // rws.send('set_players:' + players)
                // rws.send('start');
            });
            rws.addEventListener('message', (event) => {
                
                // let message = event.data || event;
                // console.log(message);
            });
            rws.addEventListener('close', () => {
                console.log('Closed');
            });
        }
    }

    render() {
        this.start_web_socket();
        return (
            <div className='container'>
                <Switch>
                    <Route path={`/admin/main/game`}  component={PageAdminGame}/>
                    <Route path={`/admin/main/create`}  component={PageAdminCreate}/>
                </Switch>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.authenticate.loading,
        roles: state.game.roles
    }
};

const matchDispatchToProps = dispatch => {
    return {
        getRoles: (url) => dispatch(getRoles(url))
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageAdminMain)
