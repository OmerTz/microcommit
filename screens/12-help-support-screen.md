# Help & Support Screen

## Overview
The Help & Support Screen provides users with self-service resources, FAQs, guides, contact options, and troubleshooting tools to resolve issues quickly and efficiently.

## Screen Purpose
- Answer common questions via FAQs
- Provide step-by-step guides and tutorials
- Enable users to contact support
- Offer troubleshooting tools
- Link to external resources (blog, community)
- Reduce support ticket volume through self-service

## Access
- **Entry Points**:
  - Settings → "Help Center"
  - Dashboard → "?" icon or Help button
  - Onboarding → "Need help?" link
  - Error screens → "Get help" button
  - Notification → Deep link to specific help article
- **Exit Points**:
  - Back button → Previous screen or Settings
  - Contact form submitted → Confirmation → Dashboard
  - Article read → Return to help list

---

## Layout Structure

### Header Section
**Elements**:
- Back button (top left)
- Title: "Help & Support"
- Search icon (top right) → Search help articles

---

### Search Bar
**Prominent Search Input**:
- Placeholder: "How can we help you?"
- Icon: Magnifying glass
- Full-width, at top
- Tap: Focus and show keyboard
- Auto-suggest: Show popular searches as user types

---

### Quick Help Section
**"Popular Topics" Cards** (Horizontal scroll):
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Getting     │ │ Check-ins   │ │ Payments &  │
│ Started     │ │ & Evidence  │ │ Refunds     │
└─────────────┘ └─────────────┘ └─────────────┘
```

**Cards**:
- Icon + title
- 2-column grid or horizontal scroll
- Tap: Navigate to topic category

---

### FAQ Section
**Heading**: "Frequently Asked Questions"

**Expandable FAQ Items**:
```
┌─────────────────────────────────────┐
│ How does MicroCommit work?       [▼]│
├─────────────────────────────────────┤
│ (Collapsed)                         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ What happens if I miss a check-in?[▲]│
├─────────────────────────────────────┤
│ If you miss a check-in, you'll     │
│ receive a warning. After 3 missed   │
│ check-ins, your goal fails and...  │
│                                     │
│ [Was this helpful? 👍 👎]          │
└─────────────────────────────────────┘
```

**FAQ Items** (10-15 questions):
1. How does MicroCommit work?
2. What happens if I miss a check-in?
3. How does AI verification work?
4. Can I pause my goal?
5. How do refunds work?
6. How do I add a referee?
7. What if my evidence is rejected?
8. Can I change my charity?
9. How do I delete my account?
10. Is my payment information secure?

**Interaction**:
- Tap question → Expand to show answer
- Tap again → Collapse
- Accordion-style (only 1 open at a time)
- "Was this helpful?" feedback buttons
- "Still need help?" link at bottom

---

### Help Categories Section
**Heading**: "Browse by Topic"

**Category List**:
1. **Getting Started** 🚀
   - Creating your first goal
   - Understanding commitments
   - Setting success criteria
   - Choosing a charity

2. **Check-ins & Evidence** 📷
   - Taking good evidence photos
   - AI verification explained
   - Manual check-ins
   - Late check-ins

3. **Payments & Refunds** 💳
   - How payments work
   - Refund timeline
   - Updating payment method
   - Charity donations

4. **Goals & Progress** 🎯
   - Editing goals
   - Pausing goals
   - Deleting goals
   - Tracking progress

5. **Account & Settings** ⚙️
   - Changing email/password
   - Notification settings
   - Privacy settings
   - Deleting account

6. **Referees & Social** 👥
   - Adding referees
   - Referee responsibilities
   - Privacy levels
   - Community features

7. **Troubleshooting** 🔧
   - App crashes or errors
   - Login issues
   - Payment problems
   - Notification issues

**Category Card Design**:
- Icon + title + arrow
- Tap: Navigate to subcategory list
- Show count: "12 articles"

---

### Contact Support Section
**Heading**: "Still need help?"

**Contact Options**:

1. **Email Support** →
   - Icon: Email
   - Label: "Email us"
   - Sublabel: "We reply within 24 hours"
   - Tap: Open contact form

2. **Live Chat** (Post-MVP) →
   - Icon: Chat bubble
   - Label: "Live chat"
   - Sublabel: "Available Mon-Fri 9am-5pm EST"
   - Badge: "Online" (green) or "Offline" (gray)
   - Tap: Open chat widget

3. **Community Forum** (Post-MVP) →
   - Icon: Forum
   - Label: "Community forum"
   - Sublabel: "Ask the community"
   - Tap: Open forum (in-app browser or external)

---

### Additional Resources Section
**Heading**: "More Resources"

**Links**:
1. **Video Tutorials** →
   - Icon: Play button
   - Label: "Video guides"
   - Tap: Open video library or YouTube

2. **Blog** →
   - Icon: Newspaper
   - Label: "MicroCommit blog"
   - Sublabel: "Tips and success stories"
   - Tap: Open blog (in-app browser)

3. **What's New** →
   - Icon: Sparkles
   - Label: "What's new"
   - Sublabel: "Latest features and updates"
   - Tap: Show release notes

---

### System Info Section (Footer)
**Diagnostic Info**:
- App version: "1.0.0 (Build 42)"
- Device: "iPhone 14 Pro, iOS 17.2"
- Last sync: "2 minutes ago"
- Server status: ● Online (green dot)

**Useful for Support**:
- Copy button: Copy all info to clipboard
- Include in support emails

---

## Interactions

### Search Help
**Flow**:
1. User taps search bar
2. Keyboard appears
3. User types query: "refund"
4. Auto-suggest shows:
   - "How do refunds work?"
   - "Refund timeline"
   - "Cancel and get refund"
5. Tap suggestion → Open article
6. Or press Enter → Show search results

### FAQ Expand/Collapse
**Flow**:
1. User taps FAQ question
2. Expand animation (300ms)
3. Show answer with formatting
4. Scroll into view if needed
5. Other FAQs collapse (accordion style)
6. Tap again → Collapse

### "Was this helpful?" Feedback
**Flow**:
1. User taps 👍 or 👎
2. Haptic feedback (light)
3. Show toast: "Thanks for your feedback!"
4. Log to analytics
5. If 👎: Prompt "Tell us more?" → Feedback form

### Contact Support Form
**Flow**:
1. User taps "Email us"
2. Navigate to contact form screen
3. Form fields:
   - Subject dropdown (preset categories)
   - Message (text area)
   - Attach screenshot (optional)
   - Include system info (checkbox, default ON)
4. Submit → API call → Confirmation screen
5. "We've received your message. Expect a reply within 24 hours."

### Navigate to Article
**Flow**:
1. User taps category or article
2. Navigate to article detail screen
3. Show article with:
   - Title
   - Last updated date
   - Body (markdown formatted)
   - Images/videos (if applicable)
   - Related articles
   - "Was this helpful?" feedback

---

## States & Loading

### Initial Load
- Show skeleton for FAQ items
- Fetch help content from API or local cache
- Populate when ready

### Search Loading
- Show loading spinner in search bar
- Fetch results from API
- Display results or "No results found"

### Empty Search Results
- "No results for '[query]'"
- Suggestions:
  - "Try different keywords"
  - "Browse categories below"
  - "Contact support"

### Offline Mode
- Show cached help articles (frequently accessed)
- Banner: "You're offline. Some content may be unavailable."
- Contact form disabled: "Connect to send message"

---

## Visual Design

### Color Palette
- **Background**: Light gray (#F9FAFB)
- **Cards**: White with shadow
- **Primary**: Teal (#2DD4BF) for links and icons
- **Text Primary**: Dark gray (#1F2937)
- **Text Secondary**: Medium gray (#6B7280)
- **Success**: Green (#22C55E) for 👍
- **Error**: Red (#EF4444) for 👎

### Typography
- **Title**: Inter Bold, 28px
- **Section Headings**: Inter Semibold, 18px
- **FAQ Questions**: Inter Semibold, 16px
- **FAQ Answers**: Inter Regular, 14px
- **Body Text**: Inter Regular, 14px
- **Links**: Inter Medium, 14px, underlined

### Layout
- Screen padding: 16px
- Section spacing: 24px
- FAQ item padding: 16px
- Spacing between items: 12px

---

## Data Requirements

### Help Article Structure
```json
{
  "id": "article_001",
  "title": "How does MicroCommit work?",
  "slug": "how-it-works",
  "category": "getting_started",
  "body": "Markdown content...",
  "updated_at": "2024-03-15",
  "helpful_count": 245,
  "unhelpful_count": 12,
  "related_articles": ["article_002", "article_003"]
}
```

### API Endpoints
- **GET /api/help/articles**: List all articles (with pagination)
- **GET /api/help/articles/:id**: Get article details
- **GET /api/help/search?q=refund**: Search articles
- **POST /api/support/tickets**: Submit support request
- **POST /api/help/feedback**: Submit "helpful" feedback

---

## Analytics Events
- `help_screen_viewed` (entry_source)
- `help_searched` (search_query)
- `help_category_tapped` (category_name)
- `help_article_viewed` (article_id, article_title)
- `help_feedback_submitted` (article_id, helpful: boolean)
- `contact_support_tapped` (method: email/chat)
- `support_ticket_submitted` (category, has_screenshot)
- `help_external_link_opened` (link: blog/forum/video)

---

## Accessibility
- Screen reader: "Help and support. Search for help."
- Search bar: "Search help articles. Text field."
- FAQ items: "Question. Collapsed. Double-tap to expand."
- Feedback buttons: "Was this helpful? Yes button. No button."
- Touch targets: Minimum 44x44px

---

## Future Enhancements
- AI chatbot assistant (answer questions conversationally)
- In-app guided tours (interactive walkthroughs)
- Screen recording for bug reports
- Community-contributed tips
- Multi-language support
- Voice search
- Personalized help suggestions based on user behavior
- Suggested articles based on recent errors
- Help widget (floating button on any screen)
