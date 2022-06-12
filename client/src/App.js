import './App.css';
import React, {useState, useEffect} from "react"
import {BrowserRouter, Route, Switch, useParams} from 'react-router-dom';
import Home from './Components/Home';
import Teams from './Components/Teams/Teams';
import Roles from './Components/Roles/Roles';
import Members from './Components/Roles/Members';
import AddTeam from './Components/Teams/AddTeam';
import AddRole from './Components/Roles/AddRole';

function App() {

  // const [data, setData] = useState([{}])

  // useEffect(() => {
  //   fetch("/teams").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])
  

  return (
    <div>
    {/* {(typeof data === 'undefined') ? 
    (<p>Loading...</p>):(data.map((name, i) => (
      <p key={i}>{name.id}</p>
      ))
    )} */}
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Home></Home>
        </Route>
        <Route path='/teams' exact>
          <Teams></Teams>
        </Route>
        <Route path='/teams/addTeam' exact>
          <AddTeam></AddTeam>
        </Route>
        <Route path='/teams/:id' exact>
          <Members></Members>
        </Route>
        <Route path='/roles' exact>
          <Roles></Roles>
        </Route>
        <Route path='/roles/addRole' exact>
          <AddRole></AddRole>
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;

