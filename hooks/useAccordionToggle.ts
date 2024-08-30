import { useState } from 'react';

export function useAccordionToggle():  {id: string, showItems: (id: string) => void} {
    const [id, setId] = useState<string>('');

    const showItems = (id: string): void => {
        setId(prevID => (prevID === id ? '' : id));
    };

    return { id, showItems };
}