const Notification = ({notification}) => {
    if(!notification){
        return null
    }

    const notificationStyle ={
        padding: '5px',
        border: '1px black solid',
        color: 'white',
        backgroundColor: 'gray',
        margin: '15px'
    }

    return(
        <div style={notificationStyle}>
            {notification}
        </div>
    )
}

export default Notification