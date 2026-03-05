import { useState } from "react";
import React from "react"
import { createContext } from "react";

export const FontSizeContext = createContext({
    fontSize: 18,
    setFontSize: (size: number) => { },
});

export const FontSizeProvider = ({ children }: any) => {
    const [fontSize, setFontSize] = useState(18);

    return (
        <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

//TO CHANGE FONT OF ANY SCREEN, ADD THE FOLLOWING:
//CHECK TEXTSIZE.TSX FOR EXMAPLE

//import { useContext } from "react";
//import { FontSizeContext } from "./FontSize";
//const { fontSize, setFontSize } = useContext(FontSizeContext);
//<Text style={{ fontSize }}>Hello</Text>