# Charity Selection Flow

## Goal
Help users choose a charity that resonates with them, ensuring transparency about where their commitment goes while maintaining quick selection flow (under 30 seconds).

## Entry Points
- Goal creation flow → Step 6: Set Commitment Amount → "Choose a charity" selector
- Browse charities → Main menu → "Explore Charities"
- Charity changed notification → "Select new charity" (if previous charity removed)
- Profile settings → "Favorite Charities" → Add/manage

## Flow Steps

### Step 1: Charity Selection Entry (From Goal Creation)
**Screen**: Commitment & Charity Selection
- **Elements**:
  - "Choose a charity" selector (button/card)
  - If charity selected: Shows charity logo, name
  - If not selected: Shows "Choose a charity" with placeholder icon
  - Required indicator: "Required to continue"

**User Action**: Tap "Choose a charity"
**Next Screen**: Charity Browser

### Step 2: Charity Browser (Main)
**Screen**: Choose a Charity
- **Elements**:
  - "Choose a charity" heading
  - Search bar (top):
    - Placeholder: "Search charities..."
    - Real-time search results
    - Clear button

  - **Filters** (horizontal scrollable chips):
    - All (default)
    - Health & Medicine 🏥
    - Education 📚
    - Environment 🌍
    - Animals 🐾
    - Human Rights ✊
    - International Aid 🌏
    - Community 🤝
    - Active filters count badge

  - **Charity List** (vertical scroll):
    Each charity card shows:
    - Logo (square, 60x60px)
    - Name (bold)
    - Category badge (small chip)
    - One-line mission
    - Impact example: "$15 provides [specific impact]"
    - Rating: ⭐ 4.5/5 (charity rating)
    - "Verified" checkmark (if verified)
    - Tap to expand → Full details

  - **Featured Section** (top of list):
    - "Featured Charities" header
    - 3-5 curated charities (staff picks)
    - Rotate monthly

  - **Recently Selected** (if applicable):
    - Shows charities user picked in past
    - "You've donated to these before"

  - **Sorting Options** (dropdown, top right):
    - Relevance (default)
    - Most Popular
    - Alphabetical
    - Impact per Dollar
    - Highest Rated

  - **Actions**:
    - Tap charity card → Charity Details (Step 3)
    - Search → Filter results live
    - Filter by category → Update list
    - "Can't decide?" link → Random Charity (Step 6)

**User Action**: Browse and tap on charity for details
**Next Screen**: Charity Details

### Step 3: Charity Detail View
**Screen**: Charity Details
- **Elements**:
  - **Header**:
    - Charity logo (large, 120x120px)
    - Charity name (heading)
    - "Verified by MicroCommit ✓" or "Registered 501(c)(3) ✓"
    - Share button (top right)

  - **About Section**:
    - Mission statement (2-3 sentences)
    - Founded: [Year]
    - Location: [City, Country]
    - Size: [Small/Medium/Large]
    - Website: [Link]

  - **Impact Section**:
    - "Your impact" heading
    - **Impact Calculator** (interactive):
      - Slider or input: $5 - $100
      - Updates in real-time:
        - "$15 provides 3 meals for families in need"
        - "$50 plants 25 trees"
        - "$100 funds 1 week of tutoring for a child"
    - Impact examples specific to charity

  - **Transparency Section**:
    - "Where your money goes" pie chart:
      - X% Programs
      - Y% Fundraising
      - Z% Administration
    - Source: "Data from [Source]"
    - Rating: ⭐ 4.5/5 (from GuideStar, Charity Navigator)

  - **Community Section**:
    - "X MicroCommit users support this charity"
    - "Featured in Y goals"
    - Testimonials (if available): "This charity changed my life" - User

  - **Recent Impact** (optional):
    - News/updates from charity
    - Recent achievements
    - Photos of work

  - **Actions**:
    - "Select This Charity" button (primary, bottom)
    - "Learn More" link (opens charity website)
    - "Suggest Different Charity" link
    - Back arrow (top left)

**User Action**: Tap "Select This Charity"
**Next Screen**: Confirm Charity Selection (Step 4)

### Step 4: Confirm Charity Selection
**Screen**: Confirm Charity (Modal or Bottom Sheet)
- **Elements**:
  - Charity logo and name
  - Commitment amount: "$X"
  - Impact preview: "If you don't succeed, $X will go to [Charity Name]"
  - Impact description: "Your $X could [specific impact]"

  - **Checkbox** (if first-time user):
    - "I understand my commitment goes to charity if I don't succeed"

  - **Actions**:
    - "Confirm Charity" button (primary)
    - "Choose Different Charity" button (secondary)

**User Action**: Confirm charity
**Next Screen**: Return to Goal Creation (Step 6 complete)

### Step 5: Search & Filter
**Scenario**: User searches or filters charities

**Search Results** (as user types):
- Live results appear below search bar
- Highlights matching text
- Shows category badges
- "No results found" if no matches
  - Suggestion: "Try different keywords"
  - "Browse all charities" link

**Filter Results** (when category selected):
- List updates to show only charities in category
- Category chip shows active state (filled)
- Count: "X charities in [Category]"
- Clear filters button appears

**Multiple Filters**:
- Can select multiple categories (AND logic)
- Results show charities in any selected category
- Active filters bar: "Health, Education ✕"

**Next Screen**: Updated Charity List

### Step 6: Random Charity Selection
**Entry Point**: "Can't decide?" link

**Screen**: Random Charity Picker
- **Elements**:
  - "Let us pick for you!" heading
  - Fun animation: Slot machine style or shuffle cards
  - "Pick a Random Charity" button (large)

  - **Filters for Random** (optional):
    - "Only from categories I care about" toggle
    - Category multi-select

**User Action**: Tap "Pick a Random Charity"

**Animation**: 2-3 seconds of shuffling charities

**Result Screen**: Shows randomly selected charity
- **Elements**:
  - Charity logo and name
  - "How about this one?" heading
  - Brief description
  - Impact preview
  - **Actions**:
    - "Select This Charity" button (primary)
    - "Pick Another" button (rolls again)
    - "Browse All" link (back to list)

**User Action**: Select or re-roll
**Next Screen**: Confirm Charity (Step 4) or Roll Again

### Step 7: Favorite Charities
**Entry Point**: Profile Settings → "Favorite Charities"

**Screen**: My Favorite Charities
- **Elements**:
  - "Favorite charities" heading
  - List of favorited charities (cards)
  - Each card shows:
    - Logo, name, category
    - "Used in X goals"
    - Total donated: "$Y donated to this charity"
    - Remove from favorites (heart icon)

  - "Add More Favorites" button
  - Empty state (if no favorites):
    - "You haven't favorited any charities yet"
    - "Add your favorites for quick selection"
    - "Browse Charities" button

**User Actions**:
- Tap charity → View details
- Tap heart → Remove from favorites
- Add more → Charity Browser (with "Add to Favorites" button)

**Next Screen**: Depends on action

### Step 8: Charity Removed / Updated
**Scenario**: Charity is removed from platform or details change

**Trigger**: System detects charity no longer available or major change

**Notification**: "Action Required: Charity Update"
- Message: "[Charity Name] is no longer available on MicroCommit"
- "Select a new charity for your goal [Goal Name]"
- Tap notification → Charity Browser

**In-App**:
- Goal detail shows warning: "Charity update required"
- Cannot submit new check-ins until charity selected
- Existing progress preserved

**Flow**: User selects new charity → Update saved → Notification sent

## Success Criteria
- **Selection Time**: 90%+ of users select charity in <30 seconds
- **Abandonment Rate**: <5% abandon goal creation at charity selection
- **Charity Diversity**: No single charity gets >20% of selections
- **User Confidence**: 95%+ understand where money goes (survey)
- **Favorites Usage**: 60%+ of returning users select from favorites

## Error Handling

### No Charities Available
- **Cause**: Database error, API failure
- **UI**: "Charities temporarily unavailable"
- **Actions**:
  - "Try Again" button (reload)
  - "Continue Without Charity" (save as draft)
  - "Contact Support" link
- **Technical**: Alert dev team immediately

### Search Returns No Results
- **UI**: "No charities found for '[search term]'"
- **Suggestions**:
  - "Try different keywords"
  - "Browse all charities"
  - "Suggest a charity" link (form to suggest)

### Charity Details Load Failure
- **Cause**: API timeout, missing data
- **UI**: Show basic info (name, category) with error banner
- **Message**: "Some details couldn't load"
- **Actions**: "Try Again" button, "Select Anyway" button

### Image Load Failures
- **Charity Logo**: Show placeholder icon (generic charity symbol)
- **Impact Photos**: Hide section if images fail
- Don't block selection due to image errors

### Network Errors During Selection
- **UI**: "Connection lost. Changes saved locally."
- **Actions**:
  - Save selection locally (cached)
  - Retry in background when online
  - Show: "Charity selection will sync when online"

## Edge Cases

### User Selects Controversial Charity
- **Scenario**: Charity with low ratings or controversial stance
- **Warning Modal**: "This charity has a low rating (X/5)"
- **Info**: Brief explanation of concern
- **Actions**:
  - "Select Anyway" button
  - "Choose Different Charity" button
  - "Learn More" link (rating source)
- **Note**: Don't ban charities, just inform user

### Charity Becomes Unavailable Mid-Creation
- **Scenario**: User starts selecting charity, it's removed before confirmation
- **Handling**:
  - Detect during save
  - Show: "This charity is no longer available"
  - Auto-redirect to Charity Browser
  - Show: "Sorry! That charity was just removed. Please select another."

### User Changes Charity After Initial Selection
- **Within Goal Creation**: Allow unlimited changes (just update selection)
- **After Goal Created**: Not allowed (locked in)
  - Show: "Charity cannot be changed after commitment" (in Edit Goal flow)

### Multiple Goals with Different Charities
- **Scenario**: User creates multiple goals, can pick different charity each time
- **Handling**: Fully supported, each goal has independent charity
- **UI Enhancement**: Show charity variety in profile stats

### Charity Minimum Donation Amount
- **Scenario**: Some charities may have minimum donation requirements
- **Handling**:
  - If user's commitment < minimum: Gray out charity
  - Show: "Minimum commitment: $X" on card
  - Allow selection only if commitment >= minimum
  - Suggestion: "Increase commitment to select this charity"

### Charity Payment Processor Issue
- **Scenario**: Charity's bank account invalid or frozen
- **Detection**: Stripe payout fails
- **User Impact**: None during goal creation (hidden)
- **Technical**: Hold funds in escrow, resolve before payout
- **Fallback**: Select alternative charity from user's favorites (with notification)

### User Returns After Partial Selection
- **Scenario**: User exits app during charity selection
- **Handling**:
  - No charity saved (draft doesn't store partial selection)
  - Restart charity selection on return
  - Favorites/filters may be cached for convenience

### Charity Data Update Mid-View
- **Scenario**: User viewing details, charity info updated in background
- **Handling**:
  - Show updated data on next refresh
  - Don't interrupt user mid-view
  - If major change (charity removed): Show banner on next action

### International Charities
- **Currency Handling**:
  - Show impact in charity's local currency if relevant
  - Convert user's commitment to local currency for context
  - Example: "$15 USD = 1,200 INR = 20 meals"

### Charity Verification Status Change
- **Scenario**: Charity loses verification or gains it
- **Handling**:
  - Update badge in real-time
  - If loses verification: Show banner on detail view
  - "This charity's verification status changed. Review before selecting."

## Analytics Events
Track all charity selection behavior:
- `charity_selection_started` (entry_point, goal_id)
- `charity_search_performed` (search_term, results_count)
- `charity_filter_applied` (filter_type, filter_value)
- `charity_viewed` (charity_id, charity_name, view_duration)
- `charity_selected` (charity_id, charity_name, commitment_amount, selection_method)
- `charity_selection_cancelled` (stage, charities_viewed)
- `charity_favorited` (charity_id)
- `charity_unfavorited` (charity_id)
- `random_charity_picked` (charity_id, times_rolled)
- `charity_website_visited` (charity_id)
- `charity_shared` (charity_id, share_method)
- `charity_error` (error_type, charity_id)

## Future Enhancements (Post-MVP)
- Personalized recommendations: ML-based suggestions based on user interests
- Charity matching quiz: "Answer 5 questions to find your perfect charity"
- Monthly charity spotlights: Featured charity of the month
- Charity leaderboard: Most supported charities
- Impact visualization: Map showing global impact of all MicroCommit donations
- User-submitted charity reviews: Rate and review charities
- Charity comparison tool: Side-by-side compare 2-3 charities
- Impact stories: Read stories from charity beneficiaries
- Charity partnerships: Exclusive benefits for certain charities
- Charity challenges: Platform-wide events supporting specific charity
- Direct charity communication: Message charity (Q&A)
- Multi-charity split: Divide commitment across multiple charities
- Charity voting: Community votes on new charities to add
- Local charity discovery: Filter by location, support local orgs
- Corporate matching: Companies match MicroCommit donations
