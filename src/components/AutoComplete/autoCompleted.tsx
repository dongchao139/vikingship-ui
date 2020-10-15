import React, {ReactElement, useEffect, useRef, useState} from "react";
import {Input, InputProps} from "../Input/input";
import {from, Subject} from "rxjs";
import Axios, {AxiosResponse} from "axios";
import {debounceTime, filter, map, switchAll, tap} from "rxjs/operators";
import Icon from "../icon/icon";

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

  function handleInput(e) {
    changeInputValue(e.target.value);
    ref.current.next(e.target.value);
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

  const handleSelect = (data: DataSourceType) => {
    changeInputValue(data.value);
    setDataFiltered([]);
    if (onSelect) {
      onSelect(data);
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item;
  }
  return (
    <>
      <Input value={inputValue} {...restProps} onChange={handleInput}/>
      {loading && <ul><Icon icon="spinner" spin/></ul>}
      <ul>
        {dataFiltered.map(data => {
          return (
            <li onClick={() => handleSelect(data)} key={data.value}>
              {renderTemplate(data)}
            </li>
          )
        })}
      </ul>
    </>
  )
}