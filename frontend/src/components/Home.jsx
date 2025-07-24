import React from "react";
import HeroSection from "./HeroSection";
import ProductSection from "./ProductSection";
import AboutSection from "./AboutSection";
import PBMemorySection from "./PBMemorySection";
import VanpbSection from "./VanpbSection";
import PortfolioVideoSection from "./PortfolioVideoSection";
import GallerySection from "./GallerySection";
import OurClientsSection from "./OurClientsSection";
import FacebookReviewsSection from "./FacebookReviewsSection";
import PromotionSection from "./PromotionSection";
import ReviewsAndSocialSection from "./ReviewsAndSocialSection";

const Home = () => {
  return (
    <>
      <div id="hero">
        <HeroSection />
      </div>
      <PromotionSection />
      <div id="package">
        <ProductSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="vanpb">
        <VanpbSection />
      </div>
      <div id="pbmemory">
        <PBMemorySection />
      </div>
      <div id="portfolio">
        <PortfolioVideoSection />
      </div>
      <div id="gallery">
        <GallerySection />
      </div>
      <div id="reviews">
        <ReviewsAndSocialSection />
      </div>
      <div id="facebook-reviews">
        <FacebookReviewsSection />
      </div>
      <div id="clients">
        <OurClientsSection />
      </div>
    </>
  );
};

export default Home; 