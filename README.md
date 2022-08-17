# Example Next.js site using Sitecore Experience Edge #

A simple example [Next.js](https://nextjs.org/) site which renders content from [Sitecore Experience Edge](https://doc.sitecore.com/xp/en/developers/hd/200/sitecore-headless-development/sitecore-experience-edge-for-xm.html) for an XM Edge tenant.

The site can run in Server-side Rendering (SSR) mode, or use Static Site Generation (SSG) to output flat files to be hosted anywhere. The home page includes a client-side rendered component (random quote) which calls Experience Edge from the browser, showing a hybrid approach.

## Configuration ##

Create a file named `.env.local` in the root of the repository and populate the Experience Edge URL and X-GQL-Token into the `EDGE_URL` and `EDGE_TOKEN` variables:

    EDGE_URL=https://edge.sitecorecloud.io
    EDGE_TOKEN={your X-GQL-Token used to access the Delivery API}
    NEXT_PUBLIC_EDGE_URL=$EDGE_URL
    NEXT_PUBLIC_EDGE_TOKEN=$EDGE_TOKEN

The `NEXT_PUBLIC_EDGE_URL` and `NEXT_PUBLIC_EDGE_TOKEN` variables are used by client-side code to query Experience Edge from the browser.
