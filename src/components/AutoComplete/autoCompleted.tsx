import React, {ReactElement, KeyboardEvent, useEffect, useRef, useState} from "react";
import {Input, InputProps} from "../Input/input";
import {from, Subject} from "rxjs";
import Axios, {AxiosResponse} from "axios";
import {debounceTime, filter, map, switchAll, tap} from "rxjs/operators";
import Icon from "../icon/icon";
import classNames from "classnames";

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
  const ref = useRef<Subject<string>>();

  const [dataFiltered, setDataFiltered] = useState<DataSourceType[]>([]);
  const [inputValue, changeInputValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [highLight, setHighLightIndex] = useState(-1);

  function handleInput(e) {
    changeInputValue(e.target.value);
    setHighLightIndex(-1);
    ref.current.next(e.target.value);
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


  useEffect(() => {
    ref.current = new Subject<string>();

    ref.current.pipe(
      filter((text: string) => text.trim().length === 0),
      debounceTime(150),
    ).subscribe(() => {
      setDataFiltered([])
    });

    ref.current.pipe(
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
    ).subscribe((results: DataSourceType<{number: number}>[]) => {
      setDataFiltered(results);
      setLoading(false)
    }, (err: any) => {
      console.error(err);
    });
  }, [dataArr, fetchUrl, searchFunc]);


  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item;
  }

  return (
    <>
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
    </>
  )
}