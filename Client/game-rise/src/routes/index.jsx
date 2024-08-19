import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "../../pages/RegisterPage";
import MainLayout from "../components/MainLayout";
import PubHomePage from "../../pages/PubHomePage";
import LoginPage from "../../pages/LoginPage";
import PubDetailPage from "../../pages/PubDetailPage";
import HomePage from "../../pages/HomePage";
import DetailPage from "../../pages/DetailPage";
import DeveloperPages from "../../pages/DeveloperPages";
import AddGames from "../../pages/AddGames";
import EditPage from "../../pages/EditPages";
import MyLibrary from "../../pages/MyLibrary";
import MyGames from "../../pages/MyGames";

const loader = () => {
  if (!localStorage.access_token) {
    return redirect('/login')
  }
  return null
}
const loaderDeveloper = () => {
  const role = localStorage.getItem('role'); 
  if (role !== "Developer") {
    return redirect('/homepage');
  }
  return null;
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <PubHomePage />,
      },
      {
        path: "/pub/games/:id",
        element: <PubDetailPage />,
      },
      {
        path: "/homepage",
        element: <HomePage />,
        loader: loader
      },
      {
        path: "/mylibrary",
        element: <MyLibrary />,
        loader: loader
      },
      {
        path: "/games/:id",
        element: <DetailPage />,
        loader: loader
      },
      {
        path: "/mygames",
        element: <MyGames />,
        loader: loader
      },
      {
        path: "/devpage",
        element: <DeveloperPages />,
        loader: loaderDeveloper
      },
      {
        path: "/addgames",
        element: <AddGames />,
        loader: loaderDeveloper
      },
      {
        path: "/editgames/:id",
        element: <EditPage />,
        loader: loaderDeveloper
      },
    ],
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
