#!/bin/bash

CLI_PATH="/Users/omertzadiki/Desktop/dev/tzrif86/utils/cli/tzrif-cli.js"
PRODUCT="MicroCommit"

echo "Creating tasks for Flow 01: Onboarding (12 tasks)"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create Welcome/Landing Screen with social proof" --description "Screen: Welcome / Landing. Build entry screen with app logo, tagline, social proof stats, and primary CTA button. Must include 'Get Started' button and 'Already have account' link. Focus on conversion optimization." --priority 2 --screen-ids "ONBOARD-001-Welcome"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement Supabase Auth with Google/Apple/Email" --description "Screen: Sign Up / Sign In. Integrate Supabase Auth with three methods: Google, Apple, Email. Create user profile record on signup, generate user ID, handle terms acceptance. Include error handling and auth state management." --priority 2 --screen-ids "ONBOARD-002-Auth"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build 3-card swipeable onboarding tutorial" --description "Screen: How It Works. Create 3 swipeable cards explaining concept: Set Goal, Make Commitment, Prove Progress. Include dots indicator, skip link, next button. Must support swipe gestures and auto-advance." --priority 2 --screen-ids "ONBOARD-003-Tutorial"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create goal template selection screen with categories" --description "Screen: Goal Templates. Build template selector with 6 categories: Fitness, Learning, Productivity, Wellness, Creativity, Custom. Each template shows popular examples, suggested commitment, evidence type. Include expand/collapse animations." --priority 2 --screen-ids "ONBOARD-004-Templates"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build goal definition form with validation" --description "Screen: Goal Creation Form. Create form with goal name (60 chars), success criteria (200 chars), frequency selector, duration picker. Include real-time validation, inline errors, progress indicator 'Step 1 of 4'. Must validate min lengths before allowing continue." --priority 2 --screen-ids "ONBOARD-005-GoalForm"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create commitment slider and charity selector" --description "Screen: Commitment & Charity. Build amount slider ($5-$100, default $15) with charity dropdown. Display charity cards with logo, description, impact example. Show refund vs donation preview. Progress indicator 'Step 2 of 4'." --priority 2 --screen-ids "ONBOARD-006-Commitment"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build referee invitation and privacy settings screen" --description "Screen: Referee & Privacy. Create optional referee invitation (up to 3), privacy level radio buttons (Private/Referees Only/Public), reminder toggles with time picker. Include contact import, progress indicator 'Step 3 of 4'. Must allow skip." --priority 2 --screen-ids "ONBOARD-007-Referees"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement Stripe payment integration for goal commitment" --description "Screen: Confirm & Pay. Build goal summary card, payment details with platform fee calculation, Stripe payment form integration. Include terms checkboxes, 'Save card' option. Create goal record, payment intent, send referee invitations on success. Progress 'Step 4 of 4'." --priority 2 --screen-ids "ONBOARD-008-Payment"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create goal success confirmation with celebration" --description "Screen: Goal Created Success. Build celebration screen with confetti animation, goal summary, first check-in notification. Include 'View My Goal' and 'Add Another Goal' buttons. Auto-navigate to dashboard after 5 seconds." --priority 2 --screen-ids "ONBOARD-009-Success"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Add onboarding error handling and edge cases" --description "Implement payment failure recovery, network offline handling with local save, validation error messages, returning user detection, incomplete onboarding resume. Handle charity selection issues, referee invitation failures." --priority 2 --screen-ids "ONBOARD-001-Welcome,ONBOARD-008-Payment"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement onboarding analytics tracking" --description "Add analytics events for entire onboarding funnel: started, step_viewed, step_completed, template_selected, goal_created, charity_selected, referee_invited, payment_completed, completed, abandoned. Track timing and drop-off points." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Add push notification support for onboarding" --description "Set up push notification permissions, configure notification triggers for check-in reminders, referee notifications, goal milestones. Must handle iOS/Android differences, permission denied flows." --priority 2

echo "Creating tasks for Flow 02: Daily Check-in (14 tasks)"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build check-in evidence submission screen" --description "Screen: Submit Evidence. Create evidence type selector (Photo/Upload/Manual), large action buttons, optional text field (100 chars), help text with tips. Include 'I missed this one' and 'Remind me later' options. Show goal name, streak, check-in date." --priority 2 --screen-ids "CHECKIN-001-Submit"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement camera interface with guidance overlay" --description "Screen: Camera Interface. Build native camera view with capture button, switch camera, flash toggle, cancel. Add first-time guidance overlay with goal-specific hints. Include photo preview with confirm/retake/edit options." --priority 2 --screen-ids "CHECKIN-002-Camera,CHECKIN-003-Preview"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement photo library picker integration" --description "Screen: Photo Library Picker. Integrate native photo picker, single photo selection only, filters for recent/today/favorites. Connect to photo preview screen after selection." --priority 2 --screen-ids "CHECKIN-004-Library"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build manual check-in confirmation screen" --description "Screen: Manual Check-In Confirmation. Create confirmation screen with success criteria reminder, optional note field, 'Yes I completed' and 'No I missed' buttons. Auto-flag for referee review." --priority 2 --screen-ids "CHECKIN-005-Manual"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create Supabase Edge Function for AI verification" --description "Build edge function 'verify-evidence' that uploads to Supabase Storage, calls OpenAI Vision API with photo + goal criteria, returns verdict/confidence/reasoning. Store result in evidence table, update check_ins record. Handle timeout (15s), errors gracefully." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build AI verification loading screen with progress" --description "Screen: Analyzing Evidence. Create animated loading with rotating status messages, photo thumbnail, timeout handling (15s), 'Continue in background' option. Show analyzing/checking/verifying progression." --priority 2 --screen-ids "CHECKIN-006-Verifying"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create check-in approved success screen" --description "Screen: Check-In Approved. Build success screen with green checkmark animation, updated streak counter (animated increment), progress indicator, timeline with today marked. Include collapsible AI reasoning, celebration effects (haptic/confetti for milestones), auto-dismiss after 5s." --priority 2 --screen-ids "CHECKIN-007-Approved"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build pending referee review screen" --description "Screen: Pending Referee Approval. Create uncertain verdict screen with amber icon, AI reasoning display (confidence 45-69%), submitted photo thumbnail, waiting status for referee, expected review time. Include 'Add More Context', 'Submit Another Photo', 'Contact Referee' actions. Send push notification to referee." --priority 2 --screen-ids "CHECKIN-008-PendingReview"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create check-in rejected screen with options" --description "Screen: Check-In Denied. Build rejection screen with red X, AI reasoning (confidence 70-100%), consequence warning with deadline timer. Include 'Submit Different Evidence', 'Request Manual Review', 'I missed this check-in', 'Learn More' options." --priority 2 --screen-ids "CHECKIN-009-Rejected"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build missed check-in acknowledgment screen" --description "Screen: Acknowledge Missed Check-In. Create supportive screen (no judgment), show impact summary (streak reset, progress %), encouragement message. Include 'View My Progress', 'Adjust My Goal', 'Talk to Support' actions. Update streak counter, recalculate success probability." --priority 2 --screen-ids "CHECKIN-010-Missed"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Add check-in error handling (upload, camera, timeout)" --description "Implement error handling for: photo upload failures (retry, save locally), AI timeout (background processing, fallback to referee), camera permission denied (settings deep link, library alternative), no referee available (invite, AI best guess, support)." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Handle check-in edge cases (late, multiple, early, time zones)" --description "Implement: late check-ins (up to 24h, mark orange), multiple same-day (for weekly goals), early check-ins (6h window), goal completed early (celebration + options), time zone changes (auto-adjust, notify user)." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement check-in analytics tracking" --description "Add analytics events: checkin_started, evidence_type_selected, photo_captured/uploaded, ai_verification_started/completed, checkin_approved/rejected/pending_review, checkin_missed_acknowledged, checkin_resubmitted, checkin_error. Track timing, confidence scores, sources." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build check-in push notification system" --description "Create notification triggers for: check-in due (with timer), deadline approaching (24h warning), referee review complete. Include app badge for pending check-ins, notification tap routing to correct screen." --priority 2

echo "Creating tasks for Flow 03: Goal Completion (13 tasks)"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create goal success celebration screen" --description "Screen: Goal Achieved. Build celebration with confetti animation, trophy/badge, success sound. Display goal summary (duration, check-ins, success rate, best streak), achievement badge unlock animation. Show refund info with amount, processing time, payment method. Include social sharing, 'Create Another Goal', thank referees section." --priority 2 --screen-ids "COMPLETE-001-Success"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build charitable impact screen for failed goals" --description "Screen: Thank You for Your Commitment. Create supportive screen (no 'failure' language), show goal summary with positive framing, donation information with charity logo/impact example. Include tax receipt, supportive message, insights about struggles, 'Try This Goal Again' (pre-fills), 'Create New Goal' options. NO negative visuals." --priority 2 --screen-ids "COMPLETE-002-Impact"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build partial success screen (70-99% completion)" --description "Screen: Almost There. Create hybrid screen with half trophy, accomplishment recognition for high completion rate (70-99%). Two-part layout: Your Progress (celebrate) vs Your Impact (donation). Include special badge, insights, 'Try Again with Adjustments' pre-filled option. Encouraging tone, no discouragement." --priority 2 --screen-ids "COMPLETE-003-Partial"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create background job for goal completion detection" --description "Build cron job/edge function to check active goals daily: identify goals meeting success/failure criteria, mark status (completed_success/completed_failed), queue notifications, initiate refund or donation process. Run within 1 hour of final check-in or end date." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement Stripe refund processing system" --description "Build refund system: release funds from escrow via Stripe API, deduct platform fee (3%), process refund to original payment method, record in payments table, send confirmation email with transaction ID and arrival date. Timing: immediate initiation, 3-5 days to account." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement charity donation distribution system" --description "Build donation system: transfer funds from escrow to charity Stripe account, deduct processing fees, record in donations table, generate tax receipt PDF (501c3 compliant), notify charity, send receipt to user. Timing: within 7 days per compliance. Include charity EIN, thank you message." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Add goal completion push/email notifications" --description "Create notifications for: success (congratulations + refund info), failure (supportive + donation info), partial success (encouragement). Include email backups with goal summary. Trigger within 1 hour of completion detection." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Handle goal completion edge cases" --description "Implement: early completion (end now vs keep going, overachiever badge), user disputes outcome (dispute form, manual review, overturn process), referee challenges completion (flag for review, fraud detection), payment processing failures (refund retry 3x, donation retry, user notification, manual fallback)." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build goal abandonment warning system" --description "Create abandonment flow: Day 3 missed (reminder), Day 5 missed (supportive + referee notification), Day 7 missed ('Still doing this?' prompt with resume/cancel options), auto-cancel after 14 days silence. Track abandonment reasons for analytics." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Handle charity status changes and fallbacks" --description "Implement charity status monitoring: detect closed/investigated charities, notify users of active goals to select new charity, offer alternative charity with same impact category. For completed goals: if donation not sent, offer choice of alternative." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement goal completion analytics tracking" --description "Add analytics events: goal_completed (success/failure, rate, checkins), success_notification_sent, success_screen_viewed (time_spent), achievement_unlocked, refund_initiated/completed, failure_notification_sent, charitable_impact_screen_viewed, donation_initiated/completed, tax_receipt_generated, next_goal_created_after_completion, goal_shared, goal_abandoned, goal_disputed." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build social sharing for goal success" --description "Create social sharing functionality: pre-filled messages for Twitter/Instagram/Facebook, message to referees, community post. Include share button on success screen, track sharing rate. Message template: 'I achieved my goal with @MicroCommit! [Goal name] for X days!'" --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Generate tax-deductible donation receipts" --description "Build PDF receipt generator for donations: 501(c)(3) compliant format with charity EIN, donation amount/date, user info, transaction ID, charity description, IRS language. Email receipt, store in user account, make downloadable." --priority 2

echo "Creating tasks for Flow 04: Referee Experience (12 tasks)"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create referee invitation email and SMS" --description "Build invitation templates: email with subject '[Friend] wants you as accountability referee', SMS backup if phone provided. Include goal summary, what referees do, time commitment (<1 min), CTA 'I'll Be Their Referee', decline link. Send via Supabase edge function." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build referee acceptance screen and onboarding" --description "Screen: Become a Referee. Create two paths: new user (quick signup with name/email/password or social auth) and existing user (simple accept/decline). Show goal summary, what to expect, confirmation screen with 'You're Now a Referee!', send notification to goal creator." --priority 2 --screen-ids "REFEREE-001-Accept,REFEREE-002-Confirm"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build evidence review screen for referees" --description "Screen: Review Evidence. Create review interface with goal context, submitted photo (full-screen, pinch zoom, multiple if available), AI analysis (collapsible), history thumbnails, decision buttons (Approve/Reject/Need More Info), optional message field (200 chars). Include quick approval tip for first-timers." --priority 2 --screen-ids "REFEREE-003-Review"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement referee approve/reject/request info flows" --description "Build three decision flows: Approve (confirmation modal, success message, notify creator, update streak), Reject (require reason, supportive message option, notify creator), Need More Info (clarification text field, send to creator, wait for response, return to review). Update check_ins status, handle referee comments." --priority 2 --screen-ids "REFEREE-004-Approve,REFEREE-005-Reject,REFEREE-006-RequestInfo"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build referee encouragement messaging system" --description "Screen: Send Encouragement. Create encouragement interface with quick templates (4 one-tap options), custom message field (200 chars with emoji picker), goal context display. Send as notification to creator, display in goal detail, track sending rate. Trigger on milestones (7-day streak, halfway, etc)." --priority 2 --screen-ids "REFEREE-007-Encourage"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Create referee dashboard with active goals" --description "Screen: Referee Dashboard. Build dashboard showing people you're supporting, stats widget (X people, Y verifications, Z encouragements), active goal cards (progress bar, streak, status badge, last activity), pending reviews section (priority with timer), completed goals archive, notification preferences." --priority 2 --screen-ids "REFEREE-008-Dashboard"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build referee goal progress monitoring view" --description "Screen: Goal Detail (Referee Perspective). Create referee view of friend's goal with header, streak timeline (calendar with colored dots), recent evidence gallery with verification status, progress stats (completion rate graph, best streak, missed count, your reviews), Your Impact section, actions (encourage, view all, report concern)." --priority 2 --screen-ids "REFEREE-009-GoalDetail"

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Add referee push/email notification system" --description "Create notifications for referees: evidence review needed (push + email backup after 1h), milestone encouragement prompts, reminder after 24h no response. Include in-app badge for pending reviews. Handle notification preferences, unsubscribe options." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Handle referee edge cases (unresponsive, too strict/lenient, quit)" --description "Implement: unresponsive referee (reminder at 24h, auto-approve after 48h with note, track response rate), too strict (>80% rejection - show tip, allow creator to remove), too lenient (spot checks, fraud warning), quit mid-goal (confirmation, notify creator, fallback to AI-only). Handle multiple referees with tie-breaker logic." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Implement referee analytics tracking" --description "Add analytics events: referee_invited, referee_accepted/declined (time, reason), evidence_review_started, referee_approved_evidence (time_to_approve), referee_rejected_evidence (reason), referee_requested_info, referee_sent_encouragement (type), referee_viewed_progress, referee_quit (reason), referee_unresponsive_auto_approve. Track response times, approval rates." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Build referee fraud detection and reporting" --description "Create 'Report Concern' flow for referees: flag goal for review, submit reasoning, support team review process. If fraud confirmed: mark goal as failed, warn user about terms violation, account suspension for repeat offenders. If legitimate: thank referee for diligence, success stands." --priority 2

node "$CLI_PATH" create-task --product "$PRODUCT" --title "Handle multiple referee conflict resolution" --description "Implement multi-referee logic: majority rules (2 of 3 approve = approved), tie-breaker using AI confidence score, ultimate fallback to support team review. Display disagreement to creator with reasoning from each referee. Track conflicts for quality control." --priority 2

echo ""
echo "====================================="
echo "All 51 tasks created successfully!"
echo "====================================="
echo ""
echo "Summary:"
echo "- Flow 01 Onboarding: 12 tasks"
echo "- Flow 02 Daily Check-in: 14 tasks"
echo "- Flow 03 Goal Completion: 13 tasks"
echo "- Flow 04 Referee Experience: 12 tasks"
echo "- Total: 51 atomic implementation tasks"
echo ""
echo "Note: Tasks created without --impacted-flows flag"
echo "Flows may need to be registered in tzrif system first"
