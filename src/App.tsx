import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import LikeButton from './hooks/LikeButton';
import MouseTracker from './hooks/MouseTracker';
import DogShow from './hooks/DogShow';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';


function App() {
  return (
    <div style={{ width: '85%', margin: '2rem auto' }}>
      <header>
        <Menu defaultIndex={0} onSelect={i => { }}>
          <MenuItem>
            cool link1
          </MenuItem>
          <MenuItem disabled={true}>
            cool link2
          </MenuItem>
          <MenuItem>
            cool link3
          </MenuItem>
        </Menu>
        <hr />
        <Menu defaultIndex={0} onSelect={i => { }} mode="vertical">
          <MenuItem>
            cool link1
          </MenuItem>
          <MenuItem disabled={true}>
            cool link2
          </MenuItem>
          <MenuItem>
            cool link3
          </MenuItem>
        </Menu>
        <hr />
        <Alert title="提示标题欧亲" type={AlertType.DEFAULT}>this is a long description!</Alert>
        <hr />
        <Alert type={AlertType.DEFAULT}>this is a long description!</Alert>
        <hr />
        <Alert title="提示标题欧亲" type={AlertType.SUCCESS}>this is a long description!</Alert>
        <hr />
        <Alert type={AlertType.SUCCESS}>this is a long description!</Alert>
        <hr />
        <Alert title="提示标题欧亲" type={AlertType.DANGER}>this is a long description!</Alert>
        <hr />
        <Alert type={AlertType.DANGER}>this is a long description!</Alert>
        <hr />
        <Alert title="提示标题欧亲" type={AlertType.WARNING}>this is a long description!</Alert>
        <hr />
        <Alert type={AlertType.WARNING}>this is a long description!</Alert>
        <hr />
        <Button btnType={ButtonType.Primary} className='customer-class' disabled>Hello World</Button>
        <Button onClick={() => { alert('aaa'); }}
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}>Hello World</Button>
        <Button
          btnType={ButtonType.Primary}
          size={ButtonSize.Small}>Hello World</Button>
        <hr />

        <Button btnType={ButtonType.Danger} disabled>Hello World</Button>
        <Button
          btnType={ButtonType.Danger}
          size={ButtonSize.Large}>Hello World</Button>
        <Button
          btnType={ButtonType.Danger}
          size={ButtonSize.Small}>Hello World</Button>
        <hr />

        <Button btnType={ButtonType.Default} disabled>Hello World</Button>
        <Button
          btnType={ButtonType.Default}
          size={ButtonSize.Large}>Hello World</Button>
        <Button
          btnType={ButtonType.Default}
          size={ButtonSize.Small}>Hello World</Button>
        <hr />

        <Button btnType={ButtonType.Link}
          href="http://www.baidu.com" disabled>Hello World</Button>
        <Button
          btnType={ButtonType.Link}
          target='_blank'
          href="http://www.baidu.com"
          size={ButtonSize.Large}>Hello World</Button>
        <Button
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
          size={ButtonSize.Small}>Hello World</Button>
        <hr />
        <MouseTracker />
        <hr />
        <LikeButton />
        <hr />
        <DogShow />
        <hr />
        <h1>Hello World</h1>
        <h2>Hello World</h2>
        <h3>Hello World</h3>
        <hr />
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
