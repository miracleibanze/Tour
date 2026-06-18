import React from "react";
import Button from "../components/UI/Button";

const Home = () => {
  return (
    <>
      <header className="w-full h-160 banner relative flex items-end -mt-20">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-primary z-0" />
        <div className="z-1 text-secondary p-6 w-full">
          <h1 className="text-5xl font-bold mb-6">
            Find anywhere you want,
            <br />
            In just one place.
          </h1>
          <p className="w-3xl mb-6 opacity-90">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            numquam provident facere tempore iure velit reiciendis, laborum ipsa
            dicta facilis atque sit nam asperiores laudantium eligendi quisquam
            sunt molestiae enim.
          </p>
          <div className="flex gap-4 mb-12">
            <Button
              outline
              className="border-secondary! text-secondary hover:bg-secondary/20 hover:-translate-y-1 transition-all"
            >
              Explore
            </Button>
            <Button className="bg-secondary text-primary! hover:bg-secondary-dark hover:border border-secondary hover:-translate-y-1 transition-all">
              Get started
            </Button>
          </div>
          <div className="w-full flex justify-center items-center opacity-70">
            We're here to serve your need.
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;
