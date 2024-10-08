import Image from "next/image";

interface CarouselImageProps {
  image: string;
  alt?: string;
}

export default function CarouselImage({ image, alt = "Carousel Image" }: CarouselImageProps) {
  return (
    <div className="duration-700 ease-in-out absolute inset-0 w-full h-full" data-carousel-item>
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
    </div>
  )
}