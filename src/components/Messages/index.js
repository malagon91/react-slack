import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './messagesHeader';
import MessageForm from './messageForm';
class Index extends React.Component {
	render() {
		return (
			<React.Fragment>
				<MessagesHeader />
				<Segment>
					<Comment.Group className="messaged">{/*Messages*/}</Comment.Group>
				</Segment>
				<MessageForm />
			</React.Fragment>
		);
	}
}

export default Index;
