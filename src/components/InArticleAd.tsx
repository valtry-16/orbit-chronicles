import { useEffect } from "react";

export default function InArticleAd({ refreshKey }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [refreshKey]);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block", textAlign: "center", margin:"30px auto" }}
      data-ad-client="ca-pub-7382393805252463"
      data-ad-slot="3021195548"
      data-ad-format="fluid"
      data-ad-layout="in-article">
    </ins>
  );
}