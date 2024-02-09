import { SidebarProvider } from "../../../contexts/SidebarContext";
import { Header } from "../../Layout/Header";
import { Sidebar } from "../../Layout/Sidebar";
import GenereTvList from "./ShowTvShows/GenreTvList";

export function TvShows(): JSX.Element {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
          </div>

          <div className="overflow-x-auto px-8 pb-4">
            <GenereTvList />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
