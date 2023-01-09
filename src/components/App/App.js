import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from "../SignIn/SignIn";
import Movies from "../Movie/Movies";
import Header from "../Header/Header";
import Movie from "../Movie/Movie";
import Watchlist from "../Movie/Watchlist";

export default function App() {

	const isLogged = useSelector((state) => state.authenticate.isLogged);

	return (
		<div>
			<BrowserRouter>
				{isLogged && <Header />}
				<Routes>
					<Route exact path="/" element={isLogged ? <Movies /> : <Navigate to="/signin" />}></Route>
					<Route exact path="/signin" element={<SignIn />}></Route>
					<Route exact path="/movie/:id" element={isLogged ? <Movie /> : <Navigate to="/signin" />}></Route>
					<Route exact path="/watchlist" element={isLogged ? <Watchlist /> : <Navigate to="/signin" />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
