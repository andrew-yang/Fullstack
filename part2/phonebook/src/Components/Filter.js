export function filter(searchString, persons){
    if(searchString.trim().length === 0){
        return persons
    }
    return persons.filter((person) => person.name.toLowerCase().includes(searchString.trim().toLowerCase()))
}

const Filter = (props) => {
    return (
      <div>filter shown with <input onChange={props.searchChange}/></div>
    )

}
export default Filter
