const SearchBar = (props) => {
    return (
      <>
        find countries <input onChange={props.handleChange}></input>
      </>
    )
  }

export default SearchBar;