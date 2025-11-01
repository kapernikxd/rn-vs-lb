import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Layout',
          ['Header'],
          'UI',
          ['Buttons', 'Cards', 'Tooltip'],
          'Features',
          [
            'Chat',
            'Gallery',
            'Modals',
            'Poll',
            'Posts',
            'Prank',
            'Profile',
            'Settings',
            'Specialist',
            'UserCards',
          ],
        ],
      },
    },
  },

  tags: ["autodocs"]
};

export default preview;
