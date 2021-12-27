import { Component } from "react";
import { Route, Switch, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';


import {getStream, getPlayer} from '../redux/Authentication/actions'

import PageProfile from './Settings/PageProfile';
import PageCharge from './Settings/PageCharge';
import PageWithdraw from './Settings/PageWithdraw';
import PageStream from "./PageStream";
import PageStart from "./PageStart";
import Header from "../Components/Header";


class PageMain extends Component {

    componentDidMount(){
        this.props.getPlayer('api/player', this.props.phonenumber);
    }

    render() {
        // const {path} = this.props.match;
        return (
            <div>
                
                <Header /><br />

                <main>
                    
                <Switch>
                    <Route path={`/profile`}  component={PageProfile}/>
                    <Route path={`/charge`}  component={PageCharge}/>
                    <Route path={`/withdraw`}  component={PageWithdraw}/>
                    <Route path={`/start`}  component={PageStart}/>
                </Switch>
                </main>
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
        getStream: (url) => dispatch(getStream(url)),
        getPlayer: (url, data) => dispatch(getPlayer(url, data))
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(PageMain)