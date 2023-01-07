const NotificationMsg = ({msg}) => {
    if(msg === null){
        return null
    }

    return(
        <div className="error-msg-1">
            {msg}
        </div>
    )
}

export default NotificationMsg