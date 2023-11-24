import { styled } from 'styled-components';

export const IndicatorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const CircleButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin: 0.5rem;
    border-radius: 50%;
    border: 0.5px solid;
    border-image-source: linear-gradient(135deg, #ffffff 12.5%, rgba(255, 255, 255, 0) 75%);
    box-shadow: 0px 0px 4px 0px rgba(184, 184, 184, 0.25);
`;
