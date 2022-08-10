import Head from "next/head";
import PageHeader from "../components/pageHeader";
import ChildList from "../components/childList";
import PageRepository from "../contentSource/pageRepository";
import { getPageTitle } from "../util/contentTools";

const pageRepository = new PageRepository();

export async function getStaticProps({ params }) {
  const content = await pageRepository.getPage("/" + params.path);

  return {
    props: {
      content: content
    }
  };
}

export async function getStaticPaths() {
  let routes = [];
  await getPageRoutes("/", routes);

  // Temporarily remove the home page which is currently handled by the index.js page.
  // This can be removed once I've got this dynamic page handling the index route.
  routes = routes.slice(1);

  return {
    paths: routes,
    fallback: true
  }
}

async function getPageRoutes(route, routes) {
  const pathElements = route.substr(1).split("/");

  routes.push(
    { params: { path: pathElements } }
  );

  var page = await pageRepository.getPageRoutes(route);
  await Promise.all(page.children.results.map(async child => {
    await getPageRoutes(child.url.path, routes);
  }));
}

export default function ContentPage({ content }) {
  if (content == null)
    return (
      <div>Not found</div>
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
