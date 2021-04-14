export const formatDisciplinasToList = items => {
  if(!items) return 'erro'

  const formatted = items.reduce((prev, curr, index) => {
    if (index === 0) {
      return curr.nomeDisciplina;
    }
    return `${prev}, ${curr.nomeDisciplina}`;
  }, '');
  return formatted;
  };