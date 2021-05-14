import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TareasListHook from "./components/tareasListHook";
import UpdateTarea from "./components/updateTarea";

/*
import CreateTarea from "./components/createTarea";
import TareasList from "./components/tareasList";
import DeleteTarea from "./components/deleteTarea";
*/

class App extends Component{

  render(){

    return (

      <Router>

        <div>
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<Link to="/" className="navbar-brand">Tareas App</Link>
					<div className="collpase navbar-collapse">
						<ul className="navbar-nav mr-auto">
							{/*
							<li className="navbar-item">
								<Link to="/" className="nav-link">Tareas</Link>
							</li>
							<li className="navbar-item">
								<Link to="/create" className="nav-link">Create Tarea</Link>
							</li>
							<li>
							<Link to="/delete" className="nav-link">Delete Tarea</Link>
							</li>
							*/}

							<li className="navbar-item">
								<Link to="/update" className="nav-link">Actualizar Tarea</Link>
							</li>
						</ul>
					</div>
				</nav>
				<br />

				<Route exact path="/" component={TareasListHook} />
				<Route exact path="/update" component={UpdateTarea} />

				{/*
				<Route exact path="/create" component={CreateTarea} />
				<Route exact path="/delete" component={DeleteTarea} />
				*/}

			</div> 
		</div>

      </Router>

    );

  }

}

export default App;
