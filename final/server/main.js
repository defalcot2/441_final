import { Meteor } from 'meteor/meteor';
import { UP_Collection_Access } from './../imports/api/user_posts.js';
import { Login_Collection_Access } from './../imports/api/user_login.js';
import { Likes_Collection_Access } from './../imports/api/user_posts.js';

Meteor.startup(() => {
  // code to run on server at startup
     Tracker.autorun(() => {
     });
});
