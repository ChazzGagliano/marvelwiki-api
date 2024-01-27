import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const CharacterIndex = () => {
    const [characters, setCharacters] = useState(undefined)
    const [loading, setLoading] = useState(true)

    useEffect (() => {
        async function fetchData() {
        const {data} = await axios.get(
        `http://localhost:3030/characters/all`
        )
        setCharacters(data)
        console.log(data)
        setLoading(false)
        }
     fetchData()

    }, [])


    if  (loading) {
        return <Loading />
    } else {
        
        return (
            <div>
                {characters.map((p) => {
                    return (
                        <div>
                            <div>
                        {<img
            className="img"
            src={`${p.thumbnail.path}.${p.thumbnail.extension}`}
          />}
                            </div>
                            <div>
                        {p.name}
                            </div>
                            <div>
                        {p.description}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}




export default CharacterIndex