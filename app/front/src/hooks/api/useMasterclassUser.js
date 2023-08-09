import React, {useState} from 'react';

import { getMasterclassUsers, getMasterclassUser, addMasterclassUser, deleteMasterclassUser, updateMasterclassUser } from "../../api/endpoints/masterclassUser";

const useMasterclassUser = () => {

const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetAll = async () => {
        try{
            const response = await getMasterclassUsers();
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handleGet = async(id) => {
        try{
            const response = await getMasterclassUser(id);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handlePost = async (data) => {
        try{
            const response = await addMasterclassUser(data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try{
            const response = await deleteMasterclassUser(id);
            // Handle the response if needed
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleUpdate = async (id) => {
        try{
            const response = await updateMasterclassUser(id);
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
    };
}

export default useMasterclassUser;