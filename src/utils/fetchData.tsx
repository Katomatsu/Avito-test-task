export const fetchData = async (url: string, signal?: AbortSignal) => {
	try {
		const response = await fetch(url, { signal });

		if (!response.ok) {
			const error = `Error fetching data from the API. Status: ${response.status}. ${response.statusText}`;

			return error;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			console.error(error.message);
      return 
		} else if (error instanceof Error) {
			const parseError = `Oops something went wrong: ${error.message}`;
			return parseError
			// throw parseError
			// return parseError;
		} else {
			const unknownError = `Unknown error occurred: ${error}`;
			return unknownError;
		}
	}
};
