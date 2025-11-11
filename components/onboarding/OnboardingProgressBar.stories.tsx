import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import OnboardingProgressBar from './OnboardingProgressBar';

const meta = {
  title: 'Onboarding/ProgressBar',
  component: OnboardingProgressBar,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flex: 1, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    currentStep: {
      control: {
        type: 'number',
        min: 1,
        max: 8,
        step: 1,
      },
    },
    totalSteps: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },
} satisfies Meta<typeof OnboardingProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {
  args: {
    currentStep: 1,
    totalSteps: 8,
  },
};

export const MiddleStep: Story = {
  args: {
    currentStep: 4,
    totalSteps: 8,
  },
};

export const LastStep: Story = {
  args: {
    currentStep: 8,
    totalSteps: 8,
  },
};

export const FewSteps: Story = {
  args: {
    currentStep: 2,
    totalSteps: 3,
  },
};
