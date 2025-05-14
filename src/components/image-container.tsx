"use client";

import Image, { ImageProps } from "next/image";
import React from "react";
import clsx from "clsx";

interface ImageContainerProps {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
    rounded?: boolean;
    className?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export const ImageContainer: React.FC<ImageContainerProps> = ({
    src,
    alt,
    width,
    height,
    aspectRatio = "16/9",
    rounded = true,
    className,
    objectFit = "cover",
    ...rest
}) => {
    const style: React.CSSProperties = {
        aspectRatio,
        width: width ?? "100%",
        height: height ?? "auto",
        position: "relative",
    };

    return (
        <div
            style={style}
            className={clsx(
                "overflow-hidden",
                rounded && "rounded-xl",
                className
            )}
        >
            <Image src={src} alt={alt} fill style={{ objectFit }} {...rest} />
        </div>
    );
};
