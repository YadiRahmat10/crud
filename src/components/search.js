const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
        value={searchQuery}
        onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Nama Barang"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;
