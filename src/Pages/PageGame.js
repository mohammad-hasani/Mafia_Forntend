import { support } from "jquery";
import { Component } from "react";
import {connect} from 'react-redux';

import ReconnectingWebSocket from 'reconnecting-websocket';
import {
    Form, FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, CardSubtitle, Container, Row, Col,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle, InputGroup
} from 'reactstrap';
import { getRoles } from '../redux/Game/actions';
import ComponentShowStream from "../Components/ComponentShowStream";


class PageGame extends Component {
    constructor(props)
    {
        super(props);
        this.websocket_url = "ws://127.0.0.1:8000/ws/game/user";
        this.state = {
            players: [],
            stream: false,
            start_vote: true,
            end_vote: false,
            game_over: false
        }
        this.props.getRoles('api/roles/');
    }
    componentDidMount(){
        this.rws = new ReconnectingWebSocket(this.websocket_url);
        
        this.rws.addEventListener('open', () => {
            this.rws.send('User');
        });
        this.rws.addEventListener('message', (event) => {
            let message = event.data || event;
            const message_type = message.substring(0, message.indexOf(":"));
            const message_data = message.substring(message.indexOf(":") + 1, message.length)
        
            console.log(message_data);
            console.log(message_type);

            if (message_type == 'start')
            {
                console.log('get_players');
                this.rws.send('get_players');
            }
            else if(message_type == 'get_players')
            {
                let json = JSON.parse(message_data);
                for(let i = 0; i < json.length; i++)
                {
                    json[i]['vote'] = 0;
                }
                this.setState({players: json});
            }
            else if(message_type == 'send_result')
            {
                let data = {phonenumber: this.props.phonenumber, players:[]};
                for(let i = 0; i < this.state.players.length; i++)
                {
                    data['players'].push({name: this.state.players[i]['name'], vote: this.state.players[i]['vote'], role: this.state.players[i]['role']})
                }
            }
            else if(message_type == 'show_stream')
            {
                this.setState({stream: true, start_vote: false, end_vote:false, start_vote_2:false, end_vote_2:false, game_over: false});
            }
            else if(message_type == 'start_vote')
            {
                this.rws.send('get_players');
                this.setState({stream: false, start_vote: true, end_vote:false, start_vote_2:false, end_vote_2:false, game_over:false});
            }
            else if(message_type == 'end_vote')
            {
                // rws.send('end_vote');
                this.setState({stream: false, start_vote: false, end_vote: true, start_vote_2:false, end_vote_2:false, game_over: false});
                var data = this.get_selected_playes();
                var jsondata = JSON.stringify(data)
                this.rws.send('pick_role:' + jsondata);
            }
            else if(message_type == 'start_vote_2')
            {
                this.rws.send('get_players');
                this.setState({stream: false, start_vote: false, end_vote:false, start_vote_2:true, end_vote_2:false, game_over:false});
            }
            else if(message_type == 'end_vote_2')
            {
                this.rws.send('end_vote_2');
                this.setState({stream: false, start_vote: false, end_vote: false, start_vote_2:false, end_vote_2:true, game_over: false});
            }
            else if(message_type == 'game_over')
            {
                this.setState({stream: false, start_vote: false, end_vote: false, start_vote_2:false, end_vote_2:false, game_over: true});
            }
        });
        this.rws.addEventListener('close', () => {
            console.log('Closed');
        });
    }

    get_selected_playes = () => {
        var data = []
        this.state.players.map((value, index) => 
        {
            if (value.role.length != 0 &&  value.role.toLowerCase() != "role")
            {
                data.push({'name': value.name, 'role': value.role});
            }
        });
        return data;
    }


    handleChange = (e, key) => {
        this.state.players[key][e.target.name] = e.target.value;
    }

    handleKill = (e, name) => {
        this.rws.send('kill_player_user:' + name);
    }
    
    render() {
        console.log(this.state);
        if(this.state.stream)
        {
            return <ComponentShowStream/>
        }
        else if(this.state.start_vote)
        {
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
                                        <Col className='d-flex'>
                                        <Button onClick={(e, name) => this.handleKill(e, item.name)} value="Kill" >Kill</Button>                       
                                        </Col>
                                    </Row>
                                </Container>
    
                            </Card>
    
                        })}
    
                    </div>
                </div>
            )
        }
        else if(this.state.end_vote)
        {
            return <ComponentShowStream/>
        }
        else if(this.state.start_vote_2)
        {
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
                                    </Row>
                                </Container>
    
                            </Card>
    
                        })}
    
                    </div>
                </div>
            )
        }
        else if(this.state.end_vote_2)
        {
            return <ComponentShowStream/>
        }
        else if(this.state.game_over)
        {
            return (
                <div>
                    THe GamE iS oVeR
                </div>
            )
        }
        
    }
}


const mapStateToProps = state => {
    return {
        loading: state.authenticate.loading,
        phonenumber: state.authenticate.phonenumber,
        username: state.authenticate.username,
        email: state.authenticate.email,
        money: state.authenticate.money,
        score: state.authenticate.score,
        rank: state.authenticate.rank,
        changed: state.authenticate.changed,
        stream: state.authenticate.stream,
        roles: state.game.roles
    }
};

const matchDispatchToProps = dispatch => {
    return {
        getRoles: (url) => dispatch(getRoles(url))
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageGame)