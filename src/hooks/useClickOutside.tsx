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

export function useClickOutside2(ref1: RefObject<HTMLElement>, ref2: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref1.current || ref1.current.contains(event.target as HTMLElement)) {
        return;
      }
      if (!ref2.current || ref2.current.contains(event.target as HTMLElement)) {
        return;
      }
      if (handler) {
        handler(event);
      }
    }
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    }
  },[ref1,ref2, handler])
}

export default useClickOutside;