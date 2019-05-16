import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./userPanel";
import Channels from "./Channels";

class Index extends React.Component {
  render() {
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2em" }}
      >
        <UserPanel currentUser={this.props.currentUser} />
        <Channels />
      </Menu>
    );
  }
}

export default Index;
