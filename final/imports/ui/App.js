import React from 'react';

import TitleBar from './TitleBar.js';
import AddPost from './AddPost.js';
import PostList from './PostList.js';
import Footer from './Footer.js';
import FlipMove from 'react-flip-move';

import PropTypes from 'prop-types';

export default class App extends React.Component {
  render(){
     return(<div>
        <TitleBar title={this.props.passedPropTitle} username={this.props.passedPropUsername}/>
        {/* wrap AddTopic and TopicList with a div that utilizes the wrapper class */}
        <div className="wrapper">
          <AddPost username={this.props.passedPropUsername}/>
            {/* <h1>test</h1> nothing will show up until we tell Add Topic.js what to do with h1
          </AddTopic>*/}
          <PostList passed_posts={this.props.passedPropAllPosts} username={this.props.passedPropUsername}/>
        </div>
        <Footer footerText={this.props.passedFooter} />
     </div>);
  }
};

App.propTypes = {
  passedPropTitle: PropTypes.string.isRequired,
  passedPropAllPosts: PropTypes.array.isRequired
};
