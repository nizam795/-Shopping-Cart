import HeroSection from "../../components/HeroSection";
import productImage from "../../assets/images/ProductBanner.jpg";

const HomePage = () => {
  return (
    <>
      <div>
        <HeroSection
          imageUrl={productImage}
          altText="Discover amazing new products"
          heading="Shop the Latest Trends"
          subheading="Find everything you need, from tech to fashion, all in one place."
          ctaText="Explore Collections"
          ctaLink={""}
        />
        <section style={{ padding: "20px", textAlign: "center" }}>
          <h2>Welcome to Our Store!</h2>
          <p>
            Get ready to explore a world of amazing products. We've curated a
            collection just for you...
          </p>
          {/* ... more content and navigation links as discussed earlier */}
        </section>
      </div>
    </>
  );
};

export default HomePage;
