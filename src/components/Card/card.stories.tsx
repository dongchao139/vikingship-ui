import React from "react";
import {Story, Meta} from "@storybook/react/types-6-0";
import {Card, ICardProps} from "./card";

export default {
  title: 'New/Card',
  component: Card
} as Meta;

const Template: Story<ICardProps> = (args) => <Card {...args}/>

export const Default = Template.bind({});
Default.args = {
  size: 'large',
  avatar: 'https://avatars1.githubusercontent.com/u/35620253?s=460&u=a19d1b0c806d2c45338d1cfaa186a8f832416577&v=4',
  description: '这是一段description，这个例子用来演示。这是一段description，这个例子用来演示这是一段description，这个例子用来演示这是一段description，这个例子用来演示这是一段description，这个例子用来演示'
}

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
    size: 'middle',
    avatar: 'https://avatars1.githubusercontent.com/u/35620253?s=460&u=a19d1b0c806d2c45338d1cfaa186a8f832416577&v=4',
    description: '这是一段description，这个例子用来演示。这是一段description，这个例子用来演示这是一段description，这个例子用来演示这是一段description，这个例子用来演示这是一段description，这个例子用来演示'
}