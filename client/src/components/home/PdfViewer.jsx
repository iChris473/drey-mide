import { useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  Loader,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white rounded-lg shadow">
      {/* Controls */}
      <div className="w-full p-4 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="p-2 rounded-lg hover:bg-black/70 disabled:opacity-80 disabled:hover:opacity-70 bg-black"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-sm text-black">
            Page {pageNumber} of {numPages || "--"}
          </span>

          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-lg hover:bg-black/70 disabled:opacity-80 disabled:hover:opacity-70 bg-black"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

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
      <div className="w-full overflow-auto p-4">
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
          <Page
            pageNumber={pageNumber}
            scale={scale}
            loading={
              <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin" color="black" />
              </div>
            }
            className="flex justify-center"
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
