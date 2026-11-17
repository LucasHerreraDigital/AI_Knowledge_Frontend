import { useEffect } from "react";
import { useThemeStore } from "../../store/theme.store";

interface ThemeProviderProps{
    children: React.ReactNode
}

const ThemeProvider = ({children}: ThemeProviderProps) =>{
    
    const theme = useThemeStore((state)=>state.theme)

    useEffect(()=>{
        const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)")

        const applyTheme = () =>{
            const isDark = theme === "dark" || (theme === "system" && mediaQuery.matches)
            document.documentElement.classList.toggle("dark",isDark) 
        }

        applyTheme()
        
        if(theme === "system"){
            mediaQuery.addEventListener("change",applyTheme)
        }

        return () =>{
            mediaQuery.removeEventListener("change",applyTheme)
        }

    },[theme])
    
    return <>{children}</>
}

export default ThemeProvider