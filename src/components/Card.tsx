import { styled } from 'styled-components';

import { handleFormatNumbers } from '@/helpers/utilHelper';

import DDPNormal from '@/assets/indicator/ddp-normal.svg?react';
import KMTNormal from '@/assets/indicator/kmt-normal.svg?react';
import PFPNormal from '@/assets/indicator/pfp-normal.svg?react';
import ICON_BACK from '@/assets/mapTool/icon-backspace.svg?react';

const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: 5%;
    right: 0;
    max-width: 450px;
    padding: 1rem;
    border: 1px solid #9c9c9c;
    border-image-slice: 1;
    border-radius: 20px;
    background-clip: padding-box;
    background: radial-gradient(ellipse at top left, rgba(0, 255, 87, 0.1) 0%, rgba(255, 255, 255, 0) 100%),
        linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2));
`;

const Title = styled.h2`
    font-size: 28px;
`;

const CandidateRow = styled.div<{ elected?: boolean }>`
    display: flex;
    align-items: center;
    font-size: ${({ elected }) => (elected ? '20px' : '16px')};
    font-weight: ${({ elected }) => (elected ? 'bold' : 'medium')};
    margin: 0.5rem 0;
`;

const CandidateNameWrapper = styled.div`
    display: flex;
    position: relative;
    flex-basis: 25%;
`;

const CandidateName = styled.span`
    font-family: 'Noto Sans';
`;

const Proportion = styled.span<{ elected: boolean }>`
    flex-basis: 25%;
`;

const Amount = styled.span<{ elected: boolean }>`
    flex-basis: 30%;
`;

const RateBar = styled.div<{ color: string; width: string }>`
    background: linear-gradient(to right, ${({ color }) => color} 0%, ${({ color }) => `${color}00`} 100%);
    width: ${({ width }) => `calc(100% * ${width} / 100)`};
    height: 4px;
    border-radius: 20px;
`;

const IndicatorWrapper = styled.span<{ color: string; elected: boolean }>`
    & svg {
        margin-left: ${({ elected }) => (elected ? '-0.1rem' : 0)};
        filter: ${({ elected, color }) => (elected ? `drop-shadow(2px 2px 8px ${color})` : undefined)};
        width: ${({ elected }) => (elected ? '18px' : '12px')};
        height: ${({ elected }) => (elected ? '18px' : '12px')};
    }
`;

interface CandidateInfo {
    id: number;
    element: JSX.Element;
    color: string;
    name: string;
}
interface Candidate {
    [key: string]: CandidateInfo;
}

interface CardProps {
    isHover: boolean;
    onClick: () => void;
    show: boolean;
    labelText: string;
}

const CANDIDATES: Candidate = {
    '1': { id: 1, element: <PFPNormal />, color: '#fff500', name: '宋楚瑜' },
    '2': { id: 2, element: <KMTNormal />, color: '#00e0ff', name: '韓國瑜' },
    '3': { id: 3, element: <DDPNormal />, color: '#03ff57', name: '蔡英文' }
};

const Card = ({ isHover, onClick, show, labelText }: CardProps) => {
    console.log(isHover);

    //TODO 待串接真實資料
    const data = [
        {
            candidate: '1',
            votes: '10739',
            voteRate: '3.91',
            remark: ''
        },
        {
            candidate: '2',
            votes: '90010',
            voteRate: '32.80',
            remark: ''
        },
        {
            candidate: '3',
            votes: '173657',
            voteRate: '63.28',
            remark: '*'
        }
    ];
    console.log(labelText, 'labelText');
    return (
        <Wrapper>
            {show && <ICON_BACK className='controls' onClick={onClick} style={{ cursor: 'pointer' }} />}
            <Title>{labelText.length === 0 ? '全台灣' : labelText}</Title>
            {data
                .slice()
                .sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes))
                .map(({ candidate, votes, voteRate, remark }) => {
                    const elected = remark === '*';
                    const candidateInfo = CANDIDATES[candidate];
                    return (
                        <CandidateRow key={candidate} elected={elected}>
                            <CandidateNameWrapper>
                                <div style={{ width: '25px' }}>
                                    <IndicatorWrapper color={candidateInfo.color} elected={elected}>
                                        {candidateInfo.element}
                                    </IndicatorWrapper>
                                </div>
                                <CandidateName>{candidateInfo.name}</CandidateName>
                            </CandidateNameWrapper>
                            <Amount elected={elected}>{handleFormatNumbers(parseFloat(votes))} 票</Amount>
                            <Proportion elected={elected}>{voteRate}%</Proportion>
                            <div style={{ flexBasis: '20%' }}>
                                <RateBar width={voteRate} color={candidateInfo.color}></RateBar>
                            </div>
                        </CandidateRow>
                    );
                })}
        </Wrapper>
    );
};

export default Card;
