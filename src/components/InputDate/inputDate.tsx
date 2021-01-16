import React, { InputHTMLAttributes, useRef, useState } from 'react'
import { useClickOutside2 } from '../../hooks/useClickOutside';
import { Icon } from '../icon';
import { Input } from '../Input'
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
function dateFormat(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1,                 //月份 
    "d+": date.getDate(),                    //日 
    "h+": date.getHours(),                   //小时 
    "m+": date.getMinutes(),                 //分 
    "s+": date.getSeconds(),                 //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
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
  function handleChange(e) {
    // setDate(e.target.value);
  }
  const dates = getDays(date);
  const yearMonthStr = dateFormat(date, 'yyyy年MM月');
  function nextMonth() {
    let newDate = new Date(date.getTime());
    newDate.setMonth((date.getMonth() +  1) % 12);
    console.log(newDate);
    setDate(newDate);
  }
  function preMonth() {
    let newDate = new Date(date.getTime());
    newDate.setMonth((date.getMonth() - 1) % 12);
    console.log(newDate);
    setDate(newDate);
  }
  function nextYear() {
    let newDate = new Date(date.getTime());
    newDate.setFullYear((date.getFullYear() + 1));
    console.log(newDate);
    setDate(newDate);
  }
  function preYear() {
    let newDate = new Date(date.getTime());
    newDate.setFullYear((date.getFullYear() - 1));
    setDate(newDate);
  }
  function handleClick(num) {
    let nextDate = new Date(date.getTime());
    nextDate.setDate(num);
    setDate(nextDate);
  }
  return (
    <Input {...restprops} value={dateFormat(date, 'yyyy年MM月dd日')}
      onChange={handleChange} inputRef={inputRef}
      onFocus={() => setShow(true)}
    >
      <Icon className="calendar-icon" icon="calendar"></Icon>
      {show ?
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
                  {week.map(date => {
                    let clz = classnames({
                      invalid: !date.valid,
                      today: date.today
                    });
                    return <td className={clz} onClick={() => date.valid && handleClick(date.num)}>{date.num}</td>
                  })}
                </tr>
              )
            })}
          </table>
          <div className="calendar-botton"
           onClick={() => setDate(new Date())}
          >今天</div>
        </div> :
        null
      }
    </Input>
  )
}