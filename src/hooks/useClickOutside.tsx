import {RefObject, useEffect} from "react";
import { Subject } from "rxjs";
function useClickOutside(ref: RefObject<HTMLElement>, handler?: Function) {
  const $subject: Subject<MouseEvent> = new Subject();
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      if (handler) {
        handler(event);
      }
      $subject.next(event)
    }
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    }
  },[ref, handler]);
  return $subject;
}

export default useClickOutside;