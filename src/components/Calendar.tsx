import React, { useState } from 'react';
import '../styles/Calendar.css';
import {ArrowLeftCircleIcon,ArrowRightCircleIcon} from '@heroicons/react/24/solid';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonthMondayStart(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay(); 
  return (day + 6) % 7;
}

const Calendar: React.FC = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonthMondayStart(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-btn">
          <ArrowLeftCircleIcon className="nav-icon" />
        </button>
        <h2>
          {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button onClick={nextMonth} className="nav-btn">
          <ArrowRightCircleIcon className="nav-icon" />
        </button>
      </div>

      <div className="calendar-days">
        {DAYS.map((day) => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, idx) => {
          if (day === null) {
            return <div key={idx} className="calendar-cell empty"></div>;
          }

          const date = new Date(year, month, day);
          const dayOfWeek = date.getDay(); 

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          return (
            <div
              key={idx}
              className={`calendar-cell ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;