import { useState, useEffect } from 'react';

// Custom hooks are functions that use react hooks and they need to start their name with use

export function useFetch(url, retryTimer) {

    //const retryTimer = null;
    const [finalData, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData() {
        setLoading(true);
        // console.log(url);
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log("Result is " + json);
            setData(json);
            // setLoading(false);
        }
        catch (err) {
            setError("There was error encountered " + error);
        } finally {
            setLoading(false);
        }
    }

    // useEffect does NOT work with async functions
    useEffect(() => {
        fetchData();

        if (retryTimer !== null) {
            const fetchInterval = setInterval(() => {
                fetchData();
            }, retryTimer * 1000);

            return () => clearInterval(fetchInterval);
        }

    }, [url, retryTimer]);

    return { finalData, loading, error };


}