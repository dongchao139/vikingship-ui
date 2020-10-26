import React from 'react'
import {Progress, ProgressProps} from './progress';
import {Story, Meta} from "@storybook/react/types-6-0";

export default {
    title: 'New/Progress',
    component: Progress
} as Meta;

const Template: Story<ProgressProps> = (props) => <Progress {...props}/>;

export const Default = Template.bind({});
Default.args = {
    percent: 50,
    strokeHeight: 15,
    showText: false,
    theme: 'primary'
}

export const WithText = Template.bind({});
WithText.args = {
    percent: 50,
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
}

WithText.parameters = {
    docs: {
      description: {
        story: 'progress with percent text'
      }
    }
  }

export const Danger = Template.bind({});
Danger.args = {
    percent: 50,
    strokeHeight: 15,
    showText: true,
    theme: 'danger'
}
Danger.parameters = {
    docs: {
        description: {
            story: 'progress with different theme'
        }
    }
}

export const Height = Template.bind({});
Height.args = {
    percent: 50,
    strokeHeight: 25,
    showText: true,
    theme: 'primary'
}
Height.parameters = {
    docs: {
        description: {
            story: 'progress with different height'
        }
    }
}