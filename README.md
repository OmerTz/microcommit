# MicroCommit

A micro-commitment platform where users pledge small charitable donations as accountability for achieving personal goals, powered by AI-driven evidence verification and social accountability.

## What is MicroCommit?

MicroCommit leverages behavioral economics principles—particularly loss aversion—to help people achieve their goals. Users set personal goals (fitness, productivity, learning, habits) and commit a small amount to charity if they fail. The platform uses:

- **AI-powered evidence judging** to verify goal completion through photos, data, or check-ins
- **Social accountability** through referee verification and community support
- **Model A legal framework** operating under 501(c)(3) fiscal sponsorship for pure charity commitment
- **Zero personal gain** model - all stakes go to verified charities, never to the platform or other users

Unlike betting platforms, MicroCommit is legally positioned as a charitable giving platform with conditional commitments, avoiding gambling regulations.

## Core Value Proposition

### For Users
- **3x Higher Success Rate**: Financial accountability dramatically improves goal achievement (proven by platforms like StickK)
- **Meaningful Stakes**: Even small amounts ($5-$25) create powerful motivation when tied to charity
- **AI Verification**: No cheating, no lying to yourself - AI judges evidence objectively
- **Social Support**: Referees and community members provide encouragement and accountability
- **Good Cause**: Failed commitments still contribute to verified charities

### Differentiation from Competitors
- **Beeminder**: We focus on binary goals and charity (not complex data tracking)
- **StickK**: We add AI verification (no manual referee required for many goals) and stronger social features
- **Charity Miles**: We're goal-based, not activity-based; commitments drive outcomes

## Target Audience

### Primary Users
1. **Productivity Seekers** (25-45 years old)
   - Want to build better habits
   - Willing to use financial stakes for accountability
   - Value charitable giving

2. **Fitness Enthusiasts**
   - Have specific fitness goals
   - Need external motivation
   - Track workouts/progress

3. **Self-Improvement Community**
   - Learning new skills
   - Breaking bad habits
   - Building routines

### Secondary Users
- **Charities**: Receive micro-donations from failed commitments
- **Referees**: Friends/family who verify progress and provide support
- **Community Members**: Engage with others on similar goals

## Key Features (MVP)

### 1. Goal Creation & Commitment
- Create binary goals (did it / didn't do it)
- Set commitment amount ($5-$100 range)
- Choose verified charity from curated list
- Define success criteria and timeline
- Optional: Invite referee for verification

### 2. Progress Tracking
- Daily/weekly check-ins based on goal frequency
- Submit evidence (photos, data, manual confirmation)
- View progress streak and history
- Reminders and notifications before deadlines

### 3. AI Evidence Verification
- Photo analysis for visual goals (gym selfies, meal prep, workspace)
- Basic pattern recognition (e.g., "person in gym setting")
- Confidence scoring (high/medium/low certainty)
- Fallback to referee or manual review for low-confidence cases

### 4. Social Accountability
- Invite up to 3 referees per goal
- Referees receive notifications and can approve/reject evidence
- Optional public goal sharing (community feed)
- Encouragement messages and comments
- Leaderboard for motivation (opt-in)

### 5. Payment & Charity Distribution
- Secure payment processing (Stripe)
- Funds held in escrow during goal period
- Automatic distribution to charity on failure
- Refund on success (minus small platform fee for operations)
- Tax-deductible donation receipts

### 6. User Profile & History
- Track all goals (active, completed, failed)
- Success rate statistics
- Total amount committed and donated
- Charity impact summary
- Achievement badges and streaks

## Success Metrics (MVP)

### Business Metrics
- **User Acquisition**: 1,000 active users in first 3 months
- **Goal Creation Rate**: 60% of registered users create at least one goal
- **Commitment Rate**: Average commitment value $15-25
- **Platform Retention**: 40% of users create a second goal after first completion

### Impact Metrics
- **Goal Success Rate**: 50%+ success rate (vs. 15-20% baseline without accountability)
- **Total Donated**: $10,000+ to charities in first 3 months
- **Referee Engagement**: 30% of goals use referee verification
- **AI Accuracy**: 80%+ accuracy in evidence verification

### User Experience Metrics
- **Onboarding Completion**: 70% complete profile and create first goal
- **Daily Active Users**: 25% of users check in daily
- **Evidence Submission Rate**: 90% of check-ins include evidence
- **User Satisfaction**: 4+ star average rating

## Technical Requirements

### Platforms
- **Mobile-first**: iOS and Android (React Native / Expo)
- **Web support**: Responsive web app for desktop users
- **Cross-platform sync**: Real-time updates across devices

### Core Technologies
- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **AI/ML**: OpenAI Vision API for image analysis
- **Payments**: Stripe Connect for escrow and charity distribution
- **Push Notifications**: Expo Notifications

### Data & Security
- **User Data**: Encrypted storage, GDPR/CCPA compliant
- **Payment Security**: PCI-compliant through Stripe
- **Evidence Storage**: Secure file storage with automatic expiration
- **Charity Verification**: Integration with IRS charity database

## Legal & Compliance

### Model A Fiscal Sponsorship
- Platform operates under 501(c)(3) fiscal sponsor
- Fiscal sponsor handles:
  - Legal compliance and state registrations
  - Financial accountability and reporting
  - IRS tax-exempt status maintenance
  - Donor receipts and acknowledgments

### Charitable Solicitation Compliance
- Annual registration with state authorities (starting with California AB 488)
- Charity vetting: Only IRS-verified 501(c)(3) organizations
- Written consent from charities before featuring
- Funds distribution within 30 days
- Clear donor disclosures about fees and fund flow
- Transparent accounting and separate fund management

### Not Gambling
- No personal financial gain for users
- No games of chance
- Pure charitable commitment contracts
- Legal opinion obtained confirming structure

## Design Principles

### User Experience
- **Simple & Clear**: Goal creation in under 2 minutes
- **Motivating**: Positive reinforcement, progress visualization
- **Trustworthy**: Transparent about AI decisions and fund distribution
- **Social but Private**: Control over what's public vs. private
- **Mobile-optimized**: Fast, native feel

### Visual Design
- **Clean & Modern**: Minimal UI with focus on goals
- **Progress-driven**: Visual indicators of streaks and success
- **Charitable brand**: Warm colors, mission-driven messaging
- **Gamification**: Badges, levels, achievements (without being gimmicky)

## Monetization (Post-MVP)

### Primary Revenue
- **Platform Fee**: 3-5% of commitment amount to cover operations
  - Transparent: Shown at commitment time
  - Covers: Payment processing, AI costs, hosting, compliance

### Future Revenue Streams
- **Premium Features** ($4.99/month):
  - Unlimited simultaneous goals
  - Advanced AI verification
  - Priority referee notifications
  - Extended goal history and analytics
  - Custom charity suggestions

- **Corporate/Team Plans**: Workplace wellness programs
- **API Access**: For other platforms to integrate commitment contracts

## Development Roadmap

### Phase 1: MVP Foundation (Weeks 1-4)
- User authentication and onboarding
- Basic goal creation and tracking
- Manual evidence submission
- Simple charity selection
- Payment integration (Stripe)

### Phase 2: AI & Social (Weeks 5-8)
- AI evidence verification (OpenAI Vision)
- Referee invitation and verification
- Push notifications and reminders
- Community feed (optional goal sharing)

### Phase 3: Polish & Launch (Weeks 9-12)
- User testing and feedback
- Performance optimization
- Legal compliance review
- Charity partnerships (5-10 initial partners)
- Public beta launch

### Phase 4: Scale Features (Post-Launch)
- Advanced goal templates
- Team/group goals
- Enhanced AI capabilities
- Analytics dashboard
- Mobile app polish and optimization

## Getting Started (For Developers)

See [TEMPLATE_INFO.md](./TEMPLATE_INFO.md) for technical setup instructions.

### Prerequisites
- Node.js 18+
- Expo CLI
- Supabase account
- Stripe account (test mode for development)

### Quick Start
```bash
npm install
cp .env.example .env
# Add your Supabase and Stripe keys to .env
npm run dev
```

## Support & Contribution

This is a Tzrif86 product. For questions or issues:
- Check the product documentation in `products/`
- Review flow diagrams in `flows/`
- See screen specifications in `screens/`

## License

Proprietary - Tzrif86
