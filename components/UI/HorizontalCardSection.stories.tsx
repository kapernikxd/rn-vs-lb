import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ThemeProvider } from "../../theme";
import HorizontalCardSection, { HorizontalCard } from "./HorizontalCardSection";

const cards: HorizontalCard[] = [
  {
    id: "1",
    title: "AI Agents Meetup",
    image: {
      uri: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
    },
  },
  {
    id: "2",
    title: "Design Sprint Workshop",
    image: {
      uri: "https://images.unsplash.com/photo-1521737604893-0f34a1f438b8?auto=format&fit=crop&w=600&q=80",
    },
  },
  {
    id: "3",
    title: "Community Hack Night",
    image: {
      uri: "https://images.unsplash.com/photo-1521737604893-9d53e79e4d4a?auto=format&fit=crop&w=600&q=80",
    },
  },
];

const meta: Meta<typeof HorizontalCardSection> = {
  title: "UI/HorizontalCardSection",
  component: HorizontalCardSection,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onPressSeeAll: { action: "see all press" },
    onPressCard: { action: "card press" },
    isDark: { control: "boolean" },
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f4f4f6" },
        { name: "dark", value: "#070C1F" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof HorizontalCardSection>;

export const Default: Story = {
  args: {
    title: "Popular this week",
    cards,
    seeAllLabel: "See all",
  },
};

export const WithCustomLabel: Story = {
  args: {
    ...Default.args,
    title: "Recommended spaces",
    seeAllLabel: "View more",
  },
};

export const DarkModePreview: Story = {
  args: {
    ...Default.args,
    isDark: true,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
