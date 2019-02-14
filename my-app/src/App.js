import React, { Component } from 'react';
import './App.css';
import $ from  'jquery'

// eslint-disable-next-line
function ListItem(props){
    console.log(3);
    console.log(props.value);
    return <li>{props.value.description}</li>;
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:{
                "count":0,
                "next":null,
                "previous":null,
                "results":[],
            }
        }
    }

    componentDidMount() {
        var data_tmp=null;
        $.ajax({
            url: "http://127.0.0.1:8000/api/tasks/",
            dataType: 'json',
            headers:{"Authorization":"Basic bHg6bHg4NTA5MDA2Ng=="},
            type: 'get',
            async:false,
            success: function(data,textStatus){
               data_tmp=data;
            },
             error: function(xhr) {
            alert(xhr.status+" "+xhr.readyState+" "+xhr.statusText);
            },
        });
        this.setState(function(){
            console.log(2);
            console.log(data_tmp);
           return {data:data_tmp};
        });
    }

    render() {
        return (
            <ul>
                {console.log(1)}
                {console.log(this.state.data)}
                {this.state.data.results.map((item)=>
                    <ListItem key={item.id}
                              value={item}/>
                )}
            </ul>
        );
    }

}

export default App;
