import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>
      <div className="page-content">
        <LinksList />
      </div>
    </div>
  );
};



// import { Meteor, } from 'meteor/meteor';

// componentWillMount() {
//   if (!Meteor.userId()) {
//     this.props.history.push('/signup');
//   }
// }
