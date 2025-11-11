# MicroCommit - Desired Product State

## Product Vision

MicroCommit is the leading micro-commitment platform that helps people achieve their personal goals through small charitable pledges, AI-powered verification, and social accountability. We combine behavioral economics (loss aversion) with charitable giving to create a win-win: users achieve more, charities benefit from micro-donations, and communities support each other.

## Core Philosophy

### Tzrif86 Values Alignment
- **Rapid Execution**: MVP in 12 weeks, iterate based on real user feedback
- **Meaningful Impact**: Every failed commitment helps a real charity
- **Great UX**: Goal creation in under 2 minutes, daily check-ins in 30 seconds
- **Customer Experience**: Transparent AI decisions, clear fund flow, responsive support

### Product Principles
1. **Simplicity First**: Binary goals (did it / didn't do it) over complex tracking
2. **Trust Through Transparency**: Show AI confidence scores, explain decisions, track every dollar
3. **Social but Not Judgmental**: Celebrate wins, support struggles, no shaming
4. **Mobile-Native**: Designed for quick check-ins and photo evidence on-the-go
5. **Charity-Focused**: All stakes go to good causes, platform fee only covers costs

## Target State: MVP (3 Months)

### User Experience Flow

#### New User Journey
1. **Download & Land** (30 seconds)
   - Clear value prop: "Achieve your goals. Help charity."
   - Social proof: "10,000+ goals achieved, $50K donated to charity"
   - Quick sign-up with email/Google/Apple

2. **Onboarding** (2 minutes)
   - Explain the concept with simple example
   - Show how AI verification works
   - Pick first goal from templates or create custom
   - Set commitment amount ($5-$100 slider with suggested $15)
   - Choose charity from curated list
   - Optional: Invite referee (can skip, add later)

3. **First Check-In** (Day 1)
   - Push notification: "Time to check in on your goal!"
   - Submit evidence (camera, photo library, or manual confirm)
   - AI analyzes and approves instantly (or flags for review)
   - Success feedback with progress indicator

4. **Goal Completion** (End of period)
   - **Success**: Celebration screen, money refunded, achievement badge
   - **Failure**: Charitable impact screen, donation receipt, encouragement to try again

### Core Screens (MVP)

#### 1. Home / Dashboard
- **Active Goals Section**
  - Card per active goal showing: name, days remaining, check-in status
  - Visual progress bars and streak indicators
  - Quick access to submit evidence

- **Quick Actions**
  - "Create New Goal" button (prominent)
  - View goal history
  - Charity impact summary

- **Stats Widget**
  - Total goals attempted
  - Success rate percentage
  - Total committed vs. donated
  - Current streak

#### 2. Goal Creation Flow
- **Step 1: Choose Goal Type**
  - Templates: Fitness, Productivity, Learning, Habits, Custom
  - Each template has suggested commitments and evidence types

- **Step 2: Define Goal**
  - Goal name (text input)
  - Success criteria (clear description of what counts)
  - Frequency: Daily, Weekly, X times per week
  - Duration: 1 week, 2 weeks, 1 month, custom

- **Step 3: Set Commitment**
  - Amount slider ($5-$100, default $15)
  - Choose charity from list (with descriptions)
  - Expected donation impact shown (e.g., "Could provide 3 meals")

- **Step 4: Add Accountability (Optional)**
  - Invite referees by email/phone
  - Choose privacy level: Private, Referees only, Public
  - Enable reminder notifications

- **Step 5: Confirm & Pay**
  - Review goal summary
  - Payment method (Stripe)
  - Terms acceptance
  - "Start My Commitment" button

#### 3. Check-In Screen
- **Evidence Submission**
  - Large "Take Photo" button for camera
  - "Upload Photo" from library
  - "Confirm Completion" for non-visual goals

- **AI Feedback (Real-time)**
  - Loading animation while analyzing
  - Success: Green check, "Verified! Keep it up!"
  - Uncertain: Yellow warning, "Needs referee review"
  - Rejection: Red X, "Doesn't match goal criteria. Try again?"

- **Referee Review (if flagged)**
  - Notification sent to referee
  - User sees "Pending Referee Approval" status
  - Can submit additional evidence or explanation

#### 4. Goal Detail Screen
- **Progress Timeline**
  - Calendar view of check-ins
  - Green dots for successes, red for misses
  - Streak counter

- **Evidence Gallery**
  - All submitted photos/evidence
  - AI verification notes
  - Referee comments

- **Goal Info**
  - Original commitment details
  - Charity information
  - Referee list
  - Edit/cancel options (before check-ins start)

#### 5. Profile / History
- **Personal Stats**
  - Overall success rate
  - Total goals (completed, failed, active)
  - Total amount committed and donated
  - Achievement badges and streaks

- **Goal History**
  - List of all past goals
  - Filter: Completed, Failed, All
  - Tap to see details and evidence

- **Charity Impact**
  - Total donated by charity
  - Impact stories
  - Link to charity websites

#### 6. Social / Community (Optional)
- **Feed**
  - Public goals from community
  - Encouragement and comments
  - Leaderboards (opt-in)

- **Referee Dashboard**
  - Goals you're refereeing
  - Pending verifications
  - Send encouragement messages

### Key Features Detail

#### AI Evidence Verification
- **Supported Evidence Types**
  - Gym selfies (detect person + gym equipment)
  - Meal prep photos (detect multiple food containers)
  - Workout screenshots (detect fitness app UI)
  - Study space (detect desk, books, laptop)
  - Outdoor running (detect outdoor setting, athletic wear)

- **Verification Process**
  1. User submits photo
  2. Image sent to OpenAI Vision API
  3. Prompt: "Analyze if this image shows [goal criteria]. Provide confidence level."
  4. AI returns: verdict (yes/no/uncertain), confidence score (0-100), reasoning
  5. If confidence < 70%: Flag for referee review
  6. If confidence >= 70%: Auto-approve or reject

- **User Experience**
  - Always show AI reasoning (transparency)
  - Allow appeal process
  - Learn from feedback (future: fine-tuning)

#### Referee System
- **Referee Roles**
  - Receive notifications when friend creates goal with them as referee
  - Review uncertain evidence (AI flagged cases)
  - Provide encouragement and accountability
  - Can challenge submissions if suspicious

- **Referee Incentives**
  - Achievement badges for being supportive
  - Thank you messages from users
  - See positive impact on friend's success rate

- **Referee Experience**
  - Simple "Approve / Reject / Need More Info" interface
  - View goal context and criteria
  - Add optional comment or encouragement

#### Payment & Charity Flow
- **Payment Setup**
  - Stripe integration for credit/debit cards
  - Funds held in escrow (Stripe Connect)
  - No charges until goal period starts

- **Fund Distribution**
  - **Success**: Full refund minus platform fee (3%)
  - **Failure**: 100% to charity (minus payment processing ~3%)
  - Distribution within 7 days of goal completion
  - Email receipt with tax deduction info

- **Charity Partnerships**
  - Start with 5-10 verified 501(c)(3) charities
  - Categories: Health, Education, Environment, Poverty, Animal Welfare
  - Written consent from each charity
  - Quarterly impact reports to charities

#### Notifications & Reminders
- **Push Notifications**
  - Check-in reminders (customizable time)
  - "24 hours until deadline!" warnings
  - Referee requests for review
  - Goal completion (success or failure)
  - Encouragement messages ("You're on a 7-day streak!")

- **Email Notifications**
  - Weekly summary of active goals
  - Charity impact updates
  - New features and tips
  - Donation receipts

### Technical Architecture

#### Frontend (React Native / Expo)
- **Screens**: 10-12 main screens
- **Components**: Reusable goal cards, evidence upload, progress indicators
- **Navigation**: Expo Router with tab navigation
- **State Management**: React Context + local state
- **Offline Support**: Queue check-ins when offline, sync when online

#### Backend (Supabase)
- **Database Tables**:
  - `users`: User profiles and settings
  - `goals`: Goal definitions, status, commitments
  - `check_ins`: Daily/weekly check-in records with evidence
  - `evidence`: Image storage and AI verification results
  - `referees`: Referee relationships and verifications
  - `charities`: Charity information and partnerships
  - `payments`: Stripe payment records and escrow tracking
  - `donations`: Completed donations to charities

- **Edge Functions**:
  - `verify-evidence`: Calls OpenAI Vision API
  - `process-payment`: Stripe payment processing
  - `distribute-funds`: Charity distribution logic
  - `send-notifications`: Push notification triggers

- **Storage**:
  - Evidence photos (S3-compatible)
  - Auto-expiration after 90 days (unless goal succeeded/failed)

#### External Integrations
- **OpenAI Vision API**: Image analysis for evidence
- **Stripe Connect**: Payments and escrow
- **Expo Notifications**: Push notifications
- **IRS Charity Database API**: Verify 501(c)(3) status

### Success Metrics (Detailed)

#### Acquisition Metrics
- **Target**: 1,000 registered users in Month 1-3
- **Channels**: Social media, content marketing, referral program
- **Cost per acquisition**: Target < $5
- **Conversion rate**: 30% of visitors sign up

#### Activation Metrics
- **Onboarding completion**: 70%+ create first goal
- **Time to first goal**: < 5 minutes median
- **Payment completion**: 80%+ complete payment for first goal
- **First check-in**: 90%+ submit evidence on Day 1

#### Engagement Metrics
- **Daily active users**: 25%+ of users with active goals
- **Check-in rate**: 90%+ of scheduled check-ins completed
- **Evidence submission**: 85%+ include photo/evidence
- **Referee engagement**: 30%+ of goals use referees

#### Retention Metrics
- **Day 7 retention**: 60%+ return after first week
- **Day 30 retention**: 40%+ active after first month
- **Second goal creation**: 40%+ create another goal after first completes
- **Referral rate**: 20% invite friends

#### Business Metrics
- **Average commitment value**: $15-25
- **Goal success rate**: 50%+ (vs. 15-20% baseline)
- **Total platform volume**: $15,000+ committed in Month 1-3
- **Total donated**: $5,000-8,000 to charities (assumes ~40% failure rate)
- **Platform fee revenue**: $450-750 (3% of successful commitments)

#### Impact Metrics
- **Lives touched**: Track charity impact (meals provided, trees planted, etc.)
- **User satisfaction**: 4+ stars average rating
- **Net Promoter Score**: 40+ (willing to recommend)

### MVP Scope (What's Included)

#### Must Have
- User authentication (email, Google, Apple)
- Goal creation with templates
- Binary goal tracking (did it / didn't do it)
- Photo evidence submission
- AI verification with confidence scoring
- Referee invitation and verification
- Stripe payment integration
- Charity selection from curated list
- Push notifications for check-ins
- Basic profile and history
- Success/failure handling with fund distribution

#### Nice to Have (MVP+)
- Community feed and public goals
- Leaderboards
- Advanced goal templates
- Streak bonuses and achievements
- Charity impact stories
- Referee dashboard
- Analytics and insights

#### Explicitly Out of Scope (Post-MVP)
- Complex data tracking (quantitative goals)
- Wearable integration (Fitbit, Apple Watch)
- Team/group goals
- Corporate wellness programs
- Custom charity addition by users
- AI fine-tuning and model training
- Advanced gamification
- Social features (friends, following)

### Design Guidelines

#### Visual Style
- **Colors**:
  - Primary: Warm teal (#2DD4BF) - trust and growth
  - Secondary: Soft orange (#FB923C) - motivation and energy
  - Accent: Deep purple (#7C3AED) - premium feel
  - Charity: Warm green (#10B981) - giving and nature
  - Success: Bright green (#22C55E)
  - Warning: Amber (#F59E0B)
  - Error: Red (#EF4444)
  - Neutral: Gray scale for text and backgrounds

- **Typography**:
  - Headings: Inter Bold (modern, friendly)
  - Body: Inter Regular (highly readable)
  - Numbers: Tabular figures for stats

- **Iconography**:
  - Line icons (Lucide React Native)
  - Simple, recognizable symbols
  - Consistent 2px stroke weight

#### Component Patterns
- **Goal Cards**: Rounded corners, subtle shadows, progress indicators
- **Buttons**: Large touch targets (min 44x44), clear CTAs
- **Forms**: Inline validation, helpful error messages
- **Evidence Upload**: Large camera button, gallery grid
- **Progress**: Visual bars, percentage numbers, streak flames
- **Charity**: Logo + name + short description

#### Interaction Patterns
- **Haptic Feedback**: On successful check-ins and goal completion
- **Animations**: Smooth transitions, celebration confetti on success
- **Loading States**: Skeleton screens, never blank screens
- **Empty States**: Helpful, encouraging messages with CTAs
- **Error States**: Clear explanation and action to resolve

### Legal & Compliance Requirements

#### Fiscal Sponsorship (Model A)
- Partner with established 501(c)(3) fiscal sponsor
- Fiscal sponsor provides:
  - Legal entity for charitable solicitation
  - State registrations (start with California)
  - IRS tax-exempt status
  - Financial reporting and accountability
  - Donor receipts and acknowledgments
- MicroCommit team focuses on product and operations

#### Charitable Solicitation Compliance
- **Before Launch**:
  - File charitable solicitation registration in California
  - Obtain written consent from featured charities
  - Set up transparent accounting and separate fund management
  - Create donor disclosure statements

- **Ongoing**:
  - Distribute funds to charities within 30 days
  - Provide quarterly reports to charities
  - Annual filing with state authorities
  - Maintain IRS charity database verification
  - Update disclosures as regulations change

#### Terms & Privacy
- Clear Terms of Service:
  - Goal commitment is binding
  - Evidence review process and appeals
  - Platform fee disclosure
  - Charity distribution timeline
  - Refund policy (success only)

- Privacy Policy:
  - Evidence photo storage and expiration
  - AI analysis and data usage
  - Referee visibility settings
  - Data deletion requests (GDPR/CCPA)

- User Agreements:
  - Age verification (18+)
  - Payment authorization
  - Charity selection confirmation
  - Acknowledgment of non-gambling nature

### Risk Mitigation

#### Product Risks
- **Risk**: Users game the system with fake evidence
  - **Mitigation**: AI verification, referee review, appeal process, ban repeat offenders

- **Risk**: AI makes incorrect decisions
  - **Mitigation**: Confidence thresholds, referee fallback, transparency in reasoning, appeal system

- **Risk**: Low goal success rate demotivates users
  - **Mitigation**: Start with easier goals, provide coaching tips, celebrate small wins, supportive community

#### Business Risks
- **Risk**: Not enough users to be sustainable
  - **Mitigation**: Focus on retention and referrals, strong value prop, excellent UX

- **Risk**: Legal challenges to charitable structure
  - **Mitigation**: Work with fiscal sponsor, obtain legal opinions, stay updated on regulations

- **Risk**: Charities don't want to be featured
  - **Mitigation**: Emphasize positive framing (motivation, not punishment), show impact data, build relationships

#### Technical Risks
- **Risk**: OpenAI API costs become prohibitive
  - **Mitigation**: Optimize prompts, cache results, implement rate limiting, explore alternatives

- **Risk**: Stripe escrow fees eat into charity donations
  - **Mitigation**: Transparent fee disclosure, optimize payment flow, negotiate volume pricing

- **Risk**: Evidence storage costs grow quickly
  - **Mitigation**: Auto-expiration of old evidence, image compression, tiered storage

### Post-MVP Roadmap

#### Month 4-6: Scale & Optimize
- Advanced goal templates and suggestions
- Enhanced AI with context learning
- Team/group goals
- Improved analytics and insights
- Charity partnership expansion (20-30 charities)
- Premium tier launch ($4.99/month)

#### Month 7-9: Social & Community
- Full community feed
- Friends and following
- Challenge others to goals
- Shared goals with split commitments
- Enhanced referee features
- Public profiles and sharing

#### Month 10-12: Enterprise & Scale
- Corporate wellness programs
- API for third-party integrations
- White-label options
- Advanced gamification
- Wearable integration
- International expansion (compliance permitting)

---

## Conclusion

MicroCommit MVP is focused on proving the core value proposition: **financial accountability through small charitable commitments helps people achieve their goals, powered by AI verification and social support.**

Success means:
1. Users achieve goals at 2-3x higher rates than without accountability
2. Charities receive meaningful micro-donations
3. The platform is sustainable through transparent fees
4. Users feel motivated, supported, and trust the AI verification
5. The product is ready to scale to thousands of users

The MVP is intentionally simple—binary goals, straightforward evidence, clear outcomes. Complexity comes later, only after validating the core concept with real users.

**Next Steps**: PM-002 (Review), PM-003 (Flows), PM-004 (Screens), DESIGN-001 (Design Specs)
