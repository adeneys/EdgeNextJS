import Head from "next/head";
import PageHeader from "../components/pageHeader";
import ChildList from "../components/childList";
import PageRepository from "../contentSource/pageRepository";
import { getPageTitle } from "../util/contentTools";

const pageRepository = new PageRepository();

export async function getStaticProps({params}) {
  const content = await pageRepository.getPage("/" + params.path);

  return {
      props: {
          content: content
      }
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { path: ["/"] }}
    ],
    fallback: true
  }
}

export default function ContentPage({content}) {
  if(content == null)
  return (
    <div>Not found</div>
  )

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
          </section>
          <main className="contentHolder">
              <h2>Pages</h2>
              <ChildList data={list}/>
          </main>
      </div>
  )
}
