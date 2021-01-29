import React from "react";
import {InputTime, InputTimeProps} from "./inputTime";
import {Story, Meta} from "@storybook/react/types-6-0";

export default {
  title: 'New/InputTime',
  component: InputTime,
} as Meta;

const Template: Story<InputTimeProps> = (args) => <InputTime {...args}/>

/**
 disabled?: boolean;
 size?: 'df' | 'lg' | 'sm';
 icon?: IconProp;

 prepend?: string | ReactElement;
 append?: string | ReactElement;
 */
export const Default = Template.bind({});
Default.args = {
    defaultValue: 1
}