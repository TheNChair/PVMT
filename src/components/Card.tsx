import { styled } from 'styled-components';

const Wrapper = styled.div`
    border: 2px solid transparent;
    border-radius: 40px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right bottom, #1c2e23, #0f0f0f),
        linear-gradient(to right bottom, #fafafa, #262626);
    height: 300px;
`;

const Card = () => {
    return <Wrapper>Card</Wrapper>;
};

export default Card;
