import React from 'react';
import { Link, } from 'react-router-dom';

export default class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
  }
  // handleHeadHome() {
  //   this.props.history.push('/');
  // }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <form className="boxed-view__form">
            <h1>Page Not Found</h1>
            <p>{`Hmmm, we're unable to find that page.`}</p>
            <Link to="/" className="button button--link">Head Home</Link>
          </form>
        </div>
      </div>
    );
  }
}
