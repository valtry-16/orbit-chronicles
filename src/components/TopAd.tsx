import { useEffect } from "react";

export default function TopAd({ refreshKey }: { refreshKey: number }) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.warn("AdSense error:", e);
        }
    }, [refreshKey]); // reload ad on user action

    return (
        <div style={{ width: "100%", textAlign: "center", marginBottom: "12px" }}>
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-7382393805252463"
                data-ad-slot="6568086424"
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </div>
    );
}