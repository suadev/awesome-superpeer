function selectHosts(hosts, text, category) {
  if (!hosts) return null;

  return hosts
    .filter((host) => {
      let filterCategory = category;
      return filterCategory ? host.categories.includes(filterCategory) : true;
    })
    .filter((host) => {
      let filterText = text.toLowerCase();
      return (
        host.name.toLowerCase().includes(filterText) ||
        host.categories.join(" ").toLowerCase().includes(filterText)
      );
    });
}

export default selectHosts;
