import { Link } from "react-router-dom";
import "./HeroSection.css"

interface HeroSectionProps {
  imageUrl: string;
  altText: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  imageUrl,
  heading,
  subheading,
  ctaText,
  
}) => {
  return(
    <>
    <div className="hero-section"
     style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="hero-content">
        <h1 className="haeding">{heading}</h1>
        <p>{subheading}</p>
        <Link to='/product-list' className="hero-cta-button">
          {ctaText}
        </Link>
      </div>
    </div>
    </>
  )
};

export default HeroSection;
