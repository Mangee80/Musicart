import productsData from '../data/products.json';

const addAllProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/addProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productsData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Success:', result.message);
      console.log(`📦 Added ${productsData.length} products to database`);
    } else {
      console.error('❌ Error:', response.statusText);
    }
  } catch (error) {
    console.error('❌ Network Error:', error);
  }
};

// Run the function
addAllProducts(); 