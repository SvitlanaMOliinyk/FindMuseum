import React from "react";
import Goal from "../../components/Home-Page/Goal-Section/Goal";
import SearchingBar from "../../components/Home-Page/Searching-Bar/SearchingBar";
import MuseumList from "../../components/Home-Page/museum/MuseumList";

const Home = () => {
  return (
    <main>
      <Goal />
      <SearchingBar />
      <MuseumList />
    </main>
  );
};

export default Home;
