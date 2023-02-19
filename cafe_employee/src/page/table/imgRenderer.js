import * as api from '../../service/cafe.service';

const ImgRenderer = (props) => {
    return (
        <img src={api.getImg(props.getValue())} alt={props.getValue()} height={60} width={60} />
    );
};

export default ImgRenderer;