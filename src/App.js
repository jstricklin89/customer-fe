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

  searchNumber = () => {
    const phone = document.getElementById("phoneSearch");

    fetch(`http://localhost:10010/customer/phone/${phone.value}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(r => r.json())
      .then(numList => this.setState({ customers: numList }))
      .then(() => (phone.value = ""));
  };

  addCustomer = e => {
    e.preventDefault();
    const form = document.getElementById("newCustomer");
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const emailAddress = document.getElementById("email").value;
    const birthDate = document.getElementById("birthDate").value;

    fetch("http://localhost:10010/customer", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name,
        address,
        phoneNumber: parseInt(phoneNumber),
        emailAddress,
        birthDate: parseInt(birthDate)
      })
    })
      .then(form.reset())
      .then(this.updateCustList());
  };

  render() {
    let toggle = this.state.toggle;
    return toggle ? (
      <div className="App">
        <h2>Customer List</h2>
        <button onClick={this.updateCustList}>All Customers</button>
        <br />
        <br />
        <form id="newCustomer">
          <input type="text" id="name" placeholder="Name" />
          <input type="text" id="address" placeholder="Address" />
          <input type="number" id="phoneNumber" placeholder="Phone Number" />
          <input type="text" id="email" placeholder="Email" />
          <input type="number" id="birthDate" placeholder="Birth Date" />
          <button onClick={this.addCustomer}>Add Customer</button>
        </form>
        <br />
        <input type="text" id="phoneSearch" placeholder="FindByPhone #" />
        <button onClick={this.searchNumber}>Find</button>
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
