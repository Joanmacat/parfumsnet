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
  return (
    <Card 
      className="py-4 cursor-pointer hover:scale-105 transition-transform"
      onPress={() => window.open(perfumeData.link, '_blank', 'noopener,noreferrer')}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{perfumeData.name}</p>
        <small className="text-default-500">{perfumeData.description}</small>
        <h4 className="font-bold text-large">Buy now</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={perfumeData.name}
          className="object-cover rounded-xl"
          src={perfumeData.image}
          width={270}
        />
      </CardBody>
    </Card>
  );
}