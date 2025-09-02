import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Project = {
  label: string;
  img: string;
  desc: string;
  url: string;
};

const projects: Project[] = [
  {
    label: "Data_Guard",
    desc: "Serverless Password Manager Application",
    img: "https://raw.githubusercontent.com/maciejpvp/data_guard/main/images/2.png",
    url: "https://github.com/maciejpvp/data_guard",
  },
  {
    label: "Marin Cloud",
    desc: "Serverless File Storage Application",
    img: "https://raw.githubusercontent.com/maciejpvp/MarinCloud/refs/heads/main/images/photo1.png",
    url: "https://github.com/maciejpvp/MarinCloud",
  },
];

const handleOpenLink = (url: string) => {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
};

export const Projects = () => {
  return (
    <>
      <h1>My Favorite Projects</h1>
      <div className="flex justify-center">
        <Carousel className="w-[150px]">
          <CarouselContent>
            {projects.map((item) => (
              <CarouselItem
                className="cursor-pointer"
                onClick={() => handleOpenLink(item.url)}
              >
                <img src={item.img} />
                <h1>{item.label}</h1>
                <p className="text-[6px]">{item.desc}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};
