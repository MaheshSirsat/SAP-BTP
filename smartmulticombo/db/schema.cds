using { cuid } from '@sap/cds/common';

namespace multicombo;

entity Employees : cuid {
    name        : String(100);
    department  : String(50);
    status      : String(20);
    salary      : Decimal(15,2);
}

 