import React from 'react';
import Demo from './demos/Demo';
import Demo01 from './demos/Demo01';
import Demo02 from "./demos/Demo02";
import Demo03 from "./demos/Demo03";
import Icon from './components/icon/icon';

function App() {
  return (
    <div style={{ width: '85%', margin: '2rem auto' }}>
      <Icon theme="primary" icon="coffee" size="6x"/>
      <Icon theme="primary" icon="arrow-down" size="6x"/>
      <header>
        <Demo03 />
        <Demo02 />
        <Demo01/>
        <Demo />
        <code>
          const a = 'b';
        </code>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
