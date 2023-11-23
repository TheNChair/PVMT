import { useState } from 'react';
import { styled } from 'styled-components';

import DDPNormal from '@/assets/indicator/ddp_normal.svg?react';
import KMTNormal from '@/assets/indicator/kmt_normal.svg?react';
import PFPNormal from '@/assets/indicator/pfp_normal.svg?react';

const Wrapper = styled.div`
    padding: 2rem;
    border: 2px solid transparent;
    border-radius: 40px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right bottom, #1c2e23, #0f0f0f),
        linear-gradient(to right bottom, #fafafa, #262626);
`;

const Title = styled.h2`
    font-size: 48px;
`;

const CandidateRow = styled.div<{ isElected?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: ${({ isElected }) => (isElected ? 700 : 'inherit')};
`;

const CandidateNameWrapper = styled.div`
    flex-basis: 30%;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    position: relative;
`;

const CandidateName = styled.span`
    font-family: 'Noto Sans';
    margin-left: 1.5rem;
`;

const Proportion = styled.span`
    flex-basis: 20%;
    text-align: left;
`;

const Amount = styled.span`
    flex-basis: 50%;
    text-align: left;
`;

const IndicatorWrapper = styled.span<{ color: string; elected: boolean }>`
    position: absolute;
    & svg {
        margin-left: ${({ elected }) => (elected ? '-0.2rem' : 0)};
        filter: ${({ color }) => (color ? `drop-shadow(2px 2px 8px ${color})` : undefined)};
        width: ${({ elected }) => (elected ? '20px' : '12px')};
        height: ${({ elected }) => (elected ? '20px' : '12px')};
    }
`;

const CANDIDATE_MAP = new Map([
    [
        1,
        {
            element: <DDPNormal />,
            color: '#03ff57'
        }
    ],
    [
        2,
        {
            element: <KMTNormal />,
            color: '#00e0ff'
        }
    ],
    [
        2,
        {
            element: <PFPNormal />,
            color: '#fff500'
        }
    ]
]);

const Card = () => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [elected, setElected] = useState(1);

    return (
        <Wrapper>
            <Title>區域名稱</Title>
            <CandidateRow>
                <CandidateNameWrapper>
                    <IndicatorWrapper color={CANDIDATE_MAP.get(elected)?.color} elected>
                        {CANDIDATE_MAP.get(elected)?.element}
                    </IndicatorWrapper>
                    <CandidateName>蔡英文</CandidateName>
                </CandidateNameWrapper>
                <Amount>8,170,231票</Amount>
                <Proportion>80%</Proportion>
            </CandidateRow>
            <CandidateRow>
                <CandidateNameWrapper>
                    <KMTNormal style={{ position: 'absolute' }} />
                    <CandidateName>韓狗魚</CandidateName>
                </CandidateNameWrapper>
                <Amount>5,170,231票</Amount>
                <Proportion>28%</Proportion>
            </CandidateRow>
            <CandidateRow>
                <CandidateNameWrapper>
                    <PFPNormal style={{ position: 'absolute' }} />
                    <CandidateName>宋楚魚</CandidateName>
                </CandidateNameWrapper>
                <Amount>170,231票</Amount>
                <Proportion>2%</Proportion>
            </CandidateRow>
        </Wrapper>
    );
};

export default Card;
