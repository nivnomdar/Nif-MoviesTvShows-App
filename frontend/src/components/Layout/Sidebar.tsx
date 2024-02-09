import { ElementType, useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../Buttons/Buttons";
import { Clapperboard, Home, Plus, Search, Shapes, Tv2 } from "lucide-react";
import { PageHeaderFirstSection } from "./Header";

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      {/* Large Sidebar */}
      <aside
        className={`w-56 lg:sticky absolute top-0 bg-black overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] max-h-screen" : "hidden"}`}>
        <div className="lg:hidden pt-2 pb-4 px-2 sticky-0 top-0 col-white">
          <PageHeaderFirstSection />
        </div>

        <LargeSidebarItem Icon={Home} title="Home" url="/" />
        <LargeSidebarItem Icon={Tv2} title="TV-Shows" url="/tvShows" />
        <LargeSidebarItem Icon={Clapperboard} title="Movies" url="/movies" />
        <LargeSidebarItem Icon={Shapes} title="Categories" url="/Categories" />
        <LargeSidebarItem Icon={Plus} title="My List" url="/myList" />
      </aside>
    </>
  );
}

type LargeSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function LargeSidebarItem({ Icon, title, url }: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center text-white rounded-lg gap-4 p-3`
      )}>
      <Icon className="w-6 h-6" />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
