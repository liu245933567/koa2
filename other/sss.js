// var photosr = new Array();
// packed = "ZXZhbChmdW5jdGlvbihwLGEsYyxrLGUsZCl7ZT1mdW5jdGlvbihjKXtyZXR1cm4gYy50b1N0cmluZygzNil9O2lmKCEnJy5yZXBsYWNlKC9eLyxTdHJpbmcpKXt3aGlsZShjLS0pe2RbYy50b1N0cmluZyhhKV09a1tjXXx8Yy50b1N0cmluZyhhKX1rPVtmdW5jdGlvbihlKXtyZXR1cm4gZFtlXX1dO2U9ZnVuY3Rpb24oKXtyZXR1cm4nXFx3Kyd9O2M9MX07d2hpbGUoYy0tKXtpZihrW2NdKXtwPXAucmVwbGFjZShuZXcgUmVnRXhwKCdcXGInK2UoYykrJ1xcYicsJ2cnKSxrW2NdKX19cmV0dXJuIHB9KCdjWzFdPSJiL2UvYS9kL2Yvbi5nLzAiO2NbMl09ImIvZS9hL2QvZi9sLmcvMCI7Y1szXT0iYi9lL2EvZC9mL2suZy8wIjtjWzRdPSJiL2UvYS9kL2Yvai5nLzAiO2NbNV09ImIvZS9hL2QvZi9oLmcvMCI7Y1s2XT0iYi9lL2EvZC9mL2kuZy8wIjtjWzddPSJiL2UvYS9kL2YvbS5nLzAiO2NbOF09ImIvZS9hL2QvZi9vLmcvMCI7Y1s5XT0iYi9lL2EvZC9mL3MuZy8wIjtjW3RdPSJiL2UvYS9kL2YvcC5nLzAiO2NbcV09ImIvZS9hL2QvZi9yLmcvMCI7JywzMCwzMCwnfHx8fHx8fHx8fDA1fGltYWdlc3xwaG90b3NyfDA2fDIwMjB8MTJ8anBnfDA1ZmM4ZjQ3NmZ8MDUxZmE2NGFmZXwwNWQ5ZTExZjUxfDA1YmQ3YmVjODV8MDU0ZjVhMDY2Y3wwNTY2MDY4NjRjfDA1M2YxYTY5Njh8MDU2YjI5ZDlkNnwwNWYxMzM3N2M2fDExfDA1MmMzYTI0ZGJ8MDU5OGNhMWNmMXwxMCcuc3BsaXQoJ3wnKSwwLHt9KSkK"; eval(eval(base64decode(packed).slice(4)));
// console.log(photosr);



// const href = "https://www.iimanhua.com/comic/1204/356792.html";
// console.log(href.match(/[0-9]{1,}.html/g))

const href = 'https://www.iimanhua.com/comic/123/292/';


const getCartoonIdFromUrl = (href) => {
  const arr = href.split('/').filter(item => Number(item || 'NaN') || Number(item) || 'NaN' === 0)
  return arr.length ? Number(arr[arr.length - 1]) : 9999;
}
console.log(getCartoonIdFromUrl(href))
console.log(href.match(/\/[0-9]{1,}\//g))

