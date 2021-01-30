import React, { InputHTMLAttributes, useRef, useState } from 'react'
import { useClickOutside2 } from '../../hooks/useClickOutside';
import { Icon } from '../icon';
import { Input } from '../Input'
import { Transition } from '../Transition';
import classnames from 'classnames';


export interface InputTimeProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**
     * type
     */
    type: 'time' | 'time-range';
    /**
     * size
     */
    size?: 'df' | 'lg' | 'sm';
}
function formateNumber(num: number) {
    if (num < 10) {
      return '0' + (num);
    }
    return '' + (num);
  }
function simpleTimeFormate(date: Date) {
    return formateNumber(date.getHours()) + ":" + formateNumber(date.getMinutes()) + ":" + formateNumber(date.getSeconds());
}
function parseTime(timeStr: string): Date {
    var arr = timeStr.split(":");
    const time = new Date();
    time.setHours(parseInt(arr[0]));
    time.setMinutes(parseInt(arr[1]));
    time.setSeconds(parseInt(arr[2]));
    return time;
}
const hours = ['00','01','02','03','04','05','06','07','08','09',
'10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
const miniutes: string[] = [];
for(let i=0;i<60;i++) {
    miniutes.push(formateNumber(i));
}
const reg = /\d{2}:\d{2}:\d{2}/;
export const InputTime: React.FC<InputTimeProps> = ({
    ...restprops
}) => {
    const [time, setTime] = useState<Date>(new Date());
    const [value, setValue] = useState<string>(simpleTimeFormate(new Date()));
    const [show, setShow] = useState<boolean>(false);
    const ref = useRef();
    const inputRef = useRef<HTMLElement>();
    useClickOutside2(ref, inputRef, () => {
      setShow(false);
    });
    function handleChange(e) {
        setValue(e.target.value);
    }
    function handleHour(h: string) {
        const newTime = new Date(time.getTime());
        newTime.setHours(parseInt(h));
        setTime(newTime);
        let newValue = null;
        if (value) {
            newValue = h + value.substring(2);
        } else {
            newValue = h + ":00:00";
        }
        setValue(newValue);
    }
    function handleMinute(m: string) {
        const newTime = new Date(time.getTime());
        newTime.setMinutes(parseInt(m));
        setTime(newTime);
        let newValue = null;
        if (value) {
            newValue =  value.substr(0,3) + m + value.substr(5,3);
        } else {
            newValue = "00:" + m + ":00";
        }
        setValue(newValue);
    }
    function handleSecond(s: string) {
        const newTime = new Date(time.getTime());
        newTime.setSeconds(parseInt(s));
        setTime(newTime);
        let newValue = null;
        if (value) {
            newValue = value.substr(0,6) + s;
        } else {
            newValue = "00:00:" + s;
        }
        setValue(newValue);
    }
    function handleBlur(e) {
        const value = e.target.value;
        console.log(value);
        if (reg.test(value)) {
          setTime(parseTime(value));
        } else {
            setValue(simpleTimeFormate(time));
        }
      }
      function handleNow() {
          setTime(new Date());
          setValue(simpleTimeFormate(new Date()));
      }
    return (
        <Input {...restprops} value={value} 
          onChange={handleChange} inputRef={inputRef}
          onFocus={() => setShow(true)}
          onBlur={handleBlur}
        >
          <Icon className="calendar-icon" icon="clock"></Icon>
          <Transition in={show} animation="zoom-in-top" timeout={250} wrapper={false}
          >
              <div className='calendar' ref={ref}>
                <div className='list list-hour'>
                    {hours.map(h => {
                        const cls = classnames('item', {
                            'now': parseInt(h) === time.getHours()
                        });
                        return <div className={cls} onClick={() => handleHour(h)}>{h}</div>
                    })}
                </div>
                <div className='list list-bordered'>
                    {miniutes.map(m => {
                        const cls = classnames('item', {
                            'now': parseInt(m) === time.getMinutes()
                        });
                        return <div className={cls} onClick={() => handleMinute(m)}>{m}</div>
                    })}
                </div>
                <div className='list'>
                    {miniutes.map(s => {
                        const cls = classnames('item', {
                            'now': parseInt(s) === time.getSeconds()
                        });
                        return <div className={cls} onClick={() => handleSecond(s)}>{s}</div>
                    })}
                </div>
                <div className="calendar-footer">
                  <span onClick={handleNow}>此刻</span>
                  <span className="confirm">确 定</span>
                </div>
              </div>
          </Transition>
        </Input>
    )
}