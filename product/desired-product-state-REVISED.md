# MicroCommit - Desired Product State (REVISED POST-REVIEW)

**Status**: REVISED - Addresses PM-002 Review Findings
**Date**: 2025-11-12
**Version**: 2.0

---

## ⚠️ CRITICAL CHANGES FROM V1

This revision addresses critical issues identified in PM-002 review:

1. **Revenue Model Fixed**: Changed from 3% success fee (losing $1.12/goal) to sustainable model
2. **MVP Scope Reduced**: 12-week realistic MVP vs. 24-week original scope
3. **Legal Requirements Defined**: 4-6 week legal setup before launch
4. **Technical Validation Required**: 2-week PoC before full implementation
5. **Missing Screens/Flows Identified**: 10 screens and 10 flows need documentation

---

## Product Vision (Unchanged)

MicroCommit is the leading micro-commitment platform that helps people achieve their personal goals through small charitable pledges, accountability systems, and transparent verification. We combine behavioral economics (loss aversion) with charitable giving to create a win-win: users achieve more, charities benefit from micro-donations, and communities support each other.

---

## Revised MVP Scope: Phase 1A-C (12 Weeks)

### Phase 1A: Core Commitment Flow (Weeks 1-4)

**Scope**: Prove the core concept with minimal features

**Features Included**:
- Email authentication only (no Google/Apple OAuth)
- Simple 3-step goal creation:
  1. Choose from 5 goal templates
  2. Set commitment amount and charity
  3. Confirm and pay
- Daily manual check-ins (text confirmation, no photos)
- Stripe standard payments (NOT Stripe Connect escrow yet)
- Email notifications only (no push notifications)
- 3 hand-selected charity partners

**Screens** (5 total):
1. Welcome/Sign In
2. Dashboard (simplified: active goals + create button)
3. Goal Creation (3-step flow in one screen)
4. Check-In (manual confirmation)
5. Profile (basic stats only)

**What's NOT in Phase 1A**:
- ❌ Photo evidence
- ❌ AI verification
- ❌ Referee system
- ❌ Push notifications
- ❌ Social features
- ❌ Achievement badges
- ❌ Stripe Connect escrow
- ❌ Multiple auth providers

**Success Criteria Phase 1A**:
- 50 beta users complete onboarding
- 30 goals created
- 80%+ check-in completion rate
- 30%+ goal success rate
- Payment processing works without errors

### Phase 1B: Photo Evidence & Payments (Weeks 5-8)

**New Features**:
- Photo upload for check-ins
- Manual review by team (1-2 people, not AI or referees)
- Stripe Connect for proper escrow
- Fund distribution to charities (7-day window)
- Goal completion flows (success/failure screens)
- Basic goal history
- Tax receipts (automated)

**Screens Added** (3 total):
6. Check-In with Camera
7. Goal Detail/Progress
8. Goal Completion (success/failure)

**Success Criteria Phase 1B**:
- 100+ active goals
- Photo evidence submitted for 80%+ of goals
- Manual review completed within 24 hours
- Successful refunds and charity donations
- Zero payment processing errors

### Phase 1C: Legal Setup & Polish (Weeks 9-12)

**Focus**: Legal compliance and beta testing

**Activities**:
- Fiscal sponsor agreement executed
- California charitable solicitation registration filed
- Charity partnership agreements signed
- Terms of Service finalized
- Privacy Policy finalized (GDPR/CCPA compliant)
- Beta testing with 50-100 users
- Bug fixes and UX improvements
- Prepare for public launch

**Success Criteria Phase 1C**:
- All legal requirements met
- 4+ stars average user rating from beta
- <5% payment error rate
- 50%+ of beta users would recommend
- Ready for public launch

---

## Phase 2: Enhanced Verification (Weeks 13-18)

**NOT part of initial MVP**, but next priority:

**New Features**:
- AI verification (after successful PoC)
- Referee system (invitations, reviews, encouragement)
- Push notifications
- 10-15 charity partners
- Goal templates expanded (20 templates)
- Achievement badges
- Profile improvements

**Prerequisite**: AI verification PoC must show 70%+ accuracy before starting Phase 2.

---

## FIXED: Revenue Model

### Problem Identified

Original model: 3% platform fee on successful commitments only

**Unit Economics (BROKEN)**:
- Cost per goal: $1.57 (AI: $0.60, Storage: $0.12, Payments: $0.75, Email: $0.10)
- Revenue per goal: $0.45 (3% of $15 at 50% success rate)
- **Net per goal: -$1.12 LOSS** ❌

### New Model: Platform Admin Fee

**Structure**: "$X commitment + $Y admin fee"

**Example Pricing**:
- User commits: $15 to charity
- Platform fee: $2 admin fee (charged upfront)
- Total charge: $17

**On Success**:
- User refunded: $15 (commitment)
- Platform keeps: $2 (admin fee)

**On Failure**:
- Charity receives: $15 (100% of commitment)
- Platform keeps: $2 (admin fee)
- Stripe fees: ~$0.50 (covered by admin fee)

**Unit Economics (FIXED)**:
- Cost per goal: $1.57
- Revenue per goal: $2.00 (admin fee)
- **Net per goal: +$0.43 PROFIT** ✅

### Pricing Communication

**User-Facing**:
- "Create a $15 commitment (+ $2 platform fee)"
- "Total: $17"
- "If you succeed: Get $15 back"
- "If you don't succeed: $15 goes to charity"
- "Platform fee covers AI verification, hosting, payment processing"

**Benefits**:
1. ✅ Sustainable economics
2. ✅ Charity always gets 100% of commitment
3. ✅ Transparent to users
4. ✅ No conflicts with charitable solicitation laws
5. ✅ Predictable revenue

### Alternative Pricing Tiers

**Starter** (Free):
- 1 active goal at a time
- Manual verification only
- Email notifications only
- Standard support

**Premium** ($4.99/month):
- Unlimited active goals
- AI verification (when available)
- Push notifications
- Priority support
- Advanced analytics
- $1 admin fee discount (instead of $2)

---

## Target Users & Goals (Updated)

### Phase 1 Target: Early Adopters

**Persona**: Productivity enthusiasts, fitness goal-setters, self-improvement seekers

**Realistic Targets**:
- Month 1: 50 beta users
- Month 2: 150 active users
- Month 3: 300 active users

**Goal Types (MVP)**:
1. Fitness: "Gym 3x per week"
2. Productivity: "No phone before 9am"
3. Learning: "Study 1 hour daily"
4. Wellness: "Meditate 10 min daily"
5. Creativity: "Write/draw 30 min daily"

---

## Success Metrics (Realistic)

### Acquisition (Phase 1)
- **Total Users**: 300 by end of Month 3 (was 1,000 - unrealistic)
- **Cost per Acquisition**: <$10 (organic social, referrals)
- **Conversion Rate**: 25% of visitors sign up (was 30%)

### Activation
- **Onboarding Completion**: 50%+ create first goal (was 70%)
- **Payment Completion**: 70%+ complete payment (was 80%)
- **First Check-in**: 80%+ submit first check-in (was 90%)

### Engagement
- **Check-in Completion**: 80%+ of scheduled check-ins done (was 90%)
- **Goal Success Rate**: 35-45% in first 3 months (was 50%+)

### Retention
- **Day 7**: 50%+ return
- **Day 30**: 30%+ active
- **Second Goal**: 30%+ create another goal (was 40%)

### Business (Phase 1A-C)
- **Total Commitments**: $5,000-10,000 over 3 months
- **Total Donated**: $2,500-5,000 (40-50% failure rate)
- **Platform Revenue**: $800-1,200 (300 goals × $2-4 avg admin fee)
- **Break-even**: Month 6-9 (with 1,000+ active users)

---

## Legal & Compliance (DETAILED)

### Pre-Launch Requirements (4-6 Weeks)

**Week 1-2: Entity Formation & Fiscal Sponsor**
- [ ] Identify fiscal sponsor (Fractured Atlas, Tides, etc.)
- [ ] Negotiate fee structure (typically 7-10% of donations)
- [ ] Sign fiscal sponsorship agreement
- [ ] Establish operating agreement
- [ ] Cost: $2,000-5,000 setup + 7-10% ongoing

**Week 2-3: State Registration**
- [ ] File California charitable solicitation registration (requires: audited financials OR <$25k revenue exemption)
- [ ] Register in other required states (if >$25k/year: NY, FL, TX, PA)
- [ ] Cost: $500-1,500 filing fees

**Week 3-4: Charity Partnerships**
- [ ] Draft charity partnership agreement template
- [ ] Reach out to 10-15 charities
- [ ] Sign written consent forms with 3-5 initial charities
- [ ] Set up charity Stripe accounts or distribution method
- [ ] Cost: $1,000-2,000 legal review

**Week 4-5: Terms & Policies**
- [ ] Draft Terms of Service (with legal counsel)
  - Age verification (18+)
  - Commitment enforceability
  - Dispute resolution / arbitration
  - Fraud prevention
  - Account suspension policy
- [ ] Draft Privacy Policy (GDPR/CCPA compliant)
  - Data collection and usage
  - Evidence storage and retention (90 days)
  - Right to deletion
  - Data export
- [ ] Review by attorney
- [ ] Cost: $5,000-10,000 legal fees

**Week 5-6: Payment Processing Setup**
- [ ] Apply for Stripe Connect (can take 1-2 weeks for approval)
- [ ] Set up escrow holding process
- [ ] Test multi-party fund distribution
- [ ] Get legal review of fund flow
- [ ] Cost: $1,000-2,000 legal review

**Week 6: Insurance**
- [ ] Obtain Errors & Omissions (E&O) insurance
- [ ] General liability insurance
- [ ] Cyber liability insurance (for data breaches)
- [ ] Cost: $2,000-4,000/year

**Total Legal Setup**:
- **Time**: 4-6 weeks
- **Cost**: $15,000-30,000 one-time + 7-10% fiscal sponsor fees ongoing

### Ongoing Compliance

**Monthly**:
- Charity donation distributions (within 30 days)
- Financial reporting to fiscal sponsor
- User data requests (GDPR/CCPA)

**Quarterly**:
- Charity impact reports
- Financial reconciliation
- Terms & Privacy Policy review

**Annually**:
- State registration renewals
- Charity partnership renewals
- IRS charity verification updates
- Insurance renewals

---

## Technical Architecture (Updated)

### Phase 1A Tech Stack

**Frontend** (React Native / Expo):
- Expo SDK 50+
- React Native Paper (UI components)
- Expo Router (navigation)
- React Context (state management - keep simple)

**Backend** (Supabase):
- PostgreSQL database
- Supabase Auth (email/password only)
- Supabase Storage (for photos in Phase 1B)
- Edge Functions (minimal in Phase 1A)

**Payments**:
- Stripe standard (Phase 1A)
- Stripe Connect (Phase 1B)

**Email**:
- Sendgrid or Resend (transactional emails)

**NOT in Phase 1A**:
- ❌ OpenAI API (too expensive, unvalidated)
- ❌ Expo Notifications (push notifications)
- ❌ Complex state management (Redux, Zustand)

### Database Schema (Phase 1A)

**Tables**:

```sql
-- Users
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP,
  onboarded BOOLEAN DEFAULT false
)

-- Goals
goals (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT, -- 'daily', 'weekly', 'custom'
  commitment_amount DECIMAL(10,2),
  admin_fee DECIMAL(10,2),
  charity_id UUID REFERENCES charities(id),
  start_date DATE,
  end_date DATE,
  status TEXT, -- 'active', 'completed_success', 'completed_failed', 'cancelled'
  created_at TIMESTAMP
)

-- Check-ins
check_ins (
  id UUID PRIMARY KEY,
  goal_id UUID REFERENCES goals(id),
  scheduled_date DATE,
  completed_at TIMESTAMP,
  status TEXT, -- 'pending', 'completed', 'missed'
  notes TEXT,
  evidence_url TEXT, -- Phase 1B
  verified_by TEXT, -- 'user', 'manual', 'ai', 'referee' (Phase 2)
  created_at TIMESTAMP
)

-- Charities
charities (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  ein TEXT UNIQUE, -- IRS EIN
  description TEXT,
  category TEXT,
  logo_url TEXT,
  stripe_account_id TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP
)

-- Payments
payments (
  id UUID PRIMARY KEY,
  goal_id UUID REFERENCES goals(id),
  amount DECIMAL(10,2),
  admin_fee DECIMAL(10,2),
  stripe_payment_intent_id TEXT UNIQUE,
  status TEXT, -- 'pending', 'succeeded', 'refunded', 'donated'
  created_at TIMESTAMP
)

-- Donations (Phase 1B)
donations (
  id UUID PRIMARY KEY,
  goal_id UUID REFERENCES goals(id),
  charity_id UUID REFERENCES charities(id),
  amount DECIMAL(10,2),
  stripe_transfer_id TEXT,
  receipt_url TEXT,
  donated_at TIMESTAMP
)
```

**Indexes**:
- `users.email` (UNIQUE)
- `goals.user_id, goals.status`
- `check_ins.goal_id, check_ins.scheduled_date`
- `payments.goal_id, payments.status`

### External Services Cost Estimates

**Phase 1A (50 users, 30 goals)**:
- Supabase: $25/month (Pro plan)
- Stripe: 2.9% + $0.30 per transaction (~$15/month)
- Email (Sendgrid): $15/month (40k emails)
- **Total**: ~$55/month

**Phase 1B-C (300 users, 150 goals)**:
- Supabase: $25/month (storage for photos)
- Stripe: 2.9% + $0.30 (~$75/month)
- Email: $15/month
- **Total**: ~$115/month

**Phase 2 (1,000 users, 500 goals with AI)**:
- Supabase: $25/month
- Stripe: ~$250/month
- Email: $15/month
- OpenAI API: ~$300/month (500 goals × 30 check-ins × $0.02)
- **Total**: ~$590/month

---

## CRITICAL: Pre-Development Validation (2 Weeks)

### Week 1: AI Verification Proof of Concept

**Objective**: Validate AI can achieve 70%+ accuracy before building

**Method**:
1. Create 50 test images across 5 goal types:
   - 10 gym selfies (with equipment)
   - 10 meal prep photos
   - 10 study space photos
   - 10 outdoor running photos
   - 10 meditation/yoga photos

2. Test OpenAI Vision API with prompts:
   - "Does this image show [goal criteria]? Respond with YES/NO and confidence 0-100."
   - Record: verdict, confidence, reasoning, cost

3. Calculate:
   - Accuracy (% correct)
   - Cost per verification
   - Average response time
   - Edge cases / failure modes

**Success Criteria**:
- 70%+ accuracy across all goal types
- <$0.03 per verification
- <5 seconds response time

**If Failed**: Remove AI from Phase 2, stick with manual/referee verification

### Week 2: Payment Flow Testing

**Objective**: Validate Stripe Connect escrow works as expected

**Method**:
1. Set up Stripe Connect in sandbox
2. Create test accounts:
   - Platform account
   - 3 charity accounts
   - 5 user accounts

3. Test flows:
   - Charge user (commitment + admin fee)
   - Hold in escrow for 30 days
   - Success: Refund commitment, keep admin fee
   - Failure: Transfer to charity, keep admin fee
   - Payment failures and retries

4. Calculate:
   - Stripe fees (per transaction, transfer, refund)
   - Escrow holding fees (if any)
   - Transfer timing

**Success Criteria**:
- All payment flows work in sandbox
- Fees as expected (<3% total)
- Transfers complete in <3 days

---

## Missing Documentation (To Be Created)

### Screens (10 missing - Priority for PM-003)
1. Welcome/Landing screen spec
2. Authentication screen (sign up/sign in) spec
3. Onboarding explanation screen spec
4. Goal template selection screen spec
5. Goal creation form screen spec
6. Payment screen spec
7. Settings screen spec
8. Notifications screen spec
9. Charity selection screen spec
10. Help/Support screen spec

### Flows (10 missing - Priority for PM-003)
1. Payment failure and retry flow
2. Goal editing/cancellation flow
3. Charity selection detailed flow
4. Account settings management flow
5. Notification preferences flow
6. Password reset flow
7. Email change flow
8. Account deletion flow (GDPR)
9. Dispute/appeal process flow
10. Goal pause/resume flow

---

## What Changed vs. V1

### Removed from MVP (Moved to Phase 2+)
- ❌ AI verification (too risky, expensive, unvalidated)
- ❌ Referee system (complex, not core)
- ❌ Photo evidence (Phase 1A - manual check-ins only)
- ❌ Push notifications (email sufficient for MVP)
- ❌ Google/Apple OAuth (email only)
- ❌ Social features (community feed, leaderboards)
- ❌ Achievement badges (nice-to-have)
- ❌ Multiple simultaneous goals (1 goal limit for MVP)
- ❌ Advanced goal templates (5 simple templates)

### Added (Previously Missing)
- ✅ Realistic revenue model ($2 admin fee)
- ✅ Detailed legal requirements and timeline
- ✅ Pre-development validation (AI PoC, payment testing)
- ✅ Complete database schema
- ✅ Phased rollout plan (1A → 1B → 1C → 2)
- ✅ Conservative success metrics
- ✅ Cost analysis and break-even plan

### Fixed
- ✅ Unit economics (was -$1.12/goal, now +$0.43/goal)
- ✅ Timeline (realistic 12 weeks for true MVP)
- ✅ Scope creep (removed 50% of "MVP" features)
- ✅ Legal compliance (4-6 week pre-launch requirement)

---

## Next Steps

**DO NOT proceed to design or implementation until**:

1. ✅ PM completes all 10 missing screen specs (Task 2123)
2. ✅ PM documents all 10 missing flows (Task 2122)
3. ✅ Legal counsel engaged (external)
4. ✅ AI verification PoC completed (if Phase 2 desired)
5. ✅ Payment flow validated in Stripe sandbox
6. ✅ Fiscal sponsor identified and contacted

**Revised Project Timeline**:
- Week 0: Legal setup begins (parallel track)
- Weeks 1-2: Validation (AI PoC, payment testing)
- Weeks 3-4: Complete documentation (screens, flows)
- Weeks 5-8: Phase 1A development
- Weeks 9-12: Phase 1B development
- Weeks 13-16: Phase 1C (legal finalization, beta testing)
- Week 17: PUBLIC LAUNCH (if legal complete)

---

## Conclusion

This revised product state is:
- ✅ Financially sustainable
- ✅ Legally compliant
- ✅ Technically feasible
- ✅ Realistically scoped for 12-16 week MVP
- ✅ Validated before full investment

The product will still deliver the core value proposition:
**"Small charitable commitments create powerful accountability for achieving personal goals"**

But we'll do it sustainably, legally, and without betting the company on unvalidated AI technology.

---

*Approved for next phase: PM-003 (Define Flows), PM-004 (Create Screens)*
