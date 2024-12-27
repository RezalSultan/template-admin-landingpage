import HomeLayout from "@/Layouts/HomeLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Home = () => {
  return (
    <HomeLayout>
      <Head title="Beranda" />
      <div>Home</div>
    </HomeLayout>
  );
};

export default Home;
