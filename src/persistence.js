
export function saveItems(items) {
    window.localStorage.setItem('items', JSON.stringify(items));

    return items
}



const DEFAULT_ITEMS = {
  toDo: [],
  inProgress: [],
  done: [],
};

export function getItems(filter = '') {
  const items = JSON.parse(window.localStorage.getItem('items')) || DEFAULT_ITEMS
  const _includesFilter = includesFilter.bind(null, filter)

  if(filter) {
    Object.keys(items).map(key => {
      const filteredItems = items[key].filter(_includesFilter);
      items[key] = filteredItems
    })
  }
  
  return items;
}

function includesFilter(filter, {tag, title, assignee}) {
  return tag.includes(filter) || title.includes(filter) || assignee.includes(filter);
}

