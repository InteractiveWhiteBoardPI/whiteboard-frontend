import React from "react";
import CreationSessionForm from "../components/session/creation/create-session-form.component";
import { Route, Routes } from "react-router-dom";
import CreationWrapper from "../components/session/creation/creation-wrapper.component";
import UrlSession from "../components/session/creation/copy-session-link.component";

const CreateSession = () => {
  return (
    <Routes>
      <Route path="" element={<CreationWrapper/>}>
        <Route path="/new" element={<CreationSessionForm/>}/>
        <Route path="/copy-link" element={<UrlSession/>} />
      </Route>
    </Routes>
  );
};
export default CreateSession;
