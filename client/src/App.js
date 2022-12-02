import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';

// Containers
import MainLayout from "./containers/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' component={MainLayout}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
};

export default App;
