import { Suspense, lazy } from "react";
import { Link } from "react-router";
import useFetch from "../hooks/useFetch";

const HeroSection = lazy(() => import("../components/HeroSection"));
const Card = lazy(() => import("../components/Card"));

const LoadingHero = () => (
  <div className="h-96 bg-gray-600 animate-pulse"></div>
);
const LoadingCard = () => (
  <div
    className="rounded-3xl overflow-hidden bg-gray-600
   aspect-[4/4] w-full animate-pulse"
  ></div>
);

const Landing = () => {
  const {
    data: cardSecs,
    loading,
    error,
  } = useFetch("http://localhost:3000/cardInfo");

  if (error) {
    return <p data-testid="error-msg">{error.message}</p>;
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <LoadingHero />
        <div className="px-7 grid gap-10 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          <LoadingCard />
          <LoadingCard />
        </div>
      </div>
    );
  }

  if (!cardSecs || cardSecs.length === 0) {
    return <p>Kunde inte ladda information.</p>;
  }

  return (
    <>
      <div className="">
        <Suspense fallback={<LoadingHero />}>
          <HeroSection />
        </Suspense>

        {cardSecs.map((sec) => (
          <section
            key={sec.id}
            className="sd:px-60 lg:px-70 md:px-40 flex flex-col items-center"
          >
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center my-2 p-2 lg:my-8">
              {sec.heading}
            </h1>

            <div className="mt-2 mb-10 px-7 grid gap-10 w-full sm:px-10 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              {sec.imgs.slice(0, 2).map((card) => (
                <Link
                  to="/card"
                  state={card}
                  key={card.alt}
                  className="col-span-1"
                  aria-label={`Visa detaljer för följande: ${card.text}`}
                >
                  <Suspense fallback={<LoadingCard />}>
                    <Card
                      src={card.src}
                      alt={card.alt}
                      text={card.text}
                      className="small-card rounded-3xl overflow-hidden aspect-[4/4] w-full"
                    />
                  </Suspense>
                </Link>
              ))}
            </div>

            {sec.imgs.length > 2 && (
              <div className="px-7 w-full sm:px-10">
                <Link to="/card" state={sec.imgs[2]} key={sec.imgs[2].alt}>
                  <Suspense fallback={<LoadingCard />}>
                    <Card
                      src={sec.imgs[2].src}
                      alt={sec.imgs[2].alt}
                      text={sec.imgs[2].text}
                      className="big-card rounded-3xl overflow-hidden aspect-[18/10] w-full"
                    />
                  </Suspense>
                </Link>
              </div>
            )}

            <p className="m-2 py-2 lg:text-2xl md:text-2xl sd:text-xl cursor-pointer hover:underline hover:text-(--el-hover) transition-colors duration-200">
              {sec.paragraf}
            </p>
          </section>
        ))}
      </div>
    </>
  );
};

export default Landing;