import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

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
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">My Favorite Projects</h1>
      <div className="flex justify-center">
        <Carousel className="text-1xl">
          <CarouselContent>
            {projects.map((item) => (
              <CarouselItem className="flex flex-row">
                <button
                  className="w-[200px]"
                  onClick={() => document.getElementById("previous")?.click()}
                >
                  <FaLongArrowAltLeft size={100} />
                </button>
                <div
                  className="cursor-pointer gap-1 flex flex-col justify-center items-center"
                  onClick={() => handleOpenLink(item.url)}
                >
                  <img src={item.img} className="rounded-2xl w-[70%]" />
                  <h1 className="text-3xl font-semibold">{item.label}</h1>
                  <p className="text-2xl">{item.desc}</p>
                </div>
                <button
                  className="w-[200px]"
                  onClick={() => document.getElementById("next")?.click()}
                >
                  <FaLongArrowAltRight size={100} />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious id="previous" className="hidden" />
          <CarouselNext id="next" className="hidden" />
        </Carousel>
      </div>
    </div>
  );
};
