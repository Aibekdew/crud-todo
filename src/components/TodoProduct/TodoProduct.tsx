"use client";
import { FC, useState } from "react";
import scss from "./TodoProduct.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductQuery,
  usePostProductMutation,
} from "@/redux/api/data";

interface ITodo {
  id?: number | null;
  title: string;
  description: string;
  image: string;
}

const TodoProduct: FC = () => {
  const { reset, register, handleSubmit } = useForm<ITodo>();
  const [deleteProductMutation] = useDeleteProductMutation();
  const [editProductMutation] = useEditProductMutation();
  const [postProductMutation] = usePostProductMutation();
  const { data } = useGetProductQuery();
  const [isEdit, setIsEdit] = useState<ITodo>({
    description: "",
    image: "",
    title: "",
    id: null,
  });

  const editProduct = async () => {
    const edited: ITodo = {
      description: isEdit.description,
      image: isEdit.image,
      title: isEdit.title,
    };
    const { data: res } = await editProductMutation({
      id: isEdit.id!,
      edited: edited,
    });
    setIsEdit({
      description: "",
      image: "",
      title: "",
      id: null,
    });
  };

  const removeItem = async (id: number) => {
    const { data } = await deleteProductMutation(id);
  };

  const createProduct: SubmitHandler<ITodo> = async (data) => {
    const newTodo: ITodo = {
      description: data.description,
      image: data.image,
      title: data.title,
    };

    const res = await postProductMutation(newTodo);
    reset();
  };
  return (
    <section className={scss.TodoProduct}>
      <div className="container">
        <div className={scss.content}>
          <h1>ToDo Product</h1>
          {!isEdit.id ? (
            <div className="todo">
              <form onSubmit={handleSubmit(createProduct)}>
                <input
                  {...register("image", { required: true })}
                  type="text"
                  placeholder="Image"
                />
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Title"
                />
                <input
                  {...register("description", { required: true })}
                  type="text"
                  placeholder="Description"
                />
                <button type="submit">Create</button>
              </form>
              <div className="todos">
                {data?.res.map((el) => (
                  <div key={el.id} className="block">
                    <img src={el.image} alt="ima" width={300} height={200} />
                    <h1>{el.title}</h1>
                    <h6>{el.description}</h6>
                    <button onClick={() => removeItem(el.id)}>Delete</button>
                    <button
                      onClick={() => {
                        setIsEdit({
                          description: el.description,
                          image: el.image,
                          title: el.title,
                          id: el.id,
                        });
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(editProduct)}>
              <input
                onChange={(e) =>
                  setIsEdit({ ...isEdit, image: e.target.value })
                }
                value={isEdit.image}
                type="text"
                placeholder="Image"
              />
              <input
                onChange={(e) =>
                  setIsEdit({ ...isEdit, title: e.target.value })
                }
                value={isEdit.title}
                type="text"
                placeholder="Title"
              />
              <input
                onChange={(e) =>
                  setIsEdit({ ...isEdit, description: e.target.value })
                }
                value={isEdit.description}
                type="text"
                placeholder="Description"
              />
              <button type="submit">Edit Ptoduct</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default TodoProduct;
