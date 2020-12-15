import { call } from "ramda";
import {useRef,useCallback, useEffect} from "react";
import { Subject } from "rxjs";
function useSubject<T>(callback?: Function) {
    const subjectRef = useRef(new Subject<T>());
    // 类似于useEffect，缓存方法。
    // 与之类似的useMemo，返回的是缓存的值
    // 如果直接写方法，则每次渲染时都会创建一份新的函数，导致子组件不必要的渲染
    const handler = useCallback(function(e: any) {
      subjectRef.current.next(e);
    },[]);
    useEffect(() => {
        if (callback) {
          callback(subjectRef.current);
        }
    }, []);
    return {handler, subject$: subjectRef.current};
}

export default useSubject;