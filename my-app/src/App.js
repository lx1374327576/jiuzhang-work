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
        $.ajax({
            url: "http://127.0.0.1:8000/api/tasks/",
            dataType: 'json',
            headers:{"Authorization":"Basic bHg6bHg4NTA5MDA2Ng=="},
            type: 'patch',
            data: {id:event.target.value,status:'4',text:null},
            async:false,
            success: function(data,textStatus){
            },
             error: function(xhr) {
            alert(xhr.status+" "+xhr.readyState+" "+xhr.statusText);
            },
        });
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

    deleteClick(event){
        $.ajax({
            url: "http://127.0.0.1:8000/api/tasks/",
            dataType: 'json',
            headers:{"Authorization":"Basic bHg6bHg4NTA5MDA2Ng=="},
            type: 'delete',
            data: {id:event.target.value},
            async:false,
            success: function(data,textStatus){
            },
             error: function(xhr) {
            alert(xhr.status+" "+xhr.readyState+" "+xhr.statusText);
            },
        });
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
                            <h2>id:{item.id}</h2>
                            <h2>name:{item.name}</h2>
                            <h2>description:{item.description}</h2>
                            <h2>status:{item.status_display}</h2>
                            <button value={item.id} onClick={this.haveDoneCLick}>done</button>
                            <button value={item.id} onClick={this.deleteClick}>delete</button>
                        </li>
                    )}
                </ul>
            </div>

        );
    }

}

export default App;
