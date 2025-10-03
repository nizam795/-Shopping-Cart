import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from './store/store.tsx'
import Modal from "react-modal";

Modal.setAppElement("#root");
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);



// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem('cart', JSON.stringify(state.cart.items));
// });