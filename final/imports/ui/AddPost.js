import React from 'react'; // we need this for jsx and we are referencing React.components

// the following import is needed b/c the processFormDataFunction needs access to the db
import {UP_Collection_Access} from './../api/user_posts.js';

export default class AddPost extends React.Component {
  processFormDataFunction(event){

      event.preventDefault()
      let currUser = this.props.username;
      let newPost = event.target.formInputNameAttribute.value;
      if (newPost){
        event.target.formInputNameAttribute.value = '';
        UP_Collection_Access.insert({
          postId: -1,
          user: currUser,
          post: newPost,
          likes: 0,
          date: new Date(),
        });
      } else {
          alert("Please enter text into the textbox");
     }
  }
  render(){

    return (
      <div className='single-block-item-style'>
        {/*this.props.children  access a prop that we did not pass in - children is a built in prop */}
        <form className='form' onSubmit={this.processFormDataFunction.bind(this)}>
          <input className='form__input' type='text' name='formInputNameAttribute' placeholder='Whats on your mind' />
          <button className='button'>Post</button>
        </form>
      </div>
    )
  }

};
