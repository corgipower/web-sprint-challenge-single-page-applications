import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import Pizza from "./Pizza";
import * as yup from 'yup';

export  default function Form() {
    const defaultState = {
        name: '',
        size: '',
        pepperoni: 0,
        peppers: 0,
        sausage: 0,
        pineapple: 0,
        instructions: '',
    }

    const [user, setUser] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState});
    const [disableButton, setDisableButton] = useState(true);
    const size = [6, 10, 12, 16];

    let formSchema = yup.object().shape({
        name: yup.string().required('Please tell us your name').min(2, 'Names must be at least 2 letters'),
        size: yup.number().required('Choose a size').oneOf(size, 'Choose a size'),
        pepperoni: yup.boolean(),
        peppers: yup.boolean(),
        sausage: yup.boolean(),
        pineapple: yup.boolean(),
        instructions: yup.string(),
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
        const targetValue =
        event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setUser({
            ...user,
            [event.target.name]: targetValue
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
                    <input data-cy='name-fld' type='text' name='name' onChange={handleChange} value={user.name} errors={errors} />
                    {errors.name.length > 0 ? <p data-cy='name-err'>{errors.name}</p> : ''} 
                </label>
                <label htmlFor='size'>
                    Pizza Size:
                    <select data-cy='size-fld' name='size' onChange={handleChange} value={user.size}>
                        <option value=''>Choose a size:</option>
                        {size.map((s, i) => 
                            <option value={s} key={i}>{s}</option>
                        )}
                    </select>
                </label>
                <label htmlFor='pepperoni'>
                    Pepperoni:
                    <input data-cy='pepperoni-fld' name='pepperoni' type='checkbox' value={user.pepperoni} onChange={handleChange} checked={user.pepperoni} />
                </label>
                <label htmlFor='peppers'>
                    Peppers:
                    <input data-cy='peppers-fld' name='peppers' type='checkbox' value={user.peppers} onChange={handleChange} checked={user.peppers} />
                </label>
                <label htmlFor='sausage'>
                    Sausage:
                    <input data-cy='sausage-fld' name='sausage' type='checkbox' value={user.sausage} onChange={handleChange} checked={user.sausage} />
                </label>
                <label htmlFor='pineapple'>
                    Pineapple:
                    <input data-cy='pineapple-fld' name='pineapple' type='checkbox' value={user.pineapple} onChange={handleChange} checked={user.pineapple} />
                </label>
                <label htmlFor='instructions'>
                    Additional Instructions:
                    <input data-cy='instructions-fld' name='instructions' type='textarea' value={user.instructions} onChange={handleChange} />
                </label>
                <button data-cy='order-btn' disabled={disableButton}>Add to Order</button>
            </form>
            <Route path='/pizza' component={Pizza} />
        </div>
    );
}