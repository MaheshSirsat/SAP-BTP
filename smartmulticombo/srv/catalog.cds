using {multicombo as mlc} from '../db/schema';

service CatalogService {
    entity Employees      as projection on mlc.Employees;

    entity StatusDropDown as
        select from mlc.Employees {
          key  status
        }
        group by
            status;
}
