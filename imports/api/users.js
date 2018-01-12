import SimpleSchema from 'simpl-schema';
import { Accounts, } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {// built in validator function provided by meteor
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
  }).validate({ email, });


  return true;
});
