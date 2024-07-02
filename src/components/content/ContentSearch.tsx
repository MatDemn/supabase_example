import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const ContentSearch = () => {
    return ( 
        <div className="hidden sm:block">
            <div className="flex flex-row gap-3 p-2 w-64 h-10 rounded-full bg-slate-700 text-white focus:border-blue-500 focus-within:ring-2 ">
                <form action="">
                    <div className="relative flex items-center text-slate-500 focus-within:text-blue-500 ">
                        <MagnifyingGlassIcon className="absolute ml-1 w-5 h-5"/>
                        <input type="search" name="searchInput" placeholder="Search here..."
                        className="ml-8 bg-transparent focus:outline-none"/>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default ContentSearch;