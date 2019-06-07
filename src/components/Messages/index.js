import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './messagesHeader';
import MessageForm from './messageForm';
import firebase from '../../firebase';
import Message from './message';
class Index extends React.Component {
	state = {
		messagesRef: firebase.database().ref('messages'),
		channel: this.props.currentChannel,
		user: this.props.currentUser,
		messages: [],
		messagesLoading: true
	};

	componentDidMount() {
		const { channel, user } = this.state;
		if (channel && user) {
			this.addListeners(channel.id);
		}
	}

	addListeners = channelId => {
		this.addMesssageListener(channelId);
	};

	addMesssageListener = channelId => {
		let loadedMessages = [];
		this.state.messagesRef.child(channelId).on('child_added', snap => {
			loadedMessages.push(snap.val());
			console.log(loadedMessages);
			this.setState({ messages: loadedMessages, messagesLoading: false });
		});
	};

	displayMessages = messages =>
		messages.length > 0 &&
		messages.map(message => (
			<Message
				key={message.timestamp}
				message={message}
				user={this.state.user}
			/>
		));

	render() {
		const {
			messagesRef,
			messages,
			messagesLoading,
			channel,
			user
		} = this.state;
		return (
			<React.Fragment>
				<MessagesHeader />
				<Segment>
					<Comment.Group className="messages">
						{/*Messages*/}
						{this.displayMessages(messages)}
					</Comment.Group>
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
