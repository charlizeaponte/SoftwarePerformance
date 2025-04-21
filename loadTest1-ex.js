import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, //original 10
  duration: '30s',
};

export default function () {
  const url = 'https://ser-330-function.azurewebsites.net/api/httpTrigger2';

  // You must include there
  const payload = JSON.stringify({
    Name: "Charlize Aponte",
    Email: "Charlize.Aponte@quinnipiac.edu",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);


  const body = res.body || "";

  check(res, {
    'status is 201': (r) => r.status === 201,
    'body includes success message': () => body.includes('Item stored successfully'),
  });

  sleep(1);
}