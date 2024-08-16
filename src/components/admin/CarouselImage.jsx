/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./CarouselImage.css"
function CarouselImage({image}) {
    const [view , setView] = useState(0)
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-20">
          <div
            id="custCarousel"
            className="carousel slide"
            data-ride="carousel"
            align="center"
          >
            {/* <!-- slides --> */}
            <div className="carousel-inner">
              {image.map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${view === index && `active`}`}
                >
                  <img src={item} alt="Hills" />
                </div>
              ))}
            </div>

            {/* <!-- Left right --> */}
            {/* <a
              className="carousel-control-prev"
              href="#custCarousel"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a
              className="carousel-control-next"
              href="#custCarousel"
              data-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </a> */}

            {/* <!-- Thumbnails --> */}
            <ol className="carousel-indicators list-inline">
              {image.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setView(index)}
                  className={`list-inline-item ${view === index && `active`}`}
                >
                  <a
                    id="carousel-selector-0"
                    className="selected"
                    data-slide-to="0"
                    data-target="#custCarousel"
                  >
                    <img src={item} style={{ height: "50px"}} className="img-fluid" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselImage
