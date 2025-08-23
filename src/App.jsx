import React, { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Styles from "./App.module.css";
import HomePage from "./pages/Home/Home";
import UseStatePage from './pages/usestate/usestate';

const rootes = {
  "/": HomePage,
  "/usestate": UseStatePage,
};

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {Object.entries(rootes).map(([path, Component]) => {
              return <Route key={path} path={path} element={<Component />} />;
            })}
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
};

export default App;
