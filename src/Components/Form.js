import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import Pizza from "./Pizza";
import * as yup from 'yup';

export  default function Form() {
    const defaultState = {
        name: ''
    }

    const [user, setUser] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState});
    const [disableButton, setDisableButton] = useState(true);

    let formSchema = yup.object().shape({
        name: yup.string().required('Please tell us your name').min(2, 'Names must be at least 2 letters'),
    });

    const validateChange = event => {
        event.persist();

        yup.reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                console.log('valid', valid);
                setErrors({...errors, [event.target.name]: ''})
            })
            .catch(error => {
                console.log('error', error);
                setErrors({...errors, [event.target.name]: error.errors[0]})
            });

        if(event.target.value.length === 0) {
            setErrors({...errors, [event.target.name]: `${event.target.name} is required`});
        }
    }

    useEffect(() => {
        formSchema.isValid(user).then(valid => setDisableButton(!valid));
    }, [formSchema, user]);

    const handleChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
        validateChange(event);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
        console.log('submittedUser', user);
        setUser(defaultState);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>
                    Name:
                    <input data-cy='name-fld' type='text' name='name' onChange={handleChange} errors={errors} />
                    {errors.name.length > 0 ? <p data-cy='name-err'>{errors.name}</p> : ''} 
                </label>
                <button data-cy='order-btn' disabled={disableButton}>Add to Order</button>
            </form>
            <Route path='/pizza' component={Pizza} />
        </div>
    );
}