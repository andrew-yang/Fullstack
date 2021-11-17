const PersonForm = (props) => {

    return (
        <>
            <h2>add a new</h2>

            <form>
            <div>name: <input onChange={props.nameChange}/></div>
            <div>number: <input onChange={props.numberChange}/></div>

            <div>
            <button type="submit" onClick={props.submit}>add</button>
            </div>
            </form>
        </>
    )

}
export default PersonForm