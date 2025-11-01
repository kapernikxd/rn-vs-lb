import React, { useState, useMemo } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Dimensions, View } from 'react-native';
import { ThemeProvider } from '../../theme';
import { ProfileSelfiesGalleryView } from './ProfileSelfiesGallery.pure';

type Props = React.ComponentProps<typeof ProfileSelfiesGalleryView>;

const WINDOW_WIDTH = Dimensions.get('window').width;

const meta: Meta<Props> = {
  title: 'Features/Gallery/ProfileSelfiesGallery',
  component: ProfileSelfiesGalleryView,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  args: {
    columns: 2,
  },
};

export default meta;

const Template: StoryFn<Props> = ({
  visible: _visible,
  initialIndex: _initialIndex,
  onOpenAt: _onOpenAt,
  onClose: _onClose,
  itemSize: _itemSize,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const itemSize = useMemo(() => {
    const decoratorPadding = 32; // paddingHorizontal from decorator View (16 * 2)
    const wrapperPadding = 40; // padding from component wrapper (20 * 2)
    const gap = rest.gap ?? 15; // default spacing from component
    const columns = rest.columns ?? 2;

    return Math.floor((WINDOW_WIDTH - decoratorPadding - wrapperPadding - gap * (columns - 1)) / columns);
  }, [rest.columns, rest.gap]);

  return (
    <ProfileSelfiesGalleryView
      {...rest}
      itemSize={itemSize}
      visible={visible}
      initialIndex={initialIndex}
      onOpenAt={(index) => {
        setInitialIndex(index);
        setVisible(true);
      }}
      onClose={() => setVisible(false)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  photos: [
    'https://images.unsplash.com/photo-1690733583113-10a2dbd4c3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=800&q=80',
  ],
};

export const WithCustomGap = Template.bind({});
WithCustomGap.args = {
  gap: 12,
  photos: [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531256456869-ce942a665e80?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=800&q=80',
  ],
};
