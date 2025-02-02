"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function ArtGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Array of image paths manually (or generate it in some other way)
    const imagesArray = [
      '/art/art1.png',
      '/art/art2.png',
      '/art/art2.png',
      '/art/art2.png',
      '/art/art3.png',
      '/art/art4.png',
      '/art/art5.png',
      '/art/art2.png',
      '/art/art5.png',
      '/art/art3.png',
      // Add all the images you want here
    ];
    setImages(imagesArray);
  }, []);

  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div key={index} className={styles.imageContainer}>
          <img src={image} alt={`Art piece ${index}`} className={styles.image} />
        </div>
      ))}
    </div>
  );
}
