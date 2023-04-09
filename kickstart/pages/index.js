/*To-do
1) Configure web3 with a provider from the metmask
2) Tell web3 that a deployed copy  of the 'campaignFactory'
3) use factory instance to retrive a list of deployed campaigns 
4) use react to show somethings  about each campaign
*/
import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../route";

class CampaignIndex extends Component {
  
  static async getInitialProps() {
    // const cam = await factory.
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns.length);
    const requests = await Promise.all(
      Array(campaigns.length )
        .fill()
        .map((element, index) => {
          return factory.methods.campaignDetails(index).call();
        })
    );
    console.log(
      "cam",
      
      // await factory.methods.campaignDetails(0).call(),
      await Array(parseInt(campaigns.length - 1))
        .map( (elemnet, index) => {
          factory.methods.campaignDetails(index).call() 
        })
    );
    console.log(campaigns);
    return { campaigns ,requests};
  }

  renderCampaigns() {
    console.log(this.props.requests);
    const items = this.props.requests.map((address,index) => {
      return {
        header: address[1],
        description: (
          <Link route={`/campaigns/${address[0]}`}>
            View Campaign
          </Link>
        ),
        meta:address[0],
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaign</h3>
          <Link route="/campaigns/new">
              <Button
                floated="right"
                content="Create Campaign"
                icon="add"
                primary
              />
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
