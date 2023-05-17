const Alert = (props) => {
    return(
        <div className={"alert text-center " + props.className} role="alert">
            {props.message}
        </div>
    )
}

export default Alert;