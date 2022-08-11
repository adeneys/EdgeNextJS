import Link from "next/link";

export default function Content({data}) {
    return (
        <div id="header">
            <div className="contentHolder">
                <Link href="/">Home</Link>
                <h1>{data}</h1>
            </div>
        </div>
    )
};
