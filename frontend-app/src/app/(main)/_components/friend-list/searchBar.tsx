import { SearchIcon, X } from "lucide-react";

interface searchBarProps {
  search: string;
  setSearch: (search: string) => void;
}
export function SearchBar(props: searchBarProps) {
  return (
    <div className="relative mb-4 flex items-center gap-2">
      <input
        type="text"
        placeholder="Search"
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        className="bg-foreground w-full rounded-lg border border-neutral-800 p-2 focus:border-indigo-500 focus:outline-none"
      />
      {props.search != "" ? (
        <X
          color="grey"
          onClick={() => props.setSearch("")}
          className="absolute right-0 mr-2 h-6 w-6 cursor-pointer"
        />
      ) : (
        <SearchIcon color="gray" className="absolute right-0 mr-2 h-4 w-4" />
      )}
    </div>
  );
}
