import React, {useState} from 'react';

import {getLikes, getLike, addLike, deleteLike, updateLike} from "../../api/endpoints/likes";

const useLikes = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetAll = async () => {
        try{
            const response = await getLikes();
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handleGet = async(id) => {
        try{
            const response = await getLike(id);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handlePost = async (id, data) => {
        try{
            const response = await addLike(id, data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try{
            const response = await deleteLike(id);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handlePut = async (id, data) => {
        try{
            const response = await updateLike(id, data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        handleGetAll,
        handleGet,
        handlePost,
        handleDelete,
        handlePut
    }
}

export default useLikes;