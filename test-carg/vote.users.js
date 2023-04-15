import { sleep, check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { Rate } from 'k6/metrics';
import http from 'k6/http';

const params = Object.freeze({
    serverless: {
        baseUrl: '',
        parameters: {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ''
            },
            timeout: "4m",
            tags: {
                Product: "Serverless",
                Teste: "Teste em no projeto serverless-reality-tv-voting",
                Environment: "dev",
            },
        }
    },
    fastify: {
        baseUrl: 'http://localhost:3000',
        parameters: {
            timeout: "4m",
            tags: {
                Product: "Fastify",
                Teste: "Teste no projeto fastify-reality-tv-voting",
                Environment: "dev",
            },
        }
    }
});

const submitFailRate = new Rate('failed form submits');

export const options = {
    vus: 1000,
    duration: '20s',
};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const submitVote = () => {
    const participants = ['001', '001', '001', '002', '002', '003'];
    const randomParticipants = randomItem(participants);

    const id = getRandomArbitrary(1, 1000).toFixed(1).split('.')[0]
    const submitResult = http.patch(`${params.fastify.baseUrl}/users/${id}/vote/${randomParticipants}`, null, params.fastify.parameters);
    check(submitResult, {
        'is status 200': (r) => r.status === 200
    });
    submitFailRate.add(submitResult.status !== 200);
}

export default function () {
    submitVote();
    sleep(1);
}