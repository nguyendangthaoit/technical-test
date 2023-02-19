
const BtnRenderer = (props) => {
    return (
        <span><i className="fas fa-edit me-3" onClick={() => props.edit(props.data)}></i >
            <i className="fas fa-trash-alt" onClick={() => props.delete(props.data)}></i></span>
    );
};

export default BtnRenderer;