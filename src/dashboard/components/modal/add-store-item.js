import { useState } from "react";
import Modal, { closeModal } from "./index";
import Logger from "../../../modules/Logger";
import { dashboard } from "../../../../config.json";
import AlertMessage from "../AlertMessage";
import { useRouter } from "next/router";

const AddStoreItem = ({ guild }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [response, setResponse] = useState(null);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${dashboard.dashboardUrl}/api/guilds/${guild.id}/store`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            price,
          }),
        }
      );
      const data = await res.json();

      if (data.status === "success") {
        closeModal("addStoreItem");
        setName("");
        setPrice("");
        setResponse("");
        router.push(
          `/dashboard/${guild.id}/store?message=${name} was added to the store`
        );
      }

      setResponse(data);
    } catch (e) {
      Logger.error("add_store_item", e);
    }
  }

  return (
    <Modal id="addStoreItem" title="Add store item">
      {response?.error ? <AlertMessage message={response?.error} /> : null}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Enter Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Enter Price</label>
          <input
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="float-right">
          <button className="btn btn-primary" type="submit">
            Add item
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStoreItem;
