import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';

class MessageForm extends React.Component {
	render() {
		return (
			<Segment className="message_form">
				<Input
					fluid
					name="message"
					style={{ marginBottom: '0.7em' }}
					label={<Button icon="add" />}
					position="left"
					placeholder="writte your message"
				/>
				<Button.Group>
					<Button
						color="orange"
						content="add Replay"
						position="left"
						icon="edit"
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
