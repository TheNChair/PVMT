import fs from 'fs';
import csv from 'csv-parser';

const taiwanCitiesAndCounties = [
    '臺北市',
    '新北市',
    '桃園市',
    '臺中市',
    '臺南市',
    '高雄市',
    '宜蘭縣',
    '新竹縣',
    '苗栗縣',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義縣',
    '屏東縣',
    '花蓮縣',
    '臺東縣',
    '澎湖縣',
    '基隆市',
    '新竹市',
    '嘉義市',
    '連江縣'
];

const getCSVData = (filepath) => {
    return new Promise((resolve) => {
        const dataSource = [];
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', (data) => {
                dataSource.push(data);
            })
            .on('end', () => {
                resolve(dataSource);
            });
    });
};

async function pipeline() {
    try {
        const dataSource = await getCSVData('src/assets/elbase.csv');
        const votesSource = await getCSVData('src/assets/elctks.csv');
        const filteredVoteSource = await filterVoteSource(votesSource);
        const mergeSource = await mergeSourceData(dataSource, filteredVoteSource);
        const result = await convertResult(mergeSource);
        await writeJsonFile(result);
    } catch (error) {
        console.log(error);
    }
}

pipeline();

const convertResult = (dataSource) => {
    return new Promise((resolve) => {
        let result = {};

        const addVoteInfo = (obj, item) => {
            return [
                ...(obj?.voteInfo ?? []),
                {
                    candidate: item.candidate,
                    votes: item.votes,
                    voteRate: item.voteRate,
                    remark: item.remark
                }
            ];
        };

        const processCounty = (item, key) => {
            if (!result[key]) {
                result[key] = { countyName: item.name, voteInfo: [], towns: {} };
            }
            result[key].voteInfo = addVoteInfo(result[key], item);
        };

        const processTown = (item, countyKey, townKey) => {
            if (!result[countyKey].towns[townKey]) {
                result[countyKey].towns[townKey] = {
                    townName: item.name,
                    voteInfo: [],
                    villages: {}
                };
            }
            result[countyKey].towns[townKey].voteInfo = addVoteInfo(result[countyKey].towns[townKey], item);
        };

        const processVillage = (item, cityKey, townKey, villageKey) => {
            if (!result[cityKey].towns[townKey].villages[villageKey]) {
                result[cityKey].towns[townKey].villages[villageKey] = {
                    villageName: item.name,
                    voteInfo: []
                };
            }
            result[cityKey].towns[townKey].villages[villageKey].voteInfo = addVoteInfo(
                result[cityKey].towns[townKey].villages[villageKey],
                item
            );
        };

        dataSource.forEach((item) => {
            let firstLayerKey = item.city + item.county;
            let secondLayerKey = firstLayerKey + item.district;
            let thirdLayerKey = secondLayerKey + item.village.slice(1);

            if (taiwanCitiesAndCounties.find((city) => city === item.name)) {
                if (item.village === '0000') {
                    processCounty(item, firstLayerKey);
                }
            }

            if (result[firstLayerKey] && item.district !== '000' && item.village === '0000') {
                processTown(item, firstLayerKey, secondLayerKey);
            }

            if (result[firstLayerKey] && item.village !== '0000') {
                if (result[firstLayerKey].towns[secondLayerKey]) {
                    processVillage(item, firstLayerKey, secondLayerKey, thirdLayerKey);
                }
            }
        });

        if (Object.keys(result).length != 0) {
            resolve(result);
        }
    });
};

const writeJsonFile = (result) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('voteData.json', JSON.stringify(result), 'utf8', (err) => {
            if (err) {
                reject(err);
            }
            resolve('檔案已被保存');
        });
    });
};

const mergeSourceData = (mainSource, detailSource) => {
    return new Promise((resolve) => {
        let result = [];
        mainSource.forEach((item) => {
            let detailKey = item.city + item.county + item.district + item.village;
            if (detailSource[detailKey]) {
                for (const [key, value] of Object.entries(detailSource[detailKey])) {
                    result = [
                        ...result,
                        {
                            ...item,
                            candidate: key,
                            votes: value.votes.toString(),
                            voteRate: value.voteRate,
                            remark: value.remark
                        }
                    ];
                }
            }
        });
        if (Object.keys(result).length != 0) {
            resolve(result);
        }
    });
};

const filterVoteSource = (dataSource) => {
    return new Promise((resolve) => {
        let result = {};
        dataSource.forEach((item) => {
            let key = item.city + item.county + item.district + item.village;
            if (!result[key]) {
                const initialObject = {
                    votes: 0,
                    voteRate: 0,
                    remark: ' '
                };
                result[key] = {
                    1: initialObject,
                    2: initialObject,
                    3: initialObject
                };
            }
            result[key] = {
                ...result[key],
                [item.candidate]: {
                    ...result[key][item.candidate],
                    votes: Number(result[key][item.candidate].votes) + parseInt(item.votes)
                }
            };
        });

        for (let item of Object.values(result)) {
            let votes = [item[1].votes, item[2].votes, item[3].votes];
            let totalVotes = 0;
            for (let vote of votes) {
                totalVotes += vote;
            }
            const maxIndex = Math.max(...votes);
            const remarkIndex = votes.indexOf(maxIndex) + 1;

            for (let i of [1, 2, 3]) {
                item[i] = {
                    ...item[i],
                    voteRate: ((item[i].votes / totalVotes) * 100).toFixed(2),
                    remark: i === remarkIndex ? '*' : ' '
                };
            }
        }
        if (Object.keys(result).length != 0) {
            resolve(result);
        }
    });
};
