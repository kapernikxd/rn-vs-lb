import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { View, Button as RNButton } from 'react-native';
import ReportModal from '../../../src/components/Modals/ReportModal';
import { ThemeProvider } from '../../../src/theme';

type ReportModalProps = React.ComponentProps<typeof ReportModal>;

const closeLogger = () => {
  console.log('[storybook:report-modal:close]');
};
const submitLogger = (payload: { reason: string; details?: string }) => {
  console.log('[storybook:report-modal:submit]', payload);
};

const defaultOnClose = () => closeLogger();
const defaultOnSubmit: ReportModalProps['onSubmit'] = (reason, details) => {
  submitLogger({ reason, details });
};

const meta: Meta<ReportModalProps> = {
  title: 'Modals/ReportModal',
  component: ReportModal,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['user', 'post'],
      description: 'Switch between the user and post reason presets.',
    },
    visible: {
      control: 'boolean',
      description: 'Toggles the modal visibility.',
    },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider>
        <View
          style={{
            flex: 1,
            minHeight: 500,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            backgroundColor: '#1b1b1b33',
          }}
        >
          <StoryComponent />
        </View>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A modal that collects a reason and optional details when reporting a user or a post.',
      },
    },
  },
};

export default meta;

const Template: StoryFn<ReportModalProps> = (args) => {
  const { visible, onClose, onSubmit, ...restArgs } = args;

  const [isVisible, setIsVisible] = React.useState(visible);

  React.useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = React.useCallback(() => {
    onClose();
    setIsVisible(false);
  }, [onClose]);

  const handleSubmit = React.useCallback<ReportModalProps['onSubmit']>(
    (reason, details) => {
      onSubmit(reason, details);
      setIsVisible(false);
    },
    [onSubmit],
  );

  return (
    <ReportModal
      {...restArgs}
      visible={isVisible}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

const baseArgs: ReportModalProps = {
  visible: true,
  type: 'user',
  onClose: defaultOnClose,
  onSubmit: defaultOnSubmit,
};

export const UserReport: StoryFn<ReportModalProps> = Template.bind({});
UserReport.args = {
  ...baseArgs,
};
UserReport.parameters = {
  docs: {
    description: {
      story: 'Default presentation for reporting a user with the predefined user reason list.',
    },
  },
};

export const PostReport: StoryFn<ReportModalProps> = Template.bind({});
PostReport.args = {
  ...baseArgs,
  type: 'post',
};
PostReport.parameters = {
  docs: {
    description: {
      story: 'Shows the modal configured to report a post and display the post-specific reason options.',
    },
  },
};

export const InteractivePlayground: StoryFn<ReportModalProps> = (args) => {
  const [isVisible, setIsVisible] = React.useState(args.visible);
  const [reportType, setReportType] = React.useState<ReportModalProps['type']>(args.type);

  return (
    <View style={{ width: '100%' }}>
      <RNButton
        title={isVisible ? 'Hide modal' : 'Show modal'}
        onPress={() => setIsVisible((state) => !state)}
      />
      <View style={{ height: 12 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <RNButton
          title="Report user"
          onPress={() => {
            setReportType('user');
            setIsVisible(true);
          }}
        />
        <View style={{ width: 12 }} />
        <RNButton
          title="Report post"
          onPress={() => {
            setReportType('post');
            setIsVisible(true);
          }}
        />
      </View>
      <View style={{ height: 12 }} />
      <ReportModal
        {...args}
        visible={isVisible}
        type={reportType}
        onClose={() => {
          closeLogger();
          setIsVisible(false);
          args.onClose();
        }}
        onSubmit={(reason, details) => {
          submitLogger({ reason, details });
          setIsVisible(false);
          args.onSubmit(reason, details);
        }}
      />
    </View>
  );
};
InteractivePlayground.args = {
  ...baseArgs,
  visible: false,
};
InteractivePlayground.parameters = {
  controls: {
    exclude: ['visible', 'type'],
  },
  docs: {
    description: {
      story:
        'Use the helper buttons to toggle the modal and switch between user and post report reasons to explore the full flow.',
    },
  },
};
