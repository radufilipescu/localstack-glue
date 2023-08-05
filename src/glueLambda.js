const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    console.log('Received event');
    for (let record of event.Records) {
        try {
            const eventType = record.eventSource.split(':')[1];
            const fileName = `${eventType}-event-${Date.now()}.json`;
            const filePath = path.join(`/localstack-glue/${eventType}`, fileName);
            const jsonContent = JSON.stringify(event);
            fs.writeFileSync(filePath, jsonContent);
            console.log(`Event written to ${filePath}`);
        } catch (error) {
            console.error('Error writing event to file:', error);
            throw error;
        }
    }
};