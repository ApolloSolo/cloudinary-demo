import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CloudinaryUpload from "./pages/CloudinaryUpload";

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={"/upload_images"}>Upload Images</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/upload_images" element={<CloudinaryUpload />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
