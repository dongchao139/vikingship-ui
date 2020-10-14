import React, {ChangeEvent, useState} from "react";
import {Input, InputProps} from "./Input/input";

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (str: string) => string[];
  onSelect?: (item: string) => void;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (
  {
    fetchSuggestion,
    onSelect,
    value,
    ...restProps
  }
) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

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

  const handleSelect = (item: string) => {
    setInputValue(item);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions && suggestions.map((s, index) => (
          <li onClick={() => handleSelect(s)} key={index}>{s}</li>
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
