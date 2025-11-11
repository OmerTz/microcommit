import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import ProfileHeaderCard, { UserProfile } from './ProfileHeaderCard';

const meta = {
  title: 'Profile/ProfileHeaderCard',
  component: ProfileHeaderCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flex: 1, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProfileHeaderCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockUser: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  memberSince: '2024-01-15',
};

export const Default: Story = {
  args: {
    user: mockUser,
    onSettingsPress: () => console.log('Settings pressed'),
    onAvatarPress: () => console.log('Avatar pressed'),
  },
};

export const LongName: Story = {
  args: {
    user: {
      ...mockUser,
      name: 'Alexander Bartholomew Richardson',
    },
    onSettingsPress: () => console.log('Settings pressed'),
    onAvatarPress: () => console.log('Avatar pressed'),
  },
};

export const NoEmail: Story = {
  args: {
    user: {
      name: 'Jane Smith',
      memberSince: '2024-03-20',
    },
    onSettingsPress: () => console.log('Settings pressed'),
    onAvatarPress: () => console.log('Avatar pressed'),
  },
};
