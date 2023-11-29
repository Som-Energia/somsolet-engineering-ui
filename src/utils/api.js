import axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxMjUzMDAwLCJpYXQiOjE3MDEyNTEyMDAsImp0aSI6IjQzMzVjYzI3MzNhZDQ2ZTQ5MTAwMWQ2NTdiOWE1Y2QxIiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiJURVNUIiwibmFtZSI6IiIsImVtYWlsIjoianVhbnBlLnNhbmNoZXpAc29tZW5lcmdpYS5jb29wIn0.sQ5Oi4phn_u7kEU4lHFWPid8L5cX0cKJlY-98yANZJo";
const { REACT_APP_API_BASE_URL } = process.env;

export const sendContact = async () => {
  return axios({
    method: "POST",
    url: `${REACT_APP_API_BASE_URL}contact/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response;
  });
};

export const sendIncidence = async () => {
  return axios({
    method: "POST",
    url: `${REACT_APP_API_BASE_URL}incidence/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response;
  });
};
