import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import React from 'react';
import { ChessPlayers } from './components/ChessPlayers';
import { PlayerSelect } from './components/PlayerSelect.js';
import { PlayerPut }    from './components/PlayerPut.js';
import { PlayerPost } from './components/PlayerPost.js';
import { DeleteConfirmModal } from './components/DelModal.js';

function App() {

  const [chessPlayers, setChessPlayers] = React.useState([]);
  const [isFetchPending, setFetchPending] = React.useState(true)
  const [selectedPlayer, setSelectedPlayer] = React.useState({});

  //
  //
  //
  //

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<ChessPlayers chessPlayers={chessPlayers} setChessPlayers={setChessPlayers} setSelectedPlayer={setSelectedPlayer} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />} />
        <Route path={"/player/:id"} element={<PlayerSelect selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />} />
        <Route path={"/updPlayer/:id"} element={<PlayerPut selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />} />
        <Route path={"/addPlayer"} element={<PlayerPost  setFetchPending={setFetchPending} />} />
      </Routes>
      <DeleteConfirmModal selectedPlayer={selectedPlayer} setFetchPending={setFetchPending} />
    </BrowserRouter>
  );
}

export default App;
