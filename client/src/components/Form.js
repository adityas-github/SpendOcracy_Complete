// Form.jsx
import React from "react";
import { useForm } from "react-hook-form";
import List from "./List";
import { default as api } from "../store/apiSlice";
import OCRComponent from "./OCRComponent";

export default function Form() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    if (!data) {
      return {};
    }
    await addTransaction(data).unwrap();
    reset(); // Reset the form fields
  };

  const handleExtract = (extractedData) => {
    setValue("name", extractedData.name || "Unknnown");
    setValue("amount", extractedData.amount || "");
    setValue("type", "Expense"); // Set type to 'Expense' automatically
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name")}
              placeholder="Salary, House Rent, SIP"
              className="form-input"
            />
          </div>
          <select className="form-input" {...register("type")}>
            <option value="Investment">Investment</option>
            <option value="Expense" defaultValue>
              Expense
            </option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              {...register("amount")}
              type="text"
              placeholder="Amount"
              className="form-input"
            />
          </div>
          <OCRComponent onExtract={handleExtract} />
          <div className="submit-btn">
            <button className="border py-2 text-white bg-indigo-500 w-full">
              Make Transaction
            </button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
}
