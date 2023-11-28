import { styled } from 'styled-components';

export const IndicatorWrapper = styled.span<{ $isMobile?: boolean }>`
    position: absolute;
    right: 0;
    top: ${({ $isMobile }) => ($isMobile ? undefined : '5%')};
    bottom: ${({ $isMobile }) => ($isMobile ? '25%' : undefined)};
`;

export const CircleButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin: 1rem 0.5rem;
    border-radius: 50%;
    border: 0.5px solid;
    border-image-source: linear-gradient(135deg, #ffffff 12.5%, rgba(255, 255, 255, 0) 75%);
    box-shadow: 0px 0px 4px 0px rgba(184, 184, 184, 0.25);
    cursor: pointer;
`;
