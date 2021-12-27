import { Component } from "react";
import { Route, Switch, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Jumbotron, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import PageGame from "./PageGame";
import PageStream from "./PageStream";


class PageStart extends Component {

    render() {
        return (
            <div>

                <Jumbotron>
                    <Container>
                        <Row>
                            <Col><img src='' />
                                <span>Online:</span><span>0</span></Col>
                            <Col><img src='' />
                                <span>Reward Price</span>:<span>0</span></Col>
                            <Col><img src='' />
                            <span>Money:</span><span>{this.props.money}</span></Col>
                            <Col><span>Rank:</span><span>{this.props.rank}</span></Col>
                            <Col><span>Score:</span><span>{this.props.score}</span></Col>

                        </Row>
                    </Container>
                </Jumbotron>



                <Switch>
                    <Route path={`/start`} component={PageStream} />
                    <Route path={`/stream`} component={PageStream} />
                    {/* <Route path={`/game`} component={PageGame} /> */}
                </Switch>

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
        score: state.authenticate.score,
        rank: state.authenticate.rank,
        changed: state.authenticate.changed,
        stream: state.authenticate.stream
    }
};

const matchDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageStart)