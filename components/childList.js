import Link from "next/link";

export default function ChildList({ data }) {
    if(data.length == 0)
        return (
            <div>
                <p>No pages</p>
            </div>
        )

    return (
        <div>
            <ul className="childNav">
                {data.map((content) => (
                    <li key={content.id}>
                        <Link href={content.url.path}>{content.title.value || content.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};
