type EngineeringProjectCardProps = {
  title: string;
  summary: string;
  href: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  imageBackground: string;
  gallery?: Array<{ src: string; alt: string; width: number; height: number }>;
  videoSrc?: string;
};

export function EngineeringProjectCard({
  title, summary, href, imageSrc, imageWidth, imageHeight, alt,
  imageBackground, gallery, videoSrc,
}: EngineeringProjectCardProps) {
  const displayedImage = gallery?.[0];

  return (
    <div className="min-w-0">
      <article className="group/card">
        {videoSrc ? (
          <div className="overflow-hidden rounded-2xl bg-[#22242a]">
            <video
              controls
              playsInline
              preload="metadata"
              aria-label={`${title} demonstration video`}
              className="aspect-video w-full object-contain"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support video playback. <a href={videoSrc}>Open the {title} video</a>.
            </video>
          </div>
        ) : (
          <a
            href={href}
            aria-label={`Explore ${title}`}
            className={`block overflow-hidden rounded-2xl ${imageBackground} transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(73,78,94,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315fca]`}
          >
            <img
              src={displayedImage?.src ?? imageSrc}
              alt={displayedImage?.alt ?? alt}
              width={displayedImage?.width ?? imageWidth}
              height={displayedImage?.height ?? imageHeight}
              loading="lazy"
              className="block h-auto w-full"
            />
          </a>
        )}
        <div className="mt-5 border-t border-black/10 pt-4">
          <h3 className="display-font text-[1.6rem] italic leading-tight tracking-[-0.02em]">
            <a href={href} className="flex items-start justify-between gap-3 transition-colors hover:text-[#315fca] focus-visible:outline-2 focus-visible:outline-[#315fca]">
              {title}
              <span aria-hidden="true" className="mt-1 text-base not-italic text-[#5c6d8c] transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5">↗</span>
            </a>
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[#676b75]">{summary}</p>
        </div>
      </article>
    </div>
  );
}
