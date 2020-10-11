import React from "react";
import {Alert} from "../components/Alert/alert";

function Demo011(_props) {
  return (
    <>
      <hr />
      <Alert title="提示标题欧亲" type="primary">this is a long description!</Alert>
      <hr/>
      <Alert type="primary">this is a long description!</Alert>
      <hr/>
      <Alert title="提示标题欧亲" type="success">this is a long description!</Alert>
      <hr/>
      <Alert type="success">this is a long description!</Alert>
      <hr/>
      <Alert title="提示标题欧亲" type="danger">this is a long description!</Alert>
      <hr/>
      <Alert type="danger">this is a long description!</Alert>
      <hr/>
      <Alert title="提示标题欧亲" type="warning">this is a long description!</Alert>
      <hr/>
      <Alert type="warning">this is a long description!</Alert>
    </>
  )
}

export default Demo011;