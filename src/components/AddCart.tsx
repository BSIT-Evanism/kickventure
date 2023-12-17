import React from "react";
import {
  addNumber,
  counter,
  subtractNumber,
  addItem,
  cartItems,
  removeAllItems,
  removeSingleItem,
} from "../cartStore";
import toast from "react-hot-toast";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";

interface AddCartProps {
  children: React.ReactNode;
  prodId: string;
}

function AddCart({ children, prodId }: AddCartProps) {
  const $count = useStore(counter);
  const $cartItems = useStore(cartItems);

  const handleAdd = () => {
    toast.success("Successfully added to cart! " + prodId);
    addItem(prodId);
  };

  const handleSubtract = () => {
    toast.dismiss();
    toast.error("Successfully removed from cart! " + prodId);
    subtractNumber();
  };

  const handleRemove = () => {
    toast.dismiss();
    toast.error("Successfully removed from cart! " + prodId);
    removeAllItems(prodId);
  };

  const handleRemoveSingle = () => {
    toast.dismiss();
    toast.error("Successfully removed from cart! " + prodId);
    removeSingleItem(prodId);
  };

  return (
    <>
      <div onClick={handleAdd}>{children}</div>
      <AnimatePresence>
        {$cartItems?.filter((i) => i.name === prodId).length !== 0 && (
          <>
            <motion.div
              initial={{ width: 0, padding: 0 }}
              animate={{ width: "300px", padding: "32px" }}
              exit={{ width: 0, padding: 0 }}
              transition={{ duration: 0.5, type: "tween" }}
              onClick={handleRemove}
              className={`hover:bg-slate-100 select-none cursor-pointer border-l-2 h-full font-bold whitespace-nowrap overflow-hidden uppercase`}
            >
              Remove all {$cartItems.filter((i) => i.name === prodId)[0].count}{" "}
              products to Cart
            </motion.div>
            <motion.div
              initial={{ width: 0, padding: 0 }}
              animate={{ width: "300px", padding: "32px" }}
              exit={{ width: 0, padding: 0 }}
              transition={{ duration: 0.5, type: "tween" }}
              onClick={handleRemoveSingle}
              className={`hover:bg-slate-100 select-none cursor-pointer border-l-2 h-full font-bold whitespace-nowrap overflow-hidden uppercase`}
            >
              Remove 1 product to Cart
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default AddCart;
