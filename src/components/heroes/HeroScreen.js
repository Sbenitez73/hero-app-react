import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { getHeroesById } from '../../selectors/getHeroById';
import './HeroScreen.css'

export const HeroScreen = ({ history }) => {

    const { id } = useParams();
    const hero = useMemo(() => getHeroesById( id ), [ id ]);

    if ( !hero ) {
        return <Redirect to="/" />
    }

    const handleReturn = () => {
        if (history.length <= 2) {
            history.push('/');
        }
        history.goBack();
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;
     

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    src={`../assets/heroes/${ id }.jpg`}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                    alt={ superhero } 
                />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h1 className="text-center title-hero"> { superhero } </h1>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item title-hero"> <b> Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item title-hero"> <b> Publisher: </b> { publisher } </li>
                    <li className="list-group-item title-hero"> <b> First appearance: </b> { first_appearance } </li>
                    <li className="list-group-item title-hero"> <b> Characters: </b> { characters } </li>
                </ul>

                <button 
                    className="btn btn-outline-info float-right"
                    onClick={ handleReturn } >
                    Return
                </button>

            </div>


        </div>
    )
}

