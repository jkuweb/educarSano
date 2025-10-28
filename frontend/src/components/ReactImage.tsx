// src/components/ReactImage.tsx
import React from 'react';
import { Image } from '@unpic/react';
import type { ImageProps } from '@unpic/react';

interface ReactImageProps extends Omit<ImageProps, 'layout' | 'width' | 'height' | 'aspectRatio'> {
	src: string;
	alt?: string;
	width: number;
	height: number;
	className?: string;
}

const ReactImage: React.FC<ReactImageProps> = ({
	src,
	alt = '',
	width,
	height,
	className,
	...rest
}) => {
	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			layout="fixed"
			className={className}
			{...rest}
		/>
	);
};

export default ReactImage;