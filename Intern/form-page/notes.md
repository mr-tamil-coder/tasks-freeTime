- npm install -D @hookform/devtools

```javascript
    import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; 
function Training() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();
  console.log(errors);
  console.log("register " ,register)
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />

      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
      <DevTool control={control} /> 
    </form>
  );
}

export default Training;


```

- dirty means : value changed
- touched means : interactive (when i click submit it changing )
- no validation in react js..