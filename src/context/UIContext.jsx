import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    content: null,
  });

  const notify = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast(msg),
    promise: (promise, msgs) => toast.promise(promise, msgs),
  };

  const openModal = (title, content) =>
    setModal({ visible: true, title, content });
  const closeModal = () =>
    setModal({ visible: false, title: "", content: null });

  return (
    <UIContext.Provider
      value={{
        loading,
        setLoading,
        modal,
        openModal,
        closeModal,
        notify,
      }}
    >
      <LoadingOverlay />
      <GlobalModal />
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);

const LoadingOverlay = () => {
  const { loading } = useUI();
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-bg px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
        <div className="w-6 h-6 border-4 border-border border-t-primary rounded-full animate-spin" />
        <span className="text-text font-medium">Yükleniyor...</span>
      </div>
    </div>
  );
};

const GlobalModal = () => {
  const { modal, closeModal } = useUI();
  if (!modal.visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark/40">
      <div className="bg-bg-soft rounded-2xl shadow-xl w-11/12 max-w-md p-6 relative animate-fade-in">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-text-secondary hover:text-text"
        >
          ✕
        </button>
        {modal.title && (
          <h2 className="text-lg font-semibold mb-4">{modal.title}</h2>
        )}
        <div>{modal.content}</div>
      </div>
    </div>
  );
};
