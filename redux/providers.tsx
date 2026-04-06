import { Provider } from "react-redux";
import { AppStore, store } from "./store";
import { useRef } from "react";

export default function StoreProvider({children}: {children: React.ReactNode}) {
    const storeRef = useRef<AppStore>()

    if (!storeRef.current) {
        storeRef.current = store();
        
    }
    return <Provider store={storeRef.current}>
        {children}
    </Provider>
}