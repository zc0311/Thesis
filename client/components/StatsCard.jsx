import React from 'react';
import { Card, Icon, Feed, Dimmer, Loader, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class StatsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goals: [],
            packs: [],
        }
    } 
    
    componentWillReceiveProps(props) {
        this.setState({
            goals: props.userdata.goals,
            packs: props.userdata.myPacks,
        })
    }
    
    // getRecentRun() {
    //     if (this.props.stats.history.length > 0) {
    //         var idx = this.props.stats.history.length - 1;
    //         var miles = Math.round(this.props.stats.history[idx].distance * 10) / 10;
    //         var converter = function secondsToHms(d) {
    //             d = Number(d);
    //             var h = Math.floor(d / 3600);
    //             var m = Math.floor(d % 3600 / 60);
    //             var s = Math.floor(d % 3600 % 60);

    //             var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    //             var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    //             var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    //             return hDisplay + mDisplay + sDisplay; 
    //         }
    //         var duration = converter(this.props.stats.history[idx].duration);
    //         // var minutes = Math.round((this.props.stats.history[idx].duration / 60) * 10) / 10;
    //         var date = (this.props.stats.history[idx].date).substring(0, 10);
    //         return ("You last ran " + miles + " miles in " + duration + " on " + date + ".");
    //     } else {
    //         return ("Can't find recent run data");
    //     }
    // }

    // getTotalMiles() {
    //     if (this.props.stats.history.length > 0) {
    //         var totalMiles = 0;
    //         for (var i = 0; i < this.props.stats.history.length; i++) {
    //             totalMiles += this.props.stats.history[i].distance;
    //         }
    //         totalMiles = Math.round(totalMiles * 10) / 10;
    //         return ("You've run " + totalMiles + " miles since signing up!");
    //     } else {
    //         return ("Can't find total mile data");
    //     }
    // }
    acceptChallenge(id, index) {
        axios.put('/api/goals', {
        id: id,
        status: 'accepted'
        })
        .then((res) => {
            var newGoals = this.state.goals.slice();
            newGoals.splice(index, 1)
            this.setState({
                goals: newGoals,
            })
        })
    }
    
    decChallenge(id, index) {
        axios.request({
            url: '/api/goals',
            method: 'delete',
            data: { id: id }
        }).then((res) => {
            var newGoals = this.state.goals.slice();
            newGoals.splice(index, 1)
            this.setState({
                goals: newGoals,
            })
        })
    }
    
    acceptPack(id, index) {
        axios.put('/api/packs', {
            id: id,
            user: this.props.userdata.DBID,
        })
        .then((res) => {
            var newPacks = this.state.packs.slice();
            newPacks.splice(index, 1);
            this.setState({
                packs: newPacks
            })
        })
    }
    
    declinePack(id, index) {
        axios.request({
            url: '/api/packs',
            method: 'delete',
            data: { 
            id: id, 
            user: this.props.userdata.DBID,
         }
        }).then((res) => {
            var newPacks = this.state.packs.slice()
            newPacks.splice(index, 1)
            this.setState({
                packs: newPacks,
            })
        })
    }

    render() {
        return (
            <Card className="teal">
                <Card.Content>
                    <Card.Header>
                        Overview
        </Card.Header>
                </Card.Content>
                <Card.Content>
                { this.props.userdata.loading === true ? (<Segment>
                    <Dimmer active inverted>
                    <Loader size="small">Loading</Loader>
                    </Dimmer><br /><br /><br /><br />
                </Segment>) : (
                    <Feed>
                        {this.state.goals.length === 0 ? (<div></div>) : ( 
                            <Feed.Event>
                            <Feed.Content>
                                <Feed.Date content='Recent Challenges:' />
                                    {this.state.goals.map((goal, idx) => {
                                        if (goal.source !== null && goal.status === 'pending') {
                                            return (<div key={idx}><Feed.Summary>Challenge from <a>{goal.source}</a>{": " + goal.description + " "}<Feed.Meta>(<a onClick={() => this.acceptChallenge(goal.id, idx)}>Accept</a> | <a onClick={() => this.decChallenge(goal.id, idx)}>Decline</a>)</Feed.Meta></Feed.Summary></div>)
                                        }
                                    })}
                                    <br />
                            </Feed.Content>
                        </Feed.Event> ) }
                        {this.state.packs.length === 0 ? (<div></div>) : (
                            <Feed.Event>
                            <Feed.Content>
                                <Feed.Date content='New Pack Invitations:' />
                                    {this.state.packs.map((pack, idx) => {
                                        if (pack.Users_Packs.confirmed === "FALSE") {
                                            return (<div key={idx}><Feed.Summary>You've been invited by to join <a>{pack.name} </a><Feed.Meta>(<a onClick={() => this.acceptPack(pack.id, idx)}>Accept</a> | <a onClick={() => this.declinePack(pack.id, idx)}>Decline</a>)</Feed.Meta></Feed.Summary></div>)
                                        }
                                    })}
                                    <br />
                            </Feed.Content>
                        </Feed.Event>) }
                    </Feed>
                )}
                </Card.Content>
            </Card>
        )
    }
}
