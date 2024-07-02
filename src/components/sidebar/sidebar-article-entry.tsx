import { Article } from "@prisma/client";
import Link from "next/link";

interface SidebarArticleEntryProps {
    article: Article;
    href: string;
}

const SidebarArticleEntry: React.FC<SidebarArticleEntryProps> = ({
    article, href
}: SidebarArticleEntryProps) => {
    return ( 
        <Link href={href}>
            <div className="bg-slate-900/50 hover:bg-slate-800/50 duration-300 rounded-lg">
                <div className="font-bold">
                    {article.title}
                </div>
                <div>{article.shortSummary}</div>
                <div className="flex flex-row space-x-1 p-1">
                    {article.tags.map((tag, index) => <div key={index} className="rounded bg-slate-600 p-2">{tag}</div>)}
                </div>
            </div>
        </Link>
    );
}
 
export default SidebarArticleEntry;