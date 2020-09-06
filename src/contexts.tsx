import React from 'react'

interface Theme {
    color: string;
    background: string;
}

interface IThemeProps {
    [key: string]: Theme
}

export const themes: IThemeProps = {
    'light': {
        color: '#000',
        background: '#eee'
    },
    'dark': {
        color: '#fff',
        background: '#222'
    }
}

export default React.createContext<Theme>(themes.light);
