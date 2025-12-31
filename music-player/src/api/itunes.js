// iTunes Search API (no key). Returns 30-second previewUrl for tracks. :contentReference[oaicite:2]{index=2}
export async function searchTracks(term, limit = 24) {
    const q = encodeURIComponent(term.trim());
    if (!q) return [];

    const url = `https://itunes.apple.com/search?term=${q}&entity=song&limit=${limit}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch tracks");
    const data = await res.json();

    return (data.results || [])
    .filter((t) => t.previewUrl) // playable preview
    .map((t) => ({
        id: t.trackId,
        title: t.trackName,
        artist: t.artistName,
        album: t.collectionName,
        artwork: t.artworkUrl100?.replace("100x100", "300x300"),
        previewUrl: normalizePreviewUrl(t.previewUrl),
        trackViewUrl: t.trackViewUrl,
    }));
}

// Some old responses can be http; browser may block mixed-content.
// This tries https first.
function normalizePreviewUrl(url) {
    if (!url) return url;
    if (url.startsWith("http://")) return url.replace("http://", "https://");
    return url;
}
