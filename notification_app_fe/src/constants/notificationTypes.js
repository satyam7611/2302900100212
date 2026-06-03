export const NOTIFICATION_TYPES = {
  PLACEMENT: 'Placement',
  RESULT: 'Result',
  EVENT: 'Event',
};

export const TYPE_WEIGHTS = {
  [NOTIFICATION_TYPES.PLACEMENT]: 3,
  [NOTIFICATION_TYPES.RESULT]: 2,
  [NOTIFICATION_TYPES.EVENT]: 1,
};

export const TYPE_COLORS = {
  [NOTIFICATION_TYPES.PLACEMENT]: {
    main: '#d32f2f', // Red / Crimson for placements
    light: '#ffebee',
    text: '#c62828',
  },
  [NOTIFICATION_TYPES.RESULT]: {
    main: '#1976d2', // Blue for results
    light: '#e3f2fd',
    text: '#1565c0',
  },
  [NOTIFICATION_TYPES.EVENT]: {
    main: '#2e7d32', // Green for events
    light: '#e8f5e9',
    text: '#1b5e20',
  },
};
