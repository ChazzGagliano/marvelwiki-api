import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const Storie = () => {
  const { id } = useParams();
  const [storie, setStorie] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3030/storie/${id}`);
      setStorie(data);
      console.log(data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  } else {
    return (
        <div className="description">
        {storie.title}
        {storie.map((p) => {
            return (
                <div>
                    {storie[0].title}
                <div className="headline">
                    Featuring:
                </div>
                {p.characters.items.map((c) => {
                    return (
                        <div> 
                    <div className="description">
                        {c.name}
                    </div>
                    </div>
                    )
                })}
                <div>
                </div>
                <div className="">
               
                </div>
                <div className="description"> {p.description}</div>
                    <div>
              </div>
              <div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Storie;
