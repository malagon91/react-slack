import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';
class MessageForm extends React.Component {
	state = {
		message: '',
		loading: false,
		channel: this.props.currentChannel,
		user: this.props.currentUser,
		errors: []
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	sendMessage = () => {
		const { messagesRef } = this.props;
		const { message, channel, user } = this.state;

		if (message) {
			// send message
			this.setState({ loading: true });
			messagesRef
				.child(channel.id)
				.push()
				.set(this.createdMessage())
				.then(() => {
					this.setState({ loading: false, message: '', errors: [] });
				})
				.catch(err => {
					console.error(err);
					this.setState({
						loading: false,
						errors: this.state.errors.concat(err)
					});
				});
		} else {
			this.setState({
				errors: this.state.errors.concat({ message: 'add a message' })
			});
		}
	};

	createdMessage = () => ({
		timestamp: firebase.database.ServerValue.TIMESTAMP,
		content: this.state.message,
		user: {
			id: this.state.user.uid,
			name: this.state.user.displayName,
			avatar: this.state.user.photoURL
		}
	});

	render() {
		const { errors } = this.state;
		return (
			<Segment className="message_form">
				<Input
					fluid
					name="message"
					onChange={this.handleChange}
					style={{ marginBottom: '0.7em' }}
					label={<Button icon="add" />}
					position="left"
					placeholder="writte your message"
					className={
						errors.some(error => error.message.includes('message'))
							? 'error'
							: ''
					}
				/>
				<Button.Group>
					<Button
						color="orange"
						content="add Replay"
						position="left"
						icon="edit"
						onClick={this.sendMessage}
					/>
					<Button
						color="teal"
						content="upload media"
						position="right"
						icon="cloud upload"
					/>
				</Button.Group>
			</Segment>
		);
	}
}

export default MessageForm;
