import PropTypes from 'prop-types';

const Searchbar = ({ handleSubmit }) => {
    return(
        <header className="searchbar">
            <form className="search-form" onSubmit={handleSubmit}>
                <button className="search-form-button" type="submit">
                    <span className="search-form-button">🔎</span>
                </button>

                <input
                    className="search-form-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    handleSubmit: PropTypes.func
}

export default Searchbar