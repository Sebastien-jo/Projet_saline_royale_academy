import React, { useState } from 'react';
import {getUsers, getUser, deleteUser, updateUser, addUser} from '../../api/endpoints/user';

const useUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        try {
            const response = await deleteUser(id);
            // Handle the response if needed
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await updateUser(id);
            // Handle the response if needed
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const handleGet = async (id) => {
        try {
            const response = await getUser(id);
            return response; // Return the response from the function
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const handleGetAll = async () => {
        try {
            const response = await getUsers();
            return response; // Return the response from the function
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const handlePost = async (data) => {
        try {
            const response = await addUser(data);
            return response; // Return the response from the function
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return {
        handleDelete,
        handleUpdate,
        handleGet,
        handleGetAll,
        handlePost,
        loading,
        error,
    };
};

export default useUsers;
