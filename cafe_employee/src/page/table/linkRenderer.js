
import { createSearchParams, useNavigate } from 'react-router-dom';
const LinkRenderer = (props) => {
    const navigate = useNavigate();
    const openEmployee = () => {
        navigate({
            pathname: '/employee',
            search: createSearchParams({
                cafe: props.data.name
            }).toString()
        });
    }
    return (
        <span><a href='' style={{ textDecoration: 'none' }} onClick={openEmployee}>{props.getValue()}</a></span >
    );
};

export default LinkRenderer;