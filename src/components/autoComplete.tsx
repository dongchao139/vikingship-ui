import React, {ChangeEvent, ReactElement, useState} from "react";
import {Input, InputProps} from "./Input/input";

interface DataSource {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSource;


export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (str: string) => DataSourceType[];
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (
  {
    fetchSuggestion,
    onSelect,
    renderOption,
    value,
    ...restProps
  }
) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestion(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions && suggestions.map((s, index) => (
          <li onClick={() => handleSelect(s)} key={index}>{renderTemplate(s)}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="viking-auto-complete">
      <Input onChange={handleChange}
             value={inputValue} {...restProps} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}
