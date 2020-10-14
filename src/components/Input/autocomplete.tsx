import React, {useEffect, useRef, useState} from "react";
import {Input, InputProps} from "./input";
import {Subject} from "rxjs";
import {debounceTime, filter, map, tap} from "rxjs/operators";

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
  dataArr: string[];
  searchFunc: (keyword: string, item: string) => boolean;
  onSelect?: (item: string) => void;
}

export const Autocomplete: React.FC<AutoCompleteProps> = (
  {
    dataArr, searchFunc,onSelect, value, ...restProps
  }
) => {
  const ref = useRef<Subject<string>>();

  const [dataFiltered, setDataFiltered] = useState([]);
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
        console.log(val)
      }),
      debounceTime(150),
      map((keyword: string) => {
        return dataArr.filter(data => {
          return searchFunc(keyword, data);
        });
      })
    ).subscribe((results: string[]) => {
      console.log(results);
      setDataFiltered(results);
    }, (err: any) => {
      console.log(err);
    });
  }, [dataArr, searchFunc]);

  const handleSelect = (data: string) => {
    changeInputValue(data);
    setDataFiltered([]);
    if (onSelect) {
      onSelect(data);
    }
  }

  return (
    <>
      <Input value={inputValue} {...restProps} onChange={handleInput}/>
      <ul>
        {dataFiltered.map(data => {
          return <li onClick={() => handleSelect(data)} key={data}>{data}</li>
        })}
      </ul>
    </>
  )
}