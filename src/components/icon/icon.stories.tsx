import React from 'react'
import {Icon, IconProps} from './icon';
import {Story, Meta} from "@storybook/react/types-6-0";

export default {
    title: 'New/Icon',
    component: Icon,
    argTypes: {
        icon: {
            type: 'string',
            description: 'the icon name'
        }
    }
} as Meta;

const Template: Story<IconProps> = (props) => <Icon {...props}/>;

export const Default = Template.bind({});
Default.args = {
    theme: 'primary',
    icon: 'check-circle'
}

export const Error = Template.bind({});
Error.args = {
    theme: 'danger',
    icon: 'times-circle'
}