import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Profile = () => {
    const [ user, setUser ] = useState(undefined)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`http://localhost:3030/user/profile`, {withCredentials: true} )
            setUser(data)
            console.log(data)
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) {
        return <Loading />;
      } else {
        return (
        <div>
           <h1>{user.data.user.username}</h1>
        </div>
    )
}};

export default Profile;