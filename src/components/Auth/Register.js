import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from "md5";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    userRef: firebase.database().ref('users')
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) return false;
    else if (password !== passwordConfirmation) return false;
    else return true;
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      //Throw error
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (this.isPasswordValid(this.state)) {
      //Throw error
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      //form valid
      return true;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ errors: [], loading: true });
    if (!this.isFormValid()) return;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(createdUser);
        createdUser.user
          .updateProfile({
            displayName: this.state.username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`
          })
          .then(() => {
            this.saveUser(createdUser).then(() => {
              this.setState({ loading: false });
            });
          })
          .catch(err => {
            console.error(error);
            this.setState({
              loading: false,
              errors: this.state.errors.concat(err)
            });
          });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          loading: false,
          errors: this.state.errors.concat(error)
        });
      });
  };

  displayErrors = errors =>
    errors.map((error, index) => <p key={index}>{error.message}</p>);
  /*Valid if there is something on errors with the email word and change the class*/
  handleInputErrorFunction = (errors, name) =>
    errors.some(error => error.message.toLowerCase().includes(name))
      ? "error"
      : "";

  saveUser = createdUser => {
  return this.state.userRef.child(createdUser.user.uid)
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                value={username}
                placeholder="UserName"
                onChange={this.handleChange}
                type="text"
                className={this.handleInputErrorFunction("username")}
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                value={email}
                placeholder="email address"
                onChange={this.handleChange}
                type="email"
                className={this.handleInputErrorFunction("email")}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                className={this.handleInputErrorFunction("password")}
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                value={passwordConfirmation}
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                className={this.handleInputErrorFunction("password")}
              />

              <Button
                color="orange"
                fluid
                size="large"
                onClick={this.handleSubmit}
                className={loading ? "loading" : ""}
                disable={loading}
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
