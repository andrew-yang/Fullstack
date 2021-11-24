const SingleEntryView = (props) => {
    const results = props.searchResults
    let display = <div></div>
    if(results.length === 1){
        let country = results[0]
        display = (
            <div>
                <h2>Country: {country.name.common}</h2>
                <h2>Captial: {country.capital}</h2>
                <h2>Languages</h2>
                <ul>
                    {Object.entries(country.languages).map(([key,value]) => <li key={key}>{value}</li>)}
                </ul>
                <div>
                    <img alt="" src={country.flags.png}/>
                </div>
                <div>
                    <img alt="" src={country.coatOfArms.png}/>
                </div>
            </div>
        )
    }
    return display
}

export default SingleEntryView;