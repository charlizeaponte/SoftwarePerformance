import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {

   //  duration: '30s', target: 10 ,    // Ramp-up to 10 users
   // duration: '30s', target: 100 ,   // Ramp-up to 100 users
   //  duration: '30s', target: 1000 ,  // Ramp-up to 1000 users
     duration: '60s', target: 1000 ,  // Hold at 1000 users

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