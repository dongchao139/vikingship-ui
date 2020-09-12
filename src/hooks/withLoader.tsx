import { useState, useEffect } from 'react'
import axios from 'axios';

function useURLLoader<T>(url: string, deps: any[]): [T, boolean] {
    if (!Array.isArray(deps)) {
        deps = [deps || {}];
    }
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    deps.push(url);
    useEffect(() => {
        setLoading(true);
        axios.get(url).then(result => {
            setData(result.data);
            setLoading(false);
        });
    }, deps);
    return [data, loading];
}
export default useURLLoader;