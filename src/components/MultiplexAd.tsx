import { useEffect } from "react";

export default function MultiplexAd({ refreshKey }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [refreshKey]);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block", margin:"30px auto" }}
      data-ad-client="ca-pub-7382393805252463"
      data-ad-slot="7812990045"
      data-ad-format="autorelaxed">
    </ins>
  );
}