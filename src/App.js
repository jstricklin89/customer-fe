import React, { Component } from "react";
import "./App.css";
import CustomerDetail from "./CustomerDetail";

class App extends Component {
  state = {
    customers: [],
    toggle: false,
    customer: {}
  };

  componentDidMount() {
    fetch("http://localhost:10010/customer")
      .then(r => r.json())
      .then(json => this.setState({ customers: json.customers }))
      .then(() => this.setState({ toggle: true }));
  }

  updateCustList = () => {
    fetch("http://localhost:10010/customer")
      .then(r => r.json())
      .then(json => this.setState({ customers: json.customers }));
  };

  showCustomer = id => {
    fetch(`http://localhost:10010/customer/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(r => r.json())
      .then(customer => this.setState({ customer: customer }));
    this.setState({
      customer: this.state.customers[0]
    });
  };

  changeNumber = e => {
    e.preventDefault();
    const newNumber = document.getElementById("addInput");
    const customer = this.state.customer;

    fetch(`http://localhost:10010/customer/${customer.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        id: customer.id,
        name: customer.name,
        address: customer.address,
        phoneNumber: parseInt(newNumber.value),
        emailAddress: customer.emailAddress,
        birthDate: customer.birthDate
      })
    }).then(this.updateCustList());
  };

  render() {
    let toggle = this.state.toggle;
    return toggle ? (
      <div className="App">
        <h2>Customer List</h2>
        <input type="text" placeholder="SearchByPhone.." />
        {this.state.customers.map(customer => {
          return (
            <p
              key={customer.id}
              id={customer.id}
              onClick={() => this.showCustomer(customer.id)}
            >
              {customer.name}
            </p>
          );
        })}
        <CustomerDetail
          customer={this.state.customer}
          changeNumber={this.changeNumber}
        />
      </div>
    ) : null;
  }
}

export default App;
