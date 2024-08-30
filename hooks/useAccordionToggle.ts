import { useState } from 'react';

export function useAccordionToggle() {
    const [id, setId] = useState<string>('');

    const showItems = (id: string): void => {
        setId(prevID => (prevID === id ? '' : id));
    };

    return { id, showItems };
}