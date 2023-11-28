import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

import { handleFormatNumbers } from '@/helpers/utilHelper';
import { VoteInfo } from '@/helpers/utilHelper';

import DDPNormal from '@/assets/indicator/ddp-normal.svg?react';
import KMTNormal from '@/assets/indicator/kmt-normal.svg?react';
import PFPNormal from '@/assets/indicator/pfp-normal.svg?react';
import ICON_BACK from '@/assets/mapTool/icon-backspace.svg?react';

const Wrapper = styled.div<{ $color: string; $isHover?: boolean; $coord?: { x: number; y: number } }>`
    position: ${({ $isHover }) => ($isHover ? 'absolute' : 'relative')};
    flex-basis: ${({ $isHover }) => ($isHover ? undefined : '30%')};
    left: ${({ $isHover, $coord }) => ($isHover ? `${$coord?.x}px` : 0)};
    top: ${({ $isHover, $coord }) => ($isHover ? `${$coord?.y}px` : '5%')};
    right: 0;
    max-width: ${({ $isHover }) => ($isHover ? '350px' : '400px')};
    padding: 1rem;
    margin: ${({ $isHover }) => ($isHover ? 0 : '0.5rem 0')};
    border: 1px solid transparent;
    border-radius: 20px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: ${({ $isHover, $color }) =>
        $isHover ? 'var(--card-gradient-hover)' : `var(--card-gradient-${$color})`};
    color: ${({ $isHover }) => ($isHover ? 'var(--primary)' : 'inherit')};
`;

const WrapperMobile = styled.div<{ $color: string }>`
    position: 'relative';
    padding: 1rem;
    margin: 1rem 0;
    border: 1px solid transparent;
    border-radius: 20px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: ${({ $color }) => `var(--card-gradient-${$color})`};
`;

const Title = styled.h2<{ $isHover?: boolean }>`
    font-size: 28px;
    color: ${({ $isHover }) => ($isHover ? 'var(--blue-800)' : 'inherit')};
`;

const CandidateRow = styled.div<{ $elected?: boolean; $isMobile?: boolean }>`
    display: flex;
    align-items: center;
    font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
    font-weight: ${({ $elected }) => ($elected ? 'bold' : 'normal')};
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

const RateBar = styled.div<{ $color: string; $width: string }>`
    background: ${({ $color }) => `linear-gradient(to right, var(--${$color}-100), var(--${$color}-600))`};
    width: ${({ $width }) => `calc(100% * ${$width} / 100)`};
    height: 4px;
    border-radius: 20px;
`;

const IndicatorWrapper = styled.span<{ $color: string; $elected: boolean }>`
    & svg {
        margin-left: ${({ $elected }) => ($elected ? '-0.1rem' : 0)};
        filter: ${({ $elected, $color }) => ($elected ? `drop-shadow(2px 2px 8px var(--${$color}-primary))` : '')};
        width: ${({ $elected }) => ($elected ? '18px' : '12px')};
        height: ${({ $elected }) => ($elected ? '18px' : '12px')};
    }
`;

interface CandidateInfo {
    id: number;
    element: JSX.Element;
    primaryColor: string;
    name: string;
}
interface CandidateMap {
    [key: string]: CandidateInfo;
}

interface CardProps {
    isHover: boolean;
    onClick?: () => void;
    show: boolean;
    labelText: string;
    isMobile?: boolean;
    coord?: {
        x: number;
        y: number;
    };
    data: VoteInfo[];
}

interface CandidateData {
    candidate: string;
    votes: string;
    voteRate: string;
    remark: string;
}

const CANDIDATES: CandidateMap = {
    '1': {
        id: 1,
        element: <PFPNormal />,
        primaryColor: 'yellow',
        name: '宋楚瑜'
    },
    '2': {
        id: 2,
        element: <KMTNormal />,
        primaryColor: 'blue',
        name: '韓國瑜'
    },
    '3': {
        id: 3,
        element: <DDPNormal />,
        primaryColor: 'green',
        name: '蔡英文'
    }
};

const Card = ({ isHover, onClick, show, labelText, isMobile, coord, data }: CardProps) => {
    const [candidateInfoData, setCandidateInfoData] = useState<CandidateData[]>([]);

    //TODO 待串接真實資料
    const defaultData = [
        {
            candidate: '1',
            votes: '608590',
            voteRate: '4.26',
            remark: ''
        },
        {
            candidate: '2',
            votes: '5522119',
            voteRate: '38.61',
            remark: ''
        },
        {
            candidate: '3',
            votes: '8170231',
            voteRate: '57.13',
            remark: '*'
        }
    ];

    // 找出當選之候選人
    const findElectedCandidate = () => {
        const electedCandidateData = candidateInfoData.find(({ remark }) => remark === '*');
        return electedCandidateData ? CANDIDATES[electedCandidateData.candidate] : undefined;
    };

    const renderContent = () => {
        return (
            <>
                {show && <ICON_BACK className='controls' onClick={onClick} style={{ cursor: 'pointer' }} />}
                <Title $isHover={isHover}>{labelText.length === 0 ? '全台灣' : labelText}</Title>
                {candidateInfoData.map(({ candidate, votes, voteRate, remark }) => {
                    const elected = remark === '*';
                    const candidateInfo = CANDIDATES[candidate];
                    return (
                        <CandidateRow key={candidate} $elected={elected} $isMobile={isMobile}>
                            <CandidateNameWrapper>
                                <div style={{ width: '25px' }}>
                                    <IndicatorWrapper $color={candidateInfo.primaryColor} $elected={elected}>
                                        {candidateInfo.element}
                                    </IndicatorWrapper>
                                </div>
                                <CandidateName>{candidateInfo.name}</CandidateName>
                            </CandidateNameWrapper>
                            <Amount $elected={elected}>
                                {handleFormatNumbers(parseFloat(votes))}
                                <span style={{ fontFamily: 'Noto Sans' }}> 票</span>
                            </Amount>
                            <Proportion elected={elected}>{voteRate}%</Proportion>
                            <div style={{ flexBasis: '20%' }}>
                                <RateBar $width={voteRate} $color={candidateInfo.primaryColor}></RateBar>
                            </div>
                        </CandidateRow>
                    );
                })}
            </>
        );
    };

    useEffect(() => {
        const formattedData = (data ?? defaultData).slice().sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));
        setCandidateInfoData([...formattedData]);
    }, [data]);

    return (
        <>
            {isMobile ? (
                <WrapperMobile $color={findElectedCandidate()?.primaryColor}>{renderContent()}</WrapperMobile>
            ) : (
                <Wrapper $isHover={isHover} $color={findElectedCandidate()?.primaryColor} $coord={coord}>
                    {renderContent()}
                </Wrapper>
            )}
        </>
    );
};

export default Card;
