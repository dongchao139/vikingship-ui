import React, {ReactElement, KeyboardEvent, useRef, useState, useEffect, useMemo, useCallback} from "react";
import {Input, InputProps} from "../Input/input";
import {from} from "rxjs";
import Axios, {AxiosResponse} from "axios";
import {debounceTime, filter, map, switchAll, tap} from "rxjs/operators";
import {Icon} from "../icon";
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
  // useEffect当组件更新完成之后才执行，而useMemo则在更新前执行。
  useEffect(() => {
    subject$.subscribe((val) => {
      console.log(val);
    });
  }, [subject$]);
  // 只有依赖的状态发生变化时，才会重新计算。否则直接用缓存的值.
  // 类似于 "计算属性"
  const age = useMemo(() => {
    return '>18成年'
  }, []);

  const $subject = useClickOutside(componentRef);
  $subject.subscribe(e => {
    setDataFiltered([]);
  });
  function handleInput(e) {
    onChangeCallback(e.target.value);
    handler(e.target.value);
    changeInputValue(e.target.value);
    setHighLightIndex(-1);
  }

  // useState返回的setXxx函数在每次渲染中都是相同的.下面的set.size始终是1
  const esSet = useRef(new Set());
  esSet.current.add(changeInputValue);
  console.log(esSet.current.size);

  // useCallback 计算结果是函数, 主要用于缓存函数
  const handleSelect = useCallback((data: DataSourceType) => {
    if (!data) {
      return;
    }
    changeInputValue(data.value);
    setDataFiltered([]);
    if (onSelect) {
      onSelect(data);
    }
    // changeInputValue和setDataFiltered是setXxx返回的函数,始终不变.
    // 因此这里不用添加为deps
  }, [onSelect]);

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
      {age}
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