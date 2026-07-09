import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useFetchSelectContent = <T,> (baseApi, contentApi, params?) => {
    const [content, setContent] = useState<T[]>([]);
    const [loadingContent, setLoadingContent] = useState<boolean>(false);

    const fetchData = useCallback(async (params, abortSignal) => {     
        if (loadingContent) return;
        setLoadingContent(true);
        try {
            const reqApi = contentApi;
            console.log(reqApi, params);    
                       
            const data = (await baseApi.get(reqApi, {params, signal: abortSignal }));
            if (data.status !== 200){
                throw new Error("Ошибка загрузки")
            }
            setContent(data.data);
        } catch(err){
            if (axios.isCancel(err)) {
                console.log("Запрос отменен");
            } else {
                console.error(err.message);
            }
        } finally {
            setLoadingContent(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchData(params, controller.signal);  
        return () => controller.abort();      
    }, [fetchData, JSON.stringify(params)]);

    return {
        content,
        loadingContent
    }
};
