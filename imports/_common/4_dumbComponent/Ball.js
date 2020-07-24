import React,{ Component } from 'react';


export default class Ball extends Component{

    componentDidMount() {
        this.setTimer()
    }
    setTimer(){
        if(this.time){
            return
        }
        this.time = setTimeout(
                this.props.verif.bind(this,this.props.left),
                1700
            );
    }
    componentWillUnmount() {
         if (this.time) {
        // Yes, clear it
        clearTimeout(this.time);
        
    }
    }

render(){
   let image = ['/image/velo.png','/image/foot.png','/image/basket.png','/image/raquette.png'][Math.floor(Math.random()*4)]
    return(
        <div className="ball" style={{
            animation: "ankon 2s infinite",
            transformOrigin: 0,
            height:30, 
            left:this.props.left,  
            top:350, 
            width:30, 
            color:"black",
            position:"absolute",
            backgroundColor:'url('+image+')'?"":"blue"
        }}>
           {image? <img src={image} style={{ width: '30px', height: '30px' }} alt="article" />:""}

        </div>
        )
}
}

