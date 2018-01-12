import React from 'react';
import PropTypes from 'prop-types';
import { Accounts, } from 'meteor/accounts-base';

const PrivateHeader = ({ title, }) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{title}</h1>
        <button
          className="button button--link-text"
          onClick={() => Accounts.logout()}
        >Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PrivateHeader;





// version where you use a regular (not a stateless functional) Component

// export default class PrivateHeader extends React.Component {
//   onLogout() {
//     Accounts.logout();
//   }
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <button onClick={this.onLogout.bind(this)}>Logout</button>
//       </div>
//     );
//   }
// }

// Version where you call a variable with an arrow function

// const PrivateHeader = ({ title, }) => {
//   const logout = () => {
//     return Accounts.logout();
//   };
//   return (
//     <div>
//       <h1>{title}</h1>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };
