import { Article } from "@prisma/client";
import SidebarArticleEntry from "./sidebar-article-entry";

const SidebarRecentArticles = () => {

    const articles: Article[] = [
        {id: "abcdefg", title: "Some example title...", 
            shortSummary: "Short desc...", content: "Some axample article content...",
            tags: ["a", "b", "c", "d"], authorId: "efgh"},
        {id: "2222abcdefg", title: "Some example title...", 
            shortSummary: "asdadShort desc...", content: "dsadaSome axample article content...",
            tags: ["b", "d", "a", "c"], authorId: "asddasfgh"},
        {id: "312121abcdefg", title: "Some example title...", 
            shortSummary: "asdadShort desc...", content: "dsadaSome axample article content...",
            tags: ["b", "d", "a", "c"], authorId: "asddasfgh"}
    ]

    return ( 
        <div className="m-2 p-3 w-full min-h-52 rounded-lg 
        border-2 border-gray-500 
        flex flex-col align-middle justify-center
        space-y-4">
            <div className="font-bold text-2xl">Recent posts</div>
            {articles.map((art, index) => <SidebarArticleEntry key={index} article={art} href={`/posts/${art.id}`} />)}
        </div>
     );
}
 
export default SidebarRecentArticles;