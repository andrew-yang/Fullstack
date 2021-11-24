const SearchListView = (props) => {
    const results = props.searchResults
    let display = <div></div>

    if(results !== null && results !== undefined && results.length > 1){
        let sortedResults = results.map(country => country.name.common).sort()
        display = sortedResults.map(country =>{
            return (
                <div key={country}>
                {country}
                <button onClick={() => {props.handleClick([results.find(countryObject => countryObject.name.common===country)])}}>
                    show
                </button>
                </div>
            )
        })
    }

    return display
}

export default SearchListView;