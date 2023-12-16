import React from "react";
import { addNumber, counter, subtractNumber, addItem } from "../cartStore";
import toast from "react-hot-toast";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";

interface AddCartProps {
  children: React.ReactNode;
  prodId: string;
}

function AddCart({ children, prodId }: AddCartProps) {
  const $count = useStore(counter);

  const handleAdd = () => {
    toast.success("Successfully added to cart! " + prodId);
    addItem(prodId);
  };

  const handleSubtract = () => {
    toast.dismiss();
    toast.error("Successfully removed from cart! " + prodId);
    subtractNumber();
  };

  return (
    <>
      <div onClick={handleAdd}>{children}</div>
      <AnimatePresence>
        {$count !== 0 && (
          <motion.div
            initial={{ width: 0, padding: 0 }}
            animate={{ width: "300px", padding: "32px" }}
            exit={{ width: 0, padding: 0 }}
            transition={{ duration: 0.5, type: "tween" }}
            onClick={handleSubtract}
            className={`hover:bg-slate-100 select-none cursor-pointer border-l-2 h-full font-bold whitespace-nowrap overflow-hidden uppercase`}
          >
            Remove {$count} products to Cart
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AddCart;
