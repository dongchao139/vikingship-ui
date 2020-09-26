import React from 'react';
import Tabs from "../components/Tabs/tabs";

function Demo03(props) {
  return (
    <>
      <Tabs defaultIndex={0} styleType="underline" onSelect={() => {}}>
        {/* <TabItem label="card1">this is card one</TabItem>
        <TabItem label="card2">this is content two</TabItem>
        <TabItem label="disabled">this is content three</TabItem> */}
      </Tabs>
      <hr />
      <Tabs defaultIndex={0} styleType="outline" onSelect={() => {}}>
        {/* <TabItem label="card1">this is card one</TabItem>
        <TabItem label="card2">this is content two</TabItem>
        <TabItem label="disabled">this is content three</TabItem> */}
      </Tabs>
    </>
  )
}

export default Demo03;