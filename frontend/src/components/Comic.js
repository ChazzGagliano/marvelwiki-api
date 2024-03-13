import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Comic = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const moreData = await axios.get(`http://localhost:3030/comic/${id}`);
      setComic(moreData.data);
      console.log(moreData.data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="description">
        {comic.map((p) => {
          return (
            <div Key={p.id}>
              <h1>{comic[0].title}</h1>
                <h4> Created by: </h4>
              <div>
                <h3>Description:</h3>
              </div>
              <div className="description"> {p.description}</div>
              <div>
                <div className="description">
                  <h3>Featuring:</h3>
                </div>
                {p.characters.items.map((c) => {
                  return (
                    <div key={c.id}>
                      <Link
                        to={`/characters/${c.resourceURI.split("/")[6]}`}
                        className="linkage"
                        >
                        {c.name}
                      </Link>
                    </div>
                  );
                })}
                <div>
                  {p.images.map((i) => {
                    return (
                      <div>
                        <img
                          className="img_comic"
                          src={`${i.path}.${i.extension}`}
                          />
                      </div>
                    );
                  })}
                          <div className="credits">
                              <h4> Credits: </h4>
                           {p.creators.items.map((creator) => {
                               return (
                                <div className="credits">
                                    <div>
                                    {creator.name}
                                    </div>
                                    <div>
                                    role: {creator.role}
                                    </div>
                                </div>
                        
                            )
                           })}
                          </div>
                </div>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Comic;
