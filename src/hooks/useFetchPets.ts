// hooks/useFetchPets.ts
import { useState, useEffect } from 'react';

export interface Pet {
    id: number;
    url: string;
    title: string;
    description: string;
    created: string;
    selected?: boolean;
}

const useFetchPets = (url: string) => {
    const [data, setData] = useState<Pet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //calling the api
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
};

export default useFetchPets;
