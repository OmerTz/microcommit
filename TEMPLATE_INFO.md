# tzrif86 Expo Template - Package Information

## Overview
This is a clean, production-ready React Native Expo template with authentication, onboarding, and dashboard features. It has been stripped of all pet-specific features from the original Muble codebase and rebranded as a generic template.

## What's Included

### Core Features
- **Authentication System**: Complete login/signup flow with Supabase backend
- **Onboarding Flow**: Multi-step onboarding with progress tracking
- **Dashboard**: Clean, customizable dashboard screen
- **Profile Management**: User profile with settings
- **Navigation**: Expo Router with tab-based navigation (Dashboard + Profile)

### Development Tools
- **Storybook**: Component library with stories for onboarding and profile components
- **Testing**: E2E testing infrastructure with Playwright
- **Health Checks**: Doctor scripts for validating app health
- **Design System**: Pre-configured NumeraDesignSystem for consistent styling

### Technical Stack
- React Native with Expo SDK 53+
- TypeScript
- Supabase (Auth, Database, Storage)
- Expo Router for navigation
- Jest for unit testing
- Playwright for E2E testing

## What Was Removed
- All pet-specific features (PetDashboard, AppointmentCard, etc.)
- Premium/numerology features
- Chat and appointment tabs
- 200+ component files related to pets/premium features
- 105MB of build artifacts

## Getting Started

1. Copy this template to your project:
```bash
cp -r tzrif86-expo-template your-project-name
cd your-project-name
```

2. Install dependencies:
```bash
npm install
```

3. Configure Supabase:
- Create a new Supabase project
- Run the migration in `supabase/migrations/001_create_user_profiles.sql`
- Update `.env` with your credentials
- Update `app.json` with your app details

**Database Schema**: All tables use the `tzrif_template_` prefix (e.g., `tzrif_template_user_profiles`)

4. Start development:
```bash
npm run dev
```

## Customization

### Branding
- Update `app.json`: name, slug, bundleIdentifier, package
- Replace icon/splash screen in `assets/images/`
- Update design tokens in `constants/NumeraDesignSystem.ts`

### Features
- Add new screens in `app/`
- Create components in `components/`
- Add new tabs in `app/(tabs)/_layout.tsx`
- Extend onboarding in `components/onboarding/`

## File Structure
```
├── app/
│   ├── (auth)/              # Login/Signup screens
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Dashboard
│   │   └── profile.tsx      # Profile
│   ├── onboarding.tsx       # Onboarding flow
│   └── _layout.tsx          # Root layout
├── components/
│   ├── onboarding/          # Onboarding components + stories
│   ├── profile/             # Profile components + stories
│   └── ErrorBoundary.tsx
├── context/
│   └── AuthContext.tsx      # Auth state management
├── constants/
│   └── NumeraDesignSystem.ts
├── .storybook/              # Storybook configuration
└── tests/                   # E2E tests
```

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Health check
npm run doctor
```

## Database Setup

This template requires proper Supabase database setup:

1. **Run Migration**: Execute `supabase/migrations/001_create_user_profiles.sql` in your Supabase SQL Editor
2. **Table Created**: `tzrif_template_user_profiles` with RLS policies
3. **Authentication**: Works with Supabase Auth automatically
4. **Fallback Mode**: If database is not configured, the template will create basic profiles from auth data

**Important**: Without the database table, profile features will work but data won't persist.

## Known Issues

- 22 lint warnings remaining (unused variables, missing hook dependencies)
- Onboarding horizontal scroll animation doesn't work on web (functionality works)
- iOS/Android builds not tested post-cleanup

## Next Steps

1. Fix remaining lint warnings
2. Remove unused numerology hooks and services
3. Test iOS/Android builds
4. Add your custom features

## Version History

- v1.0.0 (2025-10-11): Initial template created from MubleExpo
  - Removed 200+ pet/premium/numerology files
  - Simplified to auth, onboarding, dashboard only
  - Added Storybook support
  - Updated README and documentation

## License
MIT

## Support
For issues with this template, contact the tzrif86 team or open a GitHub issue.
