import AboutText from "../3DComponents/AboutText";
import aboutContent from "../static/aboutContent";
import Button from "../Components/Button";

function About() {
  return (
    <>
      <section className="grid grid-cols-5">
        <h2 className="col-span-full row-start-1 mb-24 justify-self-center text-4xl">
          WHY SORATABI
        </h2>

        <div className="col-span-3 col-start-2 row-start-2 flex h-full flex-col items-center gap-16">
          {aboutContent.map((item) => (
            <AboutText
              key={item.number}
              title={item.title}
              text={item.text}
              number={item.number}
              model={item.model}
            />
          ))}
        </div>

        <h2 className="col-span-full row-start-3 my-8 w-1/2 justify-self-center text-center">
          WHAT ARE YOU WAITING FOR BOOK NOW YOUR TRIP
        </h2>

        <div className="col-span-full row-start-4 mb-4 flex flex-col items-center justify-center gap-3 lg:flex-row">
          <Button style="primary">Browse Destinations</Button>
          <Button style="secondary">Your Journey</Button>
        </div>
      </section>
    </>
  );
}

export default About;
