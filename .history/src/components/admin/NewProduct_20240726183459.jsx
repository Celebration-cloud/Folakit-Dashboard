/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import styles from "./NewProduct.module.css";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FileUploaders from "./FileUploaders";
import onSubmit, { error } from "../../server/firebase/NewProductServerside";
import Spinner from "../reuseable/spinner/Spinner";
function NewProduct() {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      category: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        description: "",
        category: "",
        brand: "",
        price: 0,
        quantity: 0,
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div className={styles.container}>
      {loading && <Load}
      <h6>Add New Product</h6>
      <br />
      <hr />
      <br />
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(data, files, setImages, setLoading)
        )}
        className={styles.form}
      >
        <section className={styles.formInput}>
          <div className={styles.part1}>
            <TextField
              id="outlined-basic"
              label="Name"
              {...register("name", {
                required: error.name.required,
                maxLength: error.name.maxLength,
                minLength: error.name.minLength,
              })}
              fullWidth
              error={errors?.name}
              variant="outlined"
              helperText={
                errors?.name && <span role="alert">{errors?.name.message}</span>
              }
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              {...register("description", {
                required: error.description.required,
                maxLength: error.description.maxLength,
                minLength: error.description.minLength,
              })}
              error={errors?.description}
              multiline
              fullWidth
              maxRows={5}
              helperText={
                errors?.description && (
                  <p role="alert">{errors?.description.message}</p>
                )
              }
            />
            <FormControl error={errors?.category} fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Controller
                name="category"
                control={control}
                rules={{
                  required: error.category.required,
                }}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...field}
                    label="Category"
                  >
                    <MenuItem value="Men's clothes">Men's clothes</MenuItem>
                    <MenuItem value="Women's clothes">Women's clothes</MenuItem>
                    <MenuItem value="Jewelry">Jewelry</MenuItem>
                    <MenuItem value="Shoes">Shoes</MenuItem>
                  </Select>
                )}
              />
              {errors?.category && (
                <FormHelperText>
                  <p role="alert">{errors?.category.message}</p>
                </FormHelperText>
              )}
            </FormControl>

            <FileUploaders image={setFiles} />
          </div>
          <div className={styles.part2}>
            <TextField
              id="outlined-basic"
              label="Brand"
              error={errors?.brand}
              {...register("brand", {
                required: error.brand.required,
                maxLength: error.brand.maxLength,
                minLength: error.brand.minLength,
              })}
              fullWidth
              variant="outlined"
              helperText={
                errors?.brand && <p role="alert">{errors?.brand.message}</p>
              }
            />
            <FormControl fullWidth>
              <InputLabel
                error={!!errors?.price}
                htmlFor="outlined-adornment-amount"
              >
                Sale Price
              </InputLabel>
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "Sale Price is required",
                  min: {
                    value: 0,
                    message: "Sale Price must be greater than or equal to 0",
                  },
                }}
                render={({ field }) => (
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    {...field}
                    type="number"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Sale Price"
                    error={!!errors?.price}
                  />
                )}
              />
              {errors?.price && (
                <FormHelperText error={!!errors?.price}>
                  <p role="alert">{errors?.price.message}</p>
                </FormHelperText>
              )}
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Quantity"
              error={errors?.quantity}
              {...register("quantity", {
                required: error.quantity.required,
                min: error.quantity.min,
              })}
              type="number"
              fullWidth
              variant="outlined"
              helperText={
                errors?.quantity && (
                  <p role="alert">{errors?.quantity.message}</p>
                )
              }
            />
          </div>
        </section>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
