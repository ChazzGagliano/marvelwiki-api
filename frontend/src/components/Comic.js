import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const Comic = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3030/comic/${id}`);
      setComic(data);
      console.log(data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="">
        {comic.map((p) => {
          return (
            <div>
              <div>{p.description}</div>
              <div>
                Characters:{" "}
                {p.characters.items.map((c) => {
                  return <div>{c.name}</div>;
                })}
              </div>
              <div>
                <div>
                  {p.images.map((i) => {
                    return (
                      <div>
                        <img className="" src={`${i.path}.${i.extension}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Comic;
