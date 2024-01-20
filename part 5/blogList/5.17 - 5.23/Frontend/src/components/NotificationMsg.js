const NotificationMsg = (props) => {
  let notificationStyles;
  if (props.errorCode === 201 || props.errorCode === 201) {
    notificationStyles = {
      color: "green",
      borderColor: "green",
    };
  } else {
    notificationStyles = {
      color: "red",
      borderColor: "red",
    };
  }

  if (props.errorMessage !== null) {
    return (
      <div
        style={notificationStyles}
        className="notificationMsg"
        id="notificationMsg"
      >
        <p>{props.errorMessage}</p>
      </div>
    );
  }
};

export default NotificationMsg;
