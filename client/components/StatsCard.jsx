import React from 'react'
import { Card, Icon, Feed } from 'semantic-ui-react'

class StatsCard extends React.Component {
    constructor(props) {
        super(props);
    }

    getRecentRun() {
        if (this.props.stats.history.length > 0) {
            var idx = this.props.stats.history.length - 1;
            var miles = Math.round(this.props.stats.history[idx].distance * 10) / 10;
            var minutes = Math.round((this.props.stats.history[idx].duration / 60) * 10) / 10;
            var date = (this.props.stats.history[idx].date).substring(0, 10);
            return ("You last ran " + miles + " miles in " + minutes + " minutes on " + date + ".");
        } else {
            return ("Can't find recent run data");
        }
    }

    getTotalMiles() {
        if (this.props.stats.history.length > 0) {
            var totalMiles = 0;
            for (var i = 0; i < this.props.stats.history.length; i++) {
                totalMiles += this.props.stats.history[i].distance;
            }
            totalMiles = Math.round(totalMiles * 10) / 10;
            return ("You've run " + totalMiles + " miles since signing up!");
        } else {
            return ("Can't find total mile data");
        }
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        Statistics
        </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Date content='Most recent run' />
                                <Feed.Summary>
                                    {this.getRecentRun()}
                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Date content='Average mile time' />
                                <Feed.Summary>
                                    You averaged <a>dynamic mile time</a> a mile last week.
                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Date content='Total miles run' />
                                <Feed.Summary>
                                    {this.getTotalMiles()}
                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        )
    }
}

export default StatsCard