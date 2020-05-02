import React from 'react'; // we need this for jsx and we are referencing React.components
import {UP_Collection_Access} from './../api/user_posts.js';
import {Likes_Collection_Access} from './../api/user_posts.js';
import PropTypes from 'prop-types';

let recursiveDelete = function(passedId) {
   let replies = UP_Collection_Access.find({postId: passedId}).fetch();
   let liked = Likes_Collection_Access.find({postId: passedId}).fetch();
   if(liked.length > 0)
        liked.forEach((item, i) => {
             Likes_Collection_Access.remove({_id: item._id});
        });
   if(replies.length > 0)
        replies.forEach((item, i) => {
             recursiveDelete(item._id);
             UP_Collection_Access.remove({_id: item._id});
        });
}

export default class RenderPost extends React.Component {
  processFormDataFunction(event){
      event.preventDefault()
      let currUser = this.props.username;
      let currPostId = this.props.post_prop_obj._id;
      let newPost = event.target.formInputNameAttribute.value;
      if (newPost){
        event.target.formInputNameAttribute.value = '';
        UP_Collection_Access.insert({
          postId: currPostId,
          post: newPost,
          user: currUser,
          likes: 0,
          date: new Date(),
        });
      } else {
          alert("Please enter text into the textbox");
     }
  }
  renderReplies() {
     let repliesForPostInDB = UP_Collection_Access.find({postId: this.props.post_prop_obj._id},
                                              {sort: {date: -1}}).fetch();
     if(repliesForPostInDB.length === 0){}
     else {
          return repliesForPostInDB.slice(0, 3).map((post) => {
               return <RenderPost key={post._id} post_prop_obj={post} username={this.props.username}/>
          });
     }
  }
  convertPost(post, id) {
     var str = post.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1'>$1</a>");
     var text = str.replace(/(^|[^\/])(www\.[\S]+(\b|$))/gim, '$1<a target="_blank" href="http://$2">$2</a>');
     var checkExist = setInterval(function() {
        if ($('#'+id).length) {
           document.getElementById(id).innerHTML = text;
           clearInterval(checkExist);
        }
     }, 100);
  }
  renderDelete() {
     if(this.props.post_prop_obj.user == this.props.username || this.props.username == 'root') {
          return(
               <button className='button' onClick = {() => { recursiveDelete(this.props.post_prop_obj._id); UP_Collection_Access.remove({_id: this.props.post_prop_obj._id});}}>Delete</button>
          );
     }
  }
  renderLike() {
     let liked = Likes_Collection_Access.find({postId: this.props.post_prop_obj._id, user: this.props.username}).fetch();
     if(liked.length == 0)
          return(
               <button className='button' onClick = {() => { UP_Collection_Access.update({_id: this.props.post_prop_obj._id}, {$inc: {likes: 1}}); Likes_Collection_Access.insert({postId: this.props.post_prop_obj._id, user: this.props.username}); }}>Like</button>
          );
     else
          return(
               <button className='button' onClick = {() => { UP_Collection_Access.update({_id: this.props.post_prop_obj._id}, {$inc: {likes: -1}}); liked.forEach((item, i) => {
                    Likes_Collection_Access.remove({_id: item._id});
               });}}>Dislike</button>
          );
  }
  render() {
    return (
        <div key={this.props.post_prop_obj._id} className='single-block-item-style'>
          <div className='post'>
            <div>
              <h3 className='post__topic'><div id={this.props.post_prop_obj._id}></div></h3>
              <p className='post__stats'>By: {this.props.post_prop_obj.user}</p>
              <p className='post__stats'>Likes: {this.props.post_prop_obj.likes}</p>
               {this.convertPost(this.props.post_prop_obj.post, this.props.post_prop_obj._id)}
            </div>
            <div className='post__actions'>
                {this.renderLike()}
                {this.renderDelete()}
            </div>
          </div>
          <br />
          {this.renderReplies()}
          <br />
          <form className='form' onSubmit={this.processFormDataFunction.bind(this)}>
               <input className='form__input' type='text' name='formInputNameAttribute' placeholder='Reply' />
               <button className='button'>Reply</button>
          </form>
        </div>
    );
  }
}

RenderPost.propTypes = {
  post_prop_obj: PropTypes.object.isRequired,
};
