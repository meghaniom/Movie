import React, { useEffect, useState } from "react";
import "../App.css";
import { Button } from "react-bootstrap";
import { Movie } from "./movied";
// import  Movie  from './movied';

const Content = () => {
  const [show, setShow] = useState();

  useEffect(() => {
    fetch("https://jsonfakery.com/movies/paginated")
      .then((data) => data.json())
      .then((result) => {
        setShow(result);
        console.log(result);
      });
  }, []);
  console.log(show?.data, "show");
  return (
    <>
      <div className="first-com">
        <section className="movie-banner">
          <div className="banner-text">
            <h1 style={{ fontSize: "45px" }}>
              Free Movies to Watch, <br /> Anytime Anywhere.
            </h1>
            <p>
              The search is over! Let Plex help you find the perfect movie to
              watch tonight for free.
            </p>

            <Button variant="warning" className="bynn">
              Warning
            </Button>
          </div>
        </section>
        <section className="grid-x dynamic-block grid-block">
          <div className="large-12 cell grid-elements">
            <div
              style={{ maxWidth: "1200px", margin: "0 auto" }}
              className="grid-x grid-padding-x align-center grid-standard small-up-1 medium-up-2 large-up-4"
            >
              {Movie?.map((item, index) => (
                <div className="cell" key={index}>
                  <div
                    className="grid-inner"
                    style={{
                      padding: "1rem",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      borderRadius: "10px",
                      background: "#fff",
                      height: "100%",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      className="plex-svg-holder"
                      style={{
                        textAlign: "center",
                        marginBottom: "1rem",
                        overflow: "hidden",
                        borderRadius: "8px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="floating-image"
                        style={{
                          width: "100%",
                          height: "250px",
                          borderRadius: "8px",
                          //   objectFit: "cover",
                          position: "relative",
                          animation: `floatAnimation 4s ease-in-out infinite ${
                            index * 0.5
                          }s`,
                        }}
                      />
                    </div>
                    <div
                      className="grid-content"
                      style={{ textAlign: "center" }}
                    >
                      <h4 style={{ margin: "0.5rem 0" }}>{item.title}</h4>
                      <p style={{ fontSize: "0.9rem", color: "#666" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style jsx global>{`
            @keyframes floatAnimation {
              0%,
              100% {
                transform: translateY(0) translateX(0) rotate(0deg);
              }
              25% {
                transform: translateY(-5px) translateX(2px) rotate(0.7deg);
              }
              50% {
                transform: translateY(3px) translateX(-2px) rotate(-0.6deg);
              }
              75% {
                transform: translateY(-3px) translateX(1px) rotate(0.9deg);
              }
            }

            .grid-inner:hover .floating-image {
              animation-play-state: paused;
            }
          `}</style>
        </section>

        <section className="banner-te">
          <div className="left-ban">
            <div className="box-ban" style={{ padding: "80px" }}>
              <h2>See what’s new on Pluto TV, Tubi, & more.</h2>
              <p
                style={{
                  paddingTop: "25px",
                  color: "FFF",
                  lineHeight: "1.5rem",
                }}
              >
                Select your favorite streaming services to discover more, search
                faster, and get curated recommendations—all without ever leaving
                Plex. Connect with friends to see who’s watching what, where.
              </p>
              <a
                href=""
                className="button"
                style={{
                  backgroundColor: "#E5A00D",
                  minWidth: "250px",
                  color: " #ffff",
                  padding: "10px 15px",
                  borderRadius: "50px",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                Discover More Now
              </a>
            </div>
          </div>
          <div className="right-ban">
            <div className="image-block">
              <img
                src="https://www.plex.tv/wp-content/uploads/2025/03/watch-free-disco_hero-1024x778.png"
                alt=""
              />
            </div>
          </div>
        </section>

        <section
          style={{ backgroundColor: "#F9F9F9", width: "100%", display: "flex" }}
        >
          <div
            className="imagendn"
            style={{
              width: "50%",
              padding: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="ujjkbk"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className="imbbdgdg"
                style={{ maxWidth: "500px", margin: "0 auto" }}
              >
                <img
                  src="https://www.plex.tv/wp-content/uploads/2025/03/watch-free-mobile.png"
                  style={{ maxWidth: "100%", verticalAlign: "bottom" }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div
            className="bdwjbdk"
            style={{
              width: "50%",
              padding: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="textright">
              <h2
                style={{
                  fontSize: "2.5em",
                  letterSpacing: " -1px",
                  color: "#282A2D",
                  lineHeight: " 1.2em",
                }}
              >
                It has never been easier to watch free movies online.
              </h2>
              <p style={{ lineHeight: "1.5em", paddingTop: "25px" }}>
                Once you register for a free account with Plex, we’ll keep your
                place from screen to screen as long as you’re signed in. No
                matter what device you choose, your free movies will pick up
                where you left off with ease.
              </p>
              <a href="#" className="buttono " style={{ fontSize: "20px" }}>
                Watch Free
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Content;
