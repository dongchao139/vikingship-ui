import {useRef,useCallback, useEffect} from "react";
import { Subject } from "rxjs";
function useSubject<T>(callback?: Function) {
    const subjectRef = useRef(new Subject<T>());
    // useCallback 计算结果是函数, 主要用于缓存函数
    // 函数式组件每次任何一个state的变化, 整个组件都会被重新刷新，一些函数是没有必要被重新刷新的，
    // 此时就应该缓存起来，提高性能
    const handler = useCallback(function(e: any) {
      subjectRef.current.next(e);
    }, []);
    useEffect(() => {
        if (callback) {
          callback(subjectRef.current);
        }
    }, [callback]);
    return {handler, subject$: subjectRef.current};
}

export default useSubject;