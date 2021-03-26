import React from "react";

const SongContext = React.createContext({});

function SongProvider({ children }) {
  const [songs, setSongs] = React.useState([]);

  const defineSongs = (songs) => {
    setSongs(songs);
  };

  return (
    <SongContext.Provider value={{ songs, defineSongs }}>
      {children}
    </SongContext.Provider>
  );
}

export default SongProvider;

export function useSongs() {
  return React.useContext(SongContext);
}
