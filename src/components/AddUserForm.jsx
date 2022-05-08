import React from 'react';
import { useForm } from 'react-hook-form'

const AddUserForm = (props) => {

    const {
        reset,
        register, 
        handleSubmit, 
        formState: { errors }} = useForm();

    const onSubmit = (data) => {
        console.log(data)
        reset();
        props.addUser(data)
    }
 
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input type="text" name="name"  {...register("name", {
                required: {value: true, message: 'Debes asignar un name'}
            })}/>
            <div>
                {errors?.name?.message}
            </div>
            <label>Username</label>
            <input type="text" name="username"  {...register("username", {
            required: {value: true, message: 'Debes asignar un username'}
        })} />
            <div>
                {errors?.username?.message}
            </div>
            <button>Add new user</button>
        </form>
    );
}

export default AddUserForm;