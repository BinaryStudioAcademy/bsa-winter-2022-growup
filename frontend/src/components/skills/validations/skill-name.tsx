export const validSkillName = (name: string): boolean => {
  if (!name) return false;
  if (name.length > 25) return false;
  return true;
};
