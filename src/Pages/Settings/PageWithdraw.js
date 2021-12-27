import { Component } from "react";
import {connect} from 'react-redux';

import {sendWithdraw} from '../../redux/Authentication/actions';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label, Input, FormText,
    Jumbotron
} from 'reactstrap';


class PageWithdraw extends Component {


    constructor(props)
    {
        super(props);
        this.state = {
            phonenumber: this.props.phonenumber
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendWithdraw(this.state, 'api/withdraw/');
    }

    handleDataChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} style={{width: '300px'}} className='mx-auto'>
                    <FormGroup>
                        <Label for="cardnumber">Money</Label>
                        <Input type="text" name="cardnumber" id="cardnumber" placeholder="Card Number" onChange={this.handleDataChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Name" onChange={this.handleDataChange} />
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
        phonenumber: state.authenticate.phonenumber
    }
};

const matchDispatchToProps = dispatch => {
    return {
        sendWithdraw: (data, url) => dispatch(sendWithdraw(data, url)),
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageWithdraw)