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
    flex: 0.3;
    display: flex;
    align-items: center;
    column-gap: 1rem;
`;

const CandidateName = styled.span`
    font-family: 'Noto Sans';
`;

const Proportion = styled.span`
    flex: 0.2;
    text-align: left;
`;

const Amount = styled.span`
    flex: 0.5;
    text-align: left;
`;

const Card = () => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [isElected, setIsElected] = useState(true);

    return (
        <Wrapper>
            <Title>區域名稱</Title>
            <CandidateRow>
                <CandidateNameWrapper>
                    <DDPNormal
                        style={
                            isElected
                                ? { filter: 'drop-shadow(2px 2px 8px #00e0ff)', marginLeft: '-0.2rem' }
                                : undefined
                        }
                        width={isElected ? 20 : 12}
                        height={isElected ? 20 : 12}
                    />
                    <CandidateName>蔡英文</CandidateName>
                </CandidateNameWrapper>
                <Amount>8,170,231票</Amount>
                <Proportion>80%</Proportion>
            </CandidateRow>
            <CandidateRow>
                <CandidateNameWrapper>
                    <KMTNormal />
                    <CandidateName>韓狗魚</CandidateName>
                </CandidateNameWrapper>
                <Amount>5,170,231票</Amount>
                <Proportion>28%</Proportion>
            </CandidateRow>
            <CandidateRow>
                <CandidateNameWrapper>
                    <PFPNormal />
                    <CandidateName>宋楚魚</CandidateName>
                </CandidateNameWrapper>
                <Amount>170,231票</Amount>
                <Proportion>2%</Proportion>
            </CandidateRow>
        </Wrapper>
    );
};

export default Card;
