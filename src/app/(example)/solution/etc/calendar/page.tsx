'use client';

import {useCallback, useMemo, useState} from 'react';
import {getCalendarNavigation, getCalendarWeekList} from '@forworkchoe/core/utils';
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
      const {nextCalendar} = getCalendarNavigation(prevState.year, prevState.month);

      return {
        year: nextCalendar.year,
        month: nextCalendar.month
      };
    });
  }, []);

  const previous = useCallback(() => {
    setCurrent(prevState => {
      const {previousCalendar} = getCalendarNavigation(prevState.year, prevState.month);

      return {
        year: previousCalendar.year,
        month: previousCalendar.month
      };
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
                <span className={classNames(styles.calendarDate, {[styles.notMatched]: !date.state.calendar.isMatchedMonth}, {[styles.isToday]: date.state.current.isToday})}>
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
