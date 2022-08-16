export default function BannerImage({ imageJson }) {
    if (!imageJson || !imageJson.value || !imageJson.value.src)
        return null;

    return (
        <section className="bannerImageHolder">
            <img src={imageJson.value.src} width="800" height="100" />
        </section>
    )
}
