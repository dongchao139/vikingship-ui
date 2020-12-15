import React, { useContext, useReducer, useState } from 'react'

// 使用context保存state、dispatch
export const StoreContext: React.Context<any> = React.createContext({});

const initialState = {}

const reducer = (state: any, action: {type: string, payload: any}) => {
  switch(action.type) {
    case 'click':
      return {...state, color: action.payload}
    default:
      return state;
  }
}

/**
 * 使用hooks创建redux示例
 * @param props 
 */
export default function StoreReducer(props: { children: any }) {
  
  const [state, originDispatch] = useReducer(reducer, initialState);
  const dispatch = action => {
    if (typeof action === 'function') {
      return action(originDispatch);
    }
    return originDispatch(action);
  }
  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}

// 在根组件中提供StoreContext
function TestApp() {
  return (
    <StoreReducer>Hello StoreReducer</StoreReducer>
  )
}

function DemoComponent(props) {
  // 从context中取state和dispatch
  const {state, dispapch} = useContext(StoreContext);

  return (
  <button style={{color: state.color}}
    onClick={e => dispapch({type: 'click', payload: 'red'})}
  >
    {props.title}
  </button>
  )
}