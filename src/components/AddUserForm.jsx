import React from "react";
import { useForm } from "react-hook-form";

const AddUserForm = (props) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset();
    console.log(data);
    props.addUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input type="text" {...register("name", { required: true })} />
      <div className="text-danger text-small d-block mb-2">
        {errors.name && "Este campo es obligatorio"}
      </div>
      <label>Username</label>
      <input type="text" {...register("username", { required: true })} />
      <div className="text-danger text-small d-block mb-2">
        {errors.username && "Este campo es obligatorio"}
      </div>
      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;
