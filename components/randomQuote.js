import QuoteRepository from "../contentSource/quoteRepository";
import useSWR from "swr"

const quoteRepository = new QuoteRepository();
const fetcher = async () => await quoteRepository.getRandomQuote();

export default function RandomQuote() {
    const { data, error } = useSWR("quote", fetcher);

    var body = (<p>Nothing</p>);

    if (error)
        body = (<p>Failed to load quote</p>);
    else if (!data)
        body = (<p>Loading quote...</p>);
    else
        body = (<p>{data.text.value ?? "No quote"}</p>);

    return (
        <section className="quote">
            <h2>Quote</h2>
            {body}
        </section>
    )
}
