import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TripleSwitch, { TripleSwitchValue } from '../../../src/components/UI/TripleSwitch';

type TripleSwitchProps = React.ComponentProps<typeof TripleSwitch>;

const meta: Meta<TripleSwitchProps> = {
  title: 'UI/TripleSwitch',
  component: TripleSwitch,
  argTypes: {
    value: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    leftLabel: {
      control: 'text',
    },
    centerLabel: {
      control: 'text',
    },
    rightLabel: {
      control: 'text',
    },
  },
};

export default meta;

const Template: StoryFn<TripleSwitchProps> = ({ value, onChange, ...rest }) => {
  const [current, setCurrent] = React.useState<TripleSwitchValue>(value);

  React.useEffect(() => {
    setCurrent(value);
  }, [value]);

  const handleChange = (next: TripleSwitchValue) => {
    onChange?.(next);
    setCurrent(next);
  };

  return <TripleSwitch {...rest} value={current} onChange={handleChange} />;
};

export const LeftSelected = Template.bind({});
LeftSelected.args = {
  value: 'left',
  leftLabel: 'Upcoming',
  centerLabel: 'All',
  rightLabel: 'Past',
};

export const CenterSelected = Template.bind({});
CenterSelected.args = {
  value: 'center',
  leftLabel: 'Draft',
  centerLabel: 'Published',
  rightLabel: 'Archived',
};

export const RightSelected = Template.bind({});
RightSelected.args = {
  value: 'right',
  leftLabel: 'Low',
  centerLabel: 'Medium',
  rightLabel: 'High',
};
