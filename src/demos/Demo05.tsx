import React from "react";
import {Input} from "../components/Input/input";
import {AutoCompleted} from "../components/AutoComplete/autoCompleted";
import {AutoComplete, DataSourceType} from "../components/AutoComplete/autoComplete";

const Demo05: React.FC = (props) => {
  const arr: DataSourceType<{ number: number }>[] = [
    {value: 'abc', number: 1}, {value: 'def', number: 1}, {value: 'ghi', number: 1},
    {value: 'jkl', number: 1}, {value: 'mno', number: 1}, {value: 'pqr', number: 1},
    {value: 'stu', number: 1}, {value: 'vwx', number: 1}, {value: 'yz', number: 1}]

  const searchFunction = (key: string, item: DataSourceType<{ number: number }>) => {
    return item.value.includes(key) || item.number.toString().includes(key);
  };
  const handleFetch = (query: string) => {
    return arr.filter(name => name.value.includes(query) || name.number.toString().includes(query));
  }

  const handleSelect = (item: DataSourceType<{ number: number }>) => {
    console.log(item);
  }

  const renderOption = (item: DataSourceType<{ number: number }>) => {
    return (
      <h3>{item.value} - {item.number}</h3>
    )
  }
  return (
    <div style={{width: '85%', margin: '2rem auto'}}>
      <Input placeholder="input"
        // size="lg"
        // disabled={true}
             icon="calculator"
             prepend="https://"
             style={{width: '500px'}}
        // append=".com"
      />
      <AutoCompleted dataArr={arr} fetchUrl="/data.json"
                     placeholder="test" renderOption={renderOption}
                     searchFunc={searchFunction} onSelect={handleSelect}/>
      <AutoComplete placeholder="test" renderOption={renderOption}
                    fetchSuggestion={handleFetch} onSelect={handleSelect}/>
    </div>
  )
}

export default Demo05;