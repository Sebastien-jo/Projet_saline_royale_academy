import React, { useState } from 'react';
import {getUsers, getUser, deleteUser, updateUser, addUser, addUserImage, deleteUserImage} from '../../api/endpoints/user';

const useUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        try {
            console.log(id);
            const response = await deleteUser(id);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            const response = await updateUser(id, data);
           return response; // Return the response from the function
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

    const handleAddUserImage = async (data) => {
        try {
            const response = await addUserImage(data);
            return response; // Return the response from the function
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteUserImage = async (id) => {
        try {
            const response = await deleteUserImage(id);
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
        handleAddUserImage,
        handleDeleteUserImage,
        loading,
        error
    };
};

export default useUsers;
