import React from 'react';
import { Card, Image } from 'semantic-ui-react'

class About extends React.Component {
    render() {
        return (
        <div>
            <Card>
                <Image src='http://i.imgur.com/IHOKglT.jpg' />
                <Card.Content>
                    <Card.Header>
                        Emily Yang
                    </Card.Header>
                    <Card.Meta>
                        <span className='title'>
                            Developer
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        "What do you mean?"
                    </Card.Description>
                </Card.Content>
            </Card>
            <Card>
                <Image src='http://i.imgur.com/OeefFsX.jpg' />
                <Card.Content>
                    <Card.Header>
                        Brandon Kleiman
                    </Card.Header>
                    <Card.Meta>
                        <span className='title'>
                            Developer & Scrum Lord
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        "I cried 3 times during 'Ferris Bueller's Day Off.' No one has even come close to matching the ambition and vision of John Hughes' 1986 feel-good masterpiece in 31 years of cinema since then, and the only way I've found to cope with the fact that I've already seen the only truly great work of art out there is to clear my mind through running."
                    </Card.Description>
                </Card.Content>
            </Card>
            <Card>
                <Image src='http://i.imgur.com/vPAFGVL.jpg' />
                <Card.Content>
                    <Card.Header>
                        Marcie Anderson
                    </Card.Header>
                    <Card.Meta>
                        <span className='title'>
                            Developer
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        "Yeah I love tedium and death"
                    </Card.Description>
                </Card.Content>
            </Card>
            <Card>
                <Image src='http://i.imgur.com/ntnQndc.jpg' />
                <Card.Content>
                    <Card.Header>
                        Zach Carr
                    </Card.Header>
                    <Card.Meta>
                        <span className='title'>
                            Developer & Project Manager
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        "Ohana means family, and family means no one gets left behind."
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
        )
    }
}

export default About