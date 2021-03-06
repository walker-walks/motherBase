// http://dean.edwards.name/packer/
javascript: void((function (undefined) {
  let csvString = 'Company Name,Full Name,Job Title,City,Linkedin\n',
    users, pom, repeat = setInterval(load, 3000);

  function load() {
    let nextLink = document.querySelector('.next-pagination');
    if (nextLink.classList.contains('disabled')) {
      pom = document.createElement('a');
      pom.setAttribute('href', 'data:' + 'text/csv' + ';charset=utf-8,' + encodeURIComponent(csvString));
      pom.setAttribute('download', 'Export.csv');
      document.body.appendChild(pom);
      pom.click();
      document.body.removeChild(pom);
      clearInterval(repeat)
    } else {
      Array.prototype.map.call(document.querySelectorAll('.entity-info'), function (n) {
        let name = iHTML(n, '.name-link'),
          link = n.querySelector('.name-link').href,
          company = iHTML(n, '.company-name'),
          role = iHTML(n, '.info-value:nth-child(1)'),
          location = iHTML(n, '.info-value:nth-child(3)');
        if (name != 'LinkedIn Member') csvString += `&quot;${company}&quot;,&quot;${name}&quot;,&quot;${role}&quot;,&quot;${location}&quot;,&quot;${link}&quot;\n`
      });
      nextLink.click()
    }
  }

  function iHTML(n, s) {
    return n.querySelector(s) ? n.querySelector(s).innerText.replace(/&quot;/g, '&quot;&quot;') : ''
  }
})());