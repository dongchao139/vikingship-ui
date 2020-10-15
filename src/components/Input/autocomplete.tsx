import React, {ReactElement, useEffect, useRef, useState} from "react";
import {Input, InputProps} from "./input";
import {Subject} from "rxjs";
import {debounceTime, filter, map, tap} from "rxjs/operators";

interface DataSource {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSource;

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
  dataArr: DataSourceType[];
  searchFunc: (keyword: string, item: DataSourceType) => boolean;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const Autocomplete: React.FC<AutoCompleteProps> = (
  {
    dataArr, searchFunc,onSelect, value,
    renderOption, ...restProps
  }
) => {
  const ref = useRef<Subject<string>>();

  const [dataFiltered, setDataFiltered] = useState<DataSourceType[]>([]);
  const [inputValue, changeInputValue] = useState(value);

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
      tap(val => {
        // console.log(val)
      }),
      debounceTime(150),
      map((keyword: string) => {
        return dataArr.filter(data => {
          return searchFunc(keyword, data);
        });
      })
    ).subscribe((results: DataSourceType[]) => {
      // console.log(results);
      setDataFiltered(results);
    }, (err: any) => {
      console.error(err);
    });
  }, [dataArr, searchFunc]);

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