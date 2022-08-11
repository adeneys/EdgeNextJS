import Head from "next/head";
import PageHeader from "../components/pageHeader";
import ChildList from "../components/childList";
import Quote from "../components/quote";
import PageRepository from "../contentSource/pageRepository";
import QuoteRepository from "../contentSource/quoteRepository";
import { getPageTitle } from "../util/contentTools";

const pageRepository = new PageRepository();
const quoteRepository = new QuoteRepository();

export async function getStaticProps() {
    const content = await pageRepository.getPage("/");
    const quote = await quoteRepository.getRandomQuote();

    return {
        props: {
            content: content,
            quote: quote
        }
    };
}

export default function Home({content, quote}) {
    let list = [];
    if(content.children && content.children.results)
        list = content.children.results;

    return (
        <div>
            <Head>
                <title>{getPageTitle(content)}</title>
            </Head>
            <PageHeader data={getPageTitle(content)} />
            <section className="contentHolder">
                <div dangerouslySetInnerHTML={{ __html: content.text.value }}></div>
                <Quote quote={quote}/>
            </section>
            <main className="contentHolder">
                <h2>Pages</h2>
                <ChildList data={list}/>
            </main>
        </div>
    )
}
