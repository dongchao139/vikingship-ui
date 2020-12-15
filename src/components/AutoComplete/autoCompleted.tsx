import React, {ReactElement, KeyboardEvent, useRef, useState, useEffect} from "react";
import {Input, InputProps} from "../Input/input";
import {from} from "rxjs";
import Axios, {AxiosResponse} from "axios";
import {debounceTime, filter, map, switchAll, tap} from "rxjs/operators";
import {Icon} from "../icon/icon";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import {useEventCallback} from "rxjs-hooks";
import useSubject from '../../hooks/useSubject';

interface DataSource {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSource;

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
  dataArr: DataSourceType[];
  searchFunc: (keyword: string, item: DataSourceType) => boolean;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
  fetchUrl?: string;
}

export const AutoCompleted: React.FC<AutoCompleteProps> = (
  {
    dataArr,fetchUrl, searchFunc,onSelect, value,
    renderOption, ...restProps
  }
) => {
  const [dataFiltered, setDataFiltered] = useState<DataSourceType[]>([]);
  const [inputValue, changeInputValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [highLight, setHighLightIndex] = useState(-1);
  const componentRef = useRef<HTMLDivElement>(null);
  //参考: https://github.com/LeetCode-OpenSource/rxjs-hooks
  const [onChangeCallback] = useEventCallback(event$ => {
    event$.pipe(
      filter((text: string) => text.trim().length === 0),
      debounceTime(150),
    ).subscribe(() => {
      setDataFiltered([])
    });
    return event$.pipe(
      filter((text: string) => text.trim().length > 0),
      debounceTime(150),
      tap(() => setLoading(true)),
      map((keyword: string) => {
        if (fetchUrl) {
          return from(
            Axios.get('http://localhost:3000/' + fetchUrl)
              .then((response: AxiosResponse<DataSourceType<{number: number}>[]>) => response.data)
              .then(dataArr => dataArr.filter(data => searchFunc(keyword, data)))
          )
        }
        return from(
          [dataArr.filter(data => searchFunc(keyword, data))]
        )
      }),
      switchAll(),
      map((results: DataSourceType<{number: number}>[]) => {
        setDataFiltered(results);
        setLoading(false)
      })
    );
  });
  const {handler,subject$} = useSubject(sub$ => {
    sub$.pipe(
      filter((text: string) => text.trim().length > 0),
      debounceTime(1000),
    ).subscribe((v) => {
      // console.log(v);
    });
  });
  // 只能订阅一次，不能每次渲染都订阅一次
  useEffect(() => {
    subject$.subscribe((val)=>{
      console.log(val);
    });
  }, []);
  
  const $subject = useClickOutside(componentRef);
  $subject.subscribe(e =>{
    setDataFiltered([]);
  });
  function handleInput(e) {
    onChangeCallback(e.target.value);
    handler(e.target.value);
    changeInputValue(e.target.value);
    setHighLightIndex(-1);
  }

  const handleSelect = (data: DataSourceType) => {
    if (!data) {
      return;
    }
    changeInputValue(data.value);
    setDataFiltered([]);
    if (onSelect) {
      onSelect(data);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    switch(e.keyCode) {
      case 13:
        handleSelect(dataFiltered[highLight]);
        break;
      case 38:
        highlight(highLight - 1);
        break;
      case 40:
        highlight(highLight + 1);
        break;
      case 27:
        setDataFiltered([]);
        break;
      default:
        break;
    }
  }

  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= dataFiltered.length) {
      index = dataFiltered.length - 1;
    }
    setHighLightIndex(index);
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }

  return (
    <div ref={componentRef}>
      <Input value={inputValue} {...restProps}
             onKeyDown={handleKeyDown}
             onChange={handleInput}/>
      {loading && <ul><Icon icon="spinner" spin/></ul>}
      <ul>
        {dataFiltered.map((data, index) => {
          const classes = classNames('suggestion-item',{
            'item-highlight': index === highLight
          });
          return (
            <li onClick={(e) => handleSelect(data)} className={classes} key={data.value}>
              {renderTemplate(data)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}