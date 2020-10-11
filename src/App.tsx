import React from 'react';
import { Input } from './components/Input/input';


function App() {

  return (
    <div style={{width: '85%', margin: '2rem auto'}}>
      <Input placeholder="input"
             // size="lg"
             // disabled={true}
             icon="calculator"
             prepend="https://"
             style={{width: '500px'}}
             // append=".com"
      />
    </div>
  );
}

export default App;
