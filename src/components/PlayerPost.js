import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

export const PlayerPost = ({ setFetchPending }) => {
    const navigate = useNavigate();
    return (
        <div className='container w-25 mt-5 border border-2 p-2 rounded-3'>
            <form onSubmit={async (e) => {
                e.preventDefault();
                e.persist();

                const postData = {
                    name: e.target.nev.value,
                    birth_date: e.target.birf.value,
                    world_ch_won: e.target.win.value,
                    profile_url: e.target.prof.value,
                    image_url: e.target.imgg.value
                }

                await axios.post('https://chess.sulla.hu/chess/', postData).then(async () => {
                    await setFetchPending(true);
                    navigate('/');
                });

            }}>
                <div className="mb-3">
                    <label htmlFor="nev" className="form-label">Játékos Neve</label>
                    <input type="text" className="form-control" id="nev"  />
                </div>

                <div className="mb-3">
                    <label htmlFor="birf" className="form-label">Játékos születési dátuma</label>
                    <input type="text" className="form-control" id="birf" />
                </div>

                <div className="mb-3">
                    <label htmlFor="win" className="form-label">Játékos világbajnoksági győzelmei</label>
                    <input type="number" className="form-control" id="win" />
                </div>

                <div className="mb-3">
                    <label htmlFor="prof" className="form-label">Játékos profil url</label>
                    <input type="text" className="form-control" id="prof"  />
                </div>

                <div className="mb-3">
                    <label htmlFor="imgg" className="form-label">Játékos kép url</label>
                    <input  type="text" className="form-control" id="imgg" />
                </div>

                <div className="mb-3">
                    <label htmlFor="previmg" className="form-label">Kép Preview</label>
                    <img id="previmg" className='rounded-3 mt-2 w-100' onChange={() => { document.getElementById("previmg").src = document.getElementById('pizzaKepURL').value /*ew wtf*/ }}></img>
                </div>

                <button type="submit" className="btn btn-success me-2">Mentés</button>
                <Link type="button" className="btn btn-warning" to="/">Vissza</Link>

            </form>
        </div>
    )
}
