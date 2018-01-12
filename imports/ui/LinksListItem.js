import React from 'react';
import { Meteor, } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false,
      cannotCopy: false,
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.buttonInput);

    this.clipboard.on('success', () => {// find this in clipboard docs
      this.setState(() => ({ cannotCopy: false, justCopied: true, }));
      setTimeout(() => this.setState(() => ({ justCopied: false, })), 1000);
    }).on('error', () => {
      this.setState(() => ({ cannotCopy: true, }));
    });
  }
  componentWillUnmount() {
    this.clipboard.destroy();// free up memory when the component is removed
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if(typeof this.props.lastVisitedAt === 'number') {
      const momenLastVisitedAt = moment(this.props.lastVisitedAt).fromNow();
      visitedMessage = `(last visited ${momenLastVisitedAt})`;
    }
    return (
      <p className="item__message">
        {this.props.visitedCount}
        &nbsp;
        {visitMessage}
        &nbsp;
        {visitedMessage}
      </p>
    );
  }
  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>{/*          this section below with data-clipboard-text is unique to clipboard and allows whatever is in there to be the target of a new Cliboard constructor function */}
        {this.renderStats()}
        <a
          href={this.props.shortUrl}
          target="_blank"
          className="button button--pill button--link"
        >
          Visit
        </a>
        <button
          ref={(button) => {this.buttonInput = button;}} data-clipboard-text={this.props.shortUrl}
          className="button button--pill"
        >
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button
          onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
          }}
          className="button button--pill button--link"
        >
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
        {this.state.cannotCopy && <p>Error Copying Link. Please Copy Manually</p>}
      </div>
    );
  }
}


LinksListItem.propTypes = {
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
};


// you can use browser selectors if you want like below, but there is a library that is better(clipboard)
// document.querySelector('input').select()
// document.execCommand('copy')
