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
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
const hours = ['00','01','02','03','04','05','06','07','08','09',
'10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
const miniutes: string[] = [];
for(let i=0;i<60;i++) {
    miniutes.push(formateNumber(i));
}
export const InputTime: React.FC<InputTimeProps> = ({
    ...restprops
}) => {
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
    return (
        <Input {...restprops} value={value} 
          onChange={handleChange} inputRef={inputRef}
          onFocus={() => setShow(true)}
        >
          <Icon className="calendar-icon" icon="clock"></Icon>
          <Transition in={show} animation="zoom-in-top" timeout={250} wrapper={false}
          >
              <div className='calendar' ref={ref}>
                <div className='list list-hour'>
                    {hours.map(h => {
                        return <div className="item">{h}</div>
                    })}
                </div>
                <div className='list list-bordered'>
                    {miniutes.map(m => {
                        return <div className="item">{m}</div>
                    })}
                </div>
                <div className='list'>
                    {miniutes.map(m => {
                        return <div className="item">{m}</div>
                    })}
                </div>
                <div className="calendar-footer">
                  此刻
                  <a className="confirm">确 定</a>
                </div>
              </div>
          </Transition>
        </Input>
    )
}