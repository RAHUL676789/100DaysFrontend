import React, { useRef, useState } from "react";

export default function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPdfUrl(reader.result); // base64 url for iframe
    };

    reader.readAsDataURL(file); // convert PDF to base64
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 text-center">
      <div
        className="border-2 border-dashed rounded-lg p-6 cursor-pointer"
        onClick={() => inputRef.current.click()}
      >
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
        {pdfUrl ? (
          <p className="text-green-600 font-semibold">PDF loaded. Scroll down to view 👇</p>
        ) : (
          <p className="text-gray-500">Click or drag to upload a PDF</p>
        )}
      </div>

      {pdfUrl && (
        <div className="mt-8 border rounded overflow-hidden shadow-lg">
          <iframe
            title="PDF Preview"
            src={pdfUrl}
            className="w-full h-[700px] "
          ></iframe>
        </div>
      )}
    </div>
  );
}
