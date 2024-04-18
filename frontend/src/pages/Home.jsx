import React from "react";

function Home() {
  return (
    <div
      className="home-section"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/HomeBackground.webp)`,
      }}
    >
      <div className="home-overlay">
        <header className="home-header">
          <h1>Welcome to MyThyme</h1>
          <p>Your go-to place for home cooking and gardening tips.</p>
        </header>
        <section className="featured-recipes">
          <h2>Featured Recipes</h2>
          <div className="recipe-list">
            {/* Example placeholders for recipe items */}
            <div className="recipe">Recipe 1</div>
            <div className="recipe">Recipe 2</div>
            <div className="recipe">Recipe 3</div>
          </div>
        </section>
        <section className="gardening-tips">
          <h2>Gardening Tips</h2>
          <p>Discover how to get the most out of your home garden.</p>
        </section>
        <section className="latest-blog-posts">
          <h2>From Our Blog</h2>
          <p>Read the latest articles from our community.</p>
        </section>
      </div>
    </div>
  );
}

export default Home;
