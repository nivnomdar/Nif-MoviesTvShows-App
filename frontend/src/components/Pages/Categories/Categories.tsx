import { Shapes } from "lucide-react";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import genre from "../../../data/MoviesGenre";
import { Header } from "../../Layout/Header";
import { Sidebar } from "../../Layout/Sidebar";
import { ElementType } from "react";
import { buttonStyles } from "../../Buttons/Buttons";
import { twMerge } from "tailwind-merge";

function Categories() {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
          </div>

          <div className="overflow-x-hidden px-8 pb-4">
            <div className="grid gap-4 text-white ">
              {genre.MoviesGenre.map((genreItem, index) => (
                <GenreItem
                  key={index}
                  Icon={Shapes}
                  title={genreItem.name}
                  url={`/categories/${genreItem.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

type GenreItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function GenreItem({ Icon, title, url }: GenreItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "red" }),
        "flex items-center text-white rounded-lg gap-6 p-5"
      )}>
      <Icon className="w-6 h-6" />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}

export default Categories;
