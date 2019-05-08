import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./userPanel";

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
        <UserPanel />
      </Menu>
    );
  }
}

export default Index;
