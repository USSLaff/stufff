import React from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const PlayerPut = ({ setFetchPending, selectedPlayer, setSelectedPlayer }) => {
    const navigate = useNavigate();
    const param = useParams();

    const [formPendingFetch, setFormPendingFetch] = React.useState(true)

    const [name, setName] = React.useState("")
    const [birthdate, setBirthdate] = React.useState("")
    const [worldch, setWorldCH] = React.useState("")
    const [profileURL, setProfileURL] = React.useState("")
    const [imageURL, setImageURL] = React.useState("")



    const fetchData = async () => {
        await axios.get(`http://localhost:3001/chess/${param.id}`).then(async (response) => {
            await setSelectedPlayer(response.data);

            setName(response.data.name);
            setBirthdate(response.data.birth_date);
            setWorldCH(response.data.world_ch_won);
            setProfileURL(response.data.profile_url);
            setImageURL(response.data.image_url);


        }).finally(() => setFormPendingFetch(false));
    }

    useEffect(() => {
        fetchData();
    }, [formPendingFetch]);

    const Name = (e) => {
        setName(e.target.value)
    }

    const Birthdate = (e) => {
        setBirthdate(e.target.value)
    }

    const WorldCH = (e) => {
        setWorldCH(e.target.value)
    }


    const Profile = (e) => {
        setProfileURL(e.target.value)
    }

    const Image = (e) => {
        setImageURL(e.target.value)
    }

    return (
        <div className='container w-25 mt-5 border border-2 p-2 rounded-3'>
            <form onSubmit={async (e) => {
                e.preventDefault();
                e.persist();


                const updateData = {
                    name: name,
                    birth_date: birthdate,
                    world_ch_won: worldch,
                    profile_url: profileURL,
                    image_url: imageURL
                }

                await axios.put(`http://localhost:3001/chess/${param.id}`, updateData).then(async () => {
                    await setFetchPending(true);
                    navigate('/');
                });

            }}>
                <div className="mb-3">
                    <label htmlFor="nev" className="form-label">Játékos Neve</label>
                    <input onChange={Name} type="text" className="form-control" id="nev" defaultValue={name} />
                </div>

                <div className="mb-3">
                    <label htmlFor="birf" className="form-label">Játékos születési dátuma</label>
                    <input onChange={Birthdate} type="text" className="form-control" id="birf" defaultValue={birthdate} />
                </div>

                <div className="mb-3">
                    <label htmlFor="win" className="form-label">Játékos világbajnoksági győzelmei</label>
                    <input onChange={WorldCH} type="number" className="form-control" id="win" defaultValue={worldch} />
                </div>

                <div className="mb-3">
                    <label htmlFor="prof" className="form-label">Játékos profil url</label>
                    <input onChange={Profile} type="text" className="form-control" id="prof" defaultValue={profileURL} />
                </div>

                <div className="mb-3">
                    <label htmlFor="imgg" className="form-label">Játékos kép url</label>
                    <input onChange={Image} type="text" className="form-control" id="imgg" defaultValue={imageURL} />
                </div>

                <div className="mb-3">
                    <label htmlFor="previmg" className="form-label">Kép Preview</label>
                    <img id="previmg" className='rounded-3 mt-2 w-100' src={`${imageURL}`}></img>
                </div>

                <button type="submit" className="btn btn-success me-2">Mentés</button>
                <Link type="button" className="btn btn-warning" to="/">Vissza</Link>

            </form>
        </div>
    )
}
