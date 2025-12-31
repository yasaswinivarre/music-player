import { useState } from "react";

export function SearchBar({ onSearch, loading }) {
    const [term, setTerm] = useState("");

    const submit = (e) => {
    e.preventDefault();
    onSearch(term);
    };

    return (
    <form onSubmit={submit} className="search">
        <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search songs, artists (e.g., 'A R Rahman', 'Taylor Swift')"
        />
        <button disabled={loading || !term.trim()}>
        {loading ? "Searching..." : "Search"}
        </button>
    </form>
    );
}
