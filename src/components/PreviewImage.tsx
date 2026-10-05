"use client";

import { useState } from "react";

/**
 * Remote preview picture. If the other site blocks hot-linking or the image
 * is missing, the whole slot disappears instead of showing a broken icon.
 */
export default function PreviewImage({
  src,
  className,
  imgClassName,
}: {
  src: string;
  className: string;
  imgClassName: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary remote hosts */}
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className={imgClassName}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
