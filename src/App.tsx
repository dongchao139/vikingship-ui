import React from 'react';
import {Autocomplete} from "./components/Input/autocomplete";
import {AutoComplete} from "./components/autoComplete";
import {Input} from "./components/Input/input";


function App() {

  const func = (key, item) => item.includes(key);

  const arr = ['abc','def','ghi','jkl','mno','pqr','stu','vwx','yz']
  const handleFetch = (query: string) => {
    return arr.filter(name => name.includes(query));
  }
  const handleSelect = item => {
    console.log(item);
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
      <Autocomplete dataArr={arr} placeholder="test"
                    searchFunc={func} onSelect={handleSelect}/>
      <AutoComplete placeholder="test"
                    fetchSuggestion={handleFetch} onSelect={handleSelect} />
    </div>
  );
}

export default App;
