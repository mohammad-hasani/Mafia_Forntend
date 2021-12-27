import { Component } from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router";

import {Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button} from 'reactstrap';

import {sendLogin, sendLoginConfirm} from '../redux/Authentication/actions'

class PageAuthenticateConfirm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            phonenumber: this.props.phonenumber,
            redirect: undefined
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.state = {
            ...this.state,
            phonenumber: this.props.phonenumber,
        }
        this.props.sendLogin(this.state, 'api/registerconfirm/');
    }

    handleDataChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    render() {
        if(this.props.token)
        {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='container'>
                <Card className='m-auto' style={{ width: '500px' }}>
                    <CardBody>
                        <CardTitle tag="h5">Confirmation</CardTitle>
                        <Form onSubmit={this.handleSubmit} className='mx-auto'>
                            <FormGroup>
                                <Label for="code">Code</Label>
                                <Input type="text" name="code" id="code" placeholder="Code" onChange={this.handleDataChange} />
                            </FormGroup>
                            <br />
                            <Button>Send</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authenticate.loading,
        token: state.authenticate.token,
        phonenumber: state.authenticate.phonenumber
    }
};

const matchDispatchToProps = dispatch => {
    return {
        sendLogin: (data, url) => dispatch(sendLoginConfirm(data, url))
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageAuthenticateConfirm)