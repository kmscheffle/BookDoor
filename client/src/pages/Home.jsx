import BookList from "../components/BookList";
import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <BookList />
      {/* <Cart /> */}
    </div>
  );
};

export default Home;