import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './messagesHeader';
import MessageForm from './messageForm';
import firebase from '../../firebase';
class Index extends React.Component {
	state = {
		messagesRef: firebase.database().ref('messages'),
		channel: this.props.currentChannel,
		user: this.props.currentUser
	};
	render() {
		const { messagesRef, channel, user } = this.state;
		return (
			<React.Fragment>
				<MessagesHeader />
				<Segment>
					<Comment.Group className="messages">{/*Messages*/}</Comment.Group>
				</Segment>
				<MessageForm
					messagesRef={messagesRef}
					currentChannel={channel}
					currentUser={user}
				/>
			</React.Fragment>
		);
	}
}

export default Index;
