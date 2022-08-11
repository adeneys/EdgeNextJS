import Head from "next/head";
import PageHeader from "../components/pageHeader";
import BannerImage from "../components/bannerImage";
import ChildList from "../components/childList";
import RandomQuote from "../components/randomQuote";
import PageRepository from "../contentSource/pageRepository";
import { getPageTitle } from "../util/contentTools";

const pageRepository = new PageRepository();

export async function getStaticProps() {
    const content = await pageRepository.getPage("/");

    return {
        props: {
            content: content
        }
    };
}

export default function Home({ content }) {
    let list = [];
    if (content.children && content.children.results)
        list = content.children.results;

    return (
        <div>
            <Head>
                <title>{getPageTitle(content)}</title>
            </Head>
            <PageHeader data={getPageTitle(content)} />
            <BannerImage imageJson={content.bannerImage.jsonValue} />
            <section className="contentHolder">
                <div dangerouslySetInnerHTML={{ __html: content.text.value }}></div>
                <RandomQuote />
            </section>
            <main className="contentHolder">
                <h2>Pages</h2>
                <ChildList data={list} />
            </main>
        </div>
    )
}
