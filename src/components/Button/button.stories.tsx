import React from "react";
import {Story, Meta} from "@storybook/react/types-6-0";
import Button, {ButtonProps, ButtonSize} from "./button";

export default {
  title: 'New/Button',
  component: Button,
  // decorators: [(Story) => <div className="container"><Story/></div>],
  argTypes: {
    btnType: {
      type: 'string',
      defaultValue: 'default',
      description: 'the type of this button',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'default',
          detail: 'default button. white background, gray border'
        },
      },
      control: {
        type: 'select',
        options: ['primary','default','danger', 'link']
      },
    },
    size: {
      type: 'string',
      defaultValue: 'df',
      description: 'the size of this button',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'df'
        },
      },
      control: {
        type: 'inline-radio',
        options: ['sm','df','lg']
      },
    },
    disabled: {
      type: 'bool',
      defaultValue: false,
      description: 'whether the button can be clicked',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
          detail: 'disabled button cannot be clicked'
        },
      },
      control: {
        type: 'boolean'
      },
    },
    onClick: { action: 'clicked' }
  },
  parameters: {
    docs: {
      description: {
        component: 'This is a button component. It can have multiple props like size, type, disable.'
      }
    }
  }
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>
  演示按钮
</Button>;

export const Default = Template.bind({});
Default.args = {
  btnType: 'default',
  size: ButtonSize.Default,
  disabled: false,
}

export const Danger = Template.bind({});
Danger.args = {
  btnType: 'danger',
  size: ButtonSize.Default,
  disabled: false
}

export const Link = Template.bind({});
Link.args = {
  btnType: 'link',
  size: ButtonSize.Default,
  disabled: false
}
Link.parameters = {
  docs: {
    description: {
      story: 'Some custom string here'
    }
  }
}

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  btnType: 'primary',
  size: ButtonSize.Small,
  disabled: false
}

export const Primary = Template.bind({});
Primary.args = {
  btnType: 'primary',
  size: ButtonSize.Default,
  disabled: false
}

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  btnType: 'primary',
  size: ButtonSize.Default,
  disabled: true
}

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = {
  btnType: 'primary',
  size: ButtonSize.Large,
  disabled: false
}