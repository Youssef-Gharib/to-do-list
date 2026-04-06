import { createContext, useContext, useState } from "react";
import MySnackBar from "../Component/MySnackBar";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  function showHideToast(msg, type = "success") {
    setOpen(true);
    setMessage(msg);
    setSeverity(type);

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{showHideToast}}>
      <MySnackBar open={open} message={message} severity={severity} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = ()=> {
    return useContext(ToastContext)
}