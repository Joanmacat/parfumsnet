import {Card, CardHeader, CardBody, Image} from "@heroui/react";

interface PerfumeModalProps {
  perfumeData: {
    name: string;
    description: string;
    link: string;
    image: string;
  };
}

export default function PerfumeModal({ perfumeData }: PerfumeModalProps) {
  const perfumeUrl = `https://www.google.com/search?q=${perfumeData.link}`

  return (
    <Card 
      className="py-4 cursor-pointer hover:scale-105 transition-transform"
      onPress={() => window.open(perfumeUrl, '_blank', 'noopener,noreferrer')}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="p-4 text-tiny uppercase font-bold">{perfumeData.name}</p>
        <small className="p-4 text-default-500">{perfumeData.description}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={perfumeData.name}
          className="object-cover rounded-xl"
          src={perfumeData.image}
          width={135}
        />
      </CardBody>
    </Card>
  );
}