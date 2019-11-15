import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'

export class Data extends Component<{data : Date}>{
    
    format(){
        var value=this.props.data.toString();

        if(value.length==2||value.length==5){
            $(this).val($(this).val()+'/');            
        }
    }

    render() {
        return <div>
            <input type="text" value={this.props.data.toString()}/>
        </div>
        
    }

}