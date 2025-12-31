export function TrackList({
    tracks,
    currentId,
    onPlay,
    favorites,
    onToggleFav,
    onAddToQueue,
}) {
    if (!tracks.length) return <p className="muted">Search to see tracks.</p>;

    return (
    <div className="grid">
        {tracks.map((t) => {
        const isFav = favorites.some((f) => f.id === t.id);
        const isPlaying = currentId === t.id;

        return (
            <div key={t.id} className={`card ${isPlaying ? "active" : ""}`}>
            <img src={t.artwork} alt={`${t.title} cover`} />
            <div className="meta">
                <div className="title" title={t.title}>{t.title}</div>
                <div className="artist" title={t.artist}>{t.artist}</div>
                <div className="actions">
                <button onClick={() => onPlay(t)}>
                    {isPlaying ? "Playing" : "Play"}
                </button>
                <button onClick={() => onAddToQueue(t)}>Queue</button>
                <button onClick={() => onToggleFav(t)}>
                    {isFav ? "★" : "☆"}
                </button>
                </div>
                {t.trackViewUrl && (
                <a className="link" href={t.trackViewUrl} target="_blank" rel="noreferrer">
                    View on iTunes
                </a>
                )}
            </div>
            </div>
        );
        })}
    </div>
    );
}
