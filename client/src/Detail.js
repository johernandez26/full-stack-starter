import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();

  const [data, setData] = useState();

  useEffect(
    function () {
      if (id) {
        fetch(`https://api.airtable.com/v0/appus4MXqxbsmjnr4/Housing/${id}?api_key=key309nYuJUFaRtms`)
          .then((response) => response.json())
          .then((data) => setData(data));
      }
    },
    [id]
  );

  return (
    <main className="container">
      <h1>{data?.fields?.Title}</h1>
      <p>{JSON.stringify(data)}</p>
    </main>
  );
}
export default Detail;
