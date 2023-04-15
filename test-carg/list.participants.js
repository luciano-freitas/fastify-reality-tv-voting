import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';
import http from 'k6/http';

const params = Object.freeze({
    serverless: {
        baseUrl: 'https://w6kerolmd9.execute-api.us-east-1.amazonaws.com/dev/',
        parameters: {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'izp5tC8qAU1ErIlb4Gj4i2MvZHWaRw7G7dzo2PPe'
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
        baseUrl: 'http://image-force-cpu-with-for-1-469831549.us-east-1.elb.amazonaws.com:3000',
        parameters: {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: "4m",
            tags: {
                Product: "Fastify",
                Teste: "Teste no projeto fastify-reality-tv-voting",
                Environment: "dev",
            },
        }
    }
});

const formFailRate = new Rate('failed form fetches');

export const options = {
    // vus: 100,
    // duration: '10s',
    stages: [
        { duration: "5m", target: 5000 },
        // { duration: "1s", target: 100 },
        // { duration: "1s", target: 100 },
        // { duration: "1s", target: 100 },
        // { duration: "1s", target: 100 },
        // { duration: "1s", target: 100 },

        // { duration: "10s", target: 200 },
        // { duration: "10s", target: 300 },
        // { duration: "10s", target: 400 },
        // { duration: "10s", target: 500 },
        // { duration: "1m", target: 1000 },
        // { duration: "1m", target: 1000 },
        // { duration: "1m", target: 1000 },
        // { duration: "1m", target: 1000 },
        // { duration: "1m", target: 1000 },
        // { duration: "1m", target: 1000 },
        // { duration: "1m", target: 1000 },
        // { duration: "1m", target: 1000 }
    ],
    noConnectionReuse: true,
    // thresholds: {
    //   'failed form submits': ['rate<0.1'],
    //   'failed form fetches': ['rate<0.1'],
    //   'http_req_duration': ['p(95)<400'],
    // },
};

const getForm = () => {
    const formResult = http.get(`${params.fastify.baseUrl}/participants`, params.fastify.parameters);
    check(formResult, {
        'is status 200': (r) => r.status === 200
    })
    formFailRate.add(formResult.status !== 200);
}

export default function () {
    getForm();
    sleep(1);
}