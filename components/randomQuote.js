import getConfig from 'next/config'
import EdgeClient from "../contentSource/edgeClient";
import QuoteRepository from "../contentSource/quoteRepository";
import useSWR from "swr"

// This component is rendered client side, so need config for that.
const { publicRuntimeConfig } = getConfig()
const edgeClient = new EdgeClient(publicRuntimeConfig.edgeUrl, publicRuntimeConfig.edgeToken);
const quoteRepository = new QuoteRepository(edgeClient);
const fetcher = async () => await quoteRepository.getRandomQuote();

export default function RandomQuote() {
    const { data, error } = useSWR("quote", fetcher);

    if (error) return (<p>Failed to load quote</p>);
    if (!data) return (<p className="loading">Loading quote...</p>);
    const text = data.text.value ?? "No quote";

    return (
        <section className="quote">
            <h2>Quote</h2>
            <p>{text}</p>
        </section>
    )
}
