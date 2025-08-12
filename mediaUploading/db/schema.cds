namespace com.media;

using {managed} from '@sap/cds/common';

entity MediaFile : managed {
  key ID        : UUID @(Core.Computed: true);

      @Core.MediaType  : mediaType
      content   : LargeBinary;

      @Core.IsMediaType: true
      mediaType : String;
      fileName  : String;
}
