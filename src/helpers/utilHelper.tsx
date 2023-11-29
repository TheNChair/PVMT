import voteData from '../data/voteData.json';
import colorMapping from '@/enum/colorMapping';

type CandidateCode = '1' | '2' | '3';

export interface VoteInfo {
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

export const getAreaVoteInfo = (...selectedItems: string[]) => {
    const [countyCode, townCode, villageCode] = selectedItems;
    if (villageCode) {
        return (voteData as VoteData)[countyCode]?.towns?.[townCode]?.villages?.[villageCode]?.voteInfo;
    } else if (townCode) {
        return (voteData as VoteData)[countyCode]?.towns?.[townCode]?.voteInfo;
    } else {
        return (voteData as VoteData)[countyCode]?.voteInfo;
    }
};

export const getAreaColor = (...selectedItems: string[]) => {
    const voteInfo = getAreaVoteInfo(...selectedItems).find((info: VoteInfo) => info.remark === '*');
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

export const rgbaToRgb = (rgba: string) => {
    const splitRgba = rgba.split(/\D+/g).filter(Boolean);

    const red = parseInt(splitRgba[0]);
    const green = parseInt(splitRgba[1]);
    const blue = parseInt(splitRgba[2]);

    // 構建rgb字串
    const rgb = 'rgb(' + red + ',' + green + ',' + blue + ')';

    return rgb;
};
