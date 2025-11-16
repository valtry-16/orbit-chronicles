import { useEffect } from "react";

export default function StickyBottomAd({ refreshKey }: { refreshKey: number }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, [refreshKey]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "white",
        zIndex: 9999,
        padding: "6px 0",
        textAlign: "center",
        boxShadow: "0 -3px 10px rgba(0,0,0,0.2)"
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", height: "90px" }}
        data-ad-client="ca-pub-7382393805252463"
        data-ad-slot="1459003321"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}