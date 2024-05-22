const axios = require('axios');

const url = 'http://codingtest.brique.kr:8080/random';
const callCount = 100;

async function fetchRandomData() {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function main() {
    const frequency = {};
    let totalCount = 0;

    for (let i = 0; i < callCount; i++) {
        const data = await fetchRandomData();
        if (data) {
            const key = JSON.stringify(data);
            frequency[key] = (frequency[key] || 0) + 1;
            totalCount++;
        }
    }

    const sortedResults = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

    console.log('Frequency of each value (most frequent first):');
    sortedResults.forEach(([value, count]) => {
        console.log(`count: ${count} ${value}`);
    });

    console.log(`Total count: ${totalCount}`);
}

main();
