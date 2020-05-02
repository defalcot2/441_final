import React from 'react'; // specify the module and then specify the library name
                            // meteor takes care of the rest
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor'; // named export from Meteor
import {UP_Collection_Access} from './../imports/api/user_posts.js';
import {Likes_Collection_Access} from './../imports/api/user_posts.js';
import {Login_Collection_Access} from './../imports/api/user_login.js';
import LoginDisplay from './../imports/ui/LoginDisplay.js';
import App from './../imports/ui/App.js';

Meteor.startup(() => {
  Tracker.autorun(() => {

    // let allPostsInDB = UP_Collection_Access.find().fetch();
    // let allPostsInDB = UP_Collection_Access.find({votes: 3}).fetch();
    // the previous returns all topics that have 3 votes
    // change the votes to something else and they disappear

    let allPostsInDB = UP_Collection_Access.find({/*emty so get all posts */},
                                                  {sort: {date: -1}}).fetch();
    // the second argument {sort} is the options object

    let title = '441 final';

     if(!window.sessionStorage.getItem("username"))
         ReactDOM.render(
           <div>
               <LoginDisplay
                    passedPropTitle={title}
                    passedPropUsername={''}
                    passedPropAllPosts={allPostsInDB}
                    passedFooter={'\u00A9 441 final'/* \u00A9 unicode sequence for copyright */}
               />
          </div>, document.getElementById('content'));
     else {
          ReactDOM.render(
           <div>
               <App
                    passedPropTitle={title}
                    passedPropUsername={window.sessionStorage.getItem("username")}
                    passedPropAllPosts={allPostsInDB}
                    passedFooter={'\u00A9 441 final'/* \u00A9 unicode sequence for copyright */}
               />
          </div>, document.getElementById('content'));
     }
  });
});
