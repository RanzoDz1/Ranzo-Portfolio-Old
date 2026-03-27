"use client";

import { useState, useRef } from "react";
import Image, { ImageProps } from "next/image";

// Tiny base64 blur placeholder (grey, 10x6 pixels)
const BLUR_DATA_URL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAwEAAAAAAAAAAAAAAQIDBAUREiExQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aq/NdS1DtlqVQZMdLDzrPIbWkFJGynKSMEagPqDiRRqb8djbMhBQW0kAgK9Qf/9k=";

interface BlurImageProps extends Omit<ImageProps, "placeholder" | "blurDataURL"> {
    wrapperClassName?: string;
}

/**
 * Drop-in Next.js Image with blur-up loading, lazy loading, and
 * smooth fade-in on reveal. Wraps the image in a div for overflow/zoom support.
 */
export default function BlurImage({
    wrapperClassName,
    className,
    alt,
    ...props
}: BlurImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className={`pm-blur-image${isLoaded ? " loaded" : ""} ${wrapperClassName ?? ""}`}
        >
            <Image
                alt={alt}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
                {...props}
            />
        </div>
    );
}
