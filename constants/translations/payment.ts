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
    }
  }
};
