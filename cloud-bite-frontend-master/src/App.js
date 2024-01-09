import "./App.css";
import { useQuery, useMutation } from "react-query";
import axios from "axios";


function App() {
  const imageBucketUrl = process.env.IMAGE_BUCKET_URL;
  const backendUrl = process.env.REACT_APP_API_URL;

  console.log("imageBucketUrl: ", imageBucketUrl);
  console.log("backendUrl: ", backendUrl);

  const fetchMenu = async () => {
    return await axios.get(`${backendUrl}/menu`).then((response) => response.data);
  };

  const { data, error, isLoading } = useQuery(`${backendUrl}/menu`, fetchMenu);


  const orderMutation = useMutation((order) =>
    axios.post(`${backendUrl}/order`, order)
  );

  if (isLoading) {
    return <div>Server is not up...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const handlePlaceOrder = (item) => {
    orderMutation.mutate(item);
  };

  return (
    <div className="container">
      <img className="background-image" src="https://rentspace.dk/wp-content/uploads/Restaurant-Herkomst1-Rentspace-JPEG.jpeg" alt="restourant" /> 
      <h1>Menu</h1>
      <div className="vert-scroll">
      {data.map((food) => (
        <div className="two-x-one-grid">
          <div className="item-header">{food.name} - {food.price},-</div>
          <button className="purchase-item-button" onClick={() => handlePlaceOrder(food)}>Add to cart</button>
          <img className="item-image" src={`${imageBucketUrl}/${food.name}.png`} alt={food.name + " image"} />
        </div>
      ))}
      <h4 className="footer">Provided with generosity by Goblin Corp™</h4>
      <h4 className="header">1.0.1-alpha</h4>
      </div>
    </div>
  );
}

export default App;
