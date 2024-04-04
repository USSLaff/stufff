import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const ChessPlayers = ({ chessPlayers, setChessPlayers, setSelectedPlayer, setFetchPending, isFetchPending }) => {
    const navigate = useNavigate();
    const fetchPlayers = async () => {
        try {
            const response = await fetch('http://localhost:3001/chess')
            const data = await response.json()
            setChessPlayers(data)
        } catch (error) {
            console.error(error)
        } finally {
            setFetchPending(false)
        }
    }
    useEffect(() => {
        fetchPlayers()
    }, [isFetchPending])

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                    chessPlayers.map(player => (
                        <div key={player.id} className="card m-3" style={{ width: '18rem' }}>
                            <Link onClick={() => {
                                navigate(`/player/${player.id}`);
                            }} to={`/player/${player.id}`}> <img src={player.image_url ? player.image_url : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A píza képe xd" /></Link>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{player.name}</h5>
                                <hr />
                                <p className="card-text">Született: {player.birth_date}</p>
                                <p className="card-text">Világbajnokságot nyert: {player.world_ch_won}</p>

                                <div className="mt-auto">

                                    <Link to={`/updplayer/${player.id}`} className="btn btn-primary m-1"
                                        onClick={async () => {
                                            await setSelectedPlayer(player);
                                        }}>Módosítás</Link>
                                    <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" onClick={async () => {
                                        await setSelectedPlayer(player);
                                    }} className="btn btn-danger m-1">Törlés</button>
                                </div>
                            </div>
                        </div>
                    ))

            }
        </div>

    )
}
