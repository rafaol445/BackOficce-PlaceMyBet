
import './App.css';
import React from "react";
import {Switch, Route, NavLink} from 'react-router-dom';
import Usuarios from "./Components/Usuarios";
import Eventos from "./Components/Eventos";
import Informes from "./Components/Informes";
import Apuestas from "./Components/Apuestas";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



function App() {
  return (
    <div className="App">
        <div className={"menu"}>
            <div><NavLink to={'/usuarios'} activeClassName={'default'}>Usuarios</NavLink></div>
            <br/>
            <div><NavLink to={'/apuestas'} activeClassName={'default'}>Apuestas</NavLink></div>
            <br/>
            <div><NavLink to={'/eventos'} activeClassName={'default'}>Eventos</NavLink></div>
            <br/>
            <div><NavLink to={'/informes'} activeClassName={'default'}>Informes</NavLink></div>
            <br/>
        </div>
        <div className={"contenido"}>
            <Switch>
                <Route path={'/usuarios'}>
                    <Usuarios/>
                </Route>
                <Route path={'/apuestas'}>
                    <Apuestas/>
                </Route>
                <Route path={'/eventos'}>
                    <Eventos/>
                </Route>
                <Route path={'/informes'}>
                    <Informes/>
                </Route>
            </Switch>
        </div>




    </div>
  );
}



export default App;
