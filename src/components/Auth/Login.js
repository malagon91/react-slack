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

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  setErrorState = errors => {
    this.setState({
      errors: errors,
      loading: false
    });
  };

  isFormValid = ({ email, password }) => email && password;

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ errors: [], loading: true });
    if (!this.isFormValid(this.state)) return;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        console.log(signedInUser);
        this.setState({loading: false});
      })
      .catch(err => {
        console.log(err);
        this.setErrorState({ errors: this.state.errors.concat(err) });
      });
  };

  displayErrors = errors =>
    errors.map((error, index) => <p key={index}>{error.message}</p>);
  /*Valid if there is something on errors with the email word and change the class*/
  handleInputErrorFunction = (errors, name) =>
    errors.some(error => error.message.toLowerCase().includes(name))
      ? "error"
      : "";

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to DevChat
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                value={email}
                placeholder="email address"
                onChange={this.handleChange}
                type="email"
                className={this.handleInputErrorFunction(errors, "email")}
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
                className={this.handleInputErrorFunction(errors, "password")}
              />

              <Button
                color="violet"
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
            Don't have an account? <Link to="/register">register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
