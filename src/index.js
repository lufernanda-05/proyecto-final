import servidor from "./servidor.js";
servidor.listen(3000, ()=>{
    console.log("El servidor esta escuchando el link http://localhost:3000");
});