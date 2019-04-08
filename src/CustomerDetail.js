import React, { Fragment } from "react";

const CustomerDetail = props => {
  return props.customer.name ? (
    <Fragment>
      <div className="Customer" style={{ border: "2px solid black" }}>
        <h4>{props.customer.name}</h4>
        <p>Address: {props.customer.address}</p>
        <p>Phone #: {props.customer.phoneNumber}</p>
        <form className="form" id="changePhoneForm">
          <input
            type="text"
            className="input"
            id="addInput"
            placeholder="Update Phone Number"
          />
          <button onClick={props.changeNumber}>Update</button>
        </form>
        <p>Email: {props.customer.emailAddress}</p>
        <p>BirthDate: {props.customer.birthDate}</p>
      </div>
    </Fragment>
  ) : null;
};

export default CustomerDetail;
