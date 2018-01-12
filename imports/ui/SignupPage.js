import React from 'react';
import { NavLink, } from 'react-router-dom';
import { Accounts, } from 'meteor/accounts-base';


export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  componentWillMount() {
    if (Meteor.userId()) {
      this.props.history.push('/links');
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();

    if (password.length < 8) {
      return this.setState({ error: 'Password must be at least 8 characters', });
    }
    Accounts.createUser({ email, password, }, (err) => {// first arg is object with account object, second is a callback that runs if there is an error
      if(err) {
        return this.setState({error: err.reason, });
      }
      return this.setState({error: '', });
    });
    return undefined;
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Link</h1>

          <form noValidate className="boxed-view__form">
            {this.state.error && <p>{this.state.error}</p>}
            <input type="email" ref={(input) => {this.emailInput = input;}} name="email" placeholder="Email" />
            <input type="password" ref={(input) => {this.passwordInput = input;}} name="password" placeholder="Password" />
            <button onClick={this.onSubmit.bind(this)} className="button">Create Account</button>
          </form>
          Already have an account?
          <NavLink to="/">
            <p>Login</p>
          </NavLink>
        </div>
      </div>
    );
  }
}
