import React, { Component } from 'react';
import './App.css';
import $ from  'jquery'

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
        this.haveDoneCLick = this.haveDoneCLick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
    }

    haveDoneCLick(event){
        alert("done");
    }

    deleteClick(event){
        alert("delete");
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
           return {data:data_tmp};
        });
    }

    render() {
        return (
            <div>
                <h1>所有事项列表</h1>
                <ul>
                    {console.log(1)}
                    {this.state.data.results.map((item)=>
                        <li key={item.id}>
                            {item.id}
                            {item.name}
                            {item.description}
                            {item.status_display}
                            <button value={item.id} onClick={this.props.haveDoneCLick}>done</button>
                            <button value={item.id} onClick={this.props.deleteClick}>delete</button>
                        </li>
                    )}
                </ul>
            </div>

        );
    }

}

export default App;
