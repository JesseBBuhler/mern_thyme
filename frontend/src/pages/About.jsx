import React from "react";

function About() {
  return (
    <div className="about-section">
      <div className="about-image">
        <img
          src={`${process.env.PUBLIC_URL}/AboutBackground.webp`}
          alt="About Our Story"
          className="about-image"
        />
      </div>
      <div className="about-content">
        <div className="content-container">
          <h1>About MyThyme</h1>
          <section className="about-story">
            <h2>Our Story</h2>
            <p>
              Welcome to MyThyme - a haven where the aroma of home-grown herbs
              and the warmth of a family kitchen create a cocoon of natural
              bliss. Our journey began in the humble gardens of our
              grandparents, where each plant was nurtured with love and each
              recipe was more than just food—it was a legacy.
            </p>
            <p>
              With MyThyme, we've woven this legacy into every aspect of our
              digital presence, bringing the joy of homemade cooking and the
              wisdom of age-old gardening to your screens. It's not just about
              the flavors on your plate; it's about the memories we create and
              the earth we cherish.
            </p>
          </section>
          <section className="about-mission">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple yet profound: to inspire you to embrace the
              art of cooking and the rhythm of gardening in their most authentic
              forms. At MyThyme, we believe that the most extraordinary moments
              stem from the simple pleasures of life—like the taste of a freshly
              picked tomato or the scent of basil leaves crushed between your
              fingers.
            </p>
          </section>
          <section className="about-vision">
            <h2>Our Vision</h2>
            <p>
              As we grow, we envision a community connected through shared
              experiences of tending gardens and cooking meals. A community that
              values sustainability, wellness, and the pure joy that comes from
              a meal prepared with ingredients you've grown yourself. Join us on
              this journey, and let's cultivate thyme together—along with joy,
              health, and a deeper connection to the food on our tables.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
