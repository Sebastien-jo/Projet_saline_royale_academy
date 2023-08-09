import React, {useState} from 'react';
import {getForumMessage, addForumMessage} from "../../api/endpoints/forumMessage";

const useForumMessage = () => {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetMessage = async(id) => {
        try{
            const response = await getForumMessage(id);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        } finally{
            setLoading(false);
        }
    }

    const handlePostMessage = async (data) => {
        try{
            const response = await addForumMessage(data);
            return response; // Return the response from the function
        } catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    return {loading, error, handleGetMessage, handlePostMessage};
}

export default useForumMessage;

