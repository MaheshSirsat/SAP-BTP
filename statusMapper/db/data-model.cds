using {cuid} from '@sap/cds/common';
  
entity Request:cuid{
    reqNumber:String @mandatory;
    Status:Integer @mandatory @assert.range:[1,2];
}