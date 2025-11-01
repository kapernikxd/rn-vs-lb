import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { View } from "react-native";
import { ThemeProvider } from "../../theme";
import { ProfileMediaGallery, ProfileMediaGalleryProps } from "./ProfileMediaGallery";

const meta: Meta<typeof ProfileMediaGallery> = {
  title: 'Features/Gallery/ProfileMediaGallery',
  component: ProfileMediaGallery,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View style={{ padding: 24 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;

const TABS: ProfileMediaGalleryProps["tabs"] = [
  { key: "photos", label: "Photos", iconName: "collections" },
  { key: "videos", label: "Videos", iconName: "videocam" },
  { key: "music", label: "Music", iconName: "music-note" },
  { key: "albums", label: "Albums", iconName: "photo-album" },
];

const Template: StoryFn<ProfileMediaGalleryProps> = (args) => (
  <ProfileMediaGallery {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tabs: TABS,
  images: [
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=60",
  ],
};

export const ControlledTabs: StoryFn<ProfileMediaGalleryProps> = ({ ...rest }) => {
  const [activeTabKey, setActiveTabKey] = useState(rest.activeTabKey ?? TABS[0].key);

  return (
    <ProfileMediaGallery
      {...rest}
      tabs={rest.tabs ?? TABS}
      activeTabKey={activeTabKey}
      onTabPress={(tab, index) => {
        setActiveTabKey(tab.key);
        rest.onTabPress?.(tab, index);
      }}
    />
  );
};

ControlledTabs.args = {
  tabs: TABS,
  images: Default.args?.images ?? [],
};
