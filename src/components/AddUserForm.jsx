import React from 'react';
import { useForm } from 'react-hook-form'

const AddUserForm = (props) => {

    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = (data, e) => {
        console.log(data)

        props.addUser(data)

        //Limpiar campos
        e.target.reset();
    }
 
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input type="text" name="name"  {...register("name", {
                required: {value: true, message: 'Debes tener un name'}
            })}/>
            <div>
                {errors?.name?.message}
            </div>
            <label>Username</label>
            <input type="text" name="username"  {...register("username", {
            required: {value: true, message: 'Debes tener un username'}
        })} />
            <div>
                {errors?.username?.message}
            </div>
            <button>Add new user</button>
        </form>
    );
}

export default AddUserForm;