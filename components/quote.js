export default function RandomQuote({quote}) {
    const text = quote.text.value ?? "No quote";

    return (
        <section class="quote">
            <h2>Quote</h2>
            <p>{text}</p>
        </section>
    )
}
