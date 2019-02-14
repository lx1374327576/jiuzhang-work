import React, { Component } from 'react';
import './App.css';
import $ from  'jquery'

class App extends Component {

    componentDidMount() {
        $.ajax({
            url: "http://127.0.0.1:8000/api/tasks/",
            dataType: 'json',
            headers:{"Authorization":"Basic bHg6bHg4NTA5MDA2Ng=="},
            type: 'get',
            async:false,
            success: function(data) {
                console.log(data);
            },
             error: function(xhr) {
            alert(xhr.status+" "+xhr.readyState+" "+xhr.statusText);
            },
        });
    }
    render() {
        return (
             <div>
                 {data.result}
             </div>
        );
    }

}

export default App;
