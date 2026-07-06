// src/data/dummyNotifications.js
// Dummy notifications for the Notifications page.
// Add or update these as real backend data arrives.

export const dummyNotifications = [
  {
    id: 1,
    type: 'review',
    tab: 'all',
    text: 'Project permit review completed for Barangay 14.',
    time: 'Just now',
    unread: true,
  },
  {
    id: 2,
    type: 'approval',
    tab: 'approval',
    text: 'Your new program request has been approved.',
    time: '15 min ago',
    unread: true,
  },
  {
    id: 3,
    type: 'budget',
    tab: 'all',
    text: 'Budget allocation for family support has been updated.',
    time: '1 hr ago',
    unread: false,
  },
  {
    id: 4,
    type: 'warning',
    tab: 'system',
    text: 'System maintenance scheduled tonight at 11:00 PM.',
    time: '2 hrs ago',
    unread: false,
  },
  {
    id: 5,
    type: 'pending',
    tab: 'all',
    text: 'A community intake form is pending your review.',
    time: '4 hrs ago',
    unread: true,
  },
  {
    id: 6,
    type: 'activity',
    tab: 'system',
    text: 'New login from a recognized device.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 7,
    type: 'approval',
    tab: 'approval',
    text: 'Voucher request #271 was approved by the team lead.',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 8,
    type: 'review',
    tab: 'all',
    text: 'Client intake data review is ready for your approval.',
    time: '2 days ago',
    unread: false,
  },
]
