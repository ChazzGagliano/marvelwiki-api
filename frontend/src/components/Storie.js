import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
              <h1>{storie[0].title}</h1>
              <div className="description">
                <h3>Featuring:</h3>
              </div>
              {p.characters.items.map((s) => {
                return (
                  <div key={s.id}>
                    <div className="description">
                      <Link
                        to={`/characters/${s.resourceURI.split("/")[6]}`}
                        className="linkage"
                      >
                        {s.name}
                      </Link>
                    </div>
                  </div>
                );
              })}
              <h3>Description:</h3>
              <div className="description"> {p.description}</div>
              <div></div>
              <div></div>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Storie;
