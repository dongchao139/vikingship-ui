import React from "react";
import {Story, Meta} from "@storybook/react/types-6-0";
import Alert, {IAlertProps} from "./alert";
import {
  Title, Description,
  Primary　as PrimaryBlock,
  ArgsTable, Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

export default {
  title: 'New/Alert',
  component: Alert,
  argTypes: {
    type: {
      type: 'string',
      description: 'the type of this alert',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'primary',
          detail: 'primary alert. blue background, blue border'
        },
      },
      control: {
        type: 'select',
        options: ['primary','success','danger', 'warning']
      },
    },
    title: {
      type: 'string',
      description: 'the title of this alert',
      table: {
        type: {
          summary: 'string',
        }
      }
    },
    closable: {
      type: 'boolean',
      description: 'whether this alert can close.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    customClose: {
      type: 'string or icon',
      description: 'the close icon',
      table: {
        type: {
          summary: 'string or icon'
        },
        defaultValue: {
          summary: '<Icon icon="times" className="window-close" size="lg"/>'
        }
      },
      control: {
        type: 'text'
      }
    },
    children: {
      type: 'string',
      description: 'the description of this alert',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    onClose: {action: 'close'}
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Alert</Title>
          <Description>This is an alert component.
            It can have multiple props
            like title, type, closeable,customClose.</Description>
          <PrimaryBlock />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    }
  }
} as Meta;

const Template: Story<IAlertProps> = (args) => <Alert {...args}/>

/**
 * export interface IAlertProps {
  title?: string;
  closable?: boolean;
  customClose?: string;
  children?: React.ReactNode;
  type: AlertType;
}
 */
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