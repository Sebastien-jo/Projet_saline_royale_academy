import React, {useState} from 'react';
import { getCompositors,  getCompositor, deleteCompositor, updateCompositor, addCompositor} from "../../api/endpoints/compositor";


const useCompositors = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetAll = async () => {
        try {
            const response = await getCompositors();
            return response; // Return the response from the function
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const handleGet = async(id) => {
        try {
            const response = await getCompositor(id);
            return response; // Return the response from the function
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const handlePost = async (data) => {
        try{
            const response = await addCompositor(data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await deleteCompositor(id);
            // Handle the response if needed
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (id) => {
        try {
            const response = await updateCompositor(id);
            // Handle the response if needed
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return{
        handleDelete,
        handleUpdate,
        handleGet,
        handleGetAll,
        handlePost,
        loading,
        error,
    }

}

export default useCompositors;
