import React from "react";
import {Story, Meta} from "@storybook/react/types-6-0";
// export default Button 方式的导出, 会导致识别ts注释失败
import {Button, ButtonProps, ButtonSize} from "./button";

export default {
  title: 'New/Button',
  component: Button,
  // decorators: [(Story) => <div className="container"><Story/></div>],
  argTypes: {
    btnType: {
      table: {
        defaultValue: {
          summary: 'default',
          detail: 'default button. white background, gray border'
        },
      },
    },
    size: {
      type: 'string',
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
    onClick: { action: 'clicked' }
  },
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