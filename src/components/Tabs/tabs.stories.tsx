import React from "react";
import {Story, Meta} from "@storybook/react/types-6-0";
import {Tabs} from "./tabs";
import TabsItem from './tabs-item';

export default {
    title: 'New/Tabs',
    component: Tabs,
} as Meta;

export const UnderLineTabs = (args) => (
    <Tabs defaultIndex={0} styleType="underline" onSelect={() => {}} {...args}>
        <TabsItem label="card1">this is card one</TabsItem>
        <TabsItem label="card2">this is content two</TabsItem>
        <TabsItem label="disabled" disabled={true}>this is content three</TabsItem>
    </Tabs>
)

export const OutLineTabs = (args) => (
    <Tabs defaultIndex={0} styleType="outline" onSelect={() => {}} {...args}>
        <TabsItem label="card1">this is card one</TabsItem>
        <TabsItem label="card2">this is content two</TabsItem>
        <TabsItem label="disabled" disabled={true}>this is content three</TabsItem>
    </Tabs>
)