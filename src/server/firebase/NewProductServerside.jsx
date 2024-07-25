import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebaseConfig";
import { toaster } from "evergreen-ui";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {v6 as uuid} from 'uuid'
export const error = {
  name: {
    required: "Name is required",
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters long",
    },
    maxLength: {
      value: 20,
      message: "Name must be at most 20 characters long",
    },
  },
  description: {
    required: "Description is required",
    minLength: {
      value: 3,
      message: "Description must be at least 3 characters  long",
    },
    maxLength: {
      value: 100,
      message: "Description must be at most 100 characters long",
    },
  },

  category: {
    required: { value: true, message: "Category is required" },
  },
  brand: {
    required: "brand is required",
    minLength: {
      value: 3,
      message: "brand must be at least 3 characters long",
    },
    maxLength: {
      value: 20,
      message: "brand must be at most 20 characters long",
    },
  },
  price: {
    required: "Price is required",
    min: {
      value: 1,
      message: "Price must be at least 1 quantity long",
    },
  },
  quantity: {
    required: "quantity is required",
    min: {
      value: 1,
      message: "quantity must be at least 1 quantity long",
    },
  },
};
const handleImageUpload = async (file, data) => {
  const storageRef = ref(storage, `products/${data.name}/${file.name}`);
  await uploadBytes(storageRef, file);
};
const submitProduct = async (data, downloadURLs) => {
  try {
    const details = {
      id: uuid(),
      created_at: serverTimestamp(),
      product: data.name,
      description: data.description,
      category: data.category,
      brand: data.brand,
      price: parseInt(data.price),
      quantity: parseInt(data.quantity),
      img: downloadURLs,
    };
    await setDoc(doc(db, "products", data.name), details);
    toaster.success("Product added successfully!");
    
  } catch (error) {
    toaster.warning(error.message);
  }
};
const fetchDownloadURLs = async (data, setImages) => {
  try {
    const storageRef = ref(storage, `products/${data.name}`);
    const res = await listAll(storageRef);
    const downloadURLs = await Promise.all(
      res.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return url;
      })
    );
    setImages(downloadURLs);
    await submitProduct(data, downloadURLs);
  } catch (error) {
    toaster.danger(error.message);
  }
};

const onSubmit = async (data, files, setImages, setLoading) => {
  try {
    setLoading(true);
    if (files) {
      await Promise.all(files.map((file) => handleImageUpload(file, data)));
    }

    await fetchDownloadURLs(data, setImages);

    setLoading(false)
    toaster.success("Product added successfully!");
  } catch (error) {
    toaster.danger("Not successful", error.message);
  } finally {
    setLoading(false)
    toaster.notify("Completed");
  }
};

export default onSubmit