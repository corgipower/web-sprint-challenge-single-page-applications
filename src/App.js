import React from "react";
import {Route} from 'react-router-dom';
import Form from "./Components/Form";

const App = () => {
  return (
    <div>
      <Route exact path='/' component={Form} />
    </div>
  );
};
export default App;
