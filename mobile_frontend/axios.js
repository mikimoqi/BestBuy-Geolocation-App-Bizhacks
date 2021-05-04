import axios from 'axios';

export default axios.create({
  baseURL: 'https://bestbuy-database-default-rtdb.firebaseio.com/',
});