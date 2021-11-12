export function filter(searchString, persons, filteredResultsCallBack){
    console.log(persons)
    if(searchString.trim().length === 0){
        filteredResultsCallBack(persons)
    }
    filteredResultsCallBack(persons.filter((person) => person.name.toLowerCase().includes(searchString.trim().toLowerCase())))
}

const Filter = (props) => {
    return (
      <div>filter shown with <input onChange={props.searchChange}/></div>
    )

}
export default Filter
