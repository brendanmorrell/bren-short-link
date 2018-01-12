import { Meteor, } from 'meteor/meteor';
import { Mongo, } from 'meteor/mongo';
export const Links = new Mongo.Collection('links');
import SimpleSchema from 'simpl-schema';
import shortId from 'shortid';

if(Meteor.isServer) {// (what follows doesn't seem to be true. I used an arrow function and Meteor.userId() and it works still)meteor for some reason decided not to let us use Meteor.userId in publish functions, so we need to use a standard function with this binding to get the userId
  Meteor.publish('linksPublication', () => {// publishing requires a string name and a function as args
    return Links.find({ userId: Meteor.userId(), });// this returns all links to the server side
  });
}




// naming convention = resource.action
// ex: links.insert
Meteor.methods({// allows you to set methods that you can call in both client and server and have acccess to certain Meteor information in each specific environment
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'No userId found');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url,
      },
    }).validate({ url, });

    const linkAlreadyExists = Links.findOne({ userId: this.userId, url, });
    if (linkAlreadyExists) {
      throw new Meteor.Error('duplicate-entry', 'Url already exists in the database');
    }

    Links.insert({
      _id: shortId.generate(),
      url,
      userId: Meteor.userId(),
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null,
    });
  },


  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'no userId found');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      visible: {
        type: Boolean,
      },
    }).validate({ _id, visible, });
    Links.update({
      _id,
      userId: this.userId,
    }, {
      $set: { visible, },
    });
  },

  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({ _id, });
    Links.update({ _id, }, {
      $inc: { visitedCount: 1, },
      $set: { lastVisitedAt: new Date().getTime(),
      },
    });
  },
});
