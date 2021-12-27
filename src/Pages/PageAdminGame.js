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
import {rws} from './PageAdminMain';


class PageAdminGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            players: []
        }

    }

    componentDidMount()
    {
        rws.addEventListener('message', (event) => {
            let message = event.data || event;

            console.log('fffffffffffffffff');

            const message_type = message.substring(0, message.indexOf(":"));
            const message_data = message.substring(message.indexOf(":") + 1, message.length)
        
            console.log(message_data);

            if (message_type == 'get_players_all')
            {
                console.log('aaaaaaaaaaaaafgfgsdfgsdfgaaaaaaaaaaaaaaaaaaaaaaaa');
                let json = JSON.parse(message_data);
                this.setState({players: json});
            }
        });

        rws.send("get_players_all");
    }
    

    handleKill = (e, name) => {
        rws.send('kill_player:' + name);
    }

    handleActions = (e, action) => {
        rws.send(action + ':');
    }


    render() {
        return (
            <div className='container'>
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
                                        <Input type='text' id='name' name='name' value={item.name} disabled />
                                    </Col>
                                    <Col className='d-flex'>
                                        <Input type='text' id='role' name='role' value={item.role} disabled />
                                    </Col>
                                    <Col className='d-flex justify-content-center'>
                                        <Button onClick={(e, name) => this.handleKill(e, item.name)} value="Kill" >Kill</Button>
                                    </Col>
                                </Row>
                            </Container>

                        </Card>

                    })}

                </div>
                <br/>
                <div>
                <Container>
                    <Row className='align-items-center'>
                    <Col className='d-flex justify-content-center'> 
                        
                        </Col>
                        <Col className='d-flex justify-content-center'> 
                        <Button onClick={(e, name) => this.handleActions(e, 'show_stream')} value="Stream" >Stream</Button>                       
                        </Col>
                        <Col className='d-flex justify-content-center'> 
                        <Button onClick={(e, name) => this.handleActions(e, 'start_vote')} value="Start Vote" >Start Vote</Button>                      
                        </Col>
                        <Col className='d-flex justify-content-center'> 
                        <Button onClick={(e, name) => this.handleActions(e, 'end_vote')} value="End Vote" >End Vote</Button>                      
                        </Col>
                        
                        <Col className='d-flex justify-content-center'> 
                        <Button onClick={(e, name) => this.handleActions(e, 'start_vote_2')} value="Start Vote 2" >Start Vote 2</Button>                      
                        </Col>
                        <Col className='d-flex justify-content-center'> 
                        <Button onClick={(e, name) => this.handleActions(e, 'end_vote_2')} value="End Vote 2" >End Vote 2</Button>                      
                        </Col>

                        <Col className='d-flex justify-content-center'> 
                        <Button onClick={(e, name) => this.handleActions(e, 'game_over')} value="GameOver" >Game Over</Button>                      
                        </Col>
                        <Col className='d-flex justify-content-center'> 
                        
                        </Col>
                        
                    </Row>
                </Container>
               
                
                
                </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(PageAdminGame)