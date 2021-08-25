/*To-do
1) Configure web3 with a provider from the metmask
2) Tell web3 that a deployed copy  of the 'campaignFactory'
3) use factory instance to retrive a list of deployed campaigns 
4) use react to show somethings  about each campaign
*/
import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        ></link>

        {this.renderCampaigns()}
      </div>
    );
  }
}

export default CampaignIndex;
