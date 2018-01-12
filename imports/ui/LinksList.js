import { Meteor, } from 'meteor/meteor';
import React from 'react';
import { Tracker, } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import { Links, } from '../api/links';
import LinksListItem from './LinksListItem';
import AddLink from './AddLink';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      visibleLinks: [],
      showHidden: false,
      syncingWithDatabase: true,
      sortedByVisitedCount: true,
      sortedByLastVisited: false,
      rvsSorting: false,
    };
  }
  componentDidMount() {
    Meteor.subscribe('linksPublication', {// just takes the string name of the publication you want, and then you can add an onReady call if you want the function to fire only when it's ready and has synced with the database
      onReady: () => this.setState({ syncingWithDatabase: false, }),
    });
    this.linksTracker = Tracker.autorun(() => {
      const links = Links.find({ }).fetch();
      const visibleLinks = Links.find({ visible: true, }).fetch();
      this.setState({ links, visibleLinks, });
    });
  }
  componentWillUnmount() {
    this.setState({ syncingWithDatabase: true, });
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    if (this.state.syncingWithDatabase) {
      return (
        <div className="item">
          <p className="item__status-message">Syncing with database...</p>
        </div>
      );
    }
    if (this.state.links.length < 1) {
      return (
        <div className="item">
          <p className="item__status-message">No links found</p>
        </div>
      );
    }
    let linksArrayToRender;
    if(this.state.showHidden) {
      linksArrayToRender = this.state.links;
    } else {
      linksArrayToRender = this.state.visibleLinks;
      if(linksArrayToRender.length === 0) {
        return (
          <div className="item">
            <p className="item__status-message">{`All your links are currently hidden. Click 'show hidden links' to view links`}</p>
          </div>
        );
      }
    }

    if(this.state.sortedByVisitedCount) {
      const sortedByVisitedCount = linksArrayToRender.sort(( a, b ) => {
        let comparison = 0;
        const visitedCountA = a.visitedCount;
        const visitedCountB = b.visitedCount;
        if (visitedCountA > visitedCountB) {
          comparison = -1;
        } else if (visitedCountA < visitedCountB) {
          comparison = 1;
        }
        if (this.state.rvsSorting) {
          return comparison * -1;
        }
        return comparison;
      });
      return sortedByVisitedCount.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
      });
    } else if (this.state.sortedByLastVisited) {
      const sortedByLastVisited = linksArrayToRender.sort(( a, b ) => {
        let comparison = 0;
        const lastVisitedAtA = a.lastVisitedAt;
        const lastVisitedAtB = b.lastVisitedAt;
        if(lastVisitedAtA > lastVisitedAtB) {
          comparison = -1;
        } else if (lastVisitedAtA < lastVisitedAtB) {
          comparison = 1;
        }
        if(this.state.rvsSorting) {
          return comparison * -1;
        }
        return comparison;
      });
      return sortedByLastVisited.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
      });
    }
    return undefined;
  }
  onSelectShowHideCheckbox() {
    this.setState((prevState) => ({ showHidden: !prevState.showHidden, }));
  }
  onSelectRvsSorting() {
    this.setState((prevState) => ({ rvsSorting: !prevState.rvsSorting, }));
  }
  onSelectSortedByLastVisited() {
    this.setState({ sortedByLastVisited: true, sortedByVisitedCount: false, });
  }
  onSelectSortedByVisitedCount() {
    this.setState({ sortedByLastVisited: false, sortedByVisitedCount: true, });
  }
  render() {
    return (
      <div>
        <div className="filters__container">
          <div>
            <label className="checkbox">
              <input
                className="option-input radio"
                type="radio"
                checked={this.state.sortedByVisitedCount}
                onChange={this.onSelectSortedByVisitedCount.bind(this)}
              />sort by visited count
            </label>
            <label className="checkbox">
              <input
                className="option-input radio"
                type="radio"
                checked={this.state.sortedByLastVisited}
                onChange={this.onSelectSortedByLastVisited.bind(this)}
              />sort by last visited
            </label>
          </div>
          <div>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={this.state.rvsSorting}
                onChange={this.onSelectRvsSorting.bind(this)}
                className="option-input checkbox"
              />reverse sorting
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={this.state.showHidden}
                onChange={this.onSelectShowHideCheckbox.bind(this)}
                className="option-input checkbox"
              />show hidden links
            </label>
          </div>
        </div>
        <AddLink />
        <div>
          <FlipMove maintainContainerHeight={true}>
            {this.renderLinksListItems()}
          </FlipMove>
        </div>
      </div>
    );
  }
}
