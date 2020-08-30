import React from 'react';
import Button,{ButtonType, ButtonSize} from './components/Button/button';

function App() {
  return (
    <div style={{width: '85%',margin: '2rem auto'}}>
      <header>
        <Button btnType={ButtonType.Primary} disabled>Hello World</Button>
        <Button 
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}>Hello World</Button>
        <Button 
          btnType={ButtonType.Primary}
          size={ButtonSize.Small}>Hello World</Button>
        <hr/>

        <Button btnType={ButtonType.Danger} disabled>Hello World</Button>
        <Button 
          btnType={ButtonType.Danger}
          size={ButtonSize.Large}>Hello World</Button>
        <Button 
          btnType={ButtonType.Danger}
          size={ButtonSize.Small}>Hello World</Button>
        <hr/>

        <Button btnType={ButtonType.Default} disabled>Hello World</Button>
        <Button 
          btnType={ButtonType.Default}
          size={ButtonSize.Large}>Hello World</Button>
        <Button 
          btnType={ButtonType.Default}
          size={ButtonSize.Small}>Hello World</Button>
        <hr/>       
         
        <Button btnType={ButtonType.Link} 
          href="http://www.baidu.com" disabled>Hello World</Button>
        <Button 
          btnType={ButtonType.Link}
          size={ButtonSize.Large}>Hello World</Button>
        <Button 
          btnType={ButtonType.Link}
          size={ButtonSize.Small}>Hello World</Button>
        <hr/>
        
        <h1>Hello World</h1>
        <h2>Hello World</h2>
        <h3>Hello World</h3>
        <hr/>
        <code>
          const a = 'b';
        </code>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
