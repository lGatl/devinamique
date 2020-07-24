import React, { Component } from 'react';

export default class Basket extends Component {
 
  
  
  //========================Preparation du rendu========================
  render(){
     // console.log("this.state", this.state);

    return (
      <div style = {{
        position:"absolute",
        pointerEvents: "none",
        height:40, 
        width:40, 
        left:this.props.left, 
        top:350//this.state.clientY-213
      }}>
      <img src={'/image/chariot.png'} style={{ width: '40px', height: '40px' }} alt="chariot" />
      </div>
    );
  }
}


