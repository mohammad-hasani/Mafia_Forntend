import { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router";

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

import { recieveCharge, sendCharge, setChanged } from '../../redux/Authentication/actions';


class PageCharge extends Component {

    constructor(props) {
        super(props);

        this.props.setChanged(1);
    }

    componentDidMount() {
        this.props.recieveCharge('api/charge')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.sendCharge('api/charge', this.state);
        const url = 'http://127.0.0.1:8000/zarinpal/request?phonenumber=' + this.props.phonenumber + "&" + 'amount=' + this.state.amount;
        window.location.href = url;

    }

    handleDataChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} style={{ width: '300px' }} className='mx-auto'>
                    <FormGroup>
                        <Label for="exampleSelect">Amount</Label>
                        <Input type="select" name="amount" id="amount" onChange={this.handleDataChange}>
                            {(() => {
                                try {
                                    return this.props.payload.map(item => {
                                        return <option key={item.id} value={item.charge}>{item.charge}</option>
                                    })
                                } catch (e) { }
                            })()}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="discount">Discount</Label>
                        <Input type="text" name="discount" id="discount" placeholder="Discount" onChange={this.handleDataChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="total">Total</Label>
                        <Input type="text" name="total" id="total" placeholder="Total" disabled='true' />
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
        changed: state.authenticate.changed,
        payload: state.authenticate.payload
    }
};

const matchDispatchToProps = dispatch => {
    return {
        recieveCharge: (url) => dispatch(recieveCharge(url)),
        sendCharge: (url, data) => dispatch(sendCharge(url, data)),
        setChanged: (data) => dispatch(setChanged(data))
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageCharge)