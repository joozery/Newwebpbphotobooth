import React from "react";
import HeroSection from "./HeroSection";
import ProductSection from "./ProductSection";
import PhotoboothDetailsSection from "./PhotoboothDetailsSection";
import PBMemorySection from "./PBMemorySection";
import PortfolioVideoSection from "./PortfolioVideoSection";
import GallerySection from "./GallerySection";
import OurClientsSection from "./OurClientsSection";
import FacebookReviewsSection from "./FacebookReviewsSection";
import PromotionSection from "./PromotionSection";
import ReviewsAndSocialSection from "./ReviewsAndSocialSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <PromotionSection />
      <ProductSection />
      <PhotoboothDetailsSection />
      <PBMemorySection />
      <PortfolioVideoSection />
      <GallerySection />
      <ReviewsAndSocialSection />
      <FacebookReviewsSection />
      <OurClientsSection />
    </>
  );
};

export default Home; 