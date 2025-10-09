import React from "react";

interface LoadingOverlayProps {
  width?: string | number;
  height?: string | number;
  visible?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  width = "400px",
  height = "400px",
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(5px)", // blur background
        backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // on top of everything
      }}
    >
      <iframe
        src="https://lottie.host/embed/28fb22f3-bf40-4ef1-9718-57c1e5afb441/SLLRaDI6N2.lottie"
        width={width}
        height={height}
        title="Loading Animation"
        style={{ border: "none", overflow: "hidden" }}
        allowFullScreen
        allow="autoplay"
      />
    </div>
  );
};

export default LoadingOverlay;
