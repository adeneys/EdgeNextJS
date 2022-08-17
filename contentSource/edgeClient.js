class EdgeClient {
    constructor(url, token) {
        this.url = (url || process.env.NEXT_PUBLIC_EDGE_URL || process.env.EDGE_URL) + "/api/graphql/v1";
        this.token = token ||process.env.NEXT_PUBLIC_EDGE_TOKEN || process.env.EDGE_TOKEN;
    }

    async fetch(query, variables) {
        try {
            const body = JSON.stringify({
                query: query,
                variables: variables
            });

            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "X-GQL-Token": this.token,
                    "Content-Type": "application/json"
                },
                body: body
            });

            return (await response.json()).data;
        }
        catch (error) {
            console.log("Error fetching content from Experience Edge", error);
        }

        return null;
    }
}

export default EdgeClient;
