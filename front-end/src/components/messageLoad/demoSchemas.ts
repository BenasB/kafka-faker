export interface Schema {
  title: string;
  jsonString: string;
}

const demoSchemas: Schema[] = [
  {
    title: "Demo #1",
    jsonString: `{"topic":"mano topicas","key":"","autoGeneration":false,"data":[{"name":"My awesome name","valueType":"custom","value":"Hello"},{"name":"otherName","valueType":"custom","value":"World!"}]}`,
  },
  {
    title: "Demo #2",
    jsonString: `{"topic":"mano topicas","key":"","autoGeneration":true,"data":[{"name":"pirmas","valueType":"custom","value":"konstanta"},{"name":"antras","valueType":"array","count":4,"value":{"valueType":"custom","value":"arejusvienas"}},{"name":"trecias","valueType":"object","value":[{"name":"jektasviens","valueType":"generation","generationType":"location","value":"Location28"},{"name":"jektasdu","valueType":"array","count":9,"value":{"valueType":"generation","generationType":"date","value":"Date95"}}]},{"name":"ketvirtas","valueType":"generation","generationType":"name","value":"Benas28"}]}`,
  },
  {
    title: "Demo #3",
    jsonString: `{"topic":"very-important-topic","key":"","autoGeneration":true,"data":[{"name":"MyKey1","valueType":"generation","generationType":"date","value":"Date81"},{"name":"MeaningfulKey","valueType":"generation","generationType":"name","value":"Benas18"},{"name":"Name3","valueType":"object","value":[{"name":"Subname1","valueType":"custom","value":"Hello World!"},{"name":"Subname2","valueType":"array","count":4,"value":{"valueType":"generation","generationType":"location","value":"Location79"}}]},{"name":"Universe","valueType":"custom","value":"42"}]}`,
  },
];

export default demoSchemas;
