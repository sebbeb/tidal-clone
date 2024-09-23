"use client";

import qs from "query-string";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import Input from "./Input";

export default function SearchInput() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value, 500);

    useEffect(() => {
        const query = {
            title: debounceValue,
        };

        const url = qs.stringifyUrl({ url: "/search", query });

        router.push(url);
    }, [debounceValue, router]);

    return (
        <Input
            placeholder="Search for a song"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
