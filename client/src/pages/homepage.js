import { checkLoginStatus } from "../auth";
import AllProducts from "../components/all_products/all_products";
import NavBar from "../components/nav_bar/nav_bar";
import { useState, useEffect } from "react";

const HomePage = () => {
    return (
        <>
            <NavBar/>
            <AllProducts />
        </>
    )
}
export default HomePage;