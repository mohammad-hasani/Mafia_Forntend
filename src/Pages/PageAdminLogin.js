import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'
import {
    Form, FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';

import { sendLogin } from '../redux/Authentication/actions'
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { renderIntoDocument } from 'react-dom/test-utils';


class PageAdminLogin extends Component {

    constructor(props) {
        super(props);
        this.url = 'api/loginadmin/'
        this.state = {
            redirect: undefined
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendLogin(this.state, this.url);
        this.setState({ redirect: '/admin/main' });
    }

    handleDataChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='container'>

                <Card className='m-auto' style={{ width: '500px', 'margin-top': '100px' }}>
                    <CardBody>
                        <CardTitle tag="h5">Admin</CardTitle>
                        <Form onSubmit={this.handleSubmit} className='mx-auto'>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" placeholder="Username" onChange={this.handleDataChange} />
                                <Label for="password">Password</Label>
                                <Input type="text" name="password" id="password" placeholder="Password" onChange={this.handleDataChange} />
                            </FormGroup>
                            <br />
                            <Button>Send</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.authenticate.loading,
        token: state.authenticate.token
    }
};

const matchDispatchToProps = dispatch => {
    return {
        sendLogin: (data, url) => dispatch(sendLogin(data, url))
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageAdminLogin)