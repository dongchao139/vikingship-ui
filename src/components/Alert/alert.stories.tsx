import React from "react";
import {Story, Meta} from "@storybook/react/types-6-0";
import {Alert, IAlertProps} from "./alert";

export default {
  title: 'New/Alert',
  component: Alert,
  argTypes: {
    customClose: {
      table: {
        defaultValue: { // storybook 只识别组件方法参数中指定的默认值
          summary: '<Icon icon="times" className="window-close" size="lg"/>'
        }
      }
    },
    onClose: {action: 'close'}
  }
} as Meta;

const Template: Story<IAlertProps> = (args) => <Alert {...args}/>

export const Default = Template.bind({});
Default.args = {
  title: 'alert title',
  closable: true,
  type: 'primary',
  children: 'alert message body.'
}

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  closable: true,
  type: 'danger',
  children: 'alert message body.'
}