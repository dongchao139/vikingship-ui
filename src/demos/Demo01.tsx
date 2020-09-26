import React from 'react'
import Alert, {AlertType} from "../components/Alert/alert";
import Button, {ButtonSize, ButtonType} from "../components/Button/button";

function Demo01(props) {
  return (
    <>
      <hr />
      <Alert title="提示标题欧亲" type={AlertType.DEFAULT}>this is a long description!</Alert>
      <hr/>
      <Alert type={AlertType.DEFAULT}>this is a long description!</Alert>
      <hr/>
      <Alert title="提示标题欧亲" type={AlertType.SUCCESS}>this is a long description!</Alert>
      <hr/>
      <Alert type={AlertType.SUCCESS}>this is a long description!</Alert>
      <hr/>
      <Alert title="提示标题欧亲" type={AlertType.DANGER}>this is a long description!</Alert>
      <hr/>
      <Alert type={AlertType.DANGER}>this is a long description!</Alert>
      <hr/>
      <Alert title="提示标题欧亲" type={AlertType.WARNING}>this is a long description!</Alert>
      <hr/>
      <Alert type={AlertType.WARNING}>this is a long description!</Alert>
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