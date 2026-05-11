import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import CartCotextProvider from './components/CartCotextProvider.jsx';

function App() {

  return (
    <CartCotextProvider>
      <Header/>
      <Shop>
      {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartCotextProvider>
  );
}

export default App;
