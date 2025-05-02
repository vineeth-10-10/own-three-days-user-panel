import recipe from "../images/recipe-banner.jpg";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {addToCart} from '../store/cartSlice';
import axios from "axios";

const RecipesPage = () => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://ownthreedays-default-rtdb.firebaseio.com/recipe.json"
        );
        const data = await response.data;

        if (data) {
          const recipeList = Object.keys(data)
            .filter((key) => data[key].categoryName === categoryName)
            .map((key) => ({
              id: key,
              name: data[key].recipeName,
              description: data[key].description,
              price: data[key].price,
              imageUrl: data[key].imageUrl,
              categoryName: data[key].categoryName,
            }));
          setRecipes(recipeList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, [categoryName]);

  const handleCartItems = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div>
      <img
        src={recipe}
        alt="recipe banner"
        className="img-fluid rounded mb-4"
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div>
        <h1 className="mb-4">{categoryName}</h1>
        {recipes.length === 0 ? (
          <p>No Recipes were added for this category</p>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {recipes.map((item) => (
              <Col key={item.id}>
                <Card
                  style={{
                    width: "20rem",
                    border: "none",
                    borderRadius: "15px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      filter: "brightness(95%)",
                    }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title
                      style={{ fontWeight: "600", fontSize: "1.5rem" }}
                    >
                      {item.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "1rem" }}>
                      {item.description}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "0.95rem" }}>
                      Price: ₹{item.price}
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={()=> handleCartItems(item)}
                    >
                      Add
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
