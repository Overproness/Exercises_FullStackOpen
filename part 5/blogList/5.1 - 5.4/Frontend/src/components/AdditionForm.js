const AdditionForm = (props) => (
    <>
        <h2>Create New</h2>
        <form onSubmit={props.handleAdditionFormSubmit}>
            <p>Title: <input type="text" value={props.title} onChange={props.titleChange} /></p>
            <p>Author: <input type="text" value={props.author} onChange={props.authorChange} /></p>
            <p>Url: <input type="text" value={props.url} onChange={props.urlChange} /></p>
            <button type="submit">Submit</button>
        </form>
    </>
)

export default AdditionForm