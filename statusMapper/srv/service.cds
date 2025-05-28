using { Request } from '../db/data-model';
 
service capService{
    entity Requests as projection on  Request;

    view RequestView as select from Request{
        ID,
        reqNumber,
        case when cast(Status  as String) ='1'
            then 'Draft'
        when cast(Status as String)  ='2'
            then 'InProgress' end as Status:String
    }
}