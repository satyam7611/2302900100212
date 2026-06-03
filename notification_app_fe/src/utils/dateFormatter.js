// Format raw timestamp to relative time (e.g. "5m ago")
export const formatRelativeTime = (timestampStr) => {
  if (!timestampStr) return '';
  
  const formattedStr = timestampStr.trim().replace(' ', 'T');
  const date = new Date(formattedStr);
  
  if (isNaN(date.getTime())) {
    return timestampStr;
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  if (diffMs < 0) {
    return 'just now';
  }

  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
};

// Format raw timestamp to local standard date-time string
export const formatAbsoluteTime = (timestampStr) => {
  if (!timestampStr) return '';
  const formattedStr = timestampStr.trim().replace(' ', 'T');
  const date = new Date(formattedStr);
  if (isNaN(date.getTime())) return timestampStr;
  return date.toLocaleString();
};
