import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3030/event/${id}`);
      setEvent(data);
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
        {event.map((e) => {
          <h1>{event[0].title}</h1>;
          return (
            <div>
              <h1>{event[0].title}</h1>
              <div>
                <h3>Description:</h3>
              </div>
              <div className="description"> {e.description}</div>
              <div></div>

              <div className="description">
                <h3>Featuring:</h3>
              </div>
              {e.characters.items.map((e) => {
                return (
                  <div>
                    <Link
                      to={`/characters/${e.resourceURI.split("/")[6]}`}
                      className="linkage"
                    >
                      {e.name}
                    </Link>
                  </div>
                );
              })}
              <img
                className="img_comic"
                src={`${event[0].thumbnail.path}.${event[0].thumbnail.extension}`}
              />
            </div>
          );
        })}
      </div>
    );
  }
};
export default Event;
