import { useEffect, useMemo, useState } from "react";
import { searchTracks } from "./api/itunes";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);

  // ✅ Persisted state (survives refresh)
  const [queue, setQueue] = useLocalStorage("bb_queue", []);
  const [currentIndex, setCurrentIndex] = useLocalStorage("bb_currentIndex", -1);
  const [favorites, setFavorites] = useLocalStorage("bb_favorites", []);
  const [activeTab, setActiveTab] = useLocalStorage("bb_activeTab", "explore");

  // ✅ Safety: if queue shrinks, keep currentIndex valid
  useEffect(() => {
    if (!Array.isArray(queue)) setQueue([]);
    if (typeof currentIndex !== "number") setCurrentIndex(-1);

    if (queue.length === 0 && currentIndex !== -1) setCurrentIndex(-1);
    if (queue.length > 0 && currentIndex > queue.length - 1) setCurrentIndex(queue.length - 1);
  }, [queue, currentIndex, setQueue, setCurrentIndex]);

  const currentTrack = queue[currentIndex] || null;
  const currentId = currentTrack?.id ?? null;

  const favIds = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites]);
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex === queue.length - 1 || queue.length === 0;

  async function doSearch(term) {
    try {
      setLoading(true);
      const results = await searchTracks(term, 30);
      setTracks(results);
      setActiveTab("explore");
    } catch (e) {
      console.error(e);
      alert("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function playNow(track) {
    setQueue((q) => {
      const idx = q.findIndex((x) => x.id === track.id);
      if (idx !== -1) {
        setCurrentIndex(idx);
        return q;
      }
      const next = [track, ...q];
      setCurrentIndex(0);
      return next;
    });
  }

  function addToQueue(track) {
    setQueue((q) => {
      const exists = q.some((x) => x.id === track.id);
      const next = exists ? q : [...q, track];
      if (currentIndex === -1 && next.length > 0) setCurrentIndex(0);
      return next;
    });
    setActiveTab("queue");
  }

  function removeFromQueue(trackId) {
    setQueue((q) => {
      const idx = q.findIndex((x) => x.id === trackId);
      if (idx === -1) return q;

      const next = q.filter((x) => x.id !== trackId);

      setCurrentIndex((cur) => {
        if (cur === -1) return -1;
        if (idx < cur) return cur - 1;
        if (idx === cur) return Math.min(cur, next.length - 1);
        return cur;
      });

      if (next.length === 0) setCurrentIndex(-1);
      return next;
    });
  }

  function toggleFavorite(track) {
    setFavorites((prev) => {
      const exists = prev.some((x) => x.id === track.id);
      return exists ? prev.filter((x) => x.id !== track.id) : [track, ...prev];
    });
  }

  function next() {
    setCurrentIndex((i) => Math.min(i + 1, queue.length - 1));
  }

  function prev() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  return (
    <div className="appShell">
      <TopBar onSearch={doSearch} loading={loading} />

      <div className="layout">
        {/* LEFT */}
        <aside className="panel">
          <div className="panelHeader">
            <h2>Explore</h2>
            <p className="subtle">Search tracks and build your queue.</p>
          </div>

          {tracks.length === 0 ? (
            <div className="emptyState">
              <div className="emptyTitle">Start searching</div>
              <div className="subtle">Try: “Anirudh”, “A R Rahman”, “Taylor Swift”</div>
            </div>
          ) : (
            <div className="tracks">
              {tracks.map((t) => (
                <TrackRow
                  key={t.id}
                  track={t}
                  isPlaying={currentId === t.id}
                  isFav={favIds.has(t.id)}
                  onPlay={() => playNow(t)}
                  onQueue={() => addToQueue(t)}
                  onFav={() => toggleFavorite(t)}
                />
              ))}
            </div>
          )}
        </aside>

        {/* RIGHT */}
        <main className="panel">
          <PlayerCard
            track={currentTrack}
            onNext={next}
            onPrev={prev}
            isFirst={isFirst}
            isLast={isLast}
          />

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="tabBody">
            {activeTab === "queue" && (
              <QueueTab
                queue={queue}
                currentIndex={currentIndex}
                onSelect={(idx) => setCurrentIndex(idx)}
                onRemove={(id) => removeFromQueue(id)}
                onClear={() => {
                  setQueue([]);
                  setCurrentIndex(-1);
                }}
              />
            )}

            {activeTab === "favorites" && (
              <FavoritesTab
                favorites={favorites}
                onPlay={(t) => playNow(t)}
                onRemove={(t) => toggleFavorite(t)}
              />
            )}

            {activeTab === "explore" && <ExploreHint />}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function TopBar({ onSearch, loading }) {
  const [term, setTerm] = useState("");

  return (
    <header className="topBar">
      <div className="brand">
        <div className="logo">♪</div>
        <div>
          <div className="brandTitle">Bright Beats</div>
          <div className="subtle">Explore • Queue • Favorites</div>
        </div>
      </div>

      <form
        className="searchBar"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(term);
        }}
      >
        <div className="searchField">
          <span className="searchIcon" aria-hidden="true">🔎</span>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search songs or artists…"
          />
        </div>

        <button className="searchBtn" disabled={loading || !term.trim()}>
          {loading ? "Searching…" : "Search"}
        </button>
      </form>
    </header>
  );
}

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabsWrap">
      <div className="tabs" role="tablist" aria-label="Library tabs">
        <TabButton active={activeTab === "explore"} onClick={() => setActiveTab("explore")}>
          Explore
        </TabButton>
        <TabButton active={activeTab === "queue"} onClick={() => setActiveTab("queue")}>
          Queue
        </TabButton>
        <TabButton active={activeTab === "favorites"} onClick={() => setActiveTab("favorites")}>
          Favorites
        </TabButton>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      className={`tabBtn ${active ? "active" : ""}`}
      onClick={onClick}
      role="tab"
      aria-selected={active}
      type="button"
    >
      {children}
    </button>
  );
}

function TrackRow({ track, isPlaying, isFav, onPlay, onQueue, onFav }) {
  return (
    <div className={`trackRow ${isPlaying ? "playing" : ""}`}>
      <img className="art" src={track.artwork} alt="" />
      <div className="tMeta">
        <div className="tTitle" title={track.title}>{track.title}</div>
        <div className="tSubtle" title={track.artist}>{track.artist}</div>
      </div>

      <div className="rowActions">
        <button className="btn primary" onClick={onPlay} type="button">
          {isPlaying ? "Playing" : "Play"}
        </button>

        <button className="btn secondary" onClick={onQueue} type="button">
          + Queue
        </button>

        <button className="iconBtn" onClick={onFav} title={isFav ? "Remove favorite" : "Add favorite"} type="button">
          {isFav ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}

function PlayerCard({ track, onNext, onPrev, isFirst, isLast }) {
  const audioKey = track?.previewUrl || "none";

  return (
    <div className="playerCard">
      <div className="playerHeader">
        <div className="playerHeading">Now Playing</div>
        <div className="playerHint subtle">30s preview</div>
      </div>

      {track ? (
        <div className="playerTop">
          <img className="playerArt" src={track.artwork} alt="" />
          <div className="playerMeta">
            <div className="playerTitle">{track.title}</div>
            <div className="subtle">{track.artist}</div>
            <div className="subtle">{track.album}</div>
          </div>
        </div>
      ) : (
        <div className="playerEmpty">
          <div className="playerEmptyIcon">🎧</div>
          <div className="playerEmptyText">
            <div className="playerEmptyTitle">Pick a track to play</div>
            <div className="subtle">Use <b>Play</b> or <b>+ Queue</b> from Explore.</div>
          </div>
        </div>
      )}

      <audio key={audioKey} controls className="audio" onEnded={() => !isLast && onNext()}>
        {track?.previewUrl ? <source src={track.previewUrl} /> : null}
      </audio>

      <div className="playerNav">
        <button className="btn secondary" onClick={onPrev} disabled={isFirst} type="button">
          Prev
        </button>
        <button className="btn secondary" onClick={onNext} disabled={isLast} type="button">
          Next
        </button>
      </div>
    </div>
  );
}

function QueueTab({ queue, currentIndex, onSelect, onRemove, onClear }) {
  if (queue.length === 0) {
    return (
      <div className="emptyState">
        <div className="emptyTitle">Your queue is empty</div>
        <div className="subtle">Add tracks from Explore using + Queue.</div>
      </div>
    );
  }

  return (
    <div className="listWrap">
      <div className="listHeader">
        <div className="subtle">Queue ({queue.length})</div>
        <button className="btn danger" onClick={onClear} type="button">Clear</button>
      </div>

      <ul className="list">
        {queue.map((t, idx) => (
          <li key={t.id} className={`listItem ${idx === currentIndex ? "active" : ""}`}>
            <button className="listMain" onClick={() => onSelect(idx)} type="button">
              <span className="listTitle">{t.title}</span>
              <span className="tSubtle">{t.artist}</span>
            </button>
            <button className="iconBtn" onClick={() => onRemove(t.id)} title="Remove from queue" type="button">
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FavoritesTab({ favorites, onPlay, onRemove }) {
  if (favorites.length === 0) {
    return (
      <div className="emptyState">
        <div className="emptyTitle">No favorites yet</div>
        <div className="subtle">Tap ♡ on a track to save it here.</div>
      </div>
    );
  }

  return (
    <ul className="list">
      {favorites.map((t) => (
        <li key={t.id} className="listItem">
          <button className="listMain" onClick={() => onPlay(t)} type="button">
            <span className="listTitle">{t.title}</span>
            <span className="tSubtle">{t.artist}</span>
          </button>
          <button className="btn secondary" onClick={() => onRemove(t)} type="button">
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

function ExploreHint() {
  return (
    <div className="emptyState">
      <div className="emptyTitle">Explore mode</div>
      <div className="subtle">Search above and add tracks to Queue or Favorites.</div>
    </div>
  );
}
