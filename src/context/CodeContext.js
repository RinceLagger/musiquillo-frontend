import React from "react";

const CodeContext = React.createContext({});



function CodeProvider({ children }) {
    const [code, setCode] = React.useState("");

    const defineCode = React.useCallback((code) =>{
      setCode(code);
    },[])


  return (
    <CodeContext.Provider value={{ code, defineCode }}>
      {children}
    </CodeContext.Provider>
  ); 
}

export default CodeProvider;

export function useCode() {
    return React.useContext(CodeContext);
  }