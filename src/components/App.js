import React, { Component } from "react";
import "./App.css";
import { Grid } from "semantic-ui-react";
import {connect} from 'react-redux';
import ColorPanel from "./ColorPanel";
import SidePanel from "./SidePanel";
import Messages from "./Messages";
import MetaPanel from "./MetaPanel";

class App extends Component {
  render() {
    return (
      <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel currentUser={this.props.currentUser} />
        <Grid.Column style={{marginLeft:320}}>
          <Messages />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(App);
