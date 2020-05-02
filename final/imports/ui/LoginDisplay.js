import React from 'react';

import TitleBar from './TitleBar.js';
import AddPost from './AddPost.js';
import PostList from './PostList.js';
import Footer from './Footer.js';
import App from './App.js';
import FlipMove from 'react-flip-move';
import ReactDOM from 'react-dom';

import {Login_Collection_Access} from './../api/user_login.js';

import PropTypes from 'prop-types';

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

export default class LoginDisplay extends React.Component {
  processFormDataLogin(event){
      event.preventDefault()

      let username = event.target.formInputUserNameAttribute.value;
      let password = event.target.formInputPasswordAttribute.value;
      let loginUser = Login_Collection_Access.find({username: username, password: password}).fetch();
      if( !username || !password) {
          alert("Username or password is empty");
      } else if(loginUser.length == 0) {
          alert("Invalid username and/or password");
      }
      else {
           window.sessionStorage.setItem("username", username);
           ReactDOM.render(
            <div>
                <App
                     passedPropTitle={this.props.passedPropTitle}
                     passedPropUsername={username}
                     passedPropAllPosts={this.props.passedPropAllPosts}
                     passedFooter={'\u00A9 441 final'/* \u00A9 unicode sequence for copyright */}
                />
           </div>, document.getElementById('content'));
     }
  }
  processFormDataRegister(event){
      event.preventDefault()
      let username = event.target.formInputUserNameAttribute.value;
      let password = event.target.formInputPasswordAttribute.value;
      let confirmPassword = event.target.formInputConfirmPasswordAttribute.value;
      if( !username || !password || !confirmPassword) {
          alert("Username or password is empty");
      } else if(password != confirmPassword) {
          alert("Password does not match confirmation");
      }
      else{
           let loginUser = Login_Collection_Access.find({username: username}).fetch();
           if(loginUser.length == 0) {
               Login_Collection_Access.insert({
                 username: username,
                 password: password,
                });
               window.sessionStorage.setItem("username", username);
               ReactDOM.render(
               <div>
                   <App
                        passedPropTitle={this.props.passedPropTitle}
                        passedPropUsername={username}
                        passedPropAllPosts={this.props.passedPropAllPosts}
                        passedFooter={'\u00A9 441 final'/* \u00A9 unicode sequence for copyright */}
                   />
              </div>, document.getElementById('content'));
          } else {
               alert("Username already taken");
          }
      }
  }
  render(){
     return(
     <div>
          <div>
               <div className='single-block-item-style__login'>
                    <form className='form__login' onSubmit={this.processFormDataLogin.bind(this)}>
                         <input className='form__input__login' type='text' name='formInputUserNameAttribute' placeholder='Username' />
                         <br />
                         <input className='form__input__login' type='text' name='formInputPasswordAttribute' placeholder='Password' />
                         <br />
                         <button className='button'>Login</button>
                    </form>
               </div>
               <div className="wrapper__right">
                    <div>
                         <p></p>
                    </div>
                    <form className='form__register' onSubmit={this.processFormDataRegister.bind(this)}>
                         <input className='form__input__register' type='text' name='formInputUserNameAttribute' placeholder='Username' />
                         <br /><br /><input className='form__input__register' type='text' name='formInputPasswordAttribute' placeholder='Password' />
                         <br /><br /><input className='form__input__register' type='text' name='formInputConfirmPasswordAttribute' placeholder='Confirm Password' />
                         <br /><br /><button className='button'>Register</button>
                    </form>
               </div>
          </div>
          <Footer footerText={this.props.passedFooter} />
     </div>
     );
  }
};

LoginDisplay.propTypes = {
  passedPropTitle: PropTypes.string.isRequired,
  passedPropAllPosts: PropTypes.array.isRequired
};
