import Head from "next/head";
import PageHeader from "../components/pageHeader";
import BannerImage from "../components/bannerImage";
import ChildList from "../components/childList";
import PageRepository from "../contentSource/pageRepository";
import { getPageTitle } from "../util/contentTools";

const pageRepository = new PageRepository();

export async function getStaticProps({ params }) {
  const path = "/" + params.path.join("/");
  const content = await pageRepository.getPage(path);

  return {
    props: {
      content: content
    }
  };
}

export async function getStaticPaths() {
  let routes = [];
  await getPageRoutes("/", routes);

  // Remove the home page which is currently handled by the index.js page.
  routes = routes.slice(1);

  return {
    paths: routes,
    fallback: true
  }
}

async function getPageRoutes(route, routes) {
  const pathElements = route.substr(1).split("/");
  var page = await pageRepository.getPageRoutes(route);

  if (!page)
    return;

  routes.push(
    { params: { path: pathElements } }
  );

  await Promise.all(page.children.results.map(async child => {
    await getPageRoutes(child.url.path, routes);
  }));
}

export default function ContentPage({ content }) {
  if (content == null)
    return (
      <div>Page not found on Experience Edge</div>
    )

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
      </section>
      <main className="contentHolder">
        <h2>Pages</h2>
        <ChildList data={list} />
      </main>
    </div>
  )
}
