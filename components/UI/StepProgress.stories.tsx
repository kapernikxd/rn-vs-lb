import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Alert } from 'react-native';
import { ThemeProvider } from '../../theme';
import { StepProgress } from './StepProgress';

type Props = React.ComponentProps<typeof StepProgress>;

const meta: Meta<Props> = {
  title: 'UI/StepProgress',
  component: StepProgress,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 24 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  args: {
    steps: [
      { title: 'Briefing', description: 'Share context and goals for your agent.' },
      { title: 'Generation', description: 'The agent drafts a tailored solution.' },
      { title: 'Review', description: 'Assess the output and give feedback.' },
      { title: 'Launch', description: 'Publish or deploy your agent deliverable.' },
    ],
  },
};

export default meta;

const Template: StoryFn<Props> = (args) => <StepProgress {...args} />;

export const Default = Template.bind({});
Default.args = {
  activeStep: 1,
};

export const FirstStep = Template.bind({});
FirstStep.args = {
  activeStep: 0,
};

export const WithClickableSteps: StoryFn<Props> = (args) => {
  const [activeStep, setActiveStep] = useState(args.activeStep ?? 2);

  return (
    <StepProgress
      {...args}
      activeStep={activeStep}
      onStepPress={(index) => {
        Alert.alert('Step selected', args.steps?.[index]?.title ?? `Step ${index + 1}`);
        setActiveStep(index);
      }}
    />
  );
};
WithClickableSteps.args = {
  activeStep: 2,
};
