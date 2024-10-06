// OCRComponent.jsx
import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRComponent = ({ onExtract }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image file input
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  // Process the image to extract text
  const handleImageProcess = () => {
    if (image) {
      setLoading(true);
      Tesseract.recognize(image, "eng", {
        // logger: (info) => console.log(info), // Optional: To monitor progress
      })
        .then(({ data: { text } }) => {
          const extractedData = extractDataFromText(text);
          onExtract(extractedData); // Pass extracted data to the parent component
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error recognizing text:", error);
          setLoading(false);
        });
    }
  };

  // Extract vendor name and amount from the text
  const extractDataFromText = (text) => {
    const lines = text.split("\n");
    let name = "";
    let amount = "";

    // Define possible patterns for identifying the vendor name and amount
    const vendorPatterns = [
      /vendor\s*[:\-]?\s*(.*)/i,
      /supplier\s*[:\-]?\s*(.*)/i,
    ];
    const amountPatterns = [
      /amount\s*[:\-]?\s*(.*)/i,
      /total\s*[:\-]?\s*(.*)/i,
    ];

    // Search for vendor name
    for (let line of lines) {
      for (let pattern of vendorPatterns) {
        const match = line.match(pattern);
        if (match) {
          name = match[1].trim();
          break;
        }
      }
      if (name) break; // Stop searching once we find the vendor name
    }

    // Search for amount
    for (let line of lines) {
      for (let pattern of amountPatterns) {
        const match = line.match(pattern);
        if (match) {
          amount = match[1].trim();
          break;
        }
      }
      if (amount) break; // Stop searching once we find the amount
    }

    return { name, amount };
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleImageProcess} disabled={loading}>
        {loading ? "Processing..." : "Extract Data"}
      </button>
    </div>
  );
};

export default OCRComponent;
