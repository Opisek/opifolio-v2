import { browser } from "$app/environment";
import { writable } from "svelte/store";
export const theme = writable(browser && localStorage.getItem("theme") || "dark");
theme.subscribe(value => {
  if (browser) return localStorage.setItem("theme", value);
})
if (browser) {
  window.addEventListener("storage", () => {
    const newTheme = localStorage.getItem("theme");
    if (newTheme != null) theme.set(newTheme);
  })
}