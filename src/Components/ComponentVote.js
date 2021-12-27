import { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import {Button, Form} from 'reactstrap';

import '../CSS/stream.scss'

class PageShowStream extends Component {

    constructor(props){
        super(props);
    }



    render() {
        return (
            <div class="h_iframe-aparat_embed_frame">
                {/* <span style="display: block;padding-top: 57%"></span> */}
                <iframe scrolling="no" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  src ="https://www.aparat.com/embed/live/parsa_fahimizand"></iframe>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        stream: state.authenticate.stream
    }
};

const matchDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageShowStream)