import { BackEndSchemaModel } from "../io/backEndClient";

// TODO: Update when generation types are finalized
const demoSchemas: BackEndSchemaModel[] = [
  {
    title: "Demo #1",
    jsonString:
      '{"topic":"cars","key":"","autoGeneration":false,"data":[{"name":"model","valueType":"generation","generationType":"vehicleModel","value":"V90","displayName":"Vehicle model","generationGroup":"vehicle"},{"name":"manufacturer","valueType":"generation","generationType":"manufacturer","value":"Fiat","displayName":"Manufacturer","generationGroup":"vehicle"},{"name":"fuelType","valueType":"generation","generationType":"fuel","value":"Electric","displayName":"Fuel","generationGroup":"vehicle"},{"name":"vin","valueType":"generation","generationType":"vin","value":"RBZFKXE2VEXY45901","displayName":"VIN","generationGroup":"vehicle"}]}',
  },
  {
    title: "Demo #2",
    jsonString:
      '{"topic":"dealerships","key":"","autoGeneration":true,"data":[{"name":"dealerships","valueType":"array","count":5,"value":{"valueType":"object","value":[{"name":"name","valueType":"generation","generationType":"companyName","value":"Effertz - Bradtke","displayName":"Company name","generationGroup":"company"},{"name":"city","valueType":"generation","generationType":"city","value":"East Ava","displayName":"City","generationGroup":"address"},{"name":"street","valueType":"generation","generationType":"street","value":"Kunze Centers","displayName":"Street","generationGroup":"address"},{"name":"building","valueType":"generation","generationType":"buildingNumber","value":"84122","displayName":"Building number","generationGroup":"address"},{"name":"cars","valueType":"array","count":15,"value":{"valueType":"object","value":[{"name":"manufacturer","valueType":"generation","generationType":"manufacturer","value":"Honda","displayName":"Manufacturer","generationGroup":"vehicle"},{"name":"color","valueType":"generation","generationType":"vehicleColor","value":"violet","displayName":"Vehicle color","generationGroup":"vehicle"},{"name":"vin","valueType":"generation","generationType":"vin","value":"8897BD4J7ZEK40004","displayName":"VIN","generationGroup":"vehicle"}]}}]}}]}',
  },
  {
    title: "Demo #3",
    jsonString:
      '{"topic":"history","key":"","autoGeneration":true,"data":[{"name":"branch","valueType":"generation","generationType":"branch","value":"bus-navigate","displayName":"Branch","generationGroup":"git"},{"name":"commits","valueType":"array","count":8,"value":{"valueType":"generation","generationType":"commitEntry","value":"commit 51e21c146f55035f46b7391a6f530229bc1b881a\\nAuthor: Jillian Gislason <Agnes47@gmail.com>\\nDate: Sat Aug 20 2022 21:10:49 GMT+0300 (Eastern European Summer Time)\\n\\nprogram open-source bus\\n","displayName":"Commit entry","generationGroup":"git"}},{"name":"owner","valueType":"generation","generationType":"fullName","value":"Courtney Hermiston","displayName":"Full name","generationGroup":"name"},{"name":"organisation","valueType":"generation","generationType":"companyName","value":"Bosco Inc","displayName":"Company name","generationGroup":"company"}]}',
  },
];

export default demoSchemas;
