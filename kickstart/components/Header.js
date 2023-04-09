import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../route";

const header = (props) => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/" className="item"> CrowdCoin
      </Link>
      <Menu.Menu position="right">
        <Link route="/" className="item"> Campaign
        </Link>
        <Link route="/campaigns/new" className="item"> +
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default header;
