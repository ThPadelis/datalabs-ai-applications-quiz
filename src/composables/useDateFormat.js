import { parseISO, format as formatDateFn, isValid } from 'date-fns';

export default function useDateFormat() {
  /**
   * Formats an ISO date string or Date into the requested format.
   * Returns '-' when value is falsy, equals '-' or cannot be parsed.
   * Default output format matches requested display: dd-MM-yyyy (date-fns token for year is lowercase)
   */
  function formatDate(value, outputFormat = 'dd-MM-yyyy') {
    if (!value || value === '-') return '-';

    try {
      const date = typeof value === 'string' ? parseISO(value) : new Date(value);
      if (!isValid(date)) return '-';
      return formatDateFn(date, outputFormat);
    } catch (e) {
      return '-';
    }
  }

  return { formatDate };
}
