import React, {useState} from 'react';

import {getFavoris, getFavorisComposer, addFavorisComposer, deleteFavorisComposer, getFavorisOeuvre, addFavorisOeuvre, deleteFavorisOeuvre, getFavorisMasterclass, addFavorisMasterclass, deleteFavorisMasterclass} from "../../api/endpoints/favoris";


const useFavoris = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetAll = async () => {
        try{
            const response = await getFavoris();
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handleGetAllFavorisComposer = async () => {
        try{
            const response = await getFavorisComposer();
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handleAddFavorisComposer = async (data) => {
        try{
            const response = await addFavorisComposer(data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleDeleteFavorisComposer = async (id) => {
        try{
            const response = await deleteFavorisComposer(id);
            // Handle the response if needed
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleGetAllFavorisOeuvre = async () => {
        try{
            const response = await getFavorisOeuvre();
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handleAddFavorisOeuvre = async (data) => {
        try{
            const response = await addFavorisOeuvre(data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleDeleteFavorisOeuvre = async (id) => {
        try{
            const response = await deleteFavorisOeuvre(id);
            // Handle the response if needed
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleGetAllFavorisMasterclass = async () => {
        try{
            const response = await getFavorisMasterclass();
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handleAddFavorisMasterclass = async (data) => {
        try{
            const response = await addFavorisMasterclass(data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    const handleDeleteFavorisMasterclass = async (id) => {
        try{
            const response = await deleteFavorisMasterclass(id);
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
        handleGetAllFavorisComposer,
        handleAddFavorisComposer,
        handleDeleteFavorisComposer,
        handleGetAllFavorisOeuvre,
        handleAddFavorisOeuvre,
        handleDeleteFavorisOeuvre,
        handleGetAllFavorisMasterclass,
        handleAddFavorisMasterclass,
        handleDeleteFavorisMasterclass
    }
}

export default useFavoris;