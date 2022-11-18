const DATA = [
    {
        langId: 1, 
        name: 'C',
        interpeted: false,
        compiler: 'gcc',
        fileName: 'main.c',
        userCode: '#include <stdio.h>\n\nint main(void) {\n\tprintf("hello there");\n}'
    },
    {
        langId: 2, 
        name: 'Python',
        interpeted: true,
        compiler: 'python',
        fileName: 'main.py',
        userCode: 'print("Hello, World!")'
    },
    {
        langId: 4, 
        name: 'Java Script',
        interpeted: true,
        compiler: 'node',
        fileName: 'script.js',
        userCode: 'console.log("Hello, World!");'
    },
]

module.exports = DATA; 