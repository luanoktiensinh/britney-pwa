export const days = Array.from({length: 31})
                    .map((item, index) => (
                        {key: index, label: (index + 1).toString(), value: index + 1}
                    ));
const monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
export const months = monthLabels.map((monthLabel, index) => ({key: index, label: monthLabel, value: index + 1}));
