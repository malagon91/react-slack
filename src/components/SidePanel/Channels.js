import React from "react";
import { Menu, Icon } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    channels: []
  };
  render() {
    const { channels } = this.state;
    return (
      <Menu.Menu style={{ paddingBottom: "em" }}>
        <Menu.Item>
          <span>
            <Icon nme="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add"/>
        </Menu.Item>
        {/*CHANNELS*/}
      </Menu.Menu>
    );
  }
}

export default Channels;
