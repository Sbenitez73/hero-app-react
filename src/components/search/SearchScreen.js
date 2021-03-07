import React, { useMemo } from 'react'
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import HeroCard from '../heroes/HeroCard';
import { getHeroByName } from '../../selectors/getHeroByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse( location.search );
    console.log(q);
    
    const [formValue, handleInputChange] = useForm({
        searchHero: q
    });

    const {searchHero} = formValue;

    const heroesFiltered = useMemo(() => getHeroByName( q ), [ q ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`?q=${ searchHero }`);
    }

    return (
        <div>
            <h1>Search Hero</h1>
            <hr />
            <div className="row">
                <div className="col-12">
                    <form onSubmit={ handleSubmit }>
                        <div >
                            <input
                                type="text"
                                name="searchHero"
                                placeholder="Find your hero"
                                className="form-control"
                                onChange={ handleInputChange }
                                value={ searchHero }
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                className="btn m-1 btn-outline-primary"
                                style={{ float: 'right'}}
                            >
                                Search
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
            <div className="row animate__animated animate__fadeIn">
                <div className="col-12 ">
                    <h4> Results </h4>
                    <hr />

                    {
                        (q === '')
                            &&
                            <div className="alert alert-info">
                                Search a Hero
                            </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                            &&
                            <div className="alert alert-danger">
                                There is not a hero with { q }
                            </div>
                    }
                    
                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
