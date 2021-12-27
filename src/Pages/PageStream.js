import { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import {Button, Form} from 'reactstrap';


class PageStream extends Component {

    constructor(props){
        super(props);

        this.state = {
            redirect: undefined
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("ASDF");
        this.setState({redirect: '/game'})
    }


    render() {
        console.log(this.state);
        if (this.state.redirect)
        {
            console.log(this.state.redirect);
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <p></p>
                {/* //     { <TwitchEmbed
            //             channel="amouranth"
            //             id="moonstar_x"
            //             theme="dark"
            //             muted
            //             onVideoPause={() => console.log(':(')} /> } */}

                <Form onSubmit={this.handleSubmit} className='mx-auto'>
                    <Button>Go TO Game</Button>
                </Form>

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

export default connect(mapStateToProps, matchDispatchToProps)(PageStream)