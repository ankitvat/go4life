export async function POST(endpoint, body) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
