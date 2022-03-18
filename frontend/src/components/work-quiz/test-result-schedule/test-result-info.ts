import { DataOutPut, ITypeInfo } from '../common/interface';
import styleScheduleJSON from './style.schedule-info.json';

const getTypeInfo = (currentType: string): DataOutPut => {
  const data: ITypeInfo[] = styleScheduleJSON.types;
  const currentTypeInfo = data.find(
    (item) => item.type == currentType,
  ) as ITypeInfo;
  return {
    description: currentTypeInfo.description,
    preDescription: currentTypeInfo.preDescription,
  };
};
export default getTypeInfo;
