import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../route";

class ContributeForm extends Component {
  state = {
    value: "",
    errMassage:"",
    load:"",
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    console.log("address:- ",this.props.address);

    this.setState({ load:true });

    try {
      const accounts = await web3.eth.getAccounts();
      const contribute = await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      await contribute.wait()
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errMassage: err.message });
    }

    this.setState({ load:false, value:'',errMessage: ""  })
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errMassage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errMassage}/>
        <Button primary loading= {this.state.load}>Contribute!</Button>
      </Form>
    );
  }
}

export default ContributeForm;
