
const Persons = (props) => {

    return (
        <>
        <h2>Numbers</h2>
        {
            props.display.map((person)=>{
                return (<div key={person.name}>{person.name + " " + person.number}</div>)
            })
        }
        </>
    )

}
export default Persons