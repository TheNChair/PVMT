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
