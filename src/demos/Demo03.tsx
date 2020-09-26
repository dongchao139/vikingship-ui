import React from 'react';
import Tabs from "../components/Tabs/tabs";
import TabsItem from "../components/Tabs/tabs-item";

function Demo03(_props) {
  return (
    <>
      <Tabs defaultIndex={0} styleType="underline" onSelect={() => {}}>
        <TabsItem label="card1">this is card one</TabsItem>
        <TabsItem label="card2">this is content two</TabsItem>
        <TabsItem label="disabled" disabled={true}>this is content three</TabsItem>
      </Tabs>
      <hr />
      <Tabs defaultIndex={0} styleType="outline" onSelect={() => {}}>
        <TabsItem label="card1">this is card one</TabsItem>
        <TabsItem label="card2">this is content two</TabsItem>
        <TabsItem label="disabled" disabled={true}>this is content three</TabsItem>
      </Tabs>
    </>
  )
}

export default Demo03;