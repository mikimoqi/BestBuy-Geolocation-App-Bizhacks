import './App.css';
import * as bootstrap from "react-bootstrap";
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      users : [
        
      ]
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/send').then(response => response.json()).then(
      data => this.setState({users: data})
      )
  }

  

  renderusers = (user, index) => {
    const removeUser = (pos) => {
      let array = this.state.users;
      array.splice(pos,1);
      this.setState({users:array});
      console.log('hi'); 
      
    }
    return (
      <tr key={index}>
        <td>{user.custId}</td>
        <td>{user.pickup}</td>
        <td>{user.place}</td>
        <td>{user.time}</td>
        <td><button onClick={() => removeUser(user.custId)}>remove</button></td>
      </tr>
    )
  }

  


  render() {
    return (
      <div className="App" >
        <h1>BESTBUY QUERY SYSTEM</h1>
        <bootstrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Pick Up Items</th>
              <th>Place of Pickup</th>
              <th>Time upon arrival</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(this.renderusers)}
          </tbody>
        </bootstrap.Table>
      </div>
    );
  }
}


export default App;
