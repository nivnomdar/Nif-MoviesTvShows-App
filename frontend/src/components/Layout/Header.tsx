import logo from "../../assets/small-Image .jpeg";

import { ArrowLeft, Menu, Mic, Search, User } from "lucide-react";
import { Button } from "../Buttons/Buttons";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  // console.log(searchText);

  const handleSubmit = async () => {
    // console.log(searchText);
    navigate(`/search/${searchText}`);
  };

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      {/* Left: Logo and Menu */}
      <PageHeaderFirstSection hidden={showFullWidthSearch} />

      {/* Middle: Search */}
      <form className="gap-4 flex flex-grow justify-center">
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary
            py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
            value={searchText} // Ensure the input value is controlled by the state
            onChange={(event) => {
              setSearchText(event.currentTarget.value);
            }}
          />
          <Button
            type="button"
            className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0"
            onClick={handleSubmit}>
            <Search />
          </Button>
        </div>
      </form>

      {/* Right: Other buttons */}
      <div>
        <Button size="icon" variant="default">
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`gap-4 items-center flex flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}>
      <Button onClick={toggle} variant="default" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img
          src={logo}
          className="h-6"
          style={{ width: "130px", height: "auto" }}
        />
      </a>
    </div>
  );
}
