
const PersonsView = (props) => {
    return (
        <>
        <h2>Numbers</h2>
        {
            props.persons.map((person)=>{
                return (<div key={person.id}>{person.name + " " + person.number} <button onClick={() => props.deleteHandler(person)}>delete</button></div>)
            })
        }
        </>
    )

}
export default PersonsView