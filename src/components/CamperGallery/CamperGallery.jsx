import { useEffect, useState } from "react";
import s from "./CamperGallery.module.css";

const CamperGallery = ({ images = [], camper }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!images.length) {
    return <p>No images available</p>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image.original);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className={s.gallery}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.thumb}
            alt={`Camper ${index}`}
            className={s.galleryImage}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className={s.modal} onClick={handleCloseModal}>
          <img
            src={selectedImage}
            alt="Selected Camper"
            className={s.modalImage}
          />
        </div>
      )}

      <p className={s.description}>{camper.description}</p>
    </>
  );
};

export default CamperGallery;
