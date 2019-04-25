import React, {Component} from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  isFormEmpty = ({username, email, password, passwordConfirmation}) => {
    return !username.length || !email.length
      || !password.length || !passwordConfirmation.length;
  };

  isPasswordValid = () => {

  };

  isFormValid = () => {
    let errors = [];
    let error;
    if(this.isFormEmpty(this.state)){
      //throw error
    }else if(this.isPasswordValid()){
      //Throw error
    }else{
      //form valid
      return true;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.isFormValid()) return;
      firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then( createdUser => {
        console.log(createdUser);
      }).catch(error => {
        console.error(error)
    });
  };

  render() {
    const {username, email, password, passwordConfirmation} = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange"/>
            Register for DevChat
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input fluid name="username" icon="user" iconPosition="left" value={username}
                          placeholder="UserName" onChange={this.handleChange} type="text"/>

              <Form.Input fluid name="email" icon="mail" iconPosition="left" value={email}
                          placeholder="email address" onChange={this.handleChange} type="email"/>

              <Form.Input fluid name="password" icon="lock" iconPosition="left" value={password}
                          placeholder="Password" onChange={this.handleChange} type="password"/>

              <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left" value={passwordConfirmation}
                          placeholder="Password Confirmation" onChange={this.handleChange} type="password"/>

              <Button color="orange" fluid size="large" onClick={this.handleSubmit}>Submit</Button>
            </Segment>
          </Form>
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;