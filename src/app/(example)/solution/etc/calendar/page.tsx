'use client';

import {useCallback, useMemo, useState} from 'react';
import {getCalendarWeekList} from '@/utils/extend/date/calendar';
import styles from './page.module.scss';
import classNames from 'classnames';

// URL: http://localhost:3000/solution/etc/calendar
export default function Page() {
  const currentDate = new Date();
  const [current, setCurrent] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  });

  const next = useCallback(() => {
    setCurrent(prevState => {
      const nextMonth = prevState.month + 1;

      if (nextMonth === 13) {
        return {
          year: prevState.year + 1,
          month: 1
        };
      } else {
        return {
          year: prevState.year,
          month: nextMonth
        };
      }
    });
  }, []);

  const previous = useCallback(() => {
    setCurrent(prevState => {
      const previousMonth = prevState.month - 1;

      if (previousMonth === 0) {
        return {
          year: prevState.year - 1,
          month: 12
        };
      } else {
        return {
          year: prevState.year,
          month: previousMonth
        };
      }
    });
  }, []);

  const weekList = useMemo(() => getCalendarWeekList(current.year, current.month), [current]);

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.h1}>{current.year} / {current.month}</h1>
      <div className={styles.navigator}>
        <button onClick={previous}>Previous</button>
        <button onClick={next}>Next</button>
      </div>
      <table className={styles.table}>
        <thead>
        <tr>
          <td><span className={styles.calendarDate}>월요일</span></td>
          <td><span className={styles.calendarDate}>화요일</span></td>
          <td><span className={styles.calendarDate}>수요일</span></td>
          <td><span className={styles.calendarDate}>목요일</span></td>
          <td><span className={styles.calendarDate}>금요일</span></td>
          <td><span className={styles.calendarDate}>토요일</span></td>
          <td><span className={styles.calendarDate}>일요일</span></td>
        </tr>
        </thead>
        <tbody>
        {weekList.map((week, index) => (
          <tr key={index}>
            {week.map(date => (
              <td key={`${date.month}-${date.date}`}>
                <span className={classNames(styles.calendarDate, {[styles.notMatched]: !date.state.calendar.isMatchedMonth})}>
                  {date.date}
                </span>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
