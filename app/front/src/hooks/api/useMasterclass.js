import React, {useState} from 'react';

import { getMasterclasses, getMasterclass, addMasterclass, deleteMasterclass, updateMasterclass } from "../../api/endpoints/masterclass";

const useMasterclass = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetAll = async () => {
        try{
            const response = await getMasterclasses();
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handleGet = async(id) => {
        try{
            const response = await getMasterclass(id);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handlePost = async (data) => {
        try{
            const response = await addMasterclass(data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try{
            const response = await deleteMasterclass(id);
            // Handle the response if needed
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleUpdate = async (id) => {
        try{
            const response = await updateMasterclass(id);
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
export default useMasterclass;