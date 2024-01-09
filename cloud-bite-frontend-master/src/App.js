import "./App.css";
import { useQuery, useMutation } from "react-query";
import axios from "axios";


function App() {
  const imageBucketUrl = "https://storage.googleapis.com/cloud-frontend-images-bucket";
  const backendUrl = process.env.REACT_APP_API_URL;

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
      <h4 className="header">1.0.4-alpha</h4>
      <img className="background-image" src="https://rentspace.dk/wp-content/uploads/Restaurant-Herkomst1-Rentspace-JPEG.jpeg" alt="restourant" /> 
      <h1>Menu</h1>
      <div className="vert-scroll">
      {data.map((food) => (
        <div className="two-x-one-grid">
          <img className="item-image" src={`${imageBucketUrl}/${food.name}.png`} alt={food.name + " image"} />
          <div className="item-header">
            <p className="item-name">{food.name} - {food.price},-</p>
            <button className="purchase-item-button" onClick={() => handlePlaceOrder(food)}>Add to cart</button>
          </div>
        </div>
      ))}
      <h4 className="footer">Provided with generosity by Goblin Corp™</h4>
      </div>
    </div>
  );
}

export default App;
