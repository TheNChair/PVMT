import voteData from '../data/voteData2.json';
import colorMapping from '@/enum/colorMapping';

type CandidateCode = '1' | '2' | '3';

interface VoteInfo {
    candidate: CandidateCode;
    votes: string;
    voteRate: string;
    remark: string;
}

interface VoteProps {
    voteInfo: VoteInfo[];
}

interface VillageVoteProps extends VoteProps {
    villageName: string;
}

interface TownVoteProps extends VoteProps {
    townName: string;
    villages: {
        [key: string]: VillageVoteProps;
    };
}

interface CountyVoteProps extends VoteProps {
    countyName: string;
    towns: {
        [key: string]: TownVoteProps;
    };
}

interface VoteData {
    [key: string]: CountyVoteProps;
}

/**
 * 將數字以千分位呈現
 * @param {number} dataSource 帶入數值
 * @param {number} digits 小數點後第幾位
 */
export const handleFormatNumbers = (dataSource: number, digits?: number) => {
    if (dataSource) {
        const numberSource = parseFloat(dataSource.toFixed(digits ?? 2));
        const comma = /\B(?=(\d{3})+(?!\d))/g;
        const number = String(numberSource).replace(comma, ',');
        return number;
    }
    return '0';
};

export const getAreaColor = (...selectedItems: string[]) => {
    const [countyCode, townCode, villageCode] = selectedItems;
    const electedCallback = (info: VoteInfo) => info.remark === '*';
    let voteInfo: VoteInfo | undefined;
    if (villageCode) {
        voteInfo = (voteData as VoteData)[countyCode]?.towns?.[townCode]?.villages?.[villageCode]?.voteInfo.find(
            electedCallback
        );
    } else if (townCode) {
        voteInfo = (voteData as VoteData)[countyCode]?.towns?.[townCode]?.voteInfo.find(electedCallback);
    } else {
        voteInfo = (voteData as VoteData)[countyCode]?.voteInfo.find(electedCallback);
    }
    if (!voteInfo) {
        return null;
    }
    const colorRange = colorMapping[voteInfo.candidate];
    const color = colorRange.reduce((result: string | null, cur) => {
        if (result) {
            return result;
        }
        const voteRate = Math.round(parseInt(voteInfo!.voteRate));
        if (voteRate >= cur.min && voteRate <= cur.max) {
            result = cur.color;
            return result;
        }
        return null;
    }, null);
    return color;
};
