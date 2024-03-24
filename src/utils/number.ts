export const formatNumberToVND = (number: number) => {
    const formattedNumber = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    return formattedNumber;
};
