import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'
import {
    Form, FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, CardSubtitle, Container, Row, Col,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';

import { getRoles } from '../redux/Game/actions';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { renderIntoDocument } from 'react-dom/test-utils';
import $ from 'jquery';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Alert } from 'bootstrap';
import PageAdminMain from './PageAdminMain';
import {rws} from './PageAdminMain';


class PageAdminCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: undefined,
            players: []
        }
        this.websocket_url = "ws://127.0.0.1:8000/ws/game/admin";
        this.props.getRoles('api/roles/');

    }

    componentDidMount() {
        this.setState({ players: [{ id: 0, name: '', role: '', avatar: '' }] });
    }

    handleAddButton = (e) => {
        let players = this.state.players;
        let id = 0;
        if (players.length > 0) {
            id = players[players.length - 1].id + 1;
        }
        const name = "";
        const avatar = "";
        const role = "";
        const values = { id: id, name: name, role: role, avatar: avatar }
        players.push(values)
        this.setState({ players: players });
    }

    handleRemoveButton = (e, id) => {
        let new_players = this.state.players.filter((item) => item.id != id);
        this.setState({ players: new_players });

    }

    handleStart = () =>
    {
        let players = JSON.stringify(this.state.players)
        rws.send('set_players:' + players)
        rws.send('start');
        this.setState({redirect: '/admin/main/game'});
    }

    handleChange = (e, key) => {
        this.state.players[key][e.target.name] = e.target.value;
    }

    readURL = (e, key) => {
        const input = $("#input" + key)[0];
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img' + key)
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    render() {
       
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        console.log(this.state.players);
        return (
            <div className='container'>
                <Button onClick={this.handleAddButton}>Add</Button>
                <br/>
                <div id='players'>

                    {this.state.players.map((item) => {
                        return <Card key={item.id}>
                            <Container>
                                <Row className='align-items-center'>
                                    <Col className='d-flex justify-content-start'> 
                                        <Label>
                                            <Input type='file' id={"input" + item.id} style={{display: 'none'}} onChange={(e, key) => this.readURL(e, item.id)} />
                                            <img id={"img" + item.id} src="#" alt="Avatar" style={{width: '100px'}} />           
                                        </Label>          
                                    </Col>
                                    <Col className='d-flex'>
                                        <Input type='text' id='name' name='name' onChange={(e, key) => this.handleChange(e, item.id)} placeholder='name' />
                                    </Col>
                                    <Col className='d-flex'>
                                        <Input type="select" name="role" onChange={(e, key) => this.handleChange(e, item.id)} id="select">
                                            <option>Role</option>
                                            {(() => {
                                                try {
                                                    return this.props.roles.map(item => {
                                                        return <option value={item.name}>{item.name}</option>
                                                    })
                                                } catch (e) { }
                                            })()}
                                        </Input>
                                    </Col>
                                    <Col className='d-flex justify-content-end'>
                                        <Button onClick={(e, id) => this.handleRemoveButton(e, item.id)}>Remove</Button>
                                    </Col>
                                </Row>
                            </Container>

                        </Card>

                    })}

                </div>
                <br/>
                    <Button onClick={this.handleStart}>Start</Button>
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

export default connect(mapStateToProps, matchDispatchToProps)(PageAdminCreate)