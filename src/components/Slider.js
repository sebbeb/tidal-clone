"use client";

import * as RadixSlider from "@radix-ui/react-slider";

import styles from "@/app/page.module.css";

export default function Slider({ value = 1, onChange }) {
    function handleChange(newValue) {
        onChange?.(newValue[0]);
    }

    return (
        <RadixSlider.Root
            className={styles["slider-root"]}
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.1}
            aria-label="Volume"
        >
            <RadixSlider.Track className={styles["slider-track"]}>
                <RadixSlider.Range
                    className={styles["slider-range"]}
                ></RadixSlider.Range>
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
}
