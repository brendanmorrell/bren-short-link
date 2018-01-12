import React from 'react';
import { Meteor, } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: '',
    };
  }
  onSubmit(e) {
    const { url, } = this.state;
    e.preventDefault();
    Meteor.call('links.insert', url, (err) => {
      if(!err) {
        this.handleModalClose();
      } else{
        this.setState({ error: err.reason, });
      }
    });
  }
  onUrlFieldChange(e) {
    this.setState({ url: e.target.value.trim(), });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      url: '',
      error: '',
    });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ isOpen: true, })} className="button">+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.textInput.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal-overlay"
        >
          <h1>Add Link</h1>
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              type="text"
              ref={(input) => {this.textInput = input;}}
              value={this.state.url}
              onChange={this.onUrlFieldChange.bind(this)}
              placeholder="URL" />
            <button className="button">Add Link</button>
            {this.state.error && <p>{this.state.error}</p>}
            <button type="button" onClick={this.handleModalClose.bind(this)} className="button button--secondary">Cancel</button>
            {/* by setting this cancel button type to 'button' you tell the browser that it is just a button not a submit button even though it's inside the form */}
          </form>
        </Modal>
      </div>
    );
  }
}
