import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'
import {
    Form, FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';

import { sendLogin } from '../redux/Authentication/actions'
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { renderIntoDocument } from 'react-dom/test-utils';


class PageAuthenticate extends Component {

    constructor(props) {
        super(props);
        this.url = 'api/register/'
        this.state = {
            redirect: undefined
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendLogin(this.state, 'api/register/');
        this.setState({ redirect: '/authenticateconfirm' });
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
                        <CardTitle tag="h5">Login</CardTitle>
                        <Form onSubmit={this.handleSubmit} className='mx-auto'>
                            <FormGroup>
                                <Label for="phonenumber">Phone Number</Label>
                                <Input type="text" name="phonenumber" id="phonenumber" placeholder="Phone Number" onChange={this.handleDataChange} />
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

export default connect(mapStateToProps, matchDispatchToProps)(PageAuthenticate)