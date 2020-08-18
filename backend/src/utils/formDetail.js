
export function initRules(formData) {
  const obj = {};
  for(let item of formData ){
    let trigger = 'blur';
    if(item.type != 'input'){
      trigger = 'change';
    }
    let reg = /\([^\)]*\)/g;
    obj[item.name] = [{required: true, message: `${item.label.replace(reg,'')}不能为空`, trigger: trigger}]
  }
  return obj
}


export function initForm(formData) {
  const obj = {};
  for(let item of formData ){
    if(item.model){
      obj[item.name] = item.model;
    }else{
      obj[item.name] = null;
    }
  }
  return obj
}
