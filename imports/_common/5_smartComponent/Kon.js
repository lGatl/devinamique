import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Ball, Basket, Poppup} from '../4_dumbComponent';

//
var konamiCode = ['up', 'up'
,'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a', 'enter' 
];

var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b',
  13: 'enter'
};
var konamiCodePosition = 0;


class Kon extends Component {
   constructor(props){

   super(props)


   this.state = {
    score:0,
    go:0,
    status:false,
    poppup:false,
    balls:[],
    clientX:0,
    clientY:0,
    delta:0, 
    count:0,
    position:-(((props.resize?props.resize.windowwidth:0)/2)-180)
   }
   this.mousemove = this.mousemove.bind(this)
    this.keydown = this.keydown.bind(this)
   // this.mousemove = this.mousemove.bind(this)
  }
  componentDidUpdate(prevProps) {
     if(
      (prevProps.resize?prevProps.resize.windowwidth:0) !== (this.props.resize?this.props.resize.windowwidth:0)
    ){
      this.setState({
        status:false,
        poppup:false,
        balls:[],
        clientX:0,
        clientY:0,
        delta:0, 
        count:0,
        position:-(((this.props.resize?this.props.resize.windowwidth:0)/2)-180)
      })
    }
  }
  componentDidMount() {

    this.setState({
      poppup:false, 
      clientX:0,
      clientY:0,
      delta:0, 
       count:0,
      position:-(((this.props.resize?this.props.resize.windowwidth:0)/2)-180)
    })
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('mousemove', this.mousemove);
    window.addEventListener('mousedown', this.mousemove);
    
  }

  componentWillUnmount() {
    this.stop()
    window.removeEventListener('mousemove', this.mousemove);
    window.removeEventListener('mousedown', this.mousemove);

  }
  mousemove(e){


    this.setState({
      lclientX:this.state.clientX,
      lclientY:this.state.clientY,
      clientX:e.clientX,
      clientY:e.clientY,
      delta:e.clientX-this.state.clientX,
      position: this.state.position+this.state.delta
    });
  
  }
 
  verif(ball){
    if(this.state.go>5){
      this.stop()
      return
    }
    if(Math.abs(this.state.position-ball)<10){
      this.setState({score:this.state.score+1})
    }else{
      this.setState({go:this.state.go+1})
    }
  }
  go(){
    if(this.state.status !== true){ 
        this.setState({score:0, go:0, count:0})
         this.timer = setInterval(
                () => this.setState(prevState => {
                  let balls = [...prevState.balls];
                  if(balls.length>1){balls.shift()};
       
                    let left  = Math.ceil(Math.random()*350)
                    
                  return ({count:prevState.count+1, status:true, balls: [...balls,<Ball verif = {this.verif.bind(this)} cle={prevState.count} key={prevState.count} left={left}/>  ] })
                }),
                1000,
            );
      }else{
        this.stop()
      }
  }
  activateCheats(){
    if(this.state.poppup){
      this.stop()
      this.setState({poppup:false})
  } else{
  this.setState({poppup:true})
}
}
    

  stop(){
    clearInterval(this.timer);
    this.setState({balls:[],status:false})
  }
 
  //==============CONTROLE====================
  keydown(e){

      // get the value of the key code from the key map
      var key = allowedKeys[e.keyCode];
      // get the value of the required key from the konami code
      var requiredKey = konamiCode[konamiCodePosition];

      // compare the key with the required key
      if (key === requiredKey) {

        // move to the next key in the konami code sequence
        konamiCodePosition++;

        // if the last key is reached, activate cheats
        if (konamiCodePosition === konamiCode.length) {
          this.activateCheats();
          konamiCodePosition = 0;
        }
      } else {
        konamiCodePosition = 0;
      }
    }
  
  //========================Preparation du rendu========================
  render(){
    return (<Poppup
              //lGatl.fr
              open={this.state.poppup}
              style={{overflow:"hidden"}}
              >
              <div style = {{width:"100%", height:"100%",display:"flex",flexDirection:"column"}} alt= {"lGatl.fr"}>
                <div style = {{height:30,display:"flex"}}>
                 <div style = {{flex:1, height:30}}>
                  </div><span style = {{color:'rgb(181, 204, 24)',fontWeight:'bold',marginRight:10}}>lGatl.fr</span>
                  <div style={{width:30, cursor:"pointer"}} alt= {"lGatl.fr"} onClick={this.activateCheats.bind(this)}> X </div>
                </div>
                 <div style = {{ display:"flex", justifyContent:"center",alignItems:"center", flexDirection:"column"}} alt= {"lGatl.fr"}>
                  
                  <div style = {{hieght:30}} alt= {"lGatl.fr"}>
                   NB:{this.state.count} Score : {this.state.score} , Vie{(6-this.state.go)>1?"s":""} : {(6-this.state.go)}
                  </div>
                 <div style={{width:30, cursor:"pointer"}} onClick={this.go.bind(this)} alt= {"lGatl.fr"} >
                  Go
                  </div>
              </div>
               
              </div>
              
                {this.state.poppup?this.state.balls:""}
               
                <Basket left={this.state.position} windowwidth={(this.props.resize?this.props.resize.windowwidth:0)}/>

                
              </Poppup>)
 
  }
}
const mapStateToProps = (state) => {
    return { 
     resize:state.controle.resize

    };
};
function mapDispatchToProps( dispatch ){
  return bindActionCreators({

  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Kon );
