import React from "react";
import { useForm } from "react-hook-form";

const EditUserForm = (props) => {
  //Actualiza los datos del usuario

  const {
    reset, 
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: props.currentUser,
  });

  setValue("name", props.currentUser.name);
  setValue("username", props.currentUser.username);

  const onSubmit = (data) => {
    console.log(data);

    data.id = props.currentUser.id;
    props.updateUser(props.currentUser.id, data);

    //limpiar campos
   reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input type="text" {...register("name", { required: true })} />
      <span className="text-danger text-small d-block mb-2">
        {errors.name && "Este campo es obligatorio"}
      </span>
      <label>Username</label>
      <input type="text" {...register("username", { required: true })} />
      <span className="text-danger text-small d-block mb-2">
        {errors.username && "Este campo es obligatorio"}
      </span>
      <button >Edit user</button>
    </form>
  );
};

export default EditUserForm;