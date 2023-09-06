import React from 'react';
import {useDispatch} from "react-redux";
import {changeAvatar} from "../store/Slice/authSlice";
import useUsers from "./api/useUsers";

const useChangeAvatar = () => {

    const dispatch = useDispatch();
    const { handleGet } = useUsers();

    const handleAvatar = (id) => {

        handleGet(id).then((response) => {
            dispatch(changeAvatar(response.userAvatar));
        }).catch((err) => {
            console.log(err);
        });
    }

    return { handleAvatar };

}

export { useChangeAvatar };