import axios from 'axios';

export const fetchData = async (options, sorting) => {
  console.log('sorting', sorting);

  const { pageIndex, pageSize } = options;

  // If sorting exists, map it to the format `name:asc` or `name:desc` and ensure it's passed as an array
  const sortParams = sorting.map(sort => `${sort.id}:${sort.desc ? 'desc' : 'asc'}`);

  

  try {
    const response = await axios.get('http://127.0.0.1:8001/products', {
      params: {
        length: pageSize, // Map `pageSize` to `length`
        start: pageIndex * pageSize, // Map `pageIndex` to `start` and adjust accordingly
        sort: sortParams, // Pass the array of sorting fields as a query parameter
         search: 'Esperanza'
      },
    });

    return {
      rows: response.data.data, // Assuming your Laravel API returns the data under the `data` key
      pageCount: Math.ceil(response.data.total / pageSize), // Assuming your API response includes a `total` field for total records
      rowCount: response.data.recordsTotal, // Total number of records in the dataset
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      rows: [],
      pageCount: 0,
      rowCount: 0,
    };
  }
};

