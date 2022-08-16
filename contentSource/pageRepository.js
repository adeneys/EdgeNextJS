import EdgeClient from "./edgeClient";

class PageRepository {
  constructor(edgeClient) {
    this.edgeClient = edgeClient || new EdgeClient();
  }

  async getPage(route) {
    var query = `query GetItem($site: String!, $language: String!, $path: String!) {
            layout(site: $site, language: $language, routePath: $path) {
              item {
                ...commonItemFields
                text: field(name: "text") {
                  value
                }
                bannerImage: field(name: "banner image") {
                  jsonValue
                }
                children {
                  results {
                    ...commonItemFields
                  }
                }
              }
            }
          }
          
          fragment commonItemFields on Item {
            id
            name
            url {
              path
            }
            title: field(name: "title") {
              value
            }
          }`;

    var variables = {
      "site": "website",
      "language": "en",
      "path": route
    };

    var layoutResponse = await this.edgeClient.fetch(query, variables);
    if (layoutResponse && layoutResponse.layout && layoutResponse.layout.item)
      return layoutResponse.layout.item;

    return null;
  }

  async getPageRoutes(route) {
    var query = `query GetPageRoutes($site: String!, $language: String!, $path: String!) {
        layout(site: $site, language: $language, routePath: $path) {
          item {
            ...pageRoute
            children {
              results {
                ...pageRoute
              }
            }
          }
        }
      }
      
      fragment pageRoute on Item {
        id
        url {
          path
        }
      }`;

    var variables = {
      "site": "website",
      "language": "en",
      "path": route
    }

    var layoutResponse = await this.edgeClient.fetch(query, variables);
    if (layoutResponse && layoutResponse.layout && layoutResponse.layout.item)
      return layoutResponse.layout.item;

    return null;
  }
}

export default PageRepository;
