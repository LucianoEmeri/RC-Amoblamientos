import Image from "next/image";

export default function CarouselImage({ image }: { image: string }) {
  return (
    <div className="duration-700 ease-in-out relative w-full h-full" data-carousel-item>
      <Image
        src={image}
        className="absolute block w-full h-full object-cover"
        alt="Carousel Image"
        layout="fill"
        priority
      />
    </div>
  )
}