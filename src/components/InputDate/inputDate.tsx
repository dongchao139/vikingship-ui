import React, { InputHTMLAttributes, useRef, useState } from 'react'
import { useClickOutside2 } from '../../hooks/useClickOutside';
import { Icon } from '../icon';
import { Input } from '../Input'
import { Transition } from '../Transition';
import classnames from 'classnames';

export interface InputDateProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**
   * type
   */
  type: 'date' | 'date-range';
  /**
   * size
   */
  size?: 'df' | 'lg' | 'sm';
}
const reg = /\d{4}-\d{2}-\d{2}/;
const CalendarMap = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31
}
function getDays(date: Date): Array<Array<{num: number, valid: boolean,today?:boolean}>>{
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  let flag = date.getFullYear() === year && date.getMonth() === month;

  const daysArr: Array<{num: number, valid: boolean,today?: boolean}> = [];
  const firstDayOfMonth = new Date(date.getTime());
  firstDayOfMonth.setDate(1);
  const daysOfMonth = CalendarMap[firstDayOfMonth.getMonth()];
  for (let i = 0; i < daysOfMonth; i++) {
    let item = {
      num: i + 1,
      valid: true,
      today: null
    };
    if (flag && item.num === now.getDate()) {
      item.today = true;
    }
    daysArr.push(item);
  }
  const dayOfWeek = firstDayOfMonth.getDay();
  let preMonth = firstDayOfMonth.getMonth() - 1;
  if (preMonth < 0) {
    preMonth += 12;
  }
  let daysOfBeforMonth: number = CalendarMap[preMonth]
  for (let i = 0; i < dayOfWeek; i++) {
    daysArr.unshift({
      num: daysOfBeforMonth,
      valid: false
    });
    daysOfBeforMonth--;
  }

  let reside = 7 - daysArr.length % 7;
  for (let i = 0; i < reside; i++) {
    daysArr.push({
      num: i + 1,
      valid: false
    });
  }
  let rowNum = daysArr.length / 7;
  let result: Array<Array<{num: number, valid: boolean}>> = [];
  for (let i = 0; i < rowNum; i++) {
    result.push(daysArr.slice(i * 7, (i + 1) * 7));
  }
  return result;
}
function getFullMonth(month: number) {
  if (month < 9) {
    return '0' + (month + 1);
  }
  return '' + (month + 1);
}
function simpleMonthFormate(date: Date) {
  return date.getFullYear() + '年' + (getFullMonth(date.getMonth())) +  '月'
}
function simpleDateFormate(date: Date) {
  return date.getFullYear() + '-' + (getFullMonth(date.getMonth())) + '-' + date.getDate();
}
function dateParse(dateStr): Date | null {
  var dateArr = dateStr.split('-');
  var year = parseInt(dateArr[0]);
  var month = parseInt(dateArr[1]);
  var day = parseInt(dateArr[2]);
  var date = new Date(year,month -1, day);
  return date;
}
export const InputDate: React.FC<InputDateProps> = ({
  ...restprops
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef();
  const inputRef = useRef<HTMLElement>();
  useClickOutside2(ref, inputRef, () => {
    setShow(false);
  });
  const [value, setValue] = useState<string>(simpleDateFormate(new Date()));
  function handleChange(e) {
    setValue(e.target.value);
    if (reg.test(e.target.value)) {
      const val = dateParse(e.target.value);
      val && setDate(val);
    }
  }
  function handleBlur() {
    if (!reg.test(value)) {
      setValue(simpleDateFormate(date));
    }
  }
  const dates = getDays(date);
  const yearMonthStr = simpleMonthFormate(date);
  function nextMonth() {
    let newDate = new Date(date.getTime());
    newDate.setMonth((date.getMonth() +  1));
    setDate(newDate);
    setValue(simpleDateFormate(newDate));
  }
  function preMonth() {
    let newDate = new Date(date.getTime());
    newDate.setMonth((date.getMonth() - 1));
    setDate(newDate);
    setValue(simpleDateFormate(newDate));
  }
  function nextYear() {
    let newDate = new Date(date.getTime());
    newDate.setFullYear((date.getFullYear() + 1));
    setDate(newDate);
    setValue(simpleDateFormate(newDate));
  }
  function preYear() {
    let newDate = new Date(date.getTime());
    newDate.setFullYear((date.getFullYear() - 1));
    setDate(newDate);
    setValue(simpleDateFormate(newDate));
  }
  function handleClick(num) {
    let nextDate = new Date(date.getTime());
    nextDate.setDate(num);
    setDate(nextDate);
    setValue(simpleDateFormate(nextDate));
  }
  return (
    <Input {...restprops} value={value}
      onChange={handleChange} inputRef={inputRef}
      onFocus={() => setShow(true)}
      onBlur={handleBlur}
    >
      <Icon className="calendar-icon" icon="calendar"></Icon>
      <Transition in={show} animation="zoom-in-top" timeout={250} wrapper={false}>
        <div className='calendar' ref={ref}>
          <div className='calendar-title'>
            <Icon className='angle-double-left' icon='angle-double-left'
              onClick={preYear}
            ></Icon>
            <Icon className='angle-left' icon='angle-left'
              onClick={preMonth}
            ></Icon>
            <span className='calendar-month'>{yearMonthStr}</span>
            <Icon className='angle-right' icon='angle-right'
              onClick={nextMonth}
            ></Icon>
            <Icon className='angle-double-right' icon='angle-double-right'
              onClick={nextYear}
            ></Icon>
          </div>
          <table>
            <tr>
              <th>日</th>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
            </tr>
            {dates.map(week => {
              return (
                <tr>
                  {week.map(d => {
                    let clz = classnames({
                      invalid: !d.valid,
                      today: d.today,
                      current: d.valid && d.num === date.getDate()
                    });
                    return (
                    <td className={clz} onClick={() => d.valid && handleClick(d.num)}>
                      {d.num}
                    </td>
                    )
                  })}
                </tr>
              )
            })}
          </table>
          <div className="calendar-botton"
           onClick={() => setDate(new Date())}
          >今天</div>
        </div>
      </Transition>
    </Input>
  )
}