import React from "react";
import Alert, {AlertType} from "../components/Alert/alert";

function Demo011(props) {
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
    </>
  )
}

export default Demo011;