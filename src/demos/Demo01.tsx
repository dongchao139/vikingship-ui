import React from 'react'
import Button, {ButtonSize, ButtonType} from "../components/Button/button";
import Demo011 from "./Demo01-1";

function Demo01(props) {
  return (
    <>
      <Demo011 />
      <hr/>
      <Button btnType={ButtonType.Primary} className='customer-class' disabled>Hello World</Button>
      <Button onClick={() => {
        alert('aaa');
      }}
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}>Hello World
      </Button>
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
        target='_blank'
        href="http://www.baidu.com"
        size={ButtonSize.Large}>Hello World</Button>
      <Button
        btnType={ButtonType.Link}
        href="http://www.baidu.com"
        size={ButtonSize.Small}>Hello World</Button>
      <hr/>
    </>
  )
}

export default Demo01;