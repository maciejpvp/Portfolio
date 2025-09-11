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

export const Projects = ({ ios = false }: { ios?: boolean }) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className={`${ios ? "text-sm" : "text-3xl"} font-semibold`}>
        My Favorite Projects
      </h1>
      <div className="flex justify-center w-[90%]">
        <Carousel className="w-[80%] flex flex-col  justify-center items-center">
          <CarouselContent>
            {projects.map((item) => (
              <CarouselItem
                className={`flex flex-row ${!ios ? "w-[500px]" : "w-[50dvw]"}`}
              >
                <div
                  className="cursor-pointer gap-1 flex flex-col justify-center items-center"
                  onClick={() => handleOpenLink(item.url)}
                >
                  <img src={item.img} className="rounded-2xl w-[70%]" />
                  <h1
                    className={`${ios ? "text-sm" : "text-3xl"} font-semibold pt-6`}
                  >
                    {item.label}
                  </h1>
                  <p className={`${ios ? "text-xs" : "text-2xl"}`}>
                    {item.desc}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            id="previous"
            className={`bg-stone-900 text-stone-100 ${ios ? "" : "w-[50px] h-[50px]"}`}
          />
          <CarouselNext
            id="next"
            className={`bg-stone-900 text-stone-100 ${ios ? "" : "w-[50px] h-[50px]"}`}
          />
        </Carousel>
      </div>
    </div>
  );
};
