import React from 'react';
import { NavLink, } from 'react-router-dom';
import { Meteor, } from 'meteor/meteor';

export default class LoginPage extends React.Component {
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
  onLogin(e) {
    e.preventDefault();
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();
    Meteor.loginWithPassword({ email, }, password, (err) => {
      if(err) {
        return this.setState({ error: `Unable to login. ${err.reason}`, });
      }
      return this.setState({ error: '', });
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Link</h1>

          <form noValidate className="boxed-view__form">
            {this.state.error && <p>{this.state.error}</p>}
            <input type="email" ref={(input) => {this.emailInput = input;}} name="email" placeholder="Email" />
            <input type="password" ref={(input) => {this.passwordInput = input;}} name="password" placeholder="Password" />
            <button onClick={this.onLogin.bind(this)} className="button">Login</button>
          </form>

          <p>Need to create a <NavLink to="/signup">new account?</NavLink></p>

          {/* <button onClick={() => {this.props.history.push('/signup');}}>Have an account</button> */}
        </div>
      </div>
    );
  }
}
