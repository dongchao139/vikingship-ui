import {useRef,useCallback, useEffect} from "react";
import { Subject } from "rxjs";
function useSubject<T>(callback: Function) {
    const subjectRef = useRef(new Subject<T>());
    const handler = useCallback(function(e: any) {
      subjectRef.current.next(e);
    },[]);
    useEffect(() => {
        callback(subjectRef.current);
    }, []);
    return {handler};
}

export default useSubject;