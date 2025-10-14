export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  return date.toLocaleDateString('en-GB', options);
}