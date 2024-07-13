import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search";

import Games from "@/lib/games";

const SearchBar = () => {
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="container mx-auto p-5">
          <Search data={Games} />
        </div>
        <Button variant="outline" size="icon">
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
