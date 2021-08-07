import React from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting on tranction success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ message: "You have been entered!" });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}. There are currently{" "}
          {this.state.players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>
        <hr />
        <from onSubmit={this.onSubmit}>
          <h4>Want try your luck?</h4>
          <div>
            <label>Amount of ether to enter </label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })
              }
            />
          </div>
          <button>ENTER</button>
        </from>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
