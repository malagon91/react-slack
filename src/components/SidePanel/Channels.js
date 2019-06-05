import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions';
import firebase from '../../firebase';

class Channels extends React.Component {
	state = {
		channels: [],
		modal: false,
		channelName: '',
		channelDetail: '',
		channelsRef: firebase.database().ref('channels'),
		user: this.props.currentUser,
		firstLoad: true
	};

	componentDidMount() {
		this.addListeners();
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	removeListeners = () => {
		this.state.channelsRef.off(); // always turn off the firebase refs on project
	};

	addListeners = () => {
		let loadedChannels = [];
		//listener that exexutes every time that a channel is added
		this.state.channelsRef.on('child_added', snap => {
			loadedChannels.push(snap.val());
			this.setState({ channels: loadedChannels }, () => {
				this.setFirstChannel();
			});
		});
	};

	setFirstChannel = () => {
		if (this.state.firstLoad && this.state.channels.length > 0) {
			const firstChannel = this.state.channels[0];
			this.changeChannel(firstChannel);
		}
		this.setState({ firstLoad: false });
	};

	addChannel = () => {
		const { channelsRef, channelName, channelDetail, user } = this.state;

		const key = channelsRef.push().key;

		const newChannel = {
			id: key,
			name: channelName,
			details: channelDetail,
			createdBy: {
				name: user.displayName,
				avatar: user.photoURL
			}
		};

		channelsRef
			.child(key)
			.update(newChannel)
			.then(() => {
				this.setState({
					channelName: '',
					channelDetail: ''
				});
				this.closeModal();
				console.log('chanel created');
			})
			.catch(err => {
				console.log('errror');
			});
	};

	displayChannels = channels =>
		channels.length > 0 &&
		channels.map(channel => (
			<Menu.Item
				key={channel.id}
				onClick={() => this.changeChannel(channel)}
				name={channel.name}
				style={{ opacity: 0.7 }}
				active={channel.id === this.state.activeChannel}
			>
				# {channel.name}
			</Menu.Item>
		));

	changeChannel = channel => {
		this.setActive(channel.id);
		this.props.setCurrentChannel(channel);
	};

	setActive = channel => {
		this.setState({ activeChannel: channel });
	};

	handldeSubmit = () => {
		if (this.isFormValid(this.state)) {
			this.addChannel();
		}
	};

	isFormValid = ({ channelName, channelDetail }) =>
		channelName && channelDetail;

	closeModal = () => this.setState({ modal: false });

	openModal = () => this.setState({ modal: true });

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		const { channels, modal } = this.state;
		return (
			<React.Fragment>
				<Menu.Menu style={{ paddingBottom: 'em' }}>
					<Menu.Item>
						<span>CHANNELS</span> ({channels.length}){' '}
						<Icon name="add" onClick={this.openModal} />
					</Menu.Item>
					{/*CHANNELS*/}
					{this.displayChannels(channels)}
				</Menu.Menu>
				<Modal basic open={modal} onClose={this.closeModal}>
					<Modal.Header>Add a Channel</Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Field>
								<Input
									fluid
									label="Name of channel"
									name="channelName"
									onChange={this.handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<Input
									fluid
									label="About the channel "
									name="channelDetail"
									onChange={this.handleChange}
								/>
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button color="green" onClick={this.handldeSubmit} inverted>
							<Icon name="checkmark" /> Add
						</Button>
						<Button color="red" inverted onClick={this.closeModal}>
							<Icon name="remove" /> Cancel
						</Button>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		);
	}
}

export default connect(
	null,
	{ setCurrentChannel }
)(Channels);
