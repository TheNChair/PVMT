import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

import { handleFormatNumbers } from '@/helpers/utilHelper';

import DDPNormal from '@/assets/indicator/ddp-normal.svg?react';
import KMTNormal from '@/assets/indicator/kmt-normal.svg?react';
import PFPNormal from '@/assets/indicator/pfp-normal.svg?react';
import ICON_BACK from '@/assets/mapTool/icon-backspace.svg?react';

const Wrapper = styled.div<{ color: string; isHover?: boolean; isMobile?: boolean }>`
    position: relative;
    flex-basis: ${({ isMobile }) => (isMobile ? undefined : '40%')};
    left: ${({ isMobile }) => (isMobile ? undefined : 0)};
    top: ${({ isMobile }) => (isMobile ? undefined : '5%')};
    right: ${({ isMobile }) => (isMobile ? undefined : 0)};
    max-width: ${({ isMobile }) => (isMobile ? undefined : '450px')};
    padding: 1rem;
    margin: 1rem 0;
    border: 1px solid transparent;
    border-radius: 20px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: ${({ isHover, color }) =>
        isHover ? 'var(--card-gradient-hover)' : `var(--card-gradient-${color})`};
    color: ${({ isHover }) => (isHover ? 'var(--primary)' : 'inherit')};
`;

const Title = styled.h2<{ isHover?: boolean }>`
    font-size: 28px;
    color: ${({ isHover }) => (isHover ? 'var(--blue-800)' : 'inherit')};
`;

const CandidateRow = styled.div<{ elected?: boolean; isMobile?: boolean }>`
    display: flex;
    align-items: center;
    font-size: ${({ isMobile }) => (isMobile ? '14px' : '16px')};
    font-weight: ${({ elected }) => (elected ? 'bold' : 'normal')};
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
    background: ${({ color }) => color};
    width: ${({ width }) => `calc(100% * ${width} / 100)`};
    height: 4px;
    border-radius: 20px;
`;

const IndicatorWrapper = styled.span<{ color: string; elected: boolean }>`
    & svg {
        margin-left: ${({ elected }) => (elected ? '-0.1rem' : 0)};
        filter: ${({ elected, color }) => (elected ? `drop-shadow(2px 2px 8px var(--${color}-primary))` : undefined)};
        width: ${({ elected }) => (elected ? '18px' : '12px')};
        height: ${({ elected }) => (elected ? '18px' : '12px')};
    }
`;

interface CandidateInfo {
    id: number;
    element: JSX.Element;
    primaryColor: string;
    color: string[];
    name: string;
}
interface CandidateMap {
    [key: string]: CandidateInfo;
}

interface CardProps {
    isHover: boolean;
    onClick: () => void;
    show: boolean;
    labelText: string;
    isMobile?: boolean;
}

interface CandidateData {
    candidate: string;
    votes: string;
    voteRate: string;
    remark: string;
}

const RangeColorMap = {
    0: 20,
    1: 35,
    2: 50,
    3: 65,
    4: 80,
    5: 100
};

const CANDIDATES: CandidateMap = {
    '1': {
        id: 1,
        element: <PFPNormal />,
        primaryColor: 'yellow',
        color: ['--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500', '--yellow-600'],
        name: '宋楚瑜'
    },
    '2': {
        id: 2,
        element: <KMTNormal />,
        primaryColor: 'blue',
        color: ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500', '--blue-600'],
        name: '韓國瑜'
    },
    '3': {
        id: 3,
        element: <DDPNormal />,
        primaryColor: 'green',
        color: ['--green-100', '--green-200', '--green-300', '--green-400', '--green-500', '--green-600'],
        name: '蔡英文'
    }
};

const Card = ({ isHover, onClick, show, labelText, isMobile }: CardProps) => {
    const [candidateInfoData, setCandidateInfoData] = useState<CandidateData[]>([]);
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

    // 將得票比率根據區間換算成要顯示的顏色級距
    const voteRateRangeToColor = (voteRate: string) => {
        const voteRangeNumber = Math.round(parseFloat(voteRate));
        if (voteRangeNumber >= 81) {
            return '600';
        } else if (voteRangeNumber >= 66 && voteRangeNumber <= 80) {
            return '500';
        } else if (voteRangeNumber >= 51 && voteRangeNumber <= 65) {
            return '400';
        } else if (voteRangeNumber >= 35 && voteRangeNumber <= 50) {
            return '300';
        } else if (voteRangeNumber >= 21 && voteRangeNumber <= 35) {
            return '200';
        }
        return '100';
    };

    // 回傳該候選人的進度條 css 樣式 - linear gradient
    const candidateRateProgress = (candidateInfo: CandidateInfo, voteRate: string) => {
        const idx = candidateInfo.color.findIndex((item) => item.includes(voteRateRangeToColor(voteRate)));
        if (idx === 0) {
            return `var(${candidateInfo.color[idx]})`;
        }
        let gradientString = 'linear-gradient(to right';
        for (let i = 0; i <= idx; i += 1) {
            gradientString = gradientString.concat(
                `, var(${candidateInfo.color[i]}) ${RangeColorMap[i as keyof typeof RangeColorMap]}%`
            );
        }
        return gradientString.concat(');');
    };

    // 找出當選之候選人
    const findElectedCandidate = () => {
        const electedCandidateData = candidateInfoData.find(({ remark }) => remark === '*');
        return electedCandidateData ? CANDIDATES[electedCandidateData.candidate] : undefined;
    };

    useEffect(() => {
        const formattedData = data.slice().sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));
        setCandidateInfoData([...formattedData]);
    }, []);

    return (
        <Wrapper isHover={isHover} isMobile={isMobile} color={findElectedCandidate()?.primaryColor}>
            {show && <ICON_BACK className='controls' onClick={onClick} style={{ cursor: 'pointer' }} />}
            <Title isHover={isHover}>{labelText.length === 0 ? '全台灣' : labelText}</Title>
            {candidateInfoData.map(({ candidate, votes, voteRate, remark }) => {
                const elected = remark === '*';
                const candidateInfo = CANDIDATES[candidate];
                return (
                    <CandidateRow key={candidate} elected={elected} isMobile={isMobile}>
                        <CandidateNameWrapper>
                            <div style={{ width: '25px' }}>
                                <IndicatorWrapper color={candidateInfo.primaryColor} elected={elected}>
                                    {candidateInfo.element}
                                </IndicatorWrapper>
                            </div>
                            <CandidateName>{candidateInfo.name}</CandidateName>
                        </CandidateNameWrapper>
                        <Amount elected={elected}>
                            {handleFormatNumbers(parseFloat(votes))}
                            <span style={{ fontFamily: 'Noto Sans' }}> 票</span>
                        </Amount>
                        <Proportion elected={elected}>{voteRate}%</Proportion>
                        <div style={{ flexBasis: '20%' }}>
                            <RateBar width={voteRate} color={candidateRateProgress(candidateInfo, voteRate)}></RateBar>
                        </div>
                    </CandidateRow>
                );
            })}
        </Wrapper>
    );
};

export default Card;
