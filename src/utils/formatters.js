export const formatDisciplinasToList = items => {
  if(!items) return 'erro'

  const formatted = items.reduce((prev, curr, index) => {
    if (index === 0) {
      if(curr)
      return curr.nomeDisciplina;
    }
    if(curr)
      return `${prev}, ${curr.nomeDisciplina}`;
    return ''
  }, '');
  return formatted;
  };