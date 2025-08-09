import React,{Suspense} from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Styles from "./App.module.css";
import HomePage from "./pages/Home/Home";

const rootes = {
    "/": HomePage
}

const App = ()=>{
    return(
        <HashRouter>
            <Layout>
                <Suspense fallback = {<div>loading...</div>}>
                    <Routes>
                        <Roote path="/" element={<HomePage/>}/>
                        {Object.entries(rootes).map(([path,Component])=>{
                            <Route key={path} path={path} element={<Component/>}/>
                        })}
                    </Routes>
                </Suspense>
            </Layout>
        </HashRouter>
    )
}
export default App
