import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout as WebsiteLayout} from './Website/Layout/Layout';
import { Layout as AdminLayout} from './Admin/Layout/Layout';

import { Home } from './Website/Home/Home';
import { ProductView } from './Website/ProductView';
import { CartView } from './Website/CartView';
import { Dashboard } from './Admin/Dashboard';
import { ListProduct } from './Admin/Product/ListProduct';
import { CreateProduct } from './Admin/Product/CreateProduct';


function App() {
  return (
    <Router >
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route  path="product/1" element={<ProductView />} />
        <Route  path="carts" element={<CartView />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route  index element={<Dashboard />} />
        <Route  path="product/create" element={<CreateProduct />} />
        <Route  path="product" element={<ListProduct />} />


      </Route>
    </Routes>
  </Router>
  );
}

export default App;
