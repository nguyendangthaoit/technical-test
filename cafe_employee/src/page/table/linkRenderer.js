
const LinkRenderer = (props) => {
    return (
        <span><a href="/employee" style={{ textDecoration: 'none' }}>{props.getValue()}</a></span>
    );
};

export default LinkRenderer;