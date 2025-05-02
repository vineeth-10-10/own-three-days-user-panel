import Image from "../images/restaurent.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Row,Col} from 'react-bootstrap';
import CardCategory from "../layout/CardCategory";

const DashBoard = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://ownthreedays-default-rtdb.firebaseio.com/category.json"
        );
        const data = response.data;

        if (data) {
          const list = Object.keys(data).map((key) => {
            return {
              id: key,
              name: data[key].categoryName,
              imageUrl: data[key].imageUrl,
            };
          });
          setCategories(list);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (name) =>{
    navigate(`/category/${name}`);
  }
  

  return (
    <div>
      <img src={Image} alt="foodbanner" className="img-fluid rounded mb-4" />
      <div>
        <h1>Browse Through Menu</h1>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {categories.map((item) => (
            <Col key={item.id}>
              <CardCategory key={item.id} imageUrl={item.imageUrl} name={item.name} onCall={()=>handleCategoryClick(item.name)} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default DashBoard;
