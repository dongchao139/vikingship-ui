import React, { useState, useEffect } from 'react'
import axios from 'axios';

function useURLLoader<T>(url: string, deps: any[]): [T, boolean] {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios.get(url).then(result => {
            setData(result.data);
            setLoading(false);
        })
    }, deps);
    return [data, loading];
}
export default useURLLoader;