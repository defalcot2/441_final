import React from 'react';
import PropTypes from 'prop-types';

export default class TitleBar extends React.Component{
  processFormDataFunction() {
     window.sessionStorage.removeItem("username");
     window.sessionStorage.clear();
  }
  renderUser(){
     if (this.props.username){
       return <p className='title-bar__author'>&emsp;&emsp;Currently logged in: {this.props.username}</p>
     }
  }
  render(){
    return (
      <div className='title-bar'>
            <div className='post'>
             <div>
               <h1>&emsp;{this.props.title}</h1>
               {this.renderUser()}
              </div>
              <div className='post__actions'>
                    <form className='form' onSubmit={this.processFormDataFunction.bind(this)}>
                         <button className='button'>Logout</button>
                    </form>
              </div>
           </div>
      </div>
    );
  }
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
