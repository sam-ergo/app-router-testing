import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import Index from './routes';
import ErrorPage from './errorpage';
import BoardErrorPage from './boardErrorpage';
import Contact, {loader as contactLoader, action as contactAction} from './routes/contact';
import EditContact, { action as editAction } from "./routes/edit";
import BoardInfo, { boardLoader } from './routes/boardInfo';
import { action as destroyAction } from "./routes/destroy";
import Error404 from './404Error';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />} errorElement={<ErrorPage />} loader={rootLoader} action={rootAction}>
    <Route path='*' element={<Error404 />} />
    <Route index element={<Index />} />
    <Route path='boardInfo' 
    element={<BoardInfo />} 
    errorElement={<BoardErrorPage />} 
    loader={() => {
      const res = fetch(`http://localhost:3000/api/board/all`, {})
      .then((res) =>{
        console.log(res)
        if(res.error){
        throw new Response("", {
          status: 404,
          statusText: "Twaticus",
        })
      }});
      console.log(res)
      // if (res.status === 200) {
      //   throw new Response("", {
      //     status: 404,
      //     statusText: "Twaticus",
      //   });
      // }
      //return res.json()
    }} />
    <Route path='contacts/:contactId' element={<Contact />} loader={contactLoader} action={contactAction} />
    <Route path='contacts/:contactId/edit' element={<EditContact />} loader={contactLoader} action={editAction} />
    <Route path='contacts/:contactId/destroy' action={destroyAction} errorElement={<div>Oops! There was an error.</div>} />

  </Route>
))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
