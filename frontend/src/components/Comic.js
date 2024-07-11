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

  const addToCart = async (comicId, comicTitle, comicPrice, comicImage) => {
    await axios.post(
        `http://localhost:3030/user/cart/add`,
        {
            comicId: comicId, 
            comicTitle: comicTitle,
            comicPrice: comicPrice,
            comicImage, comicImage
        },
        { withCredentials: true }
    )
  }

  const handleLike = async (comicId, comicName) => {
      await axios.post(
        `http://localhost:3030/comic/like`,
        {
          comicId: comicId,
          comicName: comicName,
        },
        { withCredentials: true }
      );
    };

    const handleUnlike = async (comicId) => {
        await axios.post(
          `http://localhost:3030/comic/unlike`,
          {
            comicId: comicId,
          },
          { withCredentials: true }
        );
      };


  

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
              <div>
              <button
                  className="favorite"
                  type="button"
                  onClick={() =>
                    handleLike(
                      comic[0].id,
                      comic[0].title,
                    )
                  }
                >
                  <img
                    className="button"
                    src="https://w7.pngwing.com/pngs/399/876/png-transparent-like-icon-facebook-like-button-emoticon-emoji-facebook-blue-angle-text-thumbnail.png"
                  />
                </button>
            
                <button
                  className="favorite"
                  type="button"
                  onClick={() =>
                    handleUnlike(
                      comic[0].id,
                      comic[0].title,
                    )
                  }
                >
                  <img
                    className="button"
                    src=""
                  />
                </button>

                <button
                className="cart"
                type="button"
                onClick={() => 
                addToCart(
                    comic[0].id,
                    comic[0].title,
                    comic[0].prices[0].price,
                    comic[0].images[0].path
                )}
                >

                    <img 
                    className="button"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-shopping-cart-442-1151214.png"
                    />
                </button>
                  <h2>${comic[0].prices[0].price}</h2>
                <h3>Description:</h3>
              </div>
              <div className="description"> {p.description}</div>
              <div>
                <div className="description">
                  <h3>Featuring:</h3>
                </div>
                {p.characters.items.map((c) => (
                  <div key={c.id}>
                    <Link
                      to={`/characters/${c.resourceURI.split("/")[6]}`}
                      className="linkage"
                    >
                      {c.name}
                    </Link>
                  </div>
                ))}
                <div className="">
                  <h3>Stories</h3>
                </div>
                <div>
                  {p.stories.items.map((n) => {
                    return (
                      <Link
                        to={`/storie/${n.resourceURI.split("/")[6]}`}
                        className="linkage"
                      >
                        {n.name}
                      </Link>
                    );
                  })}
                </div>
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
                    <h4> Creators: </h4>
                    {p.creators.items.map((creator) => {
                      return (
                        <div className="credits">
                          <div>{creator.name}</div>
                          <div>role: {creator.role}</div>
                        </div>
                      );
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
