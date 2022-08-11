import EdgeClient from "./edgeClient";

class QuoteRepository {
    constructor(edgeClient) {
        this.edgeClient = edgeClient || new EdgeClient();
      }

      async getRandomQuote() {
        var query = `query GetQuotes($language: String!, $path: String!) {
            item(language: $language, path: $path) {
              children {
                results {
                  id
                  text: field(name: "text") {
                    value
                  }
                }
              }
            }
          }`;

          var variables = {
            "language": "en",
            "path": "/sitecore/content/quotes"
          };

          var response = await this.edgeClient.fetch(query, variables);
          if (response && response.item) {
            var index = Math.floor(Math.random() * response.item.children.results.length);
            return response.item.children.results[index];
          }

        return null;
      }
}

export default QuoteRepository;