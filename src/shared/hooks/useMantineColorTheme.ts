import { ColorScheme, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";

export interface IMantineColorTheme {
    color_scheme?:ColorScheme
}
export function useMantineColorTheme({color_scheme="dark"}:IMantineColorTheme) {

    const [colorScheme, setColorScheme] = useState<ColorScheme>(color_scheme);
  
    const toggleColorScheme = (value?: ColorScheme) =>{
        return setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    }
    const dark = colorScheme === 'dark';
    return { colorScheme, toggleColorScheme, dark }
}
