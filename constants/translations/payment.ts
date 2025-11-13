// Payment translations
export const paymentTranslations = {
  payment: {
    failed: {
      title: 'Payment couldn\'t be processed',
      insufficient_funds: 'Your card doesn\'t have enough funds for this commitment (${{amount}})',
      card_declined: 'Your card was declined. Please try a different payment method.',
      invalid_details: 'Card details appear to be incorrect. Please check and try again.',
      expired_card: 'This card has expired. Please use a different card.',
      '3ds_required': 'Your bank requires additional authentication.',
      network_error: 'Connection issue. Please check your internet and try again.',
      unknown: 'Something went wrong. Please try again or contact support.',
      reassurance: 'Your goal hasn\'t been created yet. You can try again or use a different payment method.',
      noCharges: 'No charges have been made.',
      errorMessages: {
        insufficient_funds: 'Your card doesn\'t have enough funds for this commitment',
        card_declined: 'Your card was declined. Please try a different payment method.',
        invalid_card_details: 'Card details appear to be incorrect. Please check and try again.',
        expired_card: 'This card has expired. Please use a different card.',
        requires_3ds: 'Your bank requires additional authentication.',
        network_error: 'Connection issue. Please check your internet and try again.',
        unknown_error: 'Something went wrong. Please try again or contact support.'
      },
      suggestedActions: {
        insufficient_funds: 'Add funds to your card or try a different card',
        card_declined: 'Contact your bank or try a different card',
        invalid_card_details: 'Check your card details and try again',
        expired_card: 'Use a card that has not expired',
        requires_3ds: 'Complete authentication with your bank',
        network_error: 'Check your internet connection and try again'
      },
      buttons: {
        tryAgain: 'Try Again',
        differentCard: 'Use Different Card',
        help: 'Need Help?',
        cancel: 'Cancel Goal'
      },
      goalSummary: {
        title: 'Goal Summary',
        commitment: 'Commitment',
        charity: 'Charity'
      },
      fallbacks: {
        goalName: 'Your goal',
        commitmentAmount: '0',
        charityName: 'Selected charity'
      },
      errors: {
        navigationError: 'Navigation Error',
        navigationFailed: 'Failed to go back. Please try again.',
        navigateToCardFailed: 'Failed to navigate. Please try again.',
        helpLinkError: 'Error',
        helpLinkFailed: 'Failed to open help page. Please try again later.',
        cancelGoalTitle: 'Cancel Goal',
        cancelGoalMessage: 'Are you sure you want to cancel creating this goal?',
        cancelGoalKeep: 'No, Keep It',
        cancelGoalConfirm: 'Yes, Cancel',
        cancelGoalFailed: 'Failed to cancel goal. Please try again.'
      }
    },
    processing: {
      title: 'Processing payment...',
      subtitle: 'This may take a moment',
      securely: 'Securely processing payment...'
    },
    success: {
      title: 'Payment successful!',
      subtitle: 'Your goal is now active!',
      viewGoal: 'View My Goal',
      done: 'Done'
    },
    retry: {
      button: 'Retry Payment',
      processing: 'Processing payment...',
      processingWithCard: 'Processing payment with card ending {{last4}}...',
      success: {
        title: 'Payment Successful!',
        message: 'Your payment has been processed successfully.',
        action: 'Continue'
      },
      sameError: {
        title: 'Same Issue Detected',
        message: 'We encountered the same issue. Please try a different payment method.',
        action: 'Use Different Card'
      },
      differentError: {
        title: 'New Issue Detected',
        message: 'A different issue occurred. Please review the error details.',
        action: 'Try Again'
      },
      timeout: {
        title: 'Processing Taking Longer',
        message: 'Your payment is still being processed. You can continue in the background or wait.',
        actionContinue: 'Continue in Background',
        actionWait: 'Keep Waiting'
      },
      maxAttempts: {
        title: 'Maximum Attempts Reached',
        message: 'You\'ve reached the maximum retry attempts (3). Please use a different payment method.',
        action: 'Use Different Card'
      },
      errors: {
        duplicate_retry: 'A retry is already in progress',
        max_attempts_reached: 'Maximum retry attempts reached',
        timeout: 'Payment processing timeout',
        requires_3ds: 'Additional authentication required',
        unknown_error: 'An unexpected error occurred',
        platform_not_supported: 'Payment retry is not supported on web platform',
        stripe_sdk_unavailable: 'Stripe SDK is not available',
        stripe_key_not_configured: 'STRIPE_SECRET_KEY is not configured'
      },
      action: {
        ok: 'OK'
      },
      attemptNumber: 'Retry attempt {{number}} of 3',
      disabled: 'Please wait before retrying',
      authenticating: 'Completing authentication...'
    }
  }
};
