import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export const PlayerSelect = ({ selectedPlayer, setSelectedPlayer }) => {
    const navigate = useNavigate();
    const param = useParams();



    const [isFetchPending, setFetchPending] = React.useState(true)

    const fetchData = async () => {
        await axios.get(`https://chess.sulla.hu/chess/${param.id}`).then(async (response) => {
            await setSelectedPlayer(response.data);
        }).finally(() => setFetchPending(false));
    }

    useEffect(() => {
        fetchData();
    }, [isFetchPending]);

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div>
                    :
                    <div key={selectedPlayer.id} className="card m-3" style={{ width: '18rem' }}>
                        <Link onClick={() => {
                            navigate(`/player/${selectedPlayer.id}`);
                        }} to={`/player/${selectedPlayer.id}`}> <img src={selectedPlayer.image_url ? selectedPlayer.image_url : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A píza képe xd" /></Link>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{selectedPlayer.name}</h5>
                            <hr />
                            <p className="card-text">Született: {selectedPlayer.birth_date}</p>
                            <p className="card-text">Világbajnokságot nyert: {selectedPlayer.world_ch_won}</p>

                            <div className="mt-auto">

                                <Link to={`/updplayer/${selectedPlayer.id}`} className="btn btn-primary m-1"
                                    onClick={async () => {
                                        await setSelectedPlayer(selectedPlayer);
                                    }}>Módosítás</Link>
                                <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" onClick={async () => {
                                    await setSelectedPlayer(selectedPlayer);
                                }} className="btn btn-danger m-1">Törlés</button>
                            </div>
                        </div>
                    </div>
            }
        </div>


    )
}

