import { useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import { ZoomIn, ZoomOut, Loader } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-white">
      {/* Controls */}
      <div className="w-full p-4 bg-gray-50 border-b flex items-center justify-between">
        <span className="text-sm text-black">Zoom:</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="p-2 rounded-lg hover:bg-gray-200"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="text-sm w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button onClick={zoomIn} className="p-2 rounded-lg hover:bg-gray-200">
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full overflow-y-auto p-4">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin" color="black" />
          </div>
        )}

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin" color="black" />
            </div>
          }
          error={
            <div className="text-center text-red-500 p-4">
              Failed to load PDF. Please try again later.
            </div>
          }
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              className="flex justify-center mb-4"
              loading={
                <div className="flex justify-center items-center h-64">
                  <Loader className="animate-spin" color="black" />
                </div>
              }
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
