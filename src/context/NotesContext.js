import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/db";

// Crear el contexto de las notas
export const NotesContext = createContext({});

export const NotesContextProvider = (props) => {
  // Obtener los valores iniciales para el contexto
  // se obtienen desde los props
  const { notes: initialNotes, children } = props;

  // Almacenar los valores en el estado
  const [notes, setNotes] = useState(initialNotes);
  const [note, setNote] = useState("");

  // Cargar u obtener las notas
  useEffect(() => {
    refreshNotes();
  }, []);

  const refreshNotes = () => {
    return database.getNotes(setNotes);
  };

  const addNewNote = async (note) => {
    await database.insertNotes(note, refreshNotes);
    return refreshNotes();
  };

  const getNoteById = (id) => {
    return database.getNoteById(id, setNote);

    console.log(response);

    // Obtener el valor de la primera posición del arreglo
    // const value = note[0];
    // setNote(value);

    // console.log(value);
    // console.log(note);
  };

  // Crear el objeto de contexto
  const notesContext = {
    notes,
    note,
    addNewNote,
    getNoteById,
  };

  // Pasar los valores al proveedor y retornarlo
  return (
    <NotesContext.Provider value={notesContext}>
      {children}
    </NotesContext.Provider>
  );
};
