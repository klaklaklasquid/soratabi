import AboutText from "../3DComponents/AboutText";
import aboutContent from "../static/aboutContent";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center px-2 py-12 sm:px-6 lg:px-12">
      <h2 className="animate-fade-in mb-12 text-center text-4xl font-bold tracking-tight text-white">
        WHY SORATABI
      </h2>

      {/* Chat Timeline */}
      <div className="relative flex w-full max-w-xl flex-col gap-12 lg:max-w-2xl">
        {aboutContent.map((item, idx) => (
          <div
            key={item.number}
            className={`flex w-full items-end ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <AboutText
              title={item.title}
              text={item.text}
              number={item.number}
              model={item.model}
              align={idx % 2 === 0 ? "left" : "right"}
            />
          </div>
        ))}

        {/* Timeline vertical line */}
        <div className="from-tertiary-blue/30 to-secondary-blue/20 pointer-events-none absolute top-0 left-1/2 z-0 h-full w-1 -translate-x-1/2 bg-linear-to-b via-white/10 blur-[1.5px]" />
      </div>

      <h2 className="animate-fade-in-delayed mt-16 mb-8 w-full max-w-xl text-center text-2xl font-semibold text-white">
        WHAT ARE YOU WAITING FOR? BOOK YOUR TRIP NOW
      </h2>
      <div className="mb-4 flex flex-col items-center justify-center gap-3 lg:flex-row">
        <Button style="primary" onClick={() => navigate("/browse-destination")}>
          Browse Destinations
        </Button>
        <Button style="secondary" onClick={() => navigate("/my-journey")}>
          Your Journey
        </Button>
      </div>

      {/* Decorative Orbs */}
      <div className="bg-tertiary-blue/20 pointer-events-none absolute -top-16 left-0 h-48 w-48 rounded-full blur-[80px] sm:h-72 sm:w-72 sm:blur-[100px]" />
      <div className="bg-secondary-blue/20 pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full blur-[100px] sm:h-96 sm:w-96 sm:blur-[120px]" />
    </section>
  );
}

export default About;
