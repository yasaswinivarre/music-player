import { useEffect, useRef } from "react";

export function Player({ track, onNext, onPrev, isFirst, isLast }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && track?.previewUrl) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
  }, [track?.previewUrl]);

  if (!track) {
    return (
      <div className="player">
        <div className="player-empty">Pick a song to play</div>
      </div>
    );
  }

  return (
    <div className="player">
      <div className="now">
        <img src={track.artwork} alt="" />
        <div>
          <div className="now-title">{track.title}</div>
          <div className="now-artist">{track.artist}</div>
          <div className="now-album">{track.album}</div>
        </div>
      </div>

      <audio
        ref={audioRef}
        controls
        onEnded={() => {
          if (!isLast) onNext();
        }}
      >
        <source src={track.previewUrl} />
      </audio>

      <div className="nav">
        <button onClick={onPrev} disabled={isFirst}>Prev</button>
        <button onClick={onNext} disabled={isLast}>Next</button>
      </div>

      <div className="hint muted">
        Playing 30-second preview (iTunes Search API).
      </div>
    </div>
  );
}
