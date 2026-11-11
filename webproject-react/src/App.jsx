// Кореневий компонент застосунку «Хвиля»: каркас сторінки (шапка, вміст, підвал)
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { CatalogPage } from './pages/CatalogPage.jsx';

export default function App() {
  return (
    <>
      <Header active="Каталог" />
      <CatalogPage />
      <Footer />
    </>
  );
}
