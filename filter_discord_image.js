// ==UserScript==
// @name        filter discord image
// @namespace   Violentmonkey Scripts
// @match       https://discord.com/channels/1223063045660606565/*
// @grant    GM_setClipboard
// ==/UserScript==

(function() {
  const getTitle = () => {
    const selectedElement = document.querySelector('.selected_c69b6d');
    const nameElement = selectedElement.querySelector('.name__2ea32');
    return nameElement.textContent;
  };

  const generateCurlCommand = (url,title) => {
    const baseUrl = url.split("&=&format")[0];
    const fileName = url.split('/').pop().split('?')[0];
    return `curl "${baseUrl}" -o ~/Downloads/${title}/${fileName}`;
  };

  const collectCommands = (title) => {
    let commandList = [`mkdir -p ~/Downloads/${title}`];
    const results = document.getElementsByClassName("originalLink_af017a");

    for (const result of results) {
      const url = result.dataset.safeSrc;
      const curlCommand = generateCurlCommand(url,title);
      commandList.push(curlCommand);
    }

    return commandList;
  };

  const updateClipboard = () => {
    const title = getTitle();
    const commands = collectCommands(title);
    const commandText = commands.join("\n");
    console.clear();
    console.log(commandText);
    GM_setClipboard(commandText);
  };

  setInterval(updateClipboard, 10000);
})();
