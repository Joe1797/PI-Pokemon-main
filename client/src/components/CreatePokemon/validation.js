
export default function validate (inputs) {
    const errors = {};
    const urlValidation = /^(ftp|http|https):\/\/[^ "]+$/;

    if(!inputs.name) errors.name = "Se requiere un nombre"
    if(inputs.hp<0 || inputs.hp>101) errors.hp = "Valores entre 1 y 100"
    if(inputs.attack<0 || inputs.attack>101) errors.attack = "Valores entre 1 y 100"
    if(inputs.defense<0 || inputs.defense>101) errors.defense = "Valores entre 1 y 100"
    if(inputs.speed<0 || inputs.speed>101) errors.speed = "Valores entre 1 y 100"
    if(inputs.height<0 || inputs.height>101) errors.height = "Valores entre 1 y 100"
    if(inputs.weight<0 || inputs.weight>1001) errors.weight = "Valores entre 1 y 1000"
    if(!urlValidation.test(inputs.image)) errors.image = "Url no cumple estandares"
    if(inputs.types.length===0) errors.types = "Seleccione uno o varios tipos"
        
    return errors;
}