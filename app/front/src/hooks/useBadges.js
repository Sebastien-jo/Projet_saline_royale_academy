import React, {useState} from "react";
import {getBadges, getBadge, addBadge, updateBadge, deleteBadge} from "../api/endpoints/badge";

const useBagdes = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleGetAll = async () => {
        try{
            const response = await getBadges();
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handleGet = async(id) => {
        try{
            const response = await getBadge(id);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handlePost = async (data) => {
        try{
            const response = await addBadge(data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try{
            const response = await deleteBadge(id);
            // Handle the response if needed
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleUpdate = async (id) => {
        try{
            const response = await updateBadge(id);
            // Handle the response if needed
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
        handleUpdate
    }
}

export default useBagdes;