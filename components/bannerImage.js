export default function BannerImage({ imageJson }) {
    if (!imageJson || !imageJson.value || !imageJson.value.src)
        return null;

    return (
        <section className="bannerImageHolder">
            <img src={imageJson.value.src} width={imageJson.value.width} height={imageJson.value.height} />
        </section>
    )
}
