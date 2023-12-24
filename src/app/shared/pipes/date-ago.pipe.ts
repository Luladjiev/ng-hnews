import { Pipe, PipeTransform } from '@angular/core';

const intervals = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
} as const;

@Pipe({
  name: 'dateAgo',
  standalone: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: string): unknown {
    if (value) {
      const seconds = Math.floor(
        (new Date().getTime() - new Date(value).getTime()) / 1000
      );
      if (seconds < 29) {
        return 'Just now';
      }

      const keys = Object.keys(intervals) as Array<keyof typeof intervals>;

      const counter = keys.find((key) => {
        return (
          key in intervals &&
          Object.hasOwn(intervals, key) &&
          seconds > intervals[key]
        );
      });

      if (counter) {
        const interval = Math.floor(seconds / intervals[counter]);

        return interval === 1
          ? `${interval} ${counter} ago`
          : `${interval} ${counter}s ago`;
      }
    }

    return value;
  }
}
