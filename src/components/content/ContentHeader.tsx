import ContentSearch from "./ContentSearch";

const ContentHeader = () => {
    return ( 
        <div className="sticky top-0 w-full h-16">
            <div className="w-full h-full bg-background/90 p-3 flex flex-row justify-between items-center">
                content of the header...
                <ContentSearch />
            </div>
        </div>
     );
}
 
export default ContentHeader;