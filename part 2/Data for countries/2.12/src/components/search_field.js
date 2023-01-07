const SearchField = (props) => (
    <>
        <div>find countries <input value={props.newSearch} onChange={props.handleChangedSearch} /> </div>
    </>
)

export default SearchField