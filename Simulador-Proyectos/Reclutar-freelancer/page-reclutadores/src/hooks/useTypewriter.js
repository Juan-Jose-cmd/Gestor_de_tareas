import { useState, useEffect } from 'react'

export const useTypewriter = (text, speed = 50, delay = 0) => {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(false) // Cambiado a false inicialmente

    useEffect(() => {
        let timer
        
        if (currentIndex <= text.length) {
            timer = setTimeout(() => {
                if (currentIndex === 0 && delay > 0) {
        
                    setIsTyping(true)
                    setCurrentIndex(1)
                } else if (currentIndex > 0) {
                    
                    const newText = text.substring(0, currentIndex)
                    setDisplayedText(newText)
                    
                    if (currentIndex < text.length) {
                        setCurrentIndex(prev => prev + 1)
                    } else {
                        
                        setIsTyping(false)
                    }
                }
            }, currentIndex === 0 ? delay : speed)
        }

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [currentIndex, text, speed, delay])

    return {
        text: displayedText,
        isTyping: isTyping
    }
}
