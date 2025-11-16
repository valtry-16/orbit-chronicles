import { useEffect } from "react";

export default function InFeedAd({ refreshKey }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [refreshKey]);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block", margin: "20px auto" }}
      data-ad-format="fluid"
      data-ad-layout-key="-fg+5n+6t-e7"
      data-ad-client="ca-pub-7382393805252463"
      data-ad-slot="9847219082">
    </ins>
  );
}