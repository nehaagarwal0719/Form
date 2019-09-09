import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      user:[],
      users:{
      fname:'',
      lname:'',
      email:'',
      password:''
    }
   }
  }

  componentDidMount(){
    this.getUser();
  }

  getUser=_=>{
    fetch('http://localhost:4000/users')
    .then(response=>response.json())
    .then(response=>this.setState({user: response.data}))
    .catch(err=>console.error(err))
  }
  
  addUser = _=>{
    const {users} = this.state;
    fetch(`http://localhost:4000/users/add?fname=${users.fname}&lname=${users.lname}&email=${users.email}&password=${users.password}`)
    //.then(response=>response.json())
    .then(this.getUser)
    .catch(err=>console.error(err))

  }



  renderUser=({id,name})=> <div key={id}>{name}</div>

  render(){

    const {user, users} = this.state
    return (
        <div className="App">
           {user.map(this.renderUser)}

            <div>
              <div>First Name
              <input 
                value={users.fname}
                onChange={e=>this.setState({users:{...users, fname:e.target.value}})}
              />
              </div>
              <div>Last Name
              <input 
                value={users.lname} 
                onChange={e=>this.setState({users:{...users, lname:e.target.value}})}
              />
              </div>
              <div>Email id
              <input 
                value={users.email} 
                onChange={e=>this.setState({users:{...users, email:e.target.value}})}
              />
              </div>
              <div>Password
              <input 
                value={users.password} 
                onChange={e=>this.setState({users:{...users, password:e.target.value}})}
              />
              </div>
              <div>
              <button onClick={this.addUser}>Register</button>
              </div>
            </div>



        </div>
      );
    }
  }

export default App;
