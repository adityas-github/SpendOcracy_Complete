import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRComponent = () => {
  const [image, setImage] = useState(null);
  const [vendorName, setVendorName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageProcess = () => {
    if (image) {
      setLoading(true);
      Tesseract.recognize(image, "eng", {
        logger: (info) => console.log(info), // Optional: To monitor progress
      }).then(({ data: { text } }) => {
        const extractedVendor = extractVendorName(text);
        setVendorName(extractedVendor);
        setLoading(false);
      });
    }
  };

  // Function to extract vendor name from text
  const extractVendorName = (text) => {
    // Simple heuristic for extracting vendor name
    // Modify the logic based on the format of your bills
    const lines = text.split("\n");
    let vendorName = "";

    for (let line of lines) {
      if (
        line.toLowerCase().includes("vendor") ||
        line.toLowerCase().includes("supplier")
      ) {
        // Example: Extract name after 'Vendor:'
        vendorName = line.split(":")[1]?.trim();
        break;
      }
    }

    return vendorName || "Vendor name not found";
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleImageProcess} disabled={loading}>
        {loading ? "Processing..." : "Extract Vendor Name"}
      </button>
      <div>
        <h2>Extracted Vendor Name:</h2>
        <p>{vendorName}</p>
      </div>
    </div>
  );
};

export default OCRComponent;
