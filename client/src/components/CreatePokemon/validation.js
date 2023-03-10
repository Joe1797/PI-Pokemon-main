
export default function validate (inputs) {
    const errors = {};
    const urlValidation = /^(ftp|http|https):\/\/[^ "]+$/;

    if(!inputs.name) errors.name = "Required field"
    if(inputs.hp<0 || inputs.hp>101) errors.hp = "Values between 1 and 100"
    if(inputs.attack<0 || inputs.attack>101) errors.attack = "Values between 1 and 100"
    if(inputs.defense<0 || inputs.defense>101) errors.defense = "Values between 1 and 100"
    if(inputs.speed<0 || inputs.speed>101) errors.speed = "Values between 1 and 100"
    if(inputs.height<0 || inputs.height>101) errors.height = "Values between 1 and 100"
    if(inputs.weight<0 || inputs.weight>1001) errors.weight = "Values between 1 and 1000"
    if(!urlValidation.test(inputs.image)) errors.image = "Url does not meet standards"
    if(inputs.types.length===0) errors.types = "Required field"
        
    return errors;
}