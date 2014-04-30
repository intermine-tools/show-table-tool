var chan = Channel.build({
  window: document.getElementById("child").contentWindow,
  origin: "*",
  scope: "CurrentStep"
});

chan.call({
  method: "init",
  params: {
    url: "http://www.flymine.org/query",
    query: {
      select: ['*'],
      from: 'Gene',
      where: {
        'organism.taxonId': 7227
      }
    }
  },
  success: function() {
    console.log("Table initialised");
  }
});
