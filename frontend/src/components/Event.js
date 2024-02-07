import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

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

              <img
                className="img_comic"
                src={`${event[0].thumbnail.path}.${event[0].thumbnail.extension}`}
              />

              <div>
                <h3>Description:</h3>
              </div>
              <div className="description"> {e.description}</div>
              <div>
                <div className="description">
                  <h3>Featuring:</h3>
                </div>
                {e.characters.items.map((e) => {
                  return (
                    <div>
                      <div className="description">{e.name}</div>
                    </div>
                  );
                })}
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Event;
