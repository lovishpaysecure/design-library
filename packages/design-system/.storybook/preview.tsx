import React from 'react';
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";

// Note: echarts-countries-js/world import commented out due to Vite resolution issues
// Geographic maps will show placeholder until properly configured
// import 'echarts-countries-js/world';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    jsx: {
      useBooleanShorthandSyntax: false,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={{}}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview; 