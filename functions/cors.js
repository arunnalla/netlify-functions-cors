const fetch = require("node-fetch");

const ACCESS_CONTROL_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

exports.handler = async (event, context) => {
  const [, url] = event.path.match(/^.*?cors\/?(.*)$/) || [event.path, ""];

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No url provided" }),
    };
  }

  try {
    const response = await fetch(API_ENDPOINT);
    const body = await response.json();
    const headers = { ...response.headers, ...ACCESS_CONTROL_HEADERS };

    return {
      statusCode: response.statusCode,
      headers,
      body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
