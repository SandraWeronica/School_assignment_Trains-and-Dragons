import Button from "../components/Button";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router";

const CardArticle = () => {
  const navigate = useNavigate();
  // För att ta in card från länken som skickat oss hit :)
  const location = useLocation();
  const card = location.state;

  return (
    <article className="px-3 py-6">
      <div className="card-page-info p-4 grid grid-cols-1 sm:m-4 sm:px-7 md:grid-cols-2 gap-3 md:mx-10 md:p-6 lg:mx-24 lg:p-10 md:gap-8">
        <h1 className="text-2xl md:text-5xl md:col-span-2 py-4 lg:py-5">
          {card.page.heading}
        </h1>
        <figure className="h-[300px] md:h-[550px] mb-7 md:col-span-1 rounded-[20px] overflow-hidden">
          <img
            src={card.src}
            alt={`Image of ${card.page.heading}`}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="grid grid-cols-1 lg:grid-rows-2">
          <section className="flex flex-col gap-2 lg:gap-5" aria-labelledby="section-heading">
            <h2 id="section-heading" className="text-xl md:text-3xl">{card.page.heading2}</h2>
            <p className="py-4 pb-8">{card.page.paragraf}</p>
          </section>
          <section className="flex flex-col pb-7 gap-5 justify-between border-t-1 border-t-emerald-950" aria-labelledby="offers-heading">
            <div>
              <h3 id="offers-heading" className="text-xl py-7">Erbjudanden</h3>

              <ul className="list-disc pl-5">
                {card.page.offers.map((item, index) => (
                  <li className="py-2" key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button text="Boka Resa" onClick={() => navigate("/booking")} aria-label={`Boka resa för ${card.page.heading}`} />
          </section>
        </div>
      </div>
    </article>
  );
};

CardArticle.propTypes = {
  src: PropTypes.string,
};

export default CardArticle;
