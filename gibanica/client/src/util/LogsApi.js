import axios from "axios";

const host = "192.168.0.13";
const LOGS_API_URL = `https://${host}/logs`;

axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
  "token"
)}`;

function getLogsPerPage(page) {
  return axios
    .get(`${LOGS_API_URL}?page=${page}`, {
      headers: {
        Accept: "application/json"
      }
    })
    .catch(err => console.log(err));
}

function getNumberOfLogsInsertedPerDay(n_of_days_ago) {
  return axios.get(`${LOGS_API_URL}/monthly_status`, {
    headers: {
      Accept: "application/json"
    }
  });
}

function getNumberOfLogsInsertedPerHost() {
  return axios.get(`${LOGS_API_URL}/host_status`, {
    headers: {
      Accept: "application/json"
    }
  });
}

function getNumberOfLogsInserted() {
  return axios.get(`${LOGS_API_URL}/system_status`, {
    headers: {
      Accept: "application/json"
    }
  });
}

function searchLogs(query, page) {
  return axios.get(`${LOGS_API_URL}?query=${query}&page=${page}`, {
    headers: {
      Accept: "application/json"
    }
  });
}

export {
  getLogsPerPage,
  searchLogs,
  getNumberOfLogsInsertedPerDay,
  getNumberOfLogsInsertedPerHost,
  getNumberOfLogsInserted
};
