// 验证是否有空值
import { field } from '../../config/field';
const validate_empty=(values)=>{
  const empty =[];
  for (var item in values) {
  	if(!values[item]&&item!='cover') empty.push(field[item]);
  }
  return empty;
}

export { validate_empty }