import { Card, Button } from 'react-bootstrap';

export default function CardCategory({ imageUrl, name, onCall }) {
  return (
    <Card
      className="category-card"
      style={{
        width: '20rem',
        border: 'none',
        borderRadius: '15px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
    >
      <Card.Img
        variant="top"
        src={imageUrl}
        style={{
          height: '200px',
          objectFit: 'cover',
          filter: 'brightness(95%)',
        }}
      />
      <Card.Body className="text-center">
        <Card.Title style={{ fontWeight: '600', fontSize: '1.2rem' }}>
          {name}
        </Card.Title>
        <Card.Text className="text-muted" style={{ fontSize: '0.95rem' }}>
          Explore delicious options in this category.
        </Card.Text>
        <Button variant="primary" onClick={onCall} style={{ backgroundColor: '#ff6f61', border: 'none' }}>
          View Recipes
        </Button>
      </Card.Body>
    </Card>
  );
}
