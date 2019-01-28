export const stripTags = s => {
  const d = document.createElement('div');
  d.innerHTML = s;
  return d.textContent || d.innerText || "";
}