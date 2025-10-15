import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Hr from '../../../src/components/UI/Hr';

type HrProps = React.ComponentProps<typeof Hr>;

const meta: Meta<HrProps> = {
  title: 'UI/Hr',
  component: Hr,
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Spacing around the separator based on theme sizes',
    },
    display: {
      control: 'boolean',
      description: 'Toggle visibility of the separator',
    },
  },
};

export default meta;

const Template: StoryFn<HrProps> = (args) => (
  <>
    <Hr {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  size: 'sm',
  display: true,
};

export const LargeSpacing = Template.bind({});
LargeSpacing.args = {
  size: 'xl',
};

export const Hidden = Template.bind({});
Hidden.args = {
  display: false,
};
