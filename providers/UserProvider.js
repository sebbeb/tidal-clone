"user client";

import { MyUserContextProvider } from "../hooks/useUser";

export default function UserProvider({ children }) {
    return <MyUserContextProvider>{children}</MyUserContextProvider>;
}
