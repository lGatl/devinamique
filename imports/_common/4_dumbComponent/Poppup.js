import React, {Component} from 'react';

export default class Poppup extends Component {
    
    render() {
        return (
            <div style={{
                display:"flex", 
                justifyContent:"center"
            }}>
                {this.props.button}
                <div 
                    style={{
                        position:"fixed",
                        top: 0,
                        left:0,
                        backgroundColor:"rgba(50,50,50,0.7)",
                        height:"100%",
                        width:"100%",
                        display:this.props.open?"flex":"none",
                        zIndex:999,
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                >
                    <div style={{
                        position:"absolute",
                        minWidth:400,
                        minHeight: 400,
                        display:"flex",
                        flexDirection:"column",
                        borderRadius:10,
                        padding:10,
                        overflow:"hidden",
                        maxWidth:800,
                        backgroundColor:"white",

                    }}>
                        
                        {this.props.children}
                    </div>
                </div>
            </div>
                    

        )
    }
}
