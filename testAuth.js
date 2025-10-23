import axios from 'axios';

async function run() {
  try {
    // try login
    let loginRes = await axios.post('http://localhost:3000/api/auth', { email: 'testuser@example.com', password: 'testpass' });
    console.log('Login status:', loginRes.status);
    console.log('Login data:', loginRes.data);

    const token = loginRes.data.token;
    const authRes = await axios.get('http://localhost:3000/api/auth', { headers: { 'x-auth-token': token } });
    console.log('Auth GET status:', authRes.status);
    console.log('Auth GET data:', authRes.data);
  } catch (err) {
    if (err.response) {
      console.error('Error status:', err.response.status);
      console.error('Error data:', err.response.data);
    } else {
      console.error(err.message);
    }
  }
}

run();
