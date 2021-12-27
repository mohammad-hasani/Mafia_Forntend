import { Component } from "react";
import {connect} from 'react-redux';

import {getProfileData, setProfileData, setChanged} from '../../redux/Authentication/actions';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';


class PageProfile extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            phonenumber: '',
            email: '',
            username: '',
            money: ''
        }
    }

    componentDidMount() {
        this.state = {
            phonenumber: this.props.phonenumber
        }
        this.props.getProfileData({phonenumber: this.props.phonenumber}, 'api/profile');
     }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.setProfileData(this.state, 'api/profile/');
    }

    handleDataChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    render(){
        if(this.props.changed == 1)
        {
            this.setState({phonenumber: this.props.phonenumber});
            this.setState({email: this.props.email});
            this.setState({username: this.props.username});
            this.setState({money: this.props.money});

            this.props.setChanged(0);    
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit} style={{width: '300px'}} className='mx-auto'>
                    <FormGroup>
                        <Label for="money">Money</Label>
                        <Input type="text" name="money" id="money" placeholder="Money" value={this.state.money} disabled='true' onChange={this.handleDataChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Username" value={this.state.username} onChange={this.handleDataChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phonenumber">Phone Number</Label>
                        <Input type="text" name="phonenumber" id="phonenumber" placeholder="Phone Number" value={this.state.phonenumber} disabled='true' onChange={this.handleDataChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Total</Label>
                        <Input type="text" name="email" id="email" placeholder="Email" value={this.state.email} disabled='true' onChange={this.handleDataChange} />
                    </FormGroup>
                    <br />
                    <Button>Send</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authenticate.loading,
        phonenumber: state.authenticate.phonenumber,
        username: state.authenticate.username,
        email: state.authenticate.email,
        money: state.authenticate.money,
        changed: state.authenticate.changed
    }
};

const matchDispatchToProps = dispatch => {
    return {
        getProfileData: (data, url) => dispatch(getProfileData(data, url)),
        setProfileData: (data, url) => dispatch(setProfileData(data, url)),
        setChanged: (data) => dispatch(setChanged(data))
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageProfile)